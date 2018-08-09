/**
 * @file
 * Provides JavaScript for Collapsible Paragraphs.
 */

(function($, Drupal, window, document) {
  'use strict';

  /**
   * Toggler object.
   */
  var Toggler = Drupal.paragraphsCollapsibleToggler = function(controller, options) {
    var defaults = {
      actions: controller.actions || {}
    };

    $.extend(true, this, defaults, options);

    this.controller = controller;
  };

  /**
   * Determine if this item can be toggled by this toggler.
   *
   * @param jQuery $items
   *   The JQuery set of field items.
   *
   * @return bool
   *   TRUE if this toggler can toggle the item.
   */
  Toggler.prototype.canToggle = function($item) {
    if ('canToggle' in this.callbacks) {
      var self = this;
      return this.callbacks.canToggle(self, $item);
    }
    return true;
  };

  /**
   * Toggle callback to show / Hide a single paragraph item.
   *
   * @param jQuery $items
   *   The JQuery set of field items.
   * @param string action_name
   *   The toggle action - 'collapse' or 'expand'.
   * @param object options
   *   A set of options to configure the toggle:
   *   - fast (bool): If enabled, the transitions will not use the animated
   *     slideUp / slideDown. The faster hide / show is used.
   *   - expandFieldsets (bool): Expand all nested fieldsets.
   *   - complete (function): Callback on complete.
   *
   * @return int
   *   Count of items toggled or promised to be toggled.
   */
  Toggler.prototype.toggle = function($items, action_name, toggle_options) {
    if ('toggle' in this.callbacks) {
      var self = this;
      this.callbacks.toggle(self, $items, action_name, toggle_options);
    }
  };

  /**
   * Toggle the next sibling item.
   *
   *  @param jQuery $item
   *    The current element of the field item row.
   *  @param string action_name
   *    The toggle action - 'collapse' or 'expand'.
   *  @param object options
   *    See toggle().
   */
  Toggler.prototype.toggleNextItem = function($item, action_name, options) {
    if ($item.length > 0) {
      var $nextItem = this.controller.nextItem($item);
      if ($nextItem.length > 0) {
        this.toggle($nextItem, action_name, options);
      }
    }
  };

  /**
   * Determine the Toggle action based on the element's current classes.
   *
   * @param object element
   *   The fieldset element or jQuery.
   *
   * @return object
   *   The action object.
   */
  Toggler.prototype.getCurrentAction = function(element) {
    var self = this;
    var $element = $(element);

    var current_action = self.actions.expand;
    $.each(self.actions, function(action_name, action_data) {
      if ($element.hasClass(action_data.classname)) {
        current_action = action_data;
        return false;
      }
    });

    return current_action;
  };

  /**
   * Determine the Toggle action based on the element's current classes.
   *
   * @param object element
   *   The fieldset element or jQuery.
   *
   * @return object
   *   The action object.
   */
  Toggler.prototype.getToggleAction = function(element) {
    var self = this;
    var current_action = self.getCurrentAction(element);
    return current_action && ('opposite' in current_action) && (current_action.opposite in self.actions) ? self.actions[current_action.opposite] : self.actions.expand;
  };


  /**
   * Toggle Controller.
   */
  var controller = Drupal.paragraphsCollapsibleController = Drupal.paragraphsCollapsibleController || {};

  controller.savedStates = {};
  controller.toolBarHeight = null;

  controller.actions = {
    collapse: {
      name: 'collapse',
      opposite: 'expand',
      isOpen: false,
      classname: 'collapsed',
      onText: Drupal.t('Show'),
      allOnText: Drupal.t('Expand All')
    },
    expand: {
      name: 'expand',
      opposite: 'collapse',
      isOpen: true,
      classname: 'expanded',
      onText: Drupal.t('Hide'),
      allOnText: Drupal.t('Collapse All')
    }
  };

  // Initialize togglers.
  controller.togglers = {};

  /**
   * AJAX based toggler.
   */
  controller.togglers.ajax = new Toggler(controller, {
    actions: {
      collapse: {
        ajax: {
          button: {
            name: 'collapse',
            classname: 'paragraphs-collapse-button'
          }
        }
      },
      expand: {
        ajax: {
          button: {
            name: 'edit',
            classname: 'paragraphs-edit-button'
          }
        }
      }
    },
    callbacks: {
      canToggle: function(self, $items) {
        // Check the first item.
        var $item = $items.first();
        var item_element = $item.get(0);

        // Check for an existing value.
        if (('paragraphsItemIsAjax' in item_element)) {
          return item_element.paragraphsItemIsAjax;
        }

        // Check for AJAX elements.
        var is_ajax = false;
        var button_selectors = [];
        $.each(self.actions, function(action_key, action_data) {
          button_selectors.push('.' + action_data.ajax.button.classname);
        });
        if (button_selectors.length > 0) {
          var $content = self.controller.findItemContentElement($item);
          if ($content && $content.length > 0) {
            is_ajax = $content.children('.form-actions').find(button_selectors.join()).length > 0;
          }
        }

        item_element.paragraphsItemIsAjax = is_ajax;
        return is_ajax;
      },
      toggle: function(self, $items, action_name, options) {
        // Enable the crawler if toggling more than 1 item.
        // Since this is AJAX, the subsequent item objects would get destroyed
        // and replaced after the AJAX request. With crawl enabled,
        // only the first item is processed and then the next item is found
        // after AJAX Complete.  The combined settings is passed to toggle() in
        // subsequent calls so this only needs to be set once.
        if ($items.length > 1) {
          options.crawl = true;
        }

        // Get the first item to process or seed the crawler.
        var $item = $items.first();
        var item_element = $item.get(0);

        // Merge settings.
        var settings = $.extend(true,
          {
            'fast': false,
            'expandFieldsets': true,
            'updateAllTrigger': true,
            'crawl': false
          },
          options
        );

        // Crawl to the next item.
        var crawl = function($current_item) {
          if (settings.crawl && $current_item.length > 0) {
            self.toggleNextItem($current_item, action_name, settings);
          }
        };

        // Check flags to avoid processing multiple times.
        if (item_element.animating || item_element.paragraphsAjaxing) {
          return crawl($item);
        }

        // Determine content wrapper.
        var $content = self.controller.findItemContentElement($item);
        if (!$content || $content.length === 0) {
          return crawl($item);
        }

        // Get form actions wrapper element.
        var $form_actions = $content.children('.form-actions');
        if (!$form_actions.length) {
          return crawl($item);
        }

        // Block action for special cases.
        if ($form_actions.find('.paragraphs-deleteconfirm-button').length > 0) {
          // Exit, nothing to do.
          return crawl($item);
        }

        // Find the action button.
        var requested_action = (action_name && action_name in self.actions) ? self.actions[action_name] : self.getToggleAction($item);

        // Set vars based on requested action.
        action_name = requested_action.name;
        var other_action = self.actions[requested_action.opposite];

        var $button = $form_actions.find('.' + requested_action.ajax.button.classname);
        if (!$button.length) {
          return crawl($item);
        }

        // Determine id to track states.
        var id = self.controller.createItemId($item);
        if (id) {
          // Set state to match class added for action.
          self.controller.savedStates[id] = requested_action.classname;
        }

        // Process button.
        $button = $button.first();
        var button_element_name = $button.attr('name');

        // Catch the AJAX Complete.
        // This is needed since Drupal.ajax blocks concurrent
        // requests. The local Drupal.ajax.options.complete will fire
        // first and then the global ajaxComplete listeners.
        $(document).on('ajaxComplete.paragraphsCollapsible__' + button_element_name, function(ajax_event, ajax_xhr, ajax_settings) {
          if (('extraData' in ajax_settings) && ('_triggering_element_name' in ajax_settings.extraData) &&
              ajax_settings.extraData._triggering_element_name === button_element_name) {
            var $new_item;
            var new_button_element_name = button_element_name.replace(/\_[^_]+\_button$/, '_' + other_action.ajax.button.name + '_button');
            var $new_button = $('.paragraph-bundle-content-collapsible > .form-actions [name="' + new_button_element_name + '"]');
            if ($new_button.length === 0) {
              $new_button = $('.paragraph-bundle-content-collapsible > .ajax-new-content > .form-actions [name="' + new_button_element_name + '"]');
            }

            if ($new_button.length > 0) {
              $new_item = $new_button.closest('.paragraph-bundle-content-collapsible');

              // On complete actions.
              if ($new_item.length > 0) {
                // Expand nested elements.
                if (requested_action.isOpen) {
                  // Expand collapsible fieldsets.
                  if (settings.expandFieldsets) {
                    var $fieldsets = self.controller.findItemCollapsedFieldsets($new_item);
                    $fieldsets.each(function() {
                      self.controller.expandCollapsibleFieldset(this);
                    });
                  }

                  var new_item_element = $new_item.get(0);
                  new_item_element.paragraphsAjaxing = false;
                }
              }
            }

            // Unbind this listener.
            $(document).off('ajaxComplete.paragraphsCollapsible__' + button_element_name);

            // Crawl to the next item.
            if ($new_item) {
              crawl($new_item);
            }
          }
        });

        // Trigger the AJAX button.
        item_element.paragraphsAjaxing = true;
        $button.trigger('mousedown');

        // Promise / assume all to be toggled.
        return $items.length;
      }
    }
  });

  /**
   * Javascript based toggler.
   */
  controller.togglers.js = new Toggler(controller, {
    actions: {
      collapse: {
        js: {
          fx: 'slideUp'
        }
      },
      expand: {
        js: {
          fx: 'slideDown',
          fastFx: 'show'
        }
      }
    },
    callbacks: {
      canToggle: function(self, $items) {
        // Can JS toggle if it's not AJAX.
        return !self.controller.togglers.ajax.canToggle($items);
      },
      toggle: function(self, $items, action_name, toggle_options) {
        var toggledCount = 0;

        // Merge settings.
        var settings = $.extend(true,
          {
            'fast': false,
            'expandFieldsets': true,
            'updateAllTrigger': true,
            'crawl': false
          },
          toggle_options
        );

        // Determine initial requested action.
        var initial_requested_action = (action_name && action_name in self.actions) ? self.actions[action_name] : self.getToggleAction($items.first());

        // Process each item.
        $items.each(function () {
          // Skip if already animating.
          if (this.animating) {
            return true;
          }

          // Initialize item processing.
          var item_element = this;
          var $item = $(item_element);
          var $content = self.controller.findItemContentElement($item);
          var requested_action = initial_requested_action;

          // Block collapse for special cases.
          if (!requested_action.isOpen) {
            // Do not collapse deleted paragraphs.
            if ($content.children('.form-actions').find('.paragraphs-deleteconfirm-button').length > 0) {
              if ($item.hasClass(self.actions.collapse.classname)) {
                // Expand this special item.
                requested_action = self.actions.expand;
              }
              else {
                // Skip, nothing to do.
                return true;
              }
            }
          }

          // Set vars based on requested action.
          action_name = requested_action.name;
          var other_action = self.actions[requested_action.opposite];

          // Skip early if this item is already in the correct state.
          if ($item.hasClass(requested_action.classname)) {
            toggledCount++;
            return true;
          }

          // Find elements to toggle.
          var $elements = self.controller.findItemCollapsibleElements($item);
          if (!$elements || $elements.length === 0) {
            return true;
          }
          var last_element = $elements.last().get(0);

          // Determine id to track states.
          var id = self.controller.createItemId($item);
          if (id) {
            // Set state to match class added for action.
            self.controller.savedStates[id] = requested_action.classname;
          }

          // Animation callback for each element in $elements.
          var fn_complete = function() {
            // Target last element to operate after all animations.
            if (last_element !== this) {
              return;
            }

            // Toggle classes on the item.
            $item
              .removeClass(other_action.classname)
              .addClass(requested_action.classname);

            // Update hidden toggle text.
            if (!$content || $content.length === 0) {
              $content
                .find('> .paragraph-bundle-title > .paragraph-bundle-title-collapsible-prefix')
                .html(requested_action.onText);
            }

            // Expand nested elements.
            if (requested_action.isOpen) {
              // Expand collapsible fieldsets.
              if (settings.expandFieldsets) {
                var $fieldsets = self.controller.findItemCollapsedFieldsets($elements);
                $fieldsets.each(function() {
                  self.controller.expandCollapsibleFieldset(this);
                });
              }

              // Expand nested triggers.
              var child_settings = $.extend(settings, {'fast': true});
              // TODO: limit this to next level only since the toggleAll of the next
              // level will keep digging with this line.
              $('.field-multiple-table > thead .paragraphs-collapsible-trigger-link', $elements).each(function() {
                self.controller.toggleAll(this, child_settings, action_name);
              });
            }

            // Update all trigger text and action.
            if (settings.updateAllTrigger) {
              var $allTrigger = self.controller.findItemAllTrigger($item);
              if ($allTrigger && $allTrigger.length > 0) {
                self.controller.updateAllTrigger($allTrigger);
              }
            }

            // Clear animating flag.
            item_element.animating = false;
          };

          // Set animating flag.
          item_element.animating = true;

          // Invoke collapse actions.
          if (settings.fast) {
            // Fast effect.
            if ('fastFx' in requested_action.js) {
              $elements[requested_action.js.fastFx]();
            }

            // Item complete actions.
            fn_complete();
          }
          else if ('fx' in requested_action.js) {
            $elements[requested_action.js.fx]('fast', fn_complete);
          }

          toggledCount++;
          return true;
        });

        return toggledCount;
      }
    }
  });

  /**
   * Load the toggler for a given item.
   *
   * @param jQuery $items
   *   The element of the field item row.
   *
   * @return Toggler|null
   *   The found toggler or null.
   */
  controller.loadToggler = function($items) {
    var self = this;

    // Detect toggler in order of togglers built order.
    var active_toggler = null;
    $.each(self.togglers, function(toggler_name, obj) {
      if (obj.canToggle($items)) {
        active_toggler = obj;
        return false;
      }
    });

    return active_toggler;
  };

  /**
   * Find the content wrapper of the item.
   *
   * @param object item
   *   The element of the field item row.
   *
   * @return object
   *   The jQuery for the content wrapper.
   */
  controller.findItemContentElement = function(item) {
    var $item = $(item);
    var $new_content = $item.children('.ajax-new-content');
    return $new_content.length > 0 ? $new_content : $item;
  };

  /**
   * Find the item's all trigger.
   *
   * @param object item
   *   The element of the field item row.
   *
   * @return object
   *   The jQuery set of found elements.
   */
  controller.findItemAllTrigger = function(item) {
    var $item = $(item);
    return $item.closest('.field-multiple-table').find('thead .paragraphs-collapsible-trigger-link').first();
  };

  /**
   * Find all collapsible elements within a field item.
   *
   * @param object item
   *   The element of the field item row.
   *
   * @return object
   *   The jQuery set of found elements.
   */
  controller.findItemCollapsibleElements = function(item) {
    var $elements;
    var $content = this.findItemContentElement(item);
    if ($content && $content.length > 0) {
      $elements = $content.children(':not(.paragraph-bundle-content-collapsible-shown)');
    }

    return $elements;
  };

  /**
   * Find all collapsible fieldsets within an item.
   *
   * @param jQuery $elements
   *   The item's collapsible elements to limit the search or the item itself.
   *
   * @return object
   *   The jQuery set of found elements.
   */
  controller.findItemCollapsedFieldsets = function($elements) {
    var $fieldsets = $('> fieldset.collapsible.collapsed, *:not(.filter-guidelines-item > .tips > li) > fieldset.collapsible.collapsed', $elements);
    if ($elements.is('fieldset')) {
      var $top_fieldsets = $elements.filter('fieldset.collapsible.collapsed');
      if ($top_fieldsets.length > 0) {
        $fieldsets.add($top_fieldsets);
      }
    }
    return $fieldsets;
  };

  /**
   * Create a paragraph id for the field item.
   *
   * @param object item
   *   The element of the field item row.
   *
   * @return string|null
   *   The unique id.
   */
  controller.createItemId = function(item) {
    var $item = $(item);
    var item_element = $item.get(0);

    // Check for an existing id.
    if (('paragraphsCollapsibleItemId' in item_element) && item_element.paragraphsCollapsibleItemId) {
      return item_element.paragraphsCollapsibleItemId;
    }

    // Create the id.
    var id = null;
    var $content = this.findItemContentElement(item);
    if ($content && $content.length > 0) {
      var $title = $content.children('.paragraph-bundle-title').first();
      if ($title.length > 0) {
        id = $title.attr('id');
        if (id) {
          id = id.replace(/\-paragraph\-bundle\-title(?:\-\-\d+)?$/, '');
          item_element.paragraphsCollapsibleItemId = id;
        }
      }
    }

    return id;
  };

  /**
   * Determine if the field item is toggle by AJAX.
   *
   * @param object item
   *   The element of the field item row.
   *
   * @return bool
   *   TRUE if the item is toggle by AJAX.
   */
  controller.itemIsAjax = function(item) {
    return this.togglers.ajax.canToggle(item);
  };

  /**
   * Determine if the field item is toggled by JavaScript.
   *
   * @param object item
   *   The element of the field item row.
   *
   * @return bool
   *   TRUE if the item is toggled by JavaScript.
   */
  controller.itemIsJs = function(item) {
    return this.togglers.js.canToggle(item);
  };

  /**
   * Find the next field item.
   *
   * @param object item
   *   The current element of the field item row.
   *
   * @return object
   *   The next field item element.
   */
  controller.nextItem = function(item) {
    var $item = $(item).first();
    return $item.closest('tr').next('tr').find('> .paragraph-bundle-content-collapsible');
  };

  /**
   * Show / Hide a single paragraph.
   *
   * @param object item
   *   The element of the field item row.
   * @param string action_name
   *   The toggle action - 'collapse' or 'expand'.
   * @param object options
   *   A set of options to configure the toggle:
   *   - fast (bool): If enabled, the transitions will not use the animated
   *     slideUp / slideDown. The faster hide / show is used.
   *   - expandFieldsets (bool): Expand all nested fieldsets.
   *   - complete (function): Callback on complete.
   *
   * @return boolean
   *   TRUE if the paragraph was toggled.
   */
  controller.toggleItem = function(item, action_name, options) {
    var settings = options || {};
    var $item = $(item);
    var active_toggler = this.loadToggler($item);
    if (active_toggler) {
      active_toggler.toggle($item, action_name, settings);
      return true;
    }
    return false;
  };


  /**
   * Find all paragraphs items for the given trigger element.
   *
   * @param object triggerElement
   *   The trigger element to toggle all child paragraphs.
   *
   * @return int
   *   The count of paragraphs toggled.
   */
  controller.findTriggerItems = function(triggerElement) {
    return $(triggerElement).closest('.form-item').children('.field-multiple-table').find('> tbody > tr > .paragraph-bundle-content-collapsible');
  };

  /**
   * Show / Hide all paragraphs items for the given trigger element.
   *
   * @param object triggerElement
   *   The trigger element to toggle all child paragraphs.
   * @param string action_name
   *   The toggle action - 'collapse' or 'expand'.
   * @param object options
   *   See toggleItem().
   *
   * @return int
   *   The count of paragraphs toggled.
   */
  controller.toggleItems = function(triggerElement, action_name, options) {
    var toggledCount = 0;
    var settings = options || {};

    var $items = this.findTriggerItems(triggerElement);
    if ($items.length > 0) {
      var active_toggler = this.loadToggler($items);
      if (active_toggler) {
        // Assume toggler will toggle all items. Any return is not reliable
        // since the toggle action is async or AJAX.
        toggledCount = $items.length;
        active_toggler.toggle($items, action_name, settings);
      }
    }

    return toggledCount;
  };

  /**
   * Trigger show / hide for given trigger element.
   *
   * @param object triggerElement
   *   The trigger element to toggle all child paragraphs.
   * @param object options
   *   See toggleItem().
   * @param string action_name
   *   The toggle action - 'collapse', 'expand'. If not defined, it will be
   *   derive from the class name.
   *
   * @return int
   *   The count of paragraphs toggled.
   */
  controller.toggleAll = function(triggerElement, options, action_name) {
    var self = this;
    var $t = $(triggerElement);
    var settings = options || {};
    settings.updateAllTrigger = false;

    // Determine action.
    var requested_action = (action_name && action_name in self.actions) ? self.actions[action_name] : self.getToggleAction($t);

    // Toggle paragraphs.
    var toggledCount = this.toggleItems(triggerElement, requested_action.name, settings);

    // Update trigger class and label.
    if (toggledCount > 0) {
      this.updateAllTrigger(triggerElement, requested_action.name);
    }

    return toggledCount;
  };

  /**
   * Update the trigger element based on the current items.
   *
   * @param object triggerElement
   *   The trigger element.
   * @param string update_action_name
   *   The trigger will be set to this action - 'collapse', 'expand'.
   *   If not defined, it will be derive from the current class name.
   */
  controller.updateAllTrigger = function(triggerElement, update_action_name) {
    var self = this;
    var $t = $(triggerElement);
    var update_action = (update_action_name && update_action_name in self.actions) ? self.actions[update_action_name] : null;

    // Determine trigger action based on items.
    if (update_action === null) {
      var items_action, item_action;
      var $items = self.findTriggerItems($t);
      if ($items && $items.length > 0) {
        $.each($items, function(itemIndex, $item) {
          item_action = self.getCurrentAction($item);
          // If any are open, then set all action as item.
          if (item_action && item_action.isOpen) {
            items_action = item_action;
            return false;
          }
        });
      }

      // If none are open, then all are collapsed.
      update_action = items_action ? items_action : self.actions.collapse;
    }

    // If the trigger needs updated ...
    if (update_action) {
      var other_action = self.actions[update_action.opposite];

      // Build triggers.
      var $triggers = [$t];

      // Add other trigger.
      var $parent_table = $t.closest('table');
      if ($parent_table.length > 0) {
        if ($parent_table.hasClass('field-multiple-table')) {
          // Items table click, add sticky header trigger.
          $triggers.push($parent_table.siblings('.sticky-header').find('.paragraphs-collapsible-trigger-link'));
        }
        else if ($parent_table.hasClass('sticky-header')) {
          // Sticky header click, add items table click.
          $triggers.push($parent_table.siblings('table.field-multiple-table').find('> thead .paragraphs-collapsible-trigger-link'));
        }
      }

      $.each($triggers, function(index, $trigger) {
        if ($trigger.length > 0) {
          $trigger
            .removeClass(other_action.classname)
            .addClass(update_action.classname)
            .text(update_action.allOnText);
        }
      });
    }
  };

  /**
   * Determine the Toggle action based on the element's current classes.
   *
   * @param object element
   *   The fieldset element or jQuery.
   *
   * @return object
   *   The action object.
   */
  controller.getCurrentAction = function(element) {
    var $element = $(element);
    var active_toggler = this.loadToggler($element);
    if (active_toggler) {
      return active_toggler.getCurrentAction($element);
    }

    // Default to expand if no toggler found.
    return controller.actions.expand;
  };

  /**
   * Determine the Toggle action based on the element's current classes.
   *
   * @param object element
   *   The fieldset element or jQuery.
   *
   * @return object
   *   The action object.
   */
  controller.getToggleAction = function(element) {
    var $element = $(element);
    var active_toggler = this.loadToggler($element);
    if (active_toggler) {
      return active_toggler.getToggleAction($element);
    }

    // Default to expand if no toggler found.
    return controller.actions.expand;
  };

  /**
   * Expand a collapsible fieldset.
   *
   * Based on Drupal.toggleFieldset() to toggle without clicks and window
   * scrolling.
   *
   * @param object element
   *   The fieldset element or jQuery.
   */
  controller.expandCollapsibleFieldset = function(element) {
    var $fieldset = $(element);
    var fieldset = $fieldset.get(0);

    if (!fieldset.animating && $fieldset.is('.collapsed')) {
      fieldset.animating = true;
      $('> .fieldset-wrapper', fieldset).show();
      $fieldset
        .removeClass('collapsed')
        .trigger({ type: 'collapsed', value: false })
        .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));

      fieldset.animating = false;
    }
  };

  /**
   * Scroll a given fieldset into view as much as possible.
   */
  controller.collapseScrollIntoView = function(element) {
    var $element = $(element).first();
    var offset = $element.offset();
    var slack = 55;

    if (offset.top > 0) {
      if (this.toolBarHeight === null) {
        this.toolBarHeight = $('#toolbar').outerHeight() || 0;
      }
      var y = Math.floor(offset.top - this.toolBarHeight - slack);
      y = y > 0 ? y : 0;
      $(window).scrollTop(y);
    }
  };

  /**
   * Enable Expand/Collapse feature for paragraph bundles.
   * Show the name & type of each bundle and hide contents inside those.
   */
  Drupal.behaviors.paragraphsCollapsible = {
    attach: function (context, settings) {
      var $new_items = $('.paragraph-bundle-content-collapsible', context).once('paragraphs');

      if ($new_items.length > 0) {
        // Trigger for a single paragaph.
        $('> .paragraph-bundle-title, > .ajax-new-content > .paragraph-bundle-title', $new_items).each(function() {
          var $t = $(this);
          var $item = $t.closest('.paragraph-bundle-content-collapsible');

          var has_errors = $item.find('.error:first').length > 0;
          var is_ajax_new = $item.children('.ajax-new-content').length > 0;
          var is_ajax_form = controller.itemIsAjax($item);
          var current_action = controller.getCurrentAction($item);
          var is_expanded = current_action.isOpen;

          // Prefix title with a toggle image.
          $('<span class="paragraph-bundle-title-collapsible-prefix element-invisible"></span>')
              .append(current_action.onText)
              .prependTo($t)
              .after(' ');

          // Update toggle state.
          var id;
          var expandFieldsets = is_expanded;
          if (has_errors || is_ajax_new) {
            // Expand errors and new content.
            if (!is_expanded && !is_ajax_form) {
              expandFieldsets = false;
              controller.toggleItem($item, controller.actions.expand.name);
            }
          }
          else if (!is_ajax_form && !is_ajax_new && !$item.hasClass('no-collapsible-state-restore') &&
                (id = controller.createItemId($item)) && (id in controller.savedStates) &&
                controller.savedStates[id] && !$item.hasClass(controller.savedStates[id])) {
            // Restore saved states.
            expandFieldsets = false;
            var restore_action_name = controller.savedStates[id] === controller.actions.collapse.classname ? controller.actions.collapse.name : controller.actions.collapse.opposite;
            controller.toggleItem($item, restore_action_name);
          }

          // Ensure fieldsets are expanded.
          if (expandFieldsets) {
            var $fieldsets = controller.findItemCollapsedFieldsets($item);
            $fieldsets.each(function() {
              controller.expandCollapsibleFieldset(this);
            });
          }
        })
        .click(function(event) {
          // Prevent the default click event.
          event.preventDefault();
          var $item = $(this).closest('.paragraph-bundle-content-collapsible');
          if ($item.length > 0) {
            var action = controller.getToggleAction($item);
            controller.toggleItem($item, action.name);
          }
        });

        // JS Only edit link.
        var $fake_buttons = $('> .form-actions, > .ajax-new-content > .form-actions', $new_items).find('.paragraphs-edit-link, .paragraphs-collapse-link');
        if ($fake_buttons.length > 0) {
          $fake_buttons.click(function(event) {
            // Prevent the default click event.
            event.preventDefault();
            var $item = $(this).closest('.paragraph-bundle-content-collapsible');
            if ($item.length > 0) {
              var action = controller.getToggleAction($item);
              controller.toggleItem($item, action.name, {
                'complete': function($element) {
                  controller.collapseScrollIntoView($element);
                }
              });
            }
          });

          // Add jQuery UI button effects.
          if ($.fn.button) {
            $fake_buttons.button();
          }
        }
      }

      // Trigger for toggle all paragaphs.
      $('.paragraphs-collapsible-trigger-link', context).once("paragraphs")
        .click(function(event) {
          // Prevent the default click event.
          event.preventDefault();
          controller.toggleAll(this);
        });
    }
  };

})(jQuery, Drupal, this, this.document);
