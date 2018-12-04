'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery');
}

+function ($) {
  'use strict';

  var version = $.fn.jquery.split(' ')[0].split('.');
  if (version[0] < 2 && version[1] < 9 || version[0] == 1 && version[1] == 9 && version[2] < 1 || version[0] > 3) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4');
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap');

    var transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] };
      }
    }

    return false; // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false;
    var $el = this;
    $(this).one('bsTransitionEnd', function () {
      called = true;
    });
    var callback = function callback() {
      if (!called) $($el).trigger($.support.transition.end);
    };
    setTimeout(callback, duration);
    return this;
  };

  $(function () {
    $.support.transition = transitionEnd();

    if (!$.support.transition) return;

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function handle(e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
      }
    };
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]';
  var Alert = function Alert(el) {
    $(el).on('click', dismiss, this.close);
  };

  Alert.VERSION = '3.3.7';

  Alert.TRANSITION_DURATION = 150;

  Alert.prototype.close = function (e) {
    var $this = $(this);
    var selector = $this.attr('data-target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector);

    if (e) e.preventDefault();

    if (!$parent.length) {
      $parent = $this.closest('.alert');
    }

    $parent.trigger(e = $.Event('close.bs.alert'));

    if (e.isDefaultPrevented()) return;

    $parent.removeClass('in');

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove();
    }

    $.support.transition && $parent.hasClass('fade') ? $parent.one('bsTransitionEnd', removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement();
  };

  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.alert');

      if (!data) $this.data('bs.alert', data = new Alert(this));
      if (typeof option == 'string') data[option].call($this);
    });
  }

  var old = $.fn.alert;

  $.fn.alert = Plugin;
  $.fn.alert.Constructor = Alert;

  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old;
    return this;
  };

  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close);
}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function Button(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Button.DEFAULTS, options);
    this.isLoading = false;
  };

  Button.VERSION = '3.3.7';

  Button.DEFAULTS = {
    loadingText: 'loading...'
  };

  Button.prototype.setState = function (state) {
    var d = 'disabled';
    var $el = this.$element;
    var val = $el.is('input') ? 'val' : 'html';
    var data = $el.data();

    state += 'Text';

    if (data.resetText == null) $el.data('resetText', $el[val]());

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state]);

      if (state == 'loadingText') {
        this.isLoading = true;
        $el.addClass(d).attr(d, d).prop(d, true);
      } else if (this.isLoading) {
        this.isLoading = false;
        $el.removeClass(d).removeAttr(d).prop(d, false);
      }
    }, this), 0);
  };

  Button.prototype.toggle = function () {
    var changed = true;
    var $parent = this.$element.closest('[data-toggle="buttons"]');

    if ($parent.length) {
      var $input = this.$element.find('input');
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false;
        $parent.find('.active').removeClass('active');
        this.$element.addClass('active');
      } else if ($input.prop('type') == 'checkbox') {
        if ($input.prop('checked') !== this.$element.hasClass('active')) changed = false;
        this.$element.toggleClass('active');
      }
      $input.prop('checked', this.$element.hasClass('active'));
      if (changed) $input.trigger('change');
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'));
      this.$element.toggleClass('active');
    }
  };

  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.button');
      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

      if (!data) $this.data('bs.button', data = new Button(this, options));

      if (option == 'toggle') data.toggle();else if (option) data.setState(option);
    });
  }

  var old = $.fn.button;

  $.fn.button = Plugin;
  $.fn.button.Constructor = Button;

  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old;
    return this;
  };

  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    var $btn = $(e.target).closest('.btn');
    Plugin.call($btn, 'toggle');
    if (!$(e.target).is('input[type="radio"], input[type="checkbox"]')) {
      // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
      e.preventDefault();
      // The target component still receive the focus
      if ($btn.is('input,button')) $btn.trigger('focus');else $btn.find('input:visible,button:visible').first().trigger('focus');
    }
  }).on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type));
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function Carousel(element, options) {
    this.$element = $(element);
    this.$indicators = this.$element.find('.carousel-indicators');
    this.options = options;
    this.paused = null;
    this.sliding = null;
    this.interval = null;
    this.$active = null;
    this.$items = null;

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this));

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element.on('mouseenter.bs.carousel', $.proxy(this.pause, this)).on('mouseleave.bs.carousel', $.proxy(this.cycle, this));
  };

  Carousel.VERSION = '3.3.7';

  Carousel.TRANSITION_DURATION = 600;

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  };

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return;
    switch (e.which) {
      case 37:
        this.prev();break;
      case 39:
        this.next();break;
      default:
        return;
    }

    e.preventDefault();
  };

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false);

    this.interval && clearInterval(this.interval);

    this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));

    return this;
  };

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item');
    return this.$items.index(item || this.$active);
  };

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active);
    var willWrap = direction == 'prev' && activeIndex === 0 || direction == 'next' && activeIndex == this.$items.length - 1;
    if (willWrap && !this.options.wrap) return active;
    var delta = direction == 'prev' ? -1 : 1;
    var itemIndex = (activeIndex + delta) % this.$items.length;
    return this.$items.eq(itemIndex);
  };

  Carousel.prototype.to = function (pos) {
    var that = this;
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'));

    if (pos > this.$items.length - 1 || pos < 0) return;

    if (this.sliding) return this.$element.one('slid.bs.carousel', function () {
      that.to(pos);
    }); // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle();

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos));
  };

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true);

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end);
      this.cycle(true);
    }

    this.interval = clearInterval(this.interval);

    return this;
  };

  Carousel.prototype.next = function () {
    if (this.sliding) return;
    return this.slide('next');
  };

  Carousel.prototype.prev = function () {
    if (this.sliding) return;
    return this.slide('prev');
  };

  Carousel.prototype.slide = function (type, next) {
    var $active = this.$element.find('.item.active');
    var $next = next || this.getItemForDirection(type, $active);
    var isCycling = this.interval;
    var direction = type == 'next' ? 'left' : 'right';
    var that = this;

    if ($next.hasClass('active')) return this.sliding = false;

    var relatedTarget = $next[0];
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    });
    this.$element.trigger(slideEvent);
    if (slideEvent.isDefaultPrevented()) return;

    this.sliding = true;

    isCycling && this.pause();

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active');
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
      $nextIndicator && $nextIndicator.addClass('active');
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }); // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type);
      $next[0].offsetWidth; // force reflow
      $active.addClass(direction);
      $next.addClass(direction);
      $active.one('bsTransitionEnd', function () {
        $next.removeClass([type, direction].join(' ')).addClass('active');
        $active.removeClass(['active', direction].join(' '));
        that.sliding = false;
        setTimeout(function () {
          that.$element.trigger(slidEvent);
        }, 0);
      }).emulateTransitionEnd(Carousel.TRANSITION_DURATION);
    } else {
      $active.removeClass('active');
      $next.addClass('active');
      this.sliding = false;
      this.$element.trigger(slidEvent);
    }

    isCycling && this.cycle();

    return this;
  };

  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.carousel');
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);
      var action = typeof option == 'string' ? option : options.slide;

      if (!data) $this.data('bs.carousel', data = new Carousel(this, options));
      if (typeof option == 'number') data.to(option);else if (action) data[action]();else if (options.interval) data.pause().cycle();
    });
  }

  var old = $.fn.carousel;

  $.fn.carousel = Plugin;
  $.fn.carousel.Constructor = Carousel;

  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old;
    return this;
  };

  // CAROUSEL DATA-API
  // =================

  var clickHandler = function clickHandler(e) {
    var href;
    var $this = $(this);
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
    if (!$target.hasClass('carousel')) return;
    var options = $.extend({}, $target.data(), $this.data());
    var slideIndex = $this.attr('data-slide-to');
    if (slideIndex) options.interval = false;

    Plugin.call($target, options);

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex);
    }

    e.preventDefault();
  };

  $(document).on('click.bs.carousel.data-api', '[data-slide]', clickHandler).on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler);

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this);
      Plugin.call($carousel, $carousel.data());
    });
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function Collapse(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Collapse.DEFAULTS, options);
    this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],' + '[data-toggle="collapse"][data-target="#' + element.id + '"]');
    this.transitioning = null;

    if (this.options.parent) {
      this.$parent = this.getParent();
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger);
    }

    if (this.options.toggle) this.toggle();
  };

  Collapse.VERSION = '3.3.7';

  Collapse.TRANSITION_DURATION = 350;

  Collapse.DEFAULTS = {
    toggle: true
  };

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width');
    return hasWidth ? 'width' : 'height';
  };

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return;

    var activesData;
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing');

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse');
      if (activesData && activesData.transitioning) return;
    }

    var startEvent = $.Event('show.bs.collapse');
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;

    if (actives && actives.length) {
      Plugin.call(actives, 'hide');
      activesData || actives.data('bs.collapse', null);
    }

    var dimension = this.dimension();

    this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded', true);

    this.$trigger.removeClass('collapsed').attr('aria-expanded', true);

    this.transitioning = 1;

    var complete = function complete() {
      this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('');
      this.transitioning = 0;
      this.$element.trigger('shown.bs.collapse');
    };

    if (!$.support.transition) return complete.call(this);

    var scrollSize = $.camelCase(['scroll', dimension].join('-'));

    this.$element.one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
  };

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return;

    var startEvent = $.Event('hide.bs.collapse');
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;

    var dimension = this.dimension();

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight;

    this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded', false);

    this.$trigger.addClass('collapsed').attr('aria-expanded', false);

    this.transitioning = 1;

    var complete = function complete() {
      this.transitioning = 0;
      this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse');
    };

    if (!$.support.transition) return complete.call(this);

    this.$element[dimension](0).one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION);
  };

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']();
  };

  Collapse.prototype.getParent = function () {
    return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function (i, element) {
      var $element = $(element);
      this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
    }, this)).end();
  };

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in');

    $element.attr('aria-expanded', isOpen);
    $trigger.toggleClass('collapsed', !isOpen).attr('aria-expanded', isOpen);
  };

  function getTargetFromTrigger($trigger) {
    var href;
    var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); // strip for ie7

    return $(target);
  }

  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.collapse');
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false;
      if (!data) $this.data('bs.collapse', data = new Collapse(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.collapse;

  $.fn.collapse = Plugin;
  $.fn.collapse.Constructor = Collapse;

  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old;
    return this;
  };

  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this = $(this);

    if (!$this.attr('data-target')) e.preventDefault();

    var $target = getTargetFromTrigger($this);
    var data = $target.data('bs.collapse');
    var option = data ? 'toggle' : $this.data();

    Plugin.call($target, option);
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop';
  var toggle = '[data-toggle="dropdown"]';
  var Dropdown = function Dropdown(element) {
    $(element).on('click.bs.dropdown', this.toggle);
  };

  Dropdown.VERSION = '3.3.7';

  function getParent($this) {
    var selector = $this.attr('data-target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    var $parent = selector && $(selector);

    return $parent && $parent.length ? $parent : $this.parent();
  }

  function clearMenus(e) {
    if (e && e.which === 3) return;
    $(backdrop).remove();
    $(toggle).each(function () {
      var $this = $(this);
      var $parent = getParent($this);
      var relatedTarget = { relatedTarget: this };

      if (!$parent.hasClass('open')) return;

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return;

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));

      if (e.isDefaultPrevented()) return;

      $this.attr('aria-expanded', 'false');
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget));
    });
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this);

    if ($this.is('.disabled, :disabled')) return;

    var $parent = getParent($this);
    var isActive = $parent.hasClass('open');

    clearMenus();

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($(this)).on('click', clearMenus);
      }

      var relatedTarget = { relatedTarget: this };
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));

      if (e.isDefaultPrevented()) return;

      $this.trigger('focus').attr('aria-expanded', 'true');

      $parent.toggleClass('open').trigger($.Event('shown.bs.dropdown', relatedTarget));
    }

    return false;
  };

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;

    var $this = $(this);

    e.preventDefault();
    e.stopPropagation();

    if ($this.is('.disabled, :disabled')) return;

    var $parent = getParent($this);
    var isActive = $parent.hasClass('open');

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus');
      return $this.trigger('click');
    }

    var desc = ' li:not(.disabled):visible a';
    var $items = $parent.find('.dropdown-menu' + desc);

    if (!$items.length) return;

    var index = $items.index(e.target);

    if (e.which == 38 && index > 0) index--; // up
    if (e.which == 40 && index < $items.length - 1) index++; // down
    if (!~index) index = 0;

    $items.eq(index).trigger('focus');
  };

  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.dropdown');

      if (!data) $this.data('bs.dropdown', data = new Dropdown(this));
      if (typeof option == 'string') data[option].call($this);
    });
  }

  var old = $.fn.dropdown;

  $.fn.dropdown = Plugin;
  $.fn.dropdown.Constructor = Dropdown;

  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old;
    return this;
  };

  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function (e) {
    e.stopPropagation();
  }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown);
}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function Modal(element, options) {
    this.options = options;
    this.$body = $(document.body);
    this.$element = $(element);
    this.$dialog = this.$element.find('.modal-dialog');
    this.$backdrop = null;
    this.isShown = null;
    this.originalBodyPad = null;
    this.scrollbarWidth = 0;
    this.ignoreBackdropClick = false;

    if (this.options.remote) {
      this.$element.find('.modal-content').load(this.options.remote, $.proxy(function () {
        this.$element.trigger('loaded.bs.modal');
      }, this));
    }
  };

  Modal.VERSION = '3.3.7';

  Modal.TRANSITION_DURATION = 300;
  Modal.BACKDROP_TRANSITION_DURATION = 150;

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  };

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget);
  };

  Modal.prototype.show = function (_relatedTarget) {
    var that = this;
    var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget });

    this.$element.trigger(e);

    if (this.isShown || e.isDefaultPrevented()) return;

    this.isShown = true;

    this.checkScrollbar();
    this.setScrollbar();
    this.$body.addClass('modal-open');

    this.escape();
    this.resize();

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
      });
    });

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade');

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body); // don't move modals dom position
      }

      that.$element.show().scrollTop(0);

      that.adjustDialog();

      if (transition) {
        that.$element[0].offsetWidth; // force reflow
      }

      that.$element.addClass('in');

      that.enforceFocus();

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget });

      transition ? that.$dialog // wait for modal to slide in
      .one('bsTransitionEnd', function () {
        that.$element.trigger('focus').trigger(e);
      }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger('focus').trigger(e);
    });
  };

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault();

    e = $.Event('hide.bs.modal');

    this.$element.trigger(e);

    if (!this.isShown || e.isDefaultPrevented()) return;

    this.isShown = false;

    this.escape();
    this.resize();

    $(document).off('focusin.bs.modal');

    this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal');

    this.$dialog.off('mousedown.dismiss.bs.modal');

    $.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
  };

  Modal.prototype.enforceFocus = function () {
    $(document).off('focusin.bs.modal') // guard against infinite focus loop
    .on('focusin.bs.modal', $.proxy(function (e) {
      if (document !== e.target && this.$element[0] !== e.target && !this.$element.has(e.target).length) {
        this.$element.trigger('focus');
      }
    }, this));
  };

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide();
      }, this));
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal');
    }
  };

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this));
    } else {
      $(window).off('resize.bs.modal');
    }
  };

  Modal.prototype.hideModal = function () {
    var that = this;
    this.$element.hide();
    this.backdrop(function () {
      that.$body.removeClass('modal-open');
      that.resetAdjustments();
      that.resetScrollbar();
      that.$element.trigger('hidden.bs.modal');
    });
  };

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove();
    this.$backdrop = null;
  };

  Modal.prototype.backdrop = function (callback) {
    var that = this;
    var animate = this.$element.hasClass('fade') ? 'fade' : '';

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate;

      this.$backdrop = $(document.createElement('div')).addClass('modal-backdrop ' + animate).appendTo(this.$body);

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false;
          return;
        }
        if (e.target !== e.currentTarget) return;
        this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide();
      }, this));

      if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

      this.$backdrop.addClass('in');

      if (!callback) return;

      doAnimate ? this.$backdrop.one('bsTransitionEnd', callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in');

      var callbackRemove = function callbackRemove() {
        that.removeBackdrop();
        callback && callback();
      };
      $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
    } else if (callback) {
      callback();
    }
  };

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog();
  };

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;

    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    });
  };

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    });
  };

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
      // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect();
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
    this.scrollbarWidth = this.measureScrollbar();
  };

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt(this.$body.css('padding-right') || 0, 10);
    this.originalBodyPad = document.body.style.paddingRight || '';
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
  };

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad);
  };

  Modal.prototype.measureScrollbar = function () {
    // thx walsh
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'modal-scrollbar-measure';
    this.$body.append(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this.$body[0].removeChild(scrollDiv);
    return scrollbarWidth;
  };

  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.modal');
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);

      if (!data) $this.data('bs.modal', data = new Modal(this, options));
      if (typeof option == 'string') data[option](_relatedTarget);else if (options.show) data.show(_relatedTarget);
    });
  }

  var old = $.fn.modal;

  $.fn.modal = Plugin;
  $.fn.modal.Constructor = Modal;

  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old;
    return this;
  };

  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this);
    var href = $this.attr('href');
    var $target = $($this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
    var option = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

    if ($this.is('a')) e.preventDefault();

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return; // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus');
      });
    });
    Plugin.call($target, option, this);
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function Tooltip(element, options) {
    this.type = null;
    this.options = null;
    this.enabled = null;
    this.timeout = null;
    this.hoverState = null;
    this.$element = null;
    this.inState = null;

    this.init('tooltip', element, options);
  };

  Tooltip.VERSION = '3.3.7';

  Tooltip.TRANSITION_DURATION = 150;

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  };

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled = true;
    this.type = type;
    this.$element = $(element);
    this.options = this.getOptions(options);
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport);
    this.inState = { click: false, hover: false, focus: false };

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!');
    }

    var triggers = this.options.trigger.split(' ');

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i];

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
      } else if (trigger != 'manual') {
        var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';

        this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
      }
    }

    this.options.selector ? this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' }) : this.fixTitle();
  };

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS;
  };

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options);

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      };
    }

    return options;
  };

  Tooltip.prototype.getDelegateOptions = function () {
    var options = {};
    var defaults = this.getDefaults();

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value;
    });

    return options;
  };

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
      $(obj.currentTarget).data('bs.' + this.type, self);
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true;
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in';
      return;
    }

    clearTimeout(self.timeout);

    self.hoverState = 'in';

    if (!self.options.delay || !self.options.delay.show) return self.show();

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show();
    }, self.options.delay.show);
  };

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true;
    }

    return false;
  };

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
      $(obj.currentTarget).data('bs.' + this.type, self);
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false;
    }

    if (self.isInStateTrue()) return;

    clearTimeout(self.timeout);

    self.hoverState = 'out';

    if (!self.options.delay || !self.options.delay.hide) return self.hide();

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide();
    }, self.options.delay.hide);
  };

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type);

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e);

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
      if (e.isDefaultPrevented() || !inDom) return;
      var that = this;

      var $tip = this.tip();

      var tipId = this.getUID(this.type);

      this.setContent();
      $tip.attr('id', tipId);
      this.$element.attr('aria-describedby', tipId);

      if (this.options.animation) $tip.addClass('fade');

      var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;

      var autoToken = /\s?auto?\s?/i;
      var autoPlace = autoToken.test(placement);
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top';

      $tip.detach().css({ top: 0, left: 0, display: 'block' }).addClass(placement).data('bs.' + this.type, this);

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
      this.$element.trigger('inserted.bs.' + this.type);

      var pos = this.getPosition();
      var actualWidth = $tip[0].offsetWidth;
      var actualHeight = $tip[0].offsetHeight;

      if (autoPlace) {
        var orgPlacement = placement;
        var viewportDim = this.getPosition(this.$viewport);

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top' : placement == 'top' && pos.top - actualHeight < viewportDim.top ? 'bottom' : placement == 'right' && pos.right + actualWidth > viewportDim.width ? 'left' : placement == 'left' && pos.left - actualWidth < viewportDim.left ? 'right' : placement;

        $tip.removeClass(orgPlacement).addClass(placement);
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);

      this.applyPlacement(calculatedOffset, placement);

      var complete = function complete() {
        var prevHoverState = that.hoverState;
        that.$element.trigger('shown.bs.' + that.type);
        that.hoverState = null;

        if (prevHoverState == 'out') that.leave(that);
      };

      $.support.transition && this.$tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
    }
  };

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip = this.tip();
    var width = $tip[0].offsetWidth;
    var height = $tip[0].offsetHeight;

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10);
    var marginLeft = parseInt($tip.css('margin-left'), 10);

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop)) marginTop = 0;
    if (isNaN(marginLeft)) marginLeft = 0;

    offset.top += marginTop;
    offset.left += marginLeft;

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function using(props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        });
      }
    }, offset), 0);

    $tip.addClass('in');

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth = $tip[0].offsetWidth;
    var actualHeight = $tip[0].offsetHeight;

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight;
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);

    if (delta.left) offset.left += delta.left;else offset.top += delta.top;

    var isVertical = /top|bottom/.test(placement);
    var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight';

    $tip.offset(offset);
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
  };

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow().css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%').css(isVertical ? 'top' : 'left', '');
  };

  Tooltip.prototype.setContent = function () {
    var $tip = this.tip();
    var title = this.getTitle();

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
    $tip.removeClass('fade in top bottom left right');
  };

  Tooltip.prototype.hide = function (callback) {
    var that = this;
    var $tip = $(this.$tip);
    var e = $.Event('hide.bs.' + this.type);

    function complete() {
      if (that.hoverState != 'in') $tip.detach();
      if (that.$element) {
        // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + that.type);
      }
      callback && callback();
    }

    this.$element.trigger(e);

    if (e.isDefaultPrevented()) return;

    $tip.removeClass('in');

    $.support.transition && $tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();

    this.hoverState = null;

    return this;
  };

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element;
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
    }
  };

  Tooltip.prototype.hasContent = function () {
    return this.getTitle();
  };

  Tooltip.prototype.getPosition = function ($element) {
    $element = $element || this.$element;

    var el = $element[0];
    var isBody = el.tagName == 'BODY';

    var elRect = el.getBoundingClientRect();
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top });
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement;
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset = isBody ? { top: 0, left: 0 } : isSvg ? null : $element.offset();
    var scroll = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() };
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null;

    return $.extend({}, elRect, scroll, outerDims, elOffset);
  };

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2 } : placement == 'top' ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } : placement == 'left' ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
    /* placement == 'right' */{ top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width };
  };

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 };
    if (!this.$viewport) return delta;

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
    var viewportDimensions = this.getPosition(this.$viewport);

    if (/right|left/.test(placement)) {
      var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
      if (topEdgeOffset < viewportDimensions.top) {
        // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset;
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
        // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
      }
    } else {
      var leftEdgeOffset = pos.left - viewportPadding;
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
      if (leftEdgeOffset < viewportDimensions.left) {
        // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset;
      } else if (rightEdgeOffset > viewportDimensions.right) {
        // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
      }
    }

    return delta;
  };

  Tooltip.prototype.getTitle = function () {
    var title;
    var $e = this.$element;
    var o = this.options;

    title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);

    return title;
  };

  Tooltip.prototype.getUID = function (prefix) {
    do {
      prefix += ~~(Math.random() * 1000000);
    } while (document.getElementById(prefix));
    return prefix;
  };

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template);
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!');
      }
    }
    return this.$tip;
  };

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow');
  };

  Tooltip.prototype.enable = function () {
    this.enabled = true;
  };

  Tooltip.prototype.disable = function () {
    this.enabled = false;
  };

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled;
  };

  Tooltip.prototype.toggle = function (e) {
    var self = this;
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type);
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions());
        $(e.currentTarget).data('bs.' + this.type, self);
      }
    }

    if (e) {
      self.inState.click = !self.inState.click;
      if (self.isInStateTrue()) self.enter(self);else self.leave(self);
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self);
    }
  };

  Tooltip.prototype.destroy = function () {
    var that = this;
    clearTimeout(this.timeout);
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type);
      if (that.$tip) {
        that.$tip.detach();
      }
      that.$tip = null;
      that.$arrow = null;
      that.$viewport = null;
      that.$element = null;
    });
  };

  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.tooltip');
      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

      if (!data && /destroy|hide/.test(option)) return;
      if (!data) $this.data('bs.tooltip', data = new Tooltip(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.tooltip;

  $.fn.tooltip = Plugin;
  $.fn.tooltip.Constructor = Tooltip;

  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old;
    return this;
  };
}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function Popover(element, options) {
    this.init('popover', element, options);
  };

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js');

  Popover.VERSION = '3.3.7';

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  });

  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);

  Popover.prototype.constructor = Popover;

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS;
  };

  Popover.prototype.setContent = function () {
    var $tip = this.tip();
    var title = this.getTitle();
    var content = this.getContent();

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
    $tip.find('.popover-content').children().detach().end()[// we use append for html objects to maintain js events
    this.options.html ? typeof content == 'string' ? 'html' : 'append' : 'text'](content);

    $tip.removeClass('fade top bottom left right in');

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide();
  };

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent();
  };

  Popover.prototype.getContent = function () {
    var $e = this.$element;
    var o = this.options;

    return $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content);
  };

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow');
  };

  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.popover');
      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

      if (!data && /destroy|hide/.test(option)) return;
      if (!data) $this.data('bs.popover', data = new Popover(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.popover;

  $.fn.popover = Plugin;
  $.fn.popover.Constructor = Popover;

  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old;
    return this;
  };
}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body = $(document.body);
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element);
    this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
    this.selector = (this.options.target || '') + ' .nav li > a';
    this.offsets = [];
    this.targets = [];
    this.activeTarget = null;
    this.scrollHeight = 0;

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this));
    this.refresh();
    this.process();
  }

  ScrollSpy.VERSION = '3.3.7';

  ScrollSpy.DEFAULTS = {
    offset: 10
  };

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
  };

  ScrollSpy.prototype.refresh = function () {
    var that = this;
    var offsetMethod = 'offset';
    var offsetBase = 0;

    this.offsets = [];
    this.targets = [];
    this.scrollHeight = this.getScrollHeight();

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position';
      offsetBase = this.$scrollElement.scrollTop();
    }

    this.$body.find(this.selector).map(function () {
      var $el = $(this);
      var href = $el.data('target') || $el.attr('href');
      var $href = /^#./.test(href) && $(href);

      return $href && $href.length && $href.is(':visible') && [[$href[offsetMethod]().top + offsetBase, href]] || null;
    }).sort(function (a, b) {
      return a[0] - b[0];
    }).each(function () {
      that.offsets.push(this[0]);
      that.targets.push(this[1]);
    });
  };

  ScrollSpy.prototype.process = function () {
    var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
    var scrollHeight = this.getScrollHeight();
    var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();
    var offsets = this.offsets;
    var targets = this.targets;
    var activeTarget = this.activeTarget;
    var i;

    if (this.scrollHeight != scrollHeight) {
      this.refresh();
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null;
      return this.clear();
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i] && scrollTop >= offsets[i] && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) && this.activate(targets[i]);
    }
  };

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target;

    this.clear();

    var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';

    var active = $(selector).parents('li').addClass('active');

    if (active.parent('.dropdown-menu').length) {
      active = active.closest('li.dropdown').addClass('active');
    }

    active.trigger('activate.bs.scrollspy');
  };

  ScrollSpy.prototype.clear = function () {
    $(this.selector).parentsUntil(this.options.target, '.active').removeClass('active');
  };

  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.scrollspy');
      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

      if (!data) $this.data('bs.scrollspy', data = new ScrollSpy(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.scrollspy;

  $.fn.scrollspy = Plugin;
  $.fn.scrollspy.Constructor = ScrollSpy;

  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old;
    return this;
  };

  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this);
      Plugin.call($spy, $spy.data());
    });
  });
}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function Tab(element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element);
    // jscs:enable requireDollarBeforejQueryAssignment
  };

  Tab.VERSION = '3.3.7';

  Tab.TRANSITION_DURATION = 150;

  Tab.prototype.show = function () {
    var $this = this.element;
    var $ul = $this.closest('ul:not(.dropdown-menu)');
    var selector = $this.data('target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return;

    var $previous = $ul.find('.active:last a');
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    });
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    });

    $previous.trigger(hideEvent);
    $this.trigger(showEvent);

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;

    var $target = $(selector);

    this.activate($this.closest('li'), $ul);
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      });
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      });
    });
  };

  Tab.prototype.activate = function (element, container, callback) {
    var $active = container.find('> .active');
    var transition = callback && $.support.transition && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length);

    function next() {
      $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', false);

      element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', true);

      if (transition) {
        element[0].offsetWidth; // reflow for transition
        element.addClass('in');
      } else {
        element.removeClass('fade');
      }

      if (element.parent('.dropdown-menu').length) {
        element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', true);
      }

      callback && callback();
    }

    $active.length && transition ? $active.one('bsTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();

    $active.removeClass('in');
  };

  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.tab');

      if (!data) $this.data('bs.tab', data = new Tab(this));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.tab;

  $.fn.tab = Plugin;
  $.fn.tab.Constructor = Tab;

  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old;
    return this;
  };

  // TAB DATA-API
  // ============

  var clickHandler = function clickHandler(e) {
    e.preventDefault();
    Plugin.call($(this), 'show');
  };

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler).on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler);
}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function Affix(element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options);

    this.$target = $(this.options.target).on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this));

    this.$element = $(element);
    this.affixed = null;
    this.unpin = null;
    this.pinnedOffset = null;

    this.checkPosition();
  };

  Affix.VERSION = '3.3.7';

  Affix.RESET = 'affix affix-top affix-bottom';

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  };

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop = this.$target.scrollTop();
    var position = this.$element.offset();
    var targetHeight = this.$target.height();

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false;

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return scrollTop + this.unpin <= position.top ? false : 'bottom';
      return scrollTop + targetHeight <= scrollHeight - offsetBottom ? false : 'bottom';
    }

    var initializing = this.affixed == null;
    var colliderTop = initializing ? scrollTop : position.top;
    var colliderHeight = initializing ? targetHeight : height;

    if (offsetTop != null && scrollTop <= offsetTop) return 'top';
    if (offsetBottom != null && colliderTop + colliderHeight >= scrollHeight - offsetBottom) return 'bottom';

    return false;
  };

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(Affix.RESET).addClass('affix');
    var scrollTop = this.$target.scrollTop();
    var position = this.$element.offset();
    return this.pinnedOffset = position.top - scrollTop;
  };

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1);
  };

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return;

    var height = this.$element.height();
    var offset = this.options.offset;
    var offsetTop = offset.top;
    var offsetBottom = offset.bottom;
    var scrollHeight = Math.max($(document).height(), $(document.body).height());

    if ((typeof offset === 'undefined' ? 'undefined' : _typeof(offset)) != 'object') offsetBottom = offsetTop = offset;
    if (typeof offsetTop == 'function') offsetTop = offset.top(this.$element);
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element);

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '');

      var affixType = 'affix' + (affix ? '-' + affix : '');
      var e = $.Event(affixType + '.bs.affix');

      this.$element.trigger(e);

      if (e.isDefaultPrevented()) return;

      this.affixed = affix;
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null;

      this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix', 'affixed') + '.bs.affix');
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      });
    }
  };

  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.affix');
      var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

      if (!data) $this.data('bs.affix', data = new Affix(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.affix;

  $.fn.affix = Plugin;
  $.fn.affix.Constructor = Affix;

  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old;
    return this;
  };

  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this);
      var data = $spy.data();

      data.offset = data.offset || {};

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom;
      if (data.offsetTop != null) data.offset.top = data.offsetTop;

      Plugin.call($spy, data);
    });
  });
}(jQuery);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Sticky Plugin v1.0.4 for jQuery
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 02/14/2011
// Date: 07/20/2015
// Website: http://stickyjs.com/
// Description: Makes an element on the page stick on the screen as you scroll
//              It will only set the 'top' and 'position' of your element, you
//              might need to adjust the width in some cases.

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function ($) {
  var slice = Array.prototype.slice; // save ref to original slice()
  var splice = Array.prototype.splice; // save ref to original slice()

  var defaults = {
    topSpacing: 0,
    bottomSpacing: 0,
    className: 'is-sticky',
    wrapperClassName: 'sticky-wrapper',
    center: false,
    getWidthFrom: '',
    widthFromWrapper: true, // works only when .getWidthFrom is empty
    responsiveWidth: false,
    zIndex: 'auto'
  },
      $window = $(window),
      $document = $(document),
      sticked = [],
      windowHeight = $window.height(),
      scroller = function scroller() {
    var scrollTop = $window.scrollTop(),
        documentHeight = $document.height(),
        dwh = documentHeight - windowHeight,
        extra = scrollTop > dwh ? dwh - scrollTop : 0;

    for (var i = 0, l = sticked.length; i < l; i++) {
      var s = sticked[i],
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra;

      //update height in case of dynamic content
      s.stickyWrapper.css('height', s.stickyElement.outerHeight());

      if (scrollTop <= etse) {
        if (s.currentTop !== null) {
          s.stickyElement.css({
            'width': '',
            'position': '',
            'top': '',
            'z-index': ''
          });
          s.stickyElement.parent().removeClass(s.className);
          s.stickyElement.trigger('sticky-end', [s]);
          s.currentTop = null;
        }
      } else {
        var newTop = documentHeight - s.stickyElement.outerHeight() - s.topSpacing - s.bottomSpacing - scrollTop - extra;
        if (newTop < 0) {
          newTop = newTop + s.topSpacing;
        } else {
          newTop = s.topSpacing;
        }
        if (s.currentTop !== newTop) {
          var newWidth;
          if (s.getWidthFrom) {
            newWidth = $(s.getWidthFrom).width() || null;
          } else if (s.widthFromWrapper) {
            newWidth = s.stickyWrapper.width();
          }
          if (newWidth == null) {
            newWidth = s.stickyElement.width();
          }
          s.stickyElement.css('width', newWidth).css('position', 'fixed').css('top', newTop).css('z-index', s.zIndex);

          s.stickyElement.parent().addClass(s.className);

          if (s.currentTop === null) {
            s.stickyElement.trigger('sticky-start', [s]);
          } else {
            // sticky is started but it have to be repositioned
            s.stickyElement.trigger('sticky-update', [s]);
          }

          if (s.currentTop === s.topSpacing && s.currentTop > newTop || s.currentTop === null && newTop < s.topSpacing) {
            // just reached bottom || just started to stick but bottom is already reached
            s.stickyElement.trigger('sticky-bottom-reached', [s]);
          } else if (s.currentTop !== null && newTop === s.topSpacing && s.currentTop < newTop) {
            // sticky is started && sticked at topSpacing && overflowing from top just finished
            s.stickyElement.trigger('sticky-bottom-unreached', [s]);
          }

          s.currentTop = newTop;
        }

        // Check if sticky has reached end of container and stop sticking
        var stickyWrapperContainer = s.stickyWrapper.parent();
        var unstick = s.stickyElement.offset().top + s.stickyElement.outerHeight() >= stickyWrapperContainer.offset().top + stickyWrapperContainer.outerHeight() && s.stickyElement.offset().top <= s.topSpacing;

        if (unstick) {
          s.stickyElement.css('position', 'absolute').css('top', '').css('bottom', 0).css('z-index', '');
        } else {
          s.stickyElement.css('position', 'fixed').css('top', newTop).css('bottom', '').css('z-index', s.zIndex);
        }
      }
    }
  },
      resizer = function resizer() {
    windowHeight = $window.height();

    for (var i = 0, l = sticked.length; i < l; i++) {
      var s = sticked[i];
      var newWidth = null;
      if (s.getWidthFrom) {
        if (s.responsiveWidth) {
          newWidth = $(s.getWidthFrom).width();
        }
      } else if (s.widthFromWrapper) {
        newWidth = s.stickyWrapper.width();
      }
      if (newWidth != null) {
        s.stickyElement.css('width', newWidth);
      }
    }
  },
      methods = {
    init: function init(options) {
      var o = $.extend({}, defaults, options);
      return this.each(function () {
        var stickyElement = $(this);

        var stickyId = stickyElement.attr('id');
        var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName;
        var wrapper = $('<div></div>').attr('id', wrapperId).addClass(o.wrapperClassName);

        stickyElement.wrapAll(wrapper);

        var stickyWrapper = stickyElement.parent();

        if (o.center) {
          stickyWrapper.css({ width: stickyElement.outerWidth(), marginLeft: "auto", marginRight: "auto" });
        }

        if (stickyElement.css("float") === "right") {
          stickyElement.css({ "float": "none" }).parent().css({ "float": "right" });
        }

        o.stickyElement = stickyElement;
        o.stickyWrapper = stickyWrapper;
        o.currentTop = null;

        sticked.push(o);

        methods.setWrapperHeight(this);
        methods.setupChangeListeners(this);
      });
    },

    setWrapperHeight: function setWrapperHeight(stickyElement) {
      var element = $(stickyElement);
      var stickyWrapper = element.parent();
      if (stickyWrapper) {
        stickyWrapper.css('height', element.outerHeight());
      }
    },

    setupChangeListeners: function setupChangeListeners(stickyElement) {
      if (window.MutationObserver) {
        var mutationObserver = new window.MutationObserver(function (mutations) {
          if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
            methods.setWrapperHeight(stickyElement);
          }
        });
        mutationObserver.observe(stickyElement, { subtree: true, childList: true });
      } else {
        stickyElement.addEventListener('DOMNodeInserted', function () {
          methods.setWrapperHeight(stickyElement);
        }, false);
        stickyElement.addEventListener('DOMNodeRemoved', function () {
          methods.setWrapperHeight(stickyElement);
        }, false);
      }
    },
    update: scroller,
    unstick: function unstick(options) {
      return this.each(function () {
        var that = this;
        var unstickyElement = $(that);

        var removeIdx = -1;
        var i = sticked.length;
        while (i-- > 0) {
          if (sticked[i].stickyElement.get(0) === that) {
            splice.call(sticked, i, 1);
            removeIdx = i;
          }
        }
        if (removeIdx !== -1) {
          unstickyElement.unwrap();
          unstickyElement.css({
            'width': '',
            'position': '',
            'top': '',
            'float': '',
            'z-index': ''
          });
        }
      });
    }
  };

  // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
  if (window.addEventListener) {
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', resizer, false);
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', scroller);
    window.attachEvent('onresize', resizer);
  }

  $.fn.sticky = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if ((typeof method === 'undefined' ? 'undefined' : _typeof(method)) === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };

  $.fn.unstick = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if ((typeof method === 'undefined' ? 'undefined' : _typeof(method)) === 'object' || !method) {
      return methods.unstick.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };
  $(function () {
    setTimeout(scroller, 0);
  });
});
"use strict";

/*! sidr - v2.2.1 - 2016-02-17
 * http://www.berriart.com/sidr/
 * Copyright (c) 2013-2016 Alberto Varela; Licensed MIT */

(function () {
  'use strict';

  var babelHelpers = {};

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  babelHelpers;

  var sidrStatus = {
    moving: false,
    opened: false
  };

  var helper = {
    // Check for valids urls
    // From : http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-an-url

    isUrl: function isUrl(str) {
      var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

      if (pattern.test(str)) {
        return true;
      } else {
        return false;
      }
    },

    // Add sidr prefixes
    addPrefixes: function addPrefixes($element) {
      this.addPrefix($element, 'id');
      this.addPrefix($element, 'class');
      $element.removeAttr('style');
    },
    addPrefix: function addPrefix($element, attribute) {
      var toReplace = $element.attr(attribute);

      if (typeof toReplace === 'string' && toReplace !== '' && toReplace !== 'sidr-inner') {
        $element.attr(attribute, toReplace.replace(/([A-Za-z0-9_.\-]+)/g, 'sidr-' + attribute + '-$1'));
      }
    },

    // Check if transitions is supported
    transitions: function () {
      var body = document.body || document.documentElement,
          style = body.style,
          supported = false,
          property = 'transition';

      if (property in style) {
        supported = true;
      } else {
        (function () {
          var prefixes = ['moz', 'webkit', 'o', 'ms'],
              prefix = undefined,
              i = undefined;

          property = property.charAt(0).toUpperCase() + property.substr(1);
          supported = function () {
            for (i = 0; i < prefixes.length; i++) {
              prefix = prefixes[i];
              if (prefix + property in style) {
                return true;
              }
            }

            return false;
          }();
          property = supported ? '-' + prefix.toLowerCase() + '-' + property.toLowerCase() : null;
        })();
      }

      return {
        supported: supported,
        property: property
      };
    }()
  };

  var $$2 = jQuery;

  var bodyAnimationClass = 'sidr-animating';
  var openAction = 'open';
  var closeAction = 'close';
  var transitionEndEvent = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
  var Menu = function () {
    function Menu(name) {
      babelHelpers.classCallCheck(this, Menu);

      this.name = name;
      this.item = $$2('#' + name);
      this.openClass = name === 'sidr' ? 'sidr-open' : 'sidr-open ' + name + '-open';
      this.menuWidth = this.item.outerWidth(true);
      this.speed = this.item.data('speed');
      this.side = this.item.data('side');
      this.displace = this.item.data('displace');
      this.timing = this.item.data('timing');
      this.method = this.item.data('method');
      this.onOpenCallback = this.item.data('onOpen');
      this.onCloseCallback = this.item.data('onClose');
      this.onOpenEndCallback = this.item.data('onOpenEnd');
      this.onCloseEndCallback = this.item.data('onCloseEnd');
      this.body = $$2(this.item.data('body'));
    }

    babelHelpers.createClass(Menu, [{
      key: 'getAnimation',
      value: function getAnimation(action, element) {
        var animation = {},
            prop = this.side;

        if (action === 'open' && element === 'body') {
          animation[prop] = this.menuWidth + 'px';
        } else if (action === 'close' && element === 'menu') {
          animation[prop] = '-' + this.menuWidth + 'px';
        } else {
          animation[prop] = 0;
        }

        return animation;
      }
    }, {
      key: 'prepareBody',
      value: function prepareBody(action) {
        var prop = action === 'open' ? 'hidden' : '';

        // Prepare page if container is body
        if (this.body.is('body')) {
          var $html = $$2('html'),
              scrollTop = $html.scrollTop();

          $html.css('overflow-x', prop).scrollTop(scrollTop);
        }
      }
    }, {
      key: 'openBody',
      value: function openBody() {
        if (this.displace) {
          var transitions = helper.transitions,
              $body = this.body;

          if (transitions.supported) {
            $body.css(transitions.property, this.side + ' ' + this.speed / 1000 + 's ' + this.timing).css(this.side, 0).css({
              width: $body.width(),
              position: 'absolute'
            });
            $body.css(this.side, this.menuWidth + 'px');
          } else {
            var bodyAnimation = this.getAnimation(openAction, 'body');

            $body.css({
              width: $body.width(),
              position: 'absolute'
            }).animate(bodyAnimation, {
              queue: false,
              duration: this.speed
            });
          }
        }
      }
    }, {
      key: 'onCloseBody',
      value: function onCloseBody() {
        var transitions = helper.transitions,
            resetStyles = {
          width: '',
          position: '',
          right: '',
          left: ''
        };

        if (transitions.supported) {
          resetStyles[transitions.property] = '';
        }

        this.body.css(resetStyles).unbind(transitionEndEvent);
      }
    }, {
      key: 'closeBody',
      value: function closeBody() {
        var _this = this;

        if (this.displace) {
          if (helper.transitions.supported) {
            this.body.css(this.side, 0).one(transitionEndEvent, function () {
              _this.onCloseBody();
            });
          } else {
            var bodyAnimation = this.getAnimation(closeAction, 'body');

            this.body.animate(bodyAnimation, {
              queue: false,
              duration: this.speed,
              complete: function complete() {
                _this.onCloseBody();
              }
            });
          }
        }
      }
    }, {
      key: 'moveBody',
      value: function moveBody(action) {
        if (action === openAction) {
          this.openBody();
        } else {
          this.closeBody();
        }
      }
    }, {
      key: 'onOpenMenu',
      value: function onOpenMenu(callback) {
        var name = this.name;

        sidrStatus.moving = false;
        sidrStatus.opened = name;

        this.item.unbind(transitionEndEvent);

        this.body.removeClass(bodyAnimationClass).addClass(this.openClass);

        this.onOpenEndCallback();

        if (typeof callback === 'function') {
          callback(name);
        }
      }
    }, {
      key: 'openMenu',
      value: function openMenu(callback) {
        var _this2 = this;

        var $item = this.item;

        if (helper.transitions.supported) {
          $item.css(this.side, 0).one(transitionEndEvent, function () {
            _this2.onOpenMenu(callback);
          });
        } else {
          var menuAnimation = this.getAnimation(openAction, 'menu');

          $item.css('display', 'block').animate(menuAnimation, {
            queue: false,
            duration: this.speed,
            complete: function complete() {
              _this2.onOpenMenu(callback);
            }
          });
        }
      }
    }, {
      key: 'onCloseMenu',
      value: function onCloseMenu(callback) {
        this.item.css({
          left: '',
          right: ''
        }).unbind(transitionEndEvent);
        $$2('html').css('overflow-x', '');

        sidrStatus.moving = false;
        sidrStatus.opened = false;

        this.body.removeClass(bodyAnimationClass).removeClass(this.openClass);

        this.onCloseEndCallback();

        // Callback
        if (typeof callback === 'function') {
          callback(name);
        }
      }
    }, {
      key: 'closeMenu',
      value: function closeMenu(callback) {
        var _this3 = this;

        var item = this.item;

        if (helper.transitions.supported) {
          item.css(this.side, '').one(transitionEndEvent, function () {
            _this3.onCloseMenu(callback);
          });
        } else {
          var menuAnimation = this.getAnimation(closeAction, 'menu');

          item.animate(menuAnimation, {
            queue: false,
            duration: this.speed,
            complete: function complete() {
              _this3.onCloseMenu();
            }
          });
        }
      }
    }, {
      key: 'moveMenu',
      value: function moveMenu(action, callback) {
        this.body.addClass(bodyAnimationClass);

        if (action === openAction) {
          this.openMenu(callback);
        } else {
          this.closeMenu(callback);
        }
      }
    }, {
      key: 'move',
      value: function move(action, callback) {
        // Lock sidr
        sidrStatus.moving = true;

        this.prepareBody(action);
        this.moveBody(action);
        this.moveMenu(action, callback);
      }
    }, {
      key: 'open',
      value: function open(callback) {
        var _this4 = this;

        // Check if is already opened or moving
        if (sidrStatus.opened === this.name || sidrStatus.moving) {
          return;
        }

        // If another menu opened close first
        if (sidrStatus.opened !== false) {
          var alreadyOpenedMenu = new Menu(sidrStatus.opened);

          alreadyOpenedMenu.close(function () {
            _this4.open(callback);
          });

          return;
        }

        this.move('open', callback);

        // onOpen callback
        this.onOpenCallback();
      }
    }, {
      key: 'close',
      value: function close(callback) {
        // Check if is already closed or moving
        if (sidrStatus.opened !== this.name || sidrStatus.moving) {
          return;
        }

        this.move('close', callback);

        // onClose callback
        this.onCloseCallback();
      }
    }, {
      key: 'toggle',
      value: function toggle(callback) {
        if (sidrStatus.opened === this.name) {
          this.close(callback);
        } else {
          this.open(callback);
        }
      }
    }]);
    return Menu;
  }();

  var $$1 = jQuery;

  function execute(action, name, callback) {
    var sidr = new Menu(name);

    switch (action) {
      case 'open':
        sidr.open(callback);
        break;
      case 'close':
        sidr.close(callback);
        break;
      case 'toggle':
        sidr.toggle(callback);
        break;
      default:
        $$1.error('Method ' + action + ' does not exist on jQuery.sidr');
        break;
    }
  }

  var i;
  var $ = jQuery;
  var publicMethods = ['open', 'close', 'toggle'];
  var methodName;
  var methods = {};
  var getMethod = function getMethod(methodName) {
    return function (name, callback) {
      // Check arguments
      if (typeof name === 'function') {
        callback = name;
        name = 'sidr';
      } else if (!name) {
        name = 'sidr';
      }

      execute(methodName, name, callback);
    };
  };
  for (i = 0; i < publicMethods.length; i++) {
    methodName = publicMethods[i];
    methods[methodName] = getMethod(methodName);
  }

  function sidr(method) {
    if (method === 'status') {
      return sidrStatus;
    } else if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'function' || typeof method === 'string' || !method) {
      return methods.toggle.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sidr');
    }
  }

  var $$3 = jQuery;

  function fillContent($sideMenu, settings) {
    // The menu content
    if (typeof settings.source === 'function') {
      var newContent = settings.source(name);

      $sideMenu.html(newContent);
    } else if (typeof settings.source === 'string' && helper.isUrl(settings.source)) {
      $$3.get(settings.source, function (data) {
        $sideMenu.html(data);
      });
    } else if (typeof settings.source === 'string') {
      var htmlContent = '',
          selectors = settings.source.split(',');

      $$3.each(selectors, function (index, element) {
        htmlContent += '<div class="sidr-inner">' + $$3(element).html() + '</div>';
      });

      // Renaming ids and classes
      if (settings.renaming) {
        var $htmlContent = $$3('<div />').html(htmlContent);

        $htmlContent.find('*').each(function (index, element) {
          var $element = $$3(element);

          helper.addPrefixes($element);
        });
        htmlContent = $htmlContent.html();
      }

      $sideMenu.html(htmlContent);
    } else if (settings.source !== null) {
      $$3.error('Invalid Sidr Source');
    }

    return $sideMenu;
  }

  function fnSidr(options) {
    var transitions = helper.transitions,
        settings = $$3.extend({
      name: 'sidr', // Name for the 'sidr'
      speed: 200, // Accepts standard jQuery effects speeds (i.e. fast, normal or milliseconds)
      side: 'left', // Accepts 'left' or 'right'
      source: null, // Override the source of the content.
      renaming: true, // The ids and classes will be prepended with a prefix when loading existent content
      body: 'body', // Page container selector,
      displace: true, // Displace the body content or not
      timing: 'ease', // Timing function for CSS transitions
      method: 'toggle', // The method to call when element is clicked
      bind: 'touchstart click', // The event(s) to trigger the menu
      onOpen: function onOpen() {},
      // Callback when sidr start opening
      onClose: function onClose() {},
      // Callback when sidr start closing
      onOpenEnd: function onOpenEnd() {},
      // Callback when sidr end opening
      onCloseEnd: function onCloseEnd() {} // Callback when sidr end closing

    }, options),
        name = settings.name,
        $sideMenu = $$3('#' + name);

    // If the side menu do not exist create it
    if ($sideMenu.length === 0) {
      $sideMenu = $$3('<div />').attr('id', name).appendTo($$3('body'));
    }

    // Add transition to menu if are supported
    if (transitions.supported) {
      $sideMenu.css(transitions.property, settings.side + ' ' + settings.speed / 1000 + 's ' + settings.timing);
    }

    // Adding styles and options
    $sideMenu.addClass('sidr').addClass(settings.side).data({
      speed: settings.speed,
      side: settings.side,
      body: settings.body,
      displace: settings.displace,
      timing: settings.timing,
      method: settings.method,
      onOpen: settings.onOpen,
      onClose: settings.onClose,
      onOpenEnd: settings.onOpenEnd,
      onCloseEnd: settings.onCloseEnd
    });

    $sideMenu = fillContent($sideMenu, settings);

    return this.each(function () {
      var $this = $$3(this),
          data = $this.data('sidr'),
          flag = false;

      // If the plugin hasn't been initialized yet
      if (!data) {
        sidrStatus.moving = false;
        sidrStatus.opened = false;

        $this.data('sidr', name);

        $this.bind(settings.bind, function (event) {
          event.preventDefault();

          if (!flag) {
            flag = true;
            sidr(settings.method, name);

            setTimeout(function () {
              flag = false;
            }, 100);
          }
        });
      }
    });
  }

  jQuery.sidr = sidr;
  jQuery.fn.sidr = fnSidr;
})();
'use strict';

/**
 * stacktable.js
 * Author & copyright (c) 2012: John Polacek
 * CardTable by: Justin McNally (2015)
 * Dual MIT & GPL license
 *
 * Page: http://johnpolacek.github.com/stacktable.js
 * Repo: https://github.com/johnpolacek/stacktable.js/
 *
 * jQuery plugin for stacking tables on small screens
 * Requires jQuery version 1.7 or above
 *
 */
;(function ($) {
  $.fn.cardtable = function (options) {
    var $tables = this,
        defaults = { headIndex: 0 },
        settings = $.extend({}, defaults, options),
        headIndex;

    // checking the "headIndex" option presence... or defaults it to 0
    if (options && options.headIndex) headIndex = options.headIndex;else headIndex = 0;

    return $tables.each(function () {
      var $table = $(this);
      if ($table.hasClass('stacktable')) {
        return;
      }
      var table_css = $(this).prop('class');
      var $stacktable = $('<div></div>');
      if (typeof settings.myClass !== 'undefined') $stacktable.addClass(settings.myClass);
      var markup = '';
      var $caption, $topRow, headMarkup, bodyMarkup, tr_class;

      $table.addClass('stacktable large-only');

      $caption = $table.find(">caption").clone();
      $topRow = $table.find('>thead>tr,>tbody>tr,>tfoot>tr,>tr').eq(0);

      // avoid duplication when paginating
      $table.siblings().filter('.small-only').remove();

      // using rowIndex and cellIndex in order to reduce ambiguity
      $table.find('>tbody>tr').each(function () {

        // declaring headMarkup and bodyMarkup, to be used for separately head and body of single records
        headMarkup = '';
        bodyMarkup = '';
        tr_class = $(this).prop('class');
        // for the first row, "headIndex" cell is the head of the table
        // for the other rows, put the "headIndex" cell as the head for that row
        // then iterate through the key/values
        $(this).find('>td,>th').each(function (cellIndex) {
          if ($(this).html() !== '') {
            bodyMarkup += '<tr class="' + tr_class + '">';
            if ($topRow.find('>td,>th').eq(cellIndex).html()) {
              bodyMarkup += '<td class="st-key">' + $topRow.find('>td,>th').eq(cellIndex).html() + '</td>';
            } else {
              bodyMarkup += '<td class="st-key"></td>';
            }
            bodyMarkup += '<td class="st-val ' + $(this).prop('class') + '">' + $(this).html() + '</td>';
            bodyMarkup += '</tr>';
          }
        });

        markup += '<table class=" ' + table_css + ' stacktable small-only"><tbody>' + headMarkup + bodyMarkup + '</tbody></table>';
      });

      $table.find('>tfoot>tr>td').each(function (rowIndex, value) {
        if ($.trim($(value).text()) !== '') {
          markup += '<table class="' + table_css + ' stacktable small-only"><tbody><tr><td>' + $(value).html() + '</td></tr></tbody></table>';
        }
      });

      $stacktable.prepend($caption);
      $stacktable.append($(markup));
      $table.before($stacktable);
    });
  };

  $.fn.stacktable = function (options) {
    var $tables = this,
        defaults = { headIndex: 0, displayHeader: true },
        settings = $.extend({}, defaults, options),
        headIndex;

    // checking the "headIndex" option presence... or defaults it to 0
    if (options && options.headIndex) headIndex = options.headIndex;else headIndex = 0;

    return $tables.each(function () {
      var table_css = $(this).prop('class');
      var $stacktable = $('<table class="' + table_css + ' stacktable small-only"><tbody></tbody></table>');
      if (typeof settings.myClass !== 'undefined') $stacktable.addClass(settings.myClass);
      var markup = '';
      var $table, $caption, $topRow, headMarkup, bodyMarkup, tr_class, displayHeader;

      $table = $(this);
      $table.addClass('stacktable large-only');
      $caption = $table.find(">caption").clone();
      $topRow = $table.find('>thead>tr,>tbody>tr,>tfoot>tr').eq(0);

      displayHeader = $table.data('display-header') === undefined ? settings.displayHeader : $table.data('display-header');

      // using rowIndex and cellIndex in order to reduce ambiguity
      $table.find('>tbody>tr, >thead>tr').each(function (rowIndex) {

        // declaring headMarkup and bodyMarkup, to be used for separately head and body of single records
        headMarkup = '';
        bodyMarkup = '';
        tr_class = $(this).prop('class');

        // for the first row, "headIndex" cell is the head of the table
        if (rowIndex === 0) {
          // the main heading goes into the markup variable
          if (displayHeader) {
            markup += '<tr class=" ' + tr_class + ' "><th class="st-head-row st-head-row-main" colspan="2">' + $(this).find('>th,>td').eq(headIndex).html() + '</th></tr>';
          }
        } else {
          // for the other rows, put the "headIndex" cell as the head for that row
          // then iterate through the key/values
          $(this).find('>td,>th').each(function (cellIndex) {
            if (cellIndex === headIndex) {
              headMarkup = '<tr class="' + tr_class + '"><th class="st-head-row" colspan="2">' + $(this).html() + '</th></tr>';
            } else {
              if ($(this).html() !== '') {
                bodyMarkup += '<tr class="' + tr_class + '">';
                if ($topRow.find('>td,>th').eq(cellIndex).html()) {
                  bodyMarkup += '<td class="st-key">' + $topRow.find('>td,>th').eq(cellIndex).html() + '</td>';
                } else {
                  bodyMarkup += '<td class="st-key"></td>';
                }
                bodyMarkup += '<td class="st-val ' + $(this).prop('class') + '">' + $(this).html() + '</td>';
                bodyMarkup += '</tr>';
              }
            }
          });

          markup += headMarkup + bodyMarkup;
        }
      });

      $stacktable.prepend($caption);
      $stacktable.append($(markup));
      $table.before($stacktable);
    });
  };

  $.fn.stackcolumns = function (options) {
    var $tables = this,
        defaults = {},
        settings = $.extend({}, defaults, options);

    return $tables.each(function () {
      var $table = $(this);
      var $caption = $table.find(">caption").clone();
      var num_cols = $table.find('>thead>tr,>tbody>tr,>tfoot>tr').eq(0).find('>td,>th').length; //first table <tr> must not contain colspans, or add sum(colspan-1) here.
      if (num_cols < 3) //stackcolumns has no effect on tables with less than 3 columns
        return;

      var $stackcolumns = $('<table class="stacktable small-only"></table>');
      if (typeof settings.myClass !== 'undefined') $stackcolumns.addClass(settings.myClass);
      $table.addClass('stacktable large-only');
      var tb = $('<tbody></tbody>');
      var col_i = 1; //col index starts at 0 -> start copy at second column.

      while (col_i < num_cols) {
        $table.find('>thead>tr,>tbody>tr,>tfoot>tr').each(function (index) {
          var tem = $('<tr></tr>'); // todo opt. copy styles of $this; todo check if parent is thead or tfoot to handle accordingly
          if (index === 0) tem.addClass("st-head-row st-head-row-main");
          var first = $(this).find('>td,>th').eq(0).clone().addClass("st-key");
          var target = col_i;
          // if colspan apply, recompute target for second cell.
          if ($(this).find("*[colspan]").length) {
            var i = 0;
            $(this).find('>td,>th').each(function () {
              var cs = $(this).attr("colspan");
              if (cs) {
                cs = parseInt(cs, 10);
                target -= cs - 1;
                if (i + cs > col_i) //out of current bounds
                  target += i + cs - col_i - 1;
                i += cs;
              } else {
                i++;
              }

              if (i > col_i) return false; //target is set; break.
            });
          }
          var second = $(this).find('>td,>th').eq(target).clone().addClass("st-val").removeAttr("colspan");
          tem.append(first, second);
          tb.append(tem);
        });
        ++col_i;
      }

      $stackcolumns.append($(tb));
      $stackcolumns.prepend($caption);
      $table.before($stackcolumns);
    });
  };
})(jQuery);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! Lity - v2.3.1 - 2018-04-20
* http://sorgalla.com/lity/
* Copyright (c) 2015-2018 Jan Sorgalla; Licensed MIT */
(function (window, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function ($) {
            return factory(window, $);
        });
    } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
        module.exports = factory(window, require('jquery'));
    } else {
        window.lity = factory(window, window.jQuery || window.Zepto);
    }
})(typeof window !== "undefined" ? window : undefined, function (window, $) {
    'use strict';

    var document = window.document;

    var _win = $(window);
    var _deferred = $.Deferred;
    var _html = $('html');
    var _instances = [];

    var _attrAriaHidden = 'aria-hidden';
    var _dataAriaHidden = 'lity-' + _attrAriaHidden;

    var _focusableElementsSelector = 'a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])';

    var _defaultOptions = {
        esc: true,
        handler: null,
        handlers: {
            image: imageHandler,
            inline: inlineHandler,
            youtube: youtubeHandler,
            vimeo: vimeoHandler,
            googlemaps: googlemapsHandler,
            facebookvideo: facebookvideoHandler,
            iframe: iframeHandler
        },
        template: '<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" aria-label="Close (Press escape to close)" data-lity-close>&times;</button></div></div></div>'
    };

    var _imageRegexp = /(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i;
    var _youtubeRegex = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i;
    var _vimeoRegex = /(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/;
    var _googlemapsRegex = /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i;
    var _facebookvideoRegex = /(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i;

    var _transitionEndEvent = function () {
        var el = document.createElement('div');

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        };

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return transEndEventNames[name];
            }
        }

        return false;
    }();

    function transitionEnd(element) {
        var deferred = _deferred();

        if (!_transitionEndEvent || !element.length) {
            deferred.resolve();
        } else {
            element.one(_transitionEndEvent, deferred.resolve);
            setTimeout(deferred.resolve, 500);
        }

        return deferred.promise();
    }

    function settings(currSettings, key, value) {
        if (arguments.length === 1) {
            return $.extend({}, currSettings);
        }

        if (typeof key === 'string') {
            if (typeof value === 'undefined') {
                return typeof currSettings[key] === 'undefined' ? null : currSettings[key];
            }

            currSettings[key] = value;
        } else {
            $.extend(currSettings, key);
        }

        return this;
    }

    function parseQueryParams(params) {
        var pairs = decodeURI(params.split('#')[0]).split('&');
        var obj = {},
            p;

        for (var i = 0, n = pairs.length; i < n; i++) {
            if (!pairs[i]) {
                continue;
            }

            p = pairs[i].split('=');
            obj[p[0]] = p[1];
        }

        return obj;
    }

    function appendQueryParams(url, params) {
        return url + (url.indexOf('?') > -1 ? '&' : '?') + $.param(params);
    }

    function transferHash(originalUrl, newUrl) {
        var pos = originalUrl.indexOf('#');

        if (-1 === pos) {
            return newUrl;
        }

        if (pos > 0) {
            originalUrl = originalUrl.substr(pos);
        }

        return newUrl + originalUrl;
    }

    function error(msg) {
        return $('<span class="lity-error"/>').append(msg);
    }

    function imageHandler(target, instance) {
        var desc = instance.opener() && instance.opener().data('lity-desc') || 'Image with no description';
        var img = $('<img src="' + target + '" alt="' + desc + '"/>');
        var deferred = _deferred();
        var failed = function failed() {
            deferred.reject(error('Failed loading image'));
        };

        img.on('load', function () {
            if (this.naturalWidth === 0) {
                return failed();
            }

            deferred.resolve(img);
        }).on('error', failed);

        return deferred.promise();
    }

    imageHandler.test = function (target) {
        return _imageRegexp.test(target);
    };

    function inlineHandler(target, instance) {
        var el, placeholder, hasHideClass;

        try {
            el = $(target);
        } catch (e) {
            return false;
        }

        if (!el.length) {
            return false;
        }

        placeholder = $('<i style="display:none !important"/>');
        hasHideClass = el.hasClass('lity-hide');

        instance.element().one('lity:remove', function () {
            placeholder.before(el).remove();

            if (hasHideClass && !el.closest('.lity-content').length) {
                el.addClass('lity-hide');
            }
        });

        return el.removeClass('lity-hide').after(placeholder);
    }

    function youtubeHandler(target) {
        var matches = _youtubeRegex.exec(target);

        if (!matches) {
            return false;
        }

        return iframeHandler(transferHash(target, appendQueryParams('https://www.youtube' + (matches[2] || '') + '.com/embed/' + matches[4], $.extend({
            autoplay: 1
        }, parseQueryParams(matches[5] || '')))));
    }

    function vimeoHandler(target) {
        var matches = _vimeoRegex.exec(target);

        if (!matches) {
            return false;
        }

        return iframeHandler(transferHash(target, appendQueryParams('https://player.vimeo.com/video/' + matches[3], $.extend({
            autoplay: 1
        }, parseQueryParams(matches[4] || '')))));
    }

    function facebookvideoHandler(target) {
        var matches = _facebookvideoRegex.exec(target);

        if (!matches) {
            return false;
        }

        if (0 !== target.indexOf('http')) {
            target = 'https:' + target;
        }

        return iframeHandler(transferHash(target, appendQueryParams('https://www.facebook.com/plugins/video.php?href=' + target, $.extend({
            autoplay: 1
        }, parseQueryParams(matches[4] || '')))));
    }

    function googlemapsHandler(target) {
        var matches = _googlemapsRegex.exec(target);

        if (!matches) {
            return false;
        }

        return iframeHandler(transferHash(target, appendQueryParams('https://www.google.' + matches[3] + '/maps?' + matches[6], {
            output: matches[6].indexOf('layer=c') > 0 ? 'svembed' : 'embed'
        })));
    }

    function iframeHandler(target) {
        return '<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="' + target + '"/></div>';
    }

    function winHeight() {
        return document.documentElement.clientHeight ? document.documentElement.clientHeight : Math.round(_win.height());
    }

    function keydown(e) {
        var current = currentInstance();

        if (!current) {
            return;
        }

        // ESC key
        if (e.keyCode === 27 && !!current.options('esc')) {
            current.close();
        }

        // TAB key
        if (e.keyCode === 9) {
            handleTabKey(e, current);
        }
    }

    function handleTabKey(e, instance) {
        var focusableElements = instance.element().find(_focusableElementsSelector);
        var focusedIndex = focusableElements.index(document.activeElement);

        if (e.shiftKey && focusedIndex <= 0) {
            focusableElements.get(focusableElements.length - 1).focus();
            e.preventDefault();
        } else if (!e.shiftKey && focusedIndex === focusableElements.length - 1) {
            focusableElements.get(0).focus();
            e.preventDefault();
        }
    }

    function resize() {
        $.each(_instances, function (i, instance) {
            instance.resize();
        });
    }

    function registerInstance(instanceToRegister) {
        if (1 === _instances.unshift(instanceToRegister)) {
            _html.addClass('lity-active');

            _win.on({
                resize: resize,
                keydown: keydown
            });
        }

        $('body > *').not(instanceToRegister.element()).addClass('lity-hidden').each(function () {
            var el = $(this);

            if (undefined !== el.data(_dataAriaHidden)) {
                return;
            }

            el.data(_dataAriaHidden, el.attr(_attrAriaHidden) || null);
        }).attr(_attrAriaHidden, 'true');
    }

    function removeInstance(instanceToRemove) {
        var show;

        instanceToRemove.element().attr(_attrAriaHidden, 'true');

        if (1 === _instances.length) {
            _html.removeClass('lity-active');

            _win.off({
                resize: resize,
                keydown: keydown
            });
        }

        _instances = $.grep(_instances, function (instance) {
            return instanceToRemove !== instance;
        });

        if (!!_instances.length) {
            show = _instances[0].element();
        } else {
            show = $('.lity-hidden');
        }

        show.removeClass('lity-hidden').each(function () {
            var el = $(this),
                oldAttr = el.data(_dataAriaHidden);

            if (!oldAttr) {
                el.removeAttr(_attrAriaHidden);
            } else {
                el.attr(_attrAriaHidden, oldAttr);
            }

            el.removeData(_dataAriaHidden);
        });
    }

    function currentInstance() {
        if (0 === _instances.length) {
            return null;
        }

        return _instances[0];
    }

    function factory(target, instance, handlers, preferredHandler) {
        var handler = 'inline',
            content;

        var currentHandlers = $.extend({}, handlers);

        if (preferredHandler && currentHandlers[preferredHandler]) {
            content = currentHandlers[preferredHandler](target, instance);
            handler = preferredHandler;
        } else {
            // Run inline and iframe handlers after all other handlers
            $.each(['inline', 'iframe'], function (i, name) {
                delete currentHandlers[name];

                currentHandlers[name] = handlers[name];
            });

            $.each(currentHandlers, function (name, currentHandler) {
                // Handler might be "removed" by setting callback to null
                if (!currentHandler) {
                    return true;
                }

                if (currentHandler.test && !currentHandler.test(target, instance)) {
                    return true;
                }

                content = currentHandler(target, instance);

                if (false !== content) {
                    handler = name;
                    return false;
                }
            });
        }

        return { handler: handler, content: content || '' };
    }

    function Lity(target, options, opener, activeElement) {
        var self = this;
        var result;
        var isReady = false;
        var isClosed = false;
        var element;
        var content;

        options = $.extend({}, _defaultOptions, options);

        element = $(options.template);

        // -- API --

        self.element = function () {
            return element;
        };

        self.opener = function () {
            return opener;
        };

        self.options = $.proxy(settings, self, options);
        self.handlers = $.proxy(settings, self, options.handlers);

        self.resize = function () {
            if (!isReady || isClosed) {
                return;
            }

            content.css('max-height', winHeight() + 'px').trigger('lity:resize', [self]);
        };

        self.close = function () {
            if (!isReady || isClosed) {
                return;
            }

            isClosed = true;

            removeInstance(self);

            var deferred = _deferred();

            // We return focus only if the current focus is inside this instance
            if (activeElement && (document.activeElement === element[0] || $.contains(element[0], document.activeElement))) {
                try {
                    activeElement.focus();
                } catch (e) {
                    // Ignore exceptions, eg. for SVG elements which can't be
                    // focused in IE11
                }
            }

            content.trigger('lity:close', [self]);

            element.removeClass('lity-opened').addClass('lity-closed');

            transitionEnd(content.add(element)).always(function () {
                content.trigger('lity:remove', [self]);
                element.remove();
                element = undefined;
                deferred.resolve();
            });

            return deferred.promise();
        };

        // -- Initialization --

        result = factory(target, self, options.handlers, options.handler);

        element.attr(_attrAriaHidden, 'false').addClass('lity-loading lity-opened lity-' + result.handler).appendTo('body').focus().on('click', '[data-lity-close]', function (e) {
            if ($(e.target).is('[data-lity-close]')) {
                self.close();
            }
        }).trigger('lity:open', [self]);

        registerInstance(self);

        $.when(result.content).always(ready);

        function ready(result) {
            content = $(result).css('max-height', winHeight() + 'px');

            element.find('.lity-loader').each(function () {
                var loader = $(this);

                transitionEnd(loader).always(function () {
                    loader.remove();
                });
            });

            element.removeClass('lity-loading').find('.lity-content').empty().append(content);

            isReady = true;

            content.trigger('lity:ready', [self]);
        }
    }

    function lity(target, options, opener) {
        if (!target.preventDefault) {
            opener = $(opener);
        } else {
            target.preventDefault();
            opener = $(this);
            target = opener.data('lity-target') || opener.attr('href') || opener.attr('src');
        }

        var instance = new Lity(target, $.extend({}, opener.data('lity-options') || opener.data('lity'), options), opener, document.activeElement);

        if (!target.preventDefault) {
            return instance;
        }
    }

    lity.version = '2.3.1';
    lity.options = $.proxy(settings, lity, _defaultOptions);
    lity.handlers = $.proxy(settings, lity, _defaultOptions.handlers);
    lity.current = currentInstance;

    $(document).on('click.lity', '[data-lity]', lity);

    return lity;
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
})(function () {
	function extend() {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[i];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init(converter) {
		function api(key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return document.cookie = key + '=' + value + stringifiedAttributes;
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
});
'use strict';

/*
 * Slinky
 * A light-weight, responsive, mobile-like navigation menu plugin for jQuery
 * Built by Ali Zahid <ali.zahid@live.com>
 * Published under the MIT license
 */

;(function ($) {
    var lastClick;

    $.fn.slinky = function (options) {
        var settings = $.extend({
            label: 'Back',
            title: false,
            speed: 300,
            resize: true,
            activeClass: 'active',
            headerClass: 'header',
            headingTag: '<h2>',
            backFirst: false
        }, options);

        var menu = $(this),
            root = menu.children().first();

        menu.addClass('slinky-menu');

        var move = function move(depth, callback) {
            var left = Math.round(parseInt(root.get(0).style.left)) || 0;

            root.css('left', left - depth * 100 + '%');

            if (typeof callback === 'function') {
                setTimeout(callback, settings.speed);
            }
        };

        var resize = function resize(content) {
            menu.height(content.outerHeight());
        };

        var transition = function transition(speed) {
            menu.css('transition-duration', speed + 'ms');
            root.css('transition-duration', speed + 'ms');
        };

        transition(settings.speed);

        $('a + ul', menu).prev().addClass('next');

        $('li > ul', menu).prepend('<li class="' + settings.headerClass + '">');

        if (settings.title === true) {
            $('li > ul', menu).each(function () {
                var $link = $(this).parent().find('a').first(),
                    label = $link.text(),
                    title = $('<a>').addClass('title').text(label).attr('href', $link.attr('href'));

                $('> .' + settings.headerClass, this).append(title);
            });
        }

        if (!settings.title && settings.label === true) {
            $('li > ul', menu).each(function () {
                var label = $(this).parent().find('a').first().text(),
                    backLink = $('<a>').text(label).prop('href', '#').addClass('back');

                if (settings.backFirst) {
                    $('> .' + settings.headerClass, this).prepend(backLink);
                } else {
                    $('> .' + settings.headerClass, this).append(backLink);
                }
            });
        } else {
            var backLink = $('<a>').text(settings.label).prop('href', '#').addClass('back');

            if (settings.backFirst) {
                $('.' + settings.headerClass, menu).prepend(backLink);
            } else {
                $('.' + settings.headerClass, menu).append(backLink);
            }
        }

        $('a', menu).on('click', function (e) {
            if (lastClick + settings.speed > Date.now()) {
                return false;
            }

            lastClick = Date.now();

            var a = $(this);

            if (a.hasClass('next') || a.hasClass('back')) {
                e.preventDefault();
            }

            if (a.hasClass('next')) {
                menu.find('.' + settings.activeClass).removeClass(settings.activeClass);

                a.next().show().addClass(settings.activeClass);

                move(1);

                if (settings.resize) {
                    resize(a.next());
                }
            } else if (a.hasClass('back')) {
                move(-1, function () {
                    menu.find('.' + settings.activeClass).removeClass(settings.activeClass);

                    a.parent().parent().hide().parentsUntil(menu, 'ul').first().addClass(settings.activeClass);
                });

                if (settings.resize) {
                    resize(a.parent().parent().parentsUntil(menu, 'ul'));
                }
            }
        });

        this.jump = function (to, animate) {
            to = $(to);

            var active = menu.find('.' + settings.activeClass);

            if (active.length > 0) {
                active = active.parentsUntil(menu, 'ul').length;
            } else {
                active = 0;
            }

            menu.find('ul').removeClass(settings.activeClass).hide();

            var menus = to.parentsUntil(menu, 'ul');

            menus.show();
            to.show().addClass(settings.activeClass);

            if (animate === false) {
                transition(0);
            }

            move(menus.length - active);

            if (settings.resize) {
                resize(to);
            }

            if (animate === false) {
                transition(settings.speed);
            }
        };

        this.home = function (animate) {
            if (animate === false) {
                transition(0);
            }

            var active = menu.find('.' + settings.activeClass),
                count = active.parentsUntil(menu, 'li').length;

            if (count > 0) {
                move(-count, function () {
                    active.removeClass(settings.activeClass);
                });

                if (settings.resize) {
                    resize($(active.parentsUntil(menu, 'li').get(count - 1)).parent());
                }
            }

            if (animate === false) {
                transition(settings.speed);
            }
        };

        this.destroy = function () {
            $('.' + settings.headerClass, menu).remove();
            $('a', menu).removeClass('next').off('click');

            menu.removeClass('slinky-menu').css('transition-duration', '');
            root.css('transition-duration', '');
        };

        var active = menu.find('.' + settings.activeClass);

        if (active.length > 0) {
            active.removeClass(settings.activeClass);

            this.jump(active, false);
        }

        return this;
    };
})(jQuery);
'use strict';

//// |--------------------------------------------------------------------------
//// | Header
//// |--------------------------------------------------------------------------

var header = function ($) {
    'use strict';

    var pub = {};

    /**
     * Instantiate
     */
    pub.init = function () {
        registerBootEventHandlers();
        registerEventHandlers();
    };

    /**
     * Register boot event handlers.
     */
    function registerBootEventHandlers() {}

    /**
     * Register event handlers.
     */
    function registerEventHandlers() {
        // Add submenu open/close behavior.
        $('.headerwrapper-inner .navbar-nav > li.expanded').hover(function () {
            $(this).addClass('open').children('a').attr('aria-expanded', 'true');
        }, function () {
            $(this).removeClass('open').children('a').attr('aria-expanded', 'false');
        }).click(function (event) {
            // Disable other event listeners.
            event.stopPropagation();
            // Restore default link behaviour.
        });

        //Smooth scroll to #main-content
        $("#scroll-down-link").on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $("#main-content").offset().top
            }, 500);
        });
    }

    /**
     * Custom backstretch behavior.
     */
    Drupal.behaviors.ficBackstretch = {
        attach: function attach(context, settings) {
            if (typeof settings.ficBackstretch === 'undefined' || $('.backstretch').length > 0) {
                return;
            }

            var $images = [],
                $backstretchWrapper = $('.page-header-wrapper');
            for (var i = 0; i < settings.ficBackstretch.length; i++) {
                $images.push(settings.ficBackstretch[i].url);
            }
            $backstretchWrapper.backstretch($images, {
                // Slides should be never changed automaticly.
                duration: 1000000, fade: 750, paused: true
            });

            // Reset backstrech slide on timeout after mouseleave.
            var pager_links_selector = '.cycle-pager a, .widget_pager_bottom a',
                slideResetTimeout = settings.slideResetTimeout;
            $(document).on({
                'mouseleave': function mouseleave() {
                    var $pager = $(this).parents('.views-slideshow-pager-field-item:first, .field-item:first');
                    if ($pager.length) {
                        setTimeout(function () {
                            if ($pager.hasClass('active')) {
                                $(pager_links_selector).filter(':first').mouseover();
                            }
                        }, slideResetTimeout);
                    }
                }
            }, pager_links_selector);
        },

        show: function show($id) {
            var $i = 0,
                $backstretch = $('.page-header-wrapper').data('backstretch'),
                $default = true;

            if (typeof Drupal.settings.ficBackstretch === 'undefined' || typeof $backstretch === 'undefined') {
                return;
            }

            for (var i = 0; i < Drupal.settings.ficBackstretch.length; i++) {
                if ($id == Drupal.settings.ficBackstretch[i].id) {
                    $backstretch.show($i);
                    $default = false;
                    break;
                }
                $i++;
            }

            if ($default) {
                $backstretch.show(0);
            }
        }
    };

    /**
     * Custom headerRegion behavior.
     */
    Drupal.behaviors.headerRegion = {
        attach: function attach(context, settings) {
            if (!$('.term-fic-header').length) {
                return;
            }

            var $wH = $(window).height(),

            // All static value defiden accordingly with design.
            $brandigH = 178 + 20,
                $navigationH = 150 + 20,
                $scrollDownH = 174,
                $descrH = $wH - $brandigH - $navigationH - $scrollDownH,
                $minH = 300,
                $maxH = 700;

            $descrH = $descrH < $minH ? $minH : $descrH > $maxH ? $maxH : $descrH;
            $('.term-fic-header .views_slideshow_cycle_main, .page-taxonomy .term-fic-header > .taxonomy-term .cycle-slideshow-wrapper').height($descrH);
        }
    };

    Drupal.theme.prototype.fic_modal = function () {
        var html = '';
        html += '<div id="ctools-modal" class="popups-box my-first-popup">';
        html += ' <div class="ctools-modal-content my-popup ">';
        html += ' <span class="popups-close"><a class="close" href="#">×</a></span>';
        html += ' <div class="modal-scroll"><div id="modal-content" class="modal-content popups-body"></div></div>';
        html += ' </div>';
        html += '</div>';
        return html;
    };

    /**
     * Custom ficHeaderCycleSlideshow behavior.
     */
    Drupal.behaviors.ficHeaderCycleSlideshow = {
        attach: function attach(context, settings) {
            var $slideShow = $('.cycle-slideshow');
            if (!$slideShow.once().length) {
                return;
            }

            $slideShow.cycle({
                speed: 700,
                timeout: 0,
                activePagerClass: 'active',
                pager: '#cycle-nav',
                before: function before(currSlideElement, nextSlideElement, options, forwardFlag) {
                    var $termId = $(nextSlideElement).data('id');
                    if (typeof Drupal.behaviors.ficBackstretch !== "undefined") {
                        Drupal.behaviors.ficBackstretch.show($termId);
                    }
                },
                pagerAnchorBuilder: function pagerAnchorBuilder(idx, slide) {
                    var $slide = $(slide),
                        $target = '';
                    if (typeof $slide.data('target') !== 'undefined') {
                        $target = ' target="' + $slide.data('target') + '"';
                    }
                    return '<div class="field-item"><a href="' + $slide.data('url') + '"' + $target + '><span>' + $slide.data('name') + '</span></a></div>';
                },
                pagerEvent: 'mouseover',
                pauseOnPagerHover: true
            });

            $('.cycle-pager a').on('click', function (e) {
                e.stopPropagation();
            });
        }
    };

    return pub;
}(jQuery);
"use strict";

// Document ready
(function ($) {
    'use strict';

    // Resolves $.browser issue (see: https://stackoverflow.com/questions/14798403/typeerror-browser-is-undefined)

    var matched, browser;

    jQuery.uaMatch = function (ua) {
        ua = ua.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    };

    matched = jQuery.uaMatch(navigator.userAgent);
    browser = {};

    if (matched.browser) {
        browser[matched.browser] = true;
        browser.version = matched.version;
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if (browser.chrome) {
        browser.webkit = true;
    } else if (browser.webkit) {
        browser.safari = true;
    }

    jQuery.browser = browser;

    // Enable header
    header.init();

    // Remove .nolink and .separator
    $('.slinky-menu, .navigation-bar__dropup').find('.nolink, .separator').parent().remove();

    // Sidr
    $('.slinky-menu').find('ul, li, a').removeClass();

    $('.sidr__toggle').sidr({
        name: 'sidr-main',
        side: 'left',
        displace: false,
        renaming: false,
        source: '.sidr-source-provider'
    });

    // Slinky
    $('.sidr .slinky-menu').slinky({
        title: true,
        label: ''
    });

    $('select').change(function () {
        var $this = $(this);
        if ($this.val() == '') {
            $this.addClass('empty');
        } else {
            $this.removeClass('empty');
        }
    }).change();

    // Close CTools modal on backdrop click
    Drupal.behaviors.ctools_backdrop_close = {
        attach: function attach(context, settings) {
            $('#modalBackdrop, #modalContent').once('ctools_backdrop_close', function () {
                $('.popups-body').click(function (event) {
                    event.stopPropagation();
                });

                $(this).on('click', function (event) {
                    Drupal.CTools.Modal.dismiss();
                });
            });
        }
    };

    function _set_height_on_page_wrapper() {
        var $header = $('.page-header-wrapper'),
            $backstretch = $('.backstretch'),
            height = $backstretch.outerHeight(true);

        $header.css('height', height);
    }
    _set_height_on_page_wrapper(); // Load upon boot

    // Init stackable responsive table plugin.
    Drupal.behaviors.stackable = {
        attach: function attach(context, settings) {
            $('table').once('stackable', function () {
                $(this).stacktable();
            });
        }
    };

    // Lity
    $('a[rel="modalbox"]').on('click', function (event) {
        event.preventDefault();

        var $element = $(this),
            href = $element.attr('href');

        lity(href);
    });

    // Navigation bar
    $('.navigation-bar__toggle').on('click', function (event) {
        event.preventDefault();

        var $element = $(this),
            $parent = $element.parents('.navigation-bar');

        $parent.toggleClass('visible');
    });

    // All links to PDFs should open in a new window.
    $('a[href$=".pdf"]').each(function () {
        var $element = $(this);

        $element.attr('target', '_blank');
    });
})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb3RzdHJhcC5qcyIsImpxdWVyeS5zdGlja3kuanMiLCJqcXVlcnkuc2lkci5qcyIsInN0YWNrdGFibGUuanMiLCJsaXR5LmpzIiwianMuY29va2llLmpzIiwiY3VzdG9tLXNsaW5reS5qcyIsImhlYWRlci5qcyIsImFwcC5qcyJdLCJuYW1lcyI6WyJqUXVlcnkiLCJFcnJvciIsIiQiLCJ2ZXJzaW9uIiwiZm4iLCJqcXVlcnkiLCJzcGxpdCIsInRyYW5zaXRpb25FbmQiLCJlbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInRyYW5zRW5kRXZlbnROYW1lcyIsIldlYmtpdFRyYW5zaXRpb24iLCJNb3pUcmFuc2l0aW9uIiwiT1RyYW5zaXRpb24iLCJ0cmFuc2l0aW9uIiwibmFtZSIsInN0eWxlIiwidW5kZWZpbmVkIiwiZW5kIiwiZW11bGF0ZVRyYW5zaXRpb25FbmQiLCJkdXJhdGlvbiIsImNhbGxlZCIsIiRlbCIsIm9uZSIsImNhbGxiYWNrIiwidHJpZ2dlciIsInN1cHBvcnQiLCJzZXRUaW1lb3V0IiwiZXZlbnQiLCJzcGVjaWFsIiwiYnNUcmFuc2l0aW9uRW5kIiwiYmluZFR5cGUiLCJkZWxlZ2F0ZVR5cGUiLCJoYW5kbGUiLCJlIiwidGFyZ2V0IiwiaXMiLCJoYW5kbGVPYmoiLCJoYW5kbGVyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJkaXNtaXNzIiwiQWxlcnQiLCJvbiIsImNsb3NlIiwiVkVSU0lPTiIsIlRSQU5TSVRJT05fRFVSQVRJT04iLCJwcm90b3R5cGUiLCIkdGhpcyIsInNlbGVjdG9yIiwiYXR0ciIsInJlcGxhY2UiLCIkcGFyZW50IiwicHJldmVudERlZmF1bHQiLCJsZW5ndGgiLCJjbG9zZXN0IiwiRXZlbnQiLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJyZW1vdmVDbGFzcyIsInJlbW92ZUVsZW1lbnQiLCJkZXRhY2giLCJyZW1vdmUiLCJoYXNDbGFzcyIsIlBsdWdpbiIsIm9wdGlvbiIsImVhY2giLCJkYXRhIiwiY2FsbCIsIm9sZCIsImFsZXJ0IiwiQ29uc3RydWN0b3IiLCJub0NvbmZsaWN0IiwiQnV0dG9uIiwiZWxlbWVudCIsIm9wdGlvbnMiLCIkZWxlbWVudCIsImV4dGVuZCIsIkRFRkFVTFRTIiwiaXNMb2FkaW5nIiwibG9hZGluZ1RleHQiLCJzZXRTdGF0ZSIsInN0YXRlIiwiZCIsInZhbCIsInJlc2V0VGV4dCIsInByb3h5IiwiYWRkQ2xhc3MiLCJwcm9wIiwicmVtb3ZlQXR0ciIsInRvZ2dsZSIsImNoYW5nZWQiLCIkaW5wdXQiLCJmaW5kIiwidG9nZ2xlQ2xhc3MiLCJidXR0b24iLCIkYnRuIiwiZmlyc3QiLCJ0ZXN0IiwidHlwZSIsIkNhcm91c2VsIiwiJGluZGljYXRvcnMiLCJwYXVzZWQiLCJzbGlkaW5nIiwiaW50ZXJ2YWwiLCIkYWN0aXZlIiwiJGl0ZW1zIiwia2V5Ym9hcmQiLCJrZXlkb3duIiwicGF1c2UiLCJkb2N1bWVudEVsZW1lbnQiLCJjeWNsZSIsIndyYXAiLCJ0YWdOYW1lIiwid2hpY2giLCJwcmV2IiwibmV4dCIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImdldEl0ZW1JbmRleCIsIml0ZW0iLCJwYXJlbnQiLCJjaGlsZHJlbiIsImluZGV4IiwiZ2V0SXRlbUZvckRpcmVjdGlvbiIsImRpcmVjdGlvbiIsImFjdGl2ZSIsImFjdGl2ZUluZGV4Iiwid2lsbFdyYXAiLCJkZWx0YSIsIml0ZW1JbmRleCIsImVxIiwidG8iLCJwb3MiLCJ0aGF0Iiwic2xpZGUiLCIkbmV4dCIsImlzQ3ljbGluZyIsInJlbGF0ZWRUYXJnZXQiLCJzbGlkZUV2ZW50IiwiJG5leHRJbmRpY2F0b3IiLCJzbGlkRXZlbnQiLCJvZmZzZXRXaWR0aCIsImpvaW4iLCJhY3Rpb24iLCJjYXJvdXNlbCIsImNsaWNrSGFuZGxlciIsImhyZWYiLCIkdGFyZ2V0Iiwic2xpZGVJbmRleCIsIndpbmRvdyIsIiRjYXJvdXNlbCIsIkNvbGxhcHNlIiwiJHRyaWdnZXIiLCJpZCIsInRyYW5zaXRpb25pbmciLCJnZXRQYXJlbnQiLCJhZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MiLCJkaW1lbnNpb24iLCJoYXNXaWR0aCIsInNob3ciLCJhY3RpdmVzRGF0YSIsImFjdGl2ZXMiLCJzdGFydEV2ZW50IiwiY29tcGxldGUiLCJzY3JvbGxTaXplIiwiY2FtZWxDYXNlIiwiaGlkZSIsIm9mZnNldEhlaWdodCIsImkiLCJnZXRUYXJnZXRGcm9tVHJpZ2dlciIsImlzT3BlbiIsImNvbGxhcHNlIiwiYmFja2Ryb3AiLCJEcm9wZG93biIsImNsZWFyTWVudXMiLCJjb250YWlucyIsImlzQWN0aXZlIiwiaW5zZXJ0QWZ0ZXIiLCJzdG9wUHJvcGFnYXRpb24iLCJkZXNjIiwiZHJvcGRvd24iLCJNb2RhbCIsIiRib2R5IiwiYm9keSIsIiRkaWFsb2ciLCIkYmFja2Ryb3AiLCJpc1Nob3duIiwib3JpZ2luYWxCb2R5UGFkIiwic2Nyb2xsYmFyV2lkdGgiLCJpZ25vcmVCYWNrZHJvcENsaWNrIiwicmVtb3RlIiwibG9hZCIsIkJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04iLCJfcmVsYXRlZFRhcmdldCIsImNoZWNrU2Nyb2xsYmFyIiwic2V0U2Nyb2xsYmFyIiwiZXNjYXBlIiwicmVzaXplIiwiYXBwZW5kVG8iLCJzY3JvbGxUb3AiLCJhZGp1c3REaWFsb2ciLCJlbmZvcmNlRm9jdXMiLCJvZmYiLCJoaWRlTW9kYWwiLCJoYXMiLCJoYW5kbGVVcGRhdGUiLCJyZXNldEFkanVzdG1lbnRzIiwicmVzZXRTY3JvbGxiYXIiLCJyZW1vdmVCYWNrZHJvcCIsImFuaW1hdGUiLCJkb0FuaW1hdGUiLCJjdXJyZW50VGFyZ2V0IiwiZm9jdXMiLCJjYWxsYmFja1JlbW92ZSIsIm1vZGFsSXNPdmVyZmxvd2luZyIsInNjcm9sbEhlaWdodCIsImNsaWVudEhlaWdodCIsImNzcyIsInBhZGRpbmdMZWZ0IiwiYm9keUlzT3ZlcmZsb3dpbmciLCJwYWRkaW5nUmlnaHQiLCJmdWxsV2luZG93V2lkdGgiLCJpbm5lcldpZHRoIiwiZG9jdW1lbnRFbGVtZW50UmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInJpZ2h0IiwiTWF0aCIsImFicyIsImxlZnQiLCJjbGllbnRXaWR0aCIsIm1lYXN1cmVTY3JvbGxiYXIiLCJib2R5UGFkIiwicGFyc2VJbnQiLCJzY3JvbGxEaXYiLCJjbGFzc05hbWUiLCJhcHBlbmQiLCJyZW1vdmVDaGlsZCIsIm1vZGFsIiwic2hvd0V2ZW50IiwiVG9vbHRpcCIsImVuYWJsZWQiLCJ0aW1lb3V0IiwiaG92ZXJTdGF0ZSIsImluU3RhdGUiLCJpbml0IiwiYW5pbWF0aW9uIiwicGxhY2VtZW50IiwidGVtcGxhdGUiLCJ0aXRsZSIsImRlbGF5IiwiaHRtbCIsImNvbnRhaW5lciIsInZpZXdwb3J0IiwicGFkZGluZyIsImdldE9wdGlvbnMiLCIkdmlld3BvcnQiLCJpc0Z1bmN0aW9uIiwiY2xpY2siLCJob3ZlciIsImNvbnN0cnVjdG9yIiwidHJpZ2dlcnMiLCJldmVudEluIiwiZXZlbnRPdXQiLCJlbnRlciIsImxlYXZlIiwiX29wdGlvbnMiLCJmaXhUaXRsZSIsImdldERlZmF1bHRzIiwiZ2V0RGVsZWdhdGVPcHRpb25zIiwiZGVmYXVsdHMiLCJrZXkiLCJ2YWx1ZSIsIm9iaiIsInNlbGYiLCJ0aXAiLCJjbGVhclRpbWVvdXQiLCJpc0luU3RhdGVUcnVlIiwiaGFzQ29udGVudCIsImluRG9tIiwib3duZXJEb2N1bWVudCIsIiR0aXAiLCJ0aXBJZCIsImdldFVJRCIsInNldENvbnRlbnQiLCJhdXRvVG9rZW4iLCJhdXRvUGxhY2UiLCJ0b3AiLCJkaXNwbGF5IiwiZ2V0UG9zaXRpb24iLCJhY3R1YWxXaWR0aCIsImFjdHVhbEhlaWdodCIsIm9yZ1BsYWNlbWVudCIsInZpZXdwb3J0RGltIiwiYm90dG9tIiwid2lkdGgiLCJjYWxjdWxhdGVkT2Zmc2V0IiwiZ2V0Q2FsY3VsYXRlZE9mZnNldCIsImFwcGx5UGxhY2VtZW50IiwicHJldkhvdmVyU3RhdGUiLCJvZmZzZXQiLCJoZWlnaHQiLCJtYXJnaW5Ub3AiLCJtYXJnaW5MZWZ0IiwiaXNOYU4iLCJzZXRPZmZzZXQiLCJ1c2luZyIsInByb3BzIiwicm91bmQiLCJnZXRWaWV3cG9ydEFkanVzdGVkRGVsdGEiLCJpc1ZlcnRpY2FsIiwiYXJyb3dEZWx0YSIsImFycm93T2Zmc2V0UG9zaXRpb24iLCJyZXBsYWNlQXJyb3ciLCJhcnJvdyIsImdldFRpdGxlIiwiJGUiLCJpc0JvZHkiLCJlbFJlY3QiLCJpc1N2ZyIsIlNWR0VsZW1lbnQiLCJlbE9mZnNldCIsInNjcm9sbCIsIm91dGVyRGltcyIsInZpZXdwb3J0UGFkZGluZyIsInZpZXdwb3J0RGltZW5zaW9ucyIsInRvcEVkZ2VPZmZzZXQiLCJib3R0b21FZGdlT2Zmc2V0IiwibGVmdEVkZ2VPZmZzZXQiLCJyaWdodEVkZ2VPZmZzZXQiLCJvIiwicHJlZml4IiwicmFuZG9tIiwiZ2V0RWxlbWVudEJ5SWQiLCIkYXJyb3ciLCJlbmFibGUiLCJkaXNhYmxlIiwidG9nZ2xlRW5hYmxlZCIsImRlc3Ryb3kiLCJyZW1vdmVEYXRhIiwidG9vbHRpcCIsIlBvcG92ZXIiLCJjb250ZW50IiwiZ2V0Q29udGVudCIsInBvcG92ZXIiLCJTY3JvbGxTcHkiLCIkc2Nyb2xsRWxlbWVudCIsIm9mZnNldHMiLCJ0YXJnZXRzIiwiYWN0aXZlVGFyZ2V0IiwicHJvY2VzcyIsInJlZnJlc2giLCJnZXRTY3JvbGxIZWlnaHQiLCJtYXgiLCJvZmZzZXRNZXRob2QiLCJvZmZzZXRCYXNlIiwiaXNXaW5kb3ciLCJtYXAiLCIkaHJlZiIsInNvcnQiLCJhIiwiYiIsInB1c2giLCJtYXhTY3JvbGwiLCJhY3RpdmF0ZSIsImNsZWFyIiwicGFyZW50cyIsInBhcmVudHNVbnRpbCIsInNjcm9sbHNweSIsIiRzcHkiLCJUYWIiLCIkdWwiLCIkcHJldmlvdXMiLCJoaWRlRXZlbnQiLCJ0YWIiLCJBZmZpeCIsImNoZWNrUG9zaXRpb24iLCJjaGVja1Bvc2l0aW9uV2l0aEV2ZW50TG9vcCIsImFmZml4ZWQiLCJ1bnBpbiIsInBpbm5lZE9mZnNldCIsIlJFU0VUIiwiZ2V0U3RhdGUiLCJvZmZzZXRUb3AiLCJvZmZzZXRCb3R0b20iLCJwb3NpdGlvbiIsInRhcmdldEhlaWdodCIsImluaXRpYWxpemluZyIsImNvbGxpZGVyVG9wIiwiY29sbGlkZXJIZWlnaHQiLCJnZXRQaW5uZWRPZmZzZXQiLCJhZmZpeCIsImFmZml4VHlwZSIsImZhY3RvcnkiLCJkZWZpbmUiLCJhbWQiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsInNsaWNlIiwiQXJyYXkiLCJzcGxpY2UiLCJ0b3BTcGFjaW5nIiwiYm90dG9tU3BhY2luZyIsIndyYXBwZXJDbGFzc05hbWUiLCJjZW50ZXIiLCJnZXRXaWR0aEZyb20iLCJ3aWR0aEZyb21XcmFwcGVyIiwicmVzcG9uc2l2ZVdpZHRoIiwiekluZGV4IiwiJHdpbmRvdyIsIiRkb2N1bWVudCIsInN0aWNrZWQiLCJ3aW5kb3dIZWlnaHQiLCJzY3JvbGxlciIsImRvY3VtZW50SGVpZ2h0IiwiZHdoIiwiZXh0cmEiLCJsIiwicyIsImVsZW1lbnRUb3AiLCJzdGlja3lXcmFwcGVyIiwiZXRzZSIsInN0aWNreUVsZW1lbnQiLCJvdXRlckhlaWdodCIsImN1cnJlbnRUb3AiLCJuZXdUb3AiLCJuZXdXaWR0aCIsInN0aWNreVdyYXBwZXJDb250YWluZXIiLCJ1bnN0aWNrIiwicmVzaXplciIsIm1ldGhvZHMiLCJzdGlja3lJZCIsIndyYXBwZXJJZCIsIndyYXBwZXIiLCJ3cmFwQWxsIiwib3V0ZXJXaWR0aCIsIm1hcmdpblJpZ2h0Iiwic2V0V3JhcHBlckhlaWdodCIsInNldHVwQ2hhbmdlTGlzdGVuZXJzIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJhZGRlZE5vZGVzIiwicmVtb3ZlZE5vZGVzIiwib2JzZXJ2ZSIsInN1YnRyZWUiLCJjaGlsZExpc3QiLCJhZGRFdmVudExpc3RlbmVyIiwidXBkYXRlIiwidW5zdGlja3lFbGVtZW50IiwicmVtb3ZlSWR4IiwiZ2V0IiwidW53cmFwIiwiYXR0YWNoRXZlbnQiLCJzdGlja3kiLCJtZXRob2QiLCJlcnJvciIsImJhYmVsSGVscGVycyIsImNsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJUeXBlRXJyb3IiLCJjcmVhdGVDbGFzcyIsImRlZmluZVByb3BlcnRpZXMiLCJkZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJzaWRyU3RhdHVzIiwibW92aW5nIiwib3BlbmVkIiwiaGVscGVyIiwiaXNVcmwiLCJzdHIiLCJwYXR0ZXJuIiwiUmVnRXhwIiwiYWRkUHJlZml4ZXMiLCJhZGRQcmVmaXgiLCJhdHRyaWJ1dGUiLCJ0b1JlcGxhY2UiLCJ0cmFuc2l0aW9ucyIsInN1cHBvcnRlZCIsInByb3BlcnR5IiwicHJlZml4ZXMiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsInRvTG93ZXJDYXNlIiwiJCQyIiwiYm9keUFuaW1hdGlvbkNsYXNzIiwib3BlbkFjdGlvbiIsImNsb3NlQWN0aW9uIiwidHJhbnNpdGlvbkVuZEV2ZW50IiwiTWVudSIsIm9wZW5DbGFzcyIsIm1lbnVXaWR0aCIsInNwZWVkIiwic2lkZSIsImRpc3BsYWNlIiwidGltaW5nIiwib25PcGVuQ2FsbGJhY2siLCJvbkNsb3NlQ2FsbGJhY2siLCJvbk9wZW5FbmRDYWxsYmFjayIsIm9uQ2xvc2VFbmRDYWxsYmFjayIsImdldEFuaW1hdGlvbiIsInByZXBhcmVCb2R5IiwiJGh0bWwiLCJvcGVuQm9keSIsImJvZHlBbmltYXRpb24iLCJxdWV1ZSIsIm9uQ2xvc2VCb2R5IiwicmVzZXRTdHlsZXMiLCJ1bmJpbmQiLCJjbG9zZUJvZHkiLCJfdGhpcyIsIm1vdmVCb2R5Iiwib25PcGVuTWVudSIsIm9wZW5NZW51IiwiX3RoaXMyIiwiJGl0ZW0iLCJtZW51QW5pbWF0aW9uIiwib25DbG9zZU1lbnUiLCJjbG9zZU1lbnUiLCJfdGhpczMiLCJtb3ZlTWVudSIsIm1vdmUiLCJvcGVuIiwiX3RoaXM0IiwiYWxyZWFkeU9wZW5lZE1lbnUiLCIkJDEiLCJleGVjdXRlIiwic2lkciIsInB1YmxpY01ldGhvZHMiLCJtZXRob2ROYW1lIiwiZ2V0TWV0aG9kIiwiJCQzIiwiZmlsbENvbnRlbnQiLCIkc2lkZU1lbnUiLCJzZXR0aW5ncyIsInNvdXJjZSIsIm5ld0NvbnRlbnQiLCJodG1sQ29udGVudCIsInNlbGVjdG9ycyIsInJlbmFtaW5nIiwiJGh0bWxDb250ZW50IiwiZm5TaWRyIiwiYmluZCIsIm9uT3BlbiIsIm9uQ2xvc2UiLCJvbk9wZW5FbmQiLCJvbkNsb3NlRW5kIiwiZmxhZyIsImNhcmR0YWJsZSIsIiR0YWJsZXMiLCJoZWFkSW5kZXgiLCIkdGFibGUiLCJ0YWJsZV9jc3MiLCIkc3RhY2t0YWJsZSIsIm15Q2xhc3MiLCJtYXJrdXAiLCIkY2FwdGlvbiIsIiR0b3BSb3ciLCJoZWFkTWFya3VwIiwiYm9keU1hcmt1cCIsInRyX2NsYXNzIiwiY2xvbmUiLCJzaWJsaW5ncyIsImZpbHRlciIsImNlbGxJbmRleCIsInJvd0luZGV4IiwidHJpbSIsInRleHQiLCJwcmVwZW5kIiwiYmVmb3JlIiwic3RhY2t0YWJsZSIsImRpc3BsYXlIZWFkZXIiLCJzdGFja2NvbHVtbnMiLCJudW1fY29scyIsIiRzdGFja2NvbHVtbnMiLCJ0YiIsImNvbF9pIiwidGVtIiwiY3MiLCJzZWNvbmQiLCJsaXR5IiwiWmVwdG8iLCJfd2luIiwiX2RlZmVycmVkIiwiRGVmZXJyZWQiLCJfaHRtbCIsIl9pbnN0YW5jZXMiLCJfYXR0ckFyaWFIaWRkZW4iLCJfZGF0YUFyaWFIaWRkZW4iLCJfZm9jdXNhYmxlRWxlbWVudHNTZWxlY3RvciIsIl9kZWZhdWx0T3B0aW9ucyIsImVzYyIsImhhbmRsZXJzIiwiaW1hZ2UiLCJpbWFnZUhhbmRsZXIiLCJpbmxpbmUiLCJpbmxpbmVIYW5kbGVyIiwieW91dHViZSIsInlvdXR1YmVIYW5kbGVyIiwidmltZW8iLCJ2aW1lb0hhbmRsZXIiLCJnb29nbGVtYXBzIiwiZ29vZ2xlbWFwc0hhbmRsZXIiLCJmYWNlYm9va3ZpZGVvIiwiZmFjZWJvb2t2aWRlb0hhbmRsZXIiLCJpZnJhbWUiLCJpZnJhbWVIYW5kbGVyIiwiX2ltYWdlUmVnZXhwIiwiX3lvdXR1YmVSZWdleCIsIl92aW1lb1JlZ2V4IiwiX2dvb2dsZW1hcHNSZWdleCIsIl9mYWNlYm9va3ZpZGVvUmVnZXgiLCJfdHJhbnNpdGlvbkVuZEV2ZW50IiwiZGVmZXJyZWQiLCJyZXNvbHZlIiwicHJvbWlzZSIsImN1cnJTZXR0aW5ncyIsInBhcnNlUXVlcnlQYXJhbXMiLCJwYXJhbXMiLCJwYWlycyIsImRlY29kZVVSSSIsInAiLCJuIiwiYXBwZW5kUXVlcnlQYXJhbXMiLCJ1cmwiLCJpbmRleE9mIiwicGFyYW0iLCJ0cmFuc2Zlckhhc2giLCJvcmlnaW5hbFVybCIsIm5ld1VybCIsIm1zZyIsIm9wZW5lciIsImltZyIsImZhaWxlZCIsInJlamVjdCIsIm5hdHVyYWxXaWR0aCIsInBsYWNlaG9sZGVyIiwiaGFzSGlkZUNsYXNzIiwiYWZ0ZXIiLCJtYXRjaGVzIiwiZXhlYyIsImF1dG9wbGF5Iiwib3V0cHV0Iiwid2luSGVpZ2h0IiwiY3VycmVudCIsImN1cnJlbnRJbnN0YW5jZSIsImtleUNvZGUiLCJoYW5kbGVUYWJLZXkiLCJmb2N1c2FibGVFbGVtZW50cyIsImZvY3VzZWRJbmRleCIsImFjdGl2ZUVsZW1lbnQiLCJzaGlmdEtleSIsInJlZ2lzdGVySW5zdGFuY2UiLCJpbnN0YW5jZVRvUmVnaXN0ZXIiLCJ1bnNoaWZ0Iiwibm90IiwicmVtb3ZlSW5zdGFuY2UiLCJpbnN0YW5jZVRvUmVtb3ZlIiwiZ3JlcCIsIm9sZEF0dHIiLCJwcmVmZXJyZWRIYW5kbGVyIiwiY3VycmVudEhhbmRsZXJzIiwiY3VycmVudEhhbmRsZXIiLCJMaXR5IiwicmVzdWx0IiwiaXNSZWFkeSIsImlzQ2xvc2VkIiwiYWRkIiwiYWx3YXlzIiwid2hlbiIsInJlYWR5IiwibG9hZGVyIiwiZW1wdHkiLCJyZWdpc3RlcmVkSW5Nb2R1bGVMb2FkZXIiLCJPbGRDb29raWVzIiwiQ29va2llcyIsImFwaSIsImF0dHJpYnV0ZXMiLCJjb252ZXJ0ZXIiLCJwYXRoIiwiZXhwaXJlcyIsIkRhdGUiLCJzZXRNaWxsaXNlY29uZHMiLCJnZXRNaWxsaXNlY29uZHMiLCJ0b1VUQ1N0cmluZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJ3cml0ZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIlN0cmluZyIsImRlY29kZVVSSUNvbXBvbmVudCIsInN0cmluZ2lmaWVkQXR0cmlidXRlcyIsImF0dHJpYnV0ZU5hbWUiLCJjb29raWUiLCJjb29raWVzIiwicmRlY29kZSIsInBhcnRzIiwianNvbiIsInJlYWQiLCJwYXJzZSIsInNldCIsImdldEpTT04iLCJ3aXRoQ29udmVydGVyIiwibGFzdENsaWNrIiwic2xpbmt5IiwibGFiZWwiLCJhY3RpdmVDbGFzcyIsImhlYWRlckNsYXNzIiwiaGVhZGluZ1RhZyIsImJhY2tGaXJzdCIsIm1lbnUiLCJyb290IiwiZGVwdGgiLCIkbGluayIsImJhY2tMaW5rIiwibm93IiwianVtcCIsIm1lbnVzIiwiaG9tZSIsImNvdW50IiwiaGVhZGVyIiwicHViIiwicmVnaXN0ZXJCb290RXZlbnRIYW5kbGVycyIsInJlZ2lzdGVyRXZlbnRIYW5kbGVycyIsIkRydXBhbCIsImJlaGF2aW9ycyIsImZpY0JhY2tzdHJldGNoIiwiYXR0YWNoIiwiY29udGV4dCIsIiRpbWFnZXMiLCIkYmFja3N0cmV0Y2hXcmFwcGVyIiwiYmFja3N0cmV0Y2giLCJmYWRlIiwicGFnZXJfbGlua3Nfc2VsZWN0b3IiLCJzbGlkZVJlc2V0VGltZW91dCIsIiRwYWdlciIsIm1vdXNlb3ZlciIsIiRpZCIsIiRpIiwiJGJhY2tzdHJldGNoIiwiJGRlZmF1bHQiLCJoZWFkZXJSZWdpb24iLCIkd0giLCIkYnJhbmRpZ0giLCIkbmF2aWdhdGlvbkgiLCIkc2Nyb2xsRG93bkgiLCIkZGVzY3JIIiwiJG1pbkgiLCIkbWF4SCIsInRoZW1lIiwiZmljX21vZGFsIiwiZmljSGVhZGVyQ3ljbGVTbGlkZXNob3ciLCIkc2xpZGVTaG93Iiwib25jZSIsImFjdGl2ZVBhZ2VyQ2xhc3MiLCJwYWdlciIsImN1cnJTbGlkZUVsZW1lbnQiLCJuZXh0U2xpZGVFbGVtZW50IiwiZm9yd2FyZEZsYWciLCIkdGVybUlkIiwicGFnZXJBbmNob3JCdWlsZGVyIiwiaWR4IiwiJHNsaWRlIiwicGFnZXJFdmVudCIsInBhdXNlT25QYWdlckhvdmVyIiwibWF0Y2hlZCIsImJyb3dzZXIiLCJ1YU1hdGNoIiwidWEiLCJtYXRjaCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImNocm9tZSIsIndlYmtpdCIsInNhZmFyaSIsImNoYW5nZSIsImN0b29sc19iYWNrZHJvcF9jbG9zZSIsIkNUb29scyIsIl9zZXRfaGVpZ2h0X29uX3BhZ2Vfd3JhcHBlciIsIiRoZWFkZXIiLCJzdGFja2FibGUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7O0FBTUEsSUFBSSxPQUFPQSxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0FBQ2pDLFFBQU0sSUFBSUMsS0FBSixDQUFVLHlDQUFWLENBQU47QUFDRDs7QUFFRCxDQUFDLFVBQVVDLENBQVYsRUFBYTtBQUNaOztBQUNBLE1BQUlDLFVBQVVELEVBQUVFLEVBQUYsQ0FBS0MsTUFBTCxDQUFZQyxLQUFaLENBQWtCLEdBQWxCLEVBQXVCLENBQXZCLEVBQTBCQSxLQUExQixDQUFnQyxHQUFoQyxDQUFkO0FBQ0EsTUFBS0gsUUFBUSxDQUFSLElBQWEsQ0FBYixJQUFrQkEsUUFBUSxDQUFSLElBQWEsQ0FBaEMsSUFBdUNBLFFBQVEsQ0FBUixLQUFjLENBQWQsSUFBbUJBLFFBQVEsQ0FBUixLQUFjLENBQWpDLElBQXNDQSxRQUFRLENBQVIsSUFBYSxDQUExRixJQUFpR0EsUUFBUSxDQUFSLElBQWEsQ0FBbEgsRUFBc0g7QUFDcEgsVUFBTSxJQUFJRixLQUFKLENBQVUsMkZBQVYsQ0FBTjtBQUNEO0FBQ0YsQ0FOQSxDQU1DRCxNQU5ELENBQUQ7O0FBUUE7Ozs7Ozs7O0FBU0EsQ0FBQyxVQUFVRSxDQUFWLEVBQWE7QUFDWjs7QUFFQTtBQUNBOztBQUVBLFdBQVNLLGFBQVQsR0FBeUI7QUFDdkIsUUFBSUMsS0FBS0MsU0FBU0MsYUFBVCxDQUF1QixXQUF2QixDQUFUOztBQUVBLFFBQUlDLHFCQUFxQjtBQUN2QkMsd0JBQW1CLHFCQURJO0FBRXZCQyxxQkFBbUIsZUFGSTtBQUd2QkMsbUJBQW1CLCtCQUhJO0FBSXZCQyxrQkFBbUI7QUFKSSxLQUF6Qjs7QUFPQSxTQUFLLElBQUlDLElBQVQsSUFBaUJMLGtCQUFqQixFQUFxQztBQUNuQyxVQUFJSCxHQUFHUyxLQUFILENBQVNELElBQVQsTUFBbUJFLFNBQXZCLEVBQWtDO0FBQ2hDLGVBQU8sRUFBRUMsS0FBS1IsbUJBQW1CSyxJQUFuQixDQUFQLEVBQVA7QUFDRDtBQUNGOztBQUVELFdBQU8sS0FBUCxDQWhCdUIsQ0FnQlY7QUFDZDs7QUFFRDtBQUNBZCxJQUFFRSxFQUFGLENBQUtnQixvQkFBTCxHQUE0QixVQUFVQyxRQUFWLEVBQW9CO0FBQzlDLFFBQUlDLFNBQVMsS0FBYjtBQUNBLFFBQUlDLE1BQU0sSUFBVjtBQUNBckIsTUFBRSxJQUFGLEVBQVFzQixHQUFSLENBQVksaUJBQVosRUFBK0IsWUFBWTtBQUFFRixlQUFTLElBQVQ7QUFBZSxLQUE1RDtBQUNBLFFBQUlHLFdBQVcsU0FBWEEsUUFBVyxHQUFZO0FBQUUsVUFBSSxDQUFDSCxNQUFMLEVBQWFwQixFQUFFcUIsR0FBRixFQUFPRyxPQUFQLENBQWV4QixFQUFFeUIsT0FBRixDQUFVWixVQUFWLENBQXFCSSxHQUFwQztBQUEwQyxLQUFwRjtBQUNBUyxlQUFXSCxRQUFYLEVBQXFCSixRQUFyQjtBQUNBLFdBQU8sSUFBUDtBQUNELEdBUEQ7O0FBU0FuQixJQUFFLFlBQVk7QUFDWkEsTUFBRXlCLE9BQUYsQ0FBVVosVUFBVixHQUF1QlIsZUFBdkI7O0FBRUEsUUFBSSxDQUFDTCxFQUFFeUIsT0FBRixDQUFVWixVQUFmLEVBQTJCOztBQUUzQmIsTUFBRTJCLEtBQUYsQ0FBUUMsT0FBUixDQUFnQkMsZUFBaEIsR0FBa0M7QUFDaENDLGdCQUFVOUIsRUFBRXlCLE9BQUYsQ0FBVVosVUFBVixDQUFxQkksR0FEQztBQUVoQ2Msb0JBQWMvQixFQUFFeUIsT0FBRixDQUFVWixVQUFWLENBQXFCSSxHQUZIO0FBR2hDZSxjQUFRLGdCQUFVQyxDQUFWLEVBQWE7QUFDbkIsWUFBSWpDLEVBQUVpQyxFQUFFQyxNQUFKLEVBQVlDLEVBQVosQ0FBZSxJQUFmLENBQUosRUFBMEIsT0FBT0YsRUFBRUcsU0FBRixDQUFZQyxPQUFaLENBQW9CQyxLQUFwQixDQUEwQixJQUExQixFQUFnQ0MsU0FBaEMsQ0FBUDtBQUMzQjtBQUwrQixLQUFsQztBQU9ELEdBWkQ7QUFjRCxDQWpEQSxDQWlEQ3pDLE1BakRELENBQUQ7O0FBbURBOzs7Ozs7OztBQVNBLENBQUMsVUFBVUUsQ0FBVixFQUFhO0FBQ1o7O0FBRUE7QUFDQTs7QUFFQSxNQUFJd0MsVUFBVSx3QkFBZDtBQUNBLE1BQUlDLFFBQVUsU0FBVkEsS0FBVSxDQUFVbkMsRUFBVixFQUFjO0FBQzFCTixNQUFFTSxFQUFGLEVBQU1vQyxFQUFOLENBQVMsT0FBVCxFQUFrQkYsT0FBbEIsRUFBMkIsS0FBS0csS0FBaEM7QUFDRCxHQUZEOztBQUlBRixRQUFNRyxPQUFOLEdBQWdCLE9BQWhCOztBQUVBSCxRQUFNSSxtQkFBTixHQUE0QixHQUE1Qjs7QUFFQUosUUFBTUssU0FBTixDQUFnQkgsS0FBaEIsR0FBd0IsVUFBVVYsQ0FBVixFQUFhO0FBQ25DLFFBQUljLFFBQVcvQyxFQUFFLElBQUYsQ0FBZjtBQUNBLFFBQUlnRCxXQUFXRCxNQUFNRSxJQUFOLENBQVcsYUFBWCxDQUFmOztBQUVBLFFBQUksQ0FBQ0QsUUFBTCxFQUFlO0FBQ2JBLGlCQUFXRCxNQUFNRSxJQUFOLENBQVcsTUFBWCxDQUFYO0FBQ0FELGlCQUFXQSxZQUFZQSxTQUFTRSxPQUFULENBQWlCLGdCQUFqQixFQUFtQyxFQUFuQyxDQUF2QixDQUZhLENBRWlEO0FBQy9EOztBQUVELFFBQUlDLFVBQVVuRCxFQUFFZ0QsYUFBYSxHQUFiLEdBQW1CLEVBQW5CLEdBQXdCQSxRQUExQixDQUFkOztBQUVBLFFBQUlmLENBQUosRUFBT0EsRUFBRW1CLGNBQUY7O0FBRVAsUUFBSSxDQUFDRCxRQUFRRSxNQUFiLEVBQXFCO0FBQ25CRixnQkFBVUosTUFBTU8sT0FBTixDQUFjLFFBQWQsQ0FBVjtBQUNEOztBQUVESCxZQUFRM0IsT0FBUixDQUFnQlMsSUFBSWpDLEVBQUV1RCxLQUFGLENBQVEsZ0JBQVIsQ0FBcEI7O0FBRUEsUUFBSXRCLEVBQUV1QixrQkFBRixFQUFKLEVBQTRCOztBQUU1QkwsWUFBUU0sV0FBUixDQUFvQixJQUFwQjs7QUFFQSxhQUFTQyxhQUFULEdBQXlCO0FBQ3ZCO0FBQ0FQLGNBQVFRLE1BQVIsR0FBaUJuQyxPQUFqQixDQUF5QixpQkFBekIsRUFBNENvQyxNQUE1QztBQUNEOztBQUVENUQsTUFBRXlCLE9BQUYsQ0FBVVosVUFBVixJQUF3QnNDLFFBQVFVLFFBQVIsQ0FBaUIsTUFBakIsQ0FBeEIsR0FDRVYsUUFDRzdCLEdBREgsQ0FDTyxpQkFEUCxFQUMwQm9DLGFBRDFCLEVBRUd4QyxvQkFGSCxDQUV3QnVCLE1BQU1JLG1CQUY5QixDQURGLEdBSUVhLGVBSkY7QUFLRCxHQWpDRDs7QUFvQ0E7QUFDQTs7QUFFQSxXQUFTSSxNQUFULENBQWdCQyxNQUFoQixFQUF3QjtBQUN0QixXQUFPLEtBQUtDLElBQUwsQ0FBVSxZQUFZO0FBQzNCLFVBQUlqQixRQUFRL0MsRUFBRSxJQUFGLENBQVo7QUFDQSxVQUFJaUUsT0FBUWxCLE1BQU1rQixJQUFOLENBQVcsVUFBWCxDQUFaOztBQUVBLFVBQUksQ0FBQ0EsSUFBTCxFQUFXbEIsTUFBTWtCLElBQU4sQ0FBVyxVQUFYLEVBQXdCQSxPQUFPLElBQUl4QixLQUFKLENBQVUsSUFBVixDQUEvQjtBQUNYLFVBQUksT0FBT3NCLE1BQVAsSUFBaUIsUUFBckIsRUFBK0JFLEtBQUtGLE1BQUwsRUFBYUcsSUFBYixDQUFrQm5CLEtBQWxCO0FBQ2hDLEtBTk0sQ0FBUDtBQU9EOztBQUVELE1BQUlvQixNQUFNbkUsRUFBRUUsRUFBRixDQUFLa0UsS0FBZjs7QUFFQXBFLElBQUVFLEVBQUYsQ0FBS2tFLEtBQUwsR0FBeUJOLE1BQXpCO0FBQ0E5RCxJQUFFRSxFQUFGLENBQUtrRSxLQUFMLENBQVdDLFdBQVgsR0FBeUI1QixLQUF6Qjs7QUFHQTtBQUNBOztBQUVBekMsSUFBRUUsRUFBRixDQUFLa0UsS0FBTCxDQUFXRSxVQUFYLEdBQXdCLFlBQVk7QUFDbEN0RSxNQUFFRSxFQUFGLENBQUtrRSxLQUFMLEdBQWFELEdBQWI7QUFDQSxXQUFPLElBQVA7QUFDRCxHQUhEOztBQU1BO0FBQ0E7O0FBRUFuRSxJQUFFTyxRQUFGLEVBQVltQyxFQUFaLENBQWUseUJBQWYsRUFBMENGLE9BQTFDLEVBQW1EQyxNQUFNSyxTQUFOLENBQWdCSCxLQUFuRTtBQUVELENBcEZBLENBb0ZDN0MsTUFwRkQsQ0FBRDs7QUFzRkE7Ozs7Ozs7O0FBU0EsQ0FBQyxVQUFVRSxDQUFWLEVBQWE7QUFDWjs7QUFFQTtBQUNBOztBQUVBLE1BQUl1RSxTQUFTLFNBQVRBLE1BQVMsQ0FBVUMsT0FBVixFQUFtQkMsT0FBbkIsRUFBNEI7QUFDdkMsU0FBS0MsUUFBTCxHQUFpQjFFLEVBQUV3RSxPQUFGLENBQWpCO0FBQ0EsU0FBS0MsT0FBTCxHQUFpQnpFLEVBQUUyRSxNQUFGLENBQVMsRUFBVCxFQUFhSixPQUFPSyxRQUFwQixFQUE4QkgsT0FBOUIsQ0FBakI7QUFDQSxTQUFLSSxTQUFMLEdBQWlCLEtBQWpCO0FBQ0QsR0FKRDs7QUFNQU4sU0FBTzNCLE9BQVAsR0FBa0IsT0FBbEI7O0FBRUEyQixTQUFPSyxRQUFQLEdBQWtCO0FBQ2hCRSxpQkFBYTtBQURHLEdBQWxCOztBQUlBUCxTQUFPekIsU0FBUCxDQUFpQmlDLFFBQWpCLEdBQTRCLFVBQVVDLEtBQVYsRUFBaUI7QUFDM0MsUUFBSUMsSUFBTyxVQUFYO0FBQ0EsUUFBSTVELE1BQU8sS0FBS3FELFFBQWhCO0FBQ0EsUUFBSVEsTUFBTzdELElBQUljLEVBQUosQ0FBTyxPQUFQLElBQWtCLEtBQWxCLEdBQTBCLE1BQXJDO0FBQ0EsUUFBSThCLE9BQU81QyxJQUFJNEMsSUFBSixFQUFYOztBQUVBZSxhQUFTLE1BQVQ7O0FBRUEsUUFBSWYsS0FBS2tCLFNBQUwsSUFBa0IsSUFBdEIsRUFBNEI5RCxJQUFJNEMsSUFBSixDQUFTLFdBQVQsRUFBc0I1QyxJQUFJNkQsR0FBSixHQUF0Qjs7QUFFNUI7QUFDQXhELGVBQVcxQixFQUFFb0YsS0FBRixDQUFRLFlBQVk7QUFDN0IvRCxVQUFJNkQsR0FBSixFQUFTakIsS0FBS2UsS0FBTCxLQUFlLElBQWYsR0FBc0IsS0FBS1AsT0FBTCxDQUFhTyxLQUFiLENBQXRCLEdBQTRDZixLQUFLZSxLQUFMLENBQXJEOztBQUVBLFVBQUlBLFNBQVMsYUFBYixFQUE0QjtBQUMxQixhQUFLSCxTQUFMLEdBQWlCLElBQWpCO0FBQ0F4RCxZQUFJZ0UsUUFBSixDQUFhSixDQUFiLEVBQWdCaEMsSUFBaEIsQ0FBcUJnQyxDQUFyQixFQUF3QkEsQ0FBeEIsRUFBMkJLLElBQTNCLENBQWdDTCxDQUFoQyxFQUFtQyxJQUFuQztBQUNELE9BSEQsTUFHTyxJQUFJLEtBQUtKLFNBQVQsRUFBb0I7QUFDekIsYUFBS0EsU0FBTCxHQUFpQixLQUFqQjtBQUNBeEQsWUFBSW9DLFdBQUosQ0FBZ0J3QixDQUFoQixFQUFtQk0sVUFBbkIsQ0FBOEJOLENBQTlCLEVBQWlDSyxJQUFqQyxDQUFzQ0wsQ0FBdEMsRUFBeUMsS0FBekM7QUFDRDtBQUNGLEtBVlUsRUFVUixJQVZRLENBQVgsRUFVVSxDQVZWO0FBV0QsR0F0QkQ7O0FBd0JBVixTQUFPekIsU0FBUCxDQUFpQjBDLE1BQWpCLEdBQTBCLFlBQVk7QUFDcEMsUUFBSUMsVUFBVSxJQUFkO0FBQ0EsUUFBSXRDLFVBQVUsS0FBS3VCLFFBQUwsQ0FBY3BCLE9BQWQsQ0FBc0IseUJBQXRCLENBQWQ7O0FBRUEsUUFBSUgsUUFBUUUsTUFBWixFQUFvQjtBQUNsQixVQUFJcUMsU0FBUyxLQUFLaEIsUUFBTCxDQUFjaUIsSUFBZCxDQUFtQixPQUFuQixDQUFiO0FBQ0EsVUFBSUQsT0FBT0osSUFBUCxDQUFZLE1BQVosS0FBdUIsT0FBM0IsRUFBb0M7QUFDbEMsWUFBSUksT0FBT0osSUFBUCxDQUFZLFNBQVosQ0FBSixFQUE0QkcsVUFBVSxLQUFWO0FBQzVCdEMsZ0JBQVF3QyxJQUFSLENBQWEsU0FBYixFQUF3QmxDLFdBQXhCLENBQW9DLFFBQXBDO0FBQ0EsYUFBS2lCLFFBQUwsQ0FBY1csUUFBZCxDQUF1QixRQUF2QjtBQUNELE9BSkQsTUFJTyxJQUFJSyxPQUFPSixJQUFQLENBQVksTUFBWixLQUF1QixVQUEzQixFQUF1QztBQUM1QyxZQUFLSSxPQUFPSixJQUFQLENBQVksU0FBWixDQUFELEtBQTZCLEtBQUtaLFFBQUwsQ0FBY2IsUUFBZCxDQUF1QixRQUF2QixDQUFqQyxFQUFtRTRCLFVBQVUsS0FBVjtBQUNuRSxhQUFLZixRQUFMLENBQWNrQixXQUFkLENBQTBCLFFBQTFCO0FBQ0Q7QUFDREYsYUFBT0osSUFBUCxDQUFZLFNBQVosRUFBdUIsS0FBS1osUUFBTCxDQUFjYixRQUFkLENBQXVCLFFBQXZCLENBQXZCO0FBQ0EsVUFBSTRCLE9BQUosRUFBYUMsT0FBT2xFLE9BQVAsQ0FBZSxRQUFmO0FBQ2QsS0FaRCxNQVlPO0FBQ0wsV0FBS2tELFFBQUwsQ0FBY3pCLElBQWQsQ0FBbUIsY0FBbkIsRUFBbUMsQ0FBQyxLQUFLeUIsUUFBTCxDQUFjYixRQUFkLENBQXVCLFFBQXZCLENBQXBDO0FBQ0EsV0FBS2EsUUFBTCxDQUFja0IsV0FBZCxDQUEwQixRQUExQjtBQUNEO0FBQ0YsR0FwQkQ7O0FBdUJBO0FBQ0E7O0FBRUEsV0FBUzlCLE1BQVQsQ0FBZ0JDLE1BQWhCLEVBQXdCO0FBQ3RCLFdBQU8sS0FBS0MsSUFBTCxDQUFVLFlBQVk7QUFDM0IsVUFBSWpCLFFBQVUvQyxFQUFFLElBQUYsQ0FBZDtBQUNBLFVBQUlpRSxPQUFVbEIsTUFBTWtCLElBQU4sQ0FBVyxXQUFYLENBQWQ7QUFDQSxVQUFJUSxVQUFVLFFBQU9WLE1BQVAseUNBQU9BLE1BQVAsTUFBaUIsUUFBakIsSUFBNkJBLE1BQTNDOztBQUVBLFVBQUksQ0FBQ0UsSUFBTCxFQUFXbEIsTUFBTWtCLElBQU4sQ0FBVyxXQUFYLEVBQXlCQSxPQUFPLElBQUlNLE1BQUosQ0FBVyxJQUFYLEVBQWlCRSxPQUFqQixDQUFoQzs7QUFFWCxVQUFJVixVQUFVLFFBQWQsRUFBd0JFLEtBQUt1QixNQUFMLEdBQXhCLEtBQ0ssSUFBSXpCLE1BQUosRUFBWUUsS0FBS2MsUUFBTCxDQUFjaEIsTUFBZDtBQUNsQixLQVRNLENBQVA7QUFVRDs7QUFFRCxNQUFJSSxNQUFNbkUsRUFBRUUsRUFBRixDQUFLMkYsTUFBZjs7QUFFQTdGLElBQUVFLEVBQUYsQ0FBSzJGLE1BQUwsR0FBMEIvQixNQUExQjtBQUNBOUQsSUFBRUUsRUFBRixDQUFLMkYsTUFBTCxDQUFZeEIsV0FBWixHQUEwQkUsTUFBMUI7O0FBR0E7QUFDQTs7QUFFQXZFLElBQUVFLEVBQUYsQ0FBSzJGLE1BQUwsQ0FBWXZCLFVBQVosR0FBeUIsWUFBWTtBQUNuQ3RFLE1BQUVFLEVBQUYsQ0FBSzJGLE1BQUwsR0FBYzFCLEdBQWQ7QUFDQSxXQUFPLElBQVA7QUFDRCxHQUhEOztBQU1BO0FBQ0E7O0FBRUFuRSxJQUFFTyxRQUFGLEVBQ0dtQyxFQURILENBQ00sMEJBRE4sRUFDa0MseUJBRGxDLEVBQzZELFVBQVVULENBQVYsRUFBYTtBQUN0RSxRQUFJNkQsT0FBTzlGLEVBQUVpQyxFQUFFQyxNQUFKLEVBQVlvQixPQUFaLENBQW9CLE1BQXBCLENBQVg7QUFDQVEsV0FBT0ksSUFBUCxDQUFZNEIsSUFBWixFQUFrQixRQUFsQjtBQUNBLFFBQUksQ0FBRTlGLEVBQUVpQyxFQUFFQyxNQUFKLEVBQVlDLEVBQVosQ0FBZSw2Q0FBZixDQUFOLEVBQXNFO0FBQ3BFO0FBQ0FGLFFBQUVtQixjQUFGO0FBQ0E7QUFDQSxVQUFJMEMsS0FBSzNELEVBQUwsQ0FBUSxjQUFSLENBQUosRUFBNkIyRCxLQUFLdEUsT0FBTCxDQUFhLE9BQWIsRUFBN0IsS0FDS3NFLEtBQUtILElBQUwsQ0FBVSw4QkFBVixFQUEwQ0ksS0FBMUMsR0FBa0R2RSxPQUFsRCxDQUEwRCxPQUExRDtBQUNOO0FBQ0YsR0FYSCxFQVlHa0IsRUFaSCxDQVlNLGtEQVpOLEVBWTBELHlCQVoxRCxFQVlxRixVQUFVVCxDQUFWLEVBQWE7QUFDOUZqQyxNQUFFaUMsRUFBRUMsTUFBSixFQUFZb0IsT0FBWixDQUFvQixNQUFwQixFQUE0QnNDLFdBQTVCLENBQXdDLE9BQXhDLEVBQWlELGVBQWVJLElBQWYsQ0FBb0IvRCxFQUFFZ0UsSUFBdEIsQ0FBakQ7QUFDRCxHQWRIO0FBZ0JELENBbkhBLENBbUhDbkcsTUFuSEQsQ0FBRDs7QUFxSEE7Ozs7Ozs7O0FBU0EsQ0FBQyxVQUFVRSxDQUFWLEVBQWE7QUFDWjs7QUFFQTtBQUNBOztBQUVBLE1BQUlrRyxXQUFXLFNBQVhBLFFBQVcsQ0FBVTFCLE9BQVYsRUFBbUJDLE9BQW5CLEVBQTRCO0FBQ3pDLFNBQUtDLFFBQUwsR0FBbUIxRSxFQUFFd0UsT0FBRixDQUFuQjtBQUNBLFNBQUsyQixXQUFMLEdBQW1CLEtBQUt6QixRQUFMLENBQWNpQixJQUFkLENBQW1CLHNCQUFuQixDQUFuQjtBQUNBLFNBQUtsQixPQUFMLEdBQW1CQSxPQUFuQjtBQUNBLFNBQUsyQixNQUFMLEdBQW1CLElBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFtQixJQUFuQjtBQUNBLFNBQUtDLFFBQUwsR0FBbUIsSUFBbkI7QUFDQSxTQUFLQyxPQUFMLEdBQW1CLElBQW5CO0FBQ0EsU0FBS0MsTUFBTCxHQUFtQixJQUFuQjs7QUFFQSxTQUFLL0IsT0FBTCxDQUFhZ0MsUUFBYixJQUF5QixLQUFLL0IsUUFBTCxDQUFjaEMsRUFBZCxDQUFpQixxQkFBakIsRUFBd0MxQyxFQUFFb0YsS0FBRixDQUFRLEtBQUtzQixPQUFiLEVBQXNCLElBQXRCLENBQXhDLENBQXpCOztBQUVBLFNBQUtqQyxPQUFMLENBQWFrQyxLQUFiLElBQXNCLE9BQXRCLElBQWlDLEVBQUUsa0JBQWtCcEcsU0FBU3FHLGVBQTdCLENBQWpDLElBQWtGLEtBQUtsQyxRQUFMLENBQy9FaEMsRUFEK0UsQ0FDNUUsd0JBRDRFLEVBQ2xEMUMsRUFBRW9GLEtBQUYsQ0FBUSxLQUFLdUIsS0FBYixFQUFvQixJQUFwQixDQURrRCxFQUUvRWpFLEVBRitFLENBRTVFLHdCQUY0RSxFQUVsRDFDLEVBQUVvRixLQUFGLENBQVEsS0FBS3lCLEtBQWIsRUFBb0IsSUFBcEIsQ0FGa0QsQ0FBbEY7QUFHRCxHQWZEOztBQWlCQVgsV0FBU3RELE9BQVQsR0FBb0IsT0FBcEI7O0FBRUFzRCxXQUFTckQsbUJBQVQsR0FBK0IsR0FBL0I7O0FBRUFxRCxXQUFTdEIsUUFBVCxHQUFvQjtBQUNsQjBCLGNBQVUsSUFEUTtBQUVsQkssV0FBTyxPQUZXO0FBR2xCRyxVQUFNLElBSFk7QUFJbEJMLGNBQVU7QUFKUSxHQUFwQjs7QUFPQVAsV0FBU3BELFNBQVQsQ0FBbUI0RCxPQUFuQixHQUE2QixVQUFVekUsQ0FBVixFQUFhO0FBQ3hDLFFBQUksa0JBQWtCK0QsSUFBbEIsQ0FBdUIvRCxFQUFFQyxNQUFGLENBQVM2RSxPQUFoQyxDQUFKLEVBQThDO0FBQzlDLFlBQVE5RSxFQUFFK0UsS0FBVjtBQUNFLFdBQUssRUFBTDtBQUFTLGFBQUtDLElBQUwsR0FBYTtBQUN0QixXQUFLLEVBQUw7QUFBUyxhQUFLQyxJQUFMLEdBQWE7QUFDdEI7QUFBUztBQUhYOztBQU1BakYsTUFBRW1CLGNBQUY7QUFDRCxHQVREOztBQVdBOEMsV0FBU3BELFNBQVQsQ0FBbUIrRCxLQUFuQixHQUEyQixVQUFVNUUsQ0FBVixFQUFhO0FBQ3RDQSxVQUFNLEtBQUttRSxNQUFMLEdBQWMsS0FBcEI7O0FBRUEsU0FBS0UsUUFBTCxJQUFpQmEsY0FBYyxLQUFLYixRQUFuQixDQUFqQjs7QUFFQSxTQUFLN0IsT0FBTCxDQUFhNkIsUUFBYixJQUNLLENBQUMsS0FBS0YsTUFEWCxLQUVNLEtBQUtFLFFBQUwsR0FBZ0JjLFlBQVlwSCxFQUFFb0YsS0FBRixDQUFRLEtBQUs4QixJQUFiLEVBQW1CLElBQW5CLENBQVosRUFBc0MsS0FBS3pDLE9BQUwsQ0FBYTZCLFFBQW5ELENBRnRCOztBQUlBLFdBQU8sSUFBUDtBQUNELEdBVkQ7O0FBWUFKLFdBQVNwRCxTQUFULENBQW1CdUUsWUFBbkIsR0FBa0MsVUFBVUMsSUFBVixFQUFnQjtBQUNoRCxTQUFLZCxNQUFMLEdBQWNjLEtBQUtDLE1BQUwsR0FBY0MsUUFBZCxDQUF1QixPQUF2QixDQUFkO0FBQ0EsV0FBTyxLQUFLaEIsTUFBTCxDQUFZaUIsS0FBWixDQUFrQkgsUUFBUSxLQUFLZixPQUEvQixDQUFQO0FBQ0QsR0FIRDs7QUFLQUwsV0FBU3BELFNBQVQsQ0FBbUI0RSxtQkFBbkIsR0FBeUMsVUFBVUMsU0FBVixFQUFxQkMsTUFBckIsRUFBNkI7QUFDcEUsUUFBSUMsY0FBYyxLQUFLUixZQUFMLENBQWtCTyxNQUFsQixDQUFsQjtBQUNBLFFBQUlFLFdBQVlILGFBQWEsTUFBYixJQUF1QkUsZ0JBQWdCLENBQXhDLElBQ0NGLGFBQWEsTUFBYixJQUF1QkUsZUFBZ0IsS0FBS3JCLE1BQUwsQ0FBWW5ELE1BQVosR0FBcUIsQ0FENUU7QUFFQSxRQUFJeUUsWUFBWSxDQUFDLEtBQUtyRCxPQUFMLENBQWFxQyxJQUE5QixFQUFvQyxPQUFPYyxNQUFQO0FBQ3BDLFFBQUlHLFFBQVFKLGFBQWEsTUFBYixHQUFzQixDQUFDLENBQXZCLEdBQTJCLENBQXZDO0FBQ0EsUUFBSUssWUFBWSxDQUFDSCxjQUFjRSxLQUFmLElBQXdCLEtBQUt2QixNQUFMLENBQVluRCxNQUFwRDtBQUNBLFdBQU8sS0FBS21ELE1BQUwsQ0FBWXlCLEVBQVosQ0FBZUQsU0FBZixDQUFQO0FBQ0QsR0FSRDs7QUFVQTlCLFdBQVNwRCxTQUFULENBQW1Cb0YsRUFBbkIsR0FBd0IsVUFBVUMsR0FBVixFQUFlO0FBQ3JDLFFBQUlDLE9BQWMsSUFBbEI7QUFDQSxRQUFJUCxjQUFjLEtBQUtSLFlBQUwsQ0FBa0IsS0FBS2QsT0FBTCxHQUFlLEtBQUs3QixRQUFMLENBQWNpQixJQUFkLENBQW1CLGNBQW5CLENBQWpDLENBQWxCOztBQUVBLFFBQUl3QyxNQUFPLEtBQUszQixNQUFMLENBQVluRCxNQUFaLEdBQXFCLENBQTVCLElBQWtDOEUsTUFBTSxDQUE1QyxFQUErQzs7QUFFL0MsUUFBSSxLQUFLOUIsT0FBVCxFQUF3QixPQUFPLEtBQUszQixRQUFMLENBQWNwRCxHQUFkLENBQWtCLGtCQUFsQixFQUFzQyxZQUFZO0FBQUU4RyxXQUFLRixFQUFMLENBQVFDLEdBQVI7QUFBYyxLQUFsRSxDQUFQLENBTmEsQ0FNOEQ7QUFDbkcsUUFBSU4sZUFBZU0sR0FBbkIsRUFBd0IsT0FBTyxLQUFLeEIsS0FBTCxHQUFhRSxLQUFiLEVBQVA7O0FBRXhCLFdBQU8sS0FBS3dCLEtBQUwsQ0FBV0YsTUFBTU4sV0FBTixHQUFvQixNQUFwQixHQUE2QixNQUF4QyxFQUFnRCxLQUFLckIsTUFBTCxDQUFZeUIsRUFBWixDQUFlRSxHQUFmLENBQWhELENBQVA7QUFDRCxHQVZEOztBQVlBakMsV0FBU3BELFNBQVQsQ0FBbUI2RCxLQUFuQixHQUEyQixVQUFVMUUsQ0FBVixFQUFhO0FBQ3RDQSxVQUFNLEtBQUttRSxNQUFMLEdBQWMsSUFBcEI7O0FBRUEsUUFBSSxLQUFLMUIsUUFBTCxDQUFjaUIsSUFBZCxDQUFtQixjQUFuQixFQUFtQ3RDLE1BQW5DLElBQTZDckQsRUFBRXlCLE9BQUYsQ0FBVVosVUFBM0QsRUFBdUU7QUFDckUsV0FBSzZELFFBQUwsQ0FBY2xELE9BQWQsQ0FBc0J4QixFQUFFeUIsT0FBRixDQUFVWixVQUFWLENBQXFCSSxHQUEzQztBQUNBLFdBQUs0RixLQUFMLENBQVcsSUFBWDtBQUNEOztBQUVELFNBQUtQLFFBQUwsR0FBZ0JhLGNBQWMsS0FBS2IsUUFBbkIsQ0FBaEI7O0FBRUEsV0FBTyxJQUFQO0FBQ0QsR0FYRDs7QUFhQUosV0FBU3BELFNBQVQsQ0FBbUJvRSxJQUFuQixHQUEwQixZQUFZO0FBQ3BDLFFBQUksS0FBS2IsT0FBVCxFQUFrQjtBQUNsQixXQUFPLEtBQUtnQyxLQUFMLENBQVcsTUFBWCxDQUFQO0FBQ0QsR0FIRDs7QUFLQW5DLFdBQVNwRCxTQUFULENBQW1CbUUsSUFBbkIsR0FBMEIsWUFBWTtBQUNwQyxRQUFJLEtBQUtaLE9BQVQsRUFBa0I7QUFDbEIsV0FBTyxLQUFLZ0MsS0FBTCxDQUFXLE1BQVgsQ0FBUDtBQUNELEdBSEQ7O0FBS0FuQyxXQUFTcEQsU0FBVCxDQUFtQnVGLEtBQW5CLEdBQTJCLFVBQVVwQyxJQUFWLEVBQWdCaUIsSUFBaEIsRUFBc0I7QUFDL0MsUUFBSVgsVUFBWSxLQUFLN0IsUUFBTCxDQUFjaUIsSUFBZCxDQUFtQixjQUFuQixDQUFoQjtBQUNBLFFBQUkyQyxRQUFZcEIsUUFBUSxLQUFLUSxtQkFBTCxDQUF5QnpCLElBQXpCLEVBQStCTSxPQUEvQixDQUF4QjtBQUNBLFFBQUlnQyxZQUFZLEtBQUtqQyxRQUFyQjtBQUNBLFFBQUlxQixZQUFZMUIsUUFBUSxNQUFSLEdBQWlCLE1BQWpCLEdBQTBCLE9BQTFDO0FBQ0EsUUFBSW1DLE9BQVksSUFBaEI7O0FBRUEsUUFBSUUsTUFBTXpFLFFBQU4sQ0FBZSxRQUFmLENBQUosRUFBOEIsT0FBUSxLQUFLd0MsT0FBTCxHQUFlLEtBQXZCOztBQUU5QixRQUFJbUMsZ0JBQWdCRixNQUFNLENBQU4sQ0FBcEI7QUFDQSxRQUFJRyxhQUFhekksRUFBRXVELEtBQUYsQ0FBUSxtQkFBUixFQUE2QjtBQUM1Q2lGLHFCQUFlQSxhQUQ2QjtBQUU1Q2IsaUJBQVdBO0FBRmlDLEtBQTdCLENBQWpCO0FBSUEsU0FBS2pELFFBQUwsQ0FBY2xELE9BQWQsQ0FBc0JpSCxVQUF0QjtBQUNBLFFBQUlBLFdBQVdqRixrQkFBWCxFQUFKLEVBQXFDOztBQUVyQyxTQUFLNkMsT0FBTCxHQUFlLElBQWY7O0FBRUFrQyxpQkFBYSxLQUFLNUIsS0FBTCxFQUFiOztBQUVBLFFBQUksS0FBS1IsV0FBTCxDQUFpQjlDLE1BQXJCLEVBQTZCO0FBQzNCLFdBQUs4QyxXQUFMLENBQWlCUixJQUFqQixDQUFzQixTQUF0QixFQUFpQ2xDLFdBQWpDLENBQTZDLFFBQTdDO0FBQ0EsVUFBSWlGLGlCQUFpQjFJLEVBQUUsS0FBS21HLFdBQUwsQ0FBaUJxQixRQUFqQixHQUE0QixLQUFLSCxZQUFMLENBQWtCaUIsS0FBbEIsQ0FBNUIsQ0FBRixDQUFyQjtBQUNBSSx3QkFBa0JBLGVBQWVyRCxRQUFmLENBQXdCLFFBQXhCLENBQWxCO0FBQ0Q7O0FBRUQsUUFBSXNELFlBQVkzSSxFQUFFdUQsS0FBRixDQUFRLGtCQUFSLEVBQTRCLEVBQUVpRixlQUFlQSxhQUFqQixFQUFnQ2IsV0FBV0EsU0FBM0MsRUFBNUIsQ0FBaEIsQ0EzQitDLENBMkJxRDtBQUNwRyxRQUFJM0gsRUFBRXlCLE9BQUYsQ0FBVVosVUFBVixJQUF3QixLQUFLNkQsUUFBTCxDQUFjYixRQUFkLENBQXVCLE9BQXZCLENBQTVCLEVBQTZEO0FBQzNEeUUsWUFBTWpELFFBQU4sQ0FBZVksSUFBZjtBQUNBcUMsWUFBTSxDQUFOLEVBQVNNLFdBQVQsQ0FGMkQsQ0FFdEM7QUFDckJyQyxjQUFRbEIsUUFBUixDQUFpQnNDLFNBQWpCO0FBQ0FXLFlBQU1qRCxRQUFOLENBQWVzQyxTQUFmO0FBQ0FwQixjQUNHakYsR0FESCxDQUNPLGlCQURQLEVBQzBCLFlBQVk7QUFDbENnSCxjQUFNN0UsV0FBTixDQUFrQixDQUFDd0MsSUFBRCxFQUFPMEIsU0FBUCxFQUFrQmtCLElBQWxCLENBQXVCLEdBQXZCLENBQWxCLEVBQStDeEQsUUFBL0MsQ0FBd0QsUUFBeEQ7QUFDQWtCLGdCQUFROUMsV0FBUixDQUFvQixDQUFDLFFBQUQsRUFBV2tFLFNBQVgsRUFBc0JrQixJQUF0QixDQUEyQixHQUEzQixDQUFwQjtBQUNBVCxhQUFLL0IsT0FBTCxHQUFlLEtBQWY7QUFDQTNFLG1CQUFXLFlBQVk7QUFDckIwRyxlQUFLMUQsUUFBTCxDQUFjbEQsT0FBZCxDQUFzQm1ILFNBQXRCO0FBQ0QsU0FGRCxFQUVHLENBRkg7QUFHRCxPQVJILEVBU0d6SCxvQkFUSCxDQVN3QmdGLFNBQVNyRCxtQkFUakM7QUFVRCxLQWZELE1BZU87QUFDTDBELGNBQVE5QyxXQUFSLENBQW9CLFFBQXBCO0FBQ0E2RSxZQUFNakQsUUFBTixDQUFlLFFBQWY7QUFDQSxXQUFLZ0IsT0FBTCxHQUFlLEtBQWY7QUFDQSxXQUFLM0IsUUFBTCxDQUFjbEQsT0FBZCxDQUFzQm1ILFNBQXRCO0FBQ0Q7O0FBRURKLGlCQUFhLEtBQUsxQixLQUFMLEVBQWI7O0FBRUEsV0FBTyxJQUFQO0FBQ0QsR0FyREQ7O0FBd0RBO0FBQ0E7O0FBRUEsV0FBUy9DLE1BQVQsQ0FBZ0JDLE1BQWhCLEVBQXdCO0FBQ3RCLFdBQU8sS0FBS0MsSUFBTCxDQUFVLFlBQVk7QUFDM0IsVUFBSWpCLFFBQVUvQyxFQUFFLElBQUYsQ0FBZDtBQUNBLFVBQUlpRSxPQUFVbEIsTUFBTWtCLElBQU4sQ0FBVyxhQUFYLENBQWQ7QUFDQSxVQUFJUSxVQUFVekUsRUFBRTJFLE1BQUYsQ0FBUyxFQUFULEVBQWF1QixTQUFTdEIsUUFBdEIsRUFBZ0M3QixNQUFNa0IsSUFBTixFQUFoQyxFQUE4QyxRQUFPRixNQUFQLHlDQUFPQSxNQUFQLE1BQWlCLFFBQWpCLElBQTZCQSxNQUEzRSxDQUFkO0FBQ0EsVUFBSStFLFNBQVUsT0FBTy9FLE1BQVAsSUFBaUIsUUFBakIsR0FBNEJBLE1BQTVCLEdBQXFDVSxRQUFRNEQsS0FBM0Q7O0FBRUEsVUFBSSxDQUFDcEUsSUFBTCxFQUFXbEIsTUFBTWtCLElBQU4sQ0FBVyxhQUFYLEVBQTJCQSxPQUFPLElBQUlpQyxRQUFKLENBQWEsSUFBYixFQUFtQnpCLE9BQW5CLENBQWxDO0FBQ1gsVUFBSSxPQUFPVixNQUFQLElBQWlCLFFBQXJCLEVBQStCRSxLQUFLaUUsRUFBTCxDQUFRbkUsTUFBUixFQUEvQixLQUNLLElBQUkrRSxNQUFKLEVBQVk3RSxLQUFLNkUsTUFBTCxJQUFaLEtBQ0EsSUFBSXJFLFFBQVE2QixRQUFaLEVBQXNCckMsS0FBSzBDLEtBQUwsR0FBYUUsS0FBYjtBQUM1QixLQVZNLENBQVA7QUFXRDs7QUFFRCxNQUFJMUMsTUFBTW5FLEVBQUVFLEVBQUYsQ0FBSzZJLFFBQWY7O0FBRUEvSSxJQUFFRSxFQUFGLENBQUs2SSxRQUFMLEdBQTRCakYsTUFBNUI7QUFDQTlELElBQUVFLEVBQUYsQ0FBSzZJLFFBQUwsQ0FBYzFFLFdBQWQsR0FBNEI2QixRQUE1Qjs7QUFHQTtBQUNBOztBQUVBbEcsSUFBRUUsRUFBRixDQUFLNkksUUFBTCxDQUFjekUsVUFBZCxHQUEyQixZQUFZO0FBQ3JDdEUsTUFBRUUsRUFBRixDQUFLNkksUUFBTCxHQUFnQjVFLEdBQWhCO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsR0FIRDs7QUFNQTtBQUNBOztBQUVBLE1BQUk2RSxlQUFlLFNBQWZBLFlBQWUsQ0FBVS9HLENBQVYsRUFBYTtBQUM5QixRQUFJZ0gsSUFBSjtBQUNBLFFBQUlsRyxRQUFVL0MsRUFBRSxJQUFGLENBQWQ7QUFDQSxRQUFJa0osVUFBVWxKLEVBQUUrQyxNQUFNRSxJQUFOLENBQVcsYUFBWCxLQUE2QixDQUFDZ0csT0FBT2xHLE1BQU1FLElBQU4sQ0FBVyxNQUFYLENBQVIsS0FBK0JnRyxLQUFLL0YsT0FBTCxDQUFhLGdCQUFiLEVBQStCLEVBQS9CLENBQTlELENBQWQsQ0FIOEIsQ0FHa0Y7QUFDaEgsUUFBSSxDQUFDZ0csUUFBUXJGLFFBQVIsQ0FBaUIsVUFBakIsQ0FBTCxFQUFtQztBQUNuQyxRQUFJWSxVQUFVekUsRUFBRTJFLE1BQUYsQ0FBUyxFQUFULEVBQWF1RSxRQUFRakYsSUFBUixFQUFiLEVBQTZCbEIsTUFBTWtCLElBQU4sRUFBN0IsQ0FBZDtBQUNBLFFBQUlrRixhQUFhcEcsTUFBTUUsSUFBTixDQUFXLGVBQVgsQ0FBakI7QUFDQSxRQUFJa0csVUFBSixFQUFnQjFFLFFBQVE2QixRQUFSLEdBQW1CLEtBQW5COztBQUVoQnhDLFdBQU9JLElBQVAsQ0FBWWdGLE9BQVosRUFBcUJ6RSxPQUFyQjs7QUFFQSxRQUFJMEUsVUFBSixFQUFnQjtBQUNkRCxjQUFRakYsSUFBUixDQUFhLGFBQWIsRUFBNEJpRSxFQUE1QixDQUErQmlCLFVBQS9CO0FBQ0Q7O0FBRURsSCxNQUFFbUIsY0FBRjtBQUNELEdBaEJEOztBQWtCQXBELElBQUVPLFFBQUYsRUFDR21DLEVBREgsQ0FDTSw0QkFETixFQUNvQyxjQURwQyxFQUNvRHNHLFlBRHBELEVBRUd0RyxFQUZILENBRU0sNEJBRk4sRUFFb0MsaUJBRnBDLEVBRXVEc0csWUFGdkQ7O0FBSUFoSixJQUFFb0osTUFBRixFQUFVMUcsRUFBVixDQUFhLE1BQWIsRUFBcUIsWUFBWTtBQUMvQjFDLE1BQUUsd0JBQUYsRUFBNEJnRSxJQUE1QixDQUFpQyxZQUFZO0FBQzNDLFVBQUlxRixZQUFZckosRUFBRSxJQUFGLENBQWhCO0FBQ0E4RCxhQUFPSSxJQUFQLENBQVltRixTQUFaLEVBQXVCQSxVQUFVcEYsSUFBVixFQUF2QjtBQUNELEtBSEQ7QUFJRCxHQUxEO0FBT0QsQ0FuT0EsQ0FtT0NuRSxNQW5PRCxDQUFEOztBQXFPQTs7Ozs7Ozs7QUFRQTs7QUFFQSxDQUFDLFVBQVVFLENBQVYsRUFBYTtBQUNaOztBQUVBO0FBQ0E7O0FBRUEsTUFBSXNKLFdBQVcsU0FBWEEsUUFBVyxDQUFVOUUsT0FBVixFQUFtQkMsT0FBbkIsRUFBNEI7QUFDekMsU0FBS0MsUUFBTCxHQUFxQjFFLEVBQUV3RSxPQUFGLENBQXJCO0FBQ0EsU0FBS0MsT0FBTCxHQUFxQnpFLEVBQUUyRSxNQUFGLENBQVMsRUFBVCxFQUFhMkUsU0FBUzFFLFFBQXRCLEVBQWdDSCxPQUFoQyxDQUFyQjtBQUNBLFNBQUs4RSxRQUFMLEdBQXFCdkosRUFBRSxxQ0FBcUN3RSxRQUFRZ0YsRUFBN0MsR0FBa0QsS0FBbEQsR0FDQSx5Q0FEQSxHQUM0Q2hGLFFBQVFnRixFQURwRCxHQUN5RCxJQUQzRCxDQUFyQjtBQUVBLFNBQUtDLGFBQUwsR0FBcUIsSUFBckI7O0FBRUEsUUFBSSxLQUFLaEYsT0FBTCxDQUFhOEMsTUFBakIsRUFBeUI7QUFDdkIsV0FBS3BFLE9BQUwsR0FBZSxLQUFLdUcsU0FBTCxFQUFmO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsV0FBS0Msd0JBQUwsQ0FBOEIsS0FBS2pGLFFBQW5DLEVBQTZDLEtBQUs2RSxRQUFsRDtBQUNEOztBQUVELFFBQUksS0FBSzlFLE9BQUwsQ0FBYWUsTUFBakIsRUFBeUIsS0FBS0EsTUFBTDtBQUMxQixHQWREOztBQWdCQThELFdBQVMxRyxPQUFULEdBQW9CLE9BQXBCOztBQUVBMEcsV0FBU3pHLG1CQUFULEdBQStCLEdBQS9COztBQUVBeUcsV0FBUzFFLFFBQVQsR0FBb0I7QUFDbEJZLFlBQVE7QUFEVSxHQUFwQjs7QUFJQThELFdBQVN4RyxTQUFULENBQW1COEcsU0FBbkIsR0FBK0IsWUFBWTtBQUN6QyxRQUFJQyxXQUFXLEtBQUtuRixRQUFMLENBQWNiLFFBQWQsQ0FBdUIsT0FBdkIsQ0FBZjtBQUNBLFdBQU9nRyxXQUFXLE9BQVgsR0FBcUIsUUFBNUI7QUFDRCxHQUhEOztBQUtBUCxXQUFTeEcsU0FBVCxDQUFtQmdILElBQW5CLEdBQTBCLFlBQVk7QUFDcEMsUUFBSSxLQUFLTCxhQUFMLElBQXNCLEtBQUsvRSxRQUFMLENBQWNiLFFBQWQsQ0FBdUIsSUFBdkIsQ0FBMUIsRUFBd0Q7O0FBRXhELFFBQUlrRyxXQUFKO0FBQ0EsUUFBSUMsVUFBVSxLQUFLN0csT0FBTCxJQUFnQixLQUFLQSxPQUFMLENBQWFxRSxRQUFiLENBQXNCLFFBQXRCLEVBQWdDQSxRQUFoQyxDQUF5QyxrQkFBekMsQ0FBOUI7O0FBRUEsUUFBSXdDLFdBQVdBLFFBQVEzRyxNQUF2QixFQUErQjtBQUM3QjBHLG9CQUFjQyxRQUFRL0YsSUFBUixDQUFhLGFBQWIsQ0FBZDtBQUNBLFVBQUk4RixlQUFlQSxZQUFZTixhQUEvQixFQUE4QztBQUMvQzs7QUFFRCxRQUFJUSxhQUFhakssRUFBRXVELEtBQUYsQ0FBUSxrQkFBUixDQUFqQjtBQUNBLFNBQUttQixRQUFMLENBQWNsRCxPQUFkLENBQXNCeUksVUFBdEI7QUFDQSxRQUFJQSxXQUFXekcsa0JBQVgsRUFBSixFQUFxQzs7QUFFckMsUUFBSXdHLFdBQVdBLFFBQVEzRyxNQUF2QixFQUErQjtBQUM3QlMsYUFBT0ksSUFBUCxDQUFZOEYsT0FBWixFQUFxQixNQUFyQjtBQUNBRCxxQkFBZUMsUUFBUS9GLElBQVIsQ0FBYSxhQUFiLEVBQTRCLElBQTVCLENBQWY7QUFDRDs7QUFFRCxRQUFJMkYsWUFBWSxLQUFLQSxTQUFMLEVBQWhCOztBQUVBLFNBQUtsRixRQUFMLENBQ0dqQixXQURILENBQ2UsVUFEZixFQUVHNEIsUUFGSCxDQUVZLFlBRlosRUFFMEJ1RSxTQUYxQixFQUVxQyxDQUZyQyxFQUdHM0csSUFISCxDQUdRLGVBSFIsRUFHeUIsSUFIekI7O0FBS0EsU0FBS3NHLFFBQUwsQ0FDRzlGLFdBREgsQ0FDZSxXQURmLEVBRUdSLElBRkgsQ0FFUSxlQUZSLEVBRXlCLElBRnpCOztBQUlBLFNBQUt3RyxhQUFMLEdBQXFCLENBQXJCOztBQUVBLFFBQUlTLFdBQVcsU0FBWEEsUUFBVyxHQUFZO0FBQ3pCLFdBQUt4RixRQUFMLENBQ0dqQixXQURILENBQ2UsWUFEZixFQUVHNEIsUUFGSCxDQUVZLGFBRlosRUFFMkJ1RSxTQUYzQixFQUVzQyxFQUZ0QztBQUdBLFdBQUtILGFBQUwsR0FBcUIsQ0FBckI7QUFDQSxXQUFLL0UsUUFBTCxDQUNHbEQsT0FESCxDQUNXLG1CQURYO0FBRUQsS0FQRDs7QUFTQSxRQUFJLENBQUN4QixFQUFFeUIsT0FBRixDQUFVWixVQUFmLEVBQTJCLE9BQU9xSixTQUFTaEcsSUFBVCxDQUFjLElBQWQsQ0FBUDs7QUFFM0IsUUFBSWlHLGFBQWFuSyxFQUFFb0ssU0FBRixDQUFZLENBQUMsUUFBRCxFQUFXUixTQUFYLEVBQXNCZixJQUF0QixDQUEyQixHQUEzQixDQUFaLENBQWpCOztBQUVBLFNBQUtuRSxRQUFMLENBQ0dwRCxHQURILENBQ08saUJBRFAsRUFDMEJ0QixFQUFFb0YsS0FBRixDQUFROEUsUUFBUixFQUFrQixJQUFsQixDQUQxQixFQUVHaEosb0JBRkgsQ0FFd0JvSSxTQUFTekcsbUJBRmpDLEVBRXNEK0csU0FGdEQsRUFFaUUsS0FBS2xGLFFBQUwsQ0FBYyxDQUFkLEVBQWlCeUYsVUFBakIsQ0FGakU7QUFHRCxHQWpERDs7QUFtREFiLFdBQVN4RyxTQUFULENBQW1CdUgsSUFBbkIsR0FBMEIsWUFBWTtBQUNwQyxRQUFJLEtBQUtaLGFBQUwsSUFBc0IsQ0FBQyxLQUFLL0UsUUFBTCxDQUFjYixRQUFkLENBQXVCLElBQXZCLENBQTNCLEVBQXlEOztBQUV6RCxRQUFJb0csYUFBYWpLLEVBQUV1RCxLQUFGLENBQVEsa0JBQVIsQ0FBakI7QUFDQSxTQUFLbUIsUUFBTCxDQUFjbEQsT0FBZCxDQUFzQnlJLFVBQXRCO0FBQ0EsUUFBSUEsV0FBV3pHLGtCQUFYLEVBQUosRUFBcUM7O0FBRXJDLFFBQUlvRyxZQUFZLEtBQUtBLFNBQUwsRUFBaEI7O0FBRUEsU0FBS2xGLFFBQUwsQ0FBY2tGLFNBQWQsRUFBeUIsS0FBS2xGLFFBQUwsQ0FBY2tGLFNBQWQsR0FBekIsRUFBcUQsQ0FBckQsRUFBd0RVLFlBQXhEOztBQUVBLFNBQUs1RixRQUFMLENBQ0dXLFFBREgsQ0FDWSxZQURaLEVBRUc1QixXQUZILENBRWUsYUFGZixFQUdHUixJQUhILENBR1EsZUFIUixFQUd5QixLQUh6Qjs7QUFLQSxTQUFLc0csUUFBTCxDQUNHbEUsUUFESCxDQUNZLFdBRFosRUFFR3BDLElBRkgsQ0FFUSxlQUZSLEVBRXlCLEtBRnpCOztBQUlBLFNBQUt3RyxhQUFMLEdBQXFCLENBQXJCOztBQUVBLFFBQUlTLFdBQVcsU0FBWEEsUUFBVyxHQUFZO0FBQ3pCLFdBQUtULGFBQUwsR0FBcUIsQ0FBckI7QUFDQSxXQUFLL0UsUUFBTCxDQUNHakIsV0FESCxDQUNlLFlBRGYsRUFFRzRCLFFBRkgsQ0FFWSxVQUZaLEVBR0c3RCxPQUhILENBR1csb0JBSFg7QUFJRCxLQU5EOztBQVFBLFFBQUksQ0FBQ3hCLEVBQUV5QixPQUFGLENBQVVaLFVBQWYsRUFBMkIsT0FBT3FKLFNBQVNoRyxJQUFULENBQWMsSUFBZCxDQUFQOztBQUUzQixTQUFLUSxRQUFMLENBQ0drRixTQURILEVBQ2MsQ0FEZCxFQUVHdEksR0FGSCxDQUVPLGlCQUZQLEVBRTBCdEIsRUFBRW9GLEtBQUYsQ0FBUThFLFFBQVIsRUFBa0IsSUFBbEIsQ0FGMUIsRUFHR2hKLG9CQUhILENBR3dCb0ksU0FBU3pHLG1CQUhqQztBQUlELEdBcENEOztBQXNDQXlHLFdBQVN4RyxTQUFULENBQW1CMEMsTUFBbkIsR0FBNEIsWUFBWTtBQUN0QyxTQUFLLEtBQUtkLFFBQUwsQ0FBY2IsUUFBZCxDQUF1QixJQUF2QixJQUErQixNQUEvQixHQUF3QyxNQUE3QztBQUNELEdBRkQ7O0FBSUF5RixXQUFTeEcsU0FBVCxDQUFtQjRHLFNBQW5CLEdBQStCLFlBQVk7QUFDekMsV0FBTzFKLEVBQUUsS0FBS3lFLE9BQUwsQ0FBYThDLE1BQWYsRUFDSjVCLElBREksQ0FDQywyQ0FBMkMsS0FBS2xCLE9BQUwsQ0FBYThDLE1BQXhELEdBQWlFLElBRGxFLEVBRUp2RCxJQUZJLENBRUNoRSxFQUFFb0YsS0FBRixDQUFRLFVBQVVtRixDQUFWLEVBQWEvRixPQUFiLEVBQXNCO0FBQ2xDLFVBQUlFLFdBQVcxRSxFQUFFd0UsT0FBRixDQUFmO0FBQ0EsV0FBS21GLHdCQUFMLENBQThCYSxxQkFBcUI5RixRQUFyQixDQUE5QixFQUE4REEsUUFBOUQ7QUFDRCxLQUhLLEVBR0gsSUFIRyxDQUZELEVBTUp6RCxHQU5JLEVBQVA7QUFPRCxHQVJEOztBQVVBcUksV0FBU3hHLFNBQVQsQ0FBbUI2Ryx3QkFBbkIsR0FBOEMsVUFBVWpGLFFBQVYsRUFBb0I2RSxRQUFwQixFQUE4QjtBQUMxRSxRQUFJa0IsU0FBUy9GLFNBQVNiLFFBQVQsQ0FBa0IsSUFBbEIsQ0FBYjs7QUFFQWEsYUFBU3pCLElBQVQsQ0FBYyxlQUFkLEVBQStCd0gsTUFBL0I7QUFDQWxCLGFBQ0czRCxXQURILENBQ2UsV0FEZixFQUM0QixDQUFDNkUsTUFEN0IsRUFFR3hILElBRkgsQ0FFUSxlQUZSLEVBRXlCd0gsTUFGekI7QUFHRCxHQVBEOztBQVNBLFdBQVNELG9CQUFULENBQThCakIsUUFBOUIsRUFBd0M7QUFDdEMsUUFBSU4sSUFBSjtBQUNBLFFBQUkvRyxTQUFTcUgsU0FBU3RHLElBQVQsQ0FBYyxhQUFkLEtBQ1IsQ0FBQ2dHLE9BQU9NLFNBQVN0RyxJQUFULENBQWMsTUFBZCxDQUFSLEtBQWtDZ0csS0FBSy9GLE9BQUwsQ0FBYSxnQkFBYixFQUErQixFQUEvQixDQUR2QyxDQUZzQyxDQUdvQzs7QUFFMUUsV0FBT2xELEVBQUVrQyxNQUFGLENBQVA7QUFDRDs7QUFHRDtBQUNBOztBQUVBLFdBQVM0QixNQUFULENBQWdCQyxNQUFoQixFQUF3QjtBQUN0QixXQUFPLEtBQUtDLElBQUwsQ0FBVSxZQUFZO0FBQzNCLFVBQUlqQixRQUFVL0MsRUFBRSxJQUFGLENBQWQ7QUFDQSxVQUFJaUUsT0FBVWxCLE1BQU1rQixJQUFOLENBQVcsYUFBWCxDQUFkO0FBQ0EsVUFBSVEsVUFBVXpFLEVBQUUyRSxNQUFGLENBQVMsRUFBVCxFQUFhMkUsU0FBUzFFLFFBQXRCLEVBQWdDN0IsTUFBTWtCLElBQU4sRUFBaEMsRUFBOEMsUUFBT0YsTUFBUCx5Q0FBT0EsTUFBUCxNQUFpQixRQUFqQixJQUE2QkEsTUFBM0UsQ0FBZDs7QUFFQSxVQUFJLENBQUNFLElBQUQsSUFBU1EsUUFBUWUsTUFBakIsSUFBMkIsWUFBWVEsSUFBWixDQUFpQmpDLE1BQWpCLENBQS9CLEVBQXlEVSxRQUFRZSxNQUFSLEdBQWlCLEtBQWpCO0FBQ3pELFVBQUksQ0FBQ3ZCLElBQUwsRUFBV2xCLE1BQU1rQixJQUFOLENBQVcsYUFBWCxFQUEyQkEsT0FBTyxJQUFJcUYsUUFBSixDQUFhLElBQWIsRUFBbUI3RSxPQUFuQixDQUFsQztBQUNYLFVBQUksT0FBT1YsTUFBUCxJQUFpQixRQUFyQixFQUErQkUsS0FBS0YsTUFBTDtBQUNoQyxLQVJNLENBQVA7QUFTRDs7QUFFRCxNQUFJSSxNQUFNbkUsRUFBRUUsRUFBRixDQUFLd0ssUUFBZjs7QUFFQTFLLElBQUVFLEVBQUYsQ0FBS3dLLFFBQUwsR0FBNEI1RyxNQUE1QjtBQUNBOUQsSUFBRUUsRUFBRixDQUFLd0ssUUFBTCxDQUFjckcsV0FBZCxHQUE0QmlGLFFBQTVCOztBQUdBO0FBQ0E7O0FBRUF0SixJQUFFRSxFQUFGLENBQUt3SyxRQUFMLENBQWNwRyxVQUFkLEdBQTJCLFlBQVk7QUFDckN0RSxNQUFFRSxFQUFGLENBQUt3SyxRQUFMLEdBQWdCdkcsR0FBaEI7QUFDQSxXQUFPLElBQVA7QUFDRCxHQUhEOztBQU1BO0FBQ0E7O0FBRUFuRSxJQUFFTyxRQUFGLEVBQVltQyxFQUFaLENBQWUsNEJBQWYsRUFBNkMsMEJBQTdDLEVBQXlFLFVBQVVULENBQVYsRUFBYTtBQUNwRixRQUFJYyxRQUFVL0MsRUFBRSxJQUFGLENBQWQ7O0FBRUEsUUFBSSxDQUFDK0MsTUFBTUUsSUFBTixDQUFXLGFBQVgsQ0FBTCxFQUFnQ2hCLEVBQUVtQixjQUFGOztBQUVoQyxRQUFJOEYsVUFBVXNCLHFCQUFxQnpILEtBQXJCLENBQWQ7QUFDQSxRQUFJa0IsT0FBVWlGLFFBQVFqRixJQUFSLENBQWEsYUFBYixDQUFkO0FBQ0EsUUFBSUYsU0FBVUUsT0FBTyxRQUFQLEdBQWtCbEIsTUFBTWtCLElBQU4sRUFBaEM7O0FBRUFILFdBQU9JLElBQVAsQ0FBWWdGLE9BQVosRUFBcUJuRixNQUFyQjtBQUNELEdBVkQ7QUFZRCxDQXpNQSxDQXlNQ2pFLE1Bek1ELENBQUQ7O0FBMk1BOzs7Ozs7OztBQVNBLENBQUMsVUFBVUUsQ0FBVixFQUFhO0FBQ1o7O0FBRUE7QUFDQTs7QUFFQSxNQUFJMkssV0FBVyxvQkFBZjtBQUNBLE1BQUluRixTQUFXLDBCQUFmO0FBQ0EsTUFBSW9GLFdBQVcsU0FBWEEsUUFBVyxDQUFVcEcsT0FBVixFQUFtQjtBQUNoQ3hFLE1BQUV3RSxPQUFGLEVBQVc5QixFQUFYLENBQWMsbUJBQWQsRUFBbUMsS0FBSzhDLE1BQXhDO0FBQ0QsR0FGRDs7QUFJQW9GLFdBQVNoSSxPQUFULEdBQW1CLE9BQW5COztBQUVBLFdBQVM4RyxTQUFULENBQW1CM0csS0FBbkIsRUFBMEI7QUFDeEIsUUFBSUMsV0FBV0QsTUFBTUUsSUFBTixDQUFXLGFBQVgsQ0FBZjs7QUFFQSxRQUFJLENBQUNELFFBQUwsRUFBZTtBQUNiQSxpQkFBV0QsTUFBTUUsSUFBTixDQUFXLE1BQVgsQ0FBWDtBQUNBRCxpQkFBV0EsWUFBWSxZQUFZZ0QsSUFBWixDQUFpQmhELFFBQWpCLENBQVosSUFBMENBLFNBQVNFLE9BQVQsQ0FBaUIsZ0JBQWpCLEVBQW1DLEVBQW5DLENBQXJELENBRmEsQ0FFK0U7QUFDN0Y7O0FBRUQsUUFBSUMsVUFBVUgsWUFBWWhELEVBQUVnRCxRQUFGLENBQTFCOztBQUVBLFdBQU9HLFdBQVdBLFFBQVFFLE1BQW5CLEdBQTRCRixPQUE1QixHQUFzQ0osTUFBTXdFLE1BQU4sRUFBN0M7QUFDRDs7QUFFRCxXQUFTc0QsVUFBVCxDQUFvQjVJLENBQXBCLEVBQXVCO0FBQ3JCLFFBQUlBLEtBQUtBLEVBQUUrRSxLQUFGLEtBQVksQ0FBckIsRUFBd0I7QUFDeEJoSCxNQUFFMkssUUFBRixFQUFZL0csTUFBWjtBQUNBNUQsTUFBRXdGLE1BQUYsRUFBVXhCLElBQVYsQ0FBZSxZQUFZO0FBQ3pCLFVBQUlqQixRQUFnQi9DLEVBQUUsSUFBRixDQUFwQjtBQUNBLFVBQUltRCxVQUFnQnVHLFVBQVUzRyxLQUFWLENBQXBCO0FBQ0EsVUFBSXlGLGdCQUFnQixFQUFFQSxlQUFlLElBQWpCLEVBQXBCOztBQUVBLFVBQUksQ0FBQ3JGLFFBQVFVLFFBQVIsQ0FBaUIsTUFBakIsQ0FBTCxFQUErQjs7QUFFL0IsVUFBSTVCLEtBQUtBLEVBQUVnRSxJQUFGLElBQVUsT0FBZixJQUEwQixrQkFBa0JELElBQWxCLENBQXVCL0QsRUFBRUMsTUFBRixDQUFTNkUsT0FBaEMsQ0FBMUIsSUFBc0UvRyxFQUFFOEssUUFBRixDQUFXM0gsUUFBUSxDQUFSLENBQVgsRUFBdUJsQixFQUFFQyxNQUF6QixDQUExRSxFQUE0Rzs7QUFFNUdpQixjQUFRM0IsT0FBUixDQUFnQlMsSUFBSWpDLEVBQUV1RCxLQUFGLENBQVEsa0JBQVIsRUFBNEJpRixhQUE1QixDQUFwQjs7QUFFQSxVQUFJdkcsRUFBRXVCLGtCQUFGLEVBQUosRUFBNEI7O0FBRTVCVCxZQUFNRSxJQUFOLENBQVcsZUFBWCxFQUE0QixPQUE1QjtBQUNBRSxjQUFRTSxXQUFSLENBQW9CLE1BQXBCLEVBQTRCakMsT0FBNUIsQ0FBb0N4QixFQUFFdUQsS0FBRixDQUFRLG9CQUFSLEVBQThCaUYsYUFBOUIsQ0FBcEM7QUFDRCxLQWZEO0FBZ0JEOztBQUVEb0MsV0FBUzlILFNBQVQsQ0FBbUIwQyxNQUFuQixHQUE0QixVQUFVdkQsQ0FBVixFQUFhO0FBQ3ZDLFFBQUljLFFBQVEvQyxFQUFFLElBQUYsQ0FBWjs7QUFFQSxRQUFJK0MsTUFBTVosRUFBTixDQUFTLHNCQUFULENBQUosRUFBc0M7O0FBRXRDLFFBQUlnQixVQUFXdUcsVUFBVTNHLEtBQVYsQ0FBZjtBQUNBLFFBQUlnSSxXQUFXNUgsUUFBUVUsUUFBUixDQUFpQixNQUFqQixDQUFmOztBQUVBZ0g7O0FBRUEsUUFBSSxDQUFDRSxRQUFMLEVBQWU7QUFDYixVQUFJLGtCQUFrQnhLLFNBQVNxRyxlQUEzQixJQUE4QyxDQUFDekQsUUFBUUcsT0FBUixDQUFnQixhQUFoQixFQUErQkQsTUFBbEYsRUFBMEY7QUFDeEY7QUFDQXJELFVBQUVPLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBRixFQUNHNkUsUUFESCxDQUNZLG1CQURaLEVBRUcyRixXQUZILENBRWVoTCxFQUFFLElBQUYsQ0FGZixFQUdHMEMsRUFISCxDQUdNLE9BSE4sRUFHZW1JLFVBSGY7QUFJRDs7QUFFRCxVQUFJckMsZ0JBQWdCLEVBQUVBLGVBQWUsSUFBakIsRUFBcEI7QUFDQXJGLGNBQVEzQixPQUFSLENBQWdCUyxJQUFJakMsRUFBRXVELEtBQUYsQ0FBUSxrQkFBUixFQUE0QmlGLGFBQTVCLENBQXBCOztBQUVBLFVBQUl2RyxFQUFFdUIsa0JBQUYsRUFBSixFQUE0Qjs7QUFFNUJULFlBQ0d2QixPQURILENBQ1csT0FEWCxFQUVHeUIsSUFGSCxDQUVRLGVBRlIsRUFFeUIsTUFGekI7O0FBSUFFLGNBQ0d5QyxXQURILENBQ2UsTUFEZixFQUVHcEUsT0FGSCxDQUVXeEIsRUFBRXVELEtBQUYsQ0FBUSxtQkFBUixFQUE2QmlGLGFBQTdCLENBRlg7QUFHRDs7QUFFRCxXQUFPLEtBQVA7QUFDRCxHQWxDRDs7QUFvQ0FvQyxXQUFTOUgsU0FBVCxDQUFtQjRELE9BQW5CLEdBQTZCLFVBQVV6RSxDQUFWLEVBQWE7QUFDeEMsUUFBSSxDQUFDLGdCQUFnQitELElBQWhCLENBQXFCL0QsRUFBRStFLEtBQXZCLENBQUQsSUFBa0Msa0JBQWtCaEIsSUFBbEIsQ0FBdUIvRCxFQUFFQyxNQUFGLENBQVM2RSxPQUFoQyxDQUF0QyxFQUFnRjs7QUFFaEYsUUFBSWhFLFFBQVEvQyxFQUFFLElBQUYsQ0FBWjs7QUFFQWlDLE1BQUVtQixjQUFGO0FBQ0FuQixNQUFFZ0osZUFBRjs7QUFFQSxRQUFJbEksTUFBTVosRUFBTixDQUFTLHNCQUFULENBQUosRUFBc0M7O0FBRXRDLFFBQUlnQixVQUFXdUcsVUFBVTNHLEtBQVYsQ0FBZjtBQUNBLFFBQUlnSSxXQUFXNUgsUUFBUVUsUUFBUixDQUFpQixNQUFqQixDQUFmOztBQUVBLFFBQUksQ0FBQ2tILFFBQUQsSUFBYTlJLEVBQUUrRSxLQUFGLElBQVcsRUFBeEIsSUFBOEIrRCxZQUFZOUksRUFBRStFLEtBQUYsSUFBVyxFQUF6RCxFQUE2RDtBQUMzRCxVQUFJL0UsRUFBRStFLEtBQUYsSUFBVyxFQUFmLEVBQW1CN0QsUUFBUXdDLElBQVIsQ0FBYUgsTUFBYixFQUFxQmhFLE9BQXJCLENBQTZCLE9BQTdCO0FBQ25CLGFBQU91QixNQUFNdkIsT0FBTixDQUFjLE9BQWQsQ0FBUDtBQUNEOztBQUVELFFBQUkwSixPQUFPLDhCQUFYO0FBQ0EsUUFBSTFFLFNBQVNyRCxRQUFRd0MsSUFBUixDQUFhLG1CQUFtQnVGLElBQWhDLENBQWI7O0FBRUEsUUFBSSxDQUFDMUUsT0FBT25ELE1BQVosRUFBb0I7O0FBRXBCLFFBQUlvRSxRQUFRakIsT0FBT2lCLEtBQVAsQ0FBYXhGLEVBQUVDLE1BQWYsQ0FBWjs7QUFFQSxRQUFJRCxFQUFFK0UsS0FBRixJQUFXLEVBQVgsSUFBaUJTLFFBQVEsQ0FBN0IsRUFBZ0RBLFFBekJSLENBeUJ3QjtBQUNoRSxRQUFJeEYsRUFBRStFLEtBQUYsSUFBVyxFQUFYLElBQWlCUyxRQUFRakIsT0FBT25ELE1BQVAsR0FBZ0IsQ0FBN0MsRUFBZ0RvRSxRQTFCUixDQTBCd0I7QUFDaEUsUUFBSSxDQUFDLENBQUNBLEtBQU4sRUFBZ0RBLFFBQVEsQ0FBUjs7QUFFaERqQixXQUFPeUIsRUFBUCxDQUFVUixLQUFWLEVBQWlCakcsT0FBakIsQ0FBeUIsT0FBekI7QUFDRCxHQTlCRDs7QUFpQ0E7QUFDQTs7QUFFQSxXQUFTc0MsTUFBVCxDQUFnQkMsTUFBaEIsRUFBd0I7QUFDdEIsV0FBTyxLQUFLQyxJQUFMLENBQVUsWUFBWTtBQUMzQixVQUFJakIsUUFBUS9DLEVBQUUsSUFBRixDQUFaO0FBQ0EsVUFBSWlFLE9BQVFsQixNQUFNa0IsSUFBTixDQUFXLGFBQVgsQ0FBWjs7QUFFQSxVQUFJLENBQUNBLElBQUwsRUFBV2xCLE1BQU1rQixJQUFOLENBQVcsYUFBWCxFQUEyQkEsT0FBTyxJQUFJMkcsUUFBSixDQUFhLElBQWIsQ0FBbEM7QUFDWCxVQUFJLE9BQU83RyxNQUFQLElBQWlCLFFBQXJCLEVBQStCRSxLQUFLRixNQUFMLEVBQWFHLElBQWIsQ0FBa0JuQixLQUFsQjtBQUNoQyxLQU5NLENBQVA7QUFPRDs7QUFFRCxNQUFJb0IsTUFBTW5FLEVBQUVFLEVBQUYsQ0FBS2lMLFFBQWY7O0FBRUFuTCxJQUFFRSxFQUFGLENBQUtpTCxRQUFMLEdBQTRCckgsTUFBNUI7QUFDQTlELElBQUVFLEVBQUYsQ0FBS2lMLFFBQUwsQ0FBYzlHLFdBQWQsR0FBNEJ1RyxRQUE1Qjs7QUFHQTtBQUNBOztBQUVBNUssSUFBRUUsRUFBRixDQUFLaUwsUUFBTCxDQUFjN0csVUFBZCxHQUEyQixZQUFZO0FBQ3JDdEUsTUFBRUUsRUFBRixDQUFLaUwsUUFBTCxHQUFnQmhILEdBQWhCO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsR0FIRDs7QUFNQTtBQUNBOztBQUVBbkUsSUFBRU8sUUFBRixFQUNHbUMsRUFESCxDQUNNLDRCQUROLEVBQ29DbUksVUFEcEMsRUFFR25JLEVBRkgsQ0FFTSw0QkFGTixFQUVvQyxnQkFGcEMsRUFFc0QsVUFBVVQsQ0FBVixFQUFhO0FBQUVBLE1BQUVnSixlQUFGO0FBQXFCLEdBRjFGLEVBR0d2SSxFQUhILENBR00sNEJBSE4sRUFHb0M4QyxNQUhwQyxFQUc0Q29GLFNBQVM5SCxTQUFULENBQW1CMEMsTUFIL0QsRUFJRzlDLEVBSkgsQ0FJTSw4QkFKTixFQUlzQzhDLE1BSnRDLEVBSThDb0YsU0FBUzlILFNBQVQsQ0FBbUI0RCxPQUpqRSxFQUtHaEUsRUFMSCxDQUtNLDhCQUxOLEVBS3NDLGdCQUx0QyxFQUt3RGtJLFNBQVM5SCxTQUFULENBQW1CNEQsT0FMM0U7QUFPRCxDQTNKQSxDQTJKQzVHLE1BM0pELENBQUQ7O0FBNkpBOzs7Ozs7OztBQVNBLENBQUMsVUFBVUUsQ0FBVixFQUFhO0FBQ1o7O0FBRUE7QUFDQTs7QUFFQSxNQUFJb0wsUUFBUSxTQUFSQSxLQUFRLENBQVU1RyxPQUFWLEVBQW1CQyxPQUFuQixFQUE0QjtBQUN0QyxTQUFLQSxPQUFMLEdBQTJCQSxPQUEzQjtBQUNBLFNBQUs0RyxLQUFMLEdBQTJCckwsRUFBRU8sU0FBUytLLElBQVgsQ0FBM0I7QUFDQSxTQUFLNUcsUUFBTCxHQUEyQjFFLEVBQUV3RSxPQUFGLENBQTNCO0FBQ0EsU0FBSytHLE9BQUwsR0FBMkIsS0FBSzdHLFFBQUwsQ0FBY2lCLElBQWQsQ0FBbUIsZUFBbkIsQ0FBM0I7QUFDQSxTQUFLNkYsU0FBTCxHQUEyQixJQUEzQjtBQUNBLFNBQUtDLE9BQUwsR0FBMkIsSUFBM0I7QUFDQSxTQUFLQyxlQUFMLEdBQTJCLElBQTNCO0FBQ0EsU0FBS0MsY0FBTCxHQUEyQixDQUEzQjtBQUNBLFNBQUtDLG1CQUFMLEdBQTJCLEtBQTNCOztBQUVBLFFBQUksS0FBS25ILE9BQUwsQ0FBYW9ILE1BQWpCLEVBQXlCO0FBQ3ZCLFdBQUtuSCxRQUFMLENBQ0dpQixJQURILENBQ1EsZ0JBRFIsRUFFR21HLElBRkgsQ0FFUSxLQUFLckgsT0FBTCxDQUFhb0gsTUFGckIsRUFFNkI3TCxFQUFFb0YsS0FBRixDQUFRLFlBQVk7QUFDN0MsYUFBS1YsUUFBTCxDQUFjbEQsT0FBZCxDQUFzQixpQkFBdEI7QUFDRCxPQUYwQixFQUV4QixJQUZ3QixDQUY3QjtBQUtEO0FBQ0YsR0FsQkQ7O0FBb0JBNEosUUFBTXhJLE9BQU4sR0FBaUIsT0FBakI7O0FBRUF3SSxRQUFNdkksbUJBQU4sR0FBNEIsR0FBNUI7QUFDQXVJLFFBQU1XLDRCQUFOLEdBQXFDLEdBQXJDOztBQUVBWCxRQUFNeEcsUUFBTixHQUFpQjtBQUNmK0YsY0FBVSxJQURLO0FBRWZsRSxjQUFVLElBRks7QUFHZnFELFVBQU07QUFIUyxHQUFqQjs7QUFNQXNCLFFBQU10SSxTQUFOLENBQWdCMEMsTUFBaEIsR0FBeUIsVUFBVXdHLGNBQVYsRUFBMEI7QUFDakQsV0FBTyxLQUFLUCxPQUFMLEdBQWUsS0FBS3BCLElBQUwsRUFBZixHQUE2QixLQUFLUCxJQUFMLENBQVVrQyxjQUFWLENBQXBDO0FBQ0QsR0FGRDs7QUFJQVosUUFBTXRJLFNBQU4sQ0FBZ0JnSCxJQUFoQixHQUF1QixVQUFVa0MsY0FBVixFQUEwQjtBQUMvQyxRQUFJNUQsT0FBTyxJQUFYO0FBQ0EsUUFBSW5HLElBQU9qQyxFQUFFdUQsS0FBRixDQUFRLGVBQVIsRUFBeUIsRUFBRWlGLGVBQWV3RCxjQUFqQixFQUF6QixDQUFYOztBQUVBLFNBQUt0SCxRQUFMLENBQWNsRCxPQUFkLENBQXNCUyxDQUF0Qjs7QUFFQSxRQUFJLEtBQUt3SixPQUFMLElBQWdCeEosRUFBRXVCLGtCQUFGLEVBQXBCLEVBQTRDOztBQUU1QyxTQUFLaUksT0FBTCxHQUFlLElBQWY7O0FBRUEsU0FBS1EsY0FBTDtBQUNBLFNBQUtDLFlBQUw7QUFDQSxTQUFLYixLQUFMLENBQVdoRyxRQUFYLENBQW9CLFlBQXBCOztBQUVBLFNBQUs4RyxNQUFMO0FBQ0EsU0FBS0MsTUFBTDs7QUFFQSxTQUFLMUgsUUFBTCxDQUFjaEMsRUFBZCxDQUFpQix3QkFBakIsRUFBMkMsd0JBQTNDLEVBQXFFMUMsRUFBRW9GLEtBQUYsQ0FBUSxLQUFLaUYsSUFBYixFQUFtQixJQUFuQixDQUFyRTs7QUFFQSxTQUFLa0IsT0FBTCxDQUFhN0ksRUFBYixDQUFnQiw0QkFBaEIsRUFBOEMsWUFBWTtBQUN4RDBGLFdBQUsxRCxRQUFMLENBQWNwRCxHQUFkLENBQWtCLDBCQUFsQixFQUE4QyxVQUFVVyxDQUFWLEVBQWE7QUFDekQsWUFBSWpDLEVBQUVpQyxFQUFFQyxNQUFKLEVBQVlDLEVBQVosQ0FBZWlHLEtBQUsxRCxRQUFwQixDQUFKLEVBQW1DMEQsS0FBS3dELG1CQUFMLEdBQTJCLElBQTNCO0FBQ3BDLE9BRkQ7QUFHRCxLQUpEOztBQU1BLFNBQUtqQixRQUFMLENBQWMsWUFBWTtBQUN4QixVQUFJOUosYUFBYWIsRUFBRXlCLE9BQUYsQ0FBVVosVUFBVixJQUF3QnVILEtBQUsxRCxRQUFMLENBQWNiLFFBQWQsQ0FBdUIsTUFBdkIsQ0FBekM7O0FBRUEsVUFBSSxDQUFDdUUsS0FBSzFELFFBQUwsQ0FBYzZDLE1BQWQsR0FBdUJsRSxNQUE1QixFQUFvQztBQUNsQytFLGFBQUsxRCxRQUFMLENBQWMySCxRQUFkLENBQXVCakUsS0FBS2lELEtBQTVCLEVBRGtDLENBQ0M7QUFDcEM7O0FBRURqRCxXQUFLMUQsUUFBTCxDQUNHb0YsSUFESCxHQUVHd0MsU0FGSCxDQUVhLENBRmI7O0FBSUFsRSxXQUFLbUUsWUFBTDs7QUFFQSxVQUFJMUwsVUFBSixFQUFnQjtBQUNkdUgsYUFBSzFELFFBQUwsQ0FBYyxDQUFkLEVBQWlCa0UsV0FBakIsQ0FEYyxDQUNlO0FBQzlCOztBQUVEUixXQUFLMUQsUUFBTCxDQUFjVyxRQUFkLENBQXVCLElBQXZCOztBQUVBK0MsV0FBS29FLFlBQUw7O0FBRUEsVUFBSXZLLElBQUlqQyxFQUFFdUQsS0FBRixDQUFRLGdCQUFSLEVBQTBCLEVBQUVpRixlQUFld0QsY0FBakIsRUFBMUIsQ0FBUjs7QUFFQW5MLG1CQUNFdUgsS0FBS21ELE9BQUwsQ0FBYTtBQUFiLE9BQ0dqSyxHQURILENBQ08saUJBRFAsRUFDMEIsWUFBWTtBQUNsQzhHLGFBQUsxRCxRQUFMLENBQWNsRCxPQUFkLENBQXNCLE9BQXRCLEVBQStCQSxPQUEvQixDQUF1Q1MsQ0FBdkM7QUFDRCxPQUhILEVBSUdmLG9CQUpILENBSXdCa0ssTUFBTXZJLG1CQUo5QixDQURGLEdBTUV1RixLQUFLMUQsUUFBTCxDQUFjbEQsT0FBZCxDQUFzQixPQUF0QixFQUErQkEsT0FBL0IsQ0FBdUNTLENBQXZDLENBTkY7QUFPRCxLQTlCRDtBQStCRCxHQXhERDs7QUEwREFtSixRQUFNdEksU0FBTixDQUFnQnVILElBQWhCLEdBQXVCLFVBQVVwSSxDQUFWLEVBQWE7QUFDbEMsUUFBSUEsQ0FBSixFQUFPQSxFQUFFbUIsY0FBRjs7QUFFUG5CLFFBQUlqQyxFQUFFdUQsS0FBRixDQUFRLGVBQVIsQ0FBSjs7QUFFQSxTQUFLbUIsUUFBTCxDQUFjbEQsT0FBZCxDQUFzQlMsQ0FBdEI7O0FBRUEsUUFBSSxDQUFDLEtBQUt3SixPQUFOLElBQWlCeEosRUFBRXVCLGtCQUFGLEVBQXJCLEVBQTZDOztBQUU3QyxTQUFLaUksT0FBTCxHQUFlLEtBQWY7O0FBRUEsU0FBS1UsTUFBTDtBQUNBLFNBQUtDLE1BQUw7O0FBRUFwTSxNQUFFTyxRQUFGLEVBQVlrTSxHQUFaLENBQWdCLGtCQUFoQjs7QUFFQSxTQUFLL0gsUUFBTCxDQUNHakIsV0FESCxDQUNlLElBRGYsRUFFR2dKLEdBRkgsQ0FFTyx3QkFGUCxFQUdHQSxHQUhILENBR08sMEJBSFA7O0FBS0EsU0FBS2xCLE9BQUwsQ0FBYWtCLEdBQWIsQ0FBaUIsNEJBQWpCOztBQUVBek0sTUFBRXlCLE9BQUYsQ0FBVVosVUFBVixJQUF3QixLQUFLNkQsUUFBTCxDQUFjYixRQUFkLENBQXVCLE1BQXZCLENBQXhCLEdBQ0UsS0FBS2EsUUFBTCxDQUNHcEQsR0FESCxDQUNPLGlCQURQLEVBQzBCdEIsRUFBRW9GLEtBQUYsQ0FBUSxLQUFLc0gsU0FBYixFQUF3QixJQUF4QixDQUQxQixFQUVHeEwsb0JBRkgsQ0FFd0JrSyxNQUFNdkksbUJBRjlCLENBREYsR0FJRSxLQUFLNkosU0FBTCxFQUpGO0FBS0QsR0E1QkQ7O0FBOEJBdEIsUUFBTXRJLFNBQU4sQ0FBZ0IwSixZQUFoQixHQUErQixZQUFZO0FBQ3pDeE0sTUFBRU8sUUFBRixFQUNHa00sR0FESCxDQUNPLGtCQURQLEVBQzJCO0FBRDNCLEtBRUcvSixFQUZILENBRU0sa0JBRk4sRUFFMEIxQyxFQUFFb0YsS0FBRixDQUFRLFVBQVVuRCxDQUFWLEVBQWE7QUFDM0MsVUFBSTFCLGFBQWEwQixFQUFFQyxNQUFmLElBQ0EsS0FBS3dDLFFBQUwsQ0FBYyxDQUFkLE1BQXFCekMsRUFBRUMsTUFEdkIsSUFFQSxDQUFDLEtBQUt3QyxRQUFMLENBQWNpSSxHQUFkLENBQWtCMUssRUFBRUMsTUFBcEIsRUFBNEJtQixNQUZqQyxFQUV5QztBQUN2QyxhQUFLcUIsUUFBTCxDQUFjbEQsT0FBZCxDQUFzQixPQUF0QjtBQUNEO0FBQ0YsS0FOdUIsRUFNckIsSUFOcUIsQ0FGMUI7QUFTRCxHQVZEOztBQVlBNEosUUFBTXRJLFNBQU4sQ0FBZ0JxSixNQUFoQixHQUF5QixZQUFZO0FBQ25DLFFBQUksS0FBS1YsT0FBTCxJQUFnQixLQUFLaEgsT0FBTCxDQUFhZ0MsUUFBakMsRUFBMkM7QUFDekMsV0FBSy9CLFFBQUwsQ0FBY2hDLEVBQWQsQ0FBaUIsMEJBQWpCLEVBQTZDMUMsRUFBRW9GLEtBQUYsQ0FBUSxVQUFVbkQsQ0FBVixFQUFhO0FBQ2hFQSxVQUFFK0UsS0FBRixJQUFXLEVBQVgsSUFBaUIsS0FBS3FELElBQUwsRUFBakI7QUFDRCxPQUY0QyxFQUUxQyxJQUYwQyxDQUE3QztBQUdELEtBSkQsTUFJTyxJQUFJLENBQUMsS0FBS29CLE9BQVYsRUFBbUI7QUFDeEIsV0FBSy9HLFFBQUwsQ0FBYytILEdBQWQsQ0FBa0IsMEJBQWxCO0FBQ0Q7QUFDRixHQVJEOztBQVVBckIsUUFBTXRJLFNBQU4sQ0FBZ0JzSixNQUFoQixHQUF5QixZQUFZO0FBQ25DLFFBQUksS0FBS1gsT0FBVCxFQUFrQjtBQUNoQnpMLFFBQUVvSixNQUFGLEVBQVUxRyxFQUFWLENBQWEsaUJBQWIsRUFBZ0MxQyxFQUFFb0YsS0FBRixDQUFRLEtBQUt3SCxZQUFiLEVBQTJCLElBQTNCLENBQWhDO0FBQ0QsS0FGRCxNQUVPO0FBQ0w1TSxRQUFFb0osTUFBRixFQUFVcUQsR0FBVixDQUFjLGlCQUFkO0FBQ0Q7QUFDRixHQU5EOztBQVFBckIsUUFBTXRJLFNBQU4sQ0FBZ0I0SixTQUFoQixHQUE0QixZQUFZO0FBQ3RDLFFBQUl0RSxPQUFPLElBQVg7QUFDQSxTQUFLMUQsUUFBTCxDQUFjMkYsSUFBZDtBQUNBLFNBQUtNLFFBQUwsQ0FBYyxZQUFZO0FBQ3hCdkMsV0FBS2lELEtBQUwsQ0FBVzVILFdBQVgsQ0FBdUIsWUFBdkI7QUFDQTJFLFdBQUt5RSxnQkFBTDtBQUNBekUsV0FBSzBFLGNBQUw7QUFDQTFFLFdBQUsxRCxRQUFMLENBQWNsRCxPQUFkLENBQXNCLGlCQUF0QjtBQUNELEtBTEQ7QUFNRCxHQVREOztBQVdBNEosUUFBTXRJLFNBQU4sQ0FBZ0JpSyxjQUFoQixHQUFpQyxZQUFZO0FBQzNDLFNBQUt2QixTQUFMLElBQWtCLEtBQUtBLFNBQUwsQ0FBZTVILE1BQWYsRUFBbEI7QUFDQSxTQUFLNEgsU0FBTCxHQUFpQixJQUFqQjtBQUNELEdBSEQ7O0FBS0FKLFFBQU10SSxTQUFOLENBQWdCNkgsUUFBaEIsR0FBMkIsVUFBVXBKLFFBQVYsRUFBb0I7QUFDN0MsUUFBSTZHLE9BQU8sSUFBWDtBQUNBLFFBQUk0RSxVQUFVLEtBQUt0SSxRQUFMLENBQWNiLFFBQWQsQ0FBdUIsTUFBdkIsSUFBaUMsTUFBakMsR0FBMEMsRUFBeEQ7O0FBRUEsUUFBSSxLQUFLNEgsT0FBTCxJQUFnQixLQUFLaEgsT0FBTCxDQUFha0csUUFBakMsRUFBMkM7QUFDekMsVUFBSXNDLFlBQVlqTixFQUFFeUIsT0FBRixDQUFVWixVQUFWLElBQXdCbU0sT0FBeEM7O0FBRUEsV0FBS3hCLFNBQUwsR0FBaUJ4TCxFQUFFTyxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQUYsRUFDZDZFLFFBRGMsQ0FDTCxvQkFBb0IySCxPQURmLEVBRWRYLFFBRmMsQ0FFTCxLQUFLaEIsS0FGQSxDQUFqQjs7QUFJQSxXQUFLM0csUUFBTCxDQUFjaEMsRUFBZCxDQUFpQix3QkFBakIsRUFBMkMxQyxFQUFFb0YsS0FBRixDQUFRLFVBQVVuRCxDQUFWLEVBQWE7QUFDOUQsWUFBSSxLQUFLMkosbUJBQVQsRUFBOEI7QUFDNUIsZUFBS0EsbUJBQUwsR0FBMkIsS0FBM0I7QUFDQTtBQUNEO0FBQ0QsWUFBSTNKLEVBQUVDLE1BQUYsS0FBYUQsRUFBRWlMLGFBQW5CLEVBQWtDO0FBQ2xDLGFBQUt6SSxPQUFMLENBQWFrRyxRQUFiLElBQXlCLFFBQXpCLEdBQ0ksS0FBS2pHLFFBQUwsQ0FBYyxDQUFkLEVBQWlCeUksS0FBakIsRUFESixHQUVJLEtBQUs5QyxJQUFMLEVBRko7QUFHRCxPQVQwQyxFQVN4QyxJQVR3QyxDQUEzQzs7QUFXQSxVQUFJNEMsU0FBSixFQUFlLEtBQUt6QixTQUFMLENBQWUsQ0FBZixFQUFrQjVDLFdBQWxCLENBbEIwQixDQWtCSTs7QUFFN0MsV0FBSzRDLFNBQUwsQ0FBZW5HLFFBQWYsQ0FBd0IsSUFBeEI7O0FBRUEsVUFBSSxDQUFDOUQsUUFBTCxFQUFlOztBQUVmMEwsa0JBQ0UsS0FBS3pCLFNBQUwsQ0FDR2xLLEdBREgsQ0FDTyxpQkFEUCxFQUMwQkMsUUFEMUIsRUFFR0wsb0JBRkgsQ0FFd0JrSyxNQUFNVyw0QkFGOUIsQ0FERixHQUlFeEssVUFKRjtBQU1ELEtBOUJELE1BOEJPLElBQUksQ0FBQyxLQUFLa0ssT0FBTixJQUFpQixLQUFLRCxTQUExQixFQUFxQztBQUMxQyxXQUFLQSxTQUFMLENBQWUvSCxXQUFmLENBQTJCLElBQTNCOztBQUVBLFVBQUkySixpQkFBaUIsU0FBakJBLGNBQWlCLEdBQVk7QUFDL0JoRixhQUFLMkUsY0FBTDtBQUNBeEwsb0JBQVlBLFVBQVo7QUFDRCxPQUhEO0FBSUF2QixRQUFFeUIsT0FBRixDQUFVWixVQUFWLElBQXdCLEtBQUs2RCxRQUFMLENBQWNiLFFBQWQsQ0FBdUIsTUFBdkIsQ0FBeEIsR0FDRSxLQUFLMkgsU0FBTCxDQUNHbEssR0FESCxDQUNPLGlCQURQLEVBQzBCOEwsY0FEMUIsRUFFR2xNLG9CQUZILENBRXdCa0ssTUFBTVcsNEJBRjlCLENBREYsR0FJRXFCLGdCQUpGO0FBTUQsS0FiTSxNQWFBLElBQUk3TCxRQUFKLEVBQWM7QUFDbkJBO0FBQ0Q7QUFDRixHQWxERDs7QUFvREE7O0FBRUE2SixRQUFNdEksU0FBTixDQUFnQjhKLFlBQWhCLEdBQStCLFlBQVk7QUFDekMsU0FBS0wsWUFBTDtBQUNELEdBRkQ7O0FBSUFuQixRQUFNdEksU0FBTixDQUFnQnlKLFlBQWhCLEdBQStCLFlBQVk7QUFDekMsUUFBSWMscUJBQXFCLEtBQUszSSxRQUFMLENBQWMsQ0FBZCxFQUFpQjRJLFlBQWpCLEdBQWdDL00sU0FBU3FHLGVBQVQsQ0FBeUIyRyxZQUFsRjs7QUFFQSxTQUFLN0ksUUFBTCxDQUFjOEksR0FBZCxDQUFrQjtBQUNoQkMsbUJBQWMsQ0FBQyxLQUFLQyxpQkFBTixJQUEyQkwsa0JBQTNCLEdBQWdELEtBQUsxQixjQUFyRCxHQUFzRSxFQURwRTtBQUVoQmdDLG9CQUFjLEtBQUtELGlCQUFMLElBQTBCLENBQUNMLGtCQUEzQixHQUFnRCxLQUFLMUIsY0FBckQsR0FBc0U7QUFGcEUsS0FBbEI7QUFJRCxHQVBEOztBQVNBUCxRQUFNdEksU0FBTixDQUFnQitKLGdCQUFoQixHQUFtQyxZQUFZO0FBQzdDLFNBQUtuSSxRQUFMLENBQWM4SSxHQUFkLENBQWtCO0FBQ2hCQyxtQkFBYSxFQURHO0FBRWhCRSxvQkFBYztBQUZFLEtBQWxCO0FBSUQsR0FMRDs7QUFPQXZDLFFBQU10SSxTQUFOLENBQWdCbUosY0FBaEIsR0FBaUMsWUFBWTtBQUMzQyxRQUFJMkIsa0JBQWtCeEUsT0FBT3lFLFVBQTdCO0FBQ0EsUUFBSSxDQUFDRCxlQUFMLEVBQXNCO0FBQUU7QUFDdEIsVUFBSUUsc0JBQXNCdk4sU0FBU3FHLGVBQVQsQ0FBeUJtSCxxQkFBekIsRUFBMUI7QUFDQUgsd0JBQWtCRSxvQkFBb0JFLEtBQXBCLEdBQTRCQyxLQUFLQyxHQUFMLENBQVNKLG9CQUFvQkssSUFBN0IsQ0FBOUM7QUFDRDtBQUNELFNBQUtULGlCQUFMLEdBQXlCbk4sU0FBUytLLElBQVQsQ0FBYzhDLFdBQWQsR0FBNEJSLGVBQXJEO0FBQ0EsU0FBS2pDLGNBQUwsR0FBc0IsS0FBSzBDLGdCQUFMLEVBQXRCO0FBQ0QsR0FSRDs7QUFVQWpELFFBQU10SSxTQUFOLENBQWdCb0osWUFBaEIsR0FBK0IsWUFBWTtBQUN6QyxRQUFJb0MsVUFBVUMsU0FBVSxLQUFLbEQsS0FBTCxDQUFXbUMsR0FBWCxDQUFlLGVBQWYsS0FBbUMsQ0FBN0MsRUFBaUQsRUFBakQsQ0FBZDtBQUNBLFNBQUs5QixlQUFMLEdBQXVCbkwsU0FBUytLLElBQVQsQ0FBY3ZLLEtBQWQsQ0FBb0I0TSxZQUFwQixJQUFvQyxFQUEzRDtBQUNBLFFBQUksS0FBS0QsaUJBQVQsRUFBNEIsS0FBS3JDLEtBQUwsQ0FBV21DLEdBQVgsQ0FBZSxlQUFmLEVBQWdDYyxVQUFVLEtBQUszQyxjQUEvQztBQUM3QixHQUpEOztBQU1BUCxRQUFNdEksU0FBTixDQUFnQmdLLGNBQWhCLEdBQWlDLFlBQVk7QUFDM0MsU0FBS3pCLEtBQUwsQ0FBV21DLEdBQVgsQ0FBZSxlQUFmLEVBQWdDLEtBQUs5QixlQUFyQztBQUNELEdBRkQ7O0FBSUFOLFFBQU10SSxTQUFOLENBQWdCdUwsZ0JBQWhCLEdBQW1DLFlBQVk7QUFBRTtBQUMvQyxRQUFJRyxZQUFZak8sU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUFoQjtBQUNBZ08sY0FBVUMsU0FBVixHQUFzQix5QkFBdEI7QUFDQSxTQUFLcEQsS0FBTCxDQUFXcUQsTUFBWCxDQUFrQkYsU0FBbEI7QUFDQSxRQUFJN0MsaUJBQWlCNkMsVUFBVTVGLFdBQVYsR0FBd0I0RixVQUFVSixXQUF2RDtBQUNBLFNBQUsvQyxLQUFMLENBQVcsQ0FBWCxFQUFjc0QsV0FBZCxDQUEwQkgsU0FBMUI7QUFDQSxXQUFPN0MsY0FBUDtBQUNELEdBUEQ7O0FBVUE7QUFDQTs7QUFFQSxXQUFTN0gsTUFBVCxDQUFnQkMsTUFBaEIsRUFBd0JpSSxjQUF4QixFQUF3QztBQUN0QyxXQUFPLEtBQUtoSSxJQUFMLENBQVUsWUFBWTtBQUMzQixVQUFJakIsUUFBVS9DLEVBQUUsSUFBRixDQUFkO0FBQ0EsVUFBSWlFLE9BQVVsQixNQUFNa0IsSUFBTixDQUFXLFVBQVgsQ0FBZDtBQUNBLFVBQUlRLFVBQVV6RSxFQUFFMkUsTUFBRixDQUFTLEVBQVQsRUFBYXlHLE1BQU14RyxRQUFuQixFQUE2QjdCLE1BQU1rQixJQUFOLEVBQTdCLEVBQTJDLFFBQU9GLE1BQVAseUNBQU9BLE1BQVAsTUFBaUIsUUFBakIsSUFBNkJBLE1BQXhFLENBQWQ7O0FBRUEsVUFBSSxDQUFDRSxJQUFMLEVBQVdsQixNQUFNa0IsSUFBTixDQUFXLFVBQVgsRUFBd0JBLE9BQU8sSUFBSW1ILEtBQUosQ0FBVSxJQUFWLEVBQWdCM0csT0FBaEIsQ0FBL0I7QUFDWCxVQUFJLE9BQU9WLE1BQVAsSUFBaUIsUUFBckIsRUFBK0JFLEtBQUtGLE1BQUwsRUFBYWlJLGNBQWIsRUFBL0IsS0FDSyxJQUFJdkgsUUFBUXFGLElBQVosRUFBa0I3RixLQUFLNkYsSUFBTCxDQUFVa0MsY0FBVjtBQUN4QixLQVJNLENBQVA7QUFTRDs7QUFFRCxNQUFJN0gsTUFBTW5FLEVBQUVFLEVBQUYsQ0FBSzBPLEtBQWY7O0FBRUE1TyxJQUFFRSxFQUFGLENBQUswTyxLQUFMLEdBQXlCOUssTUFBekI7QUFDQTlELElBQUVFLEVBQUYsQ0FBSzBPLEtBQUwsQ0FBV3ZLLFdBQVgsR0FBeUIrRyxLQUF6Qjs7QUFHQTtBQUNBOztBQUVBcEwsSUFBRUUsRUFBRixDQUFLME8sS0FBTCxDQUFXdEssVUFBWCxHQUF3QixZQUFZO0FBQ2xDdEUsTUFBRUUsRUFBRixDQUFLME8sS0FBTCxHQUFhekssR0FBYjtBQUNBLFdBQU8sSUFBUDtBQUNELEdBSEQ7O0FBTUE7QUFDQTs7QUFFQW5FLElBQUVPLFFBQUYsRUFBWW1DLEVBQVosQ0FBZSx5QkFBZixFQUEwQyx1QkFBMUMsRUFBbUUsVUFBVVQsQ0FBVixFQUFhO0FBQzlFLFFBQUljLFFBQVUvQyxFQUFFLElBQUYsQ0FBZDtBQUNBLFFBQUlpSixPQUFVbEcsTUFBTUUsSUFBTixDQUFXLE1BQVgsQ0FBZDtBQUNBLFFBQUlpRyxVQUFVbEosRUFBRStDLE1BQU1FLElBQU4sQ0FBVyxhQUFYLEtBQThCZ0csUUFBUUEsS0FBSy9GLE9BQUwsQ0FBYSxnQkFBYixFQUErQixFQUEvQixDQUF4QyxDQUFkLENBSDhFLENBR2E7QUFDM0YsUUFBSWEsU0FBVW1GLFFBQVFqRixJQUFSLENBQWEsVUFBYixJQUEyQixRQUEzQixHQUFzQ2pFLEVBQUUyRSxNQUFGLENBQVMsRUFBRWtILFFBQVEsQ0FBQyxJQUFJN0YsSUFBSixDQUFTaUQsSUFBVCxDQUFELElBQW1CQSxJQUE3QixFQUFULEVBQThDQyxRQUFRakYsSUFBUixFQUE5QyxFQUE4RGxCLE1BQU1rQixJQUFOLEVBQTlELENBQXBEOztBQUVBLFFBQUlsQixNQUFNWixFQUFOLENBQVMsR0FBVCxDQUFKLEVBQW1CRixFQUFFbUIsY0FBRjs7QUFFbkI4RixZQUFRNUgsR0FBUixDQUFZLGVBQVosRUFBNkIsVUFBVXVOLFNBQVYsRUFBcUI7QUFDaEQsVUFBSUEsVUFBVXJMLGtCQUFWLEVBQUosRUFBb0MsT0FEWSxDQUNMO0FBQzNDMEYsY0FBUTVILEdBQVIsQ0FBWSxpQkFBWixFQUErQixZQUFZO0FBQ3pDeUIsY0FBTVosRUFBTixDQUFTLFVBQVQsS0FBd0JZLE1BQU12QixPQUFOLENBQWMsT0FBZCxDQUF4QjtBQUNELE9BRkQ7QUFHRCxLQUxEO0FBTUFzQyxXQUFPSSxJQUFQLENBQVlnRixPQUFaLEVBQXFCbkYsTUFBckIsRUFBNkIsSUFBN0I7QUFDRCxHQWZEO0FBaUJELENBelVBLENBeVVDakUsTUF6VUQsQ0FBRDs7QUEyVUE7Ozs7Ozs7OztBQVVBLENBQUMsVUFBVUUsQ0FBVixFQUFhO0FBQ1o7O0FBRUE7QUFDQTs7QUFFQSxNQUFJOE8sVUFBVSxTQUFWQSxPQUFVLENBQVV0SyxPQUFWLEVBQW1CQyxPQUFuQixFQUE0QjtBQUN4QyxTQUFLd0IsSUFBTCxHQUFrQixJQUFsQjtBQUNBLFNBQUt4QixPQUFMLEdBQWtCLElBQWxCO0FBQ0EsU0FBS3NLLE9BQUwsR0FBa0IsSUFBbEI7QUFDQSxTQUFLQyxPQUFMLEdBQWtCLElBQWxCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNBLFNBQUt2SyxRQUFMLEdBQWtCLElBQWxCO0FBQ0EsU0FBS3dLLE9BQUwsR0FBa0IsSUFBbEI7O0FBRUEsU0FBS0MsSUFBTCxDQUFVLFNBQVYsRUFBcUIzSyxPQUFyQixFQUE4QkMsT0FBOUI7QUFDRCxHQVZEOztBQVlBcUssVUFBUWxNLE9BQVIsR0FBbUIsT0FBbkI7O0FBRUFrTSxVQUFRak0sbUJBQVIsR0FBOEIsR0FBOUI7O0FBRUFpTSxVQUFRbEssUUFBUixHQUFtQjtBQUNqQndLLGVBQVcsSUFETTtBQUVqQkMsZUFBVyxLQUZNO0FBR2pCck0sY0FBVSxLQUhPO0FBSWpCc00sY0FBVSw4R0FKTztBQUtqQjlOLGFBQVMsYUFMUTtBQU1qQitOLFdBQU8sRUFOVTtBQU9qQkMsV0FBTyxDQVBVO0FBUWpCQyxVQUFNLEtBUlc7QUFTakJDLGVBQVcsS0FUTTtBQVVqQkMsY0FBVTtBQUNSM00sZ0JBQVUsTUFERjtBQUVSNE0sZUFBUztBQUZEO0FBVk8sR0FBbkI7O0FBZ0JBZCxVQUFRaE0sU0FBUixDQUFrQnFNLElBQWxCLEdBQXlCLFVBQVVsSixJQUFWLEVBQWdCekIsT0FBaEIsRUFBeUJDLE9BQXpCLEVBQWtDO0FBQ3pELFNBQUtzSyxPQUFMLEdBQWlCLElBQWpCO0FBQ0EsU0FBSzlJLElBQUwsR0FBaUJBLElBQWpCO0FBQ0EsU0FBS3ZCLFFBQUwsR0FBaUIxRSxFQUFFd0UsT0FBRixDQUFqQjtBQUNBLFNBQUtDLE9BQUwsR0FBaUIsS0FBS29MLFVBQUwsQ0FBZ0JwTCxPQUFoQixDQUFqQjtBQUNBLFNBQUtxTCxTQUFMLEdBQWlCLEtBQUtyTCxPQUFMLENBQWFrTCxRQUFiLElBQXlCM1AsRUFBRUEsRUFBRStQLFVBQUYsQ0FBYSxLQUFLdEwsT0FBTCxDQUFha0wsUUFBMUIsSUFBc0MsS0FBS2xMLE9BQUwsQ0FBYWtMLFFBQWIsQ0FBc0J6TCxJQUF0QixDQUEyQixJQUEzQixFQUFpQyxLQUFLUSxRQUF0QyxDQUF0QyxHQUF5RixLQUFLRCxPQUFMLENBQWFrTCxRQUFiLENBQXNCM00sUUFBdEIsSUFBa0MsS0FBS3lCLE9BQUwsQ0FBYWtMLFFBQTFJLENBQTFDO0FBQ0EsU0FBS1QsT0FBTCxHQUFpQixFQUFFYyxPQUFPLEtBQVQsRUFBZ0JDLE9BQU8sS0FBdkIsRUFBOEI5QyxPQUFPLEtBQXJDLEVBQWpCOztBQUVBLFFBQUksS0FBS3pJLFFBQUwsQ0FBYyxDQUFkLGFBQTRCbkUsU0FBUzJQLFdBQXJDLElBQW9ELENBQUMsS0FBS3pMLE9BQUwsQ0FBYXpCLFFBQXRFLEVBQWdGO0FBQzlFLFlBQU0sSUFBSWpELEtBQUosQ0FBVSwyREFBMkQsS0FBS2tHLElBQWhFLEdBQXVFLGlDQUFqRixDQUFOO0FBQ0Q7O0FBRUQsUUFBSWtLLFdBQVcsS0FBSzFMLE9BQUwsQ0FBYWpELE9BQWIsQ0FBcUJwQixLQUFyQixDQUEyQixHQUEzQixDQUFmOztBQUVBLFNBQUssSUFBSW1LLElBQUk0RixTQUFTOU0sTUFBdEIsRUFBOEJrSCxHQUE5QixHQUFvQztBQUNsQyxVQUFJL0ksVUFBVTJPLFNBQVM1RixDQUFULENBQWQ7O0FBRUEsVUFBSS9JLFdBQVcsT0FBZixFQUF3QjtBQUN0QixhQUFLa0QsUUFBTCxDQUFjaEMsRUFBZCxDQUFpQixXQUFXLEtBQUt1RCxJQUFqQyxFQUF1QyxLQUFLeEIsT0FBTCxDQUFhekIsUUFBcEQsRUFBOERoRCxFQUFFb0YsS0FBRixDQUFRLEtBQUtJLE1BQWIsRUFBcUIsSUFBckIsQ0FBOUQ7QUFDRCxPQUZELE1BRU8sSUFBSWhFLFdBQVcsUUFBZixFQUF5QjtBQUM5QixZQUFJNE8sVUFBVzVPLFdBQVcsT0FBWCxHQUFxQixZQUFyQixHQUFvQyxTQUFuRDtBQUNBLFlBQUk2TyxXQUFXN08sV0FBVyxPQUFYLEdBQXFCLFlBQXJCLEdBQW9DLFVBQW5EOztBQUVBLGFBQUtrRCxRQUFMLENBQWNoQyxFQUFkLENBQWlCME4sVUFBVyxHQUFYLEdBQWlCLEtBQUtuSyxJQUF2QyxFQUE2QyxLQUFLeEIsT0FBTCxDQUFhekIsUUFBMUQsRUFBb0VoRCxFQUFFb0YsS0FBRixDQUFRLEtBQUtrTCxLQUFiLEVBQW9CLElBQXBCLENBQXBFO0FBQ0EsYUFBSzVMLFFBQUwsQ0FBY2hDLEVBQWQsQ0FBaUIyTixXQUFXLEdBQVgsR0FBaUIsS0FBS3BLLElBQXZDLEVBQTZDLEtBQUt4QixPQUFMLENBQWF6QixRQUExRCxFQUFvRWhELEVBQUVvRixLQUFGLENBQVEsS0FBS21MLEtBQWIsRUFBb0IsSUFBcEIsQ0FBcEU7QUFDRDtBQUNGOztBQUVELFNBQUs5TCxPQUFMLENBQWF6QixRQUFiLEdBQ0csS0FBS3dOLFFBQUwsR0FBZ0J4USxFQUFFMkUsTUFBRixDQUFTLEVBQVQsRUFBYSxLQUFLRixPQUFsQixFQUEyQixFQUFFakQsU0FBUyxRQUFYLEVBQXFCd0IsVUFBVSxFQUEvQixFQUEzQixDQURuQixHQUVFLEtBQUt5TixRQUFMLEVBRkY7QUFHRCxHQS9CRDs7QUFpQ0EzQixVQUFRaE0sU0FBUixDQUFrQjROLFdBQWxCLEdBQWdDLFlBQVk7QUFDMUMsV0FBTzVCLFFBQVFsSyxRQUFmO0FBQ0QsR0FGRDs7QUFJQWtLLFVBQVFoTSxTQUFSLENBQWtCK00sVUFBbEIsR0FBK0IsVUFBVXBMLE9BQVYsRUFBbUI7QUFDaERBLGNBQVV6RSxFQUFFMkUsTUFBRixDQUFTLEVBQVQsRUFBYSxLQUFLK0wsV0FBTCxFQUFiLEVBQWlDLEtBQUtoTSxRQUFMLENBQWNULElBQWQsRUFBakMsRUFBdURRLE9BQXZELENBQVY7O0FBRUEsUUFBSUEsUUFBUStLLEtBQVIsSUFBaUIsT0FBTy9LLFFBQVErSyxLQUFmLElBQXdCLFFBQTdDLEVBQXVEO0FBQ3JEL0ssY0FBUStLLEtBQVIsR0FBZ0I7QUFDZDFGLGNBQU1yRixRQUFRK0ssS0FEQTtBQUVkbkYsY0FBTTVGLFFBQVErSztBQUZBLE9BQWhCO0FBSUQ7O0FBRUQsV0FBTy9LLE9BQVA7QUFDRCxHQVhEOztBQWFBcUssVUFBUWhNLFNBQVIsQ0FBa0I2TixrQkFBbEIsR0FBdUMsWUFBWTtBQUNqRCxRQUFJbE0sVUFBVyxFQUFmO0FBQ0EsUUFBSW1NLFdBQVcsS0FBS0YsV0FBTCxFQUFmOztBQUVBLFNBQUtGLFFBQUwsSUFBaUJ4USxFQUFFZ0UsSUFBRixDQUFPLEtBQUt3TSxRQUFaLEVBQXNCLFVBQVVLLEdBQVYsRUFBZUMsS0FBZixFQUFzQjtBQUMzRCxVQUFJRixTQUFTQyxHQUFULEtBQWlCQyxLQUFyQixFQUE0QnJNLFFBQVFvTSxHQUFSLElBQWVDLEtBQWY7QUFDN0IsS0FGZ0IsQ0FBakI7O0FBSUEsV0FBT3JNLE9BQVA7QUFDRCxHQVREOztBQVdBcUssVUFBUWhNLFNBQVIsQ0FBa0J3TixLQUFsQixHQUEwQixVQUFVUyxHQUFWLEVBQWU7QUFDdkMsUUFBSUMsT0FBT0QsZUFBZSxLQUFLYixXQUFwQixHQUNUYSxHQURTLEdBQ0gvUSxFQUFFK1EsSUFBSTdELGFBQU4sRUFBcUJqSixJQUFyQixDQUEwQixRQUFRLEtBQUtnQyxJQUF2QyxDQURSOztBQUdBLFFBQUksQ0FBQytLLElBQUwsRUFBVztBQUNUQSxhQUFPLElBQUksS0FBS2QsV0FBVCxDQUFxQmEsSUFBSTdELGFBQXpCLEVBQXdDLEtBQUt5RCxrQkFBTCxFQUF4QyxDQUFQO0FBQ0EzUSxRQUFFK1EsSUFBSTdELGFBQU4sRUFBcUJqSixJQUFyQixDQUEwQixRQUFRLEtBQUtnQyxJQUF2QyxFQUE2QytLLElBQTdDO0FBQ0Q7O0FBRUQsUUFBSUQsZUFBZS9RLEVBQUV1RCxLQUFyQixFQUE0QjtBQUMxQnlOLFdBQUs5QixPQUFMLENBQWE2QixJQUFJOUssSUFBSixJQUFZLFNBQVosR0FBd0IsT0FBeEIsR0FBa0MsT0FBL0MsSUFBMEQsSUFBMUQ7QUFDRDs7QUFFRCxRQUFJK0ssS0FBS0MsR0FBTCxHQUFXcE4sUUFBWCxDQUFvQixJQUFwQixLQUE2Qm1OLEtBQUsvQixVQUFMLElBQW1CLElBQXBELEVBQTBEO0FBQ3hEK0IsV0FBSy9CLFVBQUwsR0FBa0IsSUFBbEI7QUFDQTtBQUNEOztBQUVEaUMsaUJBQWFGLEtBQUtoQyxPQUFsQjs7QUFFQWdDLFNBQUsvQixVQUFMLEdBQWtCLElBQWxCOztBQUVBLFFBQUksQ0FBQytCLEtBQUt2TSxPQUFMLENBQWErSyxLQUFkLElBQXVCLENBQUN3QixLQUFLdk0sT0FBTCxDQUFhK0ssS0FBYixDQUFtQjFGLElBQS9DLEVBQXFELE9BQU9rSCxLQUFLbEgsSUFBTCxFQUFQOztBQUVyRGtILFNBQUtoQyxPQUFMLEdBQWV0TixXQUFXLFlBQVk7QUFDcEMsVUFBSXNQLEtBQUsvQixVQUFMLElBQW1CLElBQXZCLEVBQTZCK0IsS0FBS2xILElBQUw7QUFDOUIsS0FGYyxFQUVaa0gsS0FBS3ZNLE9BQUwsQ0FBYStLLEtBQWIsQ0FBbUIxRixJQUZQLENBQWY7QUFHRCxHQTNCRDs7QUE2QkFnRixVQUFRaE0sU0FBUixDQUFrQnFPLGFBQWxCLEdBQWtDLFlBQVk7QUFDNUMsU0FBSyxJQUFJTixHQUFULElBQWdCLEtBQUszQixPQUFyQixFQUE4QjtBQUM1QixVQUFJLEtBQUtBLE9BQUwsQ0FBYTJCLEdBQWIsQ0FBSixFQUF1QixPQUFPLElBQVA7QUFDeEI7O0FBRUQsV0FBTyxLQUFQO0FBQ0QsR0FORDs7QUFRQS9CLFVBQVFoTSxTQUFSLENBQWtCeU4sS0FBbEIsR0FBMEIsVUFBVVEsR0FBVixFQUFlO0FBQ3ZDLFFBQUlDLE9BQU9ELGVBQWUsS0FBS2IsV0FBcEIsR0FDVGEsR0FEUyxHQUNIL1EsRUFBRStRLElBQUk3RCxhQUFOLEVBQXFCakosSUFBckIsQ0FBMEIsUUFBUSxLQUFLZ0MsSUFBdkMsQ0FEUjs7QUFHQSxRQUFJLENBQUMrSyxJQUFMLEVBQVc7QUFDVEEsYUFBTyxJQUFJLEtBQUtkLFdBQVQsQ0FBcUJhLElBQUk3RCxhQUF6QixFQUF3QyxLQUFLeUQsa0JBQUwsRUFBeEMsQ0FBUDtBQUNBM1EsUUFBRStRLElBQUk3RCxhQUFOLEVBQXFCakosSUFBckIsQ0FBMEIsUUFBUSxLQUFLZ0MsSUFBdkMsRUFBNkMrSyxJQUE3QztBQUNEOztBQUVELFFBQUlELGVBQWUvUSxFQUFFdUQsS0FBckIsRUFBNEI7QUFDMUJ5TixXQUFLOUIsT0FBTCxDQUFhNkIsSUFBSTlLLElBQUosSUFBWSxVQUFaLEdBQXlCLE9BQXpCLEdBQW1DLE9BQWhELElBQTJELEtBQTNEO0FBQ0Q7O0FBRUQsUUFBSStLLEtBQUtHLGFBQUwsRUFBSixFQUEwQjs7QUFFMUJELGlCQUFhRixLQUFLaEMsT0FBbEI7O0FBRUFnQyxTQUFLL0IsVUFBTCxHQUFrQixLQUFsQjs7QUFFQSxRQUFJLENBQUMrQixLQUFLdk0sT0FBTCxDQUFhK0ssS0FBZCxJQUF1QixDQUFDd0IsS0FBS3ZNLE9BQUwsQ0FBYStLLEtBQWIsQ0FBbUJuRixJQUEvQyxFQUFxRCxPQUFPMkcsS0FBSzNHLElBQUwsRUFBUDs7QUFFckQyRyxTQUFLaEMsT0FBTCxHQUFldE4sV0FBVyxZQUFZO0FBQ3BDLFVBQUlzUCxLQUFLL0IsVUFBTCxJQUFtQixLQUF2QixFQUE4QitCLEtBQUszRyxJQUFMO0FBQy9CLEtBRmMsRUFFWjJHLEtBQUt2TSxPQUFMLENBQWErSyxLQUFiLENBQW1CbkYsSUFGUCxDQUFmO0FBR0QsR0F4QkQ7O0FBMEJBeUUsVUFBUWhNLFNBQVIsQ0FBa0JnSCxJQUFsQixHQUF5QixZQUFZO0FBQ25DLFFBQUk3SCxJQUFJakMsRUFBRXVELEtBQUYsQ0FBUSxhQUFhLEtBQUswQyxJQUExQixDQUFSOztBQUVBLFFBQUksS0FBS21MLFVBQUwsTUFBcUIsS0FBS3JDLE9BQTlCLEVBQXVDO0FBQ3JDLFdBQUtySyxRQUFMLENBQWNsRCxPQUFkLENBQXNCUyxDQUF0Qjs7QUFFQSxVQUFJb1AsUUFBUXJSLEVBQUU4SyxRQUFGLENBQVcsS0FBS3BHLFFBQUwsQ0FBYyxDQUFkLEVBQWlCNE0sYUFBakIsQ0FBK0IxSyxlQUExQyxFQUEyRCxLQUFLbEMsUUFBTCxDQUFjLENBQWQsQ0FBM0QsQ0FBWjtBQUNBLFVBQUl6QyxFQUFFdUIsa0JBQUYsTUFBMEIsQ0FBQzZOLEtBQS9CLEVBQXNDO0FBQ3RDLFVBQUlqSixPQUFPLElBQVg7O0FBRUEsVUFBSW1KLE9BQU8sS0FBS04sR0FBTCxFQUFYOztBQUVBLFVBQUlPLFFBQVEsS0FBS0MsTUFBTCxDQUFZLEtBQUt4TCxJQUFqQixDQUFaOztBQUVBLFdBQUt5TCxVQUFMO0FBQ0FILFdBQUt0TyxJQUFMLENBQVUsSUFBVixFQUFnQnVPLEtBQWhCO0FBQ0EsV0FBSzlNLFFBQUwsQ0FBY3pCLElBQWQsQ0FBbUIsa0JBQW5CLEVBQXVDdU8sS0FBdkM7O0FBRUEsVUFBSSxLQUFLL00sT0FBTCxDQUFhMkssU0FBakIsRUFBNEJtQyxLQUFLbE0sUUFBTCxDQUFjLE1BQWQ7O0FBRTVCLFVBQUlnSyxZQUFZLE9BQU8sS0FBSzVLLE9BQUwsQ0FBYTRLLFNBQXBCLElBQWlDLFVBQWpDLEdBQ2QsS0FBSzVLLE9BQUwsQ0FBYTRLLFNBQWIsQ0FBdUJuTCxJQUF2QixDQUE0QixJQUE1QixFQUFrQ3FOLEtBQUssQ0FBTCxDQUFsQyxFQUEyQyxLQUFLN00sUUFBTCxDQUFjLENBQWQsQ0FBM0MsQ0FEYyxHQUVkLEtBQUtELE9BQUwsQ0FBYTRLLFNBRmY7O0FBSUEsVUFBSXNDLFlBQVksY0FBaEI7QUFDQSxVQUFJQyxZQUFZRCxVQUFVM0wsSUFBVixDQUFlcUosU0FBZixDQUFoQjtBQUNBLFVBQUl1QyxTQUFKLEVBQWV2QyxZQUFZQSxVQUFVbk0sT0FBVixDQUFrQnlPLFNBQWxCLEVBQTZCLEVBQTdCLEtBQW9DLEtBQWhEOztBQUVmSixXQUNHNU4sTUFESCxHQUVHNkosR0FGSCxDQUVPLEVBQUVxRSxLQUFLLENBQVAsRUFBVTFELE1BQU0sQ0FBaEIsRUFBbUIyRCxTQUFTLE9BQTVCLEVBRlAsRUFHR3pNLFFBSEgsQ0FHWWdLLFNBSFosRUFJR3BMLElBSkgsQ0FJUSxRQUFRLEtBQUtnQyxJQUpyQixFQUkyQixJQUozQjs7QUFNQSxXQUFLeEIsT0FBTCxDQUFhaUwsU0FBYixHQUF5QjZCLEtBQUtsRixRQUFMLENBQWMsS0FBSzVILE9BQUwsQ0FBYWlMLFNBQTNCLENBQXpCLEdBQWlFNkIsS0FBS3ZHLFdBQUwsQ0FBaUIsS0FBS3RHLFFBQXRCLENBQWpFO0FBQ0EsV0FBS0EsUUFBTCxDQUFjbEQsT0FBZCxDQUFzQixpQkFBaUIsS0FBS3lFLElBQTVDOztBQUVBLFVBQUlrQyxNQUFlLEtBQUs0SixXQUFMLEVBQW5CO0FBQ0EsVUFBSUMsY0FBZVQsS0FBSyxDQUFMLEVBQVEzSSxXQUEzQjtBQUNBLFVBQUlxSixlQUFlVixLQUFLLENBQUwsRUFBUWpILFlBQTNCOztBQUVBLFVBQUlzSCxTQUFKLEVBQWU7QUFDYixZQUFJTSxlQUFlN0MsU0FBbkI7QUFDQSxZQUFJOEMsY0FBYyxLQUFLSixXQUFMLENBQWlCLEtBQUtqQyxTQUF0QixDQUFsQjs7QUFFQVQsb0JBQVlBLGFBQWEsUUFBYixJQUF5QmxILElBQUlpSyxNQUFKLEdBQWFILFlBQWIsR0FBNEJFLFlBQVlDLE1BQWpFLEdBQTBFLEtBQTFFLEdBQ0EvQyxhQUFhLEtBQWIsSUFBeUJsSCxJQUFJMEosR0FBSixHQUFhSSxZQUFiLEdBQTRCRSxZQUFZTixHQUFqRSxHQUEwRSxRQUExRSxHQUNBeEMsYUFBYSxPQUFiLElBQXlCbEgsSUFBSTZGLEtBQUosR0FBYWdFLFdBQWIsR0FBNEJHLFlBQVlFLEtBQWpFLEdBQTBFLE1BQTFFLEdBQ0FoRCxhQUFhLE1BQWIsSUFBeUJsSCxJQUFJZ0csSUFBSixHQUFhNkQsV0FBYixHQUE0QkcsWUFBWWhFLElBQWpFLEdBQTBFLE9BQTFFLEdBQ0FrQixTQUpaOztBQU1Ba0MsYUFDRzlOLFdBREgsQ0FDZXlPLFlBRGYsRUFFRzdNLFFBRkgsQ0FFWWdLLFNBRlo7QUFHRDs7QUFFRCxVQUFJaUQsbUJBQW1CLEtBQUtDLG1CQUFMLENBQXlCbEQsU0FBekIsRUFBb0NsSCxHQUFwQyxFQUF5QzZKLFdBQXpDLEVBQXNEQyxZQUF0RCxDQUF2Qjs7QUFFQSxXQUFLTyxjQUFMLENBQW9CRixnQkFBcEIsRUFBc0NqRCxTQUF0Qzs7QUFFQSxVQUFJbkYsV0FBVyxTQUFYQSxRQUFXLEdBQVk7QUFDekIsWUFBSXVJLGlCQUFpQnJLLEtBQUs2RyxVQUExQjtBQUNBN0csYUFBSzFELFFBQUwsQ0FBY2xELE9BQWQsQ0FBc0IsY0FBYzRHLEtBQUtuQyxJQUF6QztBQUNBbUMsYUFBSzZHLFVBQUwsR0FBa0IsSUFBbEI7O0FBRUEsWUFBSXdELGtCQUFrQixLQUF0QixFQUE2QnJLLEtBQUttSSxLQUFMLENBQVduSSxJQUFYO0FBQzlCLE9BTkQ7O0FBUUFwSSxRQUFFeUIsT0FBRixDQUFVWixVQUFWLElBQXdCLEtBQUswUSxJQUFMLENBQVUxTixRQUFWLENBQW1CLE1BQW5CLENBQXhCLEdBQ0UwTixLQUNHalEsR0FESCxDQUNPLGlCQURQLEVBQzBCNEksUUFEMUIsRUFFR2hKLG9CQUZILENBRXdCNE4sUUFBUWpNLG1CQUZoQyxDQURGLEdBSUVxSCxVQUpGO0FBS0Q7QUFDRixHQTFFRDs7QUE0RUE0RSxVQUFRaE0sU0FBUixDQUFrQjBQLGNBQWxCLEdBQW1DLFVBQVVFLE1BQVYsRUFBa0JyRCxTQUFsQixFQUE2QjtBQUM5RCxRQUFJa0MsT0FBUyxLQUFLTixHQUFMLEVBQWI7QUFDQSxRQUFJb0IsUUFBU2QsS0FBSyxDQUFMLEVBQVEzSSxXQUFyQjtBQUNBLFFBQUkrSixTQUFTcEIsS0FBSyxDQUFMLEVBQVFqSCxZQUFyQjs7QUFFQTtBQUNBLFFBQUlzSSxZQUFZckUsU0FBU2dELEtBQUsvRCxHQUFMLENBQVMsWUFBVCxDQUFULEVBQWlDLEVBQWpDLENBQWhCO0FBQ0EsUUFBSXFGLGFBQWF0RSxTQUFTZ0QsS0FBSy9ELEdBQUwsQ0FBUyxhQUFULENBQVQsRUFBa0MsRUFBbEMsQ0FBakI7O0FBRUE7QUFDQSxRQUFJc0YsTUFBTUYsU0FBTixDQUFKLEVBQXVCQSxZQUFhLENBQWI7QUFDdkIsUUFBSUUsTUFBTUQsVUFBTixDQUFKLEVBQXVCQSxhQUFhLENBQWI7O0FBRXZCSCxXQUFPYixHQUFQLElBQWVlLFNBQWY7QUFDQUYsV0FBT3ZFLElBQVAsSUFBZTBFLFVBQWY7O0FBRUE7QUFDQTtBQUNBN1MsTUFBRTBTLE1BQUYsQ0FBU0ssU0FBVCxDQUFtQnhCLEtBQUssQ0FBTCxDQUFuQixFQUE0QnZSLEVBQUUyRSxNQUFGLENBQVM7QUFDbkNxTyxhQUFPLGVBQVVDLEtBQVYsRUFBaUI7QUFDdEIxQixhQUFLL0QsR0FBTCxDQUFTO0FBQ1BxRSxlQUFLNUQsS0FBS2lGLEtBQUwsQ0FBV0QsTUFBTXBCLEdBQWpCLENBREU7QUFFUDFELGdCQUFNRixLQUFLaUYsS0FBTCxDQUFXRCxNQUFNOUUsSUFBakI7QUFGQyxTQUFUO0FBSUQ7QUFOa0MsS0FBVCxFQU96QnVFLE1BUHlCLENBQTVCLEVBT1ksQ0FQWjs7QUFTQW5CLFNBQUtsTSxRQUFMLENBQWMsSUFBZDs7QUFFQTtBQUNBLFFBQUkyTSxjQUFlVCxLQUFLLENBQUwsRUFBUTNJLFdBQTNCO0FBQ0EsUUFBSXFKLGVBQWVWLEtBQUssQ0FBTCxFQUFRakgsWUFBM0I7O0FBRUEsUUFBSStFLGFBQWEsS0FBYixJQUFzQjRDLGdCQUFnQlUsTUFBMUMsRUFBa0Q7QUFDaERELGFBQU9iLEdBQVAsR0FBYWEsT0FBT2IsR0FBUCxHQUFhYyxNQUFiLEdBQXNCVixZQUFuQztBQUNEOztBQUVELFFBQUlsSyxRQUFRLEtBQUtvTCx3QkFBTCxDQUE4QjlELFNBQTlCLEVBQXlDcUQsTUFBekMsRUFBaURWLFdBQWpELEVBQThEQyxZQUE5RCxDQUFaOztBQUVBLFFBQUlsSyxNQUFNb0csSUFBVixFQUFnQnVFLE9BQU92RSxJQUFQLElBQWVwRyxNQUFNb0csSUFBckIsQ0FBaEIsS0FDS3VFLE9BQU9iLEdBQVAsSUFBYzlKLE1BQU04SixHQUFwQjs7QUFFTCxRQUFJdUIsYUFBc0IsYUFBYXBOLElBQWIsQ0FBa0JxSixTQUFsQixDQUExQjtBQUNBLFFBQUlnRSxhQUFzQkQsYUFBYXJMLE1BQU1vRyxJQUFOLEdBQWEsQ0FBYixHQUFpQmtFLEtBQWpCLEdBQXlCTCxXQUF0QyxHQUFvRGpLLE1BQU04SixHQUFOLEdBQVksQ0FBWixHQUFnQmMsTUFBaEIsR0FBeUJWLFlBQXZHO0FBQ0EsUUFBSXFCLHNCQUFzQkYsYUFBYSxhQUFiLEdBQTZCLGNBQXZEOztBQUVBN0IsU0FBS21CLE1BQUwsQ0FBWUEsTUFBWjtBQUNBLFNBQUthLFlBQUwsQ0FBa0JGLFVBQWxCLEVBQThCOUIsS0FBSyxDQUFMLEVBQVErQixtQkFBUixDQUE5QixFQUE0REYsVUFBNUQ7QUFDRCxHQWhERDs7QUFrREF0RSxVQUFRaE0sU0FBUixDQUFrQnlRLFlBQWxCLEdBQWlDLFVBQVV4TCxLQUFWLEVBQWlCNkIsU0FBakIsRUFBNEJ3SixVQUE1QixFQUF3QztBQUN2RSxTQUFLSSxLQUFMLEdBQ0doRyxHQURILENBQ080RixhQUFhLE1BQWIsR0FBc0IsS0FEN0IsRUFDb0MsTUFBTSxJQUFJckwsUUFBUTZCLFNBQWxCLElBQStCLEdBRG5FLEVBRUc0RCxHQUZILENBRU80RixhQUFhLEtBQWIsR0FBcUIsTUFGNUIsRUFFb0MsRUFGcEM7QUFHRCxHQUpEOztBQU1BdEUsVUFBUWhNLFNBQVIsQ0FBa0I0TyxVQUFsQixHQUErQixZQUFZO0FBQ3pDLFFBQUlILE9BQVEsS0FBS04sR0FBTCxFQUFaO0FBQ0EsUUFBSTFCLFFBQVEsS0FBS2tFLFFBQUwsRUFBWjs7QUFFQWxDLFNBQUs1TCxJQUFMLENBQVUsZ0JBQVYsRUFBNEIsS0FBS2xCLE9BQUwsQ0FBYWdMLElBQWIsR0FBb0IsTUFBcEIsR0FBNkIsTUFBekQsRUFBaUVGLEtBQWpFO0FBQ0FnQyxTQUFLOU4sV0FBTCxDQUFpQiwrQkFBakI7QUFDRCxHQU5EOztBQVFBcUwsVUFBUWhNLFNBQVIsQ0FBa0J1SCxJQUFsQixHQUF5QixVQUFVOUksUUFBVixFQUFvQjtBQUMzQyxRQUFJNkcsT0FBTyxJQUFYO0FBQ0EsUUFBSW1KLE9BQU92UixFQUFFLEtBQUt1UixJQUFQLENBQVg7QUFDQSxRQUFJdFAsSUFBT2pDLEVBQUV1RCxLQUFGLENBQVEsYUFBYSxLQUFLMEMsSUFBMUIsQ0FBWDs7QUFFQSxhQUFTaUUsUUFBVCxHQUFvQjtBQUNsQixVQUFJOUIsS0FBSzZHLFVBQUwsSUFBbUIsSUFBdkIsRUFBNkJzQyxLQUFLNU4sTUFBTDtBQUM3QixVQUFJeUUsS0FBSzFELFFBQVQsRUFBbUI7QUFBRTtBQUNuQjBELGFBQUsxRCxRQUFMLENBQ0dhLFVBREgsQ0FDYyxrQkFEZCxFQUVHL0QsT0FGSCxDQUVXLGVBQWU0RyxLQUFLbkMsSUFGL0I7QUFHRDtBQUNEMUUsa0JBQVlBLFVBQVo7QUFDRDs7QUFFRCxTQUFLbUQsUUFBTCxDQUFjbEQsT0FBZCxDQUFzQlMsQ0FBdEI7O0FBRUEsUUFBSUEsRUFBRXVCLGtCQUFGLEVBQUosRUFBNEI7O0FBRTVCK04sU0FBSzlOLFdBQUwsQ0FBaUIsSUFBakI7O0FBRUF6RCxNQUFFeUIsT0FBRixDQUFVWixVQUFWLElBQXdCMFEsS0FBSzFOLFFBQUwsQ0FBYyxNQUFkLENBQXhCLEdBQ0UwTixLQUNHalEsR0FESCxDQUNPLGlCQURQLEVBQzBCNEksUUFEMUIsRUFFR2hKLG9CQUZILENBRXdCNE4sUUFBUWpNLG1CQUZoQyxDQURGLEdBSUVxSCxVQUpGOztBQU1BLFNBQUsrRSxVQUFMLEdBQWtCLElBQWxCOztBQUVBLFdBQU8sSUFBUDtBQUNELEdBOUJEOztBQWdDQUgsVUFBUWhNLFNBQVIsQ0FBa0IyTixRQUFsQixHQUE2QixZQUFZO0FBQ3ZDLFFBQUlpRCxLQUFLLEtBQUtoUCxRQUFkO0FBQ0EsUUFBSWdQLEdBQUd6USxJQUFILENBQVEsT0FBUixLQUFvQixPQUFPeVEsR0FBR3pRLElBQUgsQ0FBUSxxQkFBUixDQUFQLElBQXlDLFFBQWpFLEVBQTJFO0FBQ3pFeVEsU0FBR3pRLElBQUgsQ0FBUSxxQkFBUixFQUErQnlRLEdBQUd6USxJQUFILENBQVEsT0FBUixLQUFvQixFQUFuRCxFQUF1REEsSUFBdkQsQ0FBNEQsT0FBNUQsRUFBcUUsRUFBckU7QUFDRDtBQUNGLEdBTEQ7O0FBT0E2TCxVQUFRaE0sU0FBUixDQUFrQnNPLFVBQWxCLEdBQStCLFlBQVk7QUFDekMsV0FBTyxLQUFLcUMsUUFBTCxFQUFQO0FBQ0QsR0FGRDs7QUFJQTNFLFVBQVFoTSxTQUFSLENBQWtCaVAsV0FBbEIsR0FBZ0MsVUFBVXJOLFFBQVYsRUFBb0I7QUFDbERBLGVBQWFBLFlBQVksS0FBS0EsUUFBOUI7O0FBRUEsUUFBSXBFLEtBQVNvRSxTQUFTLENBQVQsQ0FBYjtBQUNBLFFBQUlpUCxTQUFTclQsR0FBR3lHLE9BQUgsSUFBYyxNQUEzQjs7QUFFQSxRQUFJNk0sU0FBWXRULEdBQUd5TixxQkFBSCxFQUFoQjtBQUNBLFFBQUk2RixPQUFPdkIsS0FBUCxJQUFnQixJQUFwQixFQUEwQjtBQUN4QjtBQUNBdUIsZUFBUzVULEVBQUUyRSxNQUFGLENBQVMsRUFBVCxFQUFhaVAsTUFBYixFQUFxQixFQUFFdkIsT0FBT3VCLE9BQU81RixLQUFQLEdBQWU0RixPQUFPekYsSUFBL0IsRUFBcUN3RSxRQUFRaUIsT0FBT3hCLE1BQVAsR0FBZ0J3QixPQUFPL0IsR0FBcEUsRUFBckIsQ0FBVDtBQUNEO0FBQ0QsUUFBSWdDLFFBQVF6SyxPQUFPMEssVUFBUCxJQUFxQnhULGNBQWM4SSxPQUFPMEssVUFBdEQ7QUFDQTtBQUNBO0FBQ0EsUUFBSUMsV0FBWUosU0FBUyxFQUFFOUIsS0FBSyxDQUFQLEVBQVUxRCxNQUFNLENBQWhCLEVBQVQsR0FBZ0MwRixRQUFRLElBQVIsR0FBZW5QLFNBQVNnTyxNQUFULEVBQS9EO0FBQ0EsUUFBSXNCLFNBQVksRUFBRUEsUUFBUUwsU0FBU3BULFNBQVNxRyxlQUFULENBQXlCMEYsU0FBekIsSUFBc0MvTCxTQUFTK0ssSUFBVCxDQUFjZ0IsU0FBN0QsR0FBeUU1SCxTQUFTNEgsU0FBVCxFQUFuRixFQUFoQjtBQUNBLFFBQUkySCxZQUFZTixTQUFTLEVBQUV0QixPQUFPclMsRUFBRW9KLE1BQUYsRUFBVWlKLEtBQVYsRUFBVCxFQUE0Qk0sUUFBUTNTLEVBQUVvSixNQUFGLEVBQVV1SixNQUFWLEVBQXBDLEVBQVQsR0FBb0UsSUFBcEY7O0FBRUEsV0FBTzNTLEVBQUUyRSxNQUFGLENBQVMsRUFBVCxFQUFhaVAsTUFBYixFQUFxQkksTUFBckIsRUFBNkJDLFNBQTdCLEVBQXdDRixRQUF4QyxDQUFQO0FBQ0QsR0FuQkQ7O0FBcUJBakYsVUFBUWhNLFNBQVIsQ0FBa0J5UCxtQkFBbEIsR0FBd0MsVUFBVWxELFNBQVYsRUFBcUJsSCxHQUFyQixFQUEwQjZKLFdBQTFCLEVBQXVDQyxZQUF2QyxFQUFxRDtBQUMzRixXQUFPNUMsYUFBYSxRQUFiLEdBQXdCLEVBQUV3QyxLQUFLMUosSUFBSTBKLEdBQUosR0FBVTFKLElBQUl3SyxNQUFyQixFQUErQnhFLE1BQU1oRyxJQUFJZ0csSUFBSixHQUFXaEcsSUFBSWtLLEtBQUosR0FBWSxDQUF2QixHQUEyQkwsY0FBYyxDQUE5RSxFQUF4QixHQUNBM0MsYUFBYSxLQUFiLEdBQXdCLEVBQUV3QyxLQUFLMUosSUFBSTBKLEdBQUosR0FBVUksWUFBakIsRUFBK0I5RCxNQUFNaEcsSUFBSWdHLElBQUosR0FBV2hHLElBQUlrSyxLQUFKLEdBQVksQ0FBdkIsR0FBMkJMLGNBQWMsQ0FBOUUsRUFBeEIsR0FDQTNDLGFBQWEsTUFBYixHQUF3QixFQUFFd0MsS0FBSzFKLElBQUkwSixHQUFKLEdBQVUxSixJQUFJd0ssTUFBSixHQUFhLENBQXZCLEdBQTJCVixlQUFlLENBQWpELEVBQW9EOUQsTUFBTWhHLElBQUlnRyxJQUFKLEdBQVc2RCxXQUFyRSxFQUF4QjtBQUNILDhCQUEyQixFQUFFSCxLQUFLMUosSUFBSTBKLEdBQUosR0FBVTFKLElBQUl3SyxNQUFKLEdBQWEsQ0FBdkIsR0FBMkJWLGVBQWUsQ0FBakQsRUFBb0Q5RCxNQUFNaEcsSUFBSWdHLElBQUosR0FBV2hHLElBQUlrSyxLQUF6RSxFQUgvQjtBQUtELEdBTkQ7O0FBUUF2RCxVQUFRaE0sU0FBUixDQUFrQnFRLHdCQUFsQixHQUE2QyxVQUFVOUQsU0FBVixFQUFxQmxILEdBQXJCLEVBQTBCNkosV0FBMUIsRUFBdUNDLFlBQXZDLEVBQXFEO0FBQ2hHLFFBQUlsSyxRQUFRLEVBQUU4SixLQUFLLENBQVAsRUFBVTFELE1BQU0sQ0FBaEIsRUFBWjtBQUNBLFFBQUksQ0FBQyxLQUFLMkIsU0FBVixFQUFxQixPQUFPL0gsS0FBUDs7QUFFckIsUUFBSW1NLGtCQUFrQixLQUFLelAsT0FBTCxDQUFha0wsUUFBYixJQUF5QixLQUFLbEwsT0FBTCxDQUFha0wsUUFBYixDQUFzQkMsT0FBL0MsSUFBMEQsQ0FBaEY7QUFDQSxRQUFJdUUscUJBQXFCLEtBQUtwQyxXQUFMLENBQWlCLEtBQUtqQyxTQUF0QixDQUF6Qjs7QUFFQSxRQUFJLGFBQWE5SixJQUFiLENBQWtCcUosU0FBbEIsQ0FBSixFQUFrQztBQUNoQyxVQUFJK0UsZ0JBQW1Cak0sSUFBSTBKLEdBQUosR0FBVXFDLGVBQVYsR0FBNEJDLG1CQUFtQkgsTUFBdEU7QUFDQSxVQUFJSyxtQkFBbUJsTSxJQUFJMEosR0FBSixHQUFVcUMsZUFBVixHQUE0QkMsbUJBQW1CSCxNQUEvQyxHQUF3RC9CLFlBQS9FO0FBQ0EsVUFBSW1DLGdCQUFnQkQsbUJBQW1CdEMsR0FBdkMsRUFBNEM7QUFBRTtBQUM1QzlKLGNBQU04SixHQUFOLEdBQVlzQyxtQkFBbUJ0QyxHQUFuQixHQUF5QnVDLGFBQXJDO0FBQ0QsT0FGRCxNQUVPLElBQUlDLG1CQUFtQkYsbUJBQW1CdEMsR0FBbkIsR0FBeUJzQyxtQkFBbUJ4QixNQUFuRSxFQUEyRTtBQUFFO0FBQ2xGNUssY0FBTThKLEdBQU4sR0FBWXNDLG1CQUFtQnRDLEdBQW5CLEdBQXlCc0MsbUJBQW1CeEIsTUFBNUMsR0FBcUQwQixnQkFBakU7QUFDRDtBQUNGLEtBUkQsTUFRTztBQUNMLFVBQUlDLGlCQUFrQm5NLElBQUlnRyxJQUFKLEdBQVcrRixlQUFqQztBQUNBLFVBQUlLLGtCQUFrQnBNLElBQUlnRyxJQUFKLEdBQVcrRixlQUFYLEdBQTZCbEMsV0FBbkQ7QUFDQSxVQUFJc0MsaUJBQWlCSCxtQkFBbUJoRyxJQUF4QyxFQUE4QztBQUFFO0FBQzlDcEcsY0FBTW9HLElBQU4sR0FBYWdHLG1CQUFtQmhHLElBQW5CLEdBQTBCbUcsY0FBdkM7QUFDRCxPQUZELE1BRU8sSUFBSUMsa0JBQWtCSixtQkFBbUJuRyxLQUF6QyxFQUFnRDtBQUFFO0FBQ3ZEakcsY0FBTW9HLElBQU4sR0FBYWdHLG1CQUFtQmhHLElBQW5CLEdBQTBCZ0csbUJBQW1COUIsS0FBN0MsR0FBcURrQyxlQUFsRTtBQUNEO0FBQ0Y7O0FBRUQsV0FBT3hNLEtBQVA7QUFDRCxHQTFCRDs7QUE0QkErRyxVQUFRaE0sU0FBUixDQUFrQjJRLFFBQWxCLEdBQTZCLFlBQVk7QUFDdkMsUUFBSWxFLEtBQUo7QUFDQSxRQUFJbUUsS0FBSyxLQUFLaFAsUUFBZDtBQUNBLFFBQUk4UCxJQUFLLEtBQUsvUCxPQUFkOztBQUVBOEssWUFBUW1FLEdBQUd6USxJQUFILENBQVEscUJBQVIsTUFDRixPQUFPdVIsRUFBRWpGLEtBQVQsSUFBa0IsVUFBbEIsR0FBK0JpRixFQUFFakYsS0FBRixDQUFRckwsSUFBUixDQUFhd1AsR0FBRyxDQUFILENBQWIsQ0FBL0IsR0FBc0RjLEVBQUVqRixLQUR0RCxDQUFSOztBQUdBLFdBQU9BLEtBQVA7QUFDRCxHQVREOztBQVdBVCxVQUFRaE0sU0FBUixDQUFrQjJPLE1BQWxCLEdBQTJCLFVBQVVnRCxNQUFWLEVBQWtCO0FBQzNDO0FBQUdBLGdCQUFVLENBQUMsRUFBRXhHLEtBQUt5RyxNQUFMLEtBQWdCLE9BQWxCLENBQVg7QUFBSCxhQUNPblUsU0FBU29VLGNBQVQsQ0FBd0JGLE1BQXhCLENBRFA7QUFFQSxXQUFPQSxNQUFQO0FBQ0QsR0FKRDs7QUFNQTNGLFVBQVFoTSxTQUFSLENBQWtCbU8sR0FBbEIsR0FBd0IsWUFBWTtBQUNsQyxRQUFJLENBQUMsS0FBS00sSUFBVixFQUFnQjtBQUNkLFdBQUtBLElBQUwsR0FBWXZSLEVBQUUsS0FBS3lFLE9BQUwsQ0FBYTZLLFFBQWYsQ0FBWjtBQUNBLFVBQUksS0FBS2lDLElBQUwsQ0FBVWxPLE1BQVYsSUFBb0IsQ0FBeEIsRUFBMkI7QUFDekIsY0FBTSxJQUFJdEQsS0FBSixDQUFVLEtBQUtrRyxJQUFMLEdBQVksaUVBQXRCLENBQU47QUFDRDtBQUNGO0FBQ0QsV0FBTyxLQUFLc0wsSUFBWjtBQUNELEdBUkQ7O0FBVUF6QyxVQUFRaE0sU0FBUixDQUFrQjBRLEtBQWxCLEdBQTBCLFlBQVk7QUFDcEMsV0FBUSxLQUFLb0IsTUFBTCxHQUFjLEtBQUtBLE1BQUwsSUFBZSxLQUFLM0QsR0FBTCxHQUFXdEwsSUFBWCxDQUFnQixnQkFBaEIsQ0FBckM7QUFDRCxHQUZEOztBQUlBbUosVUFBUWhNLFNBQVIsQ0FBa0IrUixNQUFsQixHQUEyQixZQUFZO0FBQ3JDLFNBQUs5RixPQUFMLEdBQWUsSUFBZjtBQUNELEdBRkQ7O0FBSUFELFVBQVFoTSxTQUFSLENBQWtCZ1MsT0FBbEIsR0FBNEIsWUFBWTtBQUN0QyxTQUFLL0YsT0FBTCxHQUFlLEtBQWY7QUFDRCxHQUZEOztBQUlBRCxVQUFRaE0sU0FBUixDQUFrQmlTLGFBQWxCLEdBQWtDLFlBQVk7QUFDNUMsU0FBS2hHLE9BQUwsR0FBZSxDQUFDLEtBQUtBLE9BQXJCO0FBQ0QsR0FGRDs7QUFJQUQsVUFBUWhNLFNBQVIsQ0FBa0IwQyxNQUFsQixHQUEyQixVQUFVdkQsQ0FBVixFQUFhO0FBQ3RDLFFBQUkrTyxPQUFPLElBQVg7QUFDQSxRQUFJL08sQ0FBSixFQUFPO0FBQ0wrTyxhQUFPaFIsRUFBRWlDLEVBQUVpTCxhQUFKLEVBQW1CakosSUFBbkIsQ0FBd0IsUUFBUSxLQUFLZ0MsSUFBckMsQ0FBUDtBQUNBLFVBQUksQ0FBQytLLElBQUwsRUFBVztBQUNUQSxlQUFPLElBQUksS0FBS2QsV0FBVCxDQUFxQmpPLEVBQUVpTCxhQUF2QixFQUFzQyxLQUFLeUQsa0JBQUwsRUFBdEMsQ0FBUDtBQUNBM1EsVUFBRWlDLEVBQUVpTCxhQUFKLEVBQW1CakosSUFBbkIsQ0FBd0IsUUFBUSxLQUFLZ0MsSUFBckMsRUFBMkMrSyxJQUEzQztBQUNEO0FBQ0Y7O0FBRUQsUUFBSS9PLENBQUosRUFBTztBQUNMK08sV0FBSzlCLE9BQUwsQ0FBYWMsS0FBYixHQUFxQixDQUFDZ0IsS0FBSzlCLE9BQUwsQ0FBYWMsS0FBbkM7QUFDQSxVQUFJZ0IsS0FBS0csYUFBTCxFQUFKLEVBQTBCSCxLQUFLVixLQUFMLENBQVdVLElBQVgsRUFBMUIsS0FDS0EsS0FBS1QsS0FBTCxDQUFXUyxJQUFYO0FBQ04sS0FKRCxNQUlPO0FBQ0xBLFdBQUtDLEdBQUwsR0FBV3BOLFFBQVgsQ0FBb0IsSUFBcEIsSUFBNEJtTixLQUFLVCxLQUFMLENBQVdTLElBQVgsQ0FBNUIsR0FBK0NBLEtBQUtWLEtBQUwsQ0FBV1UsSUFBWCxDQUEvQztBQUNEO0FBQ0YsR0FqQkQ7O0FBbUJBbEMsVUFBUWhNLFNBQVIsQ0FBa0JrUyxPQUFsQixHQUE0QixZQUFZO0FBQ3RDLFFBQUk1TSxPQUFPLElBQVg7QUFDQThJLGlCQUFhLEtBQUtsQyxPQUFsQjtBQUNBLFNBQUszRSxJQUFMLENBQVUsWUFBWTtBQUNwQmpDLFdBQUsxRCxRQUFMLENBQWMrSCxHQUFkLENBQWtCLE1BQU1yRSxLQUFLbkMsSUFBN0IsRUFBbUNnUCxVQUFuQyxDQUE4QyxRQUFRN00sS0FBS25DLElBQTNEO0FBQ0EsVUFBSW1DLEtBQUttSixJQUFULEVBQWU7QUFDYm5KLGFBQUttSixJQUFMLENBQVU1TixNQUFWO0FBQ0Q7QUFDRHlFLFdBQUttSixJQUFMLEdBQVksSUFBWjtBQUNBbkosV0FBS3dNLE1BQUwsR0FBYyxJQUFkO0FBQ0F4TSxXQUFLMEgsU0FBTCxHQUFpQixJQUFqQjtBQUNBMUgsV0FBSzFELFFBQUwsR0FBZ0IsSUFBaEI7QUFDRCxLQVREO0FBVUQsR0FiRDs7QUFnQkE7QUFDQTs7QUFFQSxXQUFTWixNQUFULENBQWdCQyxNQUFoQixFQUF3QjtBQUN0QixXQUFPLEtBQUtDLElBQUwsQ0FBVSxZQUFZO0FBQzNCLFVBQUlqQixRQUFVL0MsRUFBRSxJQUFGLENBQWQ7QUFDQSxVQUFJaUUsT0FBVWxCLE1BQU1rQixJQUFOLENBQVcsWUFBWCxDQUFkO0FBQ0EsVUFBSVEsVUFBVSxRQUFPVixNQUFQLHlDQUFPQSxNQUFQLE1BQWlCLFFBQWpCLElBQTZCQSxNQUEzQzs7QUFFQSxVQUFJLENBQUNFLElBQUQsSUFBUyxlQUFlK0IsSUFBZixDQUFvQmpDLE1BQXBCLENBQWIsRUFBMEM7QUFDMUMsVUFBSSxDQUFDRSxJQUFMLEVBQVdsQixNQUFNa0IsSUFBTixDQUFXLFlBQVgsRUFBMEJBLE9BQU8sSUFBSTZLLE9BQUosQ0FBWSxJQUFaLEVBQWtCckssT0FBbEIsQ0FBakM7QUFDWCxVQUFJLE9BQU9WLE1BQVAsSUFBaUIsUUFBckIsRUFBK0JFLEtBQUtGLE1BQUw7QUFDaEMsS0FSTSxDQUFQO0FBU0Q7O0FBRUQsTUFBSUksTUFBTW5FLEVBQUVFLEVBQUYsQ0FBS2dWLE9BQWY7O0FBRUFsVixJQUFFRSxFQUFGLENBQUtnVixPQUFMLEdBQTJCcFIsTUFBM0I7QUFDQTlELElBQUVFLEVBQUYsQ0FBS2dWLE9BQUwsQ0FBYTdRLFdBQWIsR0FBMkJ5SyxPQUEzQjs7QUFHQTtBQUNBOztBQUVBOU8sSUFBRUUsRUFBRixDQUFLZ1YsT0FBTCxDQUFhNVEsVUFBYixHQUEwQixZQUFZO0FBQ3BDdEUsTUFBRUUsRUFBRixDQUFLZ1YsT0FBTCxHQUFlL1EsR0FBZjtBQUNBLFdBQU8sSUFBUDtBQUNELEdBSEQ7QUFLRCxDQTdmQSxDQTZmQ3JFLE1BN2ZELENBQUQ7O0FBK2ZBOzs7Ozs7OztBQVNBLENBQUMsVUFBVUUsQ0FBVixFQUFhO0FBQ1o7O0FBRUE7QUFDQTs7QUFFQSxNQUFJbVYsVUFBVSxTQUFWQSxPQUFVLENBQVUzUSxPQUFWLEVBQW1CQyxPQUFuQixFQUE0QjtBQUN4QyxTQUFLMEssSUFBTCxDQUFVLFNBQVYsRUFBcUIzSyxPQUFyQixFQUE4QkMsT0FBOUI7QUFDRCxHQUZEOztBQUlBLE1BQUksQ0FBQ3pFLEVBQUVFLEVBQUYsQ0FBS2dWLE9BQVYsRUFBbUIsTUFBTSxJQUFJblYsS0FBSixDQUFVLDZCQUFWLENBQU47O0FBRW5Cb1YsVUFBUXZTLE9BQVIsR0FBbUIsT0FBbkI7O0FBRUF1UyxVQUFRdlEsUUFBUixHQUFtQjVFLEVBQUUyRSxNQUFGLENBQVMsRUFBVCxFQUFhM0UsRUFBRUUsRUFBRixDQUFLZ1YsT0FBTCxDQUFhN1EsV0FBYixDQUF5Qk8sUUFBdEMsRUFBZ0Q7QUFDakV5SyxlQUFXLE9BRHNEO0FBRWpFN04sYUFBUyxPQUZ3RDtBQUdqRTRULGFBQVMsRUFId0Q7QUFJakU5RixjQUFVO0FBSnVELEdBQWhELENBQW5COztBQVFBO0FBQ0E7O0FBRUE2RixVQUFRclMsU0FBUixHQUFvQjlDLEVBQUUyRSxNQUFGLENBQVMsRUFBVCxFQUFhM0UsRUFBRUUsRUFBRixDQUFLZ1YsT0FBTCxDQUFhN1EsV0FBYixDQUF5QnZCLFNBQXRDLENBQXBCOztBQUVBcVMsVUFBUXJTLFNBQVIsQ0FBa0JvTixXQUFsQixHQUFnQ2lGLE9BQWhDOztBQUVBQSxVQUFRclMsU0FBUixDQUFrQjROLFdBQWxCLEdBQWdDLFlBQVk7QUFDMUMsV0FBT3lFLFFBQVF2USxRQUFmO0FBQ0QsR0FGRDs7QUFJQXVRLFVBQVFyUyxTQUFSLENBQWtCNE8sVUFBbEIsR0FBK0IsWUFBWTtBQUN6QyxRQUFJSCxPQUFVLEtBQUtOLEdBQUwsRUFBZDtBQUNBLFFBQUkxQixRQUFVLEtBQUtrRSxRQUFMLEVBQWQ7QUFDQSxRQUFJMkIsVUFBVSxLQUFLQyxVQUFMLEVBQWQ7O0FBRUE5RCxTQUFLNUwsSUFBTCxDQUFVLGdCQUFWLEVBQTRCLEtBQUtsQixPQUFMLENBQWFnTCxJQUFiLEdBQW9CLE1BQXBCLEdBQTZCLE1BQXpELEVBQWlFRixLQUFqRTtBQUNBZ0MsU0FBSzVMLElBQUwsQ0FBVSxrQkFBVixFQUE4QjZCLFFBQTlCLEdBQXlDN0QsTUFBekMsR0FBa0QxQyxHQUFsRCxHQUF5RDtBQUN2RCxTQUFLd0QsT0FBTCxDQUFhZ0wsSUFBYixHQUFxQixPQUFPMkYsT0FBUCxJQUFrQixRQUFsQixHQUE2QixNQUE3QixHQUFzQyxRQUEzRCxHQUF1RSxNQUR6RSxFQUVFQSxPQUZGOztBQUlBN0QsU0FBSzlOLFdBQUwsQ0FBaUIsK0JBQWpCOztBQUVBO0FBQ0E7QUFDQSxRQUFJLENBQUM4TixLQUFLNUwsSUFBTCxDQUFVLGdCQUFWLEVBQTRCOEosSUFBNUIsRUFBTCxFQUF5QzhCLEtBQUs1TCxJQUFMLENBQVUsZ0JBQVYsRUFBNEIwRSxJQUE1QjtBQUMxQyxHQWZEOztBQWlCQThLLFVBQVFyUyxTQUFSLENBQWtCc08sVUFBbEIsR0FBK0IsWUFBWTtBQUN6QyxXQUFPLEtBQUtxQyxRQUFMLE1BQW1CLEtBQUs0QixVQUFMLEVBQTFCO0FBQ0QsR0FGRDs7QUFJQUYsVUFBUXJTLFNBQVIsQ0FBa0J1UyxVQUFsQixHQUErQixZQUFZO0FBQ3pDLFFBQUkzQixLQUFLLEtBQUtoUCxRQUFkO0FBQ0EsUUFBSThQLElBQUssS0FBSy9QLE9BQWQ7O0FBRUEsV0FBT2lQLEdBQUd6USxJQUFILENBQVEsY0FBUixNQUNELE9BQU91UixFQUFFWSxPQUFULElBQW9CLFVBQXBCLEdBQ0VaLEVBQUVZLE9BQUYsQ0FBVWxSLElBQVYsQ0FBZXdQLEdBQUcsQ0FBSCxDQUFmLENBREYsR0FFRWMsRUFBRVksT0FISCxDQUFQO0FBSUQsR0FSRDs7QUFVQUQsVUFBUXJTLFNBQVIsQ0FBa0IwUSxLQUFsQixHQUEwQixZQUFZO0FBQ3BDLFdBQVEsS0FBS29CLE1BQUwsR0FBYyxLQUFLQSxNQUFMLElBQWUsS0FBSzNELEdBQUwsR0FBV3RMLElBQVgsQ0FBZ0IsUUFBaEIsQ0FBckM7QUFDRCxHQUZEOztBQUtBO0FBQ0E7O0FBRUEsV0FBUzdCLE1BQVQsQ0FBZ0JDLE1BQWhCLEVBQXdCO0FBQ3RCLFdBQU8sS0FBS0MsSUFBTCxDQUFVLFlBQVk7QUFDM0IsVUFBSWpCLFFBQVUvQyxFQUFFLElBQUYsQ0FBZDtBQUNBLFVBQUlpRSxPQUFVbEIsTUFBTWtCLElBQU4sQ0FBVyxZQUFYLENBQWQ7QUFDQSxVQUFJUSxVQUFVLFFBQU9WLE1BQVAseUNBQU9BLE1BQVAsTUFBaUIsUUFBakIsSUFBNkJBLE1BQTNDOztBQUVBLFVBQUksQ0FBQ0UsSUFBRCxJQUFTLGVBQWUrQixJQUFmLENBQW9CakMsTUFBcEIsQ0FBYixFQUEwQztBQUMxQyxVQUFJLENBQUNFLElBQUwsRUFBV2xCLE1BQU1rQixJQUFOLENBQVcsWUFBWCxFQUEwQkEsT0FBTyxJQUFJa1IsT0FBSixDQUFZLElBQVosRUFBa0IxUSxPQUFsQixDQUFqQztBQUNYLFVBQUksT0FBT1YsTUFBUCxJQUFpQixRQUFyQixFQUErQkUsS0FBS0YsTUFBTDtBQUNoQyxLQVJNLENBQVA7QUFTRDs7QUFFRCxNQUFJSSxNQUFNbkUsRUFBRUUsRUFBRixDQUFLb1YsT0FBZjs7QUFFQXRWLElBQUVFLEVBQUYsQ0FBS29WLE9BQUwsR0FBMkJ4UixNQUEzQjtBQUNBOUQsSUFBRUUsRUFBRixDQUFLb1YsT0FBTCxDQUFhalIsV0FBYixHQUEyQjhRLE9BQTNCOztBQUdBO0FBQ0E7O0FBRUFuVixJQUFFRSxFQUFGLENBQUtvVixPQUFMLENBQWFoUixVQUFiLEdBQTBCLFlBQVk7QUFDcEN0RSxNQUFFRSxFQUFGLENBQUtvVixPQUFMLEdBQWVuUixHQUFmO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsR0FIRDtBQUtELENBbEdBLENBa0dDckUsTUFsR0QsQ0FBRDs7QUFvR0E7Ozs7Ozs7O0FBU0EsQ0FBQyxVQUFVRSxDQUFWLEVBQWE7QUFDWjs7QUFFQTtBQUNBOztBQUVBLFdBQVN1VixTQUFULENBQW1CL1EsT0FBbkIsRUFBNEJDLE9BQTVCLEVBQXFDO0FBQ25DLFNBQUs0RyxLQUFMLEdBQXNCckwsRUFBRU8sU0FBUytLLElBQVgsQ0FBdEI7QUFDQSxTQUFLa0ssY0FBTCxHQUFzQnhWLEVBQUV3RSxPQUFGLEVBQVdyQyxFQUFYLENBQWM1QixTQUFTK0ssSUFBdkIsSUFBK0J0TCxFQUFFb0osTUFBRixDQUEvQixHQUEyQ3BKLEVBQUV3RSxPQUFGLENBQWpFO0FBQ0EsU0FBS0MsT0FBTCxHQUFzQnpFLEVBQUUyRSxNQUFGLENBQVMsRUFBVCxFQUFhNFEsVUFBVTNRLFFBQXZCLEVBQWlDSCxPQUFqQyxDQUF0QjtBQUNBLFNBQUt6QixRQUFMLEdBQXNCLENBQUMsS0FBS3lCLE9BQUwsQ0FBYXZDLE1BQWIsSUFBdUIsRUFBeEIsSUFBOEIsY0FBcEQ7QUFDQSxTQUFLdVQsT0FBTCxHQUFzQixFQUF0QjtBQUNBLFNBQUtDLE9BQUwsR0FBc0IsRUFBdEI7QUFDQSxTQUFLQyxZQUFMLEdBQXNCLElBQXRCO0FBQ0EsU0FBS3JJLFlBQUwsR0FBc0IsQ0FBdEI7O0FBRUEsU0FBS2tJLGNBQUwsQ0FBb0I5UyxFQUFwQixDQUF1QixxQkFBdkIsRUFBOEMxQyxFQUFFb0YsS0FBRixDQUFRLEtBQUt3USxPQUFiLEVBQXNCLElBQXRCLENBQTlDO0FBQ0EsU0FBS0MsT0FBTDtBQUNBLFNBQUtELE9BQUw7QUFDRDs7QUFFREwsWUFBVTNTLE9BQVYsR0FBcUIsT0FBckI7O0FBRUEyUyxZQUFVM1EsUUFBVixHQUFxQjtBQUNuQjhOLFlBQVE7QUFEVyxHQUFyQjs7QUFJQTZDLFlBQVV6UyxTQUFWLENBQW9CZ1QsZUFBcEIsR0FBc0MsWUFBWTtBQUNoRCxXQUFPLEtBQUtOLGNBQUwsQ0FBb0IsQ0FBcEIsRUFBdUJsSSxZQUF2QixJQUF1Q1csS0FBSzhILEdBQUwsQ0FBUyxLQUFLMUssS0FBTCxDQUFXLENBQVgsRUFBY2lDLFlBQXZCLEVBQXFDL00sU0FBU3FHLGVBQVQsQ0FBeUIwRyxZQUE5RCxDQUE5QztBQUNELEdBRkQ7O0FBSUFpSSxZQUFVelMsU0FBVixDQUFvQitTLE9BQXBCLEdBQThCLFlBQVk7QUFDeEMsUUFBSXpOLE9BQWdCLElBQXBCO0FBQ0EsUUFBSTROLGVBQWdCLFFBQXBCO0FBQ0EsUUFBSUMsYUFBZ0IsQ0FBcEI7O0FBRUEsU0FBS1IsT0FBTCxHQUFvQixFQUFwQjtBQUNBLFNBQUtDLE9BQUwsR0FBb0IsRUFBcEI7QUFDQSxTQUFLcEksWUFBTCxHQUFvQixLQUFLd0ksZUFBTCxFQUFwQjs7QUFFQSxRQUFJLENBQUM5VixFQUFFa1csUUFBRixDQUFXLEtBQUtWLGNBQUwsQ0FBb0IsQ0FBcEIsQ0FBWCxDQUFMLEVBQXlDO0FBQ3ZDUSxxQkFBZSxVQUFmO0FBQ0FDLG1CQUFlLEtBQUtULGNBQUwsQ0FBb0JsSixTQUFwQixFQUFmO0FBQ0Q7O0FBRUQsU0FBS2pCLEtBQUwsQ0FDRzFGLElBREgsQ0FDUSxLQUFLM0MsUUFEYixFQUVHbVQsR0FGSCxDQUVPLFlBQVk7QUFDZixVQUFJOVUsTUFBUXJCLEVBQUUsSUFBRixDQUFaO0FBQ0EsVUFBSWlKLE9BQVE1SCxJQUFJNEMsSUFBSixDQUFTLFFBQVQsS0FBc0I1QyxJQUFJNEIsSUFBSixDQUFTLE1BQVQsQ0FBbEM7QUFDQSxVQUFJbVQsUUFBUSxNQUFNcFEsSUFBTixDQUFXaUQsSUFBWCxLQUFvQmpKLEVBQUVpSixJQUFGLENBQWhDOztBQUVBLGFBQVFtTixTQUNIQSxNQUFNL1MsTUFESCxJQUVIK1MsTUFBTWpVLEVBQU4sQ0FBUyxVQUFULENBRkcsSUFHSCxDQUFDLENBQUNpVSxNQUFNSixZQUFOLElBQXNCbkUsR0FBdEIsR0FBNEJvRSxVQUE3QixFQUF5Q2hOLElBQXpDLENBQUQsQ0FIRSxJQUdtRCxJQUgxRDtBQUlELEtBWEgsRUFZR29OLElBWkgsQ0FZUSxVQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0I7QUFBRSxhQUFPRCxFQUFFLENBQUYsSUFBT0MsRUFBRSxDQUFGLENBQWQ7QUFBb0IsS0FaOUMsRUFhR3ZTLElBYkgsQ0FhUSxZQUFZO0FBQ2hCb0UsV0FBS3FOLE9BQUwsQ0FBYWUsSUFBYixDQUFrQixLQUFLLENBQUwsQ0FBbEI7QUFDQXBPLFdBQUtzTixPQUFMLENBQWFjLElBQWIsQ0FBa0IsS0FBSyxDQUFMLENBQWxCO0FBQ0QsS0FoQkg7QUFpQkQsR0EvQkQ7O0FBaUNBakIsWUFBVXpTLFNBQVYsQ0FBb0I4UyxPQUFwQixHQUE4QixZQUFZO0FBQ3hDLFFBQUl0SixZQUFlLEtBQUtrSixjQUFMLENBQW9CbEosU0FBcEIsS0FBa0MsS0FBSzdILE9BQUwsQ0FBYWlPLE1BQWxFO0FBQ0EsUUFBSXBGLGVBQWUsS0FBS3dJLGVBQUwsRUFBbkI7QUFDQSxRQUFJVyxZQUFlLEtBQUtoUyxPQUFMLENBQWFpTyxNQUFiLEdBQXNCcEYsWUFBdEIsR0FBcUMsS0FBS2tJLGNBQUwsQ0FBb0I3QyxNQUFwQixFQUF4RDtBQUNBLFFBQUk4QyxVQUFlLEtBQUtBLE9BQXhCO0FBQ0EsUUFBSUMsVUFBZSxLQUFLQSxPQUF4QjtBQUNBLFFBQUlDLGVBQWUsS0FBS0EsWUFBeEI7QUFDQSxRQUFJcEwsQ0FBSjs7QUFFQSxRQUFJLEtBQUsrQyxZQUFMLElBQXFCQSxZQUF6QixFQUF1QztBQUNyQyxXQUFLdUksT0FBTDtBQUNEOztBQUVELFFBQUl2SixhQUFhbUssU0FBakIsRUFBNEI7QUFDMUIsYUFBT2QsaUJBQWlCcEwsSUFBSW1MLFFBQVFBLFFBQVFyUyxNQUFSLEdBQWlCLENBQXpCLENBQXJCLEtBQXFELEtBQUtxVCxRQUFMLENBQWNuTSxDQUFkLENBQTVEO0FBQ0Q7O0FBRUQsUUFBSW9MLGdCQUFnQnJKLFlBQVltSixRQUFRLENBQVIsQ0FBaEMsRUFBNEM7QUFDMUMsV0FBS0UsWUFBTCxHQUFvQixJQUFwQjtBQUNBLGFBQU8sS0FBS2dCLEtBQUwsRUFBUDtBQUNEOztBQUVELFNBQUtwTSxJQUFJa0wsUUFBUXBTLE1BQWpCLEVBQXlCa0gsR0FBekIsR0FBK0I7QUFDN0JvTCxzQkFBZ0JELFFBQVFuTCxDQUFSLENBQWhCLElBQ0srQixhQUFhbUosUUFBUWxMLENBQVIsQ0FEbEIsS0FFTWtMLFFBQVFsTCxJQUFJLENBQVosTUFBbUJ2SixTQUFuQixJQUFnQ3NMLFlBQVltSixRQUFRbEwsSUFBSSxDQUFaLENBRmxELEtBR0ssS0FBS21NLFFBQUwsQ0FBY2hCLFFBQVFuTCxDQUFSLENBQWQsQ0FITDtBQUlEO0FBQ0YsR0E1QkQ7O0FBOEJBZ0wsWUFBVXpTLFNBQVYsQ0FBb0I0VCxRQUFwQixHQUErQixVQUFVeFUsTUFBVixFQUFrQjtBQUMvQyxTQUFLeVQsWUFBTCxHQUFvQnpULE1BQXBCOztBQUVBLFNBQUt5VSxLQUFMOztBQUVBLFFBQUkzVCxXQUFXLEtBQUtBLFFBQUwsR0FDYixnQkFEYSxHQUNNZCxNQUROLEdBQ2UsS0FEZixHQUViLEtBQUtjLFFBRlEsR0FFRyxTQUZILEdBRWVkLE1BRmYsR0FFd0IsSUFGdkM7O0FBSUEsUUFBSTBGLFNBQVM1SCxFQUFFZ0QsUUFBRixFQUNWNFQsT0FEVSxDQUNGLElBREUsRUFFVnZSLFFBRlUsQ0FFRCxRQUZDLENBQWI7O0FBSUEsUUFBSXVDLE9BQU9MLE1BQVAsQ0FBYyxnQkFBZCxFQUFnQ2xFLE1BQXBDLEVBQTRDO0FBQzFDdUUsZUFBU0EsT0FDTnRFLE9BRE0sQ0FDRSxhQURGLEVBRU4rQixRQUZNLENBRUcsUUFGSCxDQUFUO0FBR0Q7O0FBRUR1QyxXQUFPcEcsT0FBUCxDQUFlLHVCQUFmO0FBQ0QsR0FwQkQ7O0FBc0JBK1QsWUFBVXpTLFNBQVYsQ0FBb0I2VCxLQUFwQixHQUE0QixZQUFZO0FBQ3RDM1csTUFBRSxLQUFLZ0QsUUFBUCxFQUNHNlQsWUFESCxDQUNnQixLQUFLcFMsT0FBTCxDQUFhdkMsTUFEN0IsRUFDcUMsU0FEckMsRUFFR3VCLFdBRkgsQ0FFZSxRQUZmO0FBR0QsR0FKRDs7QUFPQTtBQUNBOztBQUVBLFdBQVNLLE1BQVQsQ0FBZ0JDLE1BQWhCLEVBQXdCO0FBQ3RCLFdBQU8sS0FBS0MsSUFBTCxDQUFVLFlBQVk7QUFDM0IsVUFBSWpCLFFBQVUvQyxFQUFFLElBQUYsQ0FBZDtBQUNBLFVBQUlpRSxPQUFVbEIsTUFBTWtCLElBQU4sQ0FBVyxjQUFYLENBQWQ7QUFDQSxVQUFJUSxVQUFVLFFBQU9WLE1BQVAseUNBQU9BLE1BQVAsTUFBaUIsUUFBakIsSUFBNkJBLE1BQTNDOztBQUVBLFVBQUksQ0FBQ0UsSUFBTCxFQUFXbEIsTUFBTWtCLElBQU4sQ0FBVyxjQUFYLEVBQTRCQSxPQUFPLElBQUlzUixTQUFKLENBQWMsSUFBZCxFQUFvQjlRLE9BQXBCLENBQW5DO0FBQ1gsVUFBSSxPQUFPVixNQUFQLElBQWlCLFFBQXJCLEVBQStCRSxLQUFLRixNQUFMO0FBQ2hDLEtBUE0sQ0FBUDtBQVFEOztBQUVELE1BQUlJLE1BQU1uRSxFQUFFRSxFQUFGLENBQUs0VyxTQUFmOztBQUVBOVcsSUFBRUUsRUFBRixDQUFLNFcsU0FBTCxHQUE2QmhULE1BQTdCO0FBQ0E5RCxJQUFFRSxFQUFGLENBQUs0VyxTQUFMLENBQWV6UyxXQUFmLEdBQTZCa1IsU0FBN0I7O0FBR0E7QUFDQTs7QUFFQXZWLElBQUVFLEVBQUYsQ0FBSzRXLFNBQUwsQ0FBZXhTLFVBQWYsR0FBNEIsWUFBWTtBQUN0Q3RFLE1BQUVFLEVBQUYsQ0FBSzRXLFNBQUwsR0FBaUIzUyxHQUFqQjtBQUNBLFdBQU8sSUFBUDtBQUNELEdBSEQ7O0FBTUE7QUFDQTs7QUFFQW5FLElBQUVvSixNQUFGLEVBQVUxRyxFQUFWLENBQWEsNEJBQWIsRUFBMkMsWUFBWTtBQUNyRDFDLE1BQUUscUJBQUYsRUFBeUJnRSxJQUF6QixDQUE4QixZQUFZO0FBQ3hDLFVBQUkrUyxPQUFPL1csRUFBRSxJQUFGLENBQVg7QUFDQThELGFBQU9JLElBQVAsQ0FBWTZTLElBQVosRUFBa0JBLEtBQUs5UyxJQUFMLEVBQWxCO0FBQ0QsS0FIRDtBQUlELEdBTEQ7QUFPRCxDQWxLQSxDQWtLQ25FLE1BbEtELENBQUQ7O0FBb0tBOzs7Ozs7OztBQVNBLENBQUMsVUFBVUUsQ0FBVixFQUFhO0FBQ1o7O0FBRUE7QUFDQTs7QUFFQSxNQUFJZ1gsTUFBTSxTQUFOQSxHQUFNLENBQVV4UyxPQUFWLEVBQW1CO0FBQzNCO0FBQ0EsU0FBS0EsT0FBTCxHQUFleEUsRUFBRXdFLE9BQUYsQ0FBZjtBQUNBO0FBQ0QsR0FKRDs7QUFNQXdTLE1BQUlwVSxPQUFKLEdBQWMsT0FBZDs7QUFFQW9VLE1BQUluVSxtQkFBSixHQUEwQixHQUExQjs7QUFFQW1VLE1BQUlsVSxTQUFKLENBQWNnSCxJQUFkLEdBQXFCLFlBQVk7QUFDL0IsUUFBSS9HLFFBQVcsS0FBS3lCLE9BQXBCO0FBQ0EsUUFBSXlTLE1BQVdsVSxNQUFNTyxPQUFOLENBQWMsd0JBQWQsQ0FBZjtBQUNBLFFBQUlOLFdBQVdELE1BQU1rQixJQUFOLENBQVcsUUFBWCxDQUFmOztBQUVBLFFBQUksQ0FBQ2pCLFFBQUwsRUFBZTtBQUNiQSxpQkFBV0QsTUFBTUUsSUFBTixDQUFXLE1BQVgsQ0FBWDtBQUNBRCxpQkFBV0EsWUFBWUEsU0FBU0UsT0FBVCxDQUFpQixnQkFBakIsRUFBbUMsRUFBbkMsQ0FBdkIsQ0FGYSxDQUVpRDtBQUMvRDs7QUFFRCxRQUFJSCxNQUFNd0UsTUFBTixDQUFhLElBQWIsRUFBbUIxRCxRQUFuQixDQUE0QixRQUE1QixDQUFKLEVBQTJDOztBQUUzQyxRQUFJcVQsWUFBWUQsSUFBSXRSLElBQUosQ0FBUyxnQkFBVCxDQUFoQjtBQUNBLFFBQUl3UixZQUFZblgsRUFBRXVELEtBQUYsQ0FBUSxhQUFSLEVBQXVCO0FBQ3JDaUYscUJBQWV6RixNQUFNLENBQU47QUFEc0IsS0FBdkIsQ0FBaEI7QUFHQSxRQUFJOEwsWUFBWTdPLEVBQUV1RCxLQUFGLENBQVEsYUFBUixFQUF1QjtBQUNyQ2lGLHFCQUFlME8sVUFBVSxDQUFWO0FBRHNCLEtBQXZCLENBQWhCOztBQUlBQSxjQUFVMVYsT0FBVixDQUFrQjJWLFNBQWxCO0FBQ0FwVSxVQUFNdkIsT0FBTixDQUFjcU4sU0FBZDs7QUFFQSxRQUFJQSxVQUFVckwsa0JBQVYsTUFBa0MyVCxVQUFVM1Qsa0JBQVYsRUFBdEMsRUFBc0U7O0FBRXRFLFFBQUkwRixVQUFVbEosRUFBRWdELFFBQUYsQ0FBZDs7QUFFQSxTQUFLMFQsUUFBTCxDQUFjM1QsTUFBTU8sT0FBTixDQUFjLElBQWQsQ0FBZCxFQUFtQzJULEdBQW5DO0FBQ0EsU0FBS1AsUUFBTCxDQUFjeE4sT0FBZCxFQUF1QkEsUUFBUTNCLE1BQVIsRUFBdkIsRUFBeUMsWUFBWTtBQUNuRDJQLGdCQUFVMVYsT0FBVixDQUFrQjtBQUNoQnlFLGNBQU0sZUFEVTtBQUVoQnVDLHVCQUFlekYsTUFBTSxDQUFOO0FBRkMsT0FBbEI7QUFJQUEsWUFBTXZCLE9BQU4sQ0FBYztBQUNaeUUsY0FBTSxjQURNO0FBRVp1Qyx1QkFBZTBPLFVBQVUsQ0FBVjtBQUZILE9BQWQ7QUFJRCxLQVREO0FBVUQsR0F0Q0Q7O0FBd0NBRixNQUFJbFUsU0FBSixDQUFjNFQsUUFBZCxHQUF5QixVQUFVbFMsT0FBVixFQUFtQmtMLFNBQW5CLEVBQThCbk8sUUFBOUIsRUFBd0M7QUFDL0QsUUFBSWdGLFVBQWFtSixVQUFVL0osSUFBVixDQUFlLFdBQWYsQ0FBakI7QUFDQSxRQUFJOUUsYUFBYVUsWUFDWnZCLEVBQUV5QixPQUFGLENBQVVaLFVBREUsS0FFWDBGLFFBQVFsRCxNQUFSLElBQWtCa0QsUUFBUTFDLFFBQVIsQ0FBaUIsTUFBakIsQ0FBbEIsSUFBOEMsQ0FBQyxDQUFDNkwsVUFBVS9KLElBQVYsQ0FBZSxTQUFmLEVBQTBCdEMsTUFGL0QsQ0FBakI7O0FBSUEsYUFBUzZELElBQVQsR0FBZ0I7QUFDZFgsY0FDRzlDLFdBREgsQ0FDZSxRQURmLEVBRUdrQyxJQUZILENBRVEsNEJBRlIsRUFHS2xDLFdBSEwsQ0FHaUIsUUFIakIsRUFJR3hDLEdBSkgsR0FLRzBFLElBTEgsQ0FLUSxxQkFMUixFQU1LMUMsSUFOTCxDQU1VLGVBTlYsRUFNMkIsS0FOM0I7O0FBUUF1QixjQUNHYSxRQURILENBQ1ksUUFEWixFQUVHTSxJQUZILENBRVEscUJBRlIsRUFHSzFDLElBSEwsQ0FHVSxlQUhWLEVBRzJCLElBSDNCOztBQUtBLFVBQUlwQyxVQUFKLEVBQWdCO0FBQ2QyRCxnQkFBUSxDQUFSLEVBQVdvRSxXQUFYLENBRGMsQ0FDUztBQUN2QnBFLGdCQUFRYSxRQUFSLENBQWlCLElBQWpCO0FBQ0QsT0FIRCxNQUdPO0FBQ0xiLGdCQUFRZixXQUFSLENBQW9CLE1BQXBCO0FBQ0Q7O0FBRUQsVUFBSWUsUUFBUStDLE1BQVIsQ0FBZSxnQkFBZixFQUFpQ2xFLE1BQXJDLEVBQTZDO0FBQzNDbUIsZ0JBQ0dsQixPQURILENBQ1csYUFEWCxFQUVLK0IsUUFGTCxDQUVjLFFBRmQsRUFHR3BFLEdBSEgsR0FJRzBFLElBSkgsQ0FJUSxxQkFKUixFQUtLMUMsSUFMTCxDQUtVLGVBTFYsRUFLMkIsSUFMM0I7QUFNRDs7QUFFRDFCLGtCQUFZQSxVQUFaO0FBQ0Q7O0FBRURnRixZQUFRbEQsTUFBUixJQUFrQnhDLFVBQWxCLEdBQ0UwRixRQUNHakYsR0FESCxDQUNPLGlCQURQLEVBQzBCNEYsSUFEMUIsRUFFR2hHLG9CQUZILENBRXdCOFYsSUFBSW5VLG1CQUY1QixDQURGLEdBSUVxRSxNQUpGOztBQU1BWCxZQUFROUMsV0FBUixDQUFvQixJQUFwQjtBQUNELEdBOUNEOztBQWlEQTtBQUNBOztBQUVBLFdBQVNLLE1BQVQsQ0FBZ0JDLE1BQWhCLEVBQXdCO0FBQ3RCLFdBQU8sS0FBS0MsSUFBTCxDQUFVLFlBQVk7QUFDM0IsVUFBSWpCLFFBQVEvQyxFQUFFLElBQUYsQ0FBWjtBQUNBLFVBQUlpRSxPQUFRbEIsTUFBTWtCLElBQU4sQ0FBVyxRQUFYLENBQVo7O0FBRUEsVUFBSSxDQUFDQSxJQUFMLEVBQVdsQixNQUFNa0IsSUFBTixDQUFXLFFBQVgsRUFBc0JBLE9BQU8sSUFBSStTLEdBQUosQ0FBUSxJQUFSLENBQTdCO0FBQ1gsVUFBSSxPQUFPalQsTUFBUCxJQUFpQixRQUFyQixFQUErQkUsS0FBS0YsTUFBTDtBQUNoQyxLQU5NLENBQVA7QUFPRDs7QUFFRCxNQUFJSSxNQUFNbkUsRUFBRUUsRUFBRixDQUFLa1gsR0FBZjs7QUFFQXBYLElBQUVFLEVBQUYsQ0FBS2tYLEdBQUwsR0FBdUJ0VCxNQUF2QjtBQUNBOUQsSUFBRUUsRUFBRixDQUFLa1gsR0FBTCxDQUFTL1MsV0FBVCxHQUF1QjJTLEdBQXZCOztBQUdBO0FBQ0E7O0FBRUFoWCxJQUFFRSxFQUFGLENBQUtrWCxHQUFMLENBQVM5UyxVQUFULEdBQXNCLFlBQVk7QUFDaEN0RSxNQUFFRSxFQUFGLENBQUtrWCxHQUFMLEdBQVdqVCxHQUFYO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsR0FIRDs7QUFNQTtBQUNBOztBQUVBLE1BQUk2RSxlQUFlLFNBQWZBLFlBQWUsQ0FBVS9HLENBQVYsRUFBYTtBQUM5QkEsTUFBRW1CLGNBQUY7QUFDQVUsV0FBT0ksSUFBUCxDQUFZbEUsRUFBRSxJQUFGLENBQVosRUFBcUIsTUFBckI7QUFDRCxHQUhEOztBQUtBQSxJQUFFTyxRQUFGLEVBQ0dtQyxFQURILENBQ00sdUJBRE4sRUFDK0IscUJBRC9CLEVBQ3NEc0csWUFEdEQsRUFFR3RHLEVBRkgsQ0FFTSx1QkFGTixFQUUrQixzQkFGL0IsRUFFdURzRyxZQUZ2RDtBQUlELENBakpBLENBaUpDbEosTUFqSkQsQ0FBRDs7QUFtSkE7Ozs7Ozs7O0FBU0EsQ0FBQyxVQUFVRSxDQUFWLEVBQWE7QUFDWjs7QUFFQTtBQUNBOztBQUVBLE1BQUlxWCxRQUFRLFNBQVJBLEtBQVEsQ0FBVTdTLE9BQVYsRUFBbUJDLE9BQW5CLEVBQTRCO0FBQ3RDLFNBQUtBLE9BQUwsR0FBZXpFLEVBQUUyRSxNQUFGLENBQVMsRUFBVCxFQUFhMFMsTUFBTXpTLFFBQW5CLEVBQTZCSCxPQUE3QixDQUFmOztBQUVBLFNBQUt5RSxPQUFMLEdBQWVsSixFQUFFLEtBQUt5RSxPQUFMLENBQWF2QyxNQUFmLEVBQ1pRLEVBRFksQ0FDVCwwQkFEUyxFQUNtQjFDLEVBQUVvRixLQUFGLENBQVEsS0FBS2tTLGFBQWIsRUFBNEIsSUFBNUIsQ0FEbkIsRUFFWjVVLEVBRlksQ0FFVCx5QkFGUyxFQUVtQjFDLEVBQUVvRixLQUFGLENBQVEsS0FBS21TLDBCQUFiLEVBQXlDLElBQXpDLENBRm5CLENBQWY7O0FBSUEsU0FBSzdTLFFBQUwsR0FBb0IxRSxFQUFFd0UsT0FBRixDQUFwQjtBQUNBLFNBQUtnVCxPQUFMLEdBQW9CLElBQXBCO0FBQ0EsU0FBS0MsS0FBTCxHQUFvQixJQUFwQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsSUFBcEI7O0FBRUEsU0FBS0osYUFBTDtBQUNELEdBYkQ7O0FBZUFELFFBQU16VSxPQUFOLEdBQWlCLE9BQWpCOztBQUVBeVUsUUFBTU0sS0FBTixHQUFpQiw4QkFBakI7O0FBRUFOLFFBQU16UyxRQUFOLEdBQWlCO0FBQ2Y4TixZQUFRLENBRE87QUFFZnhRLFlBQVFrSDtBQUZPLEdBQWpCOztBQUtBaU8sUUFBTXZVLFNBQU4sQ0FBZ0I4VSxRQUFoQixHQUEyQixVQUFVdEssWUFBVixFQUF3QnFGLE1BQXhCLEVBQWdDa0YsU0FBaEMsRUFBMkNDLFlBQTNDLEVBQXlEO0FBQ2xGLFFBQUl4TCxZQUFlLEtBQUtwRCxPQUFMLENBQWFvRCxTQUFiLEVBQW5CO0FBQ0EsUUFBSXlMLFdBQWUsS0FBS3JULFFBQUwsQ0FBY2dPLE1BQWQsRUFBbkI7QUFDQSxRQUFJc0YsZUFBZSxLQUFLOU8sT0FBTCxDQUFheUosTUFBYixFQUFuQjs7QUFFQSxRQUFJa0YsYUFBYSxJQUFiLElBQXFCLEtBQUtMLE9BQUwsSUFBZ0IsS0FBekMsRUFBZ0QsT0FBT2xMLFlBQVl1TCxTQUFaLEdBQXdCLEtBQXhCLEdBQWdDLEtBQXZDOztBQUVoRCxRQUFJLEtBQUtMLE9BQUwsSUFBZ0IsUUFBcEIsRUFBOEI7QUFDNUIsVUFBSUssYUFBYSxJQUFqQixFQUF1QixPQUFRdkwsWUFBWSxLQUFLbUwsS0FBakIsSUFBMEJNLFNBQVNsRyxHQUFwQyxHQUEyQyxLQUEzQyxHQUFtRCxRQUExRDtBQUN2QixhQUFRdkYsWUFBWTBMLFlBQVosSUFBNEIxSyxlQUFld0ssWUFBNUMsR0FBNEQsS0FBNUQsR0FBb0UsUUFBM0U7QUFDRDs7QUFFRCxRQUFJRyxlQUFpQixLQUFLVCxPQUFMLElBQWdCLElBQXJDO0FBQ0EsUUFBSVUsY0FBaUJELGVBQWUzTCxTQUFmLEdBQTJCeUwsU0FBU2xHLEdBQXpEO0FBQ0EsUUFBSXNHLGlCQUFpQkYsZUFBZUQsWUFBZixHQUE4QnJGLE1BQW5EOztBQUVBLFFBQUlrRixhQUFhLElBQWIsSUFBcUJ2TCxhQUFhdUwsU0FBdEMsRUFBaUQsT0FBTyxLQUFQO0FBQ2pELFFBQUlDLGdCQUFnQixJQUFoQixJQUF5QkksY0FBY0MsY0FBZCxJQUFnQzdLLGVBQWV3SyxZQUE1RSxFQUEyRixPQUFPLFFBQVA7O0FBRTNGLFdBQU8sS0FBUDtBQUNELEdBcEJEOztBQXNCQVQsUUFBTXZVLFNBQU4sQ0FBZ0JzVixlQUFoQixHQUFrQyxZQUFZO0FBQzVDLFFBQUksS0FBS1YsWUFBVCxFQUF1QixPQUFPLEtBQUtBLFlBQVo7QUFDdkIsU0FBS2hULFFBQUwsQ0FBY2pCLFdBQWQsQ0FBMEI0VCxNQUFNTSxLQUFoQyxFQUF1Q3RTLFFBQXZDLENBQWdELE9BQWhEO0FBQ0EsUUFBSWlILFlBQVksS0FBS3BELE9BQUwsQ0FBYW9ELFNBQWIsRUFBaEI7QUFDQSxRQUFJeUwsV0FBWSxLQUFLclQsUUFBTCxDQUFjZ08sTUFBZCxFQUFoQjtBQUNBLFdBQVEsS0FBS2dGLFlBQUwsR0FBb0JLLFNBQVNsRyxHQUFULEdBQWV2RixTQUEzQztBQUNELEdBTkQ7O0FBUUErSyxRQUFNdlUsU0FBTixDQUFnQnlVLDBCQUFoQixHQUE2QyxZQUFZO0FBQ3ZEN1YsZUFBVzFCLEVBQUVvRixLQUFGLENBQVEsS0FBS2tTLGFBQWIsRUFBNEIsSUFBNUIsQ0FBWCxFQUE4QyxDQUE5QztBQUNELEdBRkQ7O0FBSUFELFFBQU12VSxTQUFOLENBQWdCd1UsYUFBaEIsR0FBZ0MsWUFBWTtBQUMxQyxRQUFJLENBQUMsS0FBSzVTLFFBQUwsQ0FBY3ZDLEVBQWQsQ0FBaUIsVUFBakIsQ0FBTCxFQUFtQzs7QUFFbkMsUUFBSXdRLFNBQWUsS0FBS2pPLFFBQUwsQ0FBY2lPLE1BQWQsRUFBbkI7QUFDQSxRQUFJRCxTQUFlLEtBQUtqTyxPQUFMLENBQWFpTyxNQUFoQztBQUNBLFFBQUltRixZQUFlbkYsT0FBT2IsR0FBMUI7QUFDQSxRQUFJaUcsZUFBZXBGLE9BQU9OLE1BQTFCO0FBQ0EsUUFBSTlFLGVBQWVXLEtBQUs4SCxHQUFMLENBQVMvVixFQUFFTyxRQUFGLEVBQVlvUyxNQUFaLEVBQVQsRUFBK0IzUyxFQUFFTyxTQUFTK0ssSUFBWCxFQUFpQnFILE1BQWpCLEVBQS9CLENBQW5COztBQUVBLFFBQUksUUFBT0QsTUFBUCx5Q0FBT0EsTUFBUCxNQUFpQixRQUFyQixFQUF1Q29GLGVBQWVELFlBQVluRixNQUEzQjtBQUN2QyxRQUFJLE9BQU9tRixTQUFQLElBQW9CLFVBQXhCLEVBQXVDQSxZQUFlbkYsT0FBT2IsR0FBUCxDQUFXLEtBQUtuTixRQUFoQixDQUFmO0FBQ3ZDLFFBQUksT0FBT29ULFlBQVAsSUFBdUIsVUFBM0IsRUFBdUNBLGVBQWVwRixPQUFPTixNQUFQLENBQWMsS0FBSzFOLFFBQW5CLENBQWY7O0FBRXZDLFFBQUkyVCxRQUFRLEtBQUtULFFBQUwsQ0FBY3RLLFlBQWQsRUFBNEJxRixNQUE1QixFQUFvQ2tGLFNBQXBDLEVBQStDQyxZQUEvQyxDQUFaOztBQUVBLFFBQUksS0FBS04sT0FBTCxJQUFnQmEsS0FBcEIsRUFBMkI7QUFDekIsVUFBSSxLQUFLWixLQUFMLElBQWMsSUFBbEIsRUFBd0IsS0FBSy9TLFFBQUwsQ0FBYzhJLEdBQWQsQ0FBa0IsS0FBbEIsRUFBeUIsRUFBekI7O0FBRXhCLFVBQUk4SyxZQUFZLFdBQVdELFFBQVEsTUFBTUEsS0FBZCxHQUFzQixFQUFqQyxDQUFoQjtBQUNBLFVBQUlwVyxJQUFZakMsRUFBRXVELEtBQUYsQ0FBUStVLFlBQVksV0FBcEIsQ0FBaEI7O0FBRUEsV0FBSzVULFFBQUwsQ0FBY2xELE9BQWQsQ0FBc0JTLENBQXRCOztBQUVBLFVBQUlBLEVBQUV1QixrQkFBRixFQUFKLEVBQTRCOztBQUU1QixXQUFLZ1UsT0FBTCxHQUFlYSxLQUFmO0FBQ0EsV0FBS1osS0FBTCxHQUFhWSxTQUFTLFFBQVQsR0FBb0IsS0FBS0QsZUFBTCxFQUFwQixHQUE2QyxJQUExRDs7QUFFQSxXQUFLMVQsUUFBTCxDQUNHakIsV0FESCxDQUNlNFQsTUFBTU0sS0FEckIsRUFFR3RTLFFBRkgsQ0FFWWlULFNBRlosRUFHRzlXLE9BSEgsQ0FHVzhXLFVBQVVwVixPQUFWLENBQWtCLE9BQWxCLEVBQTJCLFNBQTNCLElBQXdDLFdBSG5EO0FBSUQ7O0FBRUQsUUFBSW1WLFNBQVMsUUFBYixFQUF1QjtBQUNyQixXQUFLM1QsUUFBTCxDQUFjZ08sTUFBZCxDQUFxQjtBQUNuQmIsYUFBS3ZFLGVBQWVxRixNQUFmLEdBQXdCbUY7QUFEVixPQUFyQjtBQUdEO0FBQ0YsR0F2Q0Q7O0FBMENBO0FBQ0E7O0FBRUEsV0FBU2hVLE1BQVQsQ0FBZ0JDLE1BQWhCLEVBQXdCO0FBQ3RCLFdBQU8sS0FBS0MsSUFBTCxDQUFVLFlBQVk7QUFDM0IsVUFBSWpCLFFBQVUvQyxFQUFFLElBQUYsQ0FBZDtBQUNBLFVBQUlpRSxPQUFVbEIsTUFBTWtCLElBQU4sQ0FBVyxVQUFYLENBQWQ7QUFDQSxVQUFJUSxVQUFVLFFBQU9WLE1BQVAseUNBQU9BLE1BQVAsTUFBaUIsUUFBakIsSUFBNkJBLE1BQTNDOztBQUVBLFVBQUksQ0FBQ0UsSUFBTCxFQUFXbEIsTUFBTWtCLElBQU4sQ0FBVyxVQUFYLEVBQXdCQSxPQUFPLElBQUlvVCxLQUFKLENBQVUsSUFBVixFQUFnQjVTLE9BQWhCLENBQS9CO0FBQ1gsVUFBSSxPQUFPVixNQUFQLElBQWlCLFFBQXJCLEVBQStCRSxLQUFLRixNQUFMO0FBQ2hDLEtBUE0sQ0FBUDtBQVFEOztBQUVELE1BQUlJLE1BQU1uRSxFQUFFRSxFQUFGLENBQUttWSxLQUFmOztBQUVBclksSUFBRUUsRUFBRixDQUFLbVksS0FBTCxHQUF5QnZVLE1BQXpCO0FBQ0E5RCxJQUFFRSxFQUFGLENBQUttWSxLQUFMLENBQVdoVSxXQUFYLEdBQXlCZ1QsS0FBekI7O0FBR0E7QUFDQTs7QUFFQXJYLElBQUVFLEVBQUYsQ0FBS21ZLEtBQUwsQ0FBVy9ULFVBQVgsR0FBd0IsWUFBWTtBQUNsQ3RFLE1BQUVFLEVBQUYsQ0FBS21ZLEtBQUwsR0FBYWxVLEdBQWI7QUFDQSxXQUFPLElBQVA7QUFDRCxHQUhEOztBQU1BO0FBQ0E7O0FBRUFuRSxJQUFFb0osTUFBRixFQUFVMUcsRUFBVixDQUFhLE1BQWIsRUFBcUIsWUFBWTtBQUMvQjFDLE1BQUUsb0JBQUYsRUFBd0JnRSxJQUF4QixDQUE2QixZQUFZO0FBQ3ZDLFVBQUkrUyxPQUFPL1csRUFBRSxJQUFGLENBQVg7QUFDQSxVQUFJaUUsT0FBTzhTLEtBQUs5UyxJQUFMLEVBQVg7O0FBRUFBLFdBQUt5TyxNQUFMLEdBQWN6TyxLQUFLeU8sTUFBTCxJQUFlLEVBQTdCOztBQUVBLFVBQUl6TyxLQUFLNlQsWUFBTCxJQUFxQixJQUF6QixFQUErQjdULEtBQUt5TyxNQUFMLENBQVlOLE1BQVosR0FBcUJuTyxLQUFLNlQsWUFBMUI7QUFDL0IsVUFBSTdULEtBQUs0VCxTQUFMLElBQXFCLElBQXpCLEVBQStCNVQsS0FBS3lPLE1BQUwsQ0FBWWIsR0FBWixHQUFxQjVOLEtBQUs0VCxTQUExQjs7QUFFL0IvVCxhQUFPSSxJQUFQLENBQVk2UyxJQUFaLEVBQWtCOVMsSUFBbEI7QUFDRCxLQVZEO0FBV0QsR0FaRDtBQWNELENBeEpBLENBd0pDbkUsTUF4SkQsQ0FBRDs7Ozs7QUNockVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUMsV0FBVXlZLE9BQVYsRUFBbUI7QUFDaEIsTUFBSSxPQUFPQyxNQUFQLEtBQWtCLFVBQWxCLElBQWdDQSxPQUFPQyxHQUEzQyxFQUFnRDtBQUM1QztBQUNBRCxXQUFPLENBQUMsUUFBRCxDQUFQLEVBQW1CRCxPQUFuQjtBQUNILEdBSEQsTUFHTyxJQUFJLFFBQU9HLE1BQVAseUNBQU9BLE1BQVAsT0FBa0IsUUFBbEIsSUFBOEJBLE9BQU9DLE9BQXpDLEVBQWtEO0FBQ3JEO0FBQ0FELFdBQU9DLE9BQVAsR0FBaUJKLFFBQVFLLFFBQVEsUUFBUixDQUFSLENBQWpCO0FBQ0gsR0FITSxNQUdBO0FBQ0g7QUFDQUwsWUFBUXpZLE1BQVI7QUFDSDtBQUNKLENBWEEsRUFXQyxVQUFVRSxDQUFWLEVBQWE7QUFDWCxNQUFJNlksUUFBUUMsTUFBTWhXLFNBQU4sQ0FBZ0IrVixLQUE1QixDQURXLENBQ3dCO0FBQ25DLE1BQUlFLFNBQVNELE1BQU1oVyxTQUFOLENBQWdCaVcsTUFBN0IsQ0FGVyxDQUUwQjs7QUFFdkMsTUFBSW5JLFdBQVc7QUFDWG9JLGdCQUFZLENBREQ7QUFFWEMsbUJBQWUsQ0FGSjtBQUdYeEssZUFBVyxXQUhBO0FBSVh5SyxzQkFBa0IsZ0JBSlA7QUFLWEMsWUFBUSxLQUxHO0FBTVhDLGtCQUFjLEVBTkg7QUFPWEMsc0JBQWtCLElBUFAsRUFPYTtBQUN4QkMscUJBQWlCLEtBUk47QUFTWEMsWUFBUTtBQVRHLEdBQWY7QUFBQSxNQVdFQyxVQUFVeFosRUFBRW9KLE1BQUYsQ0FYWjtBQUFBLE1BWUVxUSxZQUFZelosRUFBRU8sUUFBRixDQVpkO0FBQUEsTUFhRW1aLFVBQVUsRUFiWjtBQUFBLE1BY0VDLGVBQWVILFFBQVE3RyxNQUFSLEVBZGpCO0FBQUEsTUFlRWlILFdBQVcsU0FBWEEsUUFBVyxHQUFXO0FBQ3BCLFFBQUl0TixZQUFZa04sUUFBUWxOLFNBQVIsRUFBaEI7QUFBQSxRQUNFdU4saUJBQWlCSixVQUFVOUcsTUFBVixFQURuQjtBQUFBLFFBRUVtSCxNQUFNRCxpQkFBaUJGLFlBRnpCO0FBQUEsUUFHRUksUUFBU3pOLFlBQVl3TixHQUFiLEdBQW9CQSxNQUFNeE4sU0FBMUIsR0FBc0MsQ0FIaEQ7O0FBS0EsU0FBSyxJQUFJL0IsSUFBSSxDQUFSLEVBQVd5UCxJQUFJTixRQUFRclcsTUFBNUIsRUFBb0NrSCxJQUFJeVAsQ0FBeEMsRUFBMkN6UCxHQUEzQyxFQUFnRDtBQUM5QyxVQUFJMFAsSUFBSVAsUUFBUW5QLENBQVIsQ0FBUjtBQUFBLFVBQ0UyUCxhQUFhRCxFQUFFRSxhQUFGLENBQWdCekgsTUFBaEIsR0FBeUJiLEdBRHhDO0FBQUEsVUFFRXVJLE9BQU9GLGFBQWFELEVBQUVqQixVQUFmLEdBQTRCZSxLQUZyQzs7QUFJQTtBQUNBRSxRQUFFRSxhQUFGLENBQWdCM00sR0FBaEIsQ0FBb0IsUUFBcEIsRUFBOEJ5TSxFQUFFSSxhQUFGLENBQWdCQyxXQUFoQixFQUE5Qjs7QUFFQSxVQUFJaE8sYUFBYThOLElBQWpCLEVBQXVCO0FBQ3JCLFlBQUlILEVBQUVNLFVBQUYsS0FBaUIsSUFBckIsRUFBMkI7QUFDekJOLFlBQUVJLGFBQUYsQ0FDRzdNLEdBREgsQ0FDTztBQUNILHFCQUFTLEVBRE47QUFFSCx3QkFBWSxFQUZUO0FBR0gsbUJBQU8sRUFISjtBQUlILHVCQUFXO0FBSlIsV0FEUDtBQU9BeU0sWUFBRUksYUFBRixDQUFnQjlTLE1BQWhCLEdBQXlCOUQsV0FBekIsQ0FBcUN3VyxFQUFFeEwsU0FBdkM7QUFDQXdMLFlBQUVJLGFBQUYsQ0FBZ0I3WSxPQUFoQixDQUF3QixZQUF4QixFQUFzQyxDQUFDeVksQ0FBRCxDQUF0QztBQUNBQSxZQUFFTSxVQUFGLEdBQWUsSUFBZjtBQUNEO0FBQ0YsT0FiRCxNQWNLO0FBQ0gsWUFBSUMsU0FBU1gsaUJBQWlCSSxFQUFFSSxhQUFGLENBQWdCQyxXQUFoQixFQUFqQixHQUNUTCxFQUFFakIsVUFETyxHQUNNaUIsRUFBRWhCLGFBRFIsR0FDd0IzTSxTQUR4QixHQUNvQ3lOLEtBRGpEO0FBRUEsWUFBSVMsU0FBUyxDQUFiLEVBQWdCO0FBQ2RBLG1CQUFTQSxTQUFTUCxFQUFFakIsVUFBcEI7QUFDRCxTQUZELE1BRU87QUFDTHdCLG1CQUFTUCxFQUFFakIsVUFBWDtBQUNEO0FBQ0QsWUFBSWlCLEVBQUVNLFVBQUYsS0FBaUJDLE1BQXJCLEVBQTZCO0FBQzNCLGNBQUlDLFFBQUo7QUFDQSxjQUFJUixFQUFFYixZQUFOLEVBQW9CO0FBQ2hCcUIsdUJBQVd6YSxFQUFFaWEsRUFBRWIsWUFBSixFQUFrQi9HLEtBQWxCLE1BQTZCLElBQXhDO0FBQ0gsV0FGRCxNQUVPLElBQUk0SCxFQUFFWixnQkFBTixFQUF3QjtBQUMzQm9CLHVCQUFXUixFQUFFRSxhQUFGLENBQWdCOUgsS0FBaEIsRUFBWDtBQUNIO0FBQ0QsY0FBSW9JLFlBQVksSUFBaEIsRUFBc0I7QUFDbEJBLHVCQUFXUixFQUFFSSxhQUFGLENBQWdCaEksS0FBaEIsRUFBWDtBQUNIO0FBQ0Q0SCxZQUFFSSxhQUFGLENBQ0c3TSxHQURILENBQ08sT0FEUCxFQUNnQmlOLFFBRGhCLEVBRUdqTixHQUZILENBRU8sVUFGUCxFQUVtQixPQUZuQixFQUdHQSxHQUhILENBR08sS0FIUCxFQUdjZ04sTUFIZCxFQUlHaE4sR0FKSCxDQUlPLFNBSlAsRUFJa0J5TSxFQUFFVixNQUpwQjs7QUFNQVUsWUFBRUksYUFBRixDQUFnQjlTLE1BQWhCLEdBQXlCbEMsUUFBekIsQ0FBa0M0VSxFQUFFeEwsU0FBcEM7O0FBRUEsY0FBSXdMLEVBQUVNLFVBQUYsS0FBaUIsSUFBckIsRUFBMkI7QUFDekJOLGNBQUVJLGFBQUYsQ0FBZ0I3WSxPQUFoQixDQUF3QixjQUF4QixFQUF3QyxDQUFDeVksQ0FBRCxDQUF4QztBQUNELFdBRkQsTUFFTztBQUNMO0FBQ0FBLGNBQUVJLGFBQUYsQ0FBZ0I3WSxPQUFoQixDQUF3QixlQUF4QixFQUF5QyxDQUFDeVksQ0FBRCxDQUF6QztBQUNEOztBQUVELGNBQUlBLEVBQUVNLFVBQUYsS0FBaUJOLEVBQUVqQixVQUFuQixJQUFpQ2lCLEVBQUVNLFVBQUYsR0FBZUMsTUFBaEQsSUFBMERQLEVBQUVNLFVBQUYsS0FBaUIsSUFBakIsSUFBeUJDLFNBQVNQLEVBQUVqQixVQUFsRyxFQUE4RztBQUM1RztBQUNBaUIsY0FBRUksYUFBRixDQUFnQjdZLE9BQWhCLENBQXdCLHVCQUF4QixFQUFpRCxDQUFDeVksQ0FBRCxDQUFqRDtBQUNELFdBSEQsTUFHTyxJQUFHQSxFQUFFTSxVQUFGLEtBQWlCLElBQWpCLElBQXlCQyxXQUFXUCxFQUFFakIsVUFBdEMsSUFBb0RpQixFQUFFTSxVQUFGLEdBQWVDLE1BQXRFLEVBQThFO0FBQ25GO0FBQ0FQLGNBQUVJLGFBQUYsQ0FBZ0I3WSxPQUFoQixDQUF3Qix5QkFBeEIsRUFBbUQsQ0FBQ3lZLENBQUQsQ0FBbkQ7QUFDRDs7QUFFREEsWUFBRU0sVUFBRixHQUFlQyxNQUFmO0FBQ0Q7O0FBRUQ7QUFDQSxZQUFJRSx5QkFBeUJULEVBQUVFLGFBQUYsQ0FBZ0I1UyxNQUFoQixFQUE3QjtBQUNBLFlBQUlvVCxVQUFXVixFQUFFSSxhQUFGLENBQWdCM0gsTUFBaEIsR0FBeUJiLEdBQXpCLEdBQStCb0ksRUFBRUksYUFBRixDQUFnQkMsV0FBaEIsRUFBL0IsSUFBZ0VJLHVCQUF1QmhJLE1BQXZCLEdBQWdDYixHQUFoQyxHQUFzQzZJLHVCQUF1QkosV0FBdkIsRUFBdkcsSUFBaUpMLEVBQUVJLGFBQUYsQ0FBZ0IzSCxNQUFoQixHQUF5QmIsR0FBekIsSUFBZ0NvSSxFQUFFakIsVUFBak07O0FBRUEsWUFBSTJCLE9BQUosRUFBYztBQUNaVixZQUFFSSxhQUFGLENBQ0c3TSxHQURILENBQ08sVUFEUCxFQUNtQixVQURuQixFQUVHQSxHQUZILENBRU8sS0FGUCxFQUVjLEVBRmQsRUFHR0EsR0FISCxDQUdPLFFBSFAsRUFHaUIsQ0FIakIsRUFJR0EsR0FKSCxDQUlPLFNBSlAsRUFJa0IsRUFKbEI7QUFLRCxTQU5ELE1BTU87QUFDTHlNLFlBQUVJLGFBQUYsQ0FDRzdNLEdBREgsQ0FDTyxVQURQLEVBQ21CLE9BRG5CLEVBRUdBLEdBRkgsQ0FFTyxLQUZQLEVBRWNnTixNQUZkLEVBR0doTixHQUhILENBR08sUUFIUCxFQUdpQixFQUhqQixFQUlHQSxHQUpILENBSU8sU0FKUCxFQUlrQnlNLEVBQUVWLE1BSnBCO0FBS0Q7QUFDRjtBQUNGO0FBQ0YsR0ExR0g7QUFBQSxNQTJHRXFCLFVBQVUsU0FBVkEsT0FBVSxHQUFXO0FBQ25CakIsbUJBQWVILFFBQVE3RyxNQUFSLEVBQWY7O0FBRUEsU0FBSyxJQUFJcEksSUFBSSxDQUFSLEVBQVd5UCxJQUFJTixRQUFRclcsTUFBNUIsRUFBb0NrSCxJQUFJeVAsQ0FBeEMsRUFBMkN6UCxHQUEzQyxFQUFnRDtBQUM5QyxVQUFJMFAsSUFBSVAsUUFBUW5QLENBQVIsQ0FBUjtBQUNBLFVBQUlrUSxXQUFXLElBQWY7QUFDQSxVQUFJUixFQUFFYixZQUFOLEVBQW9CO0FBQ2hCLFlBQUlhLEVBQUVYLGVBQU4sRUFBdUI7QUFDbkJtQixxQkFBV3phLEVBQUVpYSxFQUFFYixZQUFKLEVBQWtCL0csS0FBbEIsRUFBWDtBQUNIO0FBQ0osT0FKRCxNQUlPLElBQUc0SCxFQUFFWixnQkFBTCxFQUF1QjtBQUMxQm9CLG1CQUFXUixFQUFFRSxhQUFGLENBQWdCOUgsS0FBaEIsRUFBWDtBQUNIO0FBQ0QsVUFBSW9JLFlBQVksSUFBaEIsRUFBc0I7QUFDbEJSLFVBQUVJLGFBQUYsQ0FBZ0I3TSxHQUFoQixDQUFvQixPQUFwQixFQUE2QmlOLFFBQTdCO0FBQ0g7QUFDRjtBQUNGLEdBNUhIO0FBQUEsTUE2SEVJLFVBQVU7QUFDUjFMLFVBQU0sY0FBUzFLLE9BQVQsRUFBa0I7QUFDdEIsVUFBSStQLElBQUl4VSxFQUFFMkUsTUFBRixDQUFTLEVBQVQsRUFBYWlNLFFBQWIsRUFBdUJuTSxPQUF2QixDQUFSO0FBQ0EsYUFBTyxLQUFLVCxJQUFMLENBQVUsWUFBVztBQUMxQixZQUFJcVcsZ0JBQWdCcmEsRUFBRSxJQUFGLENBQXBCOztBQUVBLFlBQUk4YSxXQUFXVCxjQUFjcFgsSUFBZCxDQUFtQixJQUFuQixDQUFmO0FBQ0EsWUFBSThYLFlBQVlELFdBQVdBLFdBQVcsR0FBWCxHQUFpQmxLLFNBQVNzSSxnQkFBckMsR0FBd0R0SSxTQUFTc0ksZ0JBQWpGO0FBQ0EsWUFBSThCLFVBQVVoYixFQUFFLGFBQUYsRUFDWGlELElBRFcsQ0FDTixJQURNLEVBQ0E4WCxTQURBLEVBRVgxVixRQUZXLENBRUZtUCxFQUFFMEUsZ0JBRkEsQ0FBZDs7QUFJQW1CLHNCQUFjWSxPQUFkLENBQXNCRCxPQUF0Qjs7QUFFQSxZQUFJYixnQkFBZ0JFLGNBQWM5UyxNQUFkLEVBQXBCOztBQUVBLFlBQUlpTixFQUFFMkUsTUFBTixFQUFjO0FBQ1pnQix3QkFBYzNNLEdBQWQsQ0FBa0IsRUFBQzZFLE9BQU1nSSxjQUFjYSxVQUFkLEVBQVAsRUFBa0NySSxZQUFXLE1BQTdDLEVBQW9Ec0ksYUFBWSxNQUFoRSxFQUFsQjtBQUNEOztBQUVELFlBQUlkLGNBQWM3TSxHQUFkLENBQWtCLE9BQWxCLE1BQStCLE9BQW5DLEVBQTRDO0FBQzFDNk0sd0JBQWM3TSxHQUFkLENBQWtCLEVBQUMsU0FBUSxNQUFULEVBQWxCLEVBQW9DakcsTUFBcEMsR0FBNkNpRyxHQUE3QyxDQUFpRCxFQUFDLFNBQVEsT0FBVCxFQUFqRDtBQUNEOztBQUVEZ0gsVUFBRTZGLGFBQUYsR0FBa0JBLGFBQWxCO0FBQ0E3RixVQUFFMkYsYUFBRixHQUFrQkEsYUFBbEI7QUFDQTNGLFVBQUUrRixVQUFGLEdBQWtCLElBQWxCOztBQUVBYixnQkFBUWxELElBQVIsQ0FBYWhDLENBQWI7O0FBRUFxRyxnQkFBUU8sZ0JBQVIsQ0FBeUIsSUFBekI7QUFDQVAsZ0JBQVFRLG9CQUFSLENBQTZCLElBQTdCO0FBQ0QsT0E3Qk0sQ0FBUDtBQThCRCxLQWpDTzs7QUFtQ1JELHNCQUFrQiwwQkFBU2YsYUFBVCxFQUF3QjtBQUN4QyxVQUFJN1YsVUFBVXhFLEVBQUVxYSxhQUFGLENBQWQ7QUFDQSxVQUFJRixnQkFBZ0IzVixRQUFRK0MsTUFBUixFQUFwQjtBQUNBLFVBQUk0UyxhQUFKLEVBQW1CO0FBQ2pCQSxzQkFBYzNNLEdBQWQsQ0FBa0IsUUFBbEIsRUFBNEJoSixRQUFROFYsV0FBUixFQUE1QjtBQUNEO0FBQ0YsS0F6Q087O0FBMkNSZSwwQkFBc0IsOEJBQVNoQixhQUFULEVBQXdCO0FBQzVDLFVBQUlqUixPQUFPa1MsZ0JBQVgsRUFBNkI7QUFDM0IsWUFBSUMsbUJBQW1CLElBQUluUyxPQUFPa1MsZ0JBQVgsQ0FBNEIsVUFBU0UsU0FBVCxFQUFvQjtBQUNyRSxjQUFJQSxVQUFVLENBQVYsRUFBYUMsVUFBYixDQUF3QnBZLE1BQXhCLElBQWtDbVksVUFBVSxDQUFWLEVBQWFFLFlBQWIsQ0FBMEJyWSxNQUFoRSxFQUF3RTtBQUN0RXdYLG9CQUFRTyxnQkFBUixDQUF5QmYsYUFBekI7QUFDRDtBQUNGLFNBSnNCLENBQXZCO0FBS0FrQix5QkFBaUJJLE9BQWpCLENBQXlCdEIsYUFBekIsRUFBd0MsRUFBQ3VCLFNBQVMsSUFBVixFQUFnQkMsV0FBVyxJQUEzQixFQUF4QztBQUNELE9BUEQsTUFPTztBQUNMeEIsc0JBQWN5QixnQkFBZCxDQUErQixpQkFBL0IsRUFBa0QsWUFBVztBQUMzRGpCLGtCQUFRTyxnQkFBUixDQUF5QmYsYUFBekI7QUFDRCxTQUZELEVBRUcsS0FGSDtBQUdBQSxzQkFBY3lCLGdCQUFkLENBQStCLGdCQUEvQixFQUFpRCxZQUFXO0FBQzFEakIsa0JBQVFPLGdCQUFSLENBQXlCZixhQUF6QjtBQUNELFNBRkQsRUFFRyxLQUZIO0FBR0Q7QUFDRixLQTNETztBQTREUjBCLFlBQVFuQyxRQTVEQTtBQTZEUmUsYUFBUyxpQkFBU2xXLE9BQVQsRUFBa0I7QUFDekIsYUFBTyxLQUFLVCxJQUFMLENBQVUsWUFBVztBQUMxQixZQUFJb0UsT0FBTyxJQUFYO0FBQ0EsWUFBSTRULGtCQUFrQmhjLEVBQUVvSSxJQUFGLENBQXRCOztBQUVBLFlBQUk2VCxZQUFZLENBQUMsQ0FBakI7QUFDQSxZQUFJMVIsSUFBSW1QLFFBQVFyVyxNQUFoQjtBQUNBLGVBQU9rSCxNQUFNLENBQWIsRUFBZ0I7QUFDZCxjQUFJbVAsUUFBUW5QLENBQVIsRUFBVzhQLGFBQVgsQ0FBeUI2QixHQUF6QixDQUE2QixDQUE3QixNQUFvQzlULElBQXhDLEVBQThDO0FBQzFDMlEsbUJBQU83VSxJQUFQLENBQVl3VixPQUFaLEVBQW9CblAsQ0FBcEIsRUFBc0IsQ0FBdEI7QUFDQTBSLHdCQUFZMVIsQ0FBWjtBQUNIO0FBQ0Y7QUFDRCxZQUFHMFIsY0FBYyxDQUFDLENBQWxCLEVBQXFCO0FBQ25CRCwwQkFBZ0JHLE1BQWhCO0FBQ0FILDBCQUNHeE8sR0FESCxDQUNPO0FBQ0gscUJBQVMsRUFETjtBQUVILHdCQUFZLEVBRlQ7QUFHSCxtQkFBTyxFQUhKO0FBSUgscUJBQVMsRUFKTjtBQUtILHVCQUFXO0FBTFIsV0FEUDtBQVNEO0FBQ0YsT0F4Qk0sQ0FBUDtBQXlCRDtBQXZGTyxHQTdIWjs7QUF1TkE7QUFDQSxNQUFJcEUsT0FBTzBTLGdCQUFYLEVBQTZCO0FBQzNCMVMsV0FBTzBTLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDbEMsUUFBbEMsRUFBNEMsS0FBNUM7QUFDQXhRLFdBQU8wUyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQ2xCLE9BQWxDLEVBQTJDLEtBQTNDO0FBQ0QsR0FIRCxNQUdPLElBQUl4UixPQUFPZ1QsV0FBWCxFQUF3QjtBQUM3QmhULFdBQU9nVCxXQUFQLENBQW1CLFVBQW5CLEVBQStCeEMsUUFBL0I7QUFDQXhRLFdBQU9nVCxXQUFQLENBQW1CLFVBQW5CLEVBQStCeEIsT0FBL0I7QUFDRDs7QUFFRDVhLElBQUVFLEVBQUYsQ0FBS21jLE1BQUwsR0FBYyxVQUFTQyxNQUFULEVBQWlCO0FBQzdCLFFBQUl6QixRQUFReUIsTUFBUixDQUFKLEVBQXFCO0FBQ25CLGFBQU96QixRQUFReUIsTUFBUixFQUFnQmhhLEtBQWhCLENBQXNCLElBQXRCLEVBQTRCdVcsTUFBTTNVLElBQU4sQ0FBVzNCLFNBQVgsRUFBc0IsQ0FBdEIsQ0FBNUIsQ0FBUDtBQUNELEtBRkQsTUFFTyxJQUFJLFFBQU8rWixNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQWxCLElBQThCLENBQUNBLE1BQW5DLEVBQTRDO0FBQ2pELGFBQU96QixRQUFRMUwsSUFBUixDQUFhN00sS0FBYixDQUFvQixJQUFwQixFQUEwQkMsU0FBMUIsQ0FBUDtBQUNELEtBRk0sTUFFQTtBQUNMdkMsUUFBRXVjLEtBQUYsQ0FBUSxZQUFZRCxNQUFaLEdBQXFCLGtDQUE3QjtBQUNEO0FBQ0YsR0FSRDs7QUFVQXRjLElBQUVFLEVBQUYsQ0FBS3lhLE9BQUwsR0FBZSxVQUFTMkIsTUFBVCxFQUFpQjtBQUM5QixRQUFJekIsUUFBUXlCLE1BQVIsQ0FBSixFQUFxQjtBQUNuQixhQUFPekIsUUFBUXlCLE1BQVIsRUFBZ0JoYSxLQUFoQixDQUFzQixJQUF0QixFQUE0QnVXLE1BQU0zVSxJQUFOLENBQVczQixTQUFYLEVBQXNCLENBQXRCLENBQTVCLENBQVA7QUFDRCxLQUZELE1BRU8sSUFBSSxRQUFPK1osTUFBUCx5Q0FBT0EsTUFBUCxPQUFrQixRQUFsQixJQUE4QixDQUFDQSxNQUFuQyxFQUE0QztBQUNqRCxhQUFPekIsUUFBUUYsT0FBUixDQUFnQnJZLEtBQWhCLENBQXVCLElBQXZCLEVBQTZCQyxTQUE3QixDQUFQO0FBQ0QsS0FGTSxNQUVBO0FBQ0x2QyxRQUFFdWMsS0FBRixDQUFRLFlBQVlELE1BQVosR0FBcUIsa0NBQTdCO0FBQ0Q7QUFDRixHQVJEO0FBU0F0YyxJQUFFLFlBQVc7QUFDWDBCLGVBQVdrWSxRQUFYLEVBQXFCLENBQXJCO0FBQ0QsR0FGRDtBQUdELENBclFBLENBQUQ7OztBQ1pBOzs7O0FBSUMsYUFBWTtBQUNYOztBQUVBLE1BQUk0QyxlQUFlLEVBQW5COztBQUVBQSxlQUFhQyxjQUFiLEdBQThCLFVBQVVDLFFBQVYsRUFBb0JyWSxXQUFwQixFQUFpQztBQUM3RCxRQUFJLEVBQUVxWSxvQkFBb0JyWSxXQUF0QixDQUFKLEVBQXdDO0FBQ3RDLFlBQU0sSUFBSXNZLFNBQUosQ0FBYyxtQ0FBZCxDQUFOO0FBQ0Q7QUFDRixHQUpEOztBQU1BSCxlQUFhSSxXQUFiLEdBQTJCLFlBQVk7QUFDckMsYUFBU0MsZ0JBQVQsQ0FBMEIzYSxNQUExQixFQUFrQytRLEtBQWxDLEVBQXlDO0FBQ3ZDLFdBQUssSUFBSTFJLElBQUksQ0FBYixFQUFnQkEsSUFBSTBJLE1BQU01UCxNQUExQixFQUFrQ2tILEdBQWxDLEVBQXVDO0FBQ3JDLFlBQUl1UyxhQUFhN0osTUFBTTFJLENBQU4sQ0FBakI7QUFDQXVTLG1CQUFXQyxVQUFYLEdBQXdCRCxXQUFXQyxVQUFYLElBQXlCLEtBQWpEO0FBQ0FELG1CQUFXRSxZQUFYLEdBQTBCLElBQTFCO0FBQ0EsWUFBSSxXQUFXRixVQUFmLEVBQTJCQSxXQUFXRyxRQUFYLEdBQXNCLElBQXRCO0FBQzNCQyxlQUFPQyxjQUFQLENBQXNCamIsTUFBdEIsRUFBOEI0YSxXQUFXak0sR0FBekMsRUFBOENpTSxVQUE5QztBQUNEO0FBQ0Y7O0FBRUQsV0FBTyxVQUFVelksV0FBVixFQUF1QitZLFVBQXZCLEVBQW1DQyxXQUFuQyxFQUFnRDtBQUNyRCxVQUFJRCxVQUFKLEVBQWdCUCxpQkFBaUJ4WSxZQUFZdkIsU0FBN0IsRUFBd0NzYSxVQUF4QztBQUNoQixVQUFJQyxXQUFKLEVBQWlCUixpQkFBaUJ4WSxXQUFqQixFQUE4QmdaLFdBQTlCO0FBQ2pCLGFBQU9oWixXQUFQO0FBQ0QsS0FKRDtBQUtELEdBaEIwQixFQUEzQjs7QUFrQkFtWTs7QUFFQSxNQUFJYyxhQUFhO0FBQ2ZDLFlBQVEsS0FETztBQUVmQyxZQUFRO0FBRk8sR0FBakI7O0FBS0EsTUFBSUMsU0FBUztBQUNYO0FBQ0E7O0FBRUFDLFdBQU8sU0FBU0EsS0FBVCxDQUFlQyxHQUFmLEVBQW9CO0FBQ3pCLFVBQUlDLFVBQVUsSUFBSUMsTUFBSixDQUFXLHNCQUFzQjtBQUMvQyx5REFEeUIsR0FDNkI7QUFDdEQsbUNBRnlCLEdBRU87QUFDaEMsdUNBSHlCLEdBR1c7QUFDcEMsZ0NBSnlCLEdBSUk7QUFDN0IsMEJBTGMsRUFLUSxHQUxSLENBQWQsQ0FEeUIsQ0FNRzs7QUFFNUIsVUFBSUQsUUFBUTVYLElBQVIsQ0FBYTJYLEdBQWIsQ0FBSixFQUF1QjtBQUNyQixlQUFPLElBQVA7QUFDRCxPQUZELE1BRU87QUFDTCxlQUFPLEtBQVA7QUFDRDtBQUNGLEtBakJVOztBQW9CWDtBQUNBRyxpQkFBYSxTQUFTQSxXQUFULENBQXFCcFosUUFBckIsRUFBK0I7QUFDMUMsV0FBS3FaLFNBQUwsQ0FBZXJaLFFBQWYsRUFBeUIsSUFBekI7QUFDQSxXQUFLcVosU0FBTCxDQUFlclosUUFBZixFQUF5QixPQUF6QjtBQUNBQSxlQUFTYSxVQUFULENBQW9CLE9BQXBCO0FBQ0QsS0F6QlU7QUEwQlh3WSxlQUFXLFNBQVNBLFNBQVQsQ0FBbUJyWixRQUFuQixFQUE2QnNaLFNBQTdCLEVBQXdDO0FBQ2pELFVBQUlDLFlBQVl2WixTQUFTekIsSUFBVCxDQUFjK2EsU0FBZCxDQUFoQjs7QUFFQSxVQUFJLE9BQU9DLFNBQVAsS0FBcUIsUUFBckIsSUFBaUNBLGNBQWMsRUFBL0MsSUFBcURBLGNBQWMsWUFBdkUsRUFBcUY7QUFDbkZ2WixpQkFBU3pCLElBQVQsQ0FBYythLFNBQWQsRUFBeUJDLFVBQVUvYSxPQUFWLENBQWtCLHFCQUFsQixFQUF5QyxVQUFVOGEsU0FBVixHQUFzQixLQUEvRCxDQUF6QjtBQUNEO0FBQ0YsS0FoQ1U7O0FBbUNYO0FBQ0FFLGlCQUFhLFlBQVk7QUFDdkIsVUFBSTVTLE9BQU8vSyxTQUFTK0ssSUFBVCxJQUFpQi9LLFNBQVNxRyxlQUFyQztBQUFBLFVBQ0k3RixRQUFRdUssS0FBS3ZLLEtBRGpCO0FBQUEsVUFFSW9kLFlBQVksS0FGaEI7QUFBQSxVQUdJQyxXQUFXLFlBSGY7O0FBS0EsVUFBSUEsWUFBWXJkLEtBQWhCLEVBQXVCO0FBQ3JCb2Qsb0JBQVksSUFBWjtBQUNELE9BRkQsTUFFTztBQUNMLFNBQUMsWUFBWTtBQUNYLGNBQUlFLFdBQVcsQ0FBQyxLQUFELEVBQVEsUUFBUixFQUFrQixHQUFsQixFQUF1QixJQUF2QixDQUFmO0FBQUEsY0FDSTVKLFNBQVN6VCxTQURiO0FBQUEsY0FFSXVKLElBQUl2SixTQUZSOztBQUlBb2QscUJBQVdBLFNBQVNFLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBbUJDLFdBQW5CLEtBQW1DSCxTQUFTSSxNQUFULENBQWdCLENBQWhCLENBQTlDO0FBQ0FMLHNCQUFZLFlBQVk7QUFDdEIsaUJBQUs1VCxJQUFJLENBQVQsRUFBWUEsSUFBSThULFNBQVNoYixNQUF6QixFQUFpQ2tILEdBQWpDLEVBQXNDO0FBQ3BDa0ssdUJBQVM0SixTQUFTOVQsQ0FBVCxDQUFUO0FBQ0Esa0JBQUlrSyxTQUFTMkosUUFBVCxJQUFxQnJkLEtBQXpCLEVBQWdDO0FBQzlCLHVCQUFPLElBQVA7QUFDRDtBQUNGOztBQUVELG1CQUFPLEtBQVA7QUFDRCxXQVRXLEVBQVo7QUFVQXFkLHFCQUFXRCxZQUFZLE1BQU0xSixPQUFPZ0ssV0FBUCxFQUFOLEdBQTZCLEdBQTdCLEdBQW1DTCxTQUFTSyxXQUFULEVBQS9DLEdBQXdFLElBQW5GO0FBQ0QsU0FqQkQ7QUFrQkQ7O0FBRUQsYUFBTztBQUNMTixtQkFBV0EsU0FETjtBQUVMQyxrQkFBVUE7QUFGTCxPQUFQO0FBSUQsS0FqQ1k7QUFwQ0YsR0FBYjs7QUF3RUEsTUFBSU0sTUFBTTVlLE1BQVY7O0FBRUEsTUFBSTZlLHFCQUFxQixnQkFBekI7QUFDQSxNQUFJQyxhQUFhLE1BQWpCO0FBQ0EsTUFBSUMsY0FBYyxPQUFsQjtBQUNBLE1BQUlDLHFCQUFxQixpRkFBekI7QUFDQSxNQUFJQyxPQUFPLFlBQVk7QUFDckIsYUFBU0EsSUFBVCxDQUFjamUsSUFBZCxFQUFvQjtBQUNsQjBiLG1CQUFhQyxjQUFiLENBQTRCLElBQTVCLEVBQWtDc0MsSUFBbEM7O0FBRUEsV0FBS2plLElBQUwsR0FBWUEsSUFBWjtBQUNBLFdBQUt3RyxJQUFMLEdBQVlvWCxJQUFJLE1BQU01ZCxJQUFWLENBQVo7QUFDQSxXQUFLa2UsU0FBTCxHQUFpQmxlLFNBQVMsTUFBVCxHQUFrQixXQUFsQixHQUFnQyxlQUFlQSxJQUFmLEdBQXNCLE9BQXZFO0FBQ0EsV0FBS21lLFNBQUwsR0FBaUIsS0FBSzNYLElBQUwsQ0FBVTRULFVBQVYsQ0FBcUIsSUFBckIsQ0FBakI7QUFDQSxXQUFLZ0UsS0FBTCxHQUFhLEtBQUs1WCxJQUFMLENBQVVyRCxJQUFWLENBQWUsT0FBZixDQUFiO0FBQ0EsV0FBS2tiLElBQUwsR0FBWSxLQUFLN1gsSUFBTCxDQUFVckQsSUFBVixDQUFlLE1BQWYsQ0FBWjtBQUNBLFdBQUttYixRQUFMLEdBQWdCLEtBQUs5WCxJQUFMLENBQVVyRCxJQUFWLENBQWUsVUFBZixDQUFoQjtBQUNBLFdBQUtvYixNQUFMLEdBQWMsS0FBSy9YLElBQUwsQ0FBVXJELElBQVYsQ0FBZSxRQUFmLENBQWQ7QUFDQSxXQUFLcVksTUFBTCxHQUFjLEtBQUtoVixJQUFMLENBQVVyRCxJQUFWLENBQWUsUUFBZixDQUFkO0FBQ0EsV0FBS3FiLGNBQUwsR0FBc0IsS0FBS2hZLElBQUwsQ0FBVXJELElBQVYsQ0FBZSxRQUFmLENBQXRCO0FBQ0EsV0FBS3NiLGVBQUwsR0FBdUIsS0FBS2pZLElBQUwsQ0FBVXJELElBQVYsQ0FBZSxTQUFmLENBQXZCO0FBQ0EsV0FBS3ViLGlCQUFMLEdBQXlCLEtBQUtsWSxJQUFMLENBQVVyRCxJQUFWLENBQWUsV0FBZixDQUF6QjtBQUNBLFdBQUt3YixrQkFBTCxHQUEwQixLQUFLblksSUFBTCxDQUFVckQsSUFBVixDQUFlLFlBQWYsQ0FBMUI7QUFDQSxXQUFLcUgsSUFBTCxHQUFZb1QsSUFBSSxLQUFLcFgsSUFBTCxDQUFVckQsSUFBVixDQUFlLE1BQWYsQ0FBSixDQUFaO0FBQ0Q7O0FBRUR1WSxpQkFBYUksV0FBYixDQUF5Qm1DLElBQXpCLEVBQStCLENBQUM7QUFDOUJsTyxXQUFLLGNBRHlCO0FBRTlCQyxhQUFPLFNBQVM0TyxZQUFULENBQXNCNVcsTUFBdEIsRUFBOEJ0RSxPQUE5QixFQUF1QztBQUM1QyxZQUFJNEssWUFBWSxFQUFoQjtBQUFBLFlBQ0k5SixPQUFPLEtBQUs2WixJQURoQjs7QUFHQSxZQUFJclcsV0FBVyxNQUFYLElBQXFCdEUsWUFBWSxNQUFyQyxFQUE2QztBQUMzQzRLLG9CQUFVOUosSUFBVixJQUFrQixLQUFLMlosU0FBTCxHQUFpQixJQUFuQztBQUNELFNBRkQsTUFFTyxJQUFJblcsV0FBVyxPQUFYLElBQXNCdEUsWUFBWSxNQUF0QyxFQUE4QztBQUNuRDRLLG9CQUFVOUosSUFBVixJQUFrQixNQUFNLEtBQUsyWixTQUFYLEdBQXVCLElBQXpDO0FBQ0QsU0FGTSxNQUVBO0FBQ0w3UCxvQkFBVTlKLElBQVYsSUFBa0IsQ0FBbEI7QUFDRDs7QUFFRCxlQUFPOEosU0FBUDtBQUNEO0FBZjZCLEtBQUQsRUFnQjVCO0FBQ0R5QixXQUFLLGFBREo7QUFFREMsYUFBTyxTQUFTNk8sV0FBVCxDQUFxQjdXLE1BQXJCLEVBQTZCO0FBQ2xDLFlBQUl4RCxPQUFPd0QsV0FBVyxNQUFYLEdBQW9CLFFBQXBCLEdBQStCLEVBQTFDOztBQUVBO0FBQ0EsWUFBSSxLQUFLd0MsSUFBTCxDQUFVbkosRUFBVixDQUFhLE1BQWIsQ0FBSixFQUEwQjtBQUN4QixjQUFJeWQsUUFBUWxCLElBQUksTUFBSixDQUFaO0FBQUEsY0FDSXBTLFlBQVlzVCxNQUFNdFQsU0FBTixFQURoQjs7QUFHQXNULGdCQUFNcFMsR0FBTixDQUFVLFlBQVYsRUFBd0JsSSxJQUF4QixFQUE4QmdILFNBQTlCLENBQXdDQSxTQUF4QztBQUNEO0FBQ0Y7QUFaQSxLQWhCNEIsRUE2QjVCO0FBQ0R1RSxXQUFLLFVBREo7QUFFREMsYUFBTyxTQUFTK08sUUFBVCxHQUFvQjtBQUN6QixZQUFJLEtBQUtULFFBQVQsRUFBbUI7QUFDakIsY0FBSWxCLGNBQWNULE9BQU9TLFdBQXpCO0FBQUEsY0FDSTdTLFFBQVEsS0FBS0MsSUFEakI7O0FBR0EsY0FBSTRTLFlBQVlDLFNBQWhCLEVBQTJCO0FBQ3pCOVMsa0JBQU1tQyxHQUFOLENBQVUwUSxZQUFZRSxRQUF0QixFQUFnQyxLQUFLZSxJQUFMLEdBQVksR0FBWixHQUFrQixLQUFLRCxLQUFMLEdBQWEsSUFBL0IsR0FBc0MsSUFBdEMsR0FBNkMsS0FBS0csTUFBbEYsRUFBMEY3UixHQUExRixDQUE4RixLQUFLMlIsSUFBbkcsRUFBeUcsQ0FBekcsRUFBNEczUixHQUE1RyxDQUFnSDtBQUM5RzZFLHFCQUFPaEgsTUFBTWdILEtBQU4sRUFEdUc7QUFFOUcwRix3QkFBVTtBQUZvRyxhQUFoSDtBQUlBMU0sa0JBQU1tQyxHQUFOLENBQVUsS0FBSzJSLElBQWYsRUFBcUIsS0FBS0YsU0FBTCxHQUFpQixJQUF0QztBQUNELFdBTkQsTUFNTztBQUNMLGdCQUFJYSxnQkFBZ0IsS0FBS0osWUFBTCxDQUFrQmQsVUFBbEIsRUFBOEIsTUFBOUIsQ0FBcEI7O0FBRUF2VCxrQkFBTW1DLEdBQU4sQ0FBVTtBQUNSNkUscUJBQU9oSCxNQUFNZ0gsS0FBTixFQURDO0FBRVIwRix3QkFBVTtBQUZGLGFBQVYsRUFHRy9LLE9BSEgsQ0FHVzhTLGFBSFgsRUFHMEI7QUFDeEJDLHFCQUFPLEtBRGlCO0FBRXhCNWUsd0JBQVUsS0FBSytkO0FBRlMsYUFIMUI7QUFPRDtBQUNGO0FBQ0Y7QUF6QkEsS0E3QjRCLEVBdUQ1QjtBQUNEck8sV0FBSyxhQURKO0FBRURDLGFBQU8sU0FBU2tQLFdBQVQsR0FBdUI7QUFDNUIsWUFBSTlCLGNBQWNULE9BQU9TLFdBQXpCO0FBQUEsWUFDSStCLGNBQWM7QUFDaEI1TixpQkFBTyxFQURTO0FBRWhCMEYsb0JBQVUsRUFGTTtBQUdoQi9KLGlCQUFPLEVBSFM7QUFJaEJHLGdCQUFNO0FBSlUsU0FEbEI7O0FBUUEsWUFBSStQLFlBQVlDLFNBQWhCLEVBQTJCO0FBQ3pCOEIsc0JBQVkvQixZQUFZRSxRQUF4QixJQUFvQyxFQUFwQztBQUNEOztBQUVELGFBQUs5UyxJQUFMLENBQVVrQyxHQUFWLENBQWN5UyxXQUFkLEVBQTJCQyxNQUEzQixDQUFrQ3BCLGtCQUFsQztBQUNEO0FBaEJBLEtBdkQ0QixFQXdFNUI7QUFDRGpPLFdBQUssV0FESjtBQUVEQyxhQUFPLFNBQVNxUCxTQUFULEdBQXFCO0FBQzFCLFlBQUlDLFFBQVEsSUFBWjs7QUFFQSxZQUFJLEtBQUtoQixRQUFULEVBQW1CO0FBQ2pCLGNBQUkzQixPQUFPUyxXQUFQLENBQW1CQyxTQUF2QixFQUFrQztBQUNoQyxpQkFBSzdTLElBQUwsQ0FBVWtDLEdBQVYsQ0FBYyxLQUFLMlIsSUFBbkIsRUFBeUIsQ0FBekIsRUFBNEI3ZCxHQUE1QixDQUFnQ3dkLGtCQUFoQyxFQUFvRCxZQUFZO0FBQzlEc0Isb0JBQU1KLFdBQU47QUFDRCxhQUZEO0FBR0QsV0FKRCxNQUlPO0FBQ0wsZ0JBQUlGLGdCQUFnQixLQUFLSixZQUFMLENBQWtCYixXQUFsQixFQUErQixNQUEvQixDQUFwQjs7QUFFQSxpQkFBS3ZULElBQUwsQ0FBVTBCLE9BQVYsQ0FBa0I4UyxhQUFsQixFQUFpQztBQUMvQkMscUJBQU8sS0FEd0I7QUFFL0I1ZSx3QkFBVSxLQUFLK2QsS0FGZ0I7QUFHL0JoVix3QkFBVSxTQUFTQSxRQUFULEdBQW9CO0FBQzVCa1csc0JBQU1KLFdBQU47QUFDRDtBQUw4QixhQUFqQztBQU9EO0FBQ0Y7QUFDRjtBQXRCQSxLQXhFNEIsRUErRjVCO0FBQ0RuUCxXQUFLLFVBREo7QUFFREMsYUFBTyxTQUFTdVAsUUFBVCxDQUFrQnZYLE1BQWxCLEVBQTBCO0FBQy9CLFlBQUlBLFdBQVc4VixVQUFmLEVBQTJCO0FBQ3pCLGVBQUtpQixRQUFMO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsZUFBS00sU0FBTDtBQUNEO0FBQ0Y7QUFSQSxLQS9GNEIsRUF3RzVCO0FBQ0R0UCxXQUFLLFlBREo7QUFFREMsYUFBTyxTQUFTd1AsVUFBVCxDQUFvQi9lLFFBQXBCLEVBQThCO0FBQ25DLFlBQUlULE9BQU8sS0FBS0EsSUFBaEI7O0FBRUF3YyxtQkFBV0MsTUFBWCxHQUFvQixLQUFwQjtBQUNBRCxtQkFBV0UsTUFBWCxHQUFvQjFjLElBQXBCOztBQUVBLGFBQUt3RyxJQUFMLENBQVU0WSxNQUFWLENBQWlCcEIsa0JBQWpCOztBQUVBLGFBQUt4VCxJQUFMLENBQVU3SCxXQUFWLENBQXNCa2Isa0JBQXRCLEVBQTBDdFosUUFBMUMsQ0FBbUQsS0FBSzJaLFNBQXhEOztBQUVBLGFBQUtRLGlCQUFMOztBQUVBLFlBQUksT0FBT2plLFFBQVAsS0FBb0IsVUFBeEIsRUFBb0M7QUFDbENBLG1CQUFTVCxJQUFUO0FBQ0Q7QUFDRjtBQWpCQSxLQXhHNEIsRUEwSDVCO0FBQ0QrUCxXQUFLLFVBREo7QUFFREMsYUFBTyxTQUFTeVAsUUFBVCxDQUFrQmhmLFFBQWxCLEVBQTRCO0FBQ2pDLFlBQUlpZixTQUFTLElBQWI7O0FBRUEsWUFBSUMsUUFBUSxLQUFLblosSUFBakI7O0FBRUEsWUFBSW1XLE9BQU9TLFdBQVAsQ0FBbUJDLFNBQXZCLEVBQWtDO0FBQ2hDc0MsZ0JBQU1qVCxHQUFOLENBQVUsS0FBSzJSLElBQWYsRUFBcUIsQ0FBckIsRUFBd0I3ZCxHQUF4QixDQUE0QndkLGtCQUE1QixFQUFnRCxZQUFZO0FBQzFEMEIsbUJBQU9GLFVBQVAsQ0FBa0IvZSxRQUFsQjtBQUNELFdBRkQ7QUFHRCxTQUpELE1BSU87QUFDTCxjQUFJbWYsZ0JBQWdCLEtBQUtoQixZQUFMLENBQWtCZCxVQUFsQixFQUE4QixNQUE5QixDQUFwQjs7QUFFQTZCLGdCQUFNalQsR0FBTixDQUFVLFNBQVYsRUFBcUIsT0FBckIsRUFBOEJSLE9BQTlCLENBQXNDMFQsYUFBdEMsRUFBcUQ7QUFDbkRYLG1CQUFPLEtBRDRDO0FBRW5ENWUsc0JBQVUsS0FBSytkLEtBRm9DO0FBR25EaFYsc0JBQVUsU0FBU0EsUUFBVCxHQUFvQjtBQUM1QnNXLHFCQUFPRixVQUFQLENBQWtCL2UsUUFBbEI7QUFDRDtBQUxrRCxXQUFyRDtBQU9EO0FBQ0Y7QUF0QkEsS0ExSDRCLEVBaUo1QjtBQUNEc1AsV0FBSyxhQURKO0FBRURDLGFBQU8sU0FBUzZQLFdBQVQsQ0FBcUJwZixRQUFyQixFQUErQjtBQUNwQyxhQUFLK0YsSUFBTCxDQUFVa0csR0FBVixDQUFjO0FBQ1pXLGdCQUFNLEVBRE07QUFFWkgsaUJBQU87QUFGSyxTQUFkLEVBR0drUyxNQUhILENBR1VwQixrQkFIVjtBQUlBSixZQUFJLE1BQUosRUFBWWxSLEdBQVosQ0FBZ0IsWUFBaEIsRUFBOEIsRUFBOUI7O0FBRUE4UCxtQkFBV0MsTUFBWCxHQUFvQixLQUFwQjtBQUNBRCxtQkFBV0UsTUFBWCxHQUFvQixLQUFwQjs7QUFFQSxhQUFLbFMsSUFBTCxDQUFVN0gsV0FBVixDQUFzQmtiLGtCQUF0QixFQUEwQ2xiLFdBQTFDLENBQXNELEtBQUt1YixTQUEzRDs7QUFFQSxhQUFLUyxrQkFBTDs7QUFFQTtBQUNBLFlBQUksT0FBT2xlLFFBQVAsS0FBb0IsVUFBeEIsRUFBb0M7QUFDbENBLG1CQUFTVCxJQUFUO0FBQ0Q7QUFDRjtBQXBCQSxLQWpKNEIsRUFzSzVCO0FBQ0QrUCxXQUFLLFdBREo7QUFFREMsYUFBTyxTQUFTOFAsU0FBVCxDQUFtQnJmLFFBQW5CLEVBQTZCO0FBQ2xDLFlBQUlzZixTQUFTLElBQWI7O0FBRUEsWUFBSXZaLE9BQU8sS0FBS0EsSUFBaEI7O0FBRUEsWUFBSW1XLE9BQU9TLFdBQVAsQ0FBbUJDLFNBQXZCLEVBQWtDO0FBQ2hDN1csZUFBS2tHLEdBQUwsQ0FBUyxLQUFLMlIsSUFBZCxFQUFvQixFQUFwQixFQUF3QjdkLEdBQXhCLENBQTRCd2Qsa0JBQTVCLEVBQWdELFlBQVk7QUFDMUQrQixtQkFBT0YsV0FBUCxDQUFtQnBmLFFBQW5CO0FBQ0QsV0FGRDtBQUdELFNBSkQsTUFJTztBQUNMLGNBQUltZixnQkFBZ0IsS0FBS2hCLFlBQUwsQ0FBa0JiLFdBQWxCLEVBQStCLE1BQS9CLENBQXBCOztBQUVBdlgsZUFBSzBGLE9BQUwsQ0FBYTBULGFBQWIsRUFBNEI7QUFDMUJYLG1CQUFPLEtBRG1CO0FBRTFCNWUsc0JBQVUsS0FBSytkLEtBRlc7QUFHMUJoVixzQkFBVSxTQUFTQSxRQUFULEdBQW9CO0FBQzVCMlcscUJBQU9GLFdBQVA7QUFDRDtBQUx5QixXQUE1QjtBQU9EO0FBQ0Y7QUF0QkEsS0F0SzRCLEVBNkw1QjtBQUNEOVAsV0FBSyxVQURKO0FBRURDLGFBQU8sU0FBU2dRLFFBQVQsQ0FBa0JoWSxNQUFsQixFQUEwQnZILFFBQTFCLEVBQW9DO0FBQ3pDLGFBQUsrSixJQUFMLENBQVVqRyxRQUFWLENBQW1Cc1osa0JBQW5COztBQUVBLFlBQUk3VixXQUFXOFYsVUFBZixFQUEyQjtBQUN6QixlQUFLMkIsUUFBTCxDQUFjaGYsUUFBZDtBQUNELFNBRkQsTUFFTztBQUNMLGVBQUtxZixTQUFMLENBQWVyZixRQUFmO0FBQ0Q7QUFDRjtBQVZBLEtBN0w0QixFQXdNNUI7QUFDRHNQLFdBQUssTUFESjtBQUVEQyxhQUFPLFNBQVNpUSxJQUFULENBQWNqWSxNQUFkLEVBQXNCdkgsUUFBdEIsRUFBZ0M7QUFDckM7QUFDQStiLG1CQUFXQyxNQUFYLEdBQW9CLElBQXBCOztBQUVBLGFBQUtvQyxXQUFMLENBQWlCN1csTUFBakI7QUFDQSxhQUFLdVgsUUFBTCxDQUFjdlgsTUFBZDtBQUNBLGFBQUtnWSxRQUFMLENBQWNoWSxNQUFkLEVBQXNCdkgsUUFBdEI7QUFDRDtBQVRBLEtBeE00QixFQWtONUI7QUFDRHNQLFdBQUssTUFESjtBQUVEQyxhQUFPLFNBQVNrUSxJQUFULENBQWN6ZixRQUFkLEVBQXdCO0FBQzdCLFlBQUkwZixTQUFTLElBQWI7O0FBRUE7QUFDQSxZQUFJM0QsV0FBV0UsTUFBWCxLQUFzQixLQUFLMWMsSUFBM0IsSUFBbUN3YyxXQUFXQyxNQUFsRCxFQUEwRDtBQUN4RDtBQUNEOztBQUVEO0FBQ0EsWUFBSUQsV0FBV0UsTUFBWCxLQUFzQixLQUExQixFQUFpQztBQUMvQixjQUFJMEQsb0JBQW9CLElBQUluQyxJQUFKLENBQVN6QixXQUFXRSxNQUFwQixDQUF4Qjs7QUFFQTBELDRCQUFrQnZlLEtBQWxCLENBQXdCLFlBQVk7QUFDbENzZSxtQkFBT0QsSUFBUCxDQUFZemYsUUFBWjtBQUNELFdBRkQ7O0FBSUE7QUFDRDs7QUFFRCxhQUFLd2YsSUFBTCxDQUFVLE1BQVYsRUFBa0J4ZixRQUFsQjs7QUFFQTtBQUNBLGFBQUsrZCxjQUFMO0FBQ0Q7QUF6QkEsS0FsTjRCLEVBNE81QjtBQUNEek8sV0FBSyxPQURKO0FBRURDLGFBQU8sU0FBU25PLEtBQVQsQ0FBZXBCLFFBQWYsRUFBeUI7QUFDOUI7QUFDQSxZQUFJK2IsV0FBV0UsTUFBWCxLQUFzQixLQUFLMWMsSUFBM0IsSUFBbUN3YyxXQUFXQyxNQUFsRCxFQUEwRDtBQUN4RDtBQUNEOztBQUVELGFBQUt3RCxJQUFMLENBQVUsT0FBVixFQUFtQnhmLFFBQW5COztBQUVBO0FBQ0EsYUFBS2dlLGVBQUw7QUFDRDtBQVpBLEtBNU80QixFQXlQNUI7QUFDRDFPLFdBQUssUUFESjtBQUVEQyxhQUFPLFNBQVN0TCxNQUFULENBQWdCakUsUUFBaEIsRUFBMEI7QUFDL0IsWUFBSStiLFdBQVdFLE1BQVgsS0FBc0IsS0FBSzFjLElBQS9CLEVBQXFDO0FBQ25DLGVBQUs2QixLQUFMLENBQVdwQixRQUFYO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsZUFBS3lmLElBQUwsQ0FBVXpmLFFBQVY7QUFDRDtBQUNGO0FBUkEsS0F6UDRCLENBQS9CO0FBbVFBLFdBQU93ZCxJQUFQO0FBQ0QsR0F4UlUsRUFBWDs7QUEwUkEsTUFBSW9DLE1BQU1yaEIsTUFBVjs7QUFFQSxXQUFTc2hCLE9BQVQsQ0FBaUJ0WSxNQUFqQixFQUF5QmhJLElBQXpCLEVBQStCUyxRQUEvQixFQUF5QztBQUN2QyxRQUFJOGYsT0FBTyxJQUFJdEMsSUFBSixDQUFTamUsSUFBVCxDQUFYOztBQUVBLFlBQVFnSSxNQUFSO0FBQ0UsV0FBSyxNQUFMO0FBQ0V1WSxhQUFLTCxJQUFMLENBQVV6ZixRQUFWO0FBQ0E7QUFDRixXQUFLLE9BQUw7QUFDRThmLGFBQUsxZSxLQUFMLENBQVdwQixRQUFYO0FBQ0E7QUFDRixXQUFLLFFBQUw7QUFDRThmLGFBQUs3YixNQUFMLENBQVlqRSxRQUFaO0FBQ0E7QUFDRjtBQUNFNGYsWUFBSTVFLEtBQUosQ0FBVSxZQUFZelQsTUFBWixHQUFxQixnQ0FBL0I7QUFDQTtBQVpKO0FBY0Q7O0FBRUQsTUFBSXlCLENBQUo7QUFDQSxNQUFJdkssSUFBSUYsTUFBUjtBQUNBLE1BQUl3aEIsZ0JBQWdCLENBQUMsTUFBRCxFQUFTLE9BQVQsRUFBa0IsUUFBbEIsQ0FBcEI7QUFDQSxNQUFJQyxVQUFKO0FBQ0EsTUFBSTFHLFVBQVUsRUFBZDtBQUNBLE1BQUkyRyxZQUFZLFNBQVNBLFNBQVQsQ0FBbUJELFVBQW5CLEVBQStCO0FBQzdDLFdBQU8sVUFBVXpnQixJQUFWLEVBQWdCUyxRQUFoQixFQUEwQjtBQUMvQjtBQUNBLFVBQUksT0FBT1QsSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM5QlMsbUJBQVdULElBQVg7QUFDQUEsZUFBTyxNQUFQO0FBQ0QsT0FIRCxNQUdPLElBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ2hCQSxlQUFPLE1BQVA7QUFDRDs7QUFFRHNnQixjQUFRRyxVQUFSLEVBQW9CemdCLElBQXBCLEVBQTBCUyxRQUExQjtBQUNELEtBVkQ7QUFXRCxHQVpEO0FBYUEsT0FBS2dKLElBQUksQ0FBVCxFQUFZQSxJQUFJK1csY0FBY2plLE1BQTlCLEVBQXNDa0gsR0FBdEMsRUFBMkM7QUFDekNnWCxpQkFBYUQsY0FBYy9XLENBQWQsQ0FBYjtBQUNBc1EsWUFBUTBHLFVBQVIsSUFBc0JDLFVBQVVELFVBQVYsQ0FBdEI7QUFDRDs7QUFFRCxXQUFTRixJQUFULENBQWMvRSxNQUFkLEVBQXNCO0FBQ3BCLFFBQUlBLFdBQVcsUUFBZixFQUF5QjtBQUN2QixhQUFPZ0IsVUFBUDtBQUNELEtBRkQsTUFFTyxJQUFJekMsUUFBUXlCLE1BQVIsQ0FBSixFQUFxQjtBQUMxQixhQUFPekIsUUFBUXlCLE1BQVIsRUFBZ0JoYSxLQUFoQixDQUFzQixJQUF0QixFQUE0QndXLE1BQU1oVyxTQUFOLENBQWdCK1YsS0FBaEIsQ0FBc0IzVSxJQUF0QixDQUEyQjNCLFNBQTNCLEVBQXNDLENBQXRDLENBQTVCLENBQVA7QUFDRCxLQUZNLE1BRUEsSUFBSSxPQUFPK1osTUFBUCxLQUFrQixVQUFsQixJQUFnQyxPQUFPQSxNQUFQLEtBQWtCLFFBQWxELElBQThELENBQUNBLE1BQW5FLEVBQTJFO0FBQ2hGLGFBQU96QixRQUFRclYsTUFBUixDQUFlbEQsS0FBZixDQUFxQixJQUFyQixFQUEyQkMsU0FBM0IsQ0FBUDtBQUNELEtBRk0sTUFFQTtBQUNMdkMsUUFBRXVjLEtBQUYsQ0FBUSxZQUFZRCxNQUFaLEdBQXFCLGdDQUE3QjtBQUNEO0FBQ0Y7O0FBRUQsTUFBSW1GLE1BQU0zaEIsTUFBVjs7QUFFQSxXQUFTNGhCLFdBQVQsQ0FBcUJDLFNBQXJCLEVBQWdDQyxRQUFoQyxFQUEwQztBQUN4QztBQUNBLFFBQUksT0FBT0EsU0FBU0MsTUFBaEIsS0FBMkIsVUFBL0IsRUFBMkM7QUFDekMsVUFBSUMsYUFBYUYsU0FBU0MsTUFBVCxDQUFnQi9nQixJQUFoQixDQUFqQjs7QUFFQTZnQixnQkFBVWxTLElBQVYsQ0FBZXFTLFVBQWY7QUFDRCxLQUpELE1BSU8sSUFBSSxPQUFPRixTQUFTQyxNQUFoQixLQUEyQixRQUEzQixJQUF1Q3BFLE9BQU9DLEtBQVAsQ0FBYWtFLFNBQVNDLE1BQXRCLENBQTNDLEVBQTBFO0FBQy9FSixVQUFJdkYsR0FBSixDQUFRMEYsU0FBU0MsTUFBakIsRUFBeUIsVUFBVTVkLElBQVYsRUFBZ0I7QUFDdkMwZCxrQkFBVWxTLElBQVYsQ0FBZXhMLElBQWY7QUFDRCxPQUZEO0FBR0QsS0FKTSxNQUlBLElBQUksT0FBTzJkLFNBQVNDLE1BQWhCLEtBQTJCLFFBQS9CLEVBQXlDO0FBQzlDLFVBQUlFLGNBQWMsRUFBbEI7QUFBQSxVQUNJQyxZQUFZSixTQUFTQyxNQUFULENBQWdCemhCLEtBQWhCLENBQXNCLEdBQXRCLENBRGhCOztBQUdBcWhCLFVBQUl6ZCxJQUFKLENBQVNnZSxTQUFULEVBQW9CLFVBQVV2YSxLQUFWLEVBQWlCakQsT0FBakIsRUFBMEI7QUFDNUN1ZCx1QkFBZSw2QkFBNkJOLElBQUlqZCxPQUFKLEVBQWFpTCxJQUFiLEVBQTdCLEdBQW1ELFFBQWxFO0FBQ0QsT0FGRDs7QUFJQTtBQUNBLFVBQUltUyxTQUFTSyxRQUFiLEVBQXVCO0FBQ3JCLFlBQUlDLGVBQWVULElBQUksU0FBSixFQUFlaFMsSUFBZixDQUFvQnNTLFdBQXBCLENBQW5COztBQUVBRyxxQkFBYXZjLElBQWIsQ0FBa0IsR0FBbEIsRUFBdUIzQixJQUF2QixDQUE0QixVQUFVeUQsS0FBVixFQUFpQmpELE9BQWpCLEVBQTBCO0FBQ3BELGNBQUlFLFdBQVcrYyxJQUFJamQsT0FBSixDQUFmOztBQUVBaVosaUJBQU9LLFdBQVAsQ0FBbUJwWixRQUFuQjtBQUNELFNBSkQ7QUFLQXFkLHNCQUFjRyxhQUFhelMsSUFBYixFQUFkO0FBQ0Q7O0FBRURrUyxnQkFBVWxTLElBQVYsQ0FBZXNTLFdBQWY7QUFDRCxLQXJCTSxNQXFCQSxJQUFJSCxTQUFTQyxNQUFULEtBQW9CLElBQXhCLEVBQThCO0FBQ25DSixVQUFJbEYsS0FBSixDQUFVLHFCQUFWO0FBQ0Q7O0FBRUQsV0FBT29GLFNBQVA7QUFDRDs7QUFFRCxXQUFTUSxNQUFULENBQWdCMWQsT0FBaEIsRUFBeUI7QUFDdkIsUUFBSXlaLGNBQWNULE9BQU9TLFdBQXpCO0FBQUEsUUFDSTBELFdBQVdILElBQUk5YyxNQUFKLENBQVc7QUFDeEI3RCxZQUFNLE1BRGtCLEVBQ1Y7QUFDZG9lLGFBQU8sR0FGaUIsRUFFWjtBQUNaQyxZQUFNLE1BSGtCLEVBR1Y7QUFDZDBDLGNBQVEsSUFKZ0IsRUFJVjtBQUNkSSxnQkFBVSxJQUxjLEVBS1I7QUFDaEIzVyxZQUFNLE1BTmtCLEVBTVY7QUFDZDhULGdCQUFVLElBUGMsRUFPUjtBQUNoQkMsY0FBUSxNQVJnQixFQVFSO0FBQ2hCL0MsY0FBUSxRQVRnQixFQVNOO0FBQ2xCOEYsWUFBTSxrQkFWa0IsRUFVRTtBQUMxQkMsY0FBUSxTQUFTQSxNQUFULEdBQWtCLENBQUUsQ0FYSjtBQVl4QjtBQUNBQyxlQUFTLFNBQVNBLE9BQVQsR0FBbUIsQ0FBRSxDQWJOO0FBY3hCO0FBQ0FDLGlCQUFXLFNBQVNBLFNBQVQsR0FBcUIsQ0FBRSxDQWZWO0FBZ0J4QjtBQUNBQyxrQkFBWSxTQUFTQSxVQUFULEdBQXNCLENBQUUsQ0FqQlosQ0FpQmE7O0FBakJiLEtBQVgsRUFtQlovZCxPQW5CWSxDQURmO0FBQUEsUUFxQkkzRCxPQUFPOGdCLFNBQVM5Z0IsSUFyQnBCO0FBQUEsUUFzQkk2Z0IsWUFBWUYsSUFBSSxNQUFNM2dCLElBQVYsQ0F0QmhCOztBQXdCQTtBQUNBLFFBQUk2Z0IsVUFBVXRlLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUJzZSxrQkFBWUYsSUFBSSxTQUFKLEVBQWV4ZSxJQUFmLENBQW9CLElBQXBCLEVBQTBCbkMsSUFBMUIsRUFBZ0N1TCxRQUFoQyxDQUF5Q29WLElBQUksTUFBSixDQUF6QyxDQUFaO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFJdkQsWUFBWUMsU0FBaEIsRUFBMkI7QUFDekJ3RCxnQkFBVW5VLEdBQVYsQ0FBYzBRLFlBQVlFLFFBQTFCLEVBQW9Dd0QsU0FBU3pDLElBQVQsR0FBZ0IsR0FBaEIsR0FBc0J5QyxTQUFTMUMsS0FBVCxHQUFpQixJQUF2QyxHQUE4QyxJQUE5QyxHQUFxRDBDLFNBQVN2QyxNQUFsRztBQUNEOztBQUVEO0FBQ0FzQyxjQUFVdGMsUUFBVixDQUFtQixNQUFuQixFQUEyQkEsUUFBM0IsQ0FBb0N1YyxTQUFTekMsSUFBN0MsRUFBbURsYixJQUFuRCxDQUF3RDtBQUN0RGliLGFBQU8wQyxTQUFTMUMsS0FEc0M7QUFFdERDLFlBQU15QyxTQUFTekMsSUFGdUM7QUFHdEQ3VCxZQUFNc1csU0FBU3RXLElBSHVDO0FBSXREOFQsZ0JBQVV3QyxTQUFTeEMsUUFKbUM7QUFLdERDLGNBQVF1QyxTQUFTdkMsTUFMcUM7QUFNdEQvQyxjQUFRc0YsU0FBU3RGLE1BTnFDO0FBT3REK0YsY0FBUVQsU0FBU1MsTUFQcUM7QUFRdERDLGVBQVNWLFNBQVNVLE9BUm9DO0FBU3REQyxpQkFBV1gsU0FBU1csU0FUa0M7QUFVdERDLGtCQUFZWixTQUFTWTtBQVZpQyxLQUF4RDs7QUFhQWIsZ0JBQVlELFlBQVlDLFNBQVosRUFBdUJDLFFBQXZCLENBQVo7O0FBRUEsV0FBTyxLQUFLNWQsSUFBTCxDQUFVLFlBQVk7QUFDM0IsVUFBSWpCLFFBQVEwZSxJQUFJLElBQUosQ0FBWjtBQUFBLFVBQ0l4ZCxPQUFPbEIsTUFBTWtCLElBQU4sQ0FBVyxNQUFYLENBRFg7QUFBQSxVQUVJd2UsT0FBTyxLQUZYOztBQUlBO0FBQ0EsVUFBSSxDQUFDeGUsSUFBTCxFQUFXO0FBQ1RxWixtQkFBV0MsTUFBWCxHQUFvQixLQUFwQjtBQUNBRCxtQkFBV0UsTUFBWCxHQUFvQixLQUFwQjs7QUFFQXphLGNBQU1rQixJQUFOLENBQVcsTUFBWCxFQUFtQm5ELElBQW5COztBQUVBaUMsY0FBTXFmLElBQU4sQ0FBV1IsU0FBU1EsSUFBcEIsRUFBMEIsVUFBVXpnQixLQUFWLEVBQWlCO0FBQ3pDQSxnQkFBTXlCLGNBQU47O0FBRUEsY0FBSSxDQUFDcWYsSUFBTCxFQUFXO0FBQ1RBLG1CQUFPLElBQVA7QUFDQXBCLGlCQUFLTyxTQUFTdEYsTUFBZCxFQUFzQnhiLElBQXRCOztBQUVBWSx1QkFBVyxZQUFZO0FBQ3JCK2dCLHFCQUFPLEtBQVA7QUFDRCxhQUZELEVBRUcsR0FGSDtBQUdEO0FBQ0YsU0FYRDtBQVlEO0FBQ0YsS0F6Qk0sQ0FBUDtBQTBCRDs7QUFFRDNpQixTQUFPdWhCLElBQVAsR0FBY0EsSUFBZDtBQUNBdmhCLFNBQU9JLEVBQVAsQ0FBVW1oQixJQUFWLEdBQWlCYyxNQUFqQjtBQUVELENBOWpCQSxHQUFEOzs7QUNKQTs7Ozs7Ozs7Ozs7OztBQWFBLENBQUUsV0FBU25pQixDQUFULEVBQVk7QUFDWkEsSUFBRUUsRUFBRixDQUFLd2lCLFNBQUwsR0FBaUIsVUFBU2plLE9BQVQsRUFBa0I7QUFDakMsUUFBSWtlLFVBQVUsSUFBZDtBQUFBLFFBQ0kvUixXQUFXLEVBQUNnUyxXQUFVLENBQVgsRUFEZjtBQUFBLFFBRUloQixXQUFXNWhCLEVBQUUyRSxNQUFGLENBQVMsRUFBVCxFQUFhaU0sUUFBYixFQUF1Qm5NLE9BQXZCLENBRmY7QUFBQSxRQUdJbWUsU0FISjs7QUFLQTtBQUNBLFFBQUduZSxXQUFXQSxRQUFRbWUsU0FBdEIsRUFDRUEsWUFBWW5lLFFBQVFtZSxTQUFwQixDQURGLEtBR0VBLFlBQVksQ0FBWjs7QUFFRixXQUFPRCxRQUFRM2UsSUFBUixDQUFhLFlBQVc7QUFDN0IsVUFBSTZlLFNBQVM3aUIsRUFBRSxJQUFGLENBQWI7QUFDQSxVQUFJNmlCLE9BQU9oZixRQUFQLENBQWdCLFlBQWhCLENBQUosRUFBbUM7QUFDakM7QUFDRDtBQUNELFVBQUlpZixZQUFZOWlCLEVBQUUsSUFBRixFQUFRc0YsSUFBUixDQUFhLE9BQWIsQ0FBaEI7QUFDQSxVQUFJeWQsY0FBYy9pQixFQUFFLGFBQUYsQ0FBbEI7QUFDQSxVQUFJLE9BQU80aEIsU0FBU29CLE9BQWhCLEtBQTRCLFdBQWhDLEVBQTZDRCxZQUFZMWQsUUFBWixDQUFxQnVjLFNBQVNvQixPQUE5QjtBQUM3QyxVQUFJQyxTQUFTLEVBQWI7QUFDQSxVQUFJQyxRQUFKLEVBQWNDLE9BQWQsRUFBdUJDLFVBQXZCLEVBQW1DQyxVQUFuQyxFQUErQ0MsUUFBL0M7O0FBRUFULGFBQU94ZCxRQUFQLENBQWdCLHVCQUFoQjs7QUFFQTZkLGlCQUFXTCxPQUFPbGQsSUFBUCxDQUFZLFVBQVosRUFBd0I0ZCxLQUF4QixFQUFYO0FBQ0FKLGdCQUFVTixPQUFPbGQsSUFBUCxDQUFZLG1DQUFaLEVBQWlEc0MsRUFBakQsQ0FBb0QsQ0FBcEQsQ0FBVjs7QUFFQTtBQUNBNGEsYUFBT1csUUFBUCxHQUFrQkMsTUFBbEIsQ0FBeUIsYUFBekIsRUFBd0M3ZixNQUF4Qzs7QUFFQTtBQUNBaWYsYUFBT2xkLElBQVAsQ0FBWSxXQUFaLEVBQXlCM0IsSUFBekIsQ0FBOEIsWUFBVzs7QUFFdkM7QUFDQW9mLHFCQUFhLEVBQWI7QUFDQUMscUJBQWEsRUFBYjtBQUNBQyxtQkFBV3RqQixFQUFFLElBQUYsRUFBUXNGLElBQVIsQ0FBYSxPQUFiLENBQVg7QUFDQTtBQUNBO0FBQ0E7QUFDQXRGLFVBQUUsSUFBRixFQUFRMkYsSUFBUixDQUFhLFNBQWIsRUFBd0IzQixJQUF4QixDQUE2QixVQUFTMGYsU0FBVCxFQUFvQjtBQUMvQyxjQUFJMWpCLEVBQUUsSUFBRixFQUFReVAsSUFBUixPQUFtQixFQUF2QixFQUEwQjtBQUN4QjRULDBCQUFjLGdCQUFnQkMsUUFBaEIsR0FBMEIsSUFBeEM7QUFDQSxnQkFBSUgsUUFBUXhkLElBQVIsQ0FBYSxTQUFiLEVBQXdCc0MsRUFBeEIsQ0FBMkJ5YixTQUEzQixFQUFzQ2pVLElBQXRDLEVBQUosRUFBaUQ7QUFDL0M0VCw0QkFBYyx3QkFBc0JGLFFBQVF4ZCxJQUFSLENBQWEsU0FBYixFQUF3QnNDLEVBQXhCLENBQTJCeWIsU0FBM0IsRUFBc0NqVSxJQUF0QyxFQUF0QixHQUFtRSxPQUFqRjtBQUNELGFBRkQsTUFFTztBQUNMNFQsNEJBQWMsMEJBQWQ7QUFDRDtBQUNEQSwwQkFBYyx1QkFBcUJyakIsRUFBRSxJQUFGLEVBQVFzRixJQUFSLENBQWEsT0FBYixDQUFyQixHQUE2QyxJQUE3QyxHQUFrRHRGLEVBQUUsSUFBRixFQUFReVAsSUFBUixFQUFsRCxHQUFpRSxPQUEvRTtBQUNBNFQsMEJBQWMsT0FBZDtBQUNEO0FBQ0YsU0FYRDs7QUFhQUosa0JBQVUsb0JBQW1CSCxTQUFuQixHQUE4QixpQ0FBOUIsR0FBa0VNLFVBQWxFLEdBQStFQyxVQUEvRSxHQUE0RixrQkFBdEc7QUFDRCxPQXZCRDs7QUF5QkFSLGFBQU9sZCxJQUFQLENBQVksY0FBWixFQUE0QjNCLElBQTVCLENBQWlDLFVBQVMyZixRQUFULEVBQWtCN1MsS0FBbEIsRUFBeUI7QUFDeEQsWUFBSTlRLEVBQUU0akIsSUFBRixDQUFPNWpCLEVBQUU4USxLQUFGLEVBQVMrUyxJQUFULEVBQVAsTUFBNEIsRUFBaEMsRUFBb0M7QUFDbENaLG9CQUFVLG1CQUFrQkgsU0FBbEIsR0FBOEIseUNBQTlCLEdBQTBFOWlCLEVBQUU4USxLQUFGLEVBQVNyQixJQUFULEVBQTFFLEdBQTRGLDRCQUF0RztBQUNEO0FBQ0YsT0FKRDs7QUFNQXNULGtCQUFZZSxPQUFaLENBQW9CWixRQUFwQjtBQUNBSCxrQkFBWXJVLE1BQVosQ0FBbUIxTyxFQUFFaWpCLE1BQUYsQ0FBbkI7QUFDQUosYUFBT2tCLE1BQVAsQ0FBY2hCLFdBQWQ7QUFDRCxLQXRETSxDQUFQO0FBdURELEdBbkVEOztBQXFFQS9pQixJQUFFRSxFQUFGLENBQUs4akIsVUFBTCxHQUFrQixVQUFTdmYsT0FBVCxFQUFrQjtBQUNsQyxRQUFJa2UsVUFBVSxJQUFkO0FBQUEsUUFDSS9SLFdBQVcsRUFBQ2dTLFdBQVUsQ0FBWCxFQUFhcUIsZUFBYyxJQUEzQixFQURmO0FBQUEsUUFFSXJDLFdBQVc1aEIsRUFBRTJFLE1BQUYsQ0FBUyxFQUFULEVBQWFpTSxRQUFiLEVBQXVCbk0sT0FBdkIsQ0FGZjtBQUFBLFFBR0ltZSxTQUhKOztBQUtBO0FBQ0EsUUFBR25lLFdBQVdBLFFBQVFtZSxTQUF0QixFQUNFQSxZQUFZbmUsUUFBUW1lLFNBQXBCLENBREYsS0FHRUEsWUFBWSxDQUFaOztBQUVGLFdBQU9ELFFBQVEzZSxJQUFSLENBQWEsWUFBVztBQUM3QixVQUFJOGUsWUFBWTlpQixFQUFFLElBQUYsRUFBUXNGLElBQVIsQ0FBYSxPQUFiLENBQWhCO0FBQ0EsVUFBSXlkLGNBQWMvaUIsRUFBRSxtQkFBa0I4aUIsU0FBbEIsR0FBNkIsaURBQS9CLENBQWxCO0FBQ0EsVUFBSSxPQUFPbEIsU0FBU29CLE9BQWhCLEtBQTRCLFdBQWhDLEVBQTZDRCxZQUFZMWQsUUFBWixDQUFxQnVjLFNBQVNvQixPQUE5QjtBQUM3QyxVQUFJQyxTQUFTLEVBQWI7QUFDQSxVQUFJSixNQUFKLEVBQVlLLFFBQVosRUFBc0JDLE9BQXRCLEVBQStCQyxVQUEvQixFQUEyQ0MsVUFBM0MsRUFBdURDLFFBQXZELEVBQWlFVyxhQUFqRTs7QUFFQXBCLGVBQVM3aUIsRUFBRSxJQUFGLENBQVQ7QUFDQTZpQixhQUFPeGQsUUFBUCxDQUFnQix1QkFBaEI7QUFDQTZkLGlCQUFXTCxPQUFPbGQsSUFBUCxDQUFZLFVBQVosRUFBd0I0ZCxLQUF4QixFQUFYO0FBQ0FKLGdCQUFVTixPQUFPbGQsSUFBUCxDQUFZLCtCQUFaLEVBQTZDc0MsRUFBN0MsQ0FBZ0QsQ0FBaEQsQ0FBVjs7QUFFQWdjLHNCQUFnQnBCLE9BQU81ZSxJQUFQLENBQVksZ0JBQVosTUFBa0NqRCxTQUFsQyxHQUE4QzRnQixTQUFTcUMsYUFBdkQsR0FBdUVwQixPQUFPNWUsSUFBUCxDQUFZLGdCQUFaLENBQXZGOztBQUVBO0FBQ0E0ZSxhQUFPbGQsSUFBUCxDQUFZLHNCQUFaLEVBQW9DM0IsSUFBcEMsQ0FBeUMsVUFBUzJmLFFBQVQsRUFBbUI7O0FBRTFEO0FBQ0FQLHFCQUFhLEVBQWI7QUFDQUMscUJBQWEsRUFBYjtBQUNBQyxtQkFBV3RqQixFQUFFLElBQUYsRUFBUXNGLElBQVIsQ0FBYSxPQUFiLENBQVg7O0FBRUE7QUFDQSxZQUFJcWUsYUFBYSxDQUFqQixFQUFvQjtBQUNsQjtBQUNBLGNBQUlNLGFBQUosRUFBbUI7QUFDakJoQixzQkFBVSxpQkFBZUssUUFBZixHQUF5QiwwREFBekIsR0FBb0Z0akIsRUFBRSxJQUFGLEVBQVEyRixJQUFSLENBQWEsU0FBYixFQUF3QnNDLEVBQXhCLENBQTJCMmEsU0FBM0IsRUFBc0NuVCxJQUF0QyxFQUFwRixHQUFpSSxZQUEzSTtBQUNEO0FBQ0YsU0FMRCxNQUtPO0FBQ0w7QUFDQTtBQUNBelAsWUFBRSxJQUFGLEVBQVEyRixJQUFSLENBQWEsU0FBYixFQUF3QjNCLElBQXhCLENBQTZCLFVBQVMwZixTQUFULEVBQW9CO0FBQy9DLGdCQUFJQSxjQUFjZCxTQUFsQixFQUE2QjtBQUMzQlEsMkJBQWEsZ0JBQWVFLFFBQWYsR0FBd0Isd0NBQXhCLEdBQWlFdGpCLEVBQUUsSUFBRixFQUFReVAsSUFBUixFQUFqRSxHQUFnRixZQUE3RjtBQUNELGFBRkQsTUFFTztBQUNMLGtCQUFJelAsRUFBRSxJQUFGLEVBQVF5UCxJQUFSLE9BQW1CLEVBQXZCLEVBQTBCO0FBQ3hCNFQsOEJBQWMsZ0JBQWdCQyxRQUFoQixHQUEwQixJQUF4QztBQUNBLG9CQUFJSCxRQUFReGQsSUFBUixDQUFhLFNBQWIsRUFBd0JzQyxFQUF4QixDQUEyQnliLFNBQTNCLEVBQXNDalUsSUFBdEMsRUFBSixFQUFpRDtBQUMvQzRULGdDQUFjLHdCQUFzQkYsUUFBUXhkLElBQVIsQ0FBYSxTQUFiLEVBQXdCc0MsRUFBeEIsQ0FBMkJ5YixTQUEzQixFQUFzQ2pVLElBQXRDLEVBQXRCLEdBQW1FLE9BQWpGO0FBQ0QsaUJBRkQsTUFFTztBQUNMNFQsZ0NBQWMsMEJBQWQ7QUFDRDtBQUNEQSw4QkFBYyx1QkFBcUJyakIsRUFBRSxJQUFGLEVBQVFzRixJQUFSLENBQWEsT0FBYixDQUFyQixHQUE2QyxJQUE3QyxHQUFrRHRGLEVBQUUsSUFBRixFQUFReVAsSUFBUixFQUFsRCxHQUFpRSxPQUEvRTtBQUNBNFQsOEJBQWMsT0FBZDtBQUNEO0FBQ0Y7QUFDRixXQWZEOztBQWlCQUosb0JBQVVHLGFBQWFDLFVBQXZCO0FBQ0Q7QUFDRixPQW5DRDs7QUFxQ0FOLGtCQUFZZSxPQUFaLENBQW9CWixRQUFwQjtBQUNBSCxrQkFBWXJVLE1BQVosQ0FBbUIxTyxFQUFFaWpCLE1BQUYsQ0FBbkI7QUFDQUosYUFBT2tCLE1BQVAsQ0FBY2hCLFdBQWQ7QUFDRCxLQXZETSxDQUFQO0FBd0RELEdBcEVEOztBQXNFRC9pQixJQUFFRSxFQUFGLENBQUtna0IsWUFBTCxHQUFvQixVQUFTemYsT0FBVCxFQUFrQjtBQUNuQyxRQUFJa2UsVUFBVSxJQUFkO0FBQUEsUUFDSS9SLFdBQVcsRUFEZjtBQUFBLFFBRUlnUixXQUFXNWhCLEVBQUUyRSxNQUFGLENBQVMsRUFBVCxFQUFhaU0sUUFBYixFQUF1Qm5NLE9BQXZCLENBRmY7O0FBSUEsV0FBT2tlLFFBQVEzZSxJQUFSLENBQWEsWUFBVztBQUM3QixVQUFJNmUsU0FBUzdpQixFQUFFLElBQUYsQ0FBYjtBQUNBLFVBQUlrakIsV0FBV0wsT0FBT2xkLElBQVAsQ0FBWSxVQUFaLEVBQXdCNGQsS0FBeEIsRUFBZjtBQUNBLFVBQUlZLFdBQVd0QixPQUFPbGQsSUFBUCxDQUFZLCtCQUFaLEVBQTZDc0MsRUFBN0MsQ0FBZ0QsQ0FBaEQsRUFBbUR0QyxJQUFuRCxDQUF3RCxTQUF4RCxFQUFtRXRDLE1BQWxGLENBSDZCLENBRzZEO0FBQzFGLFVBQUc4Z0IsV0FBUyxDQUFaLEVBQWU7QUFDYjs7QUFFRixVQUFJQyxnQkFBZ0Jwa0IsRUFBRSwrQ0FBRixDQUFwQjtBQUNBLFVBQUksT0FBTzRoQixTQUFTb0IsT0FBaEIsS0FBNEIsV0FBaEMsRUFBNkNvQixjQUFjL2UsUUFBZCxDQUF1QnVjLFNBQVNvQixPQUFoQztBQUM3Q0gsYUFBT3hkLFFBQVAsQ0FBZ0IsdUJBQWhCO0FBQ0EsVUFBSWdmLEtBQUtya0IsRUFBRSxpQkFBRixDQUFUO0FBQ0EsVUFBSXNrQixRQUFRLENBQVosQ0FYNkIsQ0FXZDs7QUFFZixhQUFPQSxRQUFRSCxRQUFmLEVBQXlCO0FBQ3ZCdEIsZUFBT2xkLElBQVAsQ0FBWSwrQkFBWixFQUE2QzNCLElBQTdDLENBQWtELFVBQVN5RCxLQUFULEVBQWdCO0FBQ2hFLGNBQUk4YyxNQUFNdmtCLEVBQUUsV0FBRixDQUFWLENBRGdFLENBQ3RDO0FBQzFCLGNBQUd5SCxVQUFVLENBQWIsRUFBZ0I4YyxJQUFJbGYsUUFBSixDQUFhLDhCQUFiO0FBQ2hCLGNBQUlVLFFBQVEvRixFQUFFLElBQUYsRUFBUTJGLElBQVIsQ0FBYSxTQUFiLEVBQXdCc0MsRUFBeEIsQ0FBMkIsQ0FBM0IsRUFBOEJzYixLQUE5QixHQUFzQ2xlLFFBQXRDLENBQStDLFFBQS9DLENBQVo7QUFDQSxjQUFJbkQsU0FBU29pQixLQUFiO0FBQ0E7QUFDQSxjQUFJdGtCLEVBQUUsSUFBRixFQUFRMkYsSUFBUixDQUFhLFlBQWIsRUFBMkJ0QyxNQUEvQixFQUF1QztBQUNyQyxnQkFBSWtILElBQUcsQ0FBUDtBQUNBdkssY0FBRSxJQUFGLEVBQVEyRixJQUFSLENBQWEsU0FBYixFQUF3QjNCLElBQXhCLENBQTZCLFlBQVc7QUFDcEMsa0JBQUl3Z0IsS0FBS3hrQixFQUFFLElBQUYsRUFBUWlELElBQVIsQ0FBYSxTQUFiLENBQVQ7QUFDQSxrQkFBSXVoQixFQUFKLEVBQVE7QUFDTkEscUJBQUtqVyxTQUFTaVcsRUFBVCxFQUFhLEVBQWIsQ0FBTDtBQUNBdGlCLDBCQUFVc2lCLEtBQUcsQ0FBYjtBQUNBLG9CQUFLamEsSUFBRWlhLEVBQUgsR0FBVUYsS0FBZCxFQUFzQjtBQUNwQnBpQiw0QkFBVXFJLElBQUlpYSxFQUFKLEdBQVNGLEtBQVQsR0FBZ0IsQ0FBMUI7QUFDRi9aLHFCQUFLaWEsRUFBTDtBQUNELGVBTkQsTUFNTztBQUNMamE7QUFDRDs7QUFFRCxrQkFBSUEsSUFBSStaLEtBQVIsRUFDRSxPQUFPLEtBQVAsQ0Fia0MsQ0FhcEI7QUFDbkIsYUFkRDtBQWVEO0FBQ0QsY0FBSUcsU0FBU3prQixFQUFFLElBQUYsRUFBUTJGLElBQVIsQ0FBYSxTQUFiLEVBQXdCc0MsRUFBeEIsQ0FBMkIvRixNQUEzQixFQUFtQ3FoQixLQUFuQyxHQUEyQ2xlLFFBQTNDLENBQW9ELFFBQXBELEVBQThERSxVQUE5RCxDQUF5RSxTQUF6RSxDQUFiO0FBQ0FnZixjQUFJN1YsTUFBSixDQUFXM0ksS0FBWCxFQUFrQjBlLE1BQWxCO0FBQ0FKLGFBQUczVixNQUFILENBQVU2VixHQUFWO0FBQ0QsU0EzQkQ7QUE0QkEsVUFBRUQsS0FBRjtBQUNEOztBQUVERixvQkFBYzFWLE1BQWQsQ0FBcUIxTyxFQUFFcWtCLEVBQUYsQ0FBckI7QUFDQUQsb0JBQWNOLE9BQWQsQ0FBc0JaLFFBQXRCO0FBQ0FMLGFBQU9rQixNQUFQLENBQWNLLGFBQWQ7QUFDRCxLQWhETSxDQUFQO0FBaURELEdBdERGO0FBd0RBLENBcE1DLEVBb01BdGtCLE1BcE1BLENBQUQ7Ozs7O0FDYkQ7OztBQUdDLFdBQVNzSixNQUFULEVBQWlCbVAsT0FBakIsRUFBMEI7QUFDdkIsUUFBSSxPQUFPQyxNQUFQLEtBQWtCLFVBQWxCLElBQWdDQSxPQUFPQyxHQUEzQyxFQUFnRDtBQUM1Q0QsZUFBTyxDQUFDLFFBQUQsQ0FBUCxFQUFtQixVQUFTeFksQ0FBVCxFQUFZO0FBQzNCLG1CQUFPdVksUUFBUW5QLE1BQVIsRUFBZ0JwSixDQUFoQixDQUFQO0FBQ0gsU0FGRDtBQUdILEtBSkQsTUFJTyxJQUFJLFFBQU8wWSxNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQWxCLElBQThCLFFBQU9BLE9BQU9DLE9BQWQsTUFBMEIsUUFBNUQsRUFBc0U7QUFDekVELGVBQU9DLE9BQVAsR0FBaUJKLFFBQVFuUCxNQUFSLEVBQWdCd1AsUUFBUSxRQUFSLENBQWhCLENBQWpCO0FBQ0gsS0FGTSxNQUVBO0FBQ0h4UCxlQUFPc2IsSUFBUCxHQUFjbk0sUUFBUW5QLE1BQVIsRUFBZ0JBLE9BQU90SixNQUFQLElBQWlCc0osT0FBT3ViLEtBQXhDLENBQWQ7QUFDSDtBQUNKLENBVkEsRUFVQyxPQUFPdmIsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0EsTUFBaEMsWUFWRCxFQVVnRCxVQUFTQSxNQUFULEVBQWlCcEosQ0FBakIsRUFBb0I7QUFDakU7O0FBRUEsUUFBSU8sV0FBVzZJLE9BQU83SSxRQUF0Qjs7QUFFQSxRQUFJcWtCLE9BQU81a0IsRUFBRW9KLE1BQUYsQ0FBWDtBQUNBLFFBQUl5YixZQUFZN2tCLEVBQUU4a0IsUUFBbEI7QUFDQSxRQUFJQyxRQUFRL2tCLEVBQUUsTUFBRixDQUFaO0FBQ0EsUUFBSWdsQixhQUFhLEVBQWpCOztBQUVBLFFBQUlDLGtCQUFrQixhQUF0QjtBQUNBLFFBQUlDLGtCQUFrQixVQUFVRCxlQUFoQzs7QUFFQSxRQUFJRSw2QkFBNkIsdUxBQWpDOztBQUVBLFFBQUlDLGtCQUFrQjtBQUNsQkMsYUFBSyxJQURhO0FBRWxCaGpCLGlCQUFTLElBRlM7QUFHbEJpakIsa0JBQVU7QUFDTkMsbUJBQU9DLFlBREQ7QUFFTkMsb0JBQVFDLGFBRkY7QUFHTkMscUJBQVNDLGNBSEg7QUFJTkMsbUJBQU9DLFlBSkQ7QUFLTkMsd0JBQVlDLGlCQUxOO0FBTU5DLDJCQUFlQyxvQkFOVDtBQU9OQyxvQkFBUUM7QUFQRixTQUhRO0FBWWxCOVcsa0JBQVU7QUFaUSxLQUF0Qjs7QUFlQSxRQUFJK1csZUFBZSxzRUFBbkI7QUFDQSxRQUFJQyxnQkFBZ0Isc0ZBQXBCO0FBQ0EsUUFBSUMsY0FBZSw4Q0FBbkI7QUFDQSxRQUFJQyxtQkFBbUIseURBQXZCO0FBQ0EsUUFBSUMsc0JBQXNCLHlEQUExQjs7QUFFQSxRQUFJQyxzQkFBdUIsWUFBVztBQUNsQyxZQUFJcG1CLEtBQUtDLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBVDs7QUFFQSxZQUFJQyxxQkFBcUI7QUFDckJDLDhCQUFrQixxQkFERztBQUVyQkMsMkJBQWUsZUFGTTtBQUdyQkMseUJBQWEsK0JBSFE7QUFJckJDLHdCQUFZO0FBSlMsU0FBekI7O0FBT0EsYUFBSyxJQUFJQyxJQUFULElBQWlCTCxrQkFBakIsRUFBcUM7QUFDakMsZ0JBQUlILEdBQUdTLEtBQUgsQ0FBU0QsSUFBVCxNQUFtQkUsU0FBdkIsRUFBa0M7QUFDOUIsdUJBQU9QLG1CQUFtQkssSUFBbkIsQ0FBUDtBQUNIO0FBQ0o7O0FBRUQsZUFBTyxLQUFQO0FBQ0gsS0FqQnlCLEVBQTFCOztBQW1CQSxhQUFTVCxhQUFULENBQXVCbUUsT0FBdkIsRUFBZ0M7QUFDNUIsWUFBSW1pQixXQUFXOUIsV0FBZjs7QUFFQSxZQUFJLENBQUM2QixtQkFBRCxJQUF3QixDQUFDbGlCLFFBQVFuQixNQUFyQyxFQUE2QztBQUN6Q3NqQixxQkFBU0MsT0FBVDtBQUNILFNBRkQsTUFFTztBQUNIcGlCLG9CQUFRbEQsR0FBUixDQUFZb2xCLG1CQUFaLEVBQWlDQyxTQUFTQyxPQUExQztBQUNBbGxCLHVCQUFXaWxCLFNBQVNDLE9BQXBCLEVBQTZCLEdBQTdCO0FBQ0g7O0FBRUQsZUFBT0QsU0FBU0UsT0FBVCxFQUFQO0FBQ0g7O0FBRUQsYUFBU2pGLFFBQVQsQ0FBa0JrRixZQUFsQixFQUFnQ2pXLEdBQWhDLEVBQXFDQyxLQUFyQyxFQUE0QztBQUN4QyxZQUFJdk8sVUFBVWMsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUN4QixtQkFBT3JELEVBQUUyRSxNQUFGLENBQVMsRUFBVCxFQUFhbWlCLFlBQWIsQ0FBUDtBQUNIOztBQUVELFlBQUksT0FBT2pXLEdBQVAsS0FBZSxRQUFuQixFQUE2QjtBQUN6QixnQkFBSSxPQUFPQyxLQUFQLEtBQWlCLFdBQXJCLEVBQWtDO0FBQzlCLHVCQUFPLE9BQU9nVyxhQUFhalcsR0FBYixDQUFQLEtBQTZCLFdBQTdCLEdBQ0QsSUFEQyxHQUVEaVcsYUFBYWpXLEdBQWIsQ0FGTjtBQUdIOztBQUVEaVcseUJBQWFqVyxHQUFiLElBQW9CQyxLQUFwQjtBQUNILFNBUkQsTUFRTztBQUNIOVEsY0FBRTJFLE1BQUYsQ0FBU21pQixZQUFULEVBQXVCalcsR0FBdkI7QUFDSDs7QUFFRCxlQUFPLElBQVA7QUFDSDs7QUFFRCxhQUFTa1csZ0JBQVQsQ0FBMEJDLE1BQTFCLEVBQWtDO0FBQzlCLFlBQUlDLFFBQVFDLFVBQVVGLE9BQU81bUIsS0FBUCxDQUFhLEdBQWIsRUFBa0IsQ0FBbEIsQ0FBVixFQUFnQ0EsS0FBaEMsQ0FBc0MsR0FBdEMsQ0FBWjtBQUNBLFlBQUkyUSxNQUFNLEVBQVY7QUFBQSxZQUFjb1csQ0FBZDs7QUFFQSxhQUFLLElBQUk1YyxJQUFJLENBQVIsRUFBVzZjLElBQUlILE1BQU01akIsTUFBMUIsRUFBa0NrSCxJQUFJNmMsQ0FBdEMsRUFBeUM3YyxHQUF6QyxFQUE4QztBQUMxQyxnQkFBSSxDQUFDMGMsTUFBTTFjLENBQU4sQ0FBTCxFQUFlO0FBQ1g7QUFDSDs7QUFFRDRjLGdCQUFJRixNQUFNMWMsQ0FBTixFQUFTbkssS0FBVCxDQUFlLEdBQWYsQ0FBSjtBQUNBMlEsZ0JBQUlvVyxFQUFFLENBQUYsQ0FBSixJQUFZQSxFQUFFLENBQUYsQ0FBWjtBQUNIOztBQUVELGVBQU9wVyxHQUFQO0FBQ0g7O0FBRUQsYUFBU3NXLGlCQUFULENBQTJCQyxHQUEzQixFQUFnQ04sTUFBaEMsRUFBd0M7QUFDcEMsZUFBT00sT0FBT0EsSUFBSUMsT0FBSixDQUFZLEdBQVosSUFBbUIsQ0FBQyxDQUFwQixHQUF3QixHQUF4QixHQUE4QixHQUFyQyxJQUE0Q3ZuQixFQUFFd25CLEtBQUYsQ0FBUVIsTUFBUixDQUFuRDtBQUNIOztBQUVELGFBQVNTLFlBQVQsQ0FBc0JDLFdBQXRCLEVBQW1DQyxNQUFuQyxFQUEyQztBQUN2QyxZQUFJeGYsTUFBTXVmLFlBQVlILE9BQVosQ0FBb0IsR0FBcEIsQ0FBVjs7QUFFQSxZQUFJLENBQUMsQ0FBRCxLQUFPcGYsR0FBWCxFQUFnQjtBQUNaLG1CQUFPd2YsTUFBUDtBQUNIOztBQUVELFlBQUl4ZixNQUFNLENBQVYsRUFBYTtBQUNUdWYsMEJBQWNBLFlBQVlsSixNQUFaLENBQW1CclcsR0FBbkIsQ0FBZDtBQUNIOztBQUVELGVBQU93ZixTQUFTRCxXQUFoQjtBQUNIOztBQUVELGFBQVNuTCxLQUFULENBQWVxTCxHQUFmLEVBQW9CO0FBQ2hCLGVBQU81bkIsRUFBRSw0QkFBRixFQUFnQzBPLE1BQWhDLENBQXVDa1osR0FBdkMsQ0FBUDtBQUNIOztBQUVELGFBQVNwQyxZQUFULENBQXNCdGpCLE1BQXRCLEVBQThCd2EsUUFBOUIsRUFBd0M7QUFDcEMsWUFBSXhSLE9BQVF3UixTQUFTbUwsTUFBVCxNQUFxQm5MLFNBQVNtTCxNQUFULEdBQWtCNWpCLElBQWxCLENBQXVCLFdBQXZCLENBQXRCLElBQThELDJCQUF6RTtBQUNBLFlBQUk2akIsTUFBTTluQixFQUFFLGVBQWVrQyxNQUFmLEdBQXdCLFNBQXhCLEdBQW9DZ0osSUFBcEMsR0FBMkMsS0FBN0MsQ0FBVjtBQUNBLFlBQUl5YixXQUFXOUIsV0FBZjtBQUNBLFlBQUlrRCxTQUFTLFNBQVRBLE1BQVMsR0FBVztBQUNwQnBCLHFCQUFTcUIsTUFBVCxDQUFnQnpMLE1BQU0sc0JBQU4sQ0FBaEI7QUFDSCxTQUZEOztBQUlBdUwsWUFDS3BsQixFQURMLENBQ1EsTUFEUixFQUNnQixZQUFXO0FBQ25CLGdCQUFJLEtBQUt1bEIsWUFBTCxLQUFzQixDQUExQixFQUE2QjtBQUN6Qix1QkFBT0YsUUFBUDtBQUNIOztBQUVEcEIscUJBQVNDLE9BQVQsQ0FBaUJrQixHQUFqQjtBQUNILFNBUEwsRUFRS3BsQixFQVJMLENBUVEsT0FSUixFQVFpQnFsQixNQVJqQjs7QUFXQSxlQUFPcEIsU0FBU0UsT0FBVCxFQUFQO0FBQ0g7O0FBRURyQixpQkFBYXhmLElBQWIsR0FBb0IsVUFBUzlELE1BQVQsRUFBaUI7QUFDakMsZUFBT21rQixhQUFhcmdCLElBQWIsQ0FBa0I5RCxNQUFsQixDQUFQO0FBQ0gsS0FGRDs7QUFJQSxhQUFTd2pCLGFBQVQsQ0FBdUJ4akIsTUFBdkIsRUFBK0J3YSxRQUEvQixFQUF5QztBQUNyQyxZQUFJcGMsRUFBSixFQUFRNG5CLFdBQVIsRUFBcUJDLFlBQXJCOztBQUVBLFlBQUk7QUFDQTduQixpQkFBS04sRUFBRWtDLE1BQUYsQ0FBTDtBQUNILFNBRkQsQ0FFRSxPQUFPRCxDQUFQLEVBQVU7QUFDUixtQkFBTyxLQUFQO0FBQ0g7O0FBRUQsWUFBSSxDQUFDM0IsR0FBRytDLE1BQVIsRUFBZ0I7QUFDWixtQkFBTyxLQUFQO0FBQ0g7O0FBRUQ2a0Isc0JBQWNsb0IsRUFBRSxzQ0FBRixDQUFkO0FBQ0Ftb0IsdUJBQWU3bkIsR0FBR3VELFFBQUgsQ0FBWSxXQUFaLENBQWY7O0FBRUE2WSxpQkFDS2xZLE9BREwsR0FFS2xELEdBRkwsQ0FFUyxhQUZULEVBRXdCLFlBQVc7QUFDM0I0bUIsd0JBQ0tuRSxNQURMLENBQ1l6akIsRUFEWixFQUVLc0QsTUFGTDs7QUFLQSxnQkFBSXVrQixnQkFBZ0IsQ0FBQzduQixHQUFHZ0QsT0FBSCxDQUFXLGVBQVgsRUFBNEJELE1BQWpELEVBQXlEO0FBQ3JEL0MsbUJBQUcrRSxRQUFILENBQVksV0FBWjtBQUNIO0FBQ0osU0FYTDs7QUFjQSxlQUFPL0UsR0FDRm1ELFdBREUsQ0FDVSxXQURWLEVBRUYya0IsS0FGRSxDQUVJRixXQUZKLENBQVA7QUFJSDs7QUFFRCxhQUFTdEMsY0FBVCxDQUF3QjFqQixNQUF4QixFQUFnQztBQUM1QixZQUFJbW1CLFVBQVUvQixjQUFjZ0MsSUFBZCxDQUFtQnBtQixNQUFuQixDQUFkOztBQUVBLFlBQUksQ0FBQ21tQixPQUFMLEVBQWM7QUFDVixtQkFBTyxLQUFQO0FBQ0g7O0FBRUQsZUFBT2pDLGNBQ0hxQixhQUNJdmxCLE1BREosRUFFSW1sQixrQkFDSSx5QkFBeUJnQixRQUFRLENBQVIsS0FBYyxFQUF2QyxJQUE2QyxhQUE3QyxHQUE2REEsUUFBUSxDQUFSLENBRGpFLEVBRUlyb0IsRUFBRTJFLE1BQUYsQ0FDSTtBQUNJNGpCLHNCQUFVO0FBRGQsU0FESixFQUlJeEIsaUJBQWlCc0IsUUFBUSxDQUFSLEtBQWMsRUFBL0IsQ0FKSixDQUZKLENBRkosQ0FERyxDQUFQO0FBY0g7O0FBRUQsYUFBU3ZDLFlBQVQsQ0FBc0I1akIsTUFBdEIsRUFBOEI7QUFDMUIsWUFBSW1tQixVQUFVOUIsWUFBWStCLElBQVosQ0FBaUJwbUIsTUFBakIsQ0FBZDs7QUFFQSxZQUFJLENBQUNtbUIsT0FBTCxFQUFjO0FBQ1YsbUJBQU8sS0FBUDtBQUNIOztBQUVELGVBQU9qQyxjQUNIcUIsYUFDSXZsQixNQURKLEVBRUltbEIsa0JBQ0ksb0NBQW9DZ0IsUUFBUSxDQUFSLENBRHhDLEVBRUlyb0IsRUFBRTJFLE1BQUYsQ0FDSTtBQUNJNGpCLHNCQUFVO0FBRGQsU0FESixFQUlJeEIsaUJBQWlCc0IsUUFBUSxDQUFSLEtBQWMsRUFBL0IsQ0FKSixDQUZKLENBRkosQ0FERyxDQUFQO0FBY0g7O0FBRUQsYUFBU25DLG9CQUFULENBQThCaGtCLE1BQTlCLEVBQXNDO0FBQ2xDLFlBQUltbUIsVUFBVTVCLG9CQUFvQjZCLElBQXBCLENBQXlCcG1CLE1BQXpCLENBQWQ7O0FBRUEsWUFBSSxDQUFDbW1CLE9BQUwsRUFBYztBQUNWLG1CQUFPLEtBQVA7QUFDSDs7QUFFRCxZQUFJLE1BQU1ubUIsT0FBT3FsQixPQUFQLENBQWUsTUFBZixDQUFWLEVBQWtDO0FBQzlCcmxCLHFCQUFTLFdBQVdBLE1BQXBCO0FBQ0g7O0FBRUQsZUFBT2trQixjQUNIcUIsYUFDSXZsQixNQURKLEVBRUltbEIsa0JBQ0kscURBQXFEbmxCLE1BRHpELEVBRUlsQyxFQUFFMkUsTUFBRixDQUNJO0FBQ0k0akIsc0JBQVU7QUFEZCxTQURKLEVBSUl4QixpQkFBaUJzQixRQUFRLENBQVIsS0FBYyxFQUEvQixDQUpKLENBRkosQ0FGSixDQURHLENBQVA7QUFjSDs7QUFFRCxhQUFTckMsaUJBQVQsQ0FBMkI5akIsTUFBM0IsRUFBbUM7QUFDL0IsWUFBSW1tQixVQUFVN0IsaUJBQWlCOEIsSUFBakIsQ0FBc0JwbUIsTUFBdEIsQ0FBZDs7QUFFQSxZQUFJLENBQUNtbUIsT0FBTCxFQUFjO0FBQ1YsbUJBQU8sS0FBUDtBQUNIOztBQUVELGVBQU9qQyxjQUNIcUIsYUFDSXZsQixNQURKLEVBRUltbEIsa0JBQ0ksd0JBQXdCZ0IsUUFBUSxDQUFSLENBQXhCLEdBQXFDLFFBQXJDLEdBQWdEQSxRQUFRLENBQVIsQ0FEcEQsRUFFSTtBQUNJRyxvQkFBUUgsUUFBUSxDQUFSLEVBQVdkLE9BQVgsQ0FBbUIsU0FBbkIsSUFBZ0MsQ0FBaEMsR0FBb0MsU0FBcEMsR0FBZ0Q7QUFENUQsU0FGSixDQUZKLENBREcsQ0FBUDtBQVdIOztBQUVELGFBQVNuQixhQUFULENBQXVCbGtCLE1BQXZCLEVBQStCO0FBQzNCLGVBQU8scUZBQXFGQSxNQUFyRixHQUE4RixXQUFyRztBQUNIOztBQUVELGFBQVN1bUIsU0FBVCxHQUFxQjtBQUNqQixlQUFPbG9CLFNBQVNxRyxlQUFULENBQXlCMkcsWUFBekIsR0FDRGhOLFNBQVNxRyxlQUFULENBQXlCMkcsWUFEeEIsR0FFRFUsS0FBS2lGLEtBQUwsQ0FBVzBSLEtBQUtqUyxNQUFMLEVBQVgsQ0FGTjtBQUdIOztBQUVELGFBQVNqTSxPQUFULENBQWlCekUsQ0FBakIsRUFBb0I7QUFDaEIsWUFBSXltQixVQUFVQyxpQkFBZDs7QUFFQSxZQUFJLENBQUNELE9BQUwsRUFBYztBQUNWO0FBQ0g7O0FBRUQ7QUFDQSxZQUFJem1CLEVBQUUybUIsT0FBRixLQUFjLEVBQWQsSUFBb0IsQ0FBQyxDQUFDRixRQUFRamtCLE9BQVIsQ0FBZ0IsS0FBaEIsQ0FBMUIsRUFBa0Q7QUFDOUNpa0Isb0JBQVEvbEIsS0FBUjtBQUNIOztBQUVEO0FBQ0EsWUFBSVYsRUFBRTJtQixPQUFGLEtBQWMsQ0FBbEIsRUFBcUI7QUFDakJDLHlCQUFhNW1CLENBQWIsRUFBZ0J5bUIsT0FBaEI7QUFDSDtBQUNKOztBQUVELGFBQVNHLFlBQVQsQ0FBc0I1bUIsQ0FBdEIsRUFBeUJ5YSxRQUF6QixFQUFtQztBQUMvQixZQUFJb00sb0JBQW9CcE0sU0FBU2xZLE9BQVQsR0FBbUJtQixJQUFuQixDQUF3QndmLDBCQUF4QixDQUF4QjtBQUNBLFlBQUk0RCxlQUFlRCxrQkFBa0JyaEIsS0FBbEIsQ0FBd0JsSCxTQUFTeW9CLGFBQWpDLENBQW5COztBQUVBLFlBQUkvbUIsRUFBRWduQixRQUFGLElBQWNGLGdCQUFnQixDQUFsQyxFQUFxQztBQUNqQ0QsOEJBQWtCNU0sR0FBbEIsQ0FBc0I0TSxrQkFBa0J6bEIsTUFBbEIsR0FBMkIsQ0FBakQsRUFBb0Q4SixLQUFwRDtBQUNBbEwsY0FBRW1CLGNBQUY7QUFDSCxTQUhELE1BR08sSUFBSSxDQUFDbkIsRUFBRWduQixRQUFILElBQWVGLGlCQUFpQkQsa0JBQWtCemxCLE1BQWxCLEdBQTJCLENBQS9ELEVBQWtFO0FBQ3JFeWxCLDhCQUFrQjVNLEdBQWxCLENBQXNCLENBQXRCLEVBQXlCL08sS0FBekI7QUFDQWxMLGNBQUVtQixjQUFGO0FBQ0g7QUFDSjs7QUFFRCxhQUFTZ0osTUFBVCxHQUFrQjtBQUNkcE0sVUFBRWdFLElBQUYsQ0FBT2doQixVQUFQLEVBQW1CLFVBQVN6YSxDQUFULEVBQVltUyxRQUFaLEVBQXNCO0FBQ3JDQSxxQkFBU3RRLE1BQVQ7QUFDSCxTQUZEO0FBR0g7O0FBRUQsYUFBUzhjLGdCQUFULENBQTBCQyxrQkFBMUIsRUFBOEM7QUFDMUMsWUFBSSxNQUFNbkUsV0FBV29FLE9BQVgsQ0FBbUJELGtCQUFuQixDQUFWLEVBQWtEO0FBQzlDcEUsa0JBQU0xZixRQUFOLENBQWUsYUFBZjs7QUFFQXVmLGlCQUNLbGlCLEVBREwsQ0FDUTtBQUNBMEosd0JBQVFBLE1BRFI7QUFFQTFGLHlCQUFTQTtBQUZULGFBRFI7QUFNSDs7QUFFRDFHLFVBQUUsVUFBRixFQUFjcXBCLEdBQWQsQ0FBa0JGLG1CQUFtQjNrQixPQUFuQixFQUFsQixFQUNLYSxRQURMLENBQ2MsYUFEZCxFQUVLckIsSUFGTCxDQUVVLFlBQVc7QUFDYixnQkFBSTFELEtBQUtOLEVBQUUsSUFBRixDQUFUOztBQUVBLGdCQUFJZ0IsY0FBY1YsR0FBRzJELElBQUgsQ0FBUWloQixlQUFSLENBQWxCLEVBQTRDO0FBQ3hDO0FBQ0g7O0FBRUQ1a0IsZUFBRzJELElBQUgsQ0FBUWloQixlQUFSLEVBQXlCNWtCLEdBQUcyQyxJQUFILENBQVFnaUIsZUFBUixLQUE0QixJQUFyRDtBQUNILFNBVkwsRUFXS2hpQixJQVhMLENBV1VnaUIsZUFYVixFQVcyQixNQVgzQjtBQWFIOztBQUVELGFBQVNxRSxjQUFULENBQXdCQyxnQkFBeEIsRUFBMEM7QUFDdEMsWUFBSXpmLElBQUo7O0FBRUF5Zix5QkFDSy9rQixPQURMLEdBRUt2QixJQUZMLENBRVVnaUIsZUFGVixFQUUyQixNQUYzQjs7QUFLQSxZQUFJLE1BQU1ELFdBQVczaEIsTUFBckIsRUFBNkI7QUFDekIwaEIsa0JBQU10aEIsV0FBTixDQUFrQixhQUFsQjs7QUFFQW1oQixpQkFDS25ZLEdBREwsQ0FDUztBQUNETCx3QkFBUUEsTUFEUDtBQUVEMUYseUJBQVNBO0FBRlIsYUFEVDtBQU1IOztBQUVEc2UscUJBQWFobEIsRUFBRXdwQixJQUFGLENBQU94RSxVQUFQLEVBQW1CLFVBQVN0SSxRQUFULEVBQW1CO0FBQy9DLG1CQUFPNk0scUJBQXFCN00sUUFBNUI7QUFDSCxTQUZZLENBQWI7O0FBSUEsWUFBSSxDQUFDLENBQUNzSSxXQUFXM2hCLE1BQWpCLEVBQXlCO0FBQ3JCeUcsbUJBQU9rYixXQUFXLENBQVgsRUFBY3hnQixPQUFkLEVBQVA7QUFDSCxTQUZELE1BRU87QUFDSHNGLG1CQUFPOUosRUFBRSxjQUFGLENBQVA7QUFDSDs7QUFFRDhKLGFBQ0tyRyxXQURMLENBQ2lCLGFBRGpCLEVBRUtPLElBRkwsQ0FFVSxZQUFXO0FBQ2IsZ0JBQUkxRCxLQUFLTixFQUFFLElBQUYsQ0FBVDtBQUFBLGdCQUFrQnlwQixVQUFVbnBCLEdBQUcyRCxJQUFILENBQVFpaEIsZUFBUixDQUE1Qjs7QUFFQSxnQkFBSSxDQUFDdUUsT0FBTCxFQUFjO0FBQ1ZucEIsbUJBQUdpRixVQUFILENBQWMwZixlQUFkO0FBQ0gsYUFGRCxNQUVPO0FBQ0gza0IsbUJBQUcyQyxJQUFILENBQVFnaUIsZUFBUixFQUF5QndFLE9BQXpCO0FBQ0g7O0FBRURucEIsZUFBRzJVLFVBQUgsQ0FBY2lRLGVBQWQ7QUFDSCxTQVpMO0FBY0g7O0FBRUQsYUFBU3lELGVBQVQsR0FBMkI7QUFDdkIsWUFBSSxNQUFNM0QsV0FBVzNoQixNQUFyQixFQUE2QjtBQUN6QixtQkFBTyxJQUFQO0FBQ0g7O0FBRUQsZUFBTzJoQixXQUFXLENBQVgsQ0FBUDtBQUNIOztBQUVELGFBQVN6TSxPQUFULENBQWlCclcsTUFBakIsRUFBeUJ3YSxRQUF6QixFQUFtQzRJLFFBQW5DLEVBQTZDb0UsZ0JBQTdDLEVBQStEO0FBQzNELFlBQUlybkIsVUFBVSxRQUFkO0FBQUEsWUFBd0IrUyxPQUF4Qjs7QUFFQSxZQUFJdVUsa0JBQWtCM3BCLEVBQUUyRSxNQUFGLENBQVMsRUFBVCxFQUFhMmdCLFFBQWIsQ0FBdEI7O0FBRUEsWUFBSW9FLG9CQUFvQkMsZ0JBQWdCRCxnQkFBaEIsQ0FBeEIsRUFBMkQ7QUFDdkR0VSxzQkFBVXVVLGdCQUFnQkQsZ0JBQWhCLEVBQWtDeG5CLE1BQWxDLEVBQTBDd2EsUUFBMUMsQ0FBVjtBQUNBcmEsc0JBQVVxbkIsZ0JBQVY7QUFDSCxTQUhELE1BR087QUFDSDtBQUNBMXBCLGNBQUVnRSxJQUFGLENBQU8sQ0FBQyxRQUFELEVBQVcsUUFBWCxDQUFQLEVBQTZCLFVBQVN1RyxDQUFULEVBQVl6SixJQUFaLEVBQWtCO0FBQzNDLHVCQUFPNm9CLGdCQUFnQjdvQixJQUFoQixDQUFQOztBQUVBNm9CLGdDQUFnQjdvQixJQUFoQixJQUF3QndrQixTQUFTeGtCLElBQVQsQ0FBeEI7QUFDSCxhQUpEOztBQU1BZCxjQUFFZ0UsSUFBRixDQUFPMmxCLGVBQVAsRUFBd0IsVUFBUzdvQixJQUFULEVBQWU4b0IsY0FBZixFQUErQjtBQUNuRDtBQUNBLG9CQUFJLENBQUNBLGNBQUwsRUFBcUI7QUFDakIsMkJBQU8sSUFBUDtBQUNIOztBQUVELG9CQUNJQSxlQUFlNWpCLElBQWYsSUFDQSxDQUFDNGpCLGVBQWU1akIsSUFBZixDQUFvQjlELE1BQXBCLEVBQTRCd2EsUUFBNUIsQ0FGTCxFQUdFO0FBQ0UsMkJBQU8sSUFBUDtBQUNIOztBQUVEdEgsMEJBQVV3VSxlQUFlMW5CLE1BQWYsRUFBdUJ3YSxRQUF2QixDQUFWOztBQUVBLG9CQUFJLFVBQVV0SCxPQUFkLEVBQXVCO0FBQ25CL1MsOEJBQVV2QixJQUFWO0FBQ0EsMkJBQU8sS0FBUDtBQUNIO0FBQ0osYUFuQkQ7QUFvQkg7O0FBRUQsZUFBTyxFQUFDdUIsU0FBU0EsT0FBVixFQUFtQitTLFNBQVNBLFdBQVcsRUFBdkMsRUFBUDtBQUNIOztBQUVELGFBQVN5VSxJQUFULENBQWMzbkIsTUFBZCxFQUFzQnVDLE9BQXRCLEVBQStCb2pCLE1BQS9CLEVBQXVDbUIsYUFBdkMsRUFBc0Q7QUFDbEQsWUFBSWhZLE9BQU8sSUFBWDtBQUNBLFlBQUk4WSxNQUFKO0FBQ0EsWUFBSUMsVUFBVSxLQUFkO0FBQ0EsWUFBSUMsV0FBVyxLQUFmO0FBQ0EsWUFBSXhsQixPQUFKO0FBQ0EsWUFBSTRRLE9BQUo7O0FBRUEzUSxrQkFBVXpFLEVBQUUyRSxNQUFGLENBQ04sRUFETSxFQUVOeWdCLGVBRk0sRUFHTjNnQixPQUhNLENBQVY7O0FBTUFELGtCQUFVeEUsRUFBRXlFLFFBQVE2SyxRQUFWLENBQVY7O0FBRUE7O0FBRUEwQixhQUFLeE0sT0FBTCxHQUFlLFlBQVc7QUFDdEIsbUJBQU9BLE9BQVA7QUFDSCxTQUZEOztBQUlBd00sYUFBSzZXLE1BQUwsR0FBYyxZQUFXO0FBQ3JCLG1CQUFPQSxNQUFQO0FBQ0gsU0FGRDs7QUFJQTdXLGFBQUt2TSxPQUFMLEdBQWdCekUsRUFBRW9GLEtBQUYsQ0FBUXdjLFFBQVIsRUFBa0I1USxJQUFsQixFQUF3QnZNLE9BQXhCLENBQWhCO0FBQ0F1TSxhQUFLc1UsUUFBTCxHQUFnQnRsQixFQUFFb0YsS0FBRixDQUFRd2MsUUFBUixFQUFrQjVRLElBQWxCLEVBQXdCdk0sUUFBUTZnQixRQUFoQyxDQUFoQjs7QUFFQXRVLGFBQUs1RSxNQUFMLEdBQWMsWUFBVztBQUNyQixnQkFBSSxDQUFDMmQsT0FBRCxJQUFZQyxRQUFoQixFQUEwQjtBQUN0QjtBQUNIOztBQUVENVUsb0JBQ0s1SCxHQURMLENBQ1MsWUFEVCxFQUN1QmliLGNBQWMsSUFEckMsRUFFS2puQixPQUZMLENBRWEsYUFGYixFQUU0QixDQUFDd1AsSUFBRCxDQUY1QjtBQUlILFNBVEQ7O0FBV0FBLGFBQUtyTyxLQUFMLEdBQWEsWUFBVztBQUNwQixnQkFBSSxDQUFDb25CLE9BQUQsSUFBWUMsUUFBaEIsRUFBMEI7QUFDdEI7QUFDSDs7QUFFREEsdUJBQVcsSUFBWDs7QUFFQVYsMkJBQWV0WSxJQUFmOztBQUVBLGdCQUFJMlYsV0FBVzlCLFdBQWY7O0FBRUE7QUFDQSxnQkFDSW1FLGtCQUVJem9CLFNBQVN5b0IsYUFBVCxLQUEyQnhrQixRQUFRLENBQVIsQ0FBM0IsSUFDQXhFLEVBQUU4SyxRQUFGLENBQVd0RyxRQUFRLENBQVIsQ0FBWCxFQUF1QmpFLFNBQVN5b0IsYUFBaEMsQ0FISixDQURKLEVBTUU7QUFDRSxvQkFBSTtBQUNBQSxrQ0FBYzdiLEtBQWQ7QUFDSCxpQkFGRCxDQUVFLE9BQU9sTCxDQUFQLEVBQVU7QUFDUjtBQUNBO0FBQ0g7QUFDSjs7QUFFRG1ULG9CQUFRNVQsT0FBUixDQUFnQixZQUFoQixFQUE4QixDQUFDd1AsSUFBRCxDQUE5Qjs7QUFFQXhNLG9CQUNLZixXQURMLENBQ2lCLGFBRGpCLEVBRUs0QixRQUZMLENBRWMsYUFGZDs7QUFLQWhGLDBCQUFjK1UsUUFBUTZVLEdBQVIsQ0FBWXpsQixPQUFaLENBQWQsRUFDSzBsQixNQURMLENBQ1ksWUFBVztBQUNmOVUsd0JBQVE1VCxPQUFSLENBQWdCLGFBQWhCLEVBQStCLENBQUN3UCxJQUFELENBQS9CO0FBQ0F4TSx3QkFBUVosTUFBUjtBQUNBWSwwQkFBVXhELFNBQVY7QUFDQTJsQix5QkFBU0MsT0FBVDtBQUNILGFBTkw7O0FBU0EsbUJBQU9ELFNBQVNFLE9BQVQsRUFBUDtBQUNILFNBNUNEOztBQThDQTs7QUFFQWlELGlCQUFTdlIsUUFBUXJXLE1BQVIsRUFBZ0I4TyxJQUFoQixFQUFzQnZNLFFBQVE2Z0IsUUFBOUIsRUFBd0M3Z0IsUUFBUXBDLE9BQWhELENBQVQ7O0FBRUFtQyxnQkFDS3ZCLElBREwsQ0FDVWdpQixlQURWLEVBQzJCLE9BRDNCLEVBRUs1ZixRQUZMLENBRWMsbUNBQW1DeWtCLE9BQU96bkIsT0FGeEQsRUFHS2dLLFFBSEwsQ0FHYyxNQUhkLEVBSUtjLEtBSkwsR0FLS3pLLEVBTEwsQ0FLUSxPQUxSLEVBS2lCLG1CQUxqQixFQUtzQyxVQUFTVCxDQUFULEVBQVk7QUFDMUMsZ0JBQUlqQyxFQUFFaUMsRUFBRUMsTUFBSixFQUFZQyxFQUFaLENBQWUsbUJBQWYsQ0FBSixFQUF5QztBQUNyQzZPLHFCQUFLck8sS0FBTDtBQUNIO0FBQ0osU0FUTCxFQVVLbkIsT0FWTCxDQVVhLFdBVmIsRUFVMEIsQ0FBQ3dQLElBQUQsQ0FWMUI7O0FBYUFrWSx5QkFBaUJsWSxJQUFqQjs7QUFFQWhSLFVBQUVtcUIsSUFBRixDQUFPTCxPQUFPMVUsT0FBZCxFQUNLOFUsTUFETCxDQUNZRSxLQURaOztBQUlBLGlCQUFTQSxLQUFULENBQWVOLE1BQWYsRUFBdUI7QUFDbkIxVSxzQkFBVXBWLEVBQUU4cEIsTUFBRixFQUNMdGMsR0FESyxDQUNELFlBREMsRUFDYWliLGNBQWMsSUFEM0IsQ0FBVjs7QUFJQWprQixvQkFDS21CLElBREwsQ0FDVSxjQURWLEVBRUszQixJQUZMLENBRVUsWUFBVztBQUNiLG9CQUFJcW1CLFNBQVNycUIsRUFBRSxJQUFGLENBQWI7O0FBRUFLLDhCQUFjZ3FCLE1BQWQsRUFDS0gsTUFETCxDQUNZLFlBQVc7QUFDZkcsMkJBQU96bUIsTUFBUDtBQUNILGlCQUhMO0FBS0gsYUFWTDs7QUFhQVksb0JBQ0tmLFdBREwsQ0FDaUIsY0FEakIsRUFFS2tDLElBRkwsQ0FFVSxlQUZWLEVBR0sya0IsS0FITCxHQUlLNWIsTUFKTCxDQUlZMEcsT0FKWjs7QUFPQTJVLHNCQUFVLElBQVY7O0FBRUEzVSxvQkFDSzVULE9BREwsQ0FDYSxZQURiLEVBQzJCLENBQUN3UCxJQUFELENBRDNCO0FBR0g7QUFDSjs7QUFFRCxhQUFTMFQsSUFBVCxDQUFjeGlCLE1BQWQsRUFBc0J1QyxPQUF0QixFQUErQm9qQixNQUEvQixFQUF1QztBQUNuQyxZQUFJLENBQUMzbEIsT0FBT2tCLGNBQVosRUFBNEI7QUFDeEJ5a0IscUJBQVM3bkIsRUFBRTZuQixNQUFGLENBQVQ7QUFDSCxTQUZELE1BRU87QUFDSDNsQixtQkFBT2tCLGNBQVA7QUFDQXlrQixxQkFBUzduQixFQUFFLElBQUYsQ0FBVDtBQUNBa0MscUJBQVMybEIsT0FBTzVqQixJQUFQLENBQVksYUFBWixLQUE4QjRqQixPQUFPNWtCLElBQVAsQ0FBWSxNQUFaLENBQTlCLElBQXFENGtCLE9BQU81a0IsSUFBUCxDQUFZLEtBQVosQ0FBOUQ7QUFDSDs7QUFFRCxZQUFJeVosV0FBVyxJQUFJbU4sSUFBSixDQUNYM25CLE1BRFcsRUFFWGxDLEVBQUUyRSxNQUFGLENBQ0ksRUFESixFQUVJa2pCLE9BQU81akIsSUFBUCxDQUFZLGNBQVosS0FBK0I0akIsT0FBTzVqQixJQUFQLENBQVksTUFBWixDQUZuQyxFQUdJUSxPQUhKLENBRlcsRUFPWG9qQixNQVBXLEVBUVh0bkIsU0FBU3lvQixhQVJFLENBQWY7O0FBV0EsWUFBSSxDQUFDOW1CLE9BQU9rQixjQUFaLEVBQTRCO0FBQ3hCLG1CQUFPc1osUUFBUDtBQUNIO0FBQ0o7O0FBRURnSSxTQUFLemtCLE9BQUwsR0FBZ0IsT0FBaEI7QUFDQXlrQixTQUFLamdCLE9BQUwsR0FBZ0J6RSxFQUFFb0YsS0FBRixDQUFRd2MsUUFBUixFQUFrQjhDLElBQWxCLEVBQXdCVSxlQUF4QixDQUFoQjtBQUNBVixTQUFLWSxRQUFMLEdBQWdCdGxCLEVBQUVvRixLQUFGLENBQVF3YyxRQUFSLEVBQWtCOEMsSUFBbEIsRUFBd0JVLGdCQUFnQkUsUUFBeEMsQ0FBaEI7QUFDQVosU0FBS2dFLE9BQUwsR0FBZ0JDLGVBQWhCOztBQUVBM29CLE1BQUVPLFFBQUYsRUFBWW1DLEVBQVosQ0FBZSxZQUFmLEVBQTZCLGFBQTdCLEVBQTRDZ2lCLElBQTVDOztBQUVBLFdBQU9BLElBQVA7QUFDSCxDQTFuQkEsQ0FBRDs7Ozs7QUNIQTs7Ozs7OztBQU9BLENBQUUsV0FBVW5NLE9BQVYsRUFBbUI7QUFDcEIsS0FBSWdTLDJCQUEyQixLQUEvQjtBQUNBLEtBQUksT0FBTy9SLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0NBLE9BQU9DLEdBQTNDLEVBQWdEO0FBQy9DRCxTQUFPRCxPQUFQO0FBQ0FnUyw2QkFBMkIsSUFBM0I7QUFDQTtBQUNELEtBQUksUUFBTzVSLE9BQVAseUNBQU9BLE9BQVAsT0FBbUIsUUFBdkIsRUFBaUM7QUFDaENELFNBQU9DLE9BQVAsR0FBaUJKLFNBQWpCO0FBQ0FnUyw2QkFBMkIsSUFBM0I7QUFDQTtBQUNELEtBQUksQ0FBQ0Esd0JBQUwsRUFBK0I7QUFDOUIsTUFBSUMsYUFBYXBoQixPQUFPcWhCLE9BQXhCO0FBQ0EsTUFBSUMsTUFBTXRoQixPQUFPcWhCLE9BQVAsR0FBaUJsUyxTQUEzQjtBQUNBbVMsTUFBSXBtQixVQUFKLEdBQWlCLFlBQVk7QUFDNUI4RSxVQUFPcWhCLE9BQVAsR0FBaUJELFVBQWpCO0FBQ0EsVUFBT0UsR0FBUDtBQUNBLEdBSEQ7QUFJQTtBQUNELENBbEJDLEVBa0JBLFlBQVk7QUFDYixVQUFTL2xCLE1BQVQsR0FBbUI7QUFDbEIsTUFBSTRGLElBQUksQ0FBUjtBQUNBLE1BQUl1ZixTQUFTLEVBQWI7QUFDQSxTQUFPdmYsSUFBSWhJLFVBQVVjLE1BQXJCLEVBQTZCa0gsR0FBN0IsRUFBa0M7QUFDakMsT0FBSW9nQixhQUFhcG9CLFVBQVdnSSxDQUFYLENBQWpCO0FBQ0EsUUFBSyxJQUFJc0csR0FBVCxJQUFnQjhaLFVBQWhCLEVBQTRCO0FBQzNCYixXQUFPalosR0FBUCxJQUFjOFosV0FBVzlaLEdBQVgsQ0FBZDtBQUNBO0FBQ0Q7QUFDRCxTQUFPaVosTUFBUDtBQUNBOztBQUVELFVBQVMzYSxJQUFULENBQWV5YixTQUFmLEVBQTBCO0FBQ3pCLFdBQVNGLEdBQVQsQ0FBYzdaLEdBQWQsRUFBbUJDLEtBQW5CLEVBQTBCNlosVUFBMUIsRUFBc0M7QUFDckMsT0FBSWIsTUFBSjtBQUNBLE9BQUksT0FBT3ZwQixRQUFQLEtBQW9CLFdBQXhCLEVBQXFDO0FBQ3BDO0FBQ0E7O0FBRUQ7O0FBRUEsT0FBSWdDLFVBQVVjLE1BQVYsR0FBbUIsQ0FBdkIsRUFBMEI7QUFDekJzbkIsaUJBQWFobUIsT0FBTztBQUNuQmttQixXQUFNO0FBRGEsS0FBUCxFQUVWSCxJQUFJOVosUUFGTSxFQUVJK1osVUFGSixDQUFiOztBQUlBLFFBQUksT0FBT0EsV0FBV0csT0FBbEIsS0FBOEIsUUFBbEMsRUFBNEM7QUFDM0MsU0FBSUEsVUFBVSxJQUFJQyxJQUFKLEVBQWQ7QUFDQUQsYUFBUUUsZUFBUixDQUF3QkYsUUFBUUcsZUFBUixLQUE0Qk4sV0FBV0csT0FBWCxHQUFxQixNQUF6RTtBQUNBSCxnQkFBV0csT0FBWCxHQUFxQkEsT0FBckI7QUFDQTs7QUFFRDtBQUNBSCxlQUFXRyxPQUFYLEdBQXFCSCxXQUFXRyxPQUFYLEdBQXFCSCxXQUFXRyxPQUFYLENBQW1CSSxXQUFuQixFQUFyQixHQUF3RCxFQUE3RTs7QUFFQSxRQUFJO0FBQ0hwQixjQUFTcUIsS0FBS0MsU0FBTCxDQUFldGEsS0FBZixDQUFUO0FBQ0EsU0FBSSxVQUFVOUssSUFBVixDQUFlOGpCLE1BQWYsQ0FBSixFQUE0QjtBQUMzQmhaLGNBQVFnWixNQUFSO0FBQ0E7QUFDRCxLQUxELENBS0UsT0FBTzduQixDQUFQLEVBQVUsQ0FBRTs7QUFFZCxRQUFJLENBQUMyb0IsVUFBVVMsS0FBZixFQUFzQjtBQUNyQnZhLGFBQVF3YSxtQkFBbUJDLE9BQU96YSxLQUFQLENBQW5CLEVBQ041TixPQURNLENBQ0UsMkRBREYsRUFDK0Rzb0Isa0JBRC9ELENBQVI7QUFFQSxLQUhELE1BR087QUFDTjFhLGFBQVE4WixVQUFVUyxLQUFWLENBQWdCdmEsS0FBaEIsRUFBdUJELEdBQXZCLENBQVI7QUFDQTs7QUFFREEsVUFBTXlhLG1CQUFtQkMsT0FBTzFhLEdBQVAsQ0FBbkIsQ0FBTjtBQUNBQSxVQUFNQSxJQUFJM04sT0FBSixDQUFZLDBCQUFaLEVBQXdDc29CLGtCQUF4QyxDQUFOO0FBQ0EzYSxVQUFNQSxJQUFJM04sT0FBSixDQUFZLFNBQVosRUFBdUJpSixNQUF2QixDQUFOOztBQUVBLFFBQUlzZix3QkFBd0IsRUFBNUI7O0FBRUEsU0FBSyxJQUFJQyxhQUFULElBQTBCZixVQUExQixFQUFzQztBQUNyQyxTQUFJLENBQUNBLFdBQVdlLGFBQVgsQ0FBTCxFQUFnQztBQUMvQjtBQUNBO0FBQ0RELDhCQUF5QixPQUFPQyxhQUFoQztBQUNBLFNBQUlmLFdBQVdlLGFBQVgsTUFBOEIsSUFBbEMsRUFBd0M7QUFDdkM7QUFDQTtBQUNERCw4QkFBeUIsTUFBTWQsV0FBV2UsYUFBWCxDQUEvQjtBQUNBO0FBQ0QsV0FBUW5yQixTQUFTb3JCLE1BQVQsR0FBa0I5YSxNQUFNLEdBQU4sR0FBWUMsS0FBWixHQUFvQjJhLHFCQUE5QztBQUNBOztBQUVEOztBQUVBLE9BQUksQ0FBQzVhLEdBQUwsRUFBVTtBQUNUaVosYUFBUyxFQUFUO0FBQ0E7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsT0FBSThCLFVBQVVyckIsU0FBU29yQixNQUFULEdBQWtCcHJCLFNBQVNvckIsTUFBVCxDQUFnQnZyQixLQUFoQixDQUFzQixJQUF0QixDQUFsQixHQUFnRCxFQUE5RDtBQUNBLE9BQUl5ckIsVUFBVSxrQkFBZDtBQUNBLE9BQUl0aEIsSUFBSSxDQUFSOztBQUVBLFVBQU9BLElBQUlxaEIsUUFBUXZvQixNQUFuQixFQUEyQmtILEdBQTNCLEVBQWdDO0FBQy9CLFFBQUl1aEIsUUFBUUYsUUFBUXJoQixDQUFSLEVBQVduSyxLQUFYLENBQWlCLEdBQWpCLENBQVo7QUFDQSxRQUFJdXJCLFNBQVNHLE1BQU1qVCxLQUFOLENBQVksQ0FBWixFQUFlaFEsSUFBZixDQUFvQixHQUFwQixDQUFiOztBQUVBLFFBQUksQ0FBQyxLQUFLa2pCLElBQU4sSUFBY0osT0FBT3JOLE1BQVAsQ0FBYyxDQUFkLE1BQXFCLEdBQXZDLEVBQTRDO0FBQzNDcU4sY0FBU0EsT0FBTzlTLEtBQVAsQ0FBYSxDQUFiLEVBQWdCLENBQUMsQ0FBakIsQ0FBVDtBQUNBOztBQUVELFFBQUk7QUFDSCxTQUFJL1gsT0FBT2dyQixNQUFNLENBQU4sRUFBUzVvQixPQUFULENBQWlCMm9CLE9BQWpCLEVBQTBCTCxrQkFBMUIsQ0FBWDtBQUNBRyxjQUFTZixVQUFVb0IsSUFBVixHQUNScEIsVUFBVW9CLElBQVYsQ0FBZUwsTUFBZixFQUF1QjdxQixJQUF2QixDQURRLEdBQ3VCOHBCLFVBQVVlLE1BQVYsRUFBa0I3cUIsSUFBbEIsS0FDL0I2cUIsT0FBT3pvQixPQUFQLENBQWUyb0IsT0FBZixFQUF3Qkwsa0JBQXhCLENBRkQ7O0FBSUEsU0FBSSxLQUFLTyxJQUFULEVBQWU7QUFDZCxVQUFJO0FBQ0hKLGdCQUFTUixLQUFLYyxLQUFMLENBQVdOLE1BQVgsQ0FBVDtBQUNBLE9BRkQsQ0FFRSxPQUFPMXBCLENBQVAsRUFBVSxDQUFFO0FBQ2Q7O0FBRUQsU0FBSTRPLFFBQVEvUCxJQUFaLEVBQWtCO0FBQ2pCZ3BCLGVBQVM2QixNQUFUO0FBQ0E7QUFDQTs7QUFFRCxTQUFJLENBQUM5YSxHQUFMLEVBQVU7QUFDVGlaLGFBQU9ocEIsSUFBUCxJQUFlNnFCLE1BQWY7QUFDQTtBQUNELEtBcEJELENBb0JFLE9BQU8xcEIsQ0FBUCxFQUFVLENBQUU7QUFDZDs7QUFFRCxVQUFPNm5CLE1BQVA7QUFDQTs7QUFFRFksTUFBSXdCLEdBQUosR0FBVXhCLEdBQVY7QUFDQUEsTUFBSXhPLEdBQUosR0FBVSxVQUFVckwsR0FBVixFQUFlO0FBQ3hCLFVBQU82WixJQUFJeG1CLElBQUosQ0FBU3dtQixHQUFULEVBQWM3WixHQUFkLENBQVA7QUFDQSxHQUZEO0FBR0E2WixNQUFJeUIsT0FBSixHQUFjLFlBQVk7QUFDekIsVUFBT3pCLElBQUlwb0IsS0FBSixDQUFVO0FBQ2hCeXBCLFVBQU07QUFEVSxJQUFWLEVBRUosR0FBR2xULEtBQUgsQ0FBUzNVLElBQVQsQ0FBYzNCLFNBQWQsQ0FGSSxDQUFQO0FBR0EsR0FKRDtBQUtBbW9CLE1BQUk5WixRQUFKLEdBQWUsRUFBZjs7QUFFQThaLE1BQUk5bUIsTUFBSixHQUFhLFVBQVVpTixHQUFWLEVBQWU4WixVQUFmLEVBQTJCO0FBQ3ZDRCxPQUFJN1osR0FBSixFQUFTLEVBQVQsRUFBYWxNLE9BQU9nbUIsVUFBUCxFQUFtQjtBQUMvQkcsYUFBUyxDQUFDO0FBRHFCLElBQW5CLENBQWI7QUFHQSxHQUpEOztBQU1BSixNQUFJMEIsYUFBSixHQUFvQmpkLElBQXBCOztBQUVBLFNBQU91YixHQUFQO0FBQ0E7O0FBRUQsUUFBT3ZiLEtBQUssWUFBWSxDQUFFLENBQW5CLENBQVA7QUFDQSxDQTdKQyxDQUFEOzs7QUNQRDs7Ozs7OztBQU9BLENBQUUsV0FBU25QLENBQVQsRUFDRjtBQUNJLFFBQUlxc0IsU0FBSjs7QUFFQXJzQixNQUFFRSxFQUFGLENBQUtvc0IsTUFBTCxHQUFjLFVBQVM3bkIsT0FBVCxFQUNkO0FBQ0ksWUFBSW1kLFdBQVc1aEIsRUFBRTJFLE1BQUYsQ0FDZDtBQUNHNG5CLG1CQUFPLE1BRFY7QUFFR2hkLG1CQUFPLEtBRlY7QUFHRzJQLG1CQUFPLEdBSFY7QUFJRzlTLG9CQUFRLElBSlg7QUFLR29nQix5QkFBYSxRQUxoQjtBQU1HQyx5QkFBYSxRQU5oQjtBQU9HQyx3QkFBWSxNQVBmO0FBUUdDLHVCQUFXO0FBUmQsU0FEYyxFQVVabG9CLE9BVlksQ0FBZjs7QUFZQSxZQUFJbW9CLE9BQU81c0IsRUFBRSxJQUFGLENBQVg7QUFBQSxZQUNJNnNCLE9BQU9ELEtBQUtwbEIsUUFBTCxHQUFnQnpCLEtBQWhCLEVBRFg7O0FBR0E2bUIsYUFBS3ZuQixRQUFMLENBQWMsYUFBZDs7QUFFQSxZQUFJMGIsT0FBTyxTQUFQQSxJQUFPLENBQVMrTCxLQUFULEVBQWdCdnJCLFFBQWhCLEVBQ1g7QUFDSSxnQkFBSTRNLE9BQU9GLEtBQUtpRixLQUFMLENBQVczRSxTQUFTc2UsS0FBSzNRLEdBQUwsQ0FBUyxDQUFULEVBQVluYixLQUFaLENBQWtCb04sSUFBM0IsQ0FBWCxLQUFnRCxDQUEzRDs7QUFFQTBlLGlCQUFLcmYsR0FBTCxDQUFTLE1BQVQsRUFBaUJXLE9BQVEyZSxRQUFRLEdBQWhCLEdBQXVCLEdBQXhDOztBQUVBLGdCQUFJLE9BQU92ckIsUUFBUCxLQUFvQixVQUF4QixFQUNBO0FBQ0lHLDJCQUFXSCxRQUFYLEVBQXFCcWdCLFNBQVMxQyxLQUE5QjtBQUNIO0FBQ0osU0FWRDs7QUFZQSxZQUFJOVMsU0FBUyxTQUFUQSxNQUFTLENBQVNnSixPQUFULEVBQ2I7QUFDSXdYLGlCQUFLamEsTUFBTCxDQUFZeUMsUUFBUWtGLFdBQVIsRUFBWjtBQUNILFNBSEQ7O0FBS0EsWUFBSXpaLGFBQWEsU0FBYkEsVUFBYSxDQUFTcWUsS0FBVCxFQUNqQjtBQUNJME4saUJBQUtwZixHQUFMLENBQVMscUJBQVQsRUFBZ0MwUixRQUFRLElBQXhDO0FBQ0EyTixpQkFBS3JmLEdBQUwsQ0FBUyxxQkFBVCxFQUFnQzBSLFFBQVEsSUFBeEM7QUFDSCxTQUpEOztBQU1BcmUsbUJBQVcrZ0IsU0FBUzFDLEtBQXBCOztBQUVBbGYsVUFBRSxRQUFGLEVBQVk0c0IsSUFBWixFQUFrQjNsQixJQUFsQixHQUF5QjVCLFFBQXpCLENBQWtDLE1BQWxDOztBQUVBckYsVUFBRSxTQUFGLEVBQWE0c0IsSUFBYixFQUFtQjlJLE9BQW5CLENBQTJCLGdCQUFnQmxDLFNBQVM2SyxXQUF6QixHQUF1QyxJQUFsRTs7QUFFQSxZQUFJN0ssU0FBU3JTLEtBQVQsS0FBbUIsSUFBdkIsRUFDQTtBQUNJdlAsY0FBRSxTQUFGLEVBQWE0c0IsSUFBYixFQUFtQjVvQixJQUFuQixDQUF3QixZQUN4QjtBQUNJLG9CQUFJK29CLFFBQVEvc0IsRUFBRSxJQUFGLEVBQVF1SCxNQUFSLEdBQWlCNUIsSUFBakIsQ0FBc0IsR0FBdEIsRUFBMkJJLEtBQTNCLEVBQVo7QUFBQSxvQkFDSXdtQixRQUFRUSxNQUFNbEosSUFBTixFQURaO0FBQUEsb0JBRUl0VSxRQUFRdlAsRUFBRSxLQUFGLEVBQVNxRixRQUFULENBQWtCLE9BQWxCLEVBQTJCd2UsSUFBM0IsQ0FBZ0MwSSxLQUFoQyxFQUF1Q3RwQixJQUF2QyxDQUE0QyxNQUE1QyxFQUFvRDhwQixNQUFNOXBCLElBQU4sQ0FBVyxNQUFYLENBQXBELENBRlo7O0FBSUFqRCxrQkFBRSxRQUFRNGhCLFNBQVM2SyxXQUFuQixFQUFnQyxJQUFoQyxFQUFzQy9kLE1BQXRDLENBQTZDYSxLQUE3QztBQUNILGFBUEQ7QUFRSDs7QUFFRCxZQUFJLENBQUNxUyxTQUFTclMsS0FBVixJQUFtQnFTLFNBQVMySyxLQUFULEtBQW1CLElBQTFDLEVBQ0E7QUFDSXZzQixjQUFFLFNBQUYsRUFBYTRzQixJQUFiLEVBQW1CNW9CLElBQW5CLENBQXdCLFlBQ3hCO0FBQ0ksb0JBQUl1b0IsUUFBUXZzQixFQUFFLElBQUYsRUFBUXVILE1BQVIsR0FBaUI1QixJQUFqQixDQUFzQixHQUF0QixFQUEyQkksS0FBM0IsR0FBbUM4ZCxJQUFuQyxFQUFaO0FBQUEsb0JBQ0ltSixXQUFXaHRCLEVBQUUsS0FBRixFQUFTNmpCLElBQVQsQ0FBYzBJLEtBQWQsRUFBcUJqbkIsSUFBckIsQ0FBMEIsTUFBMUIsRUFBa0MsR0FBbEMsRUFBdUNELFFBQXZDLENBQWdELE1BQWhELENBRGY7O0FBR0Esb0JBQUl1YyxTQUFTK0ssU0FBYixFQUNBO0FBQ0kzc0Isc0JBQUUsUUFBUTRoQixTQUFTNkssV0FBbkIsRUFBZ0MsSUFBaEMsRUFBc0MzSSxPQUF0QyxDQUE4Q2tKLFFBQTlDO0FBQ0gsaUJBSEQsTUFLQTtBQUNJaHRCLHNCQUFFLFFBQVE0aEIsU0FBUzZLLFdBQW5CLEVBQWdDLElBQWhDLEVBQXNDL2QsTUFBdEMsQ0FBNkNzZSxRQUE3QztBQUNIO0FBQ0osYUFiRDtBQWNILFNBaEJELE1Ba0JBO0FBQ0ksZ0JBQUlBLFdBQVdodEIsRUFBRSxLQUFGLEVBQVM2akIsSUFBVCxDQUFjakMsU0FBUzJLLEtBQXZCLEVBQThCam5CLElBQTlCLENBQW1DLE1BQW5DLEVBQTJDLEdBQTNDLEVBQWdERCxRQUFoRCxDQUF5RCxNQUF6RCxDQUFmOztBQUVBLGdCQUFJdWMsU0FBUytLLFNBQWIsRUFDQTtBQUNJM3NCLGtCQUFFLE1BQU00aEIsU0FBUzZLLFdBQWpCLEVBQThCRyxJQUE5QixFQUFvQzlJLE9BQXBDLENBQTRDa0osUUFBNUM7QUFDSCxhQUhELE1BS0E7QUFDSWh0QixrQkFBRSxNQUFNNGhCLFNBQVM2SyxXQUFqQixFQUE4QkcsSUFBOUIsRUFBb0NsZSxNQUFwQyxDQUEyQ3NlLFFBQTNDO0FBQ0g7QUFDSjs7QUFFRGh0QixVQUFFLEdBQUYsRUFBTzRzQixJQUFQLEVBQWFscUIsRUFBYixDQUFnQixPQUFoQixFQUF5QixVQUFTVCxDQUFULEVBQ3pCO0FBQ0ksZ0JBQUtvcUIsWUFBWXpLLFNBQVMxQyxLQUF0QixHQUErQjZMLEtBQUtrQyxHQUFMLEVBQW5DLEVBQ0E7QUFDSSx1QkFBTyxLQUFQO0FBQ0g7O0FBRURaLHdCQUFZdEIsS0FBS2tDLEdBQUwsRUFBWjs7QUFFQSxnQkFBSTNXLElBQUl0VyxFQUFFLElBQUYsQ0FBUjs7QUFFQSxnQkFBSXNXLEVBQUV6UyxRQUFGLENBQVcsTUFBWCxLQUFzQnlTLEVBQUV6UyxRQUFGLENBQVcsTUFBWCxDQUExQixFQUNBO0FBQ0k1QixrQkFBRW1CLGNBQUY7QUFDSDs7QUFFRCxnQkFBSWtULEVBQUV6UyxRQUFGLENBQVcsTUFBWCxDQUFKLEVBQ0E7QUFDSStvQixxQkFBS2puQixJQUFMLENBQVUsTUFBTWljLFNBQVM0SyxXQUF6QixFQUFzQy9vQixXQUF0QyxDQUFrRG1lLFNBQVM0SyxXQUEzRDs7QUFFQWxXLGtCQUFFcFAsSUFBRixHQUFTNEMsSUFBVCxHQUFnQnpFLFFBQWhCLENBQXlCdWMsU0FBUzRLLFdBQWxDOztBQUVBekwscUJBQUssQ0FBTDs7QUFFQSxvQkFBSWEsU0FBU3hWLE1BQWIsRUFDQTtBQUNJQSwyQkFBT2tLLEVBQUVwUCxJQUFGLEVBQVA7QUFDSDtBQUNKLGFBWkQsTUFhSyxJQUFJb1AsRUFBRXpTLFFBQUYsQ0FBVyxNQUFYLENBQUosRUFDTDtBQUNJa2QscUJBQUssQ0FBQyxDQUFOLEVBQVMsWUFDVDtBQUNJNkwseUJBQUtqbkIsSUFBTCxDQUFVLE1BQU1pYyxTQUFTNEssV0FBekIsRUFBc0Mvb0IsV0FBdEMsQ0FBa0RtZSxTQUFTNEssV0FBM0Q7O0FBRUFsVyxzQkFBRS9PLE1BQUYsR0FBV0EsTUFBWCxHQUFvQjhDLElBQXBCLEdBQTJCd00sWUFBM0IsQ0FBd0MrVixJQUF4QyxFQUE4QyxJQUE5QyxFQUFvRDdtQixLQUFwRCxHQUE0RFYsUUFBNUQsQ0FBcUV1YyxTQUFTNEssV0FBOUU7QUFDSCxpQkFMRDs7QUFPQSxvQkFBSTVLLFNBQVN4VixNQUFiLEVBQ0E7QUFDSUEsMkJBQU9rSyxFQUFFL08sTUFBRixHQUFXQSxNQUFYLEdBQW9Cc1AsWUFBcEIsQ0FBaUMrVixJQUFqQyxFQUF1QyxJQUF2QyxDQUFQO0FBQ0g7QUFDSjtBQUNKLFNBM0NEOztBQTZDQSxhQUFLTSxJQUFMLEdBQVksVUFBU2hsQixFQUFULEVBQWE4RSxPQUFiLEVBQ1o7QUFDSTlFLGlCQUFLbEksRUFBRWtJLEVBQUYsQ0FBTDs7QUFFQSxnQkFBSU4sU0FBU2dsQixLQUFLam5CLElBQUwsQ0FBVSxNQUFNaWMsU0FBUzRLLFdBQXpCLENBQWI7O0FBRUEsZ0JBQUk1a0IsT0FBT3ZFLE1BQVAsR0FBZ0IsQ0FBcEIsRUFDQTtBQUNJdUUseUJBQVNBLE9BQU9pUCxZQUFQLENBQW9CK1YsSUFBcEIsRUFBMEIsSUFBMUIsRUFBZ0N2cEIsTUFBekM7QUFDSCxhQUhELE1BS0E7QUFDSXVFLHlCQUFTLENBQVQ7QUFDSDs7QUFFRGdsQixpQkFBS2puQixJQUFMLENBQVUsSUFBVixFQUFnQmxDLFdBQWhCLENBQTRCbWUsU0FBUzRLLFdBQXJDLEVBQWtEbmlCLElBQWxEOztBQUVBLGdCQUFJOGlCLFFBQVFqbEIsR0FBRzJPLFlBQUgsQ0FBZ0IrVixJQUFoQixFQUFzQixJQUF0QixDQUFaOztBQUVBTyxrQkFBTXJqQixJQUFOO0FBQ0E1QixlQUFHNEIsSUFBSCxHQUFVekUsUUFBVixDQUFtQnVjLFNBQVM0SyxXQUE1Qjs7QUFFQSxnQkFBSXhmLFlBQVksS0FBaEIsRUFDQTtBQUNJbk0sMkJBQVcsQ0FBWDtBQUNIOztBQUVEa2dCLGlCQUFLb00sTUFBTTlwQixNQUFOLEdBQWV1RSxNQUFwQjs7QUFFQSxnQkFBSWdhLFNBQVN4VixNQUFiLEVBQ0E7QUFDSUEsdUJBQU9sRSxFQUFQO0FBQ0g7O0FBRUQsZ0JBQUk4RSxZQUFZLEtBQWhCLEVBQ0E7QUFDSW5NLDJCQUFXK2dCLFNBQVMxQyxLQUFwQjtBQUNIO0FBQ0osU0F0Q0Q7O0FBd0NBLGFBQUtrTyxJQUFMLEdBQVksVUFBU3BnQixPQUFULEVBQ1o7QUFDSSxnQkFBSUEsWUFBWSxLQUFoQixFQUNBO0FBQ0luTSwyQkFBVyxDQUFYO0FBQ0g7O0FBRUQsZ0JBQUkrRyxTQUFTZ2xCLEtBQUtqbkIsSUFBTCxDQUFVLE1BQU1pYyxTQUFTNEssV0FBekIsQ0FBYjtBQUFBLGdCQUNJYSxRQUFRemxCLE9BQU9pUCxZQUFQLENBQW9CK1YsSUFBcEIsRUFBMEIsSUFBMUIsRUFBZ0N2cEIsTUFENUM7O0FBR0EsZ0JBQUlncUIsUUFBUSxDQUFaLEVBQ0E7QUFDSXRNLHFCQUFLLENBQUNzTSxLQUFOLEVBQWEsWUFDYjtBQUNJemxCLDJCQUFPbkUsV0FBUCxDQUFtQm1lLFNBQVM0SyxXQUE1QjtBQUNILGlCQUhEOztBQUtBLG9CQUFJNUssU0FBU3hWLE1BQWIsRUFDQTtBQUNJQSwyQkFBT3BNLEVBQUU0SCxPQUFPaVAsWUFBUCxDQUFvQitWLElBQXBCLEVBQTBCLElBQTFCLEVBQWdDMVEsR0FBaEMsQ0FBb0NtUixRQUFRLENBQTVDLENBQUYsRUFBa0Q5bEIsTUFBbEQsRUFBUDtBQUNIO0FBQ0o7O0FBRUQsZ0JBQUl5RixZQUFZLEtBQWhCLEVBQ0E7QUFDSW5NLDJCQUFXK2dCLFNBQVMxQyxLQUFwQjtBQUNIO0FBQ0osU0EzQkQ7O0FBNkJBLGFBQUtsSyxPQUFMLEdBQWUsWUFDZjtBQUNJaFYsY0FBRSxNQUFNNGhCLFNBQVM2SyxXQUFqQixFQUE4QkcsSUFBOUIsRUFBb0NocEIsTUFBcEM7QUFDQTVELGNBQUUsR0FBRixFQUFPNHNCLElBQVAsRUFBYW5wQixXQUFiLENBQXlCLE1BQXpCLEVBQWlDZ0osR0FBakMsQ0FBcUMsT0FBckM7O0FBRUFtZ0IsaUJBQUtucEIsV0FBTCxDQUFpQixhQUFqQixFQUFnQytKLEdBQWhDLENBQW9DLHFCQUFwQyxFQUEyRCxFQUEzRDtBQUNBcWYsaUJBQUtyZixHQUFMLENBQVMscUJBQVQsRUFBZ0MsRUFBaEM7QUFDSCxTQVBEOztBQVNBLFlBQUk1RixTQUFTZ2xCLEtBQUtqbkIsSUFBTCxDQUFVLE1BQU1pYyxTQUFTNEssV0FBekIsQ0FBYjs7QUFFQSxZQUFJNWtCLE9BQU92RSxNQUFQLEdBQWdCLENBQXBCLEVBQ0E7QUFDSXVFLG1CQUFPbkUsV0FBUCxDQUFtQm1lLFNBQVM0SyxXQUE1Qjs7QUFFQSxpQkFBS1UsSUFBTCxDQUFVdGxCLE1BQVYsRUFBa0IsS0FBbEI7QUFDSDs7QUFFRCxlQUFPLElBQVA7QUFDSCxLQWhPRDtBQWlPSCxDQXJPQyxFQXFPQTlILE1Bck9BLENBQUQ7OztBQ1BEO0FBQ0E7QUFDQTs7QUFFQSxJQUFJd3RCLFNBQVUsVUFBVXR0QixDQUFWLEVBQWE7QUFDdkI7O0FBRUEsUUFBSXV0QixNQUFNLEVBQVY7O0FBRUE7OztBQUdBQSxRQUFJcGUsSUFBSixHQUFXLFlBQVk7QUFDbkJxZTtBQUNBQztBQUNILEtBSEQ7O0FBS0E7OztBQUdBLGFBQVNELHlCQUFULEdBQXFDLENBQ3BDOztBQUVEOzs7QUFHQSxhQUFTQyxxQkFBVCxHQUFpQztBQUM3QjtBQUNBenRCLFVBQUUsZ0RBQUYsRUFBb0RpUSxLQUFwRCxDQUNJLFlBQVk7QUFDUmpRLGNBQUUsSUFBRixFQUFRcUYsUUFBUixDQUFpQixNQUFqQixFQUF5Qm1DLFFBQXpCLENBQWtDLEdBQWxDLEVBQXVDdkUsSUFBdkMsQ0FBNEMsZUFBNUMsRUFBNkQsTUFBN0Q7QUFDSCxTQUhMLEVBSUksWUFBWTtBQUNSakQsY0FBRSxJQUFGLEVBQVF5RCxXQUFSLENBQW9CLE1BQXBCLEVBQTRCK0QsUUFBNUIsQ0FBcUMsR0FBckMsRUFBMEN2RSxJQUExQyxDQUErQyxlQUEvQyxFQUFnRSxPQUFoRTtBQUNILFNBTkwsRUFPRStNLEtBUEYsQ0FPUSxVQUFVck8sS0FBVixFQUFpQjtBQUNyQjtBQUNBQSxrQkFBTXNKLGVBQU47QUFDQTtBQUNILFNBWEQ7O0FBYUE7QUFDQWpMLFVBQUUsbUJBQUYsRUFBdUIwQyxFQUF2QixDQUEwQixPQUExQixFQUFtQyxVQUFVVCxDQUFWLEVBQWE7QUFDNUNBLGNBQUVtQixjQUFGO0FBQ0FwRCxjQUFFLFlBQUYsRUFBZ0JnTixPQUFoQixDQUF3QjtBQUNwQlYsMkJBQVd0TSxFQUFFLGVBQUYsRUFBbUIwUyxNQUFuQixHQUE0QmI7QUFEbkIsYUFBeEIsRUFFRyxHQUZIO0FBR0gsU0FMRDtBQU9IOztBQUVEOzs7QUFHQTZiLFdBQU9DLFNBQVAsQ0FBaUJDLGNBQWpCLEdBQWtDO0FBQzlCQyxnQkFBUSxnQkFBVUMsT0FBVixFQUFtQmxNLFFBQW5CLEVBQTZCO0FBQ2pDLGdCQUFJLE9BQU9BLFNBQVNnTSxjQUFoQixLQUFtQyxXQUFuQyxJQUNHNXRCLEVBQUUsY0FBRixFQUFrQnFELE1BQWxCLEdBQTJCLENBRGxDLEVBQ3FDO0FBQ2pDO0FBQ0g7O0FBRUQsZ0JBQUkwcUIsVUFBVSxFQUFkO0FBQUEsZ0JBQ0lDLHNCQUFzQmh1QixFQUFFLHNCQUFGLENBRDFCO0FBRUEsaUJBQUssSUFBSXVLLElBQUksQ0FBYixFQUFnQkEsSUFBSXFYLFNBQVNnTSxjQUFULENBQXdCdnFCLE1BQTVDLEVBQW9Ea0gsR0FBcEQsRUFBeUQ7QUFDckR3akIsd0JBQVF2WCxJQUFSLENBQWFvTCxTQUFTZ00sY0FBVCxDQUF3QnJqQixDQUF4QixFQUEyQitjLEdBQXhDO0FBQ0g7QUFDRDBHLGdDQUFvQkMsV0FBcEIsQ0FBZ0NGLE9BQWhDLEVBQXlDO0FBQ3JDO0FBQ0E1c0IsMEJBQVUsT0FGMkIsRUFFbEIrc0IsTUFBTSxHQUZZLEVBRVA5bkIsUUFBUTtBQUZELGFBQXpDOztBQUtBO0FBQ0EsZ0JBQUkrbkIsdUJBQXVCLHdDQUEzQjtBQUFBLGdCQUNJQyxvQkFBb0J4TSxTQUFTd00saUJBRGpDO0FBRUFwdUIsY0FBRU8sUUFBRixFQUFZbUMsRUFBWixDQUFlO0FBQ1gsOEJBQWMsc0JBQVc7QUFDckIsd0JBQUkyckIsU0FBU3J1QixFQUFFLElBQUYsRUFBUTRXLE9BQVIsQ0FBZ0IsNERBQWhCLENBQWI7QUFDQSx3QkFBSXlYLE9BQU9ockIsTUFBWCxFQUFtQjtBQUNqQjNCLG1DQUFXLFlBQVc7QUFDbEIsZ0NBQUkyc0IsT0FBT3hxQixRQUFQLENBQWdCLFFBQWhCLENBQUosRUFBK0I7QUFDM0I3RCxrQ0FBRW11QixvQkFBRixFQUF3QjFLLE1BQXhCLENBQStCLFFBQS9CLEVBQXlDNkssU0FBekM7QUFDSDtBQUNKLHlCQUpELEVBSUdGLGlCQUpIO0FBS0Q7QUFDSjtBQVZVLGFBQWYsRUFXR0Qsb0JBWEg7QUFZSCxTQWhDNkI7O0FBa0M5QnJrQixjQUFNLGNBQVV5a0IsR0FBVixFQUFlO0FBQ2pCLGdCQUFJQyxLQUFLLENBQVQ7QUFBQSxnQkFDSUMsZUFBZXp1QixFQUFFLHNCQUFGLEVBQTBCaUUsSUFBMUIsQ0FBK0IsYUFBL0IsQ0FEbkI7QUFBQSxnQkFFSXlxQixXQUFXLElBRmY7O0FBSUEsZ0JBQUksT0FBT2hCLE9BQU85TCxRQUFQLENBQWdCZ00sY0FBdkIsS0FBMEMsV0FBMUMsSUFDRyxPQUFPYSxZQUFQLEtBQXdCLFdBRC9CLEVBQzRDO0FBQ3hDO0FBQ0g7O0FBR0QsaUJBQUssSUFBSWxrQixJQUFJLENBQWIsRUFBZ0JBLElBQUltakIsT0FBTzlMLFFBQVAsQ0FBZ0JnTSxjQUFoQixDQUErQnZxQixNQUFuRCxFQUEyRGtILEdBQTNELEVBQWdFO0FBQzVELG9CQUFJZ2tCLE9BQU9iLE9BQU85TCxRQUFQLENBQWdCZ00sY0FBaEIsQ0FBK0JyakIsQ0FBL0IsRUFBa0NmLEVBQTdDLEVBQWlEO0FBQzdDaWxCLGlDQUFhM2tCLElBQWIsQ0FBa0Iwa0IsRUFBbEI7QUFDQUUsK0JBQVcsS0FBWDtBQUNBO0FBQ0g7QUFDREY7QUFDSDs7QUFFRCxnQkFBSUUsUUFBSixFQUFjO0FBQ1ZELDZCQUFhM2tCLElBQWIsQ0FBa0IsQ0FBbEI7QUFDSDtBQUNKO0FBekQ2QixLQUFsQzs7QUE0REE7OztBQUdBNGpCLFdBQU9DLFNBQVAsQ0FBaUJnQixZQUFqQixHQUFnQztBQUM1QmQsZ0JBQVEsZ0JBQVVDLE9BQVYsRUFBbUJsTSxRQUFuQixFQUE2QjtBQUNqQyxnQkFBSSxDQUFDNWhCLEVBQUUsa0JBQUYsRUFBc0JxRCxNQUEzQixFQUFtQztBQUMvQjtBQUNIOztBQUVELGdCQUFJdXJCLE1BQU01dUIsRUFBRW9KLE1BQUYsRUFBVXVKLE1BQVYsRUFBVjs7QUFDQTtBQUNBa2Msd0JBQVksTUFBTSxFQUZsQjtBQUFBLGdCQUdBQyxlQUFlLE1BQU0sRUFIckI7QUFBQSxnQkFJQUMsZUFBZSxHQUpmO0FBQUEsZ0JBS0FDLFVBQVVKLE1BQU1DLFNBQU4sR0FBa0JDLFlBQWxCLEdBQWlDQyxZQUwzQztBQUFBLGdCQU1BRSxRQUFRLEdBTlI7QUFBQSxnQkFPQUMsUUFBUSxHQVBSOztBQVNBRixzQkFBVUEsVUFBVUMsS0FBVixHQUFrQkEsS0FBbEIsR0FBMkJELFVBQVVFLEtBQVYsR0FBa0JBLEtBQWxCLEdBQTBCRixPQUEvRDtBQUNBaHZCLGNBQUUseUhBQUYsRUFBNkgyUyxNQUE3SCxDQUFvSXFjLE9BQXBJO0FBQ0g7QUFqQjJCLEtBQWhDOztBQW9CQXRCLFdBQU95QixLQUFQLENBQWFyc0IsU0FBYixDQUF1QnNzQixTQUF2QixHQUFtQyxZQUFZO0FBQzNDLFlBQUkzZixPQUFPLEVBQVg7QUFDQUEsZ0JBQVEsMkRBQVI7QUFDQUEsZ0JBQVEsK0NBQVI7QUFDQUEsZ0JBQVEsb0VBQVI7QUFDQUEsZ0JBQVEsbUdBQVI7QUFDQUEsZ0JBQVEsU0FBUjtBQUNBQSxnQkFBUSxRQUFSO0FBQ0EsZUFBT0EsSUFBUDtBQUNILEtBVEQ7O0FBV0E7OztBQUdBaWUsV0FBT0MsU0FBUCxDQUFpQjBCLHVCQUFqQixHQUEyQztBQUN2Q3hCLGdCQUFRLGdCQUFVQyxPQUFWLEVBQW1CbE0sUUFBbkIsRUFBNkI7QUFDakMsZ0JBQUkwTixhQUFhdHZCLEVBQUUsa0JBQUYsQ0FBakI7QUFDQSxnQkFBSSxDQUFDc3ZCLFdBQVdDLElBQVgsR0FBa0Jsc0IsTUFBdkIsRUFBK0I7QUFDM0I7QUFDSDs7QUFFRGlzQix1QkFBV3pvQixLQUFYLENBQWlCO0FBQ2JxWSx1QkFBTyxHQURNO0FBRWJsUSx5QkFBUyxDQUZJO0FBR2J3Z0Isa0NBQWtCLFFBSEw7QUFJYkMsdUJBQU8sWUFKTTtBQUtiMUwsd0JBQVEsZ0JBQVUyTCxnQkFBVixFQUE0QkMsZ0JBQTVCLEVBQThDbHJCLE9BQTlDLEVBQXVEbXJCLFdBQXZELEVBQW9FO0FBQ3hFLHdCQUFJQyxVQUFVN3ZCLEVBQUUydkIsZ0JBQUYsRUFBb0IxckIsSUFBcEIsQ0FBeUIsSUFBekIsQ0FBZDtBQUNBLHdCQUFJLE9BQU95cEIsT0FBT0MsU0FBUCxDQUFpQkMsY0FBeEIsS0FBMkMsV0FBL0MsRUFBNEQ7QUFDeERGLCtCQUFPQyxTQUFQLENBQWlCQyxjQUFqQixDQUFnQzlqQixJQUFoQyxDQUFxQytsQixPQUFyQztBQUNIO0FBQ0osaUJBVlk7QUFXYkMsb0NBQW9CLDRCQUFVQyxHQUFWLEVBQWUxbkIsS0FBZixFQUFzQjtBQUN0Qyx3QkFBSTJuQixTQUFTaHdCLEVBQUVxSSxLQUFGLENBQWI7QUFBQSx3QkFDSWEsVUFBVSxFQURkO0FBRUEsd0JBQUksT0FBTzhtQixPQUFPL3JCLElBQVAsQ0FBWSxRQUFaLENBQVAsS0FBaUMsV0FBckMsRUFBa0Q7QUFDOUNpRixrQ0FBVSxjQUFjOG1CLE9BQU8vckIsSUFBUCxDQUFZLFFBQVosQ0FBZCxHQUFzQyxHQUFoRDtBQUNIO0FBQ0QsMkJBQU8sc0NBQXNDK3JCLE9BQU8vckIsSUFBUCxDQUFZLEtBQVosQ0FBdEMsR0FBMkQsR0FBM0QsR0FBaUVpRixPQUFqRSxHQUEyRSxTQUEzRSxHQUF1RjhtQixPQUFPL3JCLElBQVAsQ0FBWSxNQUFaLENBQXZGLEdBQTZHLG1CQUFwSDtBQUNILGlCQWxCWTtBQW1CYmdzQiw0QkFBWSxXQW5CQztBQW9CYkMsbUNBQW1CO0FBcEJOLGFBQWpCOztBQXVCQWx3QixjQUFFLGdCQUFGLEVBQW9CMEMsRUFBcEIsQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBVVQsQ0FBVixFQUFhO0FBQ3pDQSxrQkFBRWdKLGVBQUY7QUFDSCxhQUZEO0FBR0g7QUFqQ3NDLEtBQTNDOztBQW9DQSxXQUFPc2lCLEdBQVA7QUFFSCxDQXpMWSxDQXlMVnp0QixNQXpMVSxDQUFiOzs7QUNKQTtBQUNBLENBQUMsVUFBVUUsQ0FBVixFQUFhO0FBQ1Y7O0FBRUE7O0FBQ0EsUUFBSW13QixPQUFKLEVBQWFDLE9BQWI7O0FBRUF0d0IsV0FBT3V3QixPQUFQLEdBQWlCLFVBQVVDLEVBQVYsRUFBZTtBQUM1QkEsYUFBS0EsR0FBRzdSLFdBQUgsRUFBTDs7QUFFQSxZQUFJOFIsUUFBUSx3QkFBd0JqSSxJQUF4QixDQUE4QmdJLEVBQTlCLEtBQ1Isd0JBQXdCaEksSUFBeEIsQ0FBOEJnSSxFQUE5QixDQURRLElBRVIscUNBQXFDaEksSUFBckMsQ0FBMkNnSSxFQUEzQyxDQUZRLElBR1Isa0JBQWtCaEksSUFBbEIsQ0FBd0JnSSxFQUF4QixDQUhRLElBSVJBLEdBQUcvSSxPQUFILENBQVcsWUFBWCxJQUEyQixDQUEzQixJQUFnQyxnQ0FBZ0NlLElBQWhDLENBQXNDZ0ksRUFBdEMsQ0FKeEIsSUFLUixFQUxKOztBQU9BLGVBQU87QUFDSEYscUJBQVNHLE1BQU8sQ0FBUCxLQUFjLEVBRHBCO0FBRUh0d0IscUJBQVNzd0IsTUFBTyxDQUFQLEtBQWM7QUFGcEIsU0FBUDtBQUlILEtBZEQ7O0FBZ0JBSixjQUFVcndCLE9BQU91d0IsT0FBUCxDQUFnQkcsVUFBVUMsU0FBMUIsQ0FBVjtBQUNBTCxjQUFVLEVBQVY7O0FBRUEsUUFBS0QsUUFBUUMsT0FBYixFQUF1QjtBQUNuQkEsZ0JBQVNELFFBQVFDLE9BQWpCLElBQTZCLElBQTdCO0FBQ0FBLGdCQUFRbndCLE9BQVIsR0FBa0Jrd0IsUUFBUWx3QixPQUExQjtBQUNIOztBQUVEO0FBQ0EsUUFBS213QixRQUFRTSxNQUFiLEVBQXNCO0FBQ2xCTixnQkFBUU8sTUFBUixHQUFpQixJQUFqQjtBQUNILEtBRkQsTUFFTyxJQUFLUCxRQUFRTyxNQUFiLEVBQXNCO0FBQ3pCUCxnQkFBUVEsTUFBUixHQUFpQixJQUFqQjtBQUNIOztBQUVEOXdCLFdBQU9zd0IsT0FBUCxHQUFpQkEsT0FBakI7O0FBRUE7QUFDQTlDLFdBQU9uZSxJQUFQOztBQUVBO0FBQ0FuUCxNQUFFLHVDQUFGLEVBQ0syRixJQURMLENBQ1UscUJBRFYsRUFFSzRCLE1BRkwsR0FHSzNELE1BSEw7O0FBS0E7QUFDQTVELE1BQUUsY0FBRixFQUNLMkYsSUFETCxDQUNVLFdBRFYsRUFFS2xDLFdBRkw7O0FBSUF6RCxNQUFFLGVBQUYsRUFBbUJxaEIsSUFBbkIsQ0FBd0I7QUFDcEJ2Z0IsY0FBTSxXQURjO0FBRXBCcWUsY0FBTSxNQUZjO0FBR3BCQyxrQkFBVSxLQUhVO0FBSXBCNkMsa0JBQVUsS0FKVTtBQUtwQkosZ0JBQVE7QUFMWSxLQUF4Qjs7QUFRQTtBQUNBN2hCLE1BQUUsb0JBQUYsRUFBd0Jzc0IsTUFBeEIsQ0FBK0I7QUFDM0IvYyxlQUFPLElBRG9CO0FBRTNCZ2QsZUFBTztBQUZvQixLQUEvQjs7QUFLQXZzQixNQUFFLFFBQUYsRUFBWTZ3QixNQUFaLENBQW1CLFlBQVc7QUFDMUIsWUFBSTl0QixRQUFRL0MsRUFBRSxJQUFGLENBQVo7QUFDQSxZQUFJK0MsTUFBTW1DLEdBQU4sTUFBZSxFQUFuQixFQUF1QjtBQUNuQm5DLGtCQUFNc0MsUUFBTixDQUFlLE9BQWY7QUFDSCxTQUZELE1BRU87QUFDSHRDLGtCQUFNVSxXQUFOLENBQWtCLE9BQWxCO0FBQ0g7QUFDSixLQVBELEVBT0dvdEIsTUFQSDs7QUFTQTtBQUNBbkQsV0FBT0MsU0FBUCxDQUFpQm1ELHFCQUFqQixHQUF5QztBQUNyQ2pELGdCQUFRLGdCQUFTQyxPQUFULEVBQWtCbE0sUUFBbEIsRUFBMkI7QUFDL0I1aEIsY0FBRSwrQkFBRixFQUFtQ3V2QixJQUFuQyxDQUF3Qyx1QkFBeEMsRUFBaUUsWUFBVztBQUN4RXZ2QixrQkFBRSxjQUFGLEVBQWtCZ1EsS0FBbEIsQ0FBd0IsVUFBU3JPLEtBQVQsRUFBZ0I7QUFDcENBLDBCQUFNc0osZUFBTjtBQUNILGlCQUZEOztBQUlBakwsa0JBQUUsSUFBRixFQUFRMEMsRUFBUixDQUFXLE9BQVgsRUFBb0IsVUFBU2YsS0FBVCxFQUFnQjtBQUNoQytyQiwyQkFBT3FELE1BQVAsQ0FBYzNsQixLQUFkLENBQW9CNUksT0FBcEI7QUFDSCxpQkFGRDtBQUdILGFBUkQ7QUFTSDtBQVhvQyxLQUF6Qzs7QUFjQSxhQUFTd3VCLDJCQUFULEdBQXVDO0FBQ25DLFlBQUlDLFVBQVVqeEIsRUFBRSxzQkFBRixDQUFkO0FBQUEsWUFDSXl1QixlQUFlenVCLEVBQUUsY0FBRixDQURuQjtBQUFBLFlBRUkyUyxTQUFTOGIsYUFBYW5VLFdBQWIsQ0FBeUIsSUFBekIsQ0FGYjs7QUFJQTJXLGdCQUFRempCLEdBQVIsQ0FBWSxRQUFaLEVBQXNCbUYsTUFBdEI7QUFDSDtBQUNEcWUsa0NBbEdVLENBa0dxQjs7QUFFL0I7QUFDQXRELFdBQU9DLFNBQVAsQ0FBaUJ1RCxTQUFqQixHQUE2QjtBQUN6QnJELGdCQUFRLGdCQUFTQyxPQUFULEVBQWtCbE0sUUFBbEIsRUFBMkI7QUFDL0I1aEIsY0FBRSxPQUFGLEVBQVd1dkIsSUFBWCxDQUFnQixXQUFoQixFQUE2QixZQUFXO0FBQ3BDdnZCLGtCQUFFLElBQUYsRUFBUWdrQixVQUFSO0FBQ0gsYUFGRDtBQUdIO0FBTHdCLEtBQTdCOztBQVFBO0FBQ0Foa0IsTUFBRSxtQkFBRixFQUF1QjBDLEVBQXZCLENBQTBCLE9BQTFCLEVBQW1DLFVBQVNmLEtBQVQsRUFBZ0I7QUFDL0NBLGNBQU15QixjQUFOOztBQUVBLFlBQUlzQixXQUFXMUUsRUFBRSxJQUFGLENBQWY7QUFBQSxZQUNJaUosT0FBT3ZFLFNBQVN6QixJQUFULENBQWMsTUFBZCxDQURYOztBQUdBeWhCLGFBQUt6YixJQUFMO0FBQ0gsS0FQRDs7QUFTQTtBQUNBakosTUFBRSx5QkFBRixFQUE2QjBDLEVBQTdCLENBQWdDLE9BQWhDLEVBQXlDLFVBQVNmLEtBQVQsRUFBZ0I7QUFDckRBLGNBQU15QixjQUFOOztBQUVBLFlBQUlzQixXQUFXMUUsRUFBRSxJQUFGLENBQWY7QUFBQSxZQUNJbUQsVUFBVXVCLFNBQVNrUyxPQUFULENBQWlCLGlCQUFqQixDQURkOztBQUdBelQsZ0JBQVF5QyxXQUFSLENBQW9CLFNBQXBCO0FBQ0gsS0FQRDs7QUFTQTtBQUNBNUYsTUFBRSxpQkFBRixFQUFxQmdFLElBQXJCLENBQTBCLFlBQVc7QUFDakMsWUFBSVUsV0FBVzFFLEVBQUUsSUFBRixDQUFmOztBQUVBMEUsaUJBQVN6QixJQUFULENBQWMsUUFBZCxFQUF3QixRQUF4QjtBQUNILEtBSkQ7QUFNSCxDQXhJRCxFQXdJR25ELE1BeElIIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQm9vdHN0cmFwIHYzLjMuNyAoaHR0cDovL2dldGJvb3RzdHJhcC5jb20pXG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5cbmlmICh0eXBlb2YgalF1ZXJ5ID09PSAndW5kZWZpbmVkJykge1xuICB0aHJvdyBuZXcgRXJyb3IoJ0Jvb3RzdHJhcFxcJ3MgSmF2YVNjcmlwdCByZXF1aXJlcyBqUXVlcnknKVxufVxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgdmVyc2lvbiA9ICQuZm4uanF1ZXJ5LnNwbGl0KCcgJylbMF0uc3BsaXQoJy4nKVxuICBpZiAoKHZlcnNpb25bMF0gPCAyICYmIHZlcnNpb25bMV0gPCA5KSB8fCAodmVyc2lvblswXSA9PSAxICYmIHZlcnNpb25bMV0gPT0gOSAmJiB2ZXJzaW9uWzJdIDwgMSkgfHwgKHZlcnNpb25bMF0gPiAzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQm9vdHN0cmFwXFwncyBKYXZhU2NyaXB0IHJlcXVpcmVzIGpRdWVyeSB2ZXJzaW9uIDEuOS4xIG9yIGhpZ2hlciwgYnV0IGxvd2VyIHRoYW4gdmVyc2lvbiA0JylcbiAgfVxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogdHJhbnNpdGlvbi5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI3RyYW5zaXRpb25zXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gQ1NTIFRSQU5TSVRJT04gU1VQUE9SVCAoU2hvdXRvdXQ6IGh0dHA6Ly93d3cubW9kZXJuaXpyLmNvbS8pXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQoKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYm9vdHN0cmFwJylcblxuICAgIHZhciB0cmFuc0VuZEV2ZW50TmFtZXMgPSB7XG4gICAgICBXZWJraXRUcmFuc2l0aW9uIDogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgICAgTW96VHJhbnNpdGlvbiAgICA6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgIE9UcmFuc2l0aW9uICAgICAgOiAnb1RyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQnLFxuICAgICAgdHJhbnNpdGlvbiAgICAgICA6ICd0cmFuc2l0aW9uZW5kJ1xuICAgIH1cblxuICAgIGZvciAodmFyIG5hbWUgaW4gdHJhbnNFbmRFdmVudE5hbWVzKSB7XG4gICAgICBpZiAoZWwuc3R5bGVbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4geyBlbmQ6IHRyYW5zRW5kRXZlbnROYW1lc1tuYW1lXSB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlIC8vIGV4cGxpY2l0IGZvciBpZTggKCAgLl8uKVxuICB9XG5cbiAgLy8gaHR0cDovL2Jsb2cuYWxleG1hY2Nhdy5jb20vY3NzLXRyYW5zaXRpb25zXG4gICQuZm4uZW11bGF0ZVRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiAoZHVyYXRpb24pIHtcbiAgICB2YXIgY2FsbGVkID0gZmFsc2VcbiAgICB2YXIgJGVsID0gdGhpc1xuICAgICQodGhpcykub25lKCdic1RyYW5zaXRpb25FbmQnLCBmdW5jdGlvbiAoKSB7IGNhbGxlZCA9IHRydWUgfSlcbiAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7IGlmICghY2FsbGVkKSAkKCRlbCkudHJpZ2dlcigkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQpIH1cbiAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCBkdXJhdGlvbilcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgJChmdW5jdGlvbiAoKSB7XG4gICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uRW5kKClcblxuICAgIGlmICghJC5zdXBwb3J0LnRyYW5zaXRpb24pIHJldHVyblxuXG4gICAgJC5ldmVudC5zcGVjaWFsLmJzVHJhbnNpdGlvbkVuZCA9IHtcbiAgICAgIGJpbmRUeXBlOiAkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQsXG4gICAgICBkZWxlZ2F0ZVR5cGU6ICQuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCxcbiAgICAgIGhhbmRsZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmlzKHRoaXMpKSByZXR1cm4gZS5oYW5kbGVPYmouaGFuZGxlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBhbGVydC5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2FsZXJ0c1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIEFMRVJUIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBkaXNtaXNzID0gJ1tkYXRhLWRpc21pc3M9XCJhbGVydFwiXSdcbiAgdmFyIEFsZXJ0ICAgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAkKGVsKS5vbignY2xpY2snLCBkaXNtaXNzLCB0aGlzLmNsb3NlKVxuICB9XG5cbiAgQWxlcnQuVkVSU0lPTiA9ICczLjMuNydcblxuICBBbGVydC5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgQWxlcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgICAgPSAkKHRoaXMpXG4gICAgdmFyIHNlbGVjdG9yID0gJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKVxuXG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgc2VsZWN0b3IgPSAkdGhpcy5hdHRyKCdocmVmJylcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgJiYgc2VsZWN0b3IucmVwbGFjZSgvLiooPz0jW15cXHNdKiQpLywgJycpIC8vIHN0cmlwIGZvciBpZTdcbiAgICB9XG5cbiAgICB2YXIgJHBhcmVudCA9ICQoc2VsZWN0b3IgPT09ICcjJyA/IFtdIDogc2VsZWN0b3IpXG5cbiAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBpZiAoISRwYXJlbnQubGVuZ3RoKSB7XG4gICAgICAkcGFyZW50ID0gJHRoaXMuY2xvc2VzdCgnLmFsZXJ0JylcbiAgICB9XG5cbiAgICAkcGFyZW50LnRyaWdnZXIoZSA9ICQuRXZlbnQoJ2Nsb3NlLmJzLmFsZXJ0JykpXG5cbiAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdpbicpXG5cbiAgICBmdW5jdGlvbiByZW1vdmVFbGVtZW50KCkge1xuICAgICAgLy8gZGV0YWNoIGZyb20gcGFyZW50LCBmaXJlIGV2ZW50IHRoZW4gY2xlYW4gdXAgZGF0YVxuICAgICAgJHBhcmVudC5kZXRhY2goKS50cmlnZ2VyKCdjbG9zZWQuYnMuYWxlcnQnKS5yZW1vdmUoKVxuICAgIH1cblxuICAgICQuc3VwcG9ydC50cmFuc2l0aW9uICYmICRwYXJlbnQuaGFzQ2xhc3MoJ2ZhZGUnKSA/XG4gICAgICAkcGFyZW50XG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIHJlbW92ZUVsZW1lbnQpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChBbGVydC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICByZW1vdmVFbGVtZW50KClcbiAgfVxuXG5cbiAgLy8gQUxFUlQgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgPSAkdGhpcy5kYXRhKCdicy5hbGVydCcpXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuYWxlcnQnLCAoZGF0YSA9IG5ldyBBbGVydCh0aGlzKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dLmNhbGwoJHRoaXMpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLmFsZXJ0XG5cbiAgJC5mbi5hbGVydCAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmFsZXJ0LkNvbnN0cnVjdG9yID0gQWxlcnRcblxuXG4gIC8vIEFMRVJUIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5hbGVydC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uYWxlcnQgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBBTEVSVCBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PVxuXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5icy5hbGVydC5kYXRhLWFwaScsIGRpc21pc3MsIEFsZXJ0LnByb3RvdHlwZS5jbG9zZSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogYnV0dG9uLmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jYnV0dG9uc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIEJVVFRPTiBQVUJMSUMgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgQnV0dG9uID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ICA9ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgICA9ICQuZXh0ZW5kKHt9LCBCdXR0b24uREVGQVVMVFMsIG9wdGlvbnMpXG4gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICB9XG5cbiAgQnV0dG9uLlZFUlNJT04gID0gJzMuMy43J1xuXG4gIEJ1dHRvbi5ERUZBVUxUUyA9IHtcbiAgICBsb2FkaW5nVGV4dDogJ2xvYWRpbmcuLi4nXG4gIH1cblxuICBCdXR0b24ucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgdmFyIGQgICAgPSAnZGlzYWJsZWQnXG4gICAgdmFyICRlbCAgPSB0aGlzLiRlbGVtZW50XG4gICAgdmFyIHZhbCAgPSAkZWwuaXMoJ2lucHV0JykgPyAndmFsJyA6ICdodG1sJ1xuICAgIHZhciBkYXRhID0gJGVsLmRhdGEoKVxuXG4gICAgc3RhdGUgKz0gJ1RleHQnXG5cbiAgICBpZiAoZGF0YS5yZXNldFRleHQgPT0gbnVsbCkgJGVsLmRhdGEoJ3Jlc2V0VGV4dCcsICRlbFt2YWxdKCkpXG5cbiAgICAvLyBwdXNoIHRvIGV2ZW50IGxvb3AgdG8gYWxsb3cgZm9ybXMgdG8gc3VibWl0XG4gICAgc2V0VGltZW91dCgkLnByb3h5KGZ1bmN0aW9uICgpIHtcbiAgICAgICRlbFt2YWxdKGRhdGFbc3RhdGVdID09IG51bGwgPyB0aGlzLm9wdGlvbnNbc3RhdGVdIDogZGF0YVtzdGF0ZV0pXG5cbiAgICAgIGlmIChzdGF0ZSA9PSAnbG9hZGluZ1RleHQnKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgICAkZWwuYWRkQ2xhc3MoZCkuYXR0cihkLCBkKS5wcm9wKGQsIHRydWUpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNMb2FkaW5nKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgJGVsLnJlbW92ZUNsYXNzKGQpLnJlbW92ZUF0dHIoZCkucHJvcChkLCBmYWxzZSlcbiAgICAgIH1cbiAgICB9LCB0aGlzKSwgMClcbiAgfVxuXG4gIEJ1dHRvbi5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjaGFuZ2VkID0gdHJ1ZVxuICAgIHZhciAkcGFyZW50ID0gdGhpcy4kZWxlbWVudC5jbG9zZXN0KCdbZGF0YS10b2dnbGU9XCJidXR0b25zXCJdJylcblxuICAgIGlmICgkcGFyZW50Lmxlbmd0aCkge1xuICAgICAgdmFyICRpbnB1dCA9IHRoaXMuJGVsZW1lbnQuZmluZCgnaW5wdXQnKVxuICAgICAgaWYgKCRpbnB1dC5wcm9wKCd0eXBlJykgPT0gJ3JhZGlvJykge1xuICAgICAgICBpZiAoJGlucHV0LnByb3AoJ2NoZWNrZWQnKSkgY2hhbmdlZCA9IGZhbHNlXG4gICAgICAgICRwYXJlbnQuZmluZCgnLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgfSBlbHNlIGlmICgkaW5wdXQucHJvcCgndHlwZScpID09ICdjaGVja2JveCcpIHtcbiAgICAgICAgaWYgKCgkaW5wdXQucHJvcCgnY2hlY2tlZCcpKSAhPT0gdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnYWN0aXZlJykpIGNoYW5nZWQgPSBmYWxzZVxuICAgICAgICB0aGlzLiRlbGVtZW50LnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgfVxuICAgICAgJGlucHV0LnByb3AoJ2NoZWNrZWQnLCB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdhY3RpdmUnKSlcbiAgICAgIGlmIChjaGFuZ2VkKSAkaW5wdXQudHJpZ2dlcignY2hhbmdlJylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLXByZXNzZWQnLCAhdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnYWN0aXZlJykpXG4gICAgICB0aGlzLiRlbGVtZW50LnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxuICAgIH1cbiAgfVxuXG5cbiAgLy8gQlVUVE9OIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5idXR0b24nKVxuICAgICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvblxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmJ1dHRvbicsIChkYXRhID0gbmV3IEJ1dHRvbih0aGlzLCBvcHRpb25zKSkpXG5cbiAgICAgIGlmIChvcHRpb24gPT0gJ3RvZ2dsZScpIGRhdGEudG9nZ2xlKClcbiAgICAgIGVsc2UgaWYgKG9wdGlvbikgZGF0YS5zZXRTdGF0ZShvcHRpb24pXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLmJ1dHRvblxuXG4gICQuZm4uYnV0dG9uICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4uYnV0dG9uLkNvbnN0cnVjdG9yID0gQnV0dG9uXG5cblxuICAvLyBCVVRUT04gTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5idXR0b24ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmJ1dHRvbiA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIEJVVFRPTiBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PT1cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbignY2xpY2suYnMuYnV0dG9uLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZV49XCJidXR0b25cIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyICRidG4gPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuYnRuJylcbiAgICAgIFBsdWdpbi5jYWxsKCRidG4sICd0b2dnbGUnKVxuICAgICAgaWYgKCEoJChlLnRhcmdldCkuaXMoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXSwgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykpKSB7XG4gICAgICAgIC8vIFByZXZlbnQgZG91YmxlIGNsaWNrIG9uIHJhZGlvcywgYW5kIHRoZSBkb3VibGUgc2VsZWN0aW9ucyAoc28gY2FuY2VsbGF0aW9uKSBvbiBjaGVja2JveGVzXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAvLyBUaGUgdGFyZ2V0IGNvbXBvbmVudCBzdGlsbCByZWNlaXZlIHRoZSBmb2N1c1xuICAgICAgICBpZiAoJGJ0bi5pcygnaW5wdXQsYnV0dG9uJykpICRidG4udHJpZ2dlcignZm9jdXMnKVxuICAgICAgICBlbHNlICRidG4uZmluZCgnaW5wdXQ6dmlzaWJsZSxidXR0b246dmlzaWJsZScpLmZpcnN0KCkudHJpZ2dlcignZm9jdXMnKVxuICAgICAgfVxuICAgIH0pXG4gICAgLm9uKCdmb2N1cy5icy5idXR0b24uZGF0YS1hcGkgYmx1ci5icy5idXR0b24uZGF0YS1hcGknLCAnW2RhdGEtdG9nZ2xlXj1cImJ1dHRvblwiXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuYnRuJykudG9nZ2xlQ2xhc3MoJ2ZvY3VzJywgL15mb2N1cyhpbik/JC8udGVzdChlLnR5cGUpKVxuICAgIH0pXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IGNhcm91c2VsLmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jY2Fyb3VzZWxcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBDQVJPVVNFTCBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgQ2Fyb3VzZWwgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgICAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy4kaW5kaWNhdG9ycyA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmNhcm91c2VsLWluZGljYXRvcnMnKVxuICAgIHRoaXMub3B0aW9ucyAgICAgPSBvcHRpb25zXG4gICAgdGhpcy5wYXVzZWQgICAgICA9IG51bGxcbiAgICB0aGlzLnNsaWRpbmcgICAgID0gbnVsbFxuICAgIHRoaXMuaW50ZXJ2YWwgICAgPSBudWxsXG4gICAgdGhpcy4kYWN0aXZlICAgICA9IG51bGxcbiAgICB0aGlzLiRpdGVtcyAgICAgID0gbnVsbFxuXG4gICAgdGhpcy5vcHRpb25zLmtleWJvYXJkICYmIHRoaXMuJGVsZW1lbnQub24oJ2tleWRvd24uYnMuY2Fyb3VzZWwnLCAkLnByb3h5KHRoaXMua2V5ZG93biwgdGhpcykpXG5cbiAgICB0aGlzLm9wdGlvbnMucGF1c2UgPT0gJ2hvdmVyJyAmJiAhKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgJiYgdGhpcy4kZWxlbWVudFxuICAgICAgLm9uKCdtb3VzZWVudGVyLmJzLmNhcm91c2VsJywgJC5wcm94eSh0aGlzLnBhdXNlLCB0aGlzKSlcbiAgICAgIC5vbignbW91c2VsZWF2ZS5icy5jYXJvdXNlbCcsICQucHJveHkodGhpcy5jeWNsZSwgdGhpcykpXG4gIH1cblxuICBDYXJvdXNlbC5WRVJTSU9OICA9ICczLjMuNydcblxuICBDYXJvdXNlbC5UUkFOU0lUSU9OX0RVUkFUSU9OID0gNjAwXG5cbiAgQ2Fyb3VzZWwuREVGQVVMVFMgPSB7XG4gICAgaW50ZXJ2YWw6IDUwMDAsXG4gICAgcGF1c2U6ICdob3ZlcicsXG4gICAgd3JhcDogdHJ1ZSxcbiAgICBrZXlib2FyZDogdHJ1ZVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLmtleWRvd24gPSBmdW5jdGlvbiAoZSkge1xuICAgIGlmICgvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGUudGFyZ2V0LnRhZ05hbWUpKSByZXR1cm5cbiAgICBzd2l0Y2ggKGUud2hpY2gpIHtcbiAgICAgIGNhc2UgMzc6IHRoaXMucHJldigpOyBicmVha1xuICAgICAgY2FzZSAzOTogdGhpcy5uZXh0KCk7IGJyZWFrXG4gICAgICBkZWZhdWx0OiByZXR1cm5cbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5jeWNsZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgZSB8fCAodGhpcy5wYXVzZWQgPSBmYWxzZSlcblxuICAgIHRoaXMuaW50ZXJ2YWwgJiYgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKVxuXG4gICAgdGhpcy5vcHRpb25zLmludGVydmFsXG4gICAgICAmJiAhdGhpcy5wYXVzZWRcbiAgICAgICYmICh0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoJC5wcm94eSh0aGlzLm5leHQsIHRoaXMpLCB0aGlzLm9wdGlvbnMuaW50ZXJ2YWwpKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5nZXRJdGVtSW5kZXggPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgIHRoaXMuJGl0ZW1zID0gaXRlbS5wYXJlbnQoKS5jaGlsZHJlbignLml0ZW0nKVxuICAgIHJldHVybiB0aGlzLiRpdGVtcy5pbmRleChpdGVtIHx8IHRoaXMuJGFjdGl2ZSlcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5nZXRJdGVtRm9yRGlyZWN0aW9uID0gZnVuY3Rpb24gKGRpcmVjdGlvbiwgYWN0aXZlKSB7XG4gICAgdmFyIGFjdGl2ZUluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgoYWN0aXZlKVxuICAgIHZhciB3aWxsV3JhcCA9IChkaXJlY3Rpb24gPT0gJ3ByZXYnICYmIGFjdGl2ZUluZGV4ID09PSAwKVxuICAgICAgICAgICAgICAgIHx8IChkaXJlY3Rpb24gPT0gJ25leHQnICYmIGFjdGl2ZUluZGV4ID09ICh0aGlzLiRpdGVtcy5sZW5ndGggLSAxKSlcbiAgICBpZiAod2lsbFdyYXAgJiYgIXRoaXMub3B0aW9ucy53cmFwKSByZXR1cm4gYWN0aXZlXG4gICAgdmFyIGRlbHRhID0gZGlyZWN0aW9uID09ICdwcmV2JyA/IC0xIDogMVxuICAgIHZhciBpdGVtSW5kZXggPSAoYWN0aXZlSW5kZXggKyBkZWx0YSkgJSB0aGlzLiRpdGVtcy5sZW5ndGhcbiAgICByZXR1cm4gdGhpcy4kaXRlbXMuZXEoaXRlbUluZGV4KVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLnRvID0gZnVuY3Rpb24gKHBvcykge1xuICAgIHZhciB0aGF0ICAgICAgICA9IHRoaXNcbiAgICB2YXIgYWN0aXZlSW5kZXggPSB0aGlzLmdldEl0ZW1JbmRleCh0aGlzLiRhY3RpdmUgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5pdGVtLmFjdGl2ZScpKVxuXG4gICAgaWYgKHBvcyA+ICh0aGlzLiRpdGVtcy5sZW5ndGggLSAxKSB8fCBwb3MgPCAwKSByZXR1cm5cblxuICAgIGlmICh0aGlzLnNsaWRpbmcpICAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50Lm9uZSgnc2xpZC5icy5jYXJvdXNlbCcsIGZ1bmN0aW9uICgpIHsgdGhhdC50byhwb3MpIH0pIC8vIHllcywgXCJzbGlkXCJcbiAgICBpZiAoYWN0aXZlSW5kZXggPT0gcG9zKSByZXR1cm4gdGhpcy5wYXVzZSgpLmN5Y2xlKClcblxuICAgIHJldHVybiB0aGlzLnNsaWRlKHBvcyA+IGFjdGl2ZUluZGV4ID8gJ25leHQnIDogJ3ByZXYnLCB0aGlzLiRpdGVtcy5lcShwb3MpKVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlIHx8ICh0aGlzLnBhdXNlZCA9IHRydWUpXG5cbiAgICBpZiAodGhpcy4kZWxlbWVudC5maW5kKCcubmV4dCwgLnByZXYnKS5sZW5ndGggJiYgJC5zdXBwb3J0LnRyYW5zaXRpb24pIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcigkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQpXG4gICAgICB0aGlzLmN5Y2xlKHRydWUpXG4gICAgfVxuXG4gICAgdGhpcy5pbnRlcnZhbCA9IGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zbGlkaW5nKSByZXR1cm5cbiAgICByZXR1cm4gdGhpcy5zbGlkZSgnbmV4dCcpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUucHJldiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zbGlkaW5nKSByZXR1cm5cbiAgICByZXR1cm4gdGhpcy5zbGlkZSgncHJldicpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUuc2xpZGUgPSBmdW5jdGlvbiAodHlwZSwgbmV4dCkge1xuICAgIHZhciAkYWN0aXZlICAgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5pdGVtLmFjdGl2ZScpXG4gICAgdmFyICRuZXh0ICAgICA9IG5leHQgfHwgdGhpcy5nZXRJdGVtRm9yRGlyZWN0aW9uKHR5cGUsICRhY3RpdmUpXG4gICAgdmFyIGlzQ3ljbGluZyA9IHRoaXMuaW50ZXJ2YWxcbiAgICB2YXIgZGlyZWN0aW9uID0gdHlwZSA9PSAnbmV4dCcgPyAnbGVmdCcgOiAncmlnaHQnXG4gICAgdmFyIHRoYXQgICAgICA9IHRoaXNcblxuICAgIGlmICgkbmV4dC5oYXNDbGFzcygnYWN0aXZlJykpIHJldHVybiAodGhpcy5zbGlkaW5nID0gZmFsc2UpXG5cbiAgICB2YXIgcmVsYXRlZFRhcmdldCA9ICRuZXh0WzBdXG4gICAgdmFyIHNsaWRlRXZlbnQgPSAkLkV2ZW50KCdzbGlkZS5icy5jYXJvdXNlbCcsIHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6IHJlbGF0ZWRUYXJnZXQsXG4gICAgICBkaXJlY3Rpb246IGRpcmVjdGlvblxuICAgIH0pXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKHNsaWRlRXZlbnQpXG4gICAgaWYgKHNsaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5zbGlkaW5nID0gdHJ1ZVxuXG4gICAgaXNDeWNsaW5nICYmIHRoaXMucGF1c2UoKVxuXG4gICAgaWYgKHRoaXMuJGluZGljYXRvcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLiRpbmRpY2F0b3JzLmZpbmQoJy5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgIHZhciAkbmV4dEluZGljYXRvciA9ICQodGhpcy4kaW5kaWNhdG9ycy5jaGlsZHJlbigpW3RoaXMuZ2V0SXRlbUluZGV4KCRuZXh0KV0pXG4gICAgICAkbmV4dEluZGljYXRvciAmJiAkbmV4dEluZGljYXRvci5hZGRDbGFzcygnYWN0aXZlJylcbiAgICB9XG5cbiAgICB2YXIgc2xpZEV2ZW50ID0gJC5FdmVudCgnc2xpZC5icy5jYXJvdXNlbCcsIHsgcmVsYXRlZFRhcmdldDogcmVsYXRlZFRhcmdldCwgZGlyZWN0aW9uOiBkaXJlY3Rpb24gfSkgLy8geWVzLCBcInNsaWRcIlxuICAgIGlmICgkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdzbGlkZScpKSB7XG4gICAgICAkbmV4dC5hZGRDbGFzcyh0eXBlKVxuICAgICAgJG5leHRbMF0ub2Zmc2V0V2lkdGggLy8gZm9yY2UgcmVmbG93XG4gICAgICAkYWN0aXZlLmFkZENsYXNzKGRpcmVjdGlvbilcbiAgICAgICRuZXh0LmFkZENsYXNzKGRpcmVjdGlvbilcbiAgICAgICRhY3RpdmVcbiAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICRuZXh0LnJlbW92ZUNsYXNzKFt0eXBlLCBkaXJlY3Rpb25dLmpvaW4oJyAnKSkuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgJGFjdGl2ZS5yZW1vdmVDbGFzcyhbJ2FjdGl2ZScsIGRpcmVjdGlvbl0uam9pbignICcpKVxuICAgICAgICAgIHRoYXQuc2xpZGluZyA9IGZhbHNlXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoc2xpZEV2ZW50KVxuICAgICAgICAgIH0sIDApXG4gICAgICAgIH0pXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChDYXJvdXNlbC5UUkFOU0lUSU9OX0RVUkFUSU9OKVxuICAgIH0gZWxzZSB7XG4gICAgICAkYWN0aXZlLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgJG5leHQuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICB0aGlzLnNsaWRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKHNsaWRFdmVudClcbiAgICB9XG5cbiAgICBpc0N5Y2xpbmcgJiYgdGhpcy5jeWNsZSgpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBDQVJPVVNFTCBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5jYXJvdXNlbCcpXG4gICAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBDYXJvdXNlbC5ERUZBVUxUUywgJHRoaXMuZGF0YSgpLCB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvbilcbiAgICAgIHZhciBhY3Rpb24gID0gdHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJyA/IG9wdGlvbiA6IG9wdGlvbnMuc2xpZGVcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5jYXJvdXNlbCcsIChkYXRhID0gbmV3IENhcm91c2VsKHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdudW1iZXInKSBkYXRhLnRvKG9wdGlvbilcbiAgICAgIGVsc2UgaWYgKGFjdGlvbikgZGF0YVthY3Rpb25dKClcbiAgICAgIGVsc2UgaWYgKG9wdGlvbnMuaW50ZXJ2YWwpIGRhdGEucGF1c2UoKS5jeWNsZSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLmNhcm91c2VsXG5cbiAgJC5mbi5jYXJvdXNlbCAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmNhcm91c2VsLkNvbnN0cnVjdG9yID0gQ2Fyb3VzZWxcblxuXG4gIC8vIENBUk9VU0VMIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5jYXJvdXNlbC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uY2Fyb3VzZWwgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBDQVJPVVNFTCBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gIHZhciBjbGlja0hhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBocmVmXG4gICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgdmFyICR0YXJnZXQgPSAkKCR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JykgfHwgKGhyZWYgPSAkdGhpcy5hdHRyKCdocmVmJykpICYmIGhyZWYucmVwbGFjZSgvLiooPz0jW15cXHNdKyQpLywgJycpKSAvLyBzdHJpcCBmb3IgaWU3XG4gICAgaWYgKCEkdGFyZ2V0Lmhhc0NsYXNzKCdjYXJvdXNlbCcpKSByZXR1cm5cbiAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCAkdGFyZ2V0LmRhdGEoKSwgJHRoaXMuZGF0YSgpKVxuICAgIHZhciBzbGlkZUluZGV4ID0gJHRoaXMuYXR0cignZGF0YS1zbGlkZS10bycpXG4gICAgaWYgKHNsaWRlSW5kZXgpIG9wdGlvbnMuaW50ZXJ2YWwgPSBmYWxzZVxuXG4gICAgUGx1Z2luLmNhbGwoJHRhcmdldCwgb3B0aW9ucylcblxuICAgIGlmIChzbGlkZUluZGV4KSB7XG4gICAgICAkdGFyZ2V0LmRhdGEoJ2JzLmNhcm91c2VsJykudG8oc2xpZGVJbmRleClcbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gICQoZG9jdW1lbnQpXG4gICAgLm9uKCdjbGljay5icy5jYXJvdXNlbC5kYXRhLWFwaScsICdbZGF0YS1zbGlkZV0nLCBjbGlja0hhbmRsZXIpXG4gICAgLm9uKCdjbGljay5icy5jYXJvdXNlbC5kYXRhLWFwaScsICdbZGF0YS1zbGlkZS10b10nLCBjbGlja0hhbmRsZXIpXG5cbiAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLXJpZGU9XCJjYXJvdXNlbFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRjYXJvdXNlbCA9ICQodGhpcylcbiAgICAgIFBsdWdpbi5jYWxsKCRjYXJvdXNlbCwgJGNhcm91c2VsLmRhdGEoKSlcbiAgICB9KVxuICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBjb2xsYXBzZS5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2NvbGxhcHNlXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKiBqc2hpbnQgbGF0ZWRlZjogZmFsc2UgKi9cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBDT0xMQVBTRSBQVUJMSUMgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBDb2xsYXBzZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kZWxlbWVudCAgICAgID0gJChlbGVtZW50KVxuICAgIHRoaXMub3B0aW9ucyAgICAgICA9ICQuZXh0ZW5kKHt9LCBDb2xsYXBzZS5ERUZBVUxUUywgb3B0aW9ucylcbiAgICB0aGlzLiR0cmlnZ2VyICAgICAgPSAkKCdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXVtocmVmPVwiIycgKyBlbGVtZW50LmlkICsgJ1wiXSwnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXVtkYXRhLXRhcmdldD1cIiMnICsgZWxlbWVudC5pZCArICdcIl0nKVxuICAgIHRoaXMudHJhbnNpdGlvbmluZyA9IG51bGxcblxuICAgIGlmICh0aGlzLm9wdGlvbnMucGFyZW50KSB7XG4gICAgICB0aGlzLiRwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKHRoaXMuJGVsZW1lbnQsIHRoaXMuJHRyaWdnZXIpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50b2dnbGUpIHRoaXMudG9nZ2xlKClcbiAgfVxuXG4gIENvbGxhcHNlLlZFUlNJT04gID0gJzMuMy43J1xuXG4gIENvbGxhcHNlLlRSQU5TSVRJT05fRFVSQVRJT04gPSAzNTBcblxuICBDb2xsYXBzZS5ERUZBVUxUUyA9IHtcbiAgICB0b2dnbGU6IHRydWVcbiAgfVxuXG4gIENvbGxhcHNlLnByb3RvdHlwZS5kaW1lbnNpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhhc1dpZHRoID0gdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnd2lkdGgnKVxuICAgIHJldHVybiBoYXNXaWR0aCA/ICd3aWR0aCcgOiAnaGVpZ2h0J1xuICB9XG5cbiAgQ29sbGFwc2UucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMudHJhbnNpdGlvbmluZyB8fCB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdpbicpKSByZXR1cm5cblxuICAgIHZhciBhY3RpdmVzRGF0YVxuICAgIHZhciBhY3RpdmVzID0gdGhpcy4kcGFyZW50ICYmIHRoaXMuJHBhcmVudC5jaGlsZHJlbignLnBhbmVsJykuY2hpbGRyZW4oJy5pbiwgLmNvbGxhcHNpbmcnKVxuXG4gICAgaWYgKGFjdGl2ZXMgJiYgYWN0aXZlcy5sZW5ndGgpIHtcbiAgICAgIGFjdGl2ZXNEYXRhID0gYWN0aXZlcy5kYXRhKCdicy5jb2xsYXBzZScpXG4gICAgICBpZiAoYWN0aXZlc0RhdGEgJiYgYWN0aXZlc0RhdGEudHJhbnNpdGlvbmluZykgcmV0dXJuXG4gICAgfVxuXG4gICAgdmFyIHN0YXJ0RXZlbnQgPSAkLkV2ZW50KCdzaG93LmJzLmNvbGxhcHNlJylcbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoc3RhcnRFdmVudClcbiAgICBpZiAoc3RhcnRFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICBpZiAoYWN0aXZlcyAmJiBhY3RpdmVzLmxlbmd0aCkge1xuICAgICAgUGx1Z2luLmNhbGwoYWN0aXZlcywgJ2hpZGUnKVxuICAgICAgYWN0aXZlc0RhdGEgfHwgYWN0aXZlcy5kYXRhKCdicy5jb2xsYXBzZScsIG51bGwpXG4gICAgfVxuXG4gICAgdmFyIGRpbWVuc2lvbiA9IHRoaXMuZGltZW5zaW9uKClcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5yZW1vdmVDbGFzcygnY29sbGFwc2UnKVxuICAgICAgLmFkZENsYXNzKCdjb2xsYXBzaW5nJylbZGltZW5zaW9uXSgwKVxuICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuXG4gICAgdGhpcy4kdHJpZ2dlclxuICAgICAgLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKVxuICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuXG4gICAgdGhpcy50cmFuc2l0aW9uaW5nID0gMVxuXG4gICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNpbmcnKVxuICAgICAgICAuYWRkQ2xhc3MoJ2NvbGxhcHNlIGluJylbZGltZW5zaW9uXSgnJylcbiAgICAgIHRoaXMudHJhbnNpdGlvbmluZyA9IDBcbiAgICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgICAgLnRyaWdnZXIoJ3Nob3duLmJzLmNvbGxhcHNlJylcbiAgICB9XG5cbiAgICBpZiAoISQuc3VwcG9ydC50cmFuc2l0aW9uKSByZXR1cm4gY29tcGxldGUuY2FsbCh0aGlzKVxuXG4gICAgdmFyIHNjcm9sbFNpemUgPSAkLmNhbWVsQ2FzZShbJ3Njcm9sbCcsIGRpbWVuc2lvbl0uam9pbignLScpKVxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgJC5wcm94eShjb21wbGV0ZSwgdGhpcykpXG4gICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoQ29sbGFwc2UuVFJBTlNJVElPTl9EVVJBVElPTilbZGltZW5zaW9uXSh0aGlzLiRlbGVtZW50WzBdW3Njcm9sbFNpemVdKVxuICB9XG5cbiAgQ29sbGFwc2UucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMudHJhbnNpdGlvbmluZyB8fCAhdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaW4nKSkgcmV0dXJuXG5cbiAgICB2YXIgc3RhcnRFdmVudCA9ICQuRXZlbnQoJ2hpZGUuYnMuY29sbGFwc2UnKVxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihzdGFydEV2ZW50KVxuICAgIGlmIChzdGFydEV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHZhciBkaW1lbnNpb24gPSB0aGlzLmRpbWVuc2lvbigpXG5cbiAgICB0aGlzLiRlbGVtZW50W2RpbWVuc2lvbl0odGhpcy4kZWxlbWVudFtkaW1lbnNpb25dKCkpWzBdLm9mZnNldEhlaWdodFxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLmFkZENsYXNzKCdjb2xsYXBzaW5nJylcbiAgICAgIC5yZW1vdmVDbGFzcygnY29sbGFwc2UgaW4nKVxuICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSlcblxuICAgIHRoaXMuJHRyaWdnZXJcbiAgICAgIC5hZGRDbGFzcygnY29sbGFwc2VkJylcbiAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpXG5cbiAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSAxXG5cbiAgICB2YXIgY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSAwXG4gICAgICB0aGlzLiRlbGVtZW50XG4gICAgICAgIC5yZW1vdmVDbGFzcygnY29sbGFwc2luZycpXG4gICAgICAgIC5hZGRDbGFzcygnY29sbGFwc2UnKVxuICAgICAgICAudHJpZ2dlcignaGlkZGVuLmJzLmNvbGxhcHNlJylcbiAgICB9XG5cbiAgICBpZiAoISQuc3VwcG9ydC50cmFuc2l0aW9uKSByZXR1cm4gY29tcGxldGUuY2FsbCh0aGlzKVxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgW2RpbWVuc2lvbl0oMClcbiAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsICQucHJveHkoY29tcGxldGUsIHRoaXMpKVxuICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKENvbGxhcHNlLlRSQU5TSVRJT05fRFVSQVRJT04pXG4gIH1cblxuICBDb2xsYXBzZS5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXNbdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaW4nKSA/ICdoaWRlJyA6ICdzaG93J10oKVxuICB9XG5cbiAgQ29sbGFwc2UucHJvdG90eXBlLmdldFBhcmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJCh0aGlzLm9wdGlvbnMucGFyZW50KVxuICAgICAgLmZpbmQoJ1tkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdW2RhdGEtcGFyZW50PVwiJyArIHRoaXMub3B0aW9ucy5wYXJlbnQgKyAnXCJdJylcbiAgICAgIC5lYWNoKCQucHJveHkoZnVuY3Rpb24gKGksIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyICRlbGVtZW50ID0gJChlbGVtZW50KVxuICAgICAgICB0aGlzLmFkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyhnZXRUYXJnZXRGcm9tVHJpZ2dlcigkZWxlbWVudCksICRlbGVtZW50KVxuICAgICAgfSwgdGhpcykpXG4gICAgICAuZW5kKClcbiAgfVxuXG4gIENvbGxhcHNlLnByb3RvdHlwZS5hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MgPSBmdW5jdGlvbiAoJGVsZW1lbnQsICR0cmlnZ2VyKSB7XG4gICAgdmFyIGlzT3BlbiA9ICRlbGVtZW50Lmhhc0NsYXNzKCdpbicpXG5cbiAgICAkZWxlbWVudC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgaXNPcGVuKVxuICAgICR0cmlnZ2VyXG4gICAgICAudG9nZ2xlQ2xhc3MoJ2NvbGxhcHNlZCcsICFpc09wZW4pXG4gICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIGlzT3BlbilcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFRhcmdldEZyb21UcmlnZ2VyKCR0cmlnZ2VyKSB7XG4gICAgdmFyIGhyZWZcbiAgICB2YXIgdGFyZ2V0ID0gJHRyaWdnZXIuYXR0cignZGF0YS10YXJnZXQnKVxuICAgICAgfHwgKGhyZWYgPSAkdHJpZ2dlci5hdHRyKCdocmVmJykpICYmIGhyZWYucmVwbGFjZSgvLiooPz0jW15cXHNdKyQpLywgJycpIC8vIHN0cmlwIGZvciBpZTdcblxuICAgIHJldHVybiAkKHRhcmdldClcbiAgfVxuXG5cbiAgLy8gQ09MTEFQU0UgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuY29sbGFwc2UnKVxuICAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgQ29sbGFwc2UuREVGQVVMVFMsICR0aGlzLmRhdGEoKSwgdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb24pXG5cbiAgICAgIGlmICghZGF0YSAmJiBvcHRpb25zLnRvZ2dsZSAmJiAvc2hvd3xoaWRlLy50ZXN0KG9wdGlvbikpIG9wdGlvbnMudG9nZ2xlID0gZmFsc2VcbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuY29sbGFwc2UnLCAoZGF0YSA9IG5ldyBDb2xsYXBzZSh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4uY29sbGFwc2VcblxuICAkLmZuLmNvbGxhcHNlICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4uY29sbGFwc2UuQ29uc3RydWN0b3IgPSBDb2xsYXBzZVxuXG5cbiAgLy8gQ09MTEFQU0UgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09PT1cblxuICAkLmZuLmNvbGxhcHNlLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5jb2xsYXBzZSA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIENPTExBUFNFIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLmJzLmNvbGxhcHNlLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcblxuICAgIGlmICghJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKSkgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICB2YXIgJHRhcmdldCA9IGdldFRhcmdldEZyb21UcmlnZ2VyKCR0aGlzKVxuICAgIHZhciBkYXRhICAgID0gJHRhcmdldC5kYXRhKCdicy5jb2xsYXBzZScpXG4gICAgdmFyIG9wdGlvbiAgPSBkYXRhID8gJ3RvZ2dsZScgOiAkdGhpcy5kYXRhKClcblxuICAgIFBsdWdpbi5jYWxsKCR0YXJnZXQsIG9wdGlvbilcbiAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogZHJvcGRvd24uanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNkcm9wZG93bnNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBEUk9QRE9XTiBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgYmFja2Ryb3AgPSAnLmRyb3Bkb3duLWJhY2tkcm9wJ1xuICB2YXIgdG9nZ2xlICAgPSAnW2RhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIl0nXG4gIHZhciBEcm9wZG93biA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgJChlbGVtZW50KS5vbignY2xpY2suYnMuZHJvcGRvd24nLCB0aGlzLnRvZ2dsZSlcbiAgfVxuXG4gIERyb3Bkb3duLlZFUlNJT04gPSAnMy4zLjcnXG5cbiAgZnVuY3Rpb24gZ2V0UGFyZW50KCR0aGlzKSB7XG4gICAgdmFyIHNlbGVjdG9yID0gJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKVxuXG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgc2VsZWN0b3IgPSAkdGhpcy5hdHRyKCdocmVmJylcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgJiYgLyNbQS1aYS16XS8udGVzdChzZWxlY3RvcikgJiYgc2VsZWN0b3IucmVwbGFjZSgvLiooPz0jW15cXHNdKiQpLywgJycpIC8vIHN0cmlwIGZvciBpZTdcbiAgICB9XG5cbiAgICB2YXIgJHBhcmVudCA9IHNlbGVjdG9yICYmICQoc2VsZWN0b3IpXG5cbiAgICByZXR1cm4gJHBhcmVudCAmJiAkcGFyZW50Lmxlbmd0aCA/ICRwYXJlbnQgOiAkdGhpcy5wYXJlbnQoKVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJNZW51cyhlKSB7XG4gICAgaWYgKGUgJiYgZS53aGljaCA9PT0gMykgcmV0dXJuXG4gICAgJChiYWNrZHJvcCkucmVtb3ZlKClcbiAgICAkKHRvZ2dsZSkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICAgICAgICA9ICQodGhpcylcbiAgICAgIHZhciAkcGFyZW50ICAgICAgID0gZ2V0UGFyZW50KCR0aGlzKVxuICAgICAgdmFyIHJlbGF0ZWRUYXJnZXQgPSB7IHJlbGF0ZWRUYXJnZXQ6IHRoaXMgfVxuXG4gICAgICBpZiAoISRwYXJlbnQuaGFzQ2xhc3MoJ29wZW4nKSkgcmV0dXJuXG5cbiAgICAgIGlmIChlICYmIGUudHlwZSA9PSAnY2xpY2snICYmIC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZS50YXJnZXQudGFnTmFtZSkgJiYgJC5jb250YWlucygkcGFyZW50WzBdLCBlLnRhcmdldCkpIHJldHVyblxuXG4gICAgICAkcGFyZW50LnRyaWdnZXIoZSA9ICQuRXZlbnQoJ2hpZGUuYnMuZHJvcGRvd24nLCByZWxhdGVkVGFyZ2V0KSlcblxuICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgICAkdGhpcy5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcbiAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ29wZW4nKS50cmlnZ2VyKCQuRXZlbnQoJ2hpZGRlbi5icy5kcm9wZG93bicsIHJlbGF0ZWRUYXJnZXQpKVxuICAgIH0pXG4gIH1cblxuICBEcm9wZG93bi5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG5cbiAgICBpZiAoJHRoaXMuaXMoJy5kaXNhYmxlZCwgOmRpc2FibGVkJykpIHJldHVyblxuXG4gICAgdmFyICRwYXJlbnQgID0gZ2V0UGFyZW50KCR0aGlzKVxuICAgIHZhciBpc0FjdGl2ZSA9ICRwYXJlbnQuaGFzQ2xhc3MoJ29wZW4nKVxuXG4gICAgY2xlYXJNZW51cygpXG5cbiAgICBpZiAoIWlzQWN0aXZlKSB7XG4gICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmICEkcGFyZW50LmNsb3Nlc3QoJy5uYXZiYXItbmF2JykubGVuZ3RoKSB7XG4gICAgICAgIC8vIGlmIG1vYmlsZSB3ZSB1c2UgYSBiYWNrZHJvcCBiZWNhdXNlIGNsaWNrIGV2ZW50cyBkb24ndCBkZWxlZ2F0ZVxuICAgICAgICAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKVxuICAgICAgICAgIC5hZGRDbGFzcygnZHJvcGRvd24tYmFja2Ryb3AnKVxuICAgICAgICAgIC5pbnNlcnRBZnRlcigkKHRoaXMpKVxuICAgICAgICAgIC5vbignY2xpY2snLCBjbGVhck1lbnVzKVxuICAgICAgfVxuXG4gICAgICB2YXIgcmVsYXRlZFRhcmdldCA9IHsgcmVsYXRlZFRhcmdldDogdGhpcyB9XG4gICAgICAkcGFyZW50LnRyaWdnZXIoZSA9ICQuRXZlbnQoJ3Nob3cuYnMuZHJvcGRvd24nLCByZWxhdGVkVGFyZ2V0KSlcblxuICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgICAkdGhpc1xuICAgICAgICAudHJpZ2dlcignZm9jdXMnKVxuICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJylcblxuICAgICAgJHBhcmVudFxuICAgICAgICAudG9nZ2xlQ2xhc3MoJ29wZW4nKVxuICAgICAgICAudHJpZ2dlcigkLkV2ZW50KCdzaG93bi5icy5kcm9wZG93bicsIHJlbGF0ZWRUYXJnZXQpKVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgRHJvcGRvd24ucHJvdG90eXBlLmtleWRvd24gPSBmdW5jdGlvbiAoZSkge1xuICAgIGlmICghLygzOHw0MHwyN3wzMikvLnRlc3QoZS53aGljaCkgfHwgL2lucHV0fHRleHRhcmVhL2kudGVzdChlLnRhcmdldC50YWdOYW1lKSkgcmV0dXJuXG5cbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICBpZiAoJHRoaXMuaXMoJy5kaXNhYmxlZCwgOmRpc2FibGVkJykpIHJldHVyblxuXG4gICAgdmFyICRwYXJlbnQgID0gZ2V0UGFyZW50KCR0aGlzKVxuICAgIHZhciBpc0FjdGl2ZSA9ICRwYXJlbnQuaGFzQ2xhc3MoJ29wZW4nKVxuXG4gICAgaWYgKCFpc0FjdGl2ZSAmJiBlLndoaWNoICE9IDI3IHx8IGlzQWN0aXZlICYmIGUud2hpY2ggPT0gMjcpIHtcbiAgICAgIGlmIChlLndoaWNoID09IDI3KSAkcGFyZW50LmZpbmQodG9nZ2xlKS50cmlnZ2VyKCdmb2N1cycpXG4gICAgICByZXR1cm4gJHRoaXMudHJpZ2dlcignY2xpY2snKVxuICAgIH1cblxuICAgIHZhciBkZXNjID0gJyBsaTpub3QoLmRpc2FibGVkKTp2aXNpYmxlIGEnXG4gICAgdmFyICRpdGVtcyA9ICRwYXJlbnQuZmluZCgnLmRyb3Bkb3duLW1lbnUnICsgZGVzYylcblxuICAgIGlmICghJGl0ZW1zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICB2YXIgaW5kZXggPSAkaXRlbXMuaW5kZXgoZS50YXJnZXQpXG5cbiAgICBpZiAoZS53aGljaCA9PSAzOCAmJiBpbmRleCA+IDApICAgICAgICAgICAgICAgICBpbmRleC0tICAgICAgICAgLy8gdXBcbiAgICBpZiAoZS53aGljaCA9PSA0MCAmJiBpbmRleCA8ICRpdGVtcy5sZW5ndGggLSAxKSBpbmRleCsrICAgICAgICAgLy8gZG93blxuICAgIGlmICghfmluZGV4KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMFxuXG4gICAgJGl0ZW1zLmVxKGluZGV4KS50cmlnZ2VyKCdmb2N1cycpXG4gIH1cblxuXG4gIC8vIERST1BET1dOIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgID0gJHRoaXMuZGF0YSgnYnMuZHJvcGRvd24nKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmRyb3Bkb3duJywgKGRhdGEgPSBuZXcgRHJvcGRvd24odGhpcykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXS5jYWxsKCR0aGlzKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5kcm9wZG93blxuXG4gICQuZm4uZHJvcGRvd24gICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5kcm9wZG93bi5Db25zdHJ1Y3RvciA9IERyb3Bkb3duXG5cblxuICAvLyBEUk9QRE9XTiBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uZHJvcGRvd24ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmRyb3Bkb3duID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQVBQTFkgVE8gU1RBTkRBUkQgRFJPUERPV04gRUxFTUVOVFNcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbignY2xpY2suYnMuZHJvcGRvd24uZGF0YS1hcGknLCBjbGVhck1lbnVzKVxuICAgIC5vbignY2xpY2suYnMuZHJvcGRvd24uZGF0YS1hcGknLCAnLmRyb3Bkb3duIGZvcm0nLCBmdW5jdGlvbiAoZSkgeyBlLnN0b3BQcm9wYWdhdGlvbigpIH0pXG4gICAgLm9uKCdjbGljay5icy5kcm9wZG93bi5kYXRhLWFwaScsIHRvZ2dsZSwgRHJvcGRvd24ucHJvdG90eXBlLnRvZ2dsZSlcbiAgICAub24oJ2tleWRvd24uYnMuZHJvcGRvd24uZGF0YS1hcGknLCB0b2dnbGUsIERyb3Bkb3duLnByb3RvdHlwZS5rZXlkb3duKVxuICAgIC5vbigna2V5ZG93bi5icy5kcm9wZG93bi5kYXRhLWFwaScsICcuZHJvcGRvd24tbWVudScsIERyb3Bkb3duLnByb3RvdHlwZS5rZXlkb3duKVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBtb2RhbC5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI21vZGFsc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIE1PREFMIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBNb2RhbCA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zICAgICAgICAgICAgID0gb3B0aW9uc1xuICAgIHRoaXMuJGJvZHkgICAgICAgICAgICAgICA9ICQoZG9jdW1lbnQuYm9keSlcbiAgICB0aGlzLiRlbGVtZW50ICAgICAgICAgICAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy4kZGlhbG9nICAgICAgICAgICAgID0gdGhpcy4kZWxlbWVudC5maW5kKCcubW9kYWwtZGlhbG9nJylcbiAgICB0aGlzLiRiYWNrZHJvcCAgICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5pc1Nob3duICAgICAgICAgICAgID0gbnVsbFxuICAgIHRoaXMub3JpZ2luYWxCb2R5UGFkICAgICA9IG51bGxcbiAgICB0aGlzLnNjcm9sbGJhcldpZHRoICAgICAgPSAwXG4gICAgdGhpcy5pZ25vcmVCYWNrZHJvcENsaWNrID0gZmFsc2VcblxuICAgIGlmICh0aGlzLm9wdGlvbnMucmVtb3RlKSB7XG4gICAgICB0aGlzLiRlbGVtZW50XG4gICAgICAgIC5maW5kKCcubW9kYWwtY29udGVudCcpXG4gICAgICAgIC5sb2FkKHRoaXMub3B0aW9ucy5yZW1vdGUsICQucHJveHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignbG9hZGVkLmJzLm1vZGFsJylcbiAgICAgICAgfSwgdGhpcykpXG4gICAgfVxuICB9XG5cbiAgTW9kYWwuVkVSU0lPTiAgPSAnMy4zLjcnXG5cbiAgTW9kYWwuVFJBTlNJVElPTl9EVVJBVElPTiA9IDMwMFxuICBNb2RhbC5CQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgTW9kYWwuREVGQVVMVFMgPSB7XG4gICAgYmFja2Ryb3A6IHRydWUsXG4gICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgc2hvdzogdHJ1ZVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIChfcmVsYXRlZFRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmlzU2hvd24gPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdyhfcmVsYXRlZFRhcmdldClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKF9yZWxhdGVkVGFyZ2V0KSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdmFyIGUgICAgPSAkLkV2ZW50KCdzaG93LmJzLm1vZGFsJywgeyByZWxhdGVkVGFyZ2V0OiBfcmVsYXRlZFRhcmdldCB9KVxuXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG5cbiAgICBpZiAodGhpcy5pc1Nob3duIHx8IGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5pc1Nob3duID0gdHJ1ZVxuXG4gICAgdGhpcy5jaGVja1Njcm9sbGJhcigpXG4gICAgdGhpcy5zZXRTY3JvbGxiYXIoKVxuICAgIHRoaXMuJGJvZHkuYWRkQ2xhc3MoJ21vZGFsLW9wZW4nKVxuXG4gICAgdGhpcy5lc2NhcGUoKVxuICAgIHRoaXMucmVzaXplKClcblxuICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrLmRpc21pc3MuYnMubW9kYWwnLCAnW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJywgJC5wcm94eSh0aGlzLmhpZGUsIHRoaXMpKVxuXG4gICAgdGhpcy4kZGlhbG9nLm9uKCdtb3VzZWRvd24uZGlzbWlzcy5icy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoYXQuJGVsZW1lbnQub25lKCdtb3VzZXVwLmRpc21pc3MuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaXModGhhdC4kZWxlbWVudCkpIHRoYXQuaWdub3JlQmFja2Ryb3BDbGljayA9IHRydWVcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHRoaXMuYmFja2Ryb3AoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRyYW5zaXRpb24gPSAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGF0LiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJylcblxuICAgICAgaWYgKCF0aGF0LiRlbGVtZW50LnBhcmVudCgpLmxlbmd0aCkge1xuICAgICAgICB0aGF0LiRlbGVtZW50LmFwcGVuZFRvKHRoYXQuJGJvZHkpIC8vIGRvbid0IG1vdmUgbW9kYWxzIGRvbSBwb3NpdGlvblxuICAgICAgfVxuXG4gICAgICB0aGF0LiRlbGVtZW50XG4gICAgICAgIC5zaG93KClcbiAgICAgICAgLnNjcm9sbFRvcCgwKVxuXG4gICAgICB0aGF0LmFkanVzdERpYWxvZygpXG5cbiAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgIHRoYXQuJGVsZW1lbnRbMF0ub2Zmc2V0V2lkdGggLy8gZm9yY2UgcmVmbG93XG4gICAgICB9XG5cbiAgICAgIHRoYXQuJGVsZW1lbnQuYWRkQ2xhc3MoJ2luJylcblxuICAgICAgdGhhdC5lbmZvcmNlRm9jdXMoKVxuXG4gICAgICB2YXIgZSA9ICQuRXZlbnQoJ3Nob3duLmJzLm1vZGFsJywgeyByZWxhdGVkVGFyZ2V0OiBfcmVsYXRlZFRhcmdldCB9KVxuXG4gICAgICB0cmFuc2l0aW9uID9cbiAgICAgICAgdGhhdC4kZGlhbG9nIC8vIHdhaXQgZm9yIG1vZGFsIHRvIHNsaWRlIGluXG4gICAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKCdmb2N1cycpLnRyaWdnZXIoZSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcignZm9jdXMnKS50cmlnZ2VyKGUpXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBlID0gJC5FdmVudCgnaGlkZS5icy5tb2RhbCcpXG5cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgIGlmICghdGhpcy5pc1Nob3duIHx8IGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5pc1Nob3duID0gZmFsc2VcblxuICAgIHRoaXMuZXNjYXBlKClcbiAgICB0aGlzLnJlc2l6ZSgpXG5cbiAgICAkKGRvY3VtZW50KS5vZmYoJ2ZvY3VzaW4uYnMubW9kYWwnKVxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLnJlbW92ZUNsYXNzKCdpbicpXG4gICAgICAub2ZmKCdjbGljay5kaXNtaXNzLmJzLm1vZGFsJylcbiAgICAgIC5vZmYoJ21vdXNldXAuZGlzbWlzcy5icy5tb2RhbCcpXG5cbiAgICB0aGlzLiRkaWFsb2cub2ZmKCdtb3VzZWRvd24uZGlzbWlzcy5icy5tb2RhbCcpXG5cbiAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCAkLnByb3h5KHRoaXMuaGlkZU1vZGFsLCB0aGlzKSlcbiAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKE1vZGFsLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgIHRoaXMuaGlkZU1vZGFsKClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5lbmZvcmNlRm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgJChkb2N1bWVudClcbiAgICAgIC5vZmYoJ2ZvY3VzaW4uYnMubW9kYWwnKSAvLyBndWFyZCBhZ2FpbnN0IGluZmluaXRlIGZvY3VzIGxvb3BcbiAgICAgIC5vbignZm9jdXNpbi5icy5tb2RhbCcsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50ICE9PSBlLnRhcmdldCAmJlxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudFswXSAhPT0gZS50YXJnZXQgJiZcbiAgICAgICAgICAgICF0aGlzLiRlbGVtZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdmb2N1cycpXG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmVzY2FwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pc1Nob3duICYmIHRoaXMub3B0aW9ucy5rZXlib2FyZCkge1xuICAgICAgdGhpcy4kZWxlbWVudC5vbigna2V5ZG93bi5kaXNtaXNzLmJzLm1vZGFsJywgJC5wcm94eShmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLndoaWNoID09IDI3ICYmIHRoaXMuaGlkZSgpXG4gICAgICB9LCB0aGlzKSlcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmlzU2hvd24pIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdrZXlkb3duLmRpc21pc3MuYnMubW9kYWwnKVxuICAgIH1cbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaXNTaG93bikge1xuICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUuYnMubW9kYWwnLCAkLnByb3h5KHRoaXMuaGFuZGxlVXBkYXRlLCB0aGlzKSlcbiAgICB9IGVsc2Uge1xuICAgICAgJCh3aW5kb3cpLm9mZigncmVzaXplLmJzLm1vZGFsJylcbiAgICB9XG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuaGlkZU1vZGFsID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHRoaXMuJGVsZW1lbnQuaGlkZSgpXG4gICAgdGhpcy5iYWNrZHJvcChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGF0LiRib2R5LnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJylcbiAgICAgIHRoYXQucmVzZXRBZGp1c3RtZW50cygpXG4gICAgICB0aGF0LnJlc2V0U2Nyb2xsYmFyKClcbiAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcignaGlkZGVuLmJzLm1vZGFsJylcbiAgICB9KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlbW92ZUJhY2tkcm9wID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGJhY2tkcm9wICYmIHRoaXMuJGJhY2tkcm9wLnJlbW92ZSgpXG4gICAgdGhpcy4kYmFja2Ryb3AgPSBudWxsXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuYmFja2Ryb3AgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICB2YXIgYW5pbWF0ZSA9IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2ZhZGUnKSA/ICdmYWRlJyA6ICcnXG5cbiAgICBpZiAodGhpcy5pc1Nob3duICYmIHRoaXMub3B0aW9ucy5iYWNrZHJvcCkge1xuICAgICAgdmFyIGRvQW5pbWF0ZSA9ICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIGFuaW1hdGVcblxuICAgICAgdGhpcy4kYmFja2Ryb3AgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKVxuICAgICAgICAuYWRkQ2xhc3MoJ21vZGFsLWJhY2tkcm9wICcgKyBhbmltYXRlKVxuICAgICAgICAuYXBwZW5kVG8odGhpcy4kYm9keSlcblxuICAgICAgdGhpcy4kZWxlbWVudC5vbignY2xpY2suZGlzbWlzcy5icy5tb2RhbCcsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuaWdub3JlQmFja2Ryb3BDbGljaykge1xuICAgICAgICAgIHRoaXMuaWdub3JlQmFja2Ryb3BDbGljayA9IGZhbHNlXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSBlLmN1cnJlbnRUYXJnZXQpIHJldHVyblxuICAgICAgICB0aGlzLm9wdGlvbnMuYmFja2Ryb3AgPT0gJ3N0YXRpYydcbiAgICAgICAgICA/IHRoaXMuJGVsZW1lbnRbMF0uZm9jdXMoKVxuICAgICAgICAgIDogdGhpcy5oaWRlKClcbiAgICAgIH0sIHRoaXMpKVxuXG4gICAgICBpZiAoZG9BbmltYXRlKSB0aGlzLiRiYWNrZHJvcFswXS5vZmZzZXRXaWR0aCAvLyBmb3JjZSByZWZsb3dcblxuICAgICAgdGhpcy4kYmFja2Ryb3AuYWRkQ2xhc3MoJ2luJylcblxuICAgICAgaWYgKCFjYWxsYmFjaykgcmV0dXJuXG5cbiAgICAgIGRvQW5pbWF0ZSA/XG4gICAgICAgIHRoaXMuJGJhY2tkcm9wXG4gICAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgY2FsbGJhY2spXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKE1vZGFsLkJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgICAgY2FsbGJhY2soKVxuXG4gICAgfSBlbHNlIGlmICghdGhpcy5pc1Nob3duICYmIHRoaXMuJGJhY2tkcm9wKSB7XG4gICAgICB0aGlzLiRiYWNrZHJvcC5yZW1vdmVDbGFzcygnaW4nKVxuXG4gICAgICB2YXIgY2FsbGJhY2tSZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoYXQucmVtb3ZlQmFja2Ryb3AoKVxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgICB9XG4gICAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgICB0aGlzLiRiYWNrZHJvcFxuICAgICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGNhbGxiYWNrUmVtb3ZlKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5CQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIGNhbGxiYWNrUmVtb3ZlKClcblxuICAgIH0gZWxzZSBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrKClcbiAgICB9XG4gIH1cblxuICAvLyB0aGVzZSBmb2xsb3dpbmcgbWV0aG9kcyBhcmUgdXNlZCB0byBoYW5kbGUgb3ZlcmZsb3dpbmcgbW9kYWxzXG5cbiAgTW9kYWwucHJvdG90eXBlLmhhbmRsZVVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmFkanVzdERpYWxvZygpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuYWRqdXN0RGlhbG9nID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBtb2RhbElzT3ZlcmZsb3dpbmcgPSB0aGlzLiRlbGVtZW50WzBdLnNjcm9sbEhlaWdodCA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcblxuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtcbiAgICAgIHBhZGRpbmdMZWZ0OiAgIXRoaXMuYm9keUlzT3ZlcmZsb3dpbmcgJiYgbW9kYWxJc092ZXJmbG93aW5nID8gdGhpcy5zY3JvbGxiYXJXaWR0aCA6ICcnLFxuICAgICAgcGFkZGluZ1JpZ2h0OiB0aGlzLmJvZHlJc092ZXJmbG93aW5nICYmICFtb2RhbElzT3ZlcmZsb3dpbmcgPyB0aGlzLnNjcm9sbGJhcldpZHRoIDogJydcbiAgICB9KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlc2V0QWRqdXN0bWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kZWxlbWVudC5jc3Moe1xuICAgICAgcGFkZGluZ0xlZnQ6ICcnLFxuICAgICAgcGFkZGluZ1JpZ2h0OiAnJ1xuICAgIH0pXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuY2hlY2tTY3JvbGxiYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZ1bGxXaW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgaWYgKCFmdWxsV2luZG93V2lkdGgpIHsgLy8gd29ya2Fyb3VuZCBmb3IgbWlzc2luZyB3aW5kb3cuaW5uZXJXaWR0aCBpbiBJRThcbiAgICAgIHZhciBkb2N1bWVudEVsZW1lbnRSZWN0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICBmdWxsV2luZG93V2lkdGggPSBkb2N1bWVudEVsZW1lbnRSZWN0LnJpZ2h0IC0gTWF0aC5hYnMoZG9jdW1lbnRFbGVtZW50UmVjdC5sZWZ0KVxuICAgIH1cbiAgICB0aGlzLmJvZHlJc092ZXJmbG93aW5nID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCA8IGZ1bGxXaW5kb3dXaWR0aFxuICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGggPSB0aGlzLm1lYXN1cmVTY3JvbGxiYXIoKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnNldFNjcm9sbGJhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYm9keVBhZCA9IHBhcnNlSW50KCh0aGlzLiRib2R5LmNzcygncGFkZGluZy1yaWdodCcpIHx8IDApLCAxMClcbiAgICB0aGlzLm9yaWdpbmFsQm9keVBhZCA9IGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0IHx8ICcnXG4gICAgaWYgKHRoaXMuYm9keUlzT3ZlcmZsb3dpbmcpIHRoaXMuJGJvZHkuY3NzKCdwYWRkaW5nLXJpZ2h0JywgYm9keVBhZCArIHRoaXMuc2Nyb2xsYmFyV2lkdGgpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUucmVzZXRTY3JvbGxiYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kYm9keS5jc3MoJ3BhZGRpbmctcmlnaHQnLCB0aGlzLm9yaWdpbmFsQm9keVBhZClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5tZWFzdXJlU2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkgeyAvLyB0aHggd2Fsc2hcbiAgICB2YXIgc2Nyb2xsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBzY3JvbGxEaXYuY2xhc3NOYW1lID0gJ21vZGFsLXNjcm9sbGJhci1tZWFzdXJlJ1xuICAgIHRoaXMuJGJvZHkuYXBwZW5kKHNjcm9sbERpdilcbiAgICB2YXIgc2Nyb2xsYmFyV2lkdGggPSBzY3JvbGxEaXYub2Zmc2V0V2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGhcbiAgICB0aGlzLiRib2R5WzBdLnJlbW92ZUNoaWxkKHNjcm9sbERpdilcbiAgICByZXR1cm4gc2Nyb2xsYmFyV2lkdGhcbiAgfVxuXG5cbiAgLy8gTU9EQUwgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uLCBfcmVsYXRlZFRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLm1vZGFsJylcbiAgICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoe30sIE1vZGFsLkRFRkFVTFRTLCAkdGhpcy5kYXRhKCksIHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLm1vZGFsJywgKGRhdGEgPSBuZXcgTW9kYWwodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXShfcmVsYXRlZFRhcmdldClcbiAgICAgIGVsc2UgaWYgKG9wdGlvbnMuc2hvdykgZGF0YS5zaG93KF9yZWxhdGVkVGFyZ2V0KVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5tb2RhbFxuXG4gICQuZm4ubW9kYWwgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5tb2RhbC5Db25zdHJ1Y3RvciA9IE1vZGFsXG5cblxuICAvLyBNT0RBTCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gICQuZm4ubW9kYWwubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLm1vZGFsID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gTU9EQUwgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT1cblxuICAkKGRvY3VtZW50KS5vbignY2xpY2suYnMubW9kYWwuZGF0YS1hcGknLCAnW2RhdGEtdG9nZ2xlPVwibW9kYWxcIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgIHZhciBocmVmICAgID0gJHRoaXMuYXR0cignaHJlZicpXG4gICAgdmFyICR0YXJnZXQgPSAkKCR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JykgfHwgKGhyZWYgJiYgaHJlZi5yZXBsYWNlKC8uKig/PSNbXlxcc10rJCkvLCAnJykpKSAvLyBzdHJpcCBmb3IgaWU3XG4gICAgdmFyIG9wdGlvbiAgPSAkdGFyZ2V0LmRhdGEoJ2JzLm1vZGFsJykgPyAndG9nZ2xlJyA6ICQuZXh0ZW5kKHsgcmVtb3RlOiAhLyMvLnRlc3QoaHJlZikgJiYgaHJlZiB9LCAkdGFyZ2V0LmRhdGEoKSwgJHRoaXMuZGF0YSgpKVxuXG4gICAgaWYgKCR0aGlzLmlzKCdhJykpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgJHRhcmdldC5vbmUoJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoc2hvd0V2ZW50KSB7XG4gICAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm4gLy8gb25seSByZWdpc3RlciBmb2N1cyByZXN0b3JlciBpZiBtb2RhbCB3aWxsIGFjdHVhbGx5IGdldCBzaG93blxuICAgICAgJHRhcmdldC5vbmUoJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHRoaXMuaXMoJzp2aXNpYmxlJykgJiYgJHRoaXMudHJpZ2dlcignZm9jdXMnKVxuICAgICAgfSlcbiAgICB9KVxuICAgIFBsdWdpbi5jYWxsKCR0YXJnZXQsIG9wdGlvbiwgdGhpcylcbiAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogdG9vbHRpcC5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI3Rvb2x0aXBcbiAqIEluc3BpcmVkIGJ5IHRoZSBvcmlnaW5hbCBqUXVlcnkudGlwc3kgYnkgSmFzb24gRnJhbWVcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBUT09MVElQIFBVQkxJQyBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgVG9vbHRpcCA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy50eXBlICAgICAgID0gbnVsbFxuICAgIHRoaXMub3B0aW9ucyAgICA9IG51bGxcbiAgICB0aGlzLmVuYWJsZWQgICAgPSBudWxsXG4gICAgdGhpcy50aW1lb3V0ICAgID0gbnVsbFxuICAgIHRoaXMuaG92ZXJTdGF0ZSA9IG51bGxcbiAgICB0aGlzLiRlbGVtZW50ICAgPSBudWxsXG4gICAgdGhpcy5pblN0YXRlICAgID0gbnVsbFxuXG4gICAgdGhpcy5pbml0KCd0b29sdGlwJywgZWxlbWVudCwgb3B0aW9ucylcbiAgfVxuXG4gIFRvb2x0aXAuVkVSU0lPTiAgPSAnMy4zLjcnXG5cbiAgVG9vbHRpcC5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgVG9vbHRpcC5ERUZBVUxUUyA9IHtcbiAgICBhbmltYXRpb246IHRydWUsXG4gICAgcGxhY2VtZW50OiAndG9wJyxcbiAgICBzZWxlY3RvcjogZmFsc2UsXG4gICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwidG9vbHRpcFwiIHJvbGU9XCJ0b29sdGlwXCI+PGRpdiBjbGFzcz1cInRvb2x0aXAtYXJyb3dcIj48L2Rpdj48ZGl2IGNsYXNzPVwidG9vbHRpcC1pbm5lclwiPjwvZGl2PjwvZGl2PicsXG4gICAgdHJpZ2dlcjogJ2hvdmVyIGZvY3VzJyxcbiAgICB0aXRsZTogJycsXG4gICAgZGVsYXk6IDAsXG4gICAgaHRtbDogZmFsc2UsXG4gICAgY29udGFpbmVyOiBmYWxzZSxcbiAgICB2aWV3cG9ydDoge1xuICAgICAgc2VsZWN0b3I6ICdib2R5JyxcbiAgICAgIHBhZGRpbmc6IDBcbiAgICB9XG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKHR5cGUsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmVuYWJsZWQgICA9IHRydWVcbiAgICB0aGlzLnR5cGUgICAgICA9IHR5cGVcbiAgICB0aGlzLiRlbGVtZW50ICA9ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgICA9IHRoaXMuZ2V0T3B0aW9ucyhvcHRpb25zKVxuICAgIHRoaXMuJHZpZXdwb3J0ID0gdGhpcy5vcHRpb25zLnZpZXdwb3J0ICYmICQoJC5pc0Z1bmN0aW9uKHRoaXMub3B0aW9ucy52aWV3cG9ydCkgPyB0aGlzLm9wdGlvbnMudmlld3BvcnQuY2FsbCh0aGlzLCB0aGlzLiRlbGVtZW50KSA6ICh0aGlzLm9wdGlvbnMudmlld3BvcnQuc2VsZWN0b3IgfHwgdGhpcy5vcHRpb25zLnZpZXdwb3J0KSlcbiAgICB0aGlzLmluU3RhdGUgICA9IHsgY2xpY2s6IGZhbHNlLCBob3ZlcjogZmFsc2UsIGZvY3VzOiBmYWxzZSB9XG5cbiAgICBpZiAodGhpcy4kZWxlbWVudFswXSBpbnN0YW5jZW9mIGRvY3VtZW50LmNvbnN0cnVjdG9yICYmICF0aGlzLm9wdGlvbnMuc2VsZWN0b3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYHNlbGVjdG9yYCBvcHRpb24gbXVzdCBiZSBzcGVjaWZpZWQgd2hlbiBpbml0aWFsaXppbmcgJyArIHRoaXMudHlwZSArICcgb24gdGhlIHdpbmRvdy5kb2N1bWVudCBvYmplY3QhJylcbiAgICB9XG5cbiAgICB2YXIgdHJpZ2dlcnMgPSB0aGlzLm9wdGlvbnMudHJpZ2dlci5zcGxpdCgnICcpXG5cbiAgICBmb3IgKHZhciBpID0gdHJpZ2dlcnMubGVuZ3RoOyBpLS07KSB7XG4gICAgICB2YXIgdHJpZ2dlciA9IHRyaWdnZXJzW2ldXG5cbiAgICAgIGlmICh0cmlnZ2VyID09ICdjbGljaycpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudC5vbignY2xpY2suJyArIHRoaXMudHlwZSwgdGhpcy5vcHRpb25zLnNlbGVjdG9yLCAkLnByb3h5KHRoaXMudG9nZ2xlLCB0aGlzKSlcbiAgICAgIH0gZWxzZSBpZiAodHJpZ2dlciAhPSAnbWFudWFsJykge1xuICAgICAgICB2YXIgZXZlbnRJbiAgPSB0cmlnZ2VyID09ICdob3ZlcicgPyAnbW91c2VlbnRlcicgOiAnZm9jdXNpbidcbiAgICAgICAgdmFyIGV2ZW50T3V0ID0gdHJpZ2dlciA9PSAnaG92ZXInID8gJ21vdXNlbGVhdmUnIDogJ2ZvY3Vzb3V0J1xuXG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oZXZlbnRJbiAgKyAnLicgKyB0aGlzLnR5cGUsIHRoaXMub3B0aW9ucy5zZWxlY3RvciwgJC5wcm94eSh0aGlzLmVudGVyLCB0aGlzKSlcbiAgICAgICAgdGhpcy4kZWxlbWVudC5vbihldmVudE91dCArICcuJyArIHRoaXMudHlwZSwgdGhpcy5vcHRpb25zLnNlbGVjdG9yLCAkLnByb3h5KHRoaXMubGVhdmUsIHRoaXMpKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucy5zZWxlY3RvciA/XG4gICAgICAodGhpcy5fb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIHsgdHJpZ2dlcjogJ21hbnVhbCcsIHNlbGVjdG9yOiAnJyB9KSkgOlxuICAgICAgdGhpcy5maXhUaXRsZSgpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXREZWZhdWx0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gVG9vbHRpcC5ERUZBVUxUU1xuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLmdldERlZmF1bHRzKCksIHRoaXMuJGVsZW1lbnQuZGF0YSgpLCBvcHRpb25zKVxuXG4gICAgaWYgKG9wdGlvbnMuZGVsYXkgJiYgdHlwZW9mIG9wdGlvbnMuZGVsYXkgPT0gJ251bWJlcicpIHtcbiAgICAgIG9wdGlvbnMuZGVsYXkgPSB7XG4gICAgICAgIHNob3c6IG9wdGlvbnMuZGVsYXksXG4gICAgICAgIGhpZGU6IG9wdGlvbnMuZGVsYXlcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9uc1xuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0RGVsZWdhdGVPcHRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcHRpb25zICA9IHt9XG4gICAgdmFyIGRlZmF1bHRzID0gdGhpcy5nZXREZWZhdWx0cygpXG5cbiAgICB0aGlzLl9vcHRpb25zICYmICQuZWFjaCh0aGlzLl9vcHRpb25zLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKGRlZmF1bHRzW2tleV0gIT0gdmFsdWUpIG9wdGlvbnNba2V5XSA9IHZhbHVlXG4gICAgfSlcblxuICAgIHJldHVybiBvcHRpb25zXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5lbnRlciA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICB2YXIgc2VsZiA9IG9iaiBpbnN0YW5jZW9mIHRoaXMuY29uc3RydWN0b3IgP1xuICAgICAgb2JqIDogJChvYmouY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSlcblxuICAgIGlmICghc2VsZikge1xuICAgICAgc2VsZiA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG9iai5jdXJyZW50VGFyZ2V0LCB0aGlzLmdldERlbGVnYXRlT3B0aW9ucygpKVxuICAgICAgJChvYmouY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSwgc2VsZilcbiAgICB9XG5cbiAgICBpZiAob2JqIGluc3RhbmNlb2YgJC5FdmVudCkge1xuICAgICAgc2VsZi5pblN0YXRlW29iai50eXBlID09ICdmb2N1c2luJyA/ICdmb2N1cycgOiAnaG92ZXInXSA9IHRydWVcbiAgICB9XG5cbiAgICBpZiAoc2VsZi50aXAoKS5oYXNDbGFzcygnaW4nKSB8fCBzZWxmLmhvdmVyU3RhdGUgPT0gJ2luJykge1xuICAgICAgc2VsZi5ob3ZlclN0YXRlID0gJ2luJ1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY2xlYXJUaW1lb3V0KHNlbGYudGltZW91dClcblxuICAgIHNlbGYuaG92ZXJTdGF0ZSA9ICdpbidcblxuICAgIGlmICghc2VsZi5vcHRpb25zLmRlbGF5IHx8ICFzZWxmLm9wdGlvbnMuZGVsYXkuc2hvdykgcmV0dXJuIHNlbGYuc2hvdygpXG5cbiAgICBzZWxmLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzZWxmLmhvdmVyU3RhdGUgPT0gJ2luJykgc2VsZi5zaG93KClcbiAgICB9LCBzZWxmLm9wdGlvbnMuZGVsYXkuc2hvdylcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmlzSW5TdGF0ZVRydWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuaW5TdGF0ZSkge1xuICAgICAgaWYgKHRoaXMuaW5TdGF0ZVtrZXldKSByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUubGVhdmUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIHNlbGYgPSBvYmogaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yID9cbiAgICAgIG9iaiA6ICQob2JqLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUpXG5cbiAgICBpZiAoIXNlbGYpIHtcbiAgICAgIHNlbGYgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihvYmouY3VycmVudFRhcmdldCwgdGhpcy5nZXREZWxlZ2F0ZU9wdGlvbnMoKSlcbiAgICAgICQob2JqLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUsIHNlbGYpXG4gICAgfVxuXG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mICQuRXZlbnQpIHtcbiAgICAgIHNlbGYuaW5TdGF0ZVtvYmoudHlwZSA9PSAnZm9jdXNvdXQnID8gJ2ZvY3VzJyA6ICdob3ZlciddID0gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoc2VsZi5pc0luU3RhdGVUcnVlKCkpIHJldHVyblxuXG4gICAgY2xlYXJUaW1lb3V0KHNlbGYudGltZW91dClcblxuICAgIHNlbGYuaG92ZXJTdGF0ZSA9ICdvdXQnXG5cbiAgICBpZiAoIXNlbGYub3B0aW9ucy5kZWxheSB8fCAhc2VsZi5vcHRpb25zLmRlbGF5LmhpZGUpIHJldHVybiBzZWxmLmhpZGUoKVxuXG4gICAgc2VsZi50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2VsZi5ob3ZlclN0YXRlID09ICdvdXQnKSBzZWxmLmhpZGUoKVxuICAgIH0sIHNlbGYub3B0aW9ucy5kZWxheS5oaWRlKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZSA9ICQuRXZlbnQoJ3Nob3cuYnMuJyArIHRoaXMudHlwZSlcblxuICAgIGlmICh0aGlzLmhhc0NvbnRlbnQoKSAmJiB0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihlKVxuXG4gICAgICB2YXIgaW5Eb20gPSAkLmNvbnRhaW5zKHRoaXMuJGVsZW1lbnRbMF0ub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHRoaXMuJGVsZW1lbnRbMF0pXG4gICAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSB8fCAhaW5Eb20pIHJldHVyblxuICAgICAgdmFyIHRoYXQgPSB0aGlzXG5cbiAgICAgIHZhciAkdGlwID0gdGhpcy50aXAoKVxuXG4gICAgICB2YXIgdGlwSWQgPSB0aGlzLmdldFVJRCh0aGlzLnR5cGUpXG5cbiAgICAgIHRoaXMuc2V0Q29udGVudCgpXG4gICAgICAkdGlwLmF0dHIoJ2lkJywgdGlwSWQpXG4gICAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknLCB0aXBJZClcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbmltYXRpb24pICR0aXAuYWRkQ2xhc3MoJ2ZhZGUnKVxuXG4gICAgICB2YXIgcGxhY2VtZW50ID0gdHlwZW9mIHRoaXMub3B0aW9ucy5wbGFjZW1lbnQgPT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgIHRoaXMub3B0aW9ucy5wbGFjZW1lbnQuY2FsbCh0aGlzLCAkdGlwWzBdLCB0aGlzLiRlbGVtZW50WzBdKSA6XG4gICAgICAgIHRoaXMub3B0aW9ucy5wbGFjZW1lbnRcblxuICAgICAgdmFyIGF1dG9Ub2tlbiA9IC9cXHM/YXV0bz9cXHM/L2lcbiAgICAgIHZhciBhdXRvUGxhY2UgPSBhdXRvVG9rZW4udGVzdChwbGFjZW1lbnQpXG4gICAgICBpZiAoYXV0b1BsYWNlKSBwbGFjZW1lbnQgPSBwbGFjZW1lbnQucmVwbGFjZShhdXRvVG9rZW4sICcnKSB8fCAndG9wJ1xuXG4gICAgICAkdGlwXG4gICAgICAgIC5kZXRhY2goKVxuICAgICAgICAuY3NzKHsgdG9wOiAwLCBsZWZ0OiAwLCBkaXNwbGF5OiAnYmxvY2snIH0pXG4gICAgICAgIC5hZGRDbGFzcyhwbGFjZW1lbnQpXG4gICAgICAgIC5kYXRhKCdicy4nICsgdGhpcy50eXBlLCB0aGlzKVxuXG4gICAgICB0aGlzLm9wdGlvbnMuY29udGFpbmVyID8gJHRpcC5hcHBlbmRUbyh0aGlzLm9wdGlvbnMuY29udGFpbmVyKSA6ICR0aXAuaW5zZXJ0QWZ0ZXIodGhpcy4kZWxlbWVudClcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignaW5zZXJ0ZWQuYnMuJyArIHRoaXMudHlwZSlcblxuICAgICAgdmFyIHBvcyAgICAgICAgICA9IHRoaXMuZ2V0UG9zaXRpb24oKVxuICAgICAgdmFyIGFjdHVhbFdpZHRoICA9ICR0aXBbMF0ub2Zmc2V0V2lkdGhcbiAgICAgIHZhciBhY3R1YWxIZWlnaHQgPSAkdGlwWzBdLm9mZnNldEhlaWdodFxuXG4gICAgICBpZiAoYXV0b1BsYWNlKSB7XG4gICAgICAgIHZhciBvcmdQbGFjZW1lbnQgPSBwbGFjZW1lbnRcbiAgICAgICAgdmFyIHZpZXdwb3J0RGltID0gdGhpcy5nZXRQb3NpdGlvbih0aGlzLiR2aWV3cG9ydClcblxuICAgICAgICBwbGFjZW1lbnQgPSBwbGFjZW1lbnQgPT0gJ2JvdHRvbScgJiYgcG9zLmJvdHRvbSArIGFjdHVhbEhlaWdodCA+IHZpZXdwb3J0RGltLmJvdHRvbSA/ICd0b3AnICAgIDpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50ID09ICd0b3AnICAgICYmIHBvcy50b3AgICAgLSBhY3R1YWxIZWlnaHQgPCB2aWV3cG9ydERpbS50b3AgICAgPyAnYm90dG9tJyA6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9PSAncmlnaHQnICAmJiBwb3MucmlnaHQgICsgYWN0dWFsV2lkdGggID4gdmlld3BvcnREaW0ud2lkdGggID8gJ2xlZnQnICAgOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPT0gJ2xlZnQnICAgJiYgcG9zLmxlZnQgICAtIGFjdHVhbFdpZHRoICA8IHZpZXdwb3J0RGltLmxlZnQgICA/ICdyaWdodCcgIDpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50XG5cbiAgICAgICAgJHRpcFxuICAgICAgICAgIC5yZW1vdmVDbGFzcyhvcmdQbGFjZW1lbnQpXG4gICAgICAgICAgLmFkZENsYXNzKHBsYWNlbWVudClcbiAgICAgIH1cblxuICAgICAgdmFyIGNhbGN1bGF0ZWRPZmZzZXQgPSB0aGlzLmdldENhbGN1bGF0ZWRPZmZzZXQocGxhY2VtZW50LCBwb3MsIGFjdHVhbFdpZHRoLCBhY3R1YWxIZWlnaHQpXG5cbiAgICAgIHRoaXMuYXBwbHlQbGFjZW1lbnQoY2FsY3VsYXRlZE9mZnNldCwgcGxhY2VtZW50KVxuXG4gICAgICB2YXIgY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwcmV2SG92ZXJTdGF0ZSA9IHRoYXQuaG92ZXJTdGF0ZVxuICAgICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoJ3Nob3duLmJzLicgKyB0aGF0LnR5cGUpXG4gICAgICAgIHRoYXQuaG92ZXJTdGF0ZSA9IG51bGxcblxuICAgICAgICBpZiAocHJldkhvdmVyU3RhdGUgPT0gJ291dCcpIHRoYXQubGVhdmUodGhhdClcbiAgICAgIH1cblxuICAgICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kdGlwLmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgICAkdGlwXG4gICAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgY29tcGxldGUpXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKFRvb2x0aXAuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgICBjb21wbGV0ZSgpXG4gICAgfVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuYXBwbHlQbGFjZW1lbnQgPSBmdW5jdGlvbiAob2Zmc2V0LCBwbGFjZW1lbnQpIHtcbiAgICB2YXIgJHRpcCAgID0gdGhpcy50aXAoKVxuICAgIHZhciB3aWR0aCAgPSAkdGlwWzBdLm9mZnNldFdpZHRoXG4gICAgdmFyIGhlaWdodCA9ICR0aXBbMF0ub2Zmc2V0SGVpZ2h0XG5cbiAgICAvLyBtYW51YWxseSByZWFkIG1hcmdpbnMgYmVjYXVzZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaW5jbHVkZXMgZGlmZmVyZW5jZVxuICAgIHZhciBtYXJnaW5Ub3AgPSBwYXJzZUludCgkdGlwLmNzcygnbWFyZ2luLXRvcCcpLCAxMClcbiAgICB2YXIgbWFyZ2luTGVmdCA9IHBhcnNlSW50KCR0aXAuY3NzKCdtYXJnaW4tbGVmdCcpLCAxMClcblxuICAgIC8vIHdlIG11c3QgY2hlY2sgZm9yIE5hTiBmb3IgaWUgOC85XG4gICAgaWYgKGlzTmFOKG1hcmdpblRvcCkpICBtYXJnaW5Ub3AgID0gMFxuICAgIGlmIChpc05hTihtYXJnaW5MZWZ0KSkgbWFyZ2luTGVmdCA9IDBcblxuICAgIG9mZnNldC50b3AgICs9IG1hcmdpblRvcFxuICAgIG9mZnNldC5sZWZ0ICs9IG1hcmdpbkxlZnRcblxuICAgIC8vICQuZm4ub2Zmc2V0IGRvZXNuJ3Qgcm91bmQgcGl4ZWwgdmFsdWVzXG4gICAgLy8gc28gd2UgdXNlIHNldE9mZnNldCBkaXJlY3RseSB3aXRoIG91ciBvd24gZnVuY3Rpb24gQi0wXG4gICAgJC5vZmZzZXQuc2V0T2Zmc2V0KCR0aXBbMF0sICQuZXh0ZW5kKHtcbiAgICAgIHVzaW5nOiBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgJHRpcC5jc3Moe1xuICAgICAgICAgIHRvcDogTWF0aC5yb3VuZChwcm9wcy50b3ApLFxuICAgICAgICAgIGxlZnQ6IE1hdGgucm91bmQocHJvcHMubGVmdClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LCBvZmZzZXQpLCAwKVxuXG4gICAgJHRpcC5hZGRDbGFzcygnaW4nKVxuXG4gICAgLy8gY2hlY2sgdG8gc2VlIGlmIHBsYWNpbmcgdGlwIGluIG5ldyBvZmZzZXQgY2F1c2VkIHRoZSB0aXAgdG8gcmVzaXplIGl0c2VsZlxuICAgIHZhciBhY3R1YWxXaWR0aCAgPSAkdGlwWzBdLm9mZnNldFdpZHRoXG4gICAgdmFyIGFjdHVhbEhlaWdodCA9ICR0aXBbMF0ub2Zmc2V0SGVpZ2h0XG5cbiAgICBpZiAocGxhY2VtZW50ID09ICd0b3AnICYmIGFjdHVhbEhlaWdodCAhPSBoZWlnaHQpIHtcbiAgICAgIG9mZnNldC50b3AgPSBvZmZzZXQudG9wICsgaGVpZ2h0IC0gYWN0dWFsSGVpZ2h0XG4gICAgfVxuXG4gICAgdmFyIGRlbHRhID0gdGhpcy5nZXRWaWV3cG9ydEFkanVzdGVkRGVsdGEocGxhY2VtZW50LCBvZmZzZXQsIGFjdHVhbFdpZHRoLCBhY3R1YWxIZWlnaHQpXG5cbiAgICBpZiAoZGVsdGEubGVmdCkgb2Zmc2V0LmxlZnQgKz0gZGVsdGEubGVmdFxuICAgIGVsc2Ugb2Zmc2V0LnRvcCArPSBkZWx0YS50b3BcblxuICAgIHZhciBpc1ZlcnRpY2FsICAgICAgICAgID0gL3RvcHxib3R0b20vLnRlc3QocGxhY2VtZW50KVxuICAgIHZhciBhcnJvd0RlbHRhICAgICAgICAgID0gaXNWZXJ0aWNhbCA/IGRlbHRhLmxlZnQgKiAyIC0gd2lkdGggKyBhY3R1YWxXaWR0aCA6IGRlbHRhLnRvcCAqIDIgLSBoZWlnaHQgKyBhY3R1YWxIZWlnaHRcbiAgICB2YXIgYXJyb3dPZmZzZXRQb3NpdGlvbiA9IGlzVmVydGljYWwgPyAnb2Zmc2V0V2lkdGgnIDogJ29mZnNldEhlaWdodCdcblxuICAgICR0aXAub2Zmc2V0KG9mZnNldClcbiAgICB0aGlzLnJlcGxhY2VBcnJvdyhhcnJvd0RlbHRhLCAkdGlwWzBdW2Fycm93T2Zmc2V0UG9zaXRpb25dLCBpc1ZlcnRpY2FsKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUucmVwbGFjZUFycm93ID0gZnVuY3Rpb24gKGRlbHRhLCBkaW1lbnNpb24sIGlzVmVydGljYWwpIHtcbiAgICB0aGlzLmFycm93KClcbiAgICAgIC5jc3MoaXNWZXJ0aWNhbCA/ICdsZWZ0JyA6ICd0b3AnLCA1MCAqICgxIC0gZGVsdGEgLyBkaW1lbnNpb24pICsgJyUnKVxuICAgICAgLmNzcyhpc1ZlcnRpY2FsID8gJ3RvcCcgOiAnbGVmdCcsICcnKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHRpcCAgPSB0aGlzLnRpcCgpXG4gICAgdmFyIHRpdGxlID0gdGhpcy5nZXRUaXRsZSgpXG5cbiAgICAkdGlwLmZpbmQoJy50b29sdGlwLWlubmVyJylbdGhpcy5vcHRpb25zLmh0bWwgPyAnaHRtbCcgOiAndGV4dCddKHRpdGxlKVxuICAgICR0aXAucmVtb3ZlQ2xhc3MoJ2ZhZGUgaW4gdG9wIGJvdHRvbSBsZWZ0IHJpZ2h0JylcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICB2YXIgJHRpcCA9ICQodGhpcy4kdGlwKVxuICAgIHZhciBlICAgID0gJC5FdmVudCgnaGlkZS5icy4nICsgdGhpcy50eXBlKVxuXG4gICAgZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICBpZiAodGhhdC5ob3ZlclN0YXRlICE9ICdpbicpICR0aXAuZGV0YWNoKClcbiAgICAgIGlmICh0aGF0LiRlbGVtZW50KSB7IC8vIFRPRE86IENoZWNrIHdoZXRoZXIgZ3VhcmRpbmcgdGhpcyBjb2RlIHdpdGggdGhpcyBgaWZgIGlzIHJlYWxseSBuZWNlc3NhcnkuXG4gICAgICAgIHRoYXQuJGVsZW1lbnRcbiAgICAgICAgICAucmVtb3ZlQXR0cignYXJpYS1kZXNjcmliZWRieScpXG4gICAgICAgICAgLnRyaWdnZXIoJ2hpZGRlbi5icy4nICsgdGhhdC50eXBlKVxuICAgICAgfVxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgIH1cblxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihlKVxuXG4gICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgJHRpcC5yZW1vdmVDbGFzcygnaW4nKVxuXG4gICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgJHRpcC5oYXNDbGFzcygnZmFkZScpID9cbiAgICAgICR0aXBcbiAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgY29tcGxldGUpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChUb29sdGlwLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgIGNvbXBsZXRlKClcblxuICAgIHRoaXMuaG92ZXJTdGF0ZSA9IG51bGxcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5maXhUaXRsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJGUgPSB0aGlzLiRlbGVtZW50XG4gICAgaWYgKCRlLmF0dHIoJ3RpdGxlJykgfHwgdHlwZW9mICRlLmF0dHIoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnKSAhPSAnc3RyaW5nJykge1xuICAgICAgJGUuYXR0cignZGF0YS1vcmlnaW5hbC10aXRsZScsICRlLmF0dHIoJ3RpdGxlJykgfHwgJycpLmF0dHIoJ3RpdGxlJywgJycpXG4gICAgfVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuaGFzQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSgpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uICgkZWxlbWVudCkge1xuICAgICRlbGVtZW50ICAgPSAkZWxlbWVudCB8fCB0aGlzLiRlbGVtZW50XG5cbiAgICB2YXIgZWwgICAgID0gJGVsZW1lbnRbMF1cbiAgICB2YXIgaXNCb2R5ID0gZWwudGFnTmFtZSA9PSAnQk9EWSdcblxuICAgIHZhciBlbFJlY3QgICAgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIGlmIChlbFJlY3Qud2lkdGggPT0gbnVsbCkge1xuICAgICAgLy8gd2lkdGggYW5kIGhlaWdodCBhcmUgbWlzc2luZyBpbiBJRTgsIHNvIGNvbXB1dGUgdGhlbSBtYW51YWxseTsgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9pc3N1ZXMvMTQwOTNcbiAgICAgIGVsUmVjdCA9ICQuZXh0ZW5kKHt9LCBlbFJlY3QsIHsgd2lkdGg6IGVsUmVjdC5yaWdodCAtIGVsUmVjdC5sZWZ0LCBoZWlnaHQ6IGVsUmVjdC5ib3R0b20gLSBlbFJlY3QudG9wIH0pXG4gICAgfVxuICAgIHZhciBpc1N2ZyA9IHdpbmRvdy5TVkdFbGVtZW50ICYmIGVsIGluc3RhbmNlb2Ygd2luZG93LlNWR0VsZW1lbnRcbiAgICAvLyBBdm9pZCB1c2luZyAkLm9mZnNldCgpIG9uIFNWR3Mgc2luY2UgaXQgZ2l2ZXMgaW5jb3JyZWN0IHJlc3VsdHMgaW4galF1ZXJ5IDMuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9pc3N1ZXMvMjAyODBcbiAgICB2YXIgZWxPZmZzZXQgID0gaXNCb2R5ID8geyB0b3A6IDAsIGxlZnQ6IDAgfSA6IChpc1N2ZyA/IG51bGwgOiAkZWxlbWVudC5vZmZzZXQoKSlcbiAgICB2YXIgc2Nyb2xsICAgID0geyBzY3JvbGw6IGlzQm9keSA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgOiAkZWxlbWVudC5zY3JvbGxUb3AoKSB9XG4gICAgdmFyIG91dGVyRGltcyA9IGlzQm9keSA/IHsgd2lkdGg6ICQod2luZG93KS53aWR0aCgpLCBoZWlnaHQ6ICQod2luZG93KS5oZWlnaHQoKSB9IDogbnVsbFxuXG4gICAgcmV0dXJuICQuZXh0ZW5kKHt9LCBlbFJlY3QsIHNjcm9sbCwgb3V0ZXJEaW1zLCBlbE9mZnNldClcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldENhbGN1bGF0ZWRPZmZzZXQgPSBmdW5jdGlvbiAocGxhY2VtZW50LCBwb3MsIGFjdHVhbFdpZHRoLCBhY3R1YWxIZWlnaHQpIHtcbiAgICByZXR1cm4gcGxhY2VtZW50ID09ICdib3R0b20nID8geyB0b3A6IHBvcy50b3AgKyBwb3MuaGVpZ2h0LCAgIGxlZnQ6IHBvcy5sZWZ0ICsgcG9zLndpZHRoIC8gMiAtIGFjdHVhbFdpZHRoIC8gMiB9IDpcbiAgICAgICAgICAgcGxhY2VtZW50ID09ICd0b3AnICAgID8geyB0b3A6IHBvcy50b3AgLSBhY3R1YWxIZWlnaHQsIGxlZnQ6IHBvcy5sZWZ0ICsgcG9zLndpZHRoIC8gMiAtIGFjdHVhbFdpZHRoIC8gMiB9IDpcbiAgICAgICAgICAgcGxhY2VtZW50ID09ICdsZWZ0JyAgID8geyB0b3A6IHBvcy50b3AgKyBwb3MuaGVpZ2h0IC8gMiAtIGFjdHVhbEhlaWdodCAvIDIsIGxlZnQ6IHBvcy5sZWZ0IC0gYWN0dWFsV2lkdGggfSA6XG4gICAgICAgIC8qIHBsYWNlbWVudCA9PSAncmlnaHQnICovIHsgdG9wOiBwb3MudG9wICsgcG9zLmhlaWdodCAvIDIgLSBhY3R1YWxIZWlnaHQgLyAyLCBsZWZ0OiBwb3MubGVmdCArIHBvcy53aWR0aCB9XG5cbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldFZpZXdwb3J0QWRqdXN0ZWREZWx0YSA9IGZ1bmN0aW9uIChwbGFjZW1lbnQsIHBvcywgYWN0dWFsV2lkdGgsIGFjdHVhbEhlaWdodCkge1xuICAgIHZhciBkZWx0YSA9IHsgdG9wOiAwLCBsZWZ0OiAwIH1cbiAgICBpZiAoIXRoaXMuJHZpZXdwb3J0KSByZXR1cm4gZGVsdGFcblxuICAgIHZhciB2aWV3cG9ydFBhZGRpbmcgPSB0aGlzLm9wdGlvbnMudmlld3BvcnQgJiYgdGhpcy5vcHRpb25zLnZpZXdwb3J0LnBhZGRpbmcgfHwgMFxuICAgIHZhciB2aWV3cG9ydERpbWVuc2lvbnMgPSB0aGlzLmdldFBvc2l0aW9uKHRoaXMuJHZpZXdwb3J0KVxuXG4gICAgaWYgKC9yaWdodHxsZWZ0Ly50ZXN0KHBsYWNlbWVudCkpIHtcbiAgICAgIHZhciB0b3BFZGdlT2Zmc2V0ICAgID0gcG9zLnRvcCAtIHZpZXdwb3J0UGFkZGluZyAtIHZpZXdwb3J0RGltZW5zaW9ucy5zY3JvbGxcbiAgICAgIHZhciBib3R0b21FZGdlT2Zmc2V0ID0gcG9zLnRvcCArIHZpZXdwb3J0UGFkZGluZyAtIHZpZXdwb3J0RGltZW5zaW9ucy5zY3JvbGwgKyBhY3R1YWxIZWlnaHRcbiAgICAgIGlmICh0b3BFZGdlT2Zmc2V0IDwgdmlld3BvcnREaW1lbnNpb25zLnRvcCkgeyAvLyB0b3Agb3ZlcmZsb3dcbiAgICAgICAgZGVsdGEudG9wID0gdmlld3BvcnREaW1lbnNpb25zLnRvcCAtIHRvcEVkZ2VPZmZzZXRcbiAgICAgIH0gZWxzZSBpZiAoYm90dG9tRWRnZU9mZnNldCA+IHZpZXdwb3J0RGltZW5zaW9ucy50b3AgKyB2aWV3cG9ydERpbWVuc2lvbnMuaGVpZ2h0KSB7IC8vIGJvdHRvbSBvdmVyZmxvd1xuICAgICAgICBkZWx0YS50b3AgPSB2aWV3cG9ydERpbWVuc2lvbnMudG9wICsgdmlld3BvcnREaW1lbnNpb25zLmhlaWdodCAtIGJvdHRvbUVkZ2VPZmZzZXRcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGxlZnRFZGdlT2Zmc2V0ICA9IHBvcy5sZWZ0IC0gdmlld3BvcnRQYWRkaW5nXG4gICAgICB2YXIgcmlnaHRFZGdlT2Zmc2V0ID0gcG9zLmxlZnQgKyB2aWV3cG9ydFBhZGRpbmcgKyBhY3R1YWxXaWR0aFxuICAgICAgaWYgKGxlZnRFZGdlT2Zmc2V0IDwgdmlld3BvcnREaW1lbnNpb25zLmxlZnQpIHsgLy8gbGVmdCBvdmVyZmxvd1xuICAgICAgICBkZWx0YS5sZWZ0ID0gdmlld3BvcnREaW1lbnNpb25zLmxlZnQgLSBsZWZ0RWRnZU9mZnNldFxuICAgICAgfSBlbHNlIGlmIChyaWdodEVkZ2VPZmZzZXQgPiB2aWV3cG9ydERpbWVuc2lvbnMucmlnaHQpIHsgLy8gcmlnaHQgb3ZlcmZsb3dcbiAgICAgICAgZGVsdGEubGVmdCA9IHZpZXdwb3J0RGltZW5zaW9ucy5sZWZ0ICsgdmlld3BvcnREaW1lbnNpb25zLndpZHRoIC0gcmlnaHRFZGdlT2Zmc2V0XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbHRhXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRUaXRsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGl0bGVcbiAgICB2YXIgJGUgPSB0aGlzLiRlbGVtZW50XG4gICAgdmFyIG8gID0gdGhpcy5vcHRpb25zXG5cbiAgICB0aXRsZSA9ICRlLmF0dHIoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnKVxuICAgICAgfHwgKHR5cGVvZiBvLnRpdGxlID09ICdmdW5jdGlvbicgPyBvLnRpdGxlLmNhbGwoJGVbMF0pIDogIG8udGl0bGUpXG5cbiAgICByZXR1cm4gdGl0bGVcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldFVJRCA9IGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICBkbyBwcmVmaXggKz0gfn4oTWF0aC5yYW5kb20oKSAqIDEwMDAwMDApXG4gICAgd2hpbGUgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByZWZpeCkpXG4gICAgcmV0dXJuIHByZWZpeFxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUudGlwID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy4kdGlwKSB7XG4gICAgICB0aGlzLiR0aXAgPSAkKHRoaXMub3B0aW9ucy50ZW1wbGF0ZSlcbiAgICAgIGlmICh0aGlzLiR0aXAubGVuZ3RoICE9IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMudHlwZSArICcgYHRlbXBsYXRlYCBvcHRpb24gbXVzdCBjb25zaXN0IG9mIGV4YWN0bHkgMSB0b3AtbGV2ZWwgZWxlbWVudCEnKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy4kdGlwXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5hcnJvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKHRoaXMuJGFycm93ID0gdGhpcy4kYXJyb3cgfHwgdGhpcy50aXAoKS5maW5kKCcudG9vbHRpcC1hcnJvdycpKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9IHRydWVcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lbmFibGVkID0gZmFsc2VcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnRvZ2dsZUVuYWJsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lbmFibGVkID0gIXRoaXMuZW5hYmxlZFxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICBpZiAoZSkge1xuICAgICAgc2VsZiA9ICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCdicy4nICsgdGhpcy50eXBlKVxuICAgICAgaWYgKCFzZWxmKSB7XG4gICAgICAgIHNlbGYgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihlLmN1cnJlbnRUYXJnZXQsIHRoaXMuZ2V0RGVsZWdhdGVPcHRpb25zKCkpXG4gICAgICAgICQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCdicy4nICsgdGhpcy50eXBlLCBzZWxmKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChlKSB7XG4gICAgICBzZWxmLmluU3RhdGUuY2xpY2sgPSAhc2VsZi5pblN0YXRlLmNsaWNrXG4gICAgICBpZiAoc2VsZi5pc0luU3RhdGVUcnVlKCkpIHNlbGYuZW50ZXIoc2VsZilcbiAgICAgIGVsc2Ugc2VsZi5sZWF2ZShzZWxmKVxuICAgIH0gZWxzZSB7XG4gICAgICBzZWxmLnRpcCgpLmhhc0NsYXNzKCdpbicpID8gc2VsZi5sZWF2ZShzZWxmKSA6IHNlbGYuZW50ZXIoc2VsZilcbiAgICB9XG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpXG4gICAgdGhpcy5oaWRlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoYXQuJGVsZW1lbnQub2ZmKCcuJyArIHRoYXQudHlwZSkucmVtb3ZlRGF0YSgnYnMuJyArIHRoYXQudHlwZSlcbiAgICAgIGlmICh0aGF0LiR0aXApIHtcbiAgICAgICAgdGhhdC4kdGlwLmRldGFjaCgpXG4gICAgICB9XG4gICAgICB0aGF0LiR0aXAgPSBudWxsXG4gICAgICB0aGF0LiRhcnJvdyA9IG51bGxcbiAgICAgIHRoYXQuJHZpZXdwb3J0ID0gbnVsbFxuICAgICAgdGhhdC4kZWxlbWVudCA9IG51bGxcbiAgICB9KVxuICB9XG5cblxuICAvLyBUT09MVElQIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMudG9vbHRpcCcpXG4gICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uXG5cbiAgICAgIGlmICghZGF0YSAmJiAvZGVzdHJveXxoaWRlLy50ZXN0KG9wdGlvbikpIHJldHVyblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy50b29sdGlwJywgKGRhdGEgPSBuZXcgVG9vbHRpcCh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4udG9vbHRpcFxuXG4gICQuZm4udG9vbHRpcCAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLnRvb2x0aXAuQ29uc3RydWN0b3IgPSBUb29sdGlwXG5cblxuICAvLyBUT09MVElQIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT1cblxuICAkLmZuLnRvb2x0aXAubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLnRvb2x0aXAgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IHBvcG92ZXIuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNwb3BvdmVyc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIFBPUE9WRVIgUFVCTElDIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBQb3BvdmVyID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmluaXQoJ3BvcG92ZXInLCBlbGVtZW50LCBvcHRpb25zKVxuICB9XG5cbiAgaWYgKCEkLmZuLnRvb2x0aXApIHRocm93IG5ldyBFcnJvcignUG9wb3ZlciByZXF1aXJlcyB0b29sdGlwLmpzJylcblxuICBQb3BvdmVyLlZFUlNJT04gID0gJzMuMy43J1xuXG4gIFBvcG92ZXIuREVGQVVMVFMgPSAkLmV4dGVuZCh7fSwgJC5mbi50b29sdGlwLkNvbnN0cnVjdG9yLkRFRkFVTFRTLCB7XG4gICAgcGxhY2VtZW50OiAncmlnaHQnLFxuICAgIHRyaWdnZXI6ICdjbGljaycsXG4gICAgY29udGVudDogJycsXG4gICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwicG9wb3ZlclwiIHJvbGU9XCJ0b29sdGlwXCI+PGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+PGgzIGNsYXNzPVwicG9wb3Zlci10aXRsZVwiPjwvaDM+PGRpdiBjbGFzcz1cInBvcG92ZXItY29udGVudFwiPjwvZGl2PjwvZGl2PidcbiAgfSlcblxuXG4gIC8vIE5PVEU6IFBPUE9WRVIgRVhURU5EUyB0b29sdGlwLmpzXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgUG9wb3Zlci5wcm90b3R5cGUgPSAkLmV4dGVuZCh7fSwgJC5mbi50b29sdGlwLkNvbnN0cnVjdG9yLnByb3RvdHlwZSlcblxuICBQb3BvdmVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFBvcG92ZXJcblxuICBQb3BvdmVyLnByb3RvdHlwZS5nZXREZWZhdWx0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gUG9wb3Zlci5ERUZBVUxUU1xuICB9XG5cbiAgUG9wb3Zlci5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHRpcCAgICA9IHRoaXMudGlwKClcbiAgICB2YXIgdGl0bGUgICA9IHRoaXMuZ2V0VGl0bGUoKVxuICAgIHZhciBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KClcblxuICAgICR0aXAuZmluZCgnLnBvcG92ZXItdGl0bGUnKVt0aGlzLm9wdGlvbnMuaHRtbCA/ICdodG1sJyA6ICd0ZXh0J10odGl0bGUpXG4gICAgJHRpcC5maW5kKCcucG9wb3Zlci1jb250ZW50JykuY2hpbGRyZW4oKS5kZXRhY2goKS5lbmQoKVsgLy8gd2UgdXNlIGFwcGVuZCBmb3IgaHRtbCBvYmplY3RzIHRvIG1haW50YWluIGpzIGV2ZW50c1xuICAgICAgdGhpcy5vcHRpb25zLmh0bWwgPyAodHlwZW9mIGNvbnRlbnQgPT0gJ3N0cmluZycgPyAnaHRtbCcgOiAnYXBwZW5kJykgOiAndGV4dCdcbiAgICBdKGNvbnRlbnQpXG5cbiAgICAkdGlwLnJlbW92ZUNsYXNzKCdmYWRlIHRvcCBib3R0b20gbGVmdCByaWdodCBpbicpXG5cbiAgICAvLyBJRTggZG9lc24ndCBhY2NlcHQgaGlkaW5nIHZpYSB0aGUgYDplbXB0eWAgcHNldWRvIHNlbGVjdG9yLCB3ZSBoYXZlIHRvIGRvXG4gICAgLy8gdGhpcyBtYW51YWxseSBieSBjaGVja2luZyB0aGUgY29udGVudHMuXG4gICAgaWYgKCEkdGlwLmZpbmQoJy5wb3BvdmVyLXRpdGxlJykuaHRtbCgpKSAkdGlwLmZpbmQoJy5wb3BvdmVyLXRpdGxlJykuaGlkZSgpXG4gIH1cblxuICBQb3BvdmVyLnByb3RvdHlwZS5oYXNDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmdldFRpdGxlKCkgfHwgdGhpcy5nZXRDb250ZW50KClcbiAgfVxuXG4gIFBvcG92ZXIucHJvdG90eXBlLmdldENvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRlID0gdGhpcy4kZWxlbWVudFxuICAgIHZhciBvICA9IHRoaXMub3B0aW9uc1xuXG4gICAgcmV0dXJuICRlLmF0dHIoJ2RhdGEtY29udGVudCcpXG4gICAgICB8fCAodHlwZW9mIG8uY29udGVudCA9PSAnZnVuY3Rpb24nID9cbiAgICAgICAgICAgIG8uY29udGVudC5jYWxsKCRlWzBdKSA6XG4gICAgICAgICAgICBvLmNvbnRlbnQpXG4gIH1cblxuICBQb3BvdmVyLnByb3RvdHlwZS5hcnJvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKHRoaXMuJGFycm93ID0gdGhpcy4kYXJyb3cgfHwgdGhpcy50aXAoKS5maW5kKCcuYXJyb3cnKSlcbiAgfVxuXG5cbiAgLy8gUE9QT1ZFUiBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLnBvcG92ZXInKVxuICAgICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvblxuXG4gICAgICBpZiAoIWRhdGEgJiYgL2Rlc3Ryb3l8aGlkZS8udGVzdChvcHRpb24pKSByZXR1cm5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMucG9wb3ZlcicsIChkYXRhID0gbmV3IFBvcG92ZXIodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLnBvcG92ZXJcblxuICAkLmZuLnBvcG92ZXIgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5wb3BvdmVyLkNvbnN0cnVjdG9yID0gUG9wb3ZlclxuXG5cbiAgLy8gUE9QT1ZFUiBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5wb3BvdmVyLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5wb3BvdmVyID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBzY3JvbGxzcHkuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNzY3JvbGxzcHlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBTQ1JPTExTUFkgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFNjcm9sbFNweShlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy4kYm9keSAgICAgICAgICA9ICQoZG9jdW1lbnQuYm9keSlcbiAgICB0aGlzLiRzY3JvbGxFbGVtZW50ID0gJChlbGVtZW50KS5pcyhkb2N1bWVudC5ib2R5KSA/ICQod2luZG93KSA6ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgICAgICAgID0gJC5leHRlbmQoe30sIFNjcm9sbFNweS5ERUZBVUxUUywgb3B0aW9ucylcbiAgICB0aGlzLnNlbGVjdG9yICAgICAgID0gKHRoaXMub3B0aW9ucy50YXJnZXQgfHwgJycpICsgJyAubmF2IGxpID4gYSdcbiAgICB0aGlzLm9mZnNldHMgICAgICAgID0gW11cbiAgICB0aGlzLnRhcmdldHMgICAgICAgID0gW11cbiAgICB0aGlzLmFjdGl2ZVRhcmdldCAgID0gbnVsbFxuICAgIHRoaXMuc2Nyb2xsSGVpZ2h0ICAgPSAwXG5cbiAgICB0aGlzLiRzY3JvbGxFbGVtZW50Lm9uKCdzY3JvbGwuYnMuc2Nyb2xsc3B5JywgJC5wcm94eSh0aGlzLnByb2Nlc3MsIHRoaXMpKVxuICAgIHRoaXMucmVmcmVzaCgpXG4gICAgdGhpcy5wcm9jZXNzKClcbiAgfVxuXG4gIFNjcm9sbFNweS5WRVJTSU9OICA9ICczLjMuNydcblxuICBTY3JvbGxTcHkuREVGQVVMVFMgPSB7XG4gICAgb2Zmc2V0OiAxMFxuICB9XG5cbiAgU2Nyb2xsU3B5LnByb3RvdHlwZS5nZXRTY3JvbGxIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuJHNjcm9sbEVsZW1lbnRbMF0uc2Nyb2xsSGVpZ2h0IHx8IE1hdGgubWF4KHRoaXMuJGJvZHlbMF0uc2Nyb2xsSGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0KVxuICB9XG5cbiAgU2Nyb2xsU3B5LnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aGF0ICAgICAgICAgID0gdGhpc1xuICAgIHZhciBvZmZzZXRNZXRob2QgID0gJ29mZnNldCdcbiAgICB2YXIgb2Zmc2V0QmFzZSAgICA9IDBcblxuICAgIHRoaXMub2Zmc2V0cyAgICAgID0gW11cbiAgICB0aGlzLnRhcmdldHMgICAgICA9IFtdXG4gICAgdGhpcy5zY3JvbGxIZWlnaHQgPSB0aGlzLmdldFNjcm9sbEhlaWdodCgpXG5cbiAgICBpZiAoISQuaXNXaW5kb3codGhpcy4kc2Nyb2xsRWxlbWVudFswXSkpIHtcbiAgICAgIG9mZnNldE1ldGhvZCA9ICdwb3NpdGlvbidcbiAgICAgIG9mZnNldEJhc2UgICA9IHRoaXMuJHNjcm9sbEVsZW1lbnQuc2Nyb2xsVG9wKClcbiAgICB9XG5cbiAgICB0aGlzLiRib2R5XG4gICAgICAuZmluZCh0aGlzLnNlbGVjdG9yKVxuICAgICAgLm1hcChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkZWwgICA9ICQodGhpcylcbiAgICAgICAgdmFyIGhyZWYgID0gJGVsLmRhdGEoJ3RhcmdldCcpIHx8ICRlbC5hdHRyKCdocmVmJylcbiAgICAgICAgdmFyICRocmVmID0gL14jLi8udGVzdChocmVmKSAmJiAkKGhyZWYpXG5cbiAgICAgICAgcmV0dXJuICgkaHJlZlxuICAgICAgICAgICYmICRocmVmLmxlbmd0aFxuICAgICAgICAgICYmICRocmVmLmlzKCc6dmlzaWJsZScpXG4gICAgICAgICAgJiYgW1skaHJlZltvZmZzZXRNZXRob2RdKCkudG9wICsgb2Zmc2V0QmFzZSwgaHJlZl1dKSB8fCBudWxsXG4gICAgICB9KVxuICAgICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGFbMF0gLSBiWzBdIH0pXG4gICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoYXQub2Zmc2V0cy5wdXNoKHRoaXNbMF0pXG4gICAgICAgIHRoYXQudGFyZ2V0cy5wdXNoKHRoaXNbMV0pXG4gICAgICB9KVxuICB9XG5cbiAgU2Nyb2xsU3B5LnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzY3JvbGxUb3AgICAgPSB0aGlzLiRzY3JvbGxFbGVtZW50LnNjcm9sbFRvcCgpICsgdGhpcy5vcHRpb25zLm9mZnNldFxuICAgIHZhciBzY3JvbGxIZWlnaHQgPSB0aGlzLmdldFNjcm9sbEhlaWdodCgpXG4gICAgdmFyIG1heFNjcm9sbCAgICA9IHRoaXMub3B0aW9ucy5vZmZzZXQgKyBzY3JvbGxIZWlnaHQgLSB0aGlzLiRzY3JvbGxFbGVtZW50LmhlaWdodCgpXG4gICAgdmFyIG9mZnNldHMgICAgICA9IHRoaXMub2Zmc2V0c1xuICAgIHZhciB0YXJnZXRzICAgICAgPSB0aGlzLnRhcmdldHNcbiAgICB2YXIgYWN0aXZlVGFyZ2V0ID0gdGhpcy5hY3RpdmVUYXJnZXRcbiAgICB2YXIgaVxuXG4gICAgaWYgKHRoaXMuc2Nyb2xsSGVpZ2h0ICE9IHNjcm9sbEhlaWdodCkge1xuICAgICAgdGhpcy5yZWZyZXNoKClcbiAgICB9XG5cbiAgICBpZiAoc2Nyb2xsVG9wID49IG1heFNjcm9sbCkge1xuICAgICAgcmV0dXJuIGFjdGl2ZVRhcmdldCAhPSAoaSA9IHRhcmdldHNbdGFyZ2V0cy5sZW5ndGggLSAxXSkgJiYgdGhpcy5hY3RpdmF0ZShpKVxuICAgIH1cblxuICAgIGlmIChhY3RpdmVUYXJnZXQgJiYgc2Nyb2xsVG9wIDwgb2Zmc2V0c1swXSkge1xuICAgICAgdGhpcy5hY3RpdmVUYXJnZXQgPSBudWxsXG4gICAgICByZXR1cm4gdGhpcy5jbGVhcigpXG4gICAgfVxuXG4gICAgZm9yIChpID0gb2Zmc2V0cy5sZW5ndGg7IGktLTspIHtcbiAgICAgIGFjdGl2ZVRhcmdldCAhPSB0YXJnZXRzW2ldXG4gICAgICAgICYmIHNjcm9sbFRvcCA+PSBvZmZzZXRzW2ldXG4gICAgICAgICYmIChvZmZzZXRzW2kgKyAxXSA9PT0gdW5kZWZpbmVkIHx8IHNjcm9sbFRvcCA8IG9mZnNldHNbaSArIDFdKVxuICAgICAgICAmJiB0aGlzLmFjdGl2YXRlKHRhcmdldHNbaV0pXG4gICAgfVxuICB9XG5cbiAgU2Nyb2xsU3B5LnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICB0aGlzLmFjdGl2ZVRhcmdldCA9IHRhcmdldFxuXG4gICAgdGhpcy5jbGVhcigpXG5cbiAgICB2YXIgc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yICtcbiAgICAgICdbZGF0YS10YXJnZXQ9XCInICsgdGFyZ2V0ICsgJ1wiXSwnICtcbiAgICAgIHRoaXMuc2VsZWN0b3IgKyAnW2hyZWY9XCInICsgdGFyZ2V0ICsgJ1wiXSdcblxuICAgIHZhciBhY3RpdmUgPSAkKHNlbGVjdG9yKVxuICAgICAgLnBhcmVudHMoJ2xpJylcbiAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcblxuICAgIGlmIChhY3RpdmUucGFyZW50KCcuZHJvcGRvd24tbWVudScpLmxlbmd0aCkge1xuICAgICAgYWN0aXZlID0gYWN0aXZlXG4gICAgICAgIC5jbG9zZXN0KCdsaS5kcm9wZG93bicpXG4gICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICB9XG5cbiAgICBhY3RpdmUudHJpZ2dlcignYWN0aXZhdGUuYnMuc2Nyb2xsc3B5JylcbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzLnNlbGVjdG9yKVxuICAgICAgLnBhcmVudHNVbnRpbCh0aGlzLm9wdGlvbnMudGFyZ2V0LCAnLmFjdGl2ZScpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gIH1cblxuXG4gIC8vIFNDUk9MTFNQWSBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuc2Nyb2xsc3B5JylcbiAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb25cblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5zY3JvbGxzcHknLCAoZGF0YSA9IG5ldyBTY3JvbGxTcHkodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLnNjcm9sbHNweVxuXG4gICQuZm4uc2Nyb2xsc3B5ICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4uc2Nyb2xsc3B5LkNvbnN0cnVjdG9yID0gU2Nyb2xsU3B5XG5cblxuICAvLyBTQ1JPTExTUFkgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5zY3JvbGxzcHkubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLnNjcm9sbHNweSA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIFNDUk9MTFNQWSBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PT09PT1cblxuICAkKHdpbmRvdykub24oJ2xvYWQuYnMuc2Nyb2xsc3B5LmRhdGEtYXBpJywgZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLXNweT1cInNjcm9sbFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRzcHkgPSAkKHRoaXMpXG4gICAgICBQbHVnaW4uY2FsbCgkc3B5LCAkc3B5LmRhdGEoKSlcbiAgICB9KVxuICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiB0YWIuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyN0YWJzXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gVEFCIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgVGFiID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAvLyBqc2NzOmRpc2FibGUgcmVxdWlyZURvbGxhckJlZm9yZWpRdWVyeUFzc2lnbm1lbnRcbiAgICB0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpXG4gICAgLy8ganNjczplbmFibGUgcmVxdWlyZURvbGxhckJlZm9yZWpRdWVyeUFzc2lnbm1lbnRcbiAgfVxuXG4gIFRhYi5WRVJTSU9OID0gJzMuMy43J1xuXG4gIFRhYi5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgVGFiLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkdGhpcyAgICA9IHRoaXMuZWxlbWVudFxuICAgIHZhciAkdWwgICAgICA9ICR0aGlzLmNsb3Nlc3QoJ3VsOm5vdCguZHJvcGRvd24tbWVudSknKVxuICAgIHZhciBzZWxlY3RvciA9ICR0aGlzLmRhdGEoJ3RhcmdldCcpXG5cbiAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICBzZWxlY3RvciA9ICR0aGlzLmF0dHIoJ2hyZWYnKVxuICAgICAgc2VsZWN0b3IgPSBzZWxlY3RvciAmJiBzZWxlY3Rvci5yZXBsYWNlKC8uKig/PSNbXlxcc10qJCkvLCAnJykgLy8gc3RyaXAgZm9yIGllN1xuICAgIH1cblxuICAgIGlmICgkdGhpcy5wYXJlbnQoJ2xpJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSByZXR1cm5cblxuICAgIHZhciAkcHJldmlvdXMgPSAkdWwuZmluZCgnLmFjdGl2ZTpsYXN0IGEnKVxuICAgIHZhciBoaWRlRXZlbnQgPSAkLkV2ZW50KCdoaWRlLmJzLnRhYicsIHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6ICR0aGlzWzBdXG4gICAgfSlcbiAgICB2YXIgc2hvd0V2ZW50ID0gJC5FdmVudCgnc2hvdy5icy50YWInLCB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiAkcHJldmlvdXNbMF1cbiAgICB9KVxuXG4gICAgJHByZXZpb3VzLnRyaWdnZXIoaGlkZUV2ZW50KVxuICAgICR0aGlzLnRyaWdnZXIoc2hvd0V2ZW50KVxuXG4gICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSB8fCBoaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdmFyICR0YXJnZXQgPSAkKHNlbGVjdG9yKVxuXG4gICAgdGhpcy5hY3RpdmF0ZSgkdGhpcy5jbG9zZXN0KCdsaScpLCAkdWwpXG4gICAgdGhpcy5hY3RpdmF0ZSgkdGFyZ2V0LCAkdGFyZ2V0LnBhcmVudCgpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkcHJldmlvdXMudHJpZ2dlcih7XG4gICAgICAgIHR5cGU6ICdoaWRkZW4uYnMudGFiJyxcbiAgICAgICAgcmVsYXRlZFRhcmdldDogJHRoaXNbMF1cbiAgICAgIH0pXG4gICAgICAkdGhpcy50cmlnZ2VyKHtcbiAgICAgICAgdHlwZTogJ3Nob3duLmJzLnRhYicsXG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6ICRwcmV2aW91c1swXVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgVGFiLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBjb250YWluZXIsIGNhbGxiYWNrKSB7XG4gICAgdmFyICRhY3RpdmUgICAgPSBjb250YWluZXIuZmluZCgnPiAuYWN0aXZlJylcbiAgICB2YXIgdHJhbnNpdGlvbiA9IGNhbGxiYWNrXG4gICAgICAmJiAkLnN1cHBvcnQudHJhbnNpdGlvblxuICAgICAgJiYgKCRhY3RpdmUubGVuZ3RoICYmICRhY3RpdmUuaGFzQ2xhc3MoJ2ZhZGUnKSB8fCAhIWNvbnRhaW5lci5maW5kKCc+IC5mYWRlJykubGVuZ3RoKVxuXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICRhY3RpdmVcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAuZmluZCgnPiAuZHJvcGRvd24tbWVudSA+IC5hY3RpdmUnKVxuICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgLmVuZCgpXG4gICAgICAgIC5maW5kKCdbZGF0YS10b2dnbGU9XCJ0YWJcIl0nKVxuICAgICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpXG5cbiAgICAgIGVsZW1lbnRcbiAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAuZmluZCgnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJylcbiAgICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIHRydWUpXG5cbiAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgIGVsZW1lbnRbMF0ub2Zmc2V0V2lkdGggLy8gcmVmbG93IGZvciB0cmFuc2l0aW9uXG4gICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2luJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2ZhZGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoZWxlbWVudC5wYXJlbnQoJy5kcm9wZG93bi1tZW51JykubGVuZ3RoKSB7XG4gICAgICAgIGVsZW1lbnRcbiAgICAgICAgICAuY2xvc2VzdCgnbGkuZHJvcGRvd24nKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgIC5maW5kKCdbZGF0YS10b2dnbGU9XCJ0YWJcIl0nKVxuICAgICAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgfVxuXG4gICAgJGFjdGl2ZS5sZW5ndGggJiYgdHJhbnNpdGlvbiA/XG4gICAgICAkYWN0aXZlXG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIG5leHQpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChUYWIuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgbmV4dCgpXG5cbiAgICAkYWN0aXZlLnJlbW92ZUNsYXNzKCdpbicpXG4gIH1cblxuXG4gIC8vIFRBQiBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgPSAkdGhpcy5kYXRhKCdicy50YWInKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLnRhYicsIChkYXRhID0gbmV3IFRhYih0aGlzKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4udGFiXG5cbiAgJC5mbi50YWIgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi50YWIuQ29uc3RydWN0b3IgPSBUYWJcblxuXG4gIC8vIFRBQiBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT1cblxuICAkLmZuLnRhYi5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4udGFiID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gVEFCIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PVxuXG4gIHZhciBjbGlja0hhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIFBsdWdpbi5jYWxsKCQodGhpcyksICdzaG93JylcbiAgfVxuXG4gICQoZG9jdW1lbnQpXG4gICAgLm9uKCdjbGljay5icy50YWIuZGF0YS1hcGknLCAnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJywgY2xpY2tIYW5kbGVyKVxuICAgIC5vbignY2xpY2suYnMudGFiLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cInBpbGxcIl0nLCBjbGlja0hhbmRsZXIpXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IGFmZml4LmpzIHYzLjMuN1xuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jYWZmaXhcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNiBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBBRkZJWCBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgQWZmaXggPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBBZmZpeC5ERUZBVUxUUywgb3B0aW9ucylcblxuICAgIHRoaXMuJHRhcmdldCA9ICQodGhpcy5vcHRpb25zLnRhcmdldClcbiAgICAgIC5vbignc2Nyb2xsLmJzLmFmZml4LmRhdGEtYXBpJywgJC5wcm94eSh0aGlzLmNoZWNrUG9zaXRpb24sIHRoaXMpKVxuICAgICAgLm9uKCdjbGljay5icy5hZmZpeC5kYXRhLWFwaScsICAkLnByb3h5KHRoaXMuY2hlY2tQb3NpdGlvbldpdGhFdmVudExvb3AsIHRoaXMpKVxuXG4gICAgdGhpcy4kZWxlbWVudCAgICAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy5hZmZpeGVkICAgICAgPSBudWxsXG4gICAgdGhpcy51bnBpbiAgICAgICAgPSBudWxsXG4gICAgdGhpcy5waW5uZWRPZmZzZXQgPSBudWxsXG5cbiAgICB0aGlzLmNoZWNrUG9zaXRpb24oKVxuICB9XG5cbiAgQWZmaXguVkVSU0lPTiAgPSAnMy4zLjcnXG5cbiAgQWZmaXguUkVTRVQgICAgPSAnYWZmaXggYWZmaXgtdG9wIGFmZml4LWJvdHRvbSdcblxuICBBZmZpeC5ERUZBVUxUUyA9IHtcbiAgICBvZmZzZXQ6IDAsXG4gICAgdGFyZ2V0OiB3aW5kb3dcbiAgfVxuXG4gIEFmZml4LnByb3RvdHlwZS5nZXRTdGF0ZSA9IGZ1bmN0aW9uIChzY3JvbGxIZWlnaHQsIGhlaWdodCwgb2Zmc2V0VG9wLCBvZmZzZXRCb3R0b20pIHtcbiAgICB2YXIgc2Nyb2xsVG9wICAgID0gdGhpcy4kdGFyZ2V0LnNjcm9sbFRvcCgpXG4gICAgdmFyIHBvc2l0aW9uICAgICA9IHRoaXMuJGVsZW1lbnQub2Zmc2V0KClcbiAgICB2YXIgdGFyZ2V0SGVpZ2h0ID0gdGhpcy4kdGFyZ2V0LmhlaWdodCgpXG5cbiAgICBpZiAob2Zmc2V0VG9wICE9IG51bGwgJiYgdGhpcy5hZmZpeGVkID09ICd0b3AnKSByZXR1cm4gc2Nyb2xsVG9wIDwgb2Zmc2V0VG9wID8gJ3RvcCcgOiBmYWxzZVxuXG4gICAgaWYgKHRoaXMuYWZmaXhlZCA9PSAnYm90dG9tJykge1xuICAgICAgaWYgKG9mZnNldFRvcCAhPSBudWxsKSByZXR1cm4gKHNjcm9sbFRvcCArIHRoaXMudW5waW4gPD0gcG9zaXRpb24udG9wKSA/IGZhbHNlIDogJ2JvdHRvbSdcbiAgICAgIHJldHVybiAoc2Nyb2xsVG9wICsgdGFyZ2V0SGVpZ2h0IDw9IHNjcm9sbEhlaWdodCAtIG9mZnNldEJvdHRvbSkgPyBmYWxzZSA6ICdib3R0b20nXG4gICAgfVxuXG4gICAgdmFyIGluaXRpYWxpemluZyAgID0gdGhpcy5hZmZpeGVkID09IG51bGxcbiAgICB2YXIgY29sbGlkZXJUb3AgICAgPSBpbml0aWFsaXppbmcgPyBzY3JvbGxUb3AgOiBwb3NpdGlvbi50b3BcbiAgICB2YXIgY29sbGlkZXJIZWlnaHQgPSBpbml0aWFsaXppbmcgPyB0YXJnZXRIZWlnaHQgOiBoZWlnaHRcblxuICAgIGlmIChvZmZzZXRUb3AgIT0gbnVsbCAmJiBzY3JvbGxUb3AgPD0gb2Zmc2V0VG9wKSByZXR1cm4gJ3RvcCdcbiAgICBpZiAob2Zmc2V0Qm90dG9tICE9IG51bGwgJiYgKGNvbGxpZGVyVG9wICsgY29sbGlkZXJIZWlnaHQgPj0gc2Nyb2xsSGVpZ2h0IC0gb2Zmc2V0Qm90dG9tKSkgcmV0dXJuICdib3R0b20nXG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIEFmZml4LnByb3RvdHlwZS5nZXRQaW5uZWRPZmZzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMucGlubmVkT2Zmc2V0KSByZXR1cm4gdGhpcy5waW5uZWRPZmZzZXRcbiAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKEFmZml4LlJFU0VUKS5hZGRDbGFzcygnYWZmaXgnKVxuICAgIHZhciBzY3JvbGxUb3AgPSB0aGlzLiR0YXJnZXQuc2Nyb2xsVG9wKClcbiAgICB2YXIgcG9zaXRpb24gID0gdGhpcy4kZWxlbWVudC5vZmZzZXQoKVxuICAgIHJldHVybiAodGhpcy5waW5uZWRPZmZzZXQgPSBwb3NpdGlvbi50b3AgLSBzY3JvbGxUb3ApXG4gIH1cblxuICBBZmZpeC5wcm90b3R5cGUuY2hlY2tQb3NpdGlvbldpdGhFdmVudExvb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2V0VGltZW91dCgkLnByb3h5KHRoaXMuY2hlY2tQb3NpdGlvbiwgdGhpcyksIDEpXG4gIH1cblxuICBBZmZpeC5wcm90b3R5cGUuY2hlY2tQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuJGVsZW1lbnQuaXMoJzp2aXNpYmxlJykpIHJldHVyblxuXG4gICAgdmFyIGhlaWdodCAgICAgICA9IHRoaXMuJGVsZW1lbnQuaGVpZ2h0KClcbiAgICB2YXIgb2Zmc2V0ICAgICAgID0gdGhpcy5vcHRpb25zLm9mZnNldFxuICAgIHZhciBvZmZzZXRUb3AgICAgPSBvZmZzZXQudG9wXG4gICAgdmFyIG9mZnNldEJvdHRvbSA9IG9mZnNldC5ib3R0b21cbiAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gTWF0aC5tYXgoJChkb2N1bWVudCkuaGVpZ2h0KCksICQoZG9jdW1lbnQuYm9keSkuaGVpZ2h0KCkpXG5cbiAgICBpZiAodHlwZW9mIG9mZnNldCAhPSAnb2JqZWN0JykgICAgICAgICBvZmZzZXRCb3R0b20gPSBvZmZzZXRUb3AgPSBvZmZzZXRcbiAgICBpZiAodHlwZW9mIG9mZnNldFRvcCA9PSAnZnVuY3Rpb24nKSAgICBvZmZzZXRUb3AgICAgPSBvZmZzZXQudG9wKHRoaXMuJGVsZW1lbnQpXG4gICAgaWYgKHR5cGVvZiBvZmZzZXRCb3R0b20gPT0gJ2Z1bmN0aW9uJykgb2Zmc2V0Qm90dG9tID0gb2Zmc2V0LmJvdHRvbSh0aGlzLiRlbGVtZW50KVxuXG4gICAgdmFyIGFmZml4ID0gdGhpcy5nZXRTdGF0ZShzY3JvbGxIZWlnaHQsIGhlaWdodCwgb2Zmc2V0VG9wLCBvZmZzZXRCb3R0b20pXG5cbiAgICBpZiAodGhpcy5hZmZpeGVkICE9IGFmZml4KSB7XG4gICAgICBpZiAodGhpcy51bnBpbiAhPSBudWxsKSB0aGlzLiRlbGVtZW50LmNzcygndG9wJywgJycpXG5cbiAgICAgIHZhciBhZmZpeFR5cGUgPSAnYWZmaXgnICsgKGFmZml4ID8gJy0nICsgYWZmaXggOiAnJylcbiAgICAgIHZhciBlICAgICAgICAgPSAkLkV2ZW50KGFmZml4VHlwZSArICcuYnMuYWZmaXgnKVxuXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgICB0aGlzLmFmZml4ZWQgPSBhZmZpeFxuICAgICAgdGhpcy51bnBpbiA9IGFmZml4ID09ICdib3R0b20nID8gdGhpcy5nZXRQaW5uZWRPZmZzZXQoKSA6IG51bGxcblxuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAucmVtb3ZlQ2xhc3MoQWZmaXguUkVTRVQpXG4gICAgICAgIC5hZGRDbGFzcyhhZmZpeFR5cGUpXG4gICAgICAgIC50cmlnZ2VyKGFmZml4VHlwZS5yZXBsYWNlKCdhZmZpeCcsICdhZmZpeGVkJykgKyAnLmJzLmFmZml4JylcbiAgICB9XG5cbiAgICBpZiAoYWZmaXggPT0gJ2JvdHRvbScpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2Zmc2V0KHtcbiAgICAgICAgdG9wOiBzY3JvbGxIZWlnaHQgLSBoZWlnaHQgLSBvZmZzZXRCb3R0b21cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cblxuICAvLyBBRkZJWCBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5hZmZpeCcpXG4gICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuYWZmaXgnLCAoZGF0YSA9IG5ldyBBZmZpeCh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4uYWZmaXhcblxuICAkLmZuLmFmZml4ICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4uYWZmaXguQ29uc3RydWN0b3IgPSBBZmZpeFxuXG5cbiAgLy8gQUZGSVggTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT1cblxuICAkLmZuLmFmZml4Lm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5hZmZpeCA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIEFGRklYIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09XG5cbiAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLXNweT1cImFmZml4XCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHNweSA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhID0gJHNweS5kYXRhKClcblxuICAgICAgZGF0YS5vZmZzZXQgPSBkYXRhLm9mZnNldCB8fCB7fVxuXG4gICAgICBpZiAoZGF0YS5vZmZzZXRCb3R0b20gIT0gbnVsbCkgZGF0YS5vZmZzZXQuYm90dG9tID0gZGF0YS5vZmZzZXRCb3R0b21cbiAgICAgIGlmIChkYXRhLm9mZnNldFRvcCAgICAhPSBudWxsKSBkYXRhLm9mZnNldC50b3AgICAgPSBkYXRhLm9mZnNldFRvcFxuXG4gICAgICBQbHVnaW4uY2FsbCgkc3B5LCBkYXRhKVxuICAgIH0pXG4gIH0pXG5cbn0oalF1ZXJ5KTtcbiIsIi8vIFN0aWNreSBQbHVnaW4gdjEuMC40IGZvciBqUXVlcnlcbi8vID09PT09PT09PT09PT1cbi8vIEF1dGhvcjogQW50aG9ueSBHYXJhbmRcbi8vIEltcHJvdmVtZW50cyBieSBHZXJtYW4gTS4gQnJhdm8gKEtyb251eikgYW5kIFJ1dWQgS2FtcGh1aXMgKHJ1dWRrKVxuLy8gSW1wcm92ZW1lbnRzIGJ5IExlb25hcmRvIEMuIERhcm9uY28gKGRhcm9uY28pXG4vLyBDcmVhdGVkOiAwMi8xNC8yMDExXG4vLyBEYXRlOiAwNy8yMC8yMDE1XG4vLyBXZWJzaXRlOiBodHRwOi8vc3RpY2t5anMuY29tL1xuLy8gRGVzY3JpcHRpb246IE1ha2VzIGFuIGVsZW1lbnQgb24gdGhlIHBhZ2Ugc3RpY2sgb24gdGhlIHNjcmVlbiBhcyB5b3Ugc2Nyb2xsXG4vLyAgICAgICAgICAgICAgSXQgd2lsbCBvbmx5IHNldCB0aGUgJ3RvcCcgYW5kICdwb3NpdGlvbicgb2YgeW91ciBlbGVtZW50LCB5b3Vcbi8vICAgICAgICAgICAgICBtaWdodCBuZWVkIHRvIGFkanVzdCB0aGUgd2lkdGggaW4gc29tZSBjYXNlcy5cblxuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIC8vIE5vZGUvQ29tbW9uSlNcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICAgICAgZmFjdG9yeShqUXVlcnkpO1xuICAgIH1cbn0oZnVuY3Rpb24gKCQpIHtcbiAgICB2YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7IC8vIHNhdmUgcmVmIHRvIG9yaWdpbmFsIHNsaWNlKClcbiAgICB2YXIgc3BsaWNlID0gQXJyYXkucHJvdG90eXBlLnNwbGljZTsgLy8gc2F2ZSByZWYgdG8gb3JpZ2luYWwgc2xpY2UoKVxuXG4gIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgIHRvcFNwYWNpbmc6IDAsXG4gICAgICBib3R0b21TcGFjaW5nOiAwLFxuICAgICAgY2xhc3NOYW1lOiAnaXMtc3RpY2t5JyxcbiAgICAgIHdyYXBwZXJDbGFzc05hbWU6ICdzdGlja3ktd3JhcHBlcicsXG4gICAgICBjZW50ZXI6IGZhbHNlLFxuICAgICAgZ2V0V2lkdGhGcm9tOiAnJyxcbiAgICAgIHdpZHRoRnJvbVdyYXBwZXI6IHRydWUsIC8vIHdvcmtzIG9ubHkgd2hlbiAuZ2V0V2lkdGhGcm9tIGlzIGVtcHR5XG4gICAgICByZXNwb25zaXZlV2lkdGg6IGZhbHNlLFxuICAgICAgekluZGV4OiAnYXV0bydcbiAgICB9LFxuICAgICR3aW5kb3cgPSAkKHdpbmRvdyksXG4gICAgJGRvY3VtZW50ID0gJChkb2N1bWVudCksXG4gICAgc3RpY2tlZCA9IFtdLFxuICAgIHdpbmRvd0hlaWdodCA9ICR3aW5kb3cuaGVpZ2h0KCksXG4gICAgc2Nyb2xsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSAkd2luZG93LnNjcm9sbFRvcCgpLFxuICAgICAgICBkb2N1bWVudEhlaWdodCA9ICRkb2N1bWVudC5oZWlnaHQoKSxcbiAgICAgICAgZHdoID0gZG9jdW1lbnRIZWlnaHQgLSB3aW5kb3dIZWlnaHQsXG4gICAgICAgIGV4dHJhID0gKHNjcm9sbFRvcCA+IGR3aCkgPyBkd2ggLSBzY3JvbGxUb3AgOiAwO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHN0aWNrZWQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBzID0gc3RpY2tlZFtpXSxcbiAgICAgICAgICBlbGVtZW50VG9wID0gcy5zdGlja3lXcmFwcGVyLm9mZnNldCgpLnRvcCxcbiAgICAgICAgICBldHNlID0gZWxlbWVudFRvcCAtIHMudG9wU3BhY2luZyAtIGV4dHJhO1xuXG4gICAgICAgIC8vdXBkYXRlIGhlaWdodCBpbiBjYXNlIG9mIGR5bmFtaWMgY29udGVudFxuICAgICAgICBzLnN0aWNreVdyYXBwZXIuY3NzKCdoZWlnaHQnLCBzLnN0aWNreUVsZW1lbnQub3V0ZXJIZWlnaHQoKSk7XG5cbiAgICAgICAgaWYgKHNjcm9sbFRvcCA8PSBldHNlKSB7XG4gICAgICAgICAgaWYgKHMuY3VycmVudFRvcCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcy5zdGlja3lFbGVtZW50XG4gICAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgICd3aWR0aCc6ICcnLFxuICAgICAgICAgICAgICAgICdwb3NpdGlvbic6ICcnLFxuICAgICAgICAgICAgICAgICd0b3AnOiAnJyxcbiAgICAgICAgICAgICAgICAnei1pbmRleCc6ICcnXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcy5zdGlja3lFbGVtZW50LnBhcmVudCgpLnJlbW92ZUNsYXNzKHMuY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIHMuc3RpY2t5RWxlbWVudC50cmlnZ2VyKCdzdGlja3ktZW5kJywgW3NdKTtcbiAgICAgICAgICAgIHMuY3VycmVudFRvcCA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhciBuZXdUb3AgPSBkb2N1bWVudEhlaWdodCAtIHMuc3RpY2t5RWxlbWVudC5vdXRlckhlaWdodCgpXG4gICAgICAgICAgICAtIHMudG9wU3BhY2luZyAtIHMuYm90dG9tU3BhY2luZyAtIHNjcm9sbFRvcCAtIGV4dHJhO1xuICAgICAgICAgIGlmIChuZXdUb3AgPCAwKSB7XG4gICAgICAgICAgICBuZXdUb3AgPSBuZXdUb3AgKyBzLnRvcFNwYWNpbmc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1RvcCA9IHMudG9wU3BhY2luZztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHMuY3VycmVudFRvcCAhPT0gbmV3VG9wKSB7XG4gICAgICAgICAgICB2YXIgbmV3V2lkdGg7XG4gICAgICAgICAgICBpZiAocy5nZXRXaWR0aEZyb20pIHtcbiAgICAgICAgICAgICAgICBuZXdXaWR0aCA9ICQocy5nZXRXaWR0aEZyb20pLndpZHRoKCkgfHwgbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocy53aWR0aEZyb21XcmFwcGVyKSB7XG4gICAgICAgICAgICAgICAgbmV3V2lkdGggPSBzLnN0aWNreVdyYXBwZXIud2lkdGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXdXaWR0aCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmV3V2lkdGggPSBzLnN0aWNreUVsZW1lbnQud2lkdGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMuc3RpY2t5RWxlbWVudFxuICAgICAgICAgICAgICAuY3NzKCd3aWR0aCcsIG5ld1dpZHRoKVxuICAgICAgICAgICAgICAuY3NzKCdwb3NpdGlvbicsICdmaXhlZCcpXG4gICAgICAgICAgICAgIC5jc3MoJ3RvcCcsIG5ld1RvcClcbiAgICAgICAgICAgICAgLmNzcygnei1pbmRleCcsIHMuekluZGV4KTtcblxuICAgICAgICAgICAgcy5zdGlja3lFbGVtZW50LnBhcmVudCgpLmFkZENsYXNzKHMuY2xhc3NOYW1lKTtcblxuICAgICAgICAgICAgaWYgKHMuY3VycmVudFRvcCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICBzLnN0aWNreUVsZW1lbnQudHJpZ2dlcignc3RpY2t5LXN0YXJ0JywgW3NdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIHN0aWNreSBpcyBzdGFydGVkIGJ1dCBpdCBoYXZlIHRvIGJlIHJlcG9zaXRpb25lZFxuICAgICAgICAgICAgICBzLnN0aWNreUVsZW1lbnQudHJpZ2dlcignc3RpY2t5LXVwZGF0ZScsIFtzXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzLmN1cnJlbnRUb3AgPT09IHMudG9wU3BhY2luZyAmJiBzLmN1cnJlbnRUb3AgPiBuZXdUb3AgfHwgcy5jdXJyZW50VG9wID09PSBudWxsICYmIG5ld1RvcCA8IHMudG9wU3BhY2luZykge1xuICAgICAgICAgICAgICAvLyBqdXN0IHJlYWNoZWQgYm90dG9tIHx8IGp1c3Qgc3RhcnRlZCB0byBzdGljayBidXQgYm90dG9tIGlzIGFscmVhZHkgcmVhY2hlZFxuICAgICAgICAgICAgICBzLnN0aWNreUVsZW1lbnQudHJpZ2dlcignc3RpY2t5LWJvdHRvbS1yZWFjaGVkJywgW3NdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihzLmN1cnJlbnRUb3AgIT09IG51bGwgJiYgbmV3VG9wID09PSBzLnRvcFNwYWNpbmcgJiYgcy5jdXJyZW50VG9wIDwgbmV3VG9wKSB7XG4gICAgICAgICAgICAgIC8vIHN0aWNreSBpcyBzdGFydGVkICYmIHN0aWNrZWQgYXQgdG9wU3BhY2luZyAmJiBvdmVyZmxvd2luZyBmcm9tIHRvcCBqdXN0IGZpbmlzaGVkXG4gICAgICAgICAgICAgIHMuc3RpY2t5RWxlbWVudC50cmlnZ2VyKCdzdGlja3ktYm90dG9tLXVucmVhY2hlZCcsIFtzXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHMuY3VycmVudFRvcCA9IG5ld1RvcDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBDaGVjayBpZiBzdGlja3kgaGFzIHJlYWNoZWQgZW5kIG9mIGNvbnRhaW5lciBhbmQgc3RvcCBzdGlja2luZ1xuICAgICAgICAgIHZhciBzdGlja3lXcmFwcGVyQ29udGFpbmVyID0gcy5zdGlja3lXcmFwcGVyLnBhcmVudCgpO1xuICAgICAgICAgIHZhciB1bnN0aWNrID0gKHMuc3RpY2t5RWxlbWVudC5vZmZzZXQoKS50b3AgKyBzLnN0aWNreUVsZW1lbnQub3V0ZXJIZWlnaHQoKSA+PSBzdGlja3lXcmFwcGVyQ29udGFpbmVyLm9mZnNldCgpLnRvcCArIHN0aWNreVdyYXBwZXJDb250YWluZXIub3V0ZXJIZWlnaHQoKSkgJiYgKHMuc3RpY2t5RWxlbWVudC5vZmZzZXQoKS50b3AgPD0gcy50b3BTcGFjaW5nKTtcblxuICAgICAgICAgIGlmKCB1bnN0aWNrICkge1xuICAgICAgICAgICAgcy5zdGlja3lFbGVtZW50XG4gICAgICAgICAgICAgIC5jc3MoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJylcbiAgICAgICAgICAgICAgLmNzcygndG9wJywgJycpXG4gICAgICAgICAgICAgIC5jc3MoJ2JvdHRvbScsIDApXG4gICAgICAgICAgICAgIC5jc3MoJ3otaW5kZXgnLCAnJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHMuc3RpY2t5RWxlbWVudFxuICAgICAgICAgICAgICAuY3NzKCdwb3NpdGlvbicsICdmaXhlZCcpXG4gICAgICAgICAgICAgIC5jc3MoJ3RvcCcsIG5ld1RvcClcbiAgICAgICAgICAgICAgLmNzcygnYm90dG9tJywgJycpXG4gICAgICAgICAgICAgIC5jc3MoJ3otaW5kZXgnLCBzLnpJbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICByZXNpemVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB3aW5kb3dIZWlnaHQgPSAkd2luZG93LmhlaWdodCgpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHN0aWNrZWQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBzID0gc3RpY2tlZFtpXTtcbiAgICAgICAgdmFyIG5ld1dpZHRoID0gbnVsbDtcbiAgICAgICAgaWYgKHMuZ2V0V2lkdGhGcm9tKSB7XG4gICAgICAgICAgICBpZiAocy5yZXNwb25zaXZlV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBuZXdXaWR0aCA9ICQocy5nZXRXaWR0aEZyb20pLndpZHRoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZihzLndpZHRoRnJvbVdyYXBwZXIpIHtcbiAgICAgICAgICAgIG5ld1dpZHRoID0gcy5zdGlja3lXcmFwcGVyLndpZHRoKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld1dpZHRoICE9IG51bGwpIHtcbiAgICAgICAgICAgIHMuc3RpY2t5RWxlbWVudC5jc3MoJ3dpZHRoJywgbmV3V2lkdGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzID0ge1xuICAgICAgaW5pdDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB2YXIgbyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHN0aWNreUVsZW1lbnQgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgdmFyIHN0aWNreUlkID0gc3RpY2t5RWxlbWVudC5hdHRyKCdpZCcpO1xuICAgICAgICAgIHZhciB3cmFwcGVySWQgPSBzdGlja3lJZCA/IHN0aWNreUlkICsgJy0nICsgZGVmYXVsdHMud3JhcHBlckNsYXNzTmFtZSA6IGRlZmF1bHRzLndyYXBwZXJDbGFzc05hbWU7XG4gICAgICAgICAgdmFyIHdyYXBwZXIgPSAkKCc8ZGl2PjwvZGl2PicpXG4gICAgICAgICAgICAuYXR0cignaWQnLCB3cmFwcGVySWQpXG4gICAgICAgICAgICAuYWRkQ2xhc3Moby53cmFwcGVyQ2xhc3NOYW1lKTtcblxuICAgICAgICAgIHN0aWNreUVsZW1lbnQud3JhcEFsbCh3cmFwcGVyKTtcblxuICAgICAgICAgIHZhciBzdGlja3lXcmFwcGVyID0gc3RpY2t5RWxlbWVudC5wYXJlbnQoKTtcblxuICAgICAgICAgIGlmIChvLmNlbnRlcikge1xuICAgICAgICAgICAgc3RpY2t5V3JhcHBlci5jc3Moe3dpZHRoOnN0aWNreUVsZW1lbnQub3V0ZXJXaWR0aCgpLG1hcmdpbkxlZnQ6XCJhdXRvXCIsbWFyZ2luUmlnaHQ6XCJhdXRvXCJ9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3RpY2t5RWxlbWVudC5jc3MoXCJmbG9hdFwiKSA9PT0gXCJyaWdodFwiKSB7XG4gICAgICAgICAgICBzdGlja3lFbGVtZW50LmNzcyh7XCJmbG9hdFwiOlwibm9uZVwifSkucGFyZW50KCkuY3NzKHtcImZsb2F0XCI6XCJyaWdodFwifSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgby5zdGlja3lFbGVtZW50ID0gc3RpY2t5RWxlbWVudDtcbiAgICAgICAgICBvLnN0aWNreVdyYXBwZXIgPSBzdGlja3lXcmFwcGVyO1xuICAgICAgICAgIG8uY3VycmVudFRvcCAgICA9IG51bGw7XG5cbiAgICAgICAgICBzdGlja2VkLnB1c2gobyk7XG5cbiAgICAgICAgICBtZXRob2RzLnNldFdyYXBwZXJIZWlnaHQodGhpcyk7XG4gICAgICAgICAgbWV0aG9kcy5zZXR1cENoYW5nZUxpc3RlbmVycyh0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuXG4gICAgICBzZXRXcmFwcGVySGVpZ2h0OiBmdW5jdGlvbihzdGlja3lFbGVtZW50KSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gJChzdGlja3lFbGVtZW50KTtcbiAgICAgICAgdmFyIHN0aWNreVdyYXBwZXIgPSBlbGVtZW50LnBhcmVudCgpO1xuICAgICAgICBpZiAoc3RpY2t5V3JhcHBlcikge1xuICAgICAgICAgIHN0aWNreVdyYXBwZXIuY3NzKCdoZWlnaHQnLCBlbGVtZW50Lm91dGVySGVpZ2h0KCkpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBzZXR1cENoYW5nZUxpc3RlbmVyczogZnVuY3Rpb24oc3RpY2t5RWxlbWVudCkge1xuICAgICAgICBpZiAod2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgICAgICB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyB3aW5kb3cuTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChtdXRhdGlvbnNbMF0uYWRkZWROb2Rlcy5sZW5ndGggfHwgbXV0YXRpb25zWzBdLnJlbW92ZWROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgbWV0aG9kcy5zZXRXcmFwcGVySGVpZ2h0KHN0aWNreUVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShzdGlja3lFbGVtZW50LCB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RpY2t5RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Ob2RlSW5zZXJ0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1ldGhvZHMuc2V0V3JhcHBlckhlaWdodChzdGlja3lFbGVtZW50KTtcbiAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgICAgc3RpY2t5RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Ob2RlUmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbWV0aG9kcy5zZXRXcmFwcGVySGVpZ2h0KHN0aWNreUVsZW1lbnQpO1xuICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVwZGF0ZTogc2Nyb2xsZXIsXG4gICAgICB1bnN0aWNrOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgIHZhciB1bnN0aWNreUVsZW1lbnQgPSAkKHRoYXQpO1xuXG4gICAgICAgICAgdmFyIHJlbW92ZUlkeCA9IC0xO1xuICAgICAgICAgIHZhciBpID0gc3RpY2tlZC5sZW5ndGg7XG4gICAgICAgICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgICAgICAgIGlmIChzdGlja2VkW2ldLnN0aWNreUVsZW1lbnQuZ2V0KDApID09PSB0aGF0KSB7XG4gICAgICAgICAgICAgICAgc3BsaWNlLmNhbGwoc3RpY2tlZCxpLDEpO1xuICAgICAgICAgICAgICAgIHJlbW92ZUlkeCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKHJlbW92ZUlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHVuc3RpY2t5RWxlbWVudC51bndyYXAoKTtcbiAgICAgICAgICAgIHVuc3RpY2t5RWxlbWVudFxuICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAnd2lkdGgnOiAnJyxcbiAgICAgICAgICAgICAgICAncG9zaXRpb24nOiAnJyxcbiAgICAgICAgICAgICAgICAndG9wJzogJycsXG4gICAgICAgICAgICAgICAgJ2Zsb2F0JzogJycsXG4gICAgICAgICAgICAgICAgJ3otaW5kZXgnOiAnJ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAvLyBzaG91bGQgYmUgbW9yZSBlZmZpY2llbnQgdGhhbiB1c2luZyAkd2luZG93LnNjcm9sbChzY3JvbGxlcikgYW5kICR3aW5kb3cucmVzaXplKHJlc2l6ZXIpOlxuICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2Nyb2xsZXIsIGZhbHNlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplciwgZmFsc2UpO1xuICB9IGVsc2UgaWYgKHdpbmRvdy5hdHRhY2hFdmVudCkge1xuICAgIHdpbmRvdy5hdHRhY2hFdmVudCgnb25zY3JvbGwnLCBzY3JvbGxlcik7XG4gICAgd2luZG93LmF0dGFjaEV2ZW50KCdvbnJlc2l6ZScsIHJlc2l6ZXIpO1xuICB9XG5cbiAgJC5mbi5zdGlja3kgPSBmdW5jdGlvbihtZXRob2QpIHtcbiAgICBpZiAobWV0aG9kc1ttZXRob2RdKSB7XG4gICAgICByZXR1cm4gbWV0aG9kc1ttZXRob2RdLmFwcGx5KHRoaXMsIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kICkge1xuICAgICAgcmV0dXJuIG1ldGhvZHMuaW5pdC5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQuZXJyb3IoJ01ldGhvZCAnICsgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkuc3RpY2t5Jyk7XG4gICAgfVxuICB9O1xuXG4gICQuZm4udW5zdGljayA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIGlmIChtZXRob2RzW21ldGhvZF0pIHtcbiAgICAgIHJldHVybiBtZXRob2RzW21ldGhvZF0uYXBwbHkodGhpcywgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdvYmplY3QnIHx8ICFtZXRob2QgKSB7XG4gICAgICByZXR1cm4gbWV0aG9kcy51bnN0aWNrLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJC5lcnJvcignTWV0aG9kICcgKyBtZXRob2QgKyAnIGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS5zdGlja3knKTtcbiAgICB9XG4gIH07XG4gICQoZnVuY3Rpb24oKSB7XG4gICAgc2V0VGltZW91dChzY3JvbGxlciwgMCk7XG4gIH0pO1xufSkpO1xuIiwiLyohIHNpZHIgLSB2Mi4yLjEgLSAyMDE2LTAyLTE3XG4gKiBodHRwOi8vd3d3LmJlcnJpYXJ0LmNvbS9zaWRyL1xuICogQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQWxiZXJ0byBWYXJlbGE7IExpY2Vuc2VkIE1JVCAqL1xuXG4oZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGJhYmVsSGVscGVycyA9IHt9O1xuXG4gIGJhYmVsSGVscGVycy5jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgICB9XG4gIH07XG5cbiAgYmFiZWxIZWxwZXJzLmNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gICAgfTtcbiAgfSgpO1xuXG4gIGJhYmVsSGVscGVycztcblxuICB2YXIgc2lkclN0YXR1cyA9IHtcbiAgICBtb3Zpbmc6IGZhbHNlLFxuICAgIG9wZW5lZDogZmFsc2VcbiAgfTtcblxuICB2YXIgaGVscGVyID0ge1xuICAgIC8vIENoZWNrIGZvciB2YWxpZHMgdXJsc1xuICAgIC8vIEZyb20gOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU3MTcwOTMvY2hlY2staWYtYS1qYXZhc2NyaXB0LXN0cmluZy1pcy1hbi11cmxcblxuICAgIGlzVXJsOiBmdW5jdGlvbiBpc1VybChzdHIpIHtcbiAgICAgIHZhciBwYXR0ZXJuID0gbmV3IFJlZ0V4cCgnXihodHRwcz86XFxcXC9cXFxcLyk/JyArIC8vIHByb3RvY29sXG4gICAgICAnKCgoW2EtelxcXFxkXShbYS16XFxcXGQtXSpbYS16XFxcXGRdKSopXFxcXC4/KStbYS16XXsyLH18JyArIC8vIGRvbWFpbiBuYW1lXG4gICAgICAnKChcXFxcZHsxLDN9XFxcXC4pezN9XFxcXGR7MSwzfSkpJyArIC8vIE9SIGlwICh2NCkgYWRkcmVzc1xuICAgICAgJyhcXFxcOlxcXFxkKyk/KFxcXFwvWy1hLXpcXFxcZCVfLn4rXSopKicgKyAvLyBwb3J0IGFuZCBwYXRoXG4gICAgICAnKFxcXFw/WzsmYS16XFxcXGQlXy5+Kz0tXSopPycgKyAvLyBxdWVyeSBzdHJpbmdcbiAgICAgICcoXFxcXCNbLWEtelxcXFxkX10qKT8kJywgJ2knKTsgLy8gZnJhZ21lbnQgbG9jYXRvclxuXG4gICAgICBpZiAocGF0dGVybi50ZXN0KHN0cikpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLy8gQWRkIHNpZHIgcHJlZml4ZXNcbiAgICBhZGRQcmVmaXhlczogZnVuY3Rpb24gYWRkUHJlZml4ZXMoJGVsZW1lbnQpIHtcbiAgICAgIHRoaXMuYWRkUHJlZml4KCRlbGVtZW50LCAnaWQnKTtcbiAgICAgIHRoaXMuYWRkUHJlZml4KCRlbGVtZW50LCAnY2xhc3MnKTtcbiAgICAgICRlbGVtZW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgfSxcbiAgICBhZGRQcmVmaXg6IGZ1bmN0aW9uIGFkZFByZWZpeCgkZWxlbWVudCwgYXR0cmlidXRlKSB7XG4gICAgICB2YXIgdG9SZXBsYWNlID0gJGVsZW1lbnQuYXR0cihhdHRyaWJ1dGUpO1xuXG4gICAgICBpZiAodHlwZW9mIHRvUmVwbGFjZSA9PT0gJ3N0cmluZycgJiYgdG9SZXBsYWNlICE9PSAnJyAmJiB0b1JlcGxhY2UgIT09ICdzaWRyLWlubmVyJykge1xuICAgICAgICAkZWxlbWVudC5hdHRyKGF0dHJpYnV0ZSwgdG9SZXBsYWNlLnJlcGxhY2UoLyhbQS1aYS16MC05Xy5cXC1dKykvZywgJ3NpZHItJyArIGF0dHJpYnV0ZSArICctJDEnKSk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLy8gQ2hlY2sgaWYgdHJhbnNpdGlvbnMgaXMgc3VwcG9ydGVkXG4gICAgdHJhbnNpdGlvbnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgICAgc3R5bGUgPSBib2R5LnN0eWxlLFxuICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlLFxuICAgICAgICAgIHByb3BlcnR5ID0gJ3RyYW5zaXRpb24nO1xuXG4gICAgICBpZiAocHJvcGVydHkgaW4gc3R5bGUpIHtcbiAgICAgICAgc3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIHByZWZpeGVzID0gWydtb3onLCAnd2Via2l0JywgJ28nLCAnbXMnXSxcbiAgICAgICAgICAgICAgcHJlZml4ID0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgICBpID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgcHJvcGVydHkgPSBwcm9wZXJ0eS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3BlcnR5LnN1YnN0cigxKTtcbiAgICAgICAgICBzdXBwb3J0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgcHJlZml4ID0gcHJlZml4ZXNbaV07XG4gICAgICAgICAgICAgIGlmIChwcmVmaXggKyBwcm9wZXJ0eSBpbiBzdHlsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KCk7XG4gICAgICAgICAgcHJvcGVydHkgPSBzdXBwb3J0ZWQgPyAnLScgKyBwcmVmaXgudG9Mb3dlckNhc2UoKSArICctJyArIHByb3BlcnR5LnRvTG93ZXJDYXNlKCkgOiBudWxsO1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdXBwb3J0ZWQ6IHN1cHBvcnRlZCxcbiAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5XG4gICAgICB9O1xuICAgIH0oKVxuICB9O1xuXG4gIHZhciAkJDIgPSBqUXVlcnk7XG5cbiAgdmFyIGJvZHlBbmltYXRpb25DbGFzcyA9ICdzaWRyLWFuaW1hdGluZyc7XG4gIHZhciBvcGVuQWN0aW9uID0gJ29wZW4nO1xuICB2YXIgY2xvc2VBY3Rpb24gPSAnY2xvc2UnO1xuICB2YXIgdHJhbnNpdGlvbkVuZEV2ZW50ID0gJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnO1xuICB2YXIgTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZW51KG5hbWUpIHtcbiAgICAgIGJhYmVsSGVscGVycy5jbGFzc0NhbGxDaGVjayh0aGlzLCBNZW51KTtcblxuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgIHRoaXMuaXRlbSA9ICQkMignIycgKyBuYW1lKTtcbiAgICAgIHRoaXMub3BlbkNsYXNzID0gbmFtZSA9PT0gJ3NpZHInID8gJ3NpZHItb3BlbicgOiAnc2lkci1vcGVuICcgKyBuYW1lICsgJy1vcGVuJztcbiAgICAgIHRoaXMubWVudVdpZHRoID0gdGhpcy5pdGVtLm91dGVyV2lkdGgodHJ1ZSk7XG4gICAgICB0aGlzLnNwZWVkID0gdGhpcy5pdGVtLmRhdGEoJ3NwZWVkJyk7XG4gICAgICB0aGlzLnNpZGUgPSB0aGlzLml0ZW0uZGF0YSgnc2lkZScpO1xuICAgICAgdGhpcy5kaXNwbGFjZSA9IHRoaXMuaXRlbS5kYXRhKCdkaXNwbGFjZScpO1xuICAgICAgdGhpcy50aW1pbmcgPSB0aGlzLml0ZW0uZGF0YSgndGltaW5nJyk7XG4gICAgICB0aGlzLm1ldGhvZCA9IHRoaXMuaXRlbS5kYXRhKCdtZXRob2QnKTtcbiAgICAgIHRoaXMub25PcGVuQ2FsbGJhY2sgPSB0aGlzLml0ZW0uZGF0YSgnb25PcGVuJyk7XG4gICAgICB0aGlzLm9uQ2xvc2VDYWxsYmFjayA9IHRoaXMuaXRlbS5kYXRhKCdvbkNsb3NlJyk7XG4gICAgICB0aGlzLm9uT3BlbkVuZENhbGxiYWNrID0gdGhpcy5pdGVtLmRhdGEoJ29uT3BlbkVuZCcpO1xuICAgICAgdGhpcy5vbkNsb3NlRW5kQ2FsbGJhY2sgPSB0aGlzLml0ZW0uZGF0YSgnb25DbG9zZUVuZCcpO1xuICAgICAgdGhpcy5ib2R5ID0gJCQyKHRoaXMuaXRlbS5kYXRhKCdib2R5JykpO1xuICAgIH1cblxuICAgIGJhYmVsSGVscGVycy5jcmVhdGVDbGFzcyhNZW51LCBbe1xuICAgICAga2V5OiAnZ2V0QW5pbWF0aW9uJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBbmltYXRpb24oYWN0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgIHZhciBhbmltYXRpb24gPSB7fSxcbiAgICAgICAgICAgIHByb3AgPSB0aGlzLnNpZGU7XG5cbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ29wZW4nICYmIGVsZW1lbnQgPT09ICdib2R5Jykge1xuICAgICAgICAgIGFuaW1hdGlvbltwcm9wXSA9IHRoaXMubWVudVdpZHRoICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdjbG9zZScgJiYgZWxlbWVudCA9PT0gJ21lbnUnKSB7XG4gICAgICAgICAgYW5pbWF0aW9uW3Byb3BdID0gJy0nICsgdGhpcy5tZW51V2lkdGggKyAncHgnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFuaW1hdGlvbltwcm9wXSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYW5pbWF0aW9uO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ3ByZXBhcmVCb2R5JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBwcmVwYXJlQm9keShhY3Rpb24pIHtcbiAgICAgICAgdmFyIHByb3AgPSBhY3Rpb24gPT09ICdvcGVuJyA/ICdoaWRkZW4nIDogJyc7XG5cbiAgICAgICAgLy8gUHJlcGFyZSBwYWdlIGlmIGNvbnRhaW5lciBpcyBib2R5XG4gICAgICAgIGlmICh0aGlzLmJvZHkuaXMoJ2JvZHknKSkge1xuICAgICAgICAgIHZhciAkaHRtbCA9ICQkMignaHRtbCcpLFxuICAgICAgICAgICAgICBzY3JvbGxUb3AgPSAkaHRtbC5zY3JvbGxUb3AoKTtcblxuICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cteCcsIHByb3ApLnNjcm9sbFRvcChzY3JvbGxUb3ApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnb3BlbkJvZHknLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9wZW5Cb2R5KCkge1xuICAgICAgICBpZiAodGhpcy5kaXNwbGFjZSkge1xuICAgICAgICAgIHZhciB0cmFuc2l0aW9ucyA9IGhlbHBlci50cmFuc2l0aW9ucyxcbiAgICAgICAgICAgICAgJGJvZHkgPSB0aGlzLmJvZHk7XG5cbiAgICAgICAgICBpZiAodHJhbnNpdGlvbnMuc3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAkYm9keS5jc3ModHJhbnNpdGlvbnMucHJvcGVydHksIHRoaXMuc2lkZSArICcgJyArIHRoaXMuc3BlZWQgLyAxMDAwICsgJ3MgJyArIHRoaXMudGltaW5nKS5jc3ModGhpcy5zaWRlLCAwKS5jc3Moe1xuICAgICAgICAgICAgICB3aWR0aDogJGJvZHkud2lkdGgoKSxcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGJvZHkuY3NzKHRoaXMuc2lkZSwgdGhpcy5tZW51V2lkdGggKyAncHgnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGJvZHlBbmltYXRpb24gPSB0aGlzLmdldEFuaW1hdGlvbihvcGVuQWN0aW9uLCAnYm9keScpO1xuXG4gICAgICAgICAgICAkYm9keS5jc3Moe1xuICAgICAgICAgICAgICB3aWR0aDogJGJvZHkud2lkdGgoKSxcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgICAgICAgIH0pLmFuaW1hdGUoYm9keUFuaW1hdGlvbiwge1xuICAgICAgICAgICAgICBxdWV1ZTogZmFsc2UsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLnNwZWVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdvbkNsb3NlQm9keScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gb25DbG9zZUJvZHkoKSB7XG4gICAgICAgIHZhciB0cmFuc2l0aW9ucyA9IGhlbHBlci50cmFuc2l0aW9ucyxcbiAgICAgICAgICAgIHJlc2V0U3R5bGVzID0ge1xuICAgICAgICAgIHdpZHRoOiAnJyxcbiAgICAgICAgICBwb3NpdGlvbjogJycsXG4gICAgICAgICAgcmlnaHQ6ICcnLFxuICAgICAgICAgIGxlZnQ6ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRyYW5zaXRpb25zLnN1cHBvcnRlZCkge1xuICAgICAgICAgIHJlc2V0U3R5bGVzW3RyYW5zaXRpb25zLnByb3BlcnR5XSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ib2R5LmNzcyhyZXNldFN0eWxlcykudW5iaW5kKHRyYW5zaXRpb25FbmRFdmVudCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnY2xvc2VCb2R5JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjbG9zZUJvZHkoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzcGxhY2UpIHtcbiAgICAgICAgICBpZiAoaGVscGVyLnRyYW5zaXRpb25zLnN1cHBvcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNzcyh0aGlzLnNpZGUsIDApLm9uZSh0cmFuc2l0aW9uRW5kRXZlbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgX3RoaXMub25DbG9zZUJvZHkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgYm9keUFuaW1hdGlvbiA9IHRoaXMuZ2V0QW5pbWF0aW9uKGNsb3NlQWN0aW9uLCAnYm9keScpO1xuXG4gICAgICAgICAgICB0aGlzLmJvZHkuYW5pbWF0ZShib2R5QW5pbWF0aW9uLCB7XG4gICAgICAgICAgICAgIHF1ZXVlOiBmYWxzZSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuc3BlZWQsXG4gICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vbkNsb3NlQm9keSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdtb3ZlQm9keScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gbW92ZUJvZHkoYWN0aW9uKSB7XG4gICAgICAgIGlmIChhY3Rpb24gPT09IG9wZW5BY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLm9wZW5Cb2R5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jbG9zZUJvZHkoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ29uT3Blbk1lbnUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uT3Blbk1lbnUoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLm5hbWU7XG5cbiAgICAgICAgc2lkclN0YXR1cy5tb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgc2lkclN0YXR1cy5vcGVuZWQgPSBuYW1lO1xuXG4gICAgICAgIHRoaXMuaXRlbS51bmJpbmQodHJhbnNpdGlvbkVuZEV2ZW50KTtcblxuICAgICAgICB0aGlzLmJvZHkucmVtb3ZlQ2xhc3MoYm9keUFuaW1hdGlvbkNsYXNzKS5hZGRDbGFzcyh0aGlzLm9wZW5DbGFzcyk7XG5cbiAgICAgICAgdGhpcy5vbk9wZW5FbmRDYWxsYmFjaygpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjYWxsYmFjayhuYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ29wZW5NZW51JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBvcGVuTWVudShjYWxsYmFjaykge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICB2YXIgJGl0ZW0gPSB0aGlzLml0ZW07XG5cbiAgICAgICAgaWYgKGhlbHBlci50cmFuc2l0aW9ucy5zdXBwb3J0ZWQpIHtcbiAgICAgICAgICAkaXRlbS5jc3ModGhpcy5zaWRlLCAwKS5vbmUodHJhbnNpdGlvbkVuZEV2ZW50LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpczIub25PcGVuTWVudShjYWxsYmFjayk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG1lbnVBbmltYXRpb24gPSB0aGlzLmdldEFuaW1hdGlvbihvcGVuQWN0aW9uLCAnbWVudScpO1xuXG4gICAgICAgICAgJGl0ZW0uY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJykuYW5pbWF0ZShtZW51QW5pbWF0aW9uLCB7XG4gICAgICAgICAgICBxdWV1ZTogZmFsc2UsXG4gICAgICAgICAgICBkdXJhdGlvbjogdGhpcy5zcGVlZCxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgICAgICAgICAgX3RoaXMyLm9uT3Blbk1lbnUoY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnb25DbG9zZU1lbnUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2xvc2VNZW51KGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuaXRlbS5jc3Moe1xuICAgICAgICAgIGxlZnQ6ICcnLFxuICAgICAgICAgIHJpZ2h0OiAnJ1xuICAgICAgICB9KS51bmJpbmQodHJhbnNpdGlvbkVuZEV2ZW50KTtcbiAgICAgICAgJCQyKCdodG1sJykuY3NzKCdvdmVyZmxvdy14JywgJycpO1xuXG4gICAgICAgIHNpZHJTdGF0dXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHNpZHJTdGF0dXMub3BlbmVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5ib2R5LnJlbW92ZUNsYXNzKGJvZHlBbmltYXRpb25DbGFzcykucmVtb3ZlQ2xhc3ModGhpcy5vcGVuQ2xhc3MpO1xuXG4gICAgICAgIHRoaXMub25DbG9zZUVuZENhbGxiYWNrKCk7XG5cbiAgICAgICAgLy8gQ2FsbGJhY2tcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNhbGxiYWNrKG5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnY2xvc2VNZW51JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjbG9zZU1lbnUoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLml0ZW07XG5cbiAgICAgICAgaWYgKGhlbHBlci50cmFuc2l0aW9ucy5zdXBwb3J0ZWQpIHtcbiAgICAgICAgICBpdGVtLmNzcyh0aGlzLnNpZGUsICcnKS5vbmUodHJhbnNpdGlvbkVuZEV2ZW50LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpczMub25DbG9zZU1lbnUoY2FsbGJhY2spO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBtZW51QW5pbWF0aW9uID0gdGhpcy5nZXRBbmltYXRpb24oY2xvc2VBY3Rpb24sICdtZW51Jyk7XG5cbiAgICAgICAgICBpdGVtLmFuaW1hdGUobWVudUFuaW1hdGlvbiwge1xuICAgICAgICAgICAgcXVldWU6IGZhbHNlLFxuICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuc3BlZWQsXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgICAgICAgIF90aGlzMy5vbkNsb3NlTWVudSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnbW92ZU1lbnUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG1vdmVNZW51KGFjdGlvbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5ib2R5LmFkZENsYXNzKGJvZHlBbmltYXRpb25DbGFzcyk7XG5cbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gb3BlbkFjdGlvbikge1xuICAgICAgICAgIHRoaXMub3Blbk1lbnUoY2FsbGJhY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2xvc2VNZW51KGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ21vdmUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG1vdmUoYWN0aW9uLCBjYWxsYmFjaykge1xuICAgICAgICAvLyBMb2NrIHNpZHJcbiAgICAgICAgc2lkclN0YXR1cy5tb3ZpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMucHJlcGFyZUJvZHkoYWN0aW9uKTtcbiAgICAgICAgdGhpcy5tb3ZlQm9keShhY3Rpb24pO1xuICAgICAgICB0aGlzLm1vdmVNZW51KGFjdGlvbiwgY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ29wZW4nLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9wZW4oY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgaXMgYWxyZWFkeSBvcGVuZWQgb3IgbW92aW5nXG4gICAgICAgIGlmIChzaWRyU3RhdHVzLm9wZW5lZCA9PT0gdGhpcy5uYW1lIHx8IHNpZHJTdGF0dXMubW92aW5nKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgYW5vdGhlciBtZW51IG9wZW5lZCBjbG9zZSBmaXJzdFxuICAgICAgICBpZiAoc2lkclN0YXR1cy5vcGVuZWQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgdmFyIGFscmVhZHlPcGVuZWRNZW51ID0gbmV3IE1lbnUoc2lkclN0YXR1cy5vcGVuZWQpO1xuXG4gICAgICAgICAgYWxyZWFkeU9wZW5lZE1lbnUuY2xvc2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXM0Lm9wZW4oY2FsbGJhY2spO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb3ZlKCdvcGVuJywgY2FsbGJhY2spO1xuXG4gICAgICAgIC8vIG9uT3BlbiBjYWxsYmFja1xuICAgICAgICB0aGlzLm9uT3BlbkNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnY2xvc2UnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNsb3NlKGNhbGxiYWNrKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIGlzIGFscmVhZHkgY2xvc2VkIG9yIG1vdmluZ1xuICAgICAgICBpZiAoc2lkclN0YXR1cy5vcGVuZWQgIT09IHRoaXMubmFtZSB8fCBzaWRyU3RhdHVzLm1vdmluZykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW92ZSgnY2xvc2UnLCBjYWxsYmFjayk7XG5cbiAgICAgICAgLy8gb25DbG9zZSBjYWxsYmFja1xuICAgICAgICB0aGlzLm9uQ2xvc2VDYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ3RvZ2dsZScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gdG9nZ2xlKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChzaWRyU3RhdHVzLm9wZW5lZCA9PT0gdGhpcy5uYW1lKSB7XG4gICAgICAgICAgdGhpcy5jbG9zZShjYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vcGVuKGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1dKTtcbiAgICByZXR1cm4gTWVudTtcbiAgfSgpO1xuXG4gIHZhciAkJDEgPSBqUXVlcnk7XG5cbiAgZnVuY3Rpb24gZXhlY3V0ZShhY3Rpb24sIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNpZHIgPSBuZXcgTWVudShuYW1lKTtcblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlICdvcGVuJzpcbiAgICAgICAgc2lkci5vcGVuKGNhbGxiYWNrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjbG9zZSc6XG4gICAgICAgIHNpZHIuY2xvc2UoY2FsbGJhY2spO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvZ2dsZSc6XG4gICAgICAgIHNpZHIudG9nZ2xlKGNhbGxiYWNrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAkJDEuZXJyb3IoJ01ldGhvZCAnICsgYWN0aW9uICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkuc2lkcicpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB2YXIgaTtcbiAgdmFyICQgPSBqUXVlcnk7XG4gIHZhciBwdWJsaWNNZXRob2RzID0gWydvcGVuJywgJ2Nsb3NlJywgJ3RvZ2dsZSddO1xuICB2YXIgbWV0aG9kTmFtZTtcbiAgdmFyIG1ldGhvZHMgPSB7fTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uIGdldE1ldGhvZChtZXRob2ROYW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgICAgLy8gQ2hlY2sgYXJndW1lbnRzXG4gICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBuYW1lO1xuICAgICAgICBuYW1lID0gJ3NpZHInO1xuICAgICAgfSBlbHNlIGlmICghbmFtZSkge1xuICAgICAgICBuYW1lID0gJ3NpZHInO1xuICAgICAgfVxuXG4gICAgICBleGVjdXRlKG1ldGhvZE5hbWUsIG5hbWUsIGNhbGxiYWNrKTtcbiAgICB9O1xuICB9O1xuICBmb3IgKGkgPSAwOyBpIDwgcHVibGljTWV0aG9kcy5sZW5ndGg7IGkrKykge1xuICAgIG1ldGhvZE5hbWUgPSBwdWJsaWNNZXRob2RzW2ldO1xuICAgIG1ldGhvZHNbbWV0aG9kTmFtZV0gPSBnZXRNZXRob2QobWV0aG9kTmFtZSk7XG4gIH1cblxuICBmdW5jdGlvbiBzaWRyKG1ldGhvZCkge1xuICAgIGlmIChtZXRob2QgPT09ICdzdGF0dXMnKSB7XG4gICAgICByZXR1cm4gc2lkclN0YXR1cztcbiAgICB9IGVsc2UgaWYgKG1ldGhvZHNbbWV0aG9kXSkge1xuICAgICAgcmV0dXJuIG1ldGhvZHNbbWV0aG9kXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIG1ldGhvZCA9PT0gJ3N0cmluZycgfHwgIW1ldGhvZCkge1xuICAgICAgcmV0dXJuIG1ldGhvZHMudG9nZ2xlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQuZXJyb3IoJ01ldGhvZCAnICsgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkuc2lkcicpO1xuICAgIH1cbiAgfVxuXG4gIHZhciAkJDMgPSBqUXVlcnk7XG5cbiAgZnVuY3Rpb24gZmlsbENvbnRlbnQoJHNpZGVNZW51LCBzZXR0aW5ncykge1xuICAgIC8vIFRoZSBtZW51IGNvbnRlbnRcbiAgICBpZiAodHlwZW9mIHNldHRpbmdzLnNvdXJjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIG5ld0NvbnRlbnQgPSBzZXR0aW5ncy5zb3VyY2UobmFtZSk7XG5cbiAgICAgICRzaWRlTWVudS5odG1sKG5ld0NvbnRlbnQpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNldHRpbmdzLnNvdXJjZSA9PT0gJ3N0cmluZycgJiYgaGVscGVyLmlzVXJsKHNldHRpbmdzLnNvdXJjZSkpIHtcbiAgICAgICQkMy5nZXQoc2V0dGluZ3Muc291cmNlLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAkc2lkZU1lbnUuaHRtbChkYXRhKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNldHRpbmdzLnNvdXJjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhciBodG1sQ29udGVudCA9ICcnLFxuICAgICAgICAgIHNlbGVjdG9ycyA9IHNldHRpbmdzLnNvdXJjZS5zcGxpdCgnLCcpO1xuXG4gICAgICAkJDMuZWFjaChzZWxlY3RvcnMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuICAgICAgICBodG1sQ29udGVudCArPSAnPGRpdiBjbGFzcz1cInNpZHItaW5uZXJcIj4nICsgJCQzKGVsZW1lbnQpLmh0bWwoKSArICc8L2Rpdj4nO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFJlbmFtaW5nIGlkcyBhbmQgY2xhc3Nlc1xuICAgICAgaWYgKHNldHRpbmdzLnJlbmFtaW5nKSB7XG4gICAgICAgIHZhciAkaHRtbENvbnRlbnQgPSAkJDMoJzxkaXYgLz4nKS5odG1sKGh0bWxDb250ZW50KTtcblxuICAgICAgICAkaHRtbENvbnRlbnQuZmluZCgnKicpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgdmFyICRlbGVtZW50ID0gJCQzKGVsZW1lbnQpO1xuXG4gICAgICAgICAgaGVscGVyLmFkZFByZWZpeGVzKCRlbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGh0bWxDb250ZW50ID0gJGh0bWxDb250ZW50Lmh0bWwoKTtcbiAgICAgIH1cblxuICAgICAgJHNpZGVNZW51Lmh0bWwoaHRtbENvbnRlbnQpO1xuICAgIH0gZWxzZSBpZiAoc2V0dGluZ3Muc291cmNlICE9PSBudWxsKSB7XG4gICAgICAkJDMuZXJyb3IoJ0ludmFsaWQgU2lkciBTb3VyY2UnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJHNpZGVNZW51O1xuICB9XG5cbiAgZnVuY3Rpb24gZm5TaWRyKG9wdGlvbnMpIHtcbiAgICB2YXIgdHJhbnNpdGlvbnMgPSBoZWxwZXIudHJhbnNpdGlvbnMsXG4gICAgICAgIHNldHRpbmdzID0gJCQzLmV4dGVuZCh7XG4gICAgICBuYW1lOiAnc2lkcicsIC8vIE5hbWUgZm9yIHRoZSAnc2lkcidcbiAgICAgIHNwZWVkOiAyMDAsIC8vIEFjY2VwdHMgc3RhbmRhcmQgalF1ZXJ5IGVmZmVjdHMgc3BlZWRzIChpLmUuIGZhc3QsIG5vcm1hbCBvciBtaWxsaXNlY29uZHMpXG4gICAgICBzaWRlOiAnbGVmdCcsIC8vIEFjY2VwdHMgJ2xlZnQnIG9yICdyaWdodCdcbiAgICAgIHNvdXJjZTogbnVsbCwgLy8gT3ZlcnJpZGUgdGhlIHNvdXJjZSBvZiB0aGUgY29udGVudC5cbiAgICAgIHJlbmFtaW5nOiB0cnVlLCAvLyBUaGUgaWRzIGFuZCBjbGFzc2VzIHdpbGwgYmUgcHJlcGVuZGVkIHdpdGggYSBwcmVmaXggd2hlbiBsb2FkaW5nIGV4aXN0ZW50IGNvbnRlbnRcbiAgICAgIGJvZHk6ICdib2R5JywgLy8gUGFnZSBjb250YWluZXIgc2VsZWN0b3IsXG4gICAgICBkaXNwbGFjZTogdHJ1ZSwgLy8gRGlzcGxhY2UgdGhlIGJvZHkgY29udGVudCBvciBub3RcbiAgICAgIHRpbWluZzogJ2Vhc2UnLCAvLyBUaW1pbmcgZnVuY3Rpb24gZm9yIENTUyB0cmFuc2l0aW9uc1xuICAgICAgbWV0aG9kOiAndG9nZ2xlJywgLy8gVGhlIG1ldGhvZCB0byBjYWxsIHdoZW4gZWxlbWVudCBpcyBjbGlja2VkXG4gICAgICBiaW5kOiAndG91Y2hzdGFydCBjbGljaycsIC8vIFRoZSBldmVudChzKSB0byB0cmlnZ2VyIHRoZSBtZW51XG4gICAgICBvbk9wZW46IGZ1bmN0aW9uIG9uT3BlbigpIHt9LFxuICAgICAgLy8gQ2FsbGJhY2sgd2hlbiBzaWRyIHN0YXJ0IG9wZW5pbmdcbiAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uIG9uQ2xvc2UoKSB7fSxcbiAgICAgIC8vIENhbGxiYWNrIHdoZW4gc2lkciBzdGFydCBjbG9zaW5nXG4gICAgICBvbk9wZW5FbmQ6IGZ1bmN0aW9uIG9uT3BlbkVuZCgpIHt9LFxuICAgICAgLy8gQ2FsbGJhY2sgd2hlbiBzaWRyIGVuZCBvcGVuaW5nXG4gICAgICBvbkNsb3NlRW5kOiBmdW5jdGlvbiBvbkNsb3NlRW5kKCkge30gLy8gQ2FsbGJhY2sgd2hlbiBzaWRyIGVuZCBjbG9zaW5nXG5cbiAgICB9LCBvcHRpb25zKSxcbiAgICAgICAgbmFtZSA9IHNldHRpbmdzLm5hbWUsXG4gICAgICAgICRzaWRlTWVudSA9ICQkMygnIycgKyBuYW1lKTtcblxuICAgIC8vIElmIHRoZSBzaWRlIG1lbnUgZG8gbm90IGV4aXN0IGNyZWF0ZSBpdFxuICAgIGlmICgkc2lkZU1lbnUubGVuZ3RoID09PSAwKSB7XG4gICAgICAkc2lkZU1lbnUgPSAkJDMoJzxkaXYgLz4nKS5hdHRyKCdpZCcsIG5hbWUpLmFwcGVuZFRvKCQkMygnYm9keScpKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgdHJhbnNpdGlvbiB0byBtZW51IGlmIGFyZSBzdXBwb3J0ZWRcbiAgICBpZiAodHJhbnNpdGlvbnMuc3VwcG9ydGVkKSB7XG4gICAgICAkc2lkZU1lbnUuY3NzKHRyYW5zaXRpb25zLnByb3BlcnR5LCBzZXR0aW5ncy5zaWRlICsgJyAnICsgc2V0dGluZ3Muc3BlZWQgLyAxMDAwICsgJ3MgJyArIHNldHRpbmdzLnRpbWluZyk7XG4gICAgfVxuXG4gICAgLy8gQWRkaW5nIHN0eWxlcyBhbmQgb3B0aW9uc1xuICAgICRzaWRlTWVudS5hZGRDbGFzcygnc2lkcicpLmFkZENsYXNzKHNldHRpbmdzLnNpZGUpLmRhdGEoe1xuICAgICAgc3BlZWQ6IHNldHRpbmdzLnNwZWVkLFxuICAgICAgc2lkZTogc2V0dGluZ3Muc2lkZSxcbiAgICAgIGJvZHk6IHNldHRpbmdzLmJvZHksXG4gICAgICBkaXNwbGFjZTogc2V0dGluZ3MuZGlzcGxhY2UsXG4gICAgICB0aW1pbmc6IHNldHRpbmdzLnRpbWluZyxcbiAgICAgIG1ldGhvZDogc2V0dGluZ3MubWV0aG9kLFxuICAgICAgb25PcGVuOiBzZXR0aW5ncy5vbk9wZW4sXG4gICAgICBvbkNsb3NlOiBzZXR0aW5ncy5vbkNsb3NlLFxuICAgICAgb25PcGVuRW5kOiBzZXR0aW5ncy5vbk9wZW5FbmQsXG4gICAgICBvbkNsb3NlRW5kOiBzZXR0aW5ncy5vbkNsb3NlRW5kXG4gICAgfSk7XG5cbiAgICAkc2lkZU1lbnUgPSBmaWxsQ29udGVudCgkc2lkZU1lbnUsIHNldHRpbmdzKTtcblxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCQzKHRoaXMpLFxuICAgICAgICAgIGRhdGEgPSAkdGhpcy5kYXRhKCdzaWRyJyksXG4gICAgICAgICAgZmxhZyA9IGZhbHNlO1xuXG4gICAgICAvLyBJZiB0aGUgcGx1Z2luIGhhc24ndCBiZWVuIGluaXRpYWxpemVkIHlldFxuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIHNpZHJTdGF0dXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHNpZHJTdGF0dXMub3BlbmVkID0gZmFsc2U7XG5cbiAgICAgICAgJHRoaXMuZGF0YSgnc2lkcicsIG5hbWUpO1xuXG4gICAgICAgICR0aGlzLmJpbmQoc2V0dGluZ3MuYmluZCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIGlmICghZmxhZykge1xuICAgICAgICAgICAgZmxhZyA9IHRydWU7XG4gICAgICAgICAgICBzaWRyKHNldHRpbmdzLm1ldGhvZCwgbmFtZSk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBmbGFnID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBqUXVlcnkuc2lkciA9IHNpZHI7XG4gIGpRdWVyeS5mbi5zaWRyID0gZm5TaWRyO1xuXG59KCkpOyIsIi8qKlxuICogc3RhY2t0YWJsZS5qc1xuICogQXV0aG9yICYgY29weXJpZ2h0IChjKSAyMDEyOiBKb2huIFBvbGFjZWtcbiAqIENhcmRUYWJsZSBieTogSnVzdGluIE1jTmFsbHkgKDIwMTUpXG4gKiBEdWFsIE1JVCAmIEdQTCBsaWNlbnNlXG4gKlxuICogUGFnZTogaHR0cDovL2pvaG5wb2xhY2VrLmdpdGh1Yi5jb20vc3RhY2t0YWJsZS5qc1xuICogUmVwbzogaHR0cHM6Ly9naXRodWIuY29tL2pvaG5wb2xhY2VrL3N0YWNrdGFibGUuanMvXG4gKlxuICogalF1ZXJ5IHBsdWdpbiBmb3Igc3RhY2tpbmcgdGFibGVzIG9uIHNtYWxsIHNjcmVlbnNcbiAqIFJlcXVpcmVzIGpRdWVyeSB2ZXJzaW9uIDEuNyBvciBhYm92ZVxuICpcbiAqL1xuOyhmdW5jdGlvbigkKSB7XG4gICQuZm4uY2FyZHRhYmxlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciAkdGFibGVzID0gdGhpcyxcbiAgICAgICAgZGVmYXVsdHMgPSB7aGVhZEluZGV4OjB9LFxuICAgICAgICBzZXR0aW5ncyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyksXG4gICAgICAgIGhlYWRJbmRleDtcblxuICAgIC8vIGNoZWNraW5nIHRoZSBcImhlYWRJbmRleFwiIG9wdGlvbiBwcmVzZW5jZS4uLiBvciBkZWZhdWx0cyBpdCB0byAwXG4gICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmhlYWRJbmRleClcbiAgICAgIGhlYWRJbmRleCA9IG9wdGlvbnMuaGVhZEluZGV4O1xuICAgIGVsc2VcbiAgICAgIGhlYWRJbmRleCA9IDA7XG5cbiAgICByZXR1cm4gJHRhYmxlcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyICR0YWJsZSA9ICQodGhpcyk7XG4gICAgICBpZiAoJHRhYmxlLmhhc0NsYXNzKCdzdGFja3RhYmxlJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIHRhYmxlX2NzcyA9ICQodGhpcykucHJvcCgnY2xhc3MnKTtcbiAgICAgIHZhciAkc3RhY2t0YWJsZSA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICBpZiAodHlwZW9mIHNldHRpbmdzLm15Q2xhc3MgIT09ICd1bmRlZmluZWQnKSAkc3RhY2t0YWJsZS5hZGRDbGFzcyhzZXR0aW5ncy5teUNsYXNzKTtcbiAgICAgIHZhciBtYXJrdXAgPSAnJztcbiAgICAgIHZhciAkY2FwdGlvbiwgJHRvcFJvdywgaGVhZE1hcmt1cCwgYm9keU1hcmt1cCwgdHJfY2xhc3M7XG5cbiAgICAgICR0YWJsZS5hZGRDbGFzcygnc3RhY2t0YWJsZSBsYXJnZS1vbmx5Jyk7XG5cbiAgICAgICRjYXB0aW9uID0gJHRhYmxlLmZpbmQoXCI+Y2FwdGlvblwiKS5jbG9uZSgpO1xuICAgICAgJHRvcFJvdyA9ICR0YWJsZS5maW5kKCc+dGhlYWQ+dHIsPnRib2R5PnRyLD50Zm9vdD50ciw+dHInKS5lcSgwKTtcblxuICAgICAgLy8gYXZvaWQgZHVwbGljYXRpb24gd2hlbiBwYWdpbmF0aW5nXG4gICAgICAkdGFibGUuc2libGluZ3MoKS5maWx0ZXIoJy5zbWFsbC1vbmx5JykucmVtb3ZlKCk7XG5cbiAgICAgIC8vIHVzaW5nIHJvd0luZGV4IGFuZCBjZWxsSW5kZXggaW4gb3JkZXIgdG8gcmVkdWNlIGFtYmlndWl0eVxuICAgICAgJHRhYmxlLmZpbmQoJz50Ym9keT50cicpLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgLy8gZGVjbGFyaW5nIGhlYWRNYXJrdXAgYW5kIGJvZHlNYXJrdXAsIHRvIGJlIHVzZWQgZm9yIHNlcGFyYXRlbHkgaGVhZCBhbmQgYm9keSBvZiBzaW5nbGUgcmVjb3Jkc1xuICAgICAgICBoZWFkTWFya3VwID0gJyc7XG4gICAgICAgIGJvZHlNYXJrdXAgPSAnJztcbiAgICAgICAgdHJfY2xhc3MgPSAkKHRoaXMpLnByb3AoJ2NsYXNzJyk7XG4gICAgICAgIC8vIGZvciB0aGUgZmlyc3Qgcm93LCBcImhlYWRJbmRleFwiIGNlbGwgaXMgdGhlIGhlYWQgb2YgdGhlIHRhYmxlXG4gICAgICAgIC8vIGZvciB0aGUgb3RoZXIgcm93cywgcHV0IHRoZSBcImhlYWRJbmRleFwiIGNlbGwgYXMgdGhlIGhlYWQgZm9yIHRoYXQgcm93XG4gICAgICAgIC8vIHRoZW4gaXRlcmF0ZSB0aHJvdWdoIHRoZSBrZXkvdmFsdWVzXG4gICAgICAgICQodGhpcykuZmluZCgnPnRkLD50aCcpLmVhY2goZnVuY3Rpb24oY2VsbEluZGV4KSB7XG4gICAgICAgICAgaWYgKCQodGhpcykuaHRtbCgpICE9PSAnJyl7XG4gICAgICAgICAgICBib2R5TWFya3VwICs9ICc8dHIgY2xhc3M9XCInICsgdHJfY2xhc3MgKydcIj4nO1xuICAgICAgICAgICAgaWYgKCR0b3BSb3cuZmluZCgnPnRkLD50aCcpLmVxKGNlbGxJbmRleCkuaHRtbCgpKXtcbiAgICAgICAgICAgICAgYm9keU1hcmt1cCArPSAnPHRkIGNsYXNzPVwic3Qta2V5XCI+JyskdG9wUm93LmZpbmQoJz50ZCw+dGgnKS5lcShjZWxsSW5kZXgpLmh0bWwoKSsnPC90ZD4nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYm9keU1hcmt1cCArPSAnPHRkIGNsYXNzPVwic3Qta2V5XCI+PC90ZD4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9keU1hcmt1cCArPSAnPHRkIGNsYXNzPVwic3QtdmFsICcrJCh0aGlzKS5wcm9wKCdjbGFzcycpICArJ1wiPicrJCh0aGlzKS5odG1sKCkrJzwvdGQ+JztcbiAgICAgICAgICAgIGJvZHlNYXJrdXAgKz0gJzwvdHI+JztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1hcmt1cCArPSAnPHRhYmxlIGNsYXNzPVwiICcrIHRhYmxlX2NzcyArJyBzdGFja3RhYmxlIHNtYWxsLW9ubHlcIj48dGJvZHk+JyArIGhlYWRNYXJrdXAgKyBib2R5TWFya3VwICsgJzwvdGJvZHk+PC90YWJsZT4nO1xuICAgICAgfSk7XG5cbiAgICAgICR0YWJsZS5maW5kKCc+dGZvb3Q+dHI+dGQnKS5lYWNoKGZ1bmN0aW9uKHJvd0luZGV4LHZhbHVlKSB7XG4gICAgICAgIGlmICgkLnRyaW0oJCh2YWx1ZSkudGV4dCgpKSAhPT0gJycpIHtcbiAgICAgICAgICBtYXJrdXAgKz0gJzx0YWJsZSBjbGFzcz1cIicrIHRhYmxlX2NzcyArICcgc3RhY2t0YWJsZSBzbWFsbC1vbmx5XCI+PHRib2R5Pjx0cj48dGQ+JyArICQodmFsdWUpLmh0bWwoKSArICc8L3RkPjwvdHI+PC90Ym9keT48L3RhYmxlPic7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAkc3RhY2t0YWJsZS5wcmVwZW5kKCRjYXB0aW9uKTtcbiAgICAgICRzdGFja3RhYmxlLmFwcGVuZCgkKG1hcmt1cCkpO1xuICAgICAgJHRhYmxlLmJlZm9yZSgkc3RhY2t0YWJsZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgJC5mbi5zdGFja3RhYmxlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciAkdGFibGVzID0gdGhpcyxcbiAgICAgICAgZGVmYXVsdHMgPSB7aGVhZEluZGV4OjAsZGlzcGxheUhlYWRlcjp0cnVlfSxcbiAgICAgICAgc2V0dGluZ3MgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpLFxuICAgICAgICBoZWFkSW5kZXg7XG5cbiAgICAvLyBjaGVja2luZyB0aGUgXCJoZWFkSW5kZXhcIiBvcHRpb24gcHJlc2VuY2UuLi4gb3IgZGVmYXVsdHMgaXQgdG8gMFxuICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5oZWFkSW5kZXgpXG4gICAgICBoZWFkSW5kZXggPSBvcHRpb25zLmhlYWRJbmRleDtcbiAgICBlbHNlXG4gICAgICBoZWFkSW5kZXggPSAwO1xuXG4gICAgcmV0dXJuICR0YWJsZXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0YWJsZV9jc3MgPSAkKHRoaXMpLnByb3AoJ2NsYXNzJyk7XG4gICAgICB2YXIgJHN0YWNrdGFibGUgPSAkKCc8dGFibGUgY2xhc3M9XCInKyB0YWJsZV9jc3MgKycgc3RhY2t0YWJsZSBzbWFsbC1vbmx5XCI+PHRib2R5PjwvdGJvZHk+PC90YWJsZT4nKTtcbiAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3MubXlDbGFzcyAhPT0gJ3VuZGVmaW5lZCcpICRzdGFja3RhYmxlLmFkZENsYXNzKHNldHRpbmdzLm15Q2xhc3MpO1xuICAgICAgdmFyIG1hcmt1cCA9ICcnO1xuICAgICAgdmFyICR0YWJsZSwgJGNhcHRpb24sICR0b3BSb3csIGhlYWRNYXJrdXAsIGJvZHlNYXJrdXAsIHRyX2NsYXNzLCBkaXNwbGF5SGVhZGVyO1xuXG4gICAgICAkdGFibGUgPSAkKHRoaXMpO1xuICAgICAgJHRhYmxlLmFkZENsYXNzKCdzdGFja3RhYmxlIGxhcmdlLW9ubHknKTtcbiAgICAgICRjYXB0aW9uID0gJHRhYmxlLmZpbmQoXCI+Y2FwdGlvblwiKS5jbG9uZSgpO1xuICAgICAgJHRvcFJvdyA9ICR0YWJsZS5maW5kKCc+dGhlYWQ+dHIsPnRib2R5PnRyLD50Zm9vdD50cicpLmVxKDApO1xuXG4gICAgICBkaXNwbGF5SGVhZGVyID0gJHRhYmxlLmRhdGEoJ2Rpc3BsYXktaGVhZGVyJykgPT09IHVuZGVmaW5lZCA/IHNldHRpbmdzLmRpc3BsYXlIZWFkZXIgOiAkdGFibGUuZGF0YSgnZGlzcGxheS1oZWFkZXInKTtcblxuICAgICAgLy8gdXNpbmcgcm93SW5kZXggYW5kIGNlbGxJbmRleCBpbiBvcmRlciB0byByZWR1Y2UgYW1iaWd1aXR5XG4gICAgICAkdGFibGUuZmluZCgnPnRib2R5PnRyLCA+dGhlYWQ+dHInKS5lYWNoKGZ1bmN0aW9uKHJvd0luZGV4KSB7XG5cbiAgICAgICAgLy8gZGVjbGFyaW5nIGhlYWRNYXJrdXAgYW5kIGJvZHlNYXJrdXAsIHRvIGJlIHVzZWQgZm9yIHNlcGFyYXRlbHkgaGVhZCBhbmQgYm9keSBvZiBzaW5nbGUgcmVjb3Jkc1xuICAgICAgICBoZWFkTWFya3VwID0gJyc7XG4gICAgICAgIGJvZHlNYXJrdXAgPSAnJztcbiAgICAgICAgdHJfY2xhc3MgPSAkKHRoaXMpLnByb3AoJ2NsYXNzJyk7XG5cbiAgICAgICAgLy8gZm9yIHRoZSBmaXJzdCByb3csIFwiaGVhZEluZGV4XCIgY2VsbCBpcyB0aGUgaGVhZCBvZiB0aGUgdGFibGVcbiAgICAgICAgaWYgKHJvd0luZGV4ID09PSAwKSB7XG4gICAgICAgICAgLy8gdGhlIG1haW4gaGVhZGluZyBnb2VzIGludG8gdGhlIG1hcmt1cCB2YXJpYWJsZVxuICAgICAgICAgIGlmIChkaXNwbGF5SGVhZGVyKSB7XG4gICAgICAgICAgICBtYXJrdXAgKz0gJzx0ciBjbGFzcz1cIiAnK3RyX2NsYXNzICsnIFwiPjx0aCBjbGFzcz1cInN0LWhlYWQtcm93IHN0LWhlYWQtcm93LW1haW5cIiBjb2xzcGFuPVwiMlwiPicrJCh0aGlzKS5maW5kKCc+dGgsPnRkJykuZXEoaGVhZEluZGV4KS5odG1sKCkrJzwvdGg+PC90cj4nO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBmb3IgdGhlIG90aGVyIHJvd3MsIHB1dCB0aGUgXCJoZWFkSW5kZXhcIiBjZWxsIGFzIHRoZSBoZWFkIGZvciB0aGF0IHJvd1xuICAgICAgICAgIC8vIHRoZW4gaXRlcmF0ZSB0aHJvdWdoIHRoZSBrZXkvdmFsdWVzXG4gICAgICAgICAgJCh0aGlzKS5maW5kKCc+dGQsPnRoJykuZWFjaChmdW5jdGlvbihjZWxsSW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChjZWxsSW5kZXggPT09IGhlYWRJbmRleCkge1xuICAgICAgICAgICAgICBoZWFkTWFya3VwID0gJzx0ciBjbGFzcz1cIicrIHRyX2NsYXNzKydcIj48dGggY2xhc3M9XCJzdC1oZWFkLXJvd1wiIGNvbHNwYW49XCIyXCI+JyskKHRoaXMpLmh0bWwoKSsnPC90aD48L3RyPic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5odG1sKCkgIT09ICcnKXtcbiAgICAgICAgICAgICAgICBib2R5TWFya3VwICs9ICc8dHIgY2xhc3M9XCInICsgdHJfY2xhc3MgKydcIj4nO1xuICAgICAgICAgICAgICAgIGlmICgkdG9wUm93LmZpbmQoJz50ZCw+dGgnKS5lcShjZWxsSW5kZXgpLmh0bWwoKSl7XG4gICAgICAgICAgICAgICAgICBib2R5TWFya3VwICs9ICc8dGQgY2xhc3M9XCJzdC1rZXlcIj4nKyR0b3BSb3cuZmluZCgnPnRkLD50aCcpLmVxKGNlbGxJbmRleCkuaHRtbCgpKyc8L3RkPic7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGJvZHlNYXJrdXAgKz0gJzx0ZCBjbGFzcz1cInN0LWtleVwiPjwvdGQ+JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYm9keU1hcmt1cCArPSAnPHRkIGNsYXNzPVwic3QtdmFsICcrJCh0aGlzKS5wcm9wKCdjbGFzcycpICArJ1wiPicrJCh0aGlzKS5odG1sKCkrJzwvdGQ+JztcbiAgICAgICAgICAgICAgICBib2R5TWFya3VwICs9ICc8L3RyPic7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIG1hcmt1cCArPSBoZWFkTWFya3VwICsgYm9keU1hcmt1cDtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICRzdGFja3RhYmxlLnByZXBlbmQoJGNhcHRpb24pO1xuICAgICAgJHN0YWNrdGFibGUuYXBwZW5kKCQobWFya3VwKSk7XG4gICAgICAkdGFibGUuYmVmb3JlKCRzdGFja3RhYmxlKTtcbiAgICB9KTtcbiAgfTtcblxuICQuZm4uc3RhY2tjb2x1bW5zID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciAkdGFibGVzID0gdGhpcyxcbiAgICAgICAgZGVmYXVsdHMgPSB7fSxcbiAgICAgICAgc2V0dGluZ3MgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuICR0YWJsZXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciAkdGFibGUgPSAkKHRoaXMpO1xuICAgICAgdmFyICRjYXB0aW9uID0gJHRhYmxlLmZpbmQoXCI+Y2FwdGlvblwiKS5jbG9uZSgpO1xuICAgICAgdmFyIG51bV9jb2xzID0gJHRhYmxlLmZpbmQoJz50aGVhZD50ciw+dGJvZHk+dHIsPnRmb290PnRyJykuZXEoMCkuZmluZCgnPnRkLD50aCcpLmxlbmd0aDsgLy9maXJzdCB0YWJsZSA8dHI+IG11c3Qgbm90IGNvbnRhaW4gY29sc3BhbnMsIG9yIGFkZCBzdW0oY29sc3Bhbi0xKSBoZXJlLlxuICAgICAgaWYobnVtX2NvbHM8MykgLy9zdGFja2NvbHVtbnMgaGFzIG5vIGVmZmVjdCBvbiB0YWJsZXMgd2l0aCBsZXNzIHRoYW4gMyBjb2x1bW5zXG4gICAgICAgIHJldHVybjtcblxuICAgICAgdmFyICRzdGFja2NvbHVtbnMgPSAkKCc8dGFibGUgY2xhc3M9XCJzdGFja3RhYmxlIHNtYWxsLW9ubHlcIj48L3RhYmxlPicpO1xuICAgICAgaWYgKHR5cGVvZiBzZXR0aW5ncy5teUNsYXNzICE9PSAndW5kZWZpbmVkJykgJHN0YWNrY29sdW1ucy5hZGRDbGFzcyhzZXR0aW5ncy5teUNsYXNzKTtcbiAgICAgICR0YWJsZS5hZGRDbGFzcygnc3RhY2t0YWJsZSBsYXJnZS1vbmx5Jyk7XG4gICAgICB2YXIgdGIgPSAkKCc8dGJvZHk+PC90Ym9keT4nKTtcbiAgICAgIHZhciBjb2xfaSA9IDE7IC8vY29sIGluZGV4IHN0YXJ0cyBhdCAwIC0+IHN0YXJ0IGNvcHkgYXQgc2Vjb25kIGNvbHVtbi5cblxuICAgICAgd2hpbGUgKGNvbF9pIDwgbnVtX2NvbHMpIHtcbiAgICAgICAgJHRhYmxlLmZpbmQoJz50aGVhZD50ciw+dGJvZHk+dHIsPnRmb290PnRyJykuZWFjaChmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgIHZhciB0ZW0gPSAkKCc8dHI+PC90cj4nKTsgLy8gdG9kbyBvcHQuIGNvcHkgc3R5bGVzIG9mICR0aGlzOyB0b2RvIGNoZWNrIGlmIHBhcmVudCBpcyB0aGVhZCBvciB0Zm9vdCB0byBoYW5kbGUgYWNjb3JkaW5nbHlcbiAgICAgICAgICBpZihpbmRleCA9PT0gMCkgdGVtLmFkZENsYXNzKFwic3QtaGVhZC1yb3cgc3QtaGVhZC1yb3ctbWFpblwiKTtcbiAgICAgICAgICB2YXIgZmlyc3QgPSAkKHRoaXMpLmZpbmQoJz50ZCw+dGgnKS5lcSgwKS5jbG9uZSgpLmFkZENsYXNzKFwic3Qta2V5XCIpO1xuICAgICAgICAgIHZhciB0YXJnZXQgPSBjb2xfaTtcbiAgICAgICAgICAvLyBpZiBjb2xzcGFuIGFwcGx5LCByZWNvbXB1dGUgdGFyZ2V0IGZvciBzZWNvbmQgY2VsbC5cbiAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKFwiKltjb2xzcGFuXVwiKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBpID0wO1xuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCc+dGQsPnRoJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgY3MgPSAkKHRoaXMpLmF0dHIoXCJjb2xzcGFuXCIpO1xuICAgICAgICAgICAgICAgIGlmIChjcykge1xuICAgICAgICAgICAgICAgICAgY3MgPSBwYXJzZUludChjcywgMTApO1xuICAgICAgICAgICAgICAgICAgdGFyZ2V0IC09IGNzLTE7XG4gICAgICAgICAgICAgICAgICBpZiAoKGkrY3MpID4gKGNvbF9pKSkgLy9vdXQgb2YgY3VycmVudCBib3VuZHNcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ICs9IGkgKyBjcyAtIGNvbF9pIC0xO1xuICAgICAgICAgICAgICAgICAgaSArPSBjcztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpID4gY29sX2kpXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vdGFyZ2V0IGlzIHNldDsgYnJlYWsuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHNlY29uZCA9ICQodGhpcykuZmluZCgnPnRkLD50aCcpLmVxKHRhcmdldCkuY2xvbmUoKS5hZGRDbGFzcyhcInN0LXZhbFwiKS5yZW1vdmVBdHRyKFwiY29sc3BhblwiKTtcbiAgICAgICAgICB0ZW0uYXBwZW5kKGZpcnN0LCBzZWNvbmQpO1xuICAgICAgICAgIHRiLmFwcGVuZCh0ZW0pO1xuICAgICAgICB9KTtcbiAgICAgICAgKytjb2xfaTtcbiAgICAgIH1cblxuICAgICAgJHN0YWNrY29sdW1ucy5hcHBlbmQoJCh0YikpO1xuICAgICAgJHN0YWNrY29sdW1ucy5wcmVwZW5kKCRjYXB0aW9uKTtcbiAgICAgICR0YWJsZS5iZWZvcmUoJHN0YWNrY29sdW1ucyk7XG4gICAgfSk7XG4gIH07XG5cbn0oalF1ZXJ5KSk7XG4iLCIvKiEgTGl0eSAtIHYyLjMuMSAtIDIwMTgtMDQtMjBcbiogaHR0cDovL3NvcmdhbGxhLmNvbS9saXR5L1xuKiBDb3B5cmlnaHQgKGMpIDIwMTUtMjAxOCBKYW4gU29yZ2FsbGE7IExpY2Vuc2VkIE1JVCAqL1xuKGZ1bmN0aW9uKHdpbmRvdywgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZ1bmN0aW9uKCQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWN0b3J5KHdpbmRvdywgJCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnkod2luZG93LCByZXF1aXJlKCdqcXVlcnknKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmxpdHkgPSBmYWN0b3J5KHdpbmRvdywgd2luZG93LmpRdWVyeSB8fCB3aW5kb3cuWmVwdG8pO1xuICAgIH1cbn0odHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHRoaXMsIGZ1bmN0aW9uKHdpbmRvdywgJCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcblxuICAgIHZhciBfd2luID0gJCh3aW5kb3cpO1xuICAgIHZhciBfZGVmZXJyZWQgPSAkLkRlZmVycmVkO1xuICAgIHZhciBfaHRtbCA9ICQoJ2h0bWwnKTtcbiAgICB2YXIgX2luc3RhbmNlcyA9IFtdO1xuXG4gICAgdmFyIF9hdHRyQXJpYUhpZGRlbiA9ICdhcmlhLWhpZGRlbic7XG4gICAgdmFyIF9kYXRhQXJpYUhpZGRlbiA9ICdsaXR5LScgKyBfYXR0ckFyaWFIaWRkZW47XG5cbiAgICB2YXIgX2ZvY3VzYWJsZUVsZW1lbnRzU2VsZWN0b3IgPSAnYVtocmVmXSxhcmVhW2hyZWZdLGlucHV0Om5vdChbZGlzYWJsZWRdKSxzZWxlY3Q6bm90KFtkaXNhYmxlZF0pLHRleHRhcmVhOm5vdChbZGlzYWJsZWRdKSxidXR0b246bm90KFtkaXNhYmxlZF0pLGlmcmFtZSxvYmplY3QsZW1iZWQsW2NvbnRlbnRlZGl0YWJsZV0sW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pJztcblxuICAgIHZhciBfZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgIGVzYzogdHJ1ZSxcbiAgICAgICAgaGFuZGxlcjogbnVsbCxcbiAgICAgICAgaGFuZGxlcnM6IHtcbiAgICAgICAgICAgIGltYWdlOiBpbWFnZUhhbmRsZXIsXG4gICAgICAgICAgICBpbmxpbmU6IGlubGluZUhhbmRsZXIsXG4gICAgICAgICAgICB5b3V0dWJlOiB5b3V0dWJlSGFuZGxlcixcbiAgICAgICAgICAgIHZpbWVvOiB2aW1lb0hhbmRsZXIsXG4gICAgICAgICAgICBnb29nbGVtYXBzOiBnb29nbGVtYXBzSGFuZGxlcixcbiAgICAgICAgICAgIGZhY2Vib29rdmlkZW86IGZhY2Vib29rdmlkZW9IYW5kbGVyLFxuICAgICAgICAgICAgaWZyYW1lOiBpZnJhbWVIYW5kbGVyXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cImxpdHlcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbD1cIkRpYWxvZyBXaW5kb3cgKFByZXNzIGVzY2FwZSB0byBjbG9zZSlcIiB0YWJpbmRleD1cIi0xXCI+PGRpdiBjbGFzcz1cImxpdHktd3JhcFwiIGRhdGEtbGl0eS1jbG9zZSByb2xlPVwiZG9jdW1lbnRcIj48ZGl2IGNsYXNzPVwibGl0eS1sb2FkZXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5Mb2FkaW5nLi4uPC9kaXY+PGRpdiBjbGFzcz1cImxpdHktY29udGFpbmVyXCI+PGRpdiBjbGFzcz1cImxpdHktY29udGVudFwiPjwvZGl2PjxidXR0b24gY2xhc3M9XCJsaXR5LWNsb3NlXCIgdHlwZT1cImJ1dHRvblwiIGFyaWEtbGFiZWw9XCJDbG9zZSAoUHJlc3MgZXNjYXBlIHRvIGNsb3NlKVwiIGRhdGEtbGl0eS1jbG9zZT4mdGltZXM7PC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+J1xuICAgIH07XG5cbiAgICB2YXIgX2ltYWdlUmVnZXhwID0gLyheZGF0YTppbWFnZVxcLyl8KFxcLihwbmd8anBlP2d8Z2lmfHN2Z3x3ZWJwfGJtcHxpY298dGlmZj8pKFxcP1xcUyopPyQpL2k7XG4gICAgdmFyIF95b3V0dWJlUmVnZXggPSAvKHlvdXR1YmUoLW5vY29va2llKT9cXC5jb218eW91dHVcXC5iZSlcXC8od2F0Y2hcXD92PXx2XFwvfHVcXC98ZW1iZWRcXC8/KT8oW1xcdy1dezExfSkoLiopPy9pO1xuICAgIHZhciBfdmltZW9SZWdleCA9ICAvKHZpbWVvKHBybyk/LmNvbSlcXC8oPzpbXlxcZF0rKT8oXFxkKylcXD8/KC4qKT8kLztcbiAgICB2YXIgX2dvb2dsZW1hcHNSZWdleCA9IC8oKG1hcHN8d3d3KVxcLik/Z29vZ2xlXFwuKFteXFwvXFw/XSspXFwvPygobWFwc1xcLz8pP1xcPykoLiopL2k7XG4gICAgdmFyIF9mYWNlYm9va3ZpZGVvUmVnZXggPSAvKGZhY2Vib29rXFwuY29tKVxcLyhbYS16MC05Xy1dKilcXC92aWRlb3NcXC8oWzAtOV0qKSguKik/JC9pO1xuXG4gICAgdmFyIF90cmFuc2l0aW9uRW5kRXZlbnQgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHZhciB0cmFuc0VuZEV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgICBXZWJraXRUcmFuc2l0aW9uOiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gICAgICAgICAgICBNb3pUcmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICAgICAgICBPVHJhbnNpdGlvbjogJ29UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdHJhbnNFbmRFdmVudE5hbWVzKSB7XG4gICAgICAgICAgICBpZiAoZWwuc3R5bGVbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc0VuZEV2ZW50TmFtZXNbbmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSkoKTtcblxuICAgIGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQoZWxlbWVudCkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBfZGVmZXJyZWQoKTtcblxuICAgICAgICBpZiAoIV90cmFuc2l0aW9uRW5kRXZlbnQgfHwgIWVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50Lm9uZShfdHJhbnNpdGlvbkVuZEV2ZW50LCBkZWZlcnJlZC5yZXNvbHZlKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZGVmZXJyZWQucmVzb2x2ZSwgNTAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0dGluZ3MoY3VyclNldHRpbmdzLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gJC5leHRlbmQoe30sIGN1cnJTZXR0aW5ncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBjdXJyU2V0dGluZ3Nba2V5XSA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICAgICAgICAgIDogY3VyclNldHRpbmdzW2tleV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnJTZXR0aW5nc1trZXldID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkLmV4dGVuZChjdXJyU2V0dGluZ3MsIGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVF1ZXJ5UGFyYW1zKHBhcmFtcykge1xuICAgICAgICB2YXIgcGFpcnMgPSBkZWNvZGVVUkkocGFyYW1zLnNwbGl0KCcjJylbMF0pLnNwbGl0KCcmJyk7XG4gICAgICAgIHZhciBvYmogPSB7fSwgcDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbiA9IHBhaXJzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgaWYgKCFwYWlyc1tpXSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwID0gcGFpcnNbaV0uc3BsaXQoJz0nKTtcbiAgICAgICAgICAgIG9ialtwWzBdXSA9IHBbMV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZFF1ZXJ5UGFyYW1zKHVybCwgcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB1cmwgKyAodXJsLmluZGV4T2YoJz8nKSA+IC0xID8gJyYnIDogJz8nKSArICQucGFyYW0ocGFyYW1zKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2Zlckhhc2gob3JpZ2luYWxVcmwsIG5ld1VybCkge1xuICAgICAgICB2YXIgcG9zID0gb3JpZ2luYWxVcmwuaW5kZXhPZignIycpO1xuXG4gICAgICAgIGlmICgtMSA9PT0gcG9zKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3VXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvcyA+IDApIHtcbiAgICAgICAgICAgIG9yaWdpbmFsVXJsID0gb3JpZ2luYWxVcmwuc3Vic3RyKHBvcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3VXJsICsgb3JpZ2luYWxVcmw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXJyb3IobXNnKSB7XG4gICAgICAgIHJldHVybiAkKCc8c3BhbiBjbGFzcz1cImxpdHktZXJyb3JcIi8+JykuYXBwZW5kKG1zZyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW1hZ2VIYW5kbGVyKHRhcmdldCwgaW5zdGFuY2UpIHtcbiAgICAgICAgdmFyIGRlc2MgPSAoaW5zdGFuY2Uub3BlbmVyKCkgJiYgaW5zdGFuY2Uub3BlbmVyKCkuZGF0YSgnbGl0eS1kZXNjJykpIHx8ICdJbWFnZSB3aXRoIG5vIGRlc2NyaXB0aW9uJztcbiAgICAgICAgdmFyIGltZyA9ICQoJzxpbWcgc3JjPVwiJyArIHRhcmdldCArICdcIiBhbHQ9XCInICsgZGVzYyArICdcIi8+Jyk7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IF9kZWZlcnJlZCgpO1xuICAgICAgICB2YXIgZmFpbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXJyb3IoJ0ZhaWxlZCBsb2FkaW5nIGltYWdlJykpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGltZ1xuICAgICAgICAgICAgLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmF0dXJhbFdpZHRoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWlsZWQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGltZyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdlcnJvcicsIGZhaWxlZClcbiAgICAgICAgO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfVxuXG4gICAgaW1hZ2VIYW5kbGVyLnRlc3QgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIF9pbWFnZVJlZ2V4cC50ZXN0KHRhcmdldCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGlubGluZUhhbmRsZXIodGFyZ2V0LCBpbnN0YW5jZSkge1xuICAgICAgICB2YXIgZWwsIHBsYWNlaG9sZGVyLCBoYXNIaWRlQ2xhc3M7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGVsID0gJCh0YXJnZXQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWVsLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcGxhY2Vob2xkZXIgPSAkKCc8aSBzdHlsZT1cImRpc3BsYXk6bm9uZSAhaW1wb3J0YW50XCIvPicpO1xuICAgICAgICBoYXNIaWRlQ2xhc3MgPSBlbC5oYXNDbGFzcygnbGl0eS1oaWRlJyk7XG5cbiAgICAgICAgaW5zdGFuY2VcbiAgICAgICAgICAgIC5lbGVtZW50KClcbiAgICAgICAgICAgIC5vbmUoJ2xpdHk6cmVtb3ZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgICAgICAgLmJlZm9yZShlbClcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhhc0hpZGVDbGFzcyAmJiAhZWwuY2xvc2VzdCgnLmxpdHktY29udGVudCcpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBlbC5hZGRDbGFzcygnbGl0eS1oaWRlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgO1xuXG4gICAgICAgIHJldHVybiBlbFxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdsaXR5LWhpZGUnKVxuICAgICAgICAgICAgLmFmdGVyKHBsYWNlaG9sZGVyKVxuICAgICAgICA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24geW91dHViZUhhbmRsZXIodGFyZ2V0KSB7XG4gICAgICAgIHZhciBtYXRjaGVzID0gX3lvdXR1YmVSZWdleC5leGVjKHRhcmdldCk7XG5cbiAgICAgICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaWZyYW1lSGFuZGxlcihcbiAgICAgICAgICAgIHRyYW5zZmVySGFzaChcbiAgICAgICAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgICAgICAgYXBwZW5kUXVlcnlQYXJhbXMoXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL3d3dy55b3V0dWJlJyArIChtYXRjaGVzWzJdIHx8ICcnKSArICcuY29tL2VtYmVkLycgKyBtYXRjaGVzWzRdLFxuICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZChcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogMVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlUXVlcnlQYXJhbXMobWF0Y2hlc1s1XSB8fCAnJylcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2aW1lb0hhbmRsZXIodGFyZ2V0KSB7XG4gICAgICAgIHZhciBtYXRjaGVzID0gX3ZpbWVvUmVnZXguZXhlYyh0YXJnZXQpO1xuXG4gICAgICAgIGlmICghbWF0Y2hlcykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlmcmFtZUhhbmRsZXIoXG4gICAgICAgICAgICB0cmFuc2Zlckhhc2goXG4gICAgICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgICAgIGFwcGVuZFF1ZXJ5UGFyYW1zKFxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9wbGF5ZXIudmltZW8uY29tL3ZpZGVvLycgKyBtYXRjaGVzWzNdLFxuICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZChcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogMVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlUXVlcnlQYXJhbXMobWF0Y2hlc1s0XSB8fCAnJylcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmYWNlYm9va3ZpZGVvSGFuZGxlcih0YXJnZXQpIHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBfZmFjZWJvb2t2aWRlb1JlZ2V4LmV4ZWModGFyZ2V0KTtcblxuICAgICAgICBpZiAoIW1hdGNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgwICE9PSB0YXJnZXQuaW5kZXhPZignaHR0cCcpKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSAnaHR0cHM6JyArIHRhcmdldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpZnJhbWVIYW5kbGVyKFxuICAgICAgICAgICAgdHJhbnNmZXJIYXNoKFxuICAgICAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgICAgICBhcHBlbmRRdWVyeVBhcmFtcyhcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9wbHVnaW5zL3ZpZGVvLnBocD9ocmVmPScgKyB0YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VRdWVyeVBhcmFtcyhtYXRjaGVzWzRdIHx8ICcnKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdvb2dsZW1hcHNIYW5kbGVyKHRhcmdldCkge1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IF9nb29nbGVtYXBzUmVnZXguZXhlYyh0YXJnZXQpO1xuXG4gICAgICAgIGlmICghbWF0Y2hlcykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlmcmFtZUhhbmRsZXIoXG4gICAgICAgICAgICB0cmFuc2Zlckhhc2goXG4gICAgICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgICAgIGFwcGVuZFF1ZXJ5UGFyYW1zKFxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly93d3cuZ29vZ2xlLicgKyBtYXRjaGVzWzNdICsgJy9tYXBzPycgKyBtYXRjaGVzWzZdLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQ6IG1hdGNoZXNbNl0uaW5kZXhPZignbGF5ZXI9YycpID4gMCA/ICdzdmVtYmVkJyA6ICdlbWJlZCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpZnJhbWVIYW5kbGVyKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJsaXR5LWlmcmFtZS1jb250YWluZXJcIj48aWZyYW1lIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93ZnVsbHNjcmVlbiBzcmM9XCInICsgdGFyZ2V0ICsgJ1wiLz48L2Rpdj4nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdpbkhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICAgICAgICAgID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuICAgICAgICAgICAgOiBNYXRoLnJvdW5kKF93aW4uaGVpZ2h0KCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGtleWRvd24oZSkge1xuICAgICAgICB2YXIgY3VycmVudCA9IGN1cnJlbnRJbnN0YW5jZSgpO1xuXG4gICAgICAgIGlmICghY3VycmVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRVNDIGtleVxuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAyNyAmJiAhIWN1cnJlbnQub3B0aW9ucygnZXNjJykpIHtcbiAgICAgICAgICAgIGN1cnJlbnQuY2xvc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRBQiBrZXlcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gOSkge1xuICAgICAgICAgICAgaGFuZGxlVGFiS2V5KGUsIGN1cnJlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlVGFiS2V5KGUsIGluc3RhbmNlKSB7XG4gICAgICAgIHZhciBmb2N1c2FibGVFbGVtZW50cyA9IGluc3RhbmNlLmVsZW1lbnQoKS5maW5kKF9mb2N1c2FibGVFbGVtZW50c1NlbGVjdG9yKTtcbiAgICAgICAgdmFyIGZvY3VzZWRJbmRleCA9IGZvY3VzYWJsZUVsZW1lbnRzLmluZGV4KGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChlLnNoaWZ0S2V5ICYmIGZvY3VzZWRJbmRleCA8PSAwKSB7XG4gICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50cy5nZXQoZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMSkuZm9jdXMoKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmICghZS5zaGlmdEtleSAmJiBmb2N1c2VkSW5kZXggPT09IGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzLmdldCgwKS5mb2N1cygpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzaXplKCkge1xuICAgICAgICAkLmVhY2goX2luc3RhbmNlcywgZnVuY3Rpb24oaSwgaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnJlc2l6ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWdpc3Rlckluc3RhbmNlKGluc3RhbmNlVG9SZWdpc3Rlcikge1xuICAgICAgICBpZiAoMSA9PT0gX2luc3RhbmNlcy51bnNoaWZ0KGluc3RhbmNlVG9SZWdpc3RlcikpIHtcbiAgICAgICAgICAgIF9odG1sLmFkZENsYXNzKCdsaXR5LWFjdGl2ZScpO1xuXG4gICAgICAgICAgICBfd2luXG4gICAgICAgICAgICAgICAgLm9uKHtcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplOiByZXNpemUsXG4gICAgICAgICAgICAgICAgICAgIGtleWRvd246IGtleWRvd25cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnYm9keSA+IConKS5ub3QoaW5zdGFuY2VUb1JlZ2lzdGVyLmVsZW1lbnQoKSlcbiAgICAgICAgICAgIC5hZGRDbGFzcygnbGl0eS1oaWRkZW4nKVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgICAgIGlmICh1bmRlZmluZWQgIT09IGVsLmRhdGEoX2RhdGFBcmlhSGlkZGVuKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWwuZGF0YShfZGF0YUFyaWFIaWRkZW4sIGVsLmF0dHIoX2F0dHJBcmlhSGlkZGVuKSB8fCBudWxsKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cihfYXR0ckFyaWFIaWRkZW4sICd0cnVlJylcbiAgICAgICAgO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUluc3RhbmNlKGluc3RhbmNlVG9SZW1vdmUpIHtcbiAgICAgICAgdmFyIHNob3c7XG5cbiAgICAgICAgaW5zdGFuY2VUb1JlbW92ZVxuICAgICAgICAgICAgLmVsZW1lbnQoKVxuICAgICAgICAgICAgLmF0dHIoX2F0dHJBcmlhSGlkZGVuLCAndHJ1ZScpXG4gICAgICAgIDtcblxuICAgICAgICBpZiAoMSA9PT0gX2luc3RhbmNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIF9odG1sLnJlbW92ZUNsYXNzKCdsaXR5LWFjdGl2ZScpO1xuXG4gICAgICAgICAgICBfd2luXG4gICAgICAgICAgICAgICAgLm9mZih7XG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZTogcmVzaXplLFxuICAgICAgICAgICAgICAgICAgICBrZXlkb3duOiBrZXlkb3duXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDtcbiAgICAgICAgfVxuXG4gICAgICAgIF9pbnN0YW5jZXMgPSAkLmdyZXAoX2luc3RhbmNlcywgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZVRvUmVtb3ZlICE9PSBpbnN0YW5jZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCEhX2luc3RhbmNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNob3cgPSBfaW5zdGFuY2VzWzBdLmVsZW1lbnQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNob3cgPSAkKCcubGl0eS1oaWRkZW4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNob3dcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnbGl0eS1oaWRkZW4nKVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsID0gJCh0aGlzKSwgb2xkQXR0ciA9IGVsLmRhdGEoX2RhdGFBcmlhSGlkZGVuKTtcblxuICAgICAgICAgICAgICAgIGlmICghb2xkQXR0cikge1xuICAgICAgICAgICAgICAgICAgICBlbC5yZW1vdmVBdHRyKF9hdHRyQXJpYUhpZGRlbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWwuYXR0cihfYXR0ckFyaWFIaWRkZW4sIG9sZEF0dHIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsLnJlbW92ZURhdGEoX2RhdGFBcmlhSGlkZGVuKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjdXJyZW50SW5zdGFuY2UoKSB7XG4gICAgICAgIGlmICgwID09PSBfaW5zdGFuY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gX2luc3RhbmNlc1swXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmYWN0b3J5KHRhcmdldCwgaW5zdGFuY2UsIGhhbmRsZXJzLCBwcmVmZXJyZWRIYW5kbGVyKSB7XG4gICAgICAgIHZhciBoYW5kbGVyID0gJ2lubGluZScsIGNvbnRlbnQ7XG5cbiAgICAgICAgdmFyIGN1cnJlbnRIYW5kbGVycyA9ICQuZXh0ZW5kKHt9LCBoYW5kbGVycyk7XG5cbiAgICAgICAgaWYgKHByZWZlcnJlZEhhbmRsZXIgJiYgY3VycmVudEhhbmRsZXJzW3ByZWZlcnJlZEhhbmRsZXJdKSB7XG4gICAgICAgICAgICBjb250ZW50ID0gY3VycmVudEhhbmRsZXJzW3ByZWZlcnJlZEhhbmRsZXJdKHRhcmdldCwgaW5zdGFuY2UpO1xuICAgICAgICAgICAgaGFuZGxlciA9IHByZWZlcnJlZEhhbmRsZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBSdW4gaW5saW5lIGFuZCBpZnJhbWUgaGFuZGxlcnMgYWZ0ZXIgYWxsIG90aGVyIGhhbmRsZXJzXG4gICAgICAgICAgICAkLmVhY2goWydpbmxpbmUnLCAnaWZyYW1lJ10sIGZ1bmN0aW9uKGksIG5hbWUpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgY3VycmVudEhhbmRsZXJzW25hbWVdO1xuXG4gICAgICAgICAgICAgICAgY3VycmVudEhhbmRsZXJzW25hbWVdID0gaGFuZGxlcnNbbmFtZV07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJC5lYWNoKGN1cnJlbnRIYW5kbGVycywgZnVuY3Rpb24obmFtZSwgY3VycmVudEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGVyIG1pZ2h0IGJlIFwicmVtb3ZlZFwiIGJ5IHNldHRpbmcgY2FsbGJhY2sgdG8gbnVsbFxuICAgICAgICAgICAgICAgIGlmICghY3VycmVudEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50SGFuZGxlci50ZXN0ICYmXG4gICAgICAgICAgICAgICAgICAgICFjdXJyZW50SGFuZGxlci50ZXN0KHRhcmdldCwgaW5zdGFuY2UpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBjdXJyZW50SGFuZGxlcih0YXJnZXQsIGluc3RhbmNlKTtcblxuICAgICAgICAgICAgICAgIGlmIChmYWxzZSAhPT0gY29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyID0gbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtoYW5kbGVyOiBoYW5kbGVyLCBjb250ZW50OiBjb250ZW50IHx8ICcnfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBMaXR5KHRhcmdldCwgb3B0aW9ucywgb3BlbmVyLCBhY3RpdmVFbGVtZW50KSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgdmFyIGlzUmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdmFyIGlzQ2xvc2VkID0gZmFsc2U7XG4gICAgICAgIHZhciBlbGVtZW50O1xuICAgICAgICB2YXIgY29udGVudDtcblxuICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoXG4gICAgICAgICAgICB7fSxcbiAgICAgICAgICAgIF9kZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgKTtcblxuICAgICAgICBlbGVtZW50ID0gJChvcHRpb25zLnRlbXBsYXRlKTtcblxuICAgICAgICAvLyAtLSBBUEkgLS1cblxuICAgICAgICBzZWxmLmVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYub3BlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gb3BlbmVyO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNlbGYub3B0aW9ucyAgPSAkLnByb3h5KHNldHRpbmdzLCBzZWxmLCBvcHRpb25zKTtcbiAgICAgICAgc2VsZi5oYW5kbGVycyA9ICQucHJveHkoc2V0dGluZ3MsIHNlbGYsIG9wdGlvbnMuaGFuZGxlcnMpO1xuXG4gICAgICAgIHNlbGYucmVzaXplID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIWlzUmVhZHkgfHwgaXNDbG9zZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRlbnRcbiAgICAgICAgICAgICAgICAuY3NzKCdtYXgtaGVpZ2h0Jywgd2luSGVpZ2h0KCkgKyAncHgnKVxuICAgICAgICAgICAgICAgIC50cmlnZ2VyKCdsaXR5OnJlc2l6ZScsIFtzZWxmXSlcbiAgICAgICAgICAgIDtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIWlzUmVhZHkgfHwgaXNDbG9zZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlzQ2xvc2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgcmVtb3ZlSW5zdGFuY2Uoc2VsZik7XG5cbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IF9kZWZlcnJlZCgpO1xuXG4gICAgICAgICAgICAvLyBXZSByZXR1cm4gZm9jdXMgb25seSBpZiB0aGUgY3VycmVudCBmb2N1cyBpcyBpbnNpZGUgdGhpcyBpbnN0YW5jZVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGFjdGl2ZUVsZW1lbnQgJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGVsZW1lbnRbMF0gfHxcbiAgICAgICAgICAgICAgICAgICAgJC5jb250YWlucyhlbGVtZW50WzBdLCBkb2N1bWVudC5hY3RpdmVFbGVtZW50KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElnbm9yZSBleGNlcHRpb25zLCBlZy4gZm9yIFNWRyBlbGVtZW50cyB3aGljaCBjYW4ndCBiZVxuICAgICAgICAgICAgICAgICAgICAvLyBmb2N1c2VkIGluIElFMTFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRlbnQudHJpZ2dlcignbGl0eTpjbG9zZScsIFtzZWxmXSk7XG5cbiAgICAgICAgICAgIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xpdHktb3BlbmVkJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2xpdHktY2xvc2VkJylcbiAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgdHJhbnNpdGlvbkVuZChjb250ZW50LmFkZChlbGVtZW50KSlcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50LnRyaWdnZXIoJ2xpdHk6cmVtb3ZlJywgW3NlbGZdKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gLS0gSW5pdGlhbGl6YXRpb24gLS1cblxuICAgICAgICByZXN1bHQgPSBmYWN0b3J5KHRhcmdldCwgc2VsZiwgb3B0aW9ucy5oYW5kbGVycywgb3B0aW9ucy5oYW5kbGVyKTtcblxuICAgICAgICBlbGVtZW50XG4gICAgICAgICAgICAuYXR0cihfYXR0ckFyaWFIaWRkZW4sICdmYWxzZScpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2xpdHktbG9hZGluZyBsaXR5LW9wZW5lZCBsaXR5LScgKyByZXN1bHQuaGFuZGxlcilcbiAgICAgICAgICAgIC5hcHBlbmRUbygnYm9keScpXG4gICAgICAgICAgICAuZm9jdXMoKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsICdbZGF0YS1saXR5LWNsb3NlXScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuaXMoJ1tkYXRhLWxpdHktY2xvc2VdJykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudHJpZ2dlcignbGl0eTpvcGVuJywgW3NlbGZdKVxuICAgICAgICA7XG5cbiAgICAgICAgcmVnaXN0ZXJJbnN0YW5jZShzZWxmKTtcblxuICAgICAgICAkLndoZW4ocmVzdWx0LmNvbnRlbnQpXG4gICAgICAgICAgICAuYWx3YXlzKHJlYWR5KVxuICAgICAgICA7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVhZHkocmVzdWx0KSB7XG4gICAgICAgICAgICBjb250ZW50ID0gJChyZXN1bHQpXG4gICAgICAgICAgICAgICAgLmNzcygnbWF4LWhlaWdodCcsIHdpbkhlaWdodCgpICsgJ3B4JylcbiAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgZWxlbWVudFxuICAgICAgICAgICAgICAgIC5maW5kKCcubGl0eS1sb2FkZXInKVxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbG9hZGVyID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uRW5kKGxvYWRlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xpdHktbG9hZGluZycpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5saXR5LWNvbnRlbnQnKVxuICAgICAgICAgICAgICAgIC5lbXB0eSgpXG4gICAgICAgICAgICAgICAgLmFwcGVuZChjb250ZW50KVxuICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBpc1JlYWR5ID0gdHJ1ZTtcblxuICAgICAgICAgICAgY29udGVudFxuICAgICAgICAgICAgICAgIC50cmlnZ2VyKCdsaXR5OnJlYWR5JywgW3NlbGZdKVxuICAgICAgICAgICAgO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGl0eSh0YXJnZXQsIG9wdGlvbnMsIG9wZW5lcikge1xuICAgICAgICBpZiAoIXRhcmdldC5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgb3BlbmVyID0gJChvcGVuZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBvcGVuZXIgPSAkKHRoaXMpO1xuICAgICAgICAgICAgdGFyZ2V0ID0gb3BlbmVyLmRhdGEoJ2xpdHktdGFyZ2V0JykgfHwgb3BlbmVyLmF0dHIoJ2hyZWYnKSB8fCBvcGVuZXIuYXR0cignc3JjJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgTGl0eShcbiAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgICQuZXh0ZW5kKFxuICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgIG9wZW5lci5kYXRhKCdsaXR5LW9wdGlvbnMnKSB8fCBvcGVuZXIuZGF0YSgnbGl0eScpLFxuICAgICAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBvcGVuZXIsXG4gICAgICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCF0YXJnZXQucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxpdHkudmVyc2lvbiAgPSAnMi4zLjEnO1xuICAgIGxpdHkub3B0aW9ucyAgPSAkLnByb3h5KHNldHRpbmdzLCBsaXR5LCBfZGVmYXVsdE9wdGlvbnMpO1xuICAgIGxpdHkuaGFuZGxlcnMgPSAkLnByb3h5KHNldHRpbmdzLCBsaXR5LCBfZGVmYXVsdE9wdGlvbnMuaGFuZGxlcnMpO1xuICAgIGxpdHkuY3VycmVudCAgPSBjdXJyZW50SW5zdGFuY2U7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2subGl0eScsICdbZGF0YS1saXR5XScsIGxpdHkpO1xuXG4gICAgcmV0dXJuIGxpdHk7XG59KSk7XG4iLCIvKiFcbiAqIEphdmFTY3JpcHQgQ29va2llIHYyLjIuMFxuICogaHR0cHM6Ly9naXRodWIuY29tL2pzLWNvb2tpZS9qcy1jb29raWVcbiAqXG4gKiBDb3B5cmlnaHQgMjAwNiwgMjAxNSBLbGF1cyBIYXJ0bCAmIEZhZ25lciBCcmFja1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbjsoZnVuY3Rpb24gKGZhY3RvcnkpIHtcblx0dmFyIHJlZ2lzdGVyZWRJbk1vZHVsZUxvYWRlciA9IGZhbHNlO1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKGZhY3RvcnkpO1xuXHRcdHJlZ2lzdGVyZWRJbk1vZHVsZUxvYWRlciA9IHRydWU7XG5cdH1cblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRcdHJlZ2lzdGVyZWRJbk1vZHVsZUxvYWRlciA9IHRydWU7XG5cdH1cblx0aWYgKCFyZWdpc3RlcmVkSW5Nb2R1bGVMb2FkZXIpIHtcblx0XHR2YXIgT2xkQ29va2llcyA9IHdpbmRvdy5Db29raWVzO1xuXHRcdHZhciBhcGkgPSB3aW5kb3cuQ29va2llcyA9IGZhY3RvcnkoKTtcblx0XHRhcGkubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHdpbmRvdy5Db29raWVzID0gT2xkQ29va2llcztcblx0XHRcdHJldHVybiBhcGk7XG5cdFx0fTtcblx0fVxufShmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIGV4dGVuZCAoKSB7XG5cdFx0dmFyIGkgPSAwO1xuXHRcdHZhciByZXN1bHQgPSB7fTtcblx0XHRmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGF0dHJpYnV0ZXMgPSBhcmd1bWVudHNbIGkgXTtcblx0XHRcdGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdHJlc3VsdFtrZXldID0gYXR0cmlidXRlc1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZnVuY3Rpb24gaW5pdCAoY29udmVydGVyKSB7XG5cdFx0ZnVuY3Rpb24gYXBpIChrZXksIHZhbHVlLCBhdHRyaWJ1dGVzKSB7XG5cdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0aWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBXcml0ZVxuXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0YXR0cmlidXRlcyA9IGV4dGVuZCh7XG5cdFx0XHRcdFx0cGF0aDogJy8nXG5cdFx0XHRcdH0sIGFwaS5kZWZhdWx0cywgYXR0cmlidXRlcyk7XG5cblx0XHRcdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzLmV4cGlyZXMgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdFx0dmFyIGV4cGlyZXMgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0XHRcdGV4cGlyZXMuc2V0TWlsbGlzZWNvbmRzKGV4cGlyZXMuZ2V0TWlsbGlzZWNvbmRzKCkgKyBhdHRyaWJ1dGVzLmV4cGlyZXMgKiA4NjRlKzUpO1xuXHRcdFx0XHRcdGF0dHJpYnV0ZXMuZXhwaXJlcyA9IGV4cGlyZXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBXZSdyZSB1c2luZyBcImV4cGlyZXNcIiBiZWNhdXNlIFwibWF4LWFnZVwiIGlzIG5vdCBzdXBwb3J0ZWQgYnkgSUVcblx0XHRcdFx0YXR0cmlidXRlcy5leHBpcmVzID0gYXR0cmlidXRlcy5leHBpcmVzID8gYXR0cmlidXRlcy5leHBpcmVzLnRvVVRDU3RyaW5nKCkgOiAnJztcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHJlc3VsdCA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcblx0XHRcdFx0XHRpZiAoL15bXFx7XFxbXS8udGVzdChyZXN1bHQpKSB7XG5cdFx0XHRcdFx0XHR2YWx1ZSA9IHJlc3VsdDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cblx0XHRcdFx0aWYgKCFjb252ZXJ0ZXIud3JpdGUpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcodmFsdWUpKVxuXHRcdFx0XHRcdFx0LnJlcGxhY2UoLyUoMjN8MjR8MjZ8MkJ8M0F8M0N8M0V8M0R8MkZ8M0Z8NDB8NUJ8NUR8NUV8NjB8N0J8N0R8N0MpL2csIGRlY29kZVVSSUNvbXBvbmVudCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBjb252ZXJ0ZXIud3JpdGUodmFsdWUsIGtleSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRrZXkgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGtleSkpO1xuXHRcdFx0XHRrZXkgPSBrZXkucmVwbGFjZSgvJSgyM3wyNHwyNnwyQnw1RXw2MHw3QykvZywgZGVjb2RlVVJJQ29tcG9uZW50KTtcblx0XHRcdFx0a2V5ID0ga2V5LnJlcGxhY2UoL1tcXChcXCldL2csIGVzY2FwZSk7XG5cblx0XHRcdFx0dmFyIHN0cmluZ2lmaWVkQXR0cmlidXRlcyA9ICcnO1xuXG5cdFx0XHRcdGZvciAodmFyIGF0dHJpYnV0ZU5hbWUgaW4gYXR0cmlidXRlcykge1xuXHRcdFx0XHRcdGlmICghYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSkge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHN0cmluZ2lmaWVkQXR0cmlidXRlcyArPSAnOyAnICsgYXR0cmlidXRlTmFtZTtcblx0XHRcdFx0XHRpZiAoYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHN0cmluZ2lmaWVkQXR0cmlidXRlcyArPSAnPScgKyBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAoZG9jdW1lbnQuY29va2llID0ga2V5ICsgJz0nICsgdmFsdWUgKyBzdHJpbmdpZmllZEF0dHJpYnV0ZXMpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZWFkXG5cblx0XHRcdGlmICgha2V5KSB7XG5cdFx0XHRcdHJlc3VsdCA9IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUbyBwcmV2ZW50IHRoZSBmb3IgbG9vcCBpbiB0aGUgZmlyc3QgcGxhY2UgYXNzaWduIGFuIGVtcHR5IGFycmF5XG5cdFx0XHQvLyBpbiBjYXNlIHRoZXJlIGFyZSBubyBjb29raWVzIGF0IGFsbC4gQWxzbyBwcmV2ZW50cyBvZGQgcmVzdWx0IHdoZW5cblx0XHRcdC8vIGNhbGxpbmcgXCJnZXQoKVwiXG5cdFx0XHR2YXIgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZSA/IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKSA6IFtdO1xuXHRcdFx0dmFyIHJkZWNvZGUgPSAvKCVbMC05QS1aXXsyfSkrL2c7XG5cdFx0XHR2YXIgaSA9IDA7XG5cblx0XHRcdGZvciAoOyBpIDwgY29va2llcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgcGFydHMgPSBjb29raWVzW2ldLnNwbGl0KCc9Jyk7XG5cdFx0XHRcdHZhciBjb29raWUgPSBwYXJ0cy5zbGljZSgxKS5qb2luKCc9Jyk7XG5cblx0XHRcdFx0aWYgKCF0aGlzLmpzb24gJiYgY29va2llLmNoYXJBdCgwKSA9PT0gJ1wiJykge1xuXHRcdFx0XHRcdGNvb2tpZSA9IGNvb2tpZS5zbGljZSgxLCAtMSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHZhciBuYW1lID0gcGFydHNbMF0ucmVwbGFjZShyZGVjb2RlLCBkZWNvZGVVUklDb21wb25lbnQpO1xuXHRcdFx0XHRcdGNvb2tpZSA9IGNvbnZlcnRlci5yZWFkID9cblx0XHRcdFx0XHRcdGNvbnZlcnRlci5yZWFkKGNvb2tpZSwgbmFtZSkgOiBjb252ZXJ0ZXIoY29va2llLCBuYW1lKSB8fFxuXHRcdFx0XHRcdFx0Y29va2llLnJlcGxhY2UocmRlY29kZSwgZGVjb2RlVVJJQ29tcG9uZW50KTtcblxuXHRcdFx0XHRcdGlmICh0aGlzLmpzb24pIHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdGNvb2tpZSA9IEpTT04ucGFyc2UoY29va2llKTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGtleSA9PT0gbmFtZSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gY29va2llO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKCFrZXkpIHtcblx0XHRcdFx0XHRcdHJlc3VsdFtuYW1lXSA9IGNvb2tpZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0YXBpLnNldCA9IGFwaTtcblx0XHRhcGkuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0cmV0dXJuIGFwaS5jYWxsKGFwaSwga2V5KTtcblx0XHR9O1xuXHRcdGFwaS5nZXRKU09OID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGFwaS5hcHBseSh7XG5cdFx0XHRcdGpzb246IHRydWVcblx0XHRcdH0sIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG5cdFx0fTtcblx0XHRhcGkuZGVmYXVsdHMgPSB7fTtcblxuXHRcdGFwaS5yZW1vdmUgPSBmdW5jdGlvbiAoa2V5LCBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRhcGkoa2V5LCAnJywgZXh0ZW5kKGF0dHJpYnV0ZXMsIHtcblx0XHRcdFx0ZXhwaXJlczogLTFcblx0XHRcdH0pKTtcblx0XHR9O1xuXG5cdFx0YXBpLndpdGhDb252ZXJ0ZXIgPSBpbml0O1xuXG5cdFx0cmV0dXJuIGFwaTtcblx0fVxuXG5cdHJldHVybiBpbml0KGZ1bmN0aW9uICgpIHt9KTtcbn0pKTtcbiIsIi8qXG4gKiBTbGlua3lcbiAqIEEgbGlnaHQtd2VpZ2h0LCByZXNwb25zaXZlLCBtb2JpbGUtbGlrZSBuYXZpZ2F0aW9uIG1lbnUgcGx1Z2luIGZvciBqUXVlcnlcbiAqIEJ1aWx0IGJ5IEFsaSBaYWhpZCA8YWxpLnphaGlkQGxpdmUuY29tPlxuICogUHVibGlzaGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5cbjsoZnVuY3Rpb24oJClcbntcbiAgICB2YXIgbGFzdENsaWNrO1xuXG4gICAgJC5mbi5zbGlua3kgPSBmdW5jdGlvbihvcHRpb25zKVxuICAgIHtcbiAgICAgICAgdmFyIHNldHRpbmdzID0gJC5leHRlbmRcbiAgICAgICAgKHtcbiAgICAgICAgICAgIGxhYmVsOiAnQmFjaycsXG4gICAgICAgICAgICB0aXRsZTogZmFsc2UsXG4gICAgICAgICAgICBzcGVlZDogMzAwLFxuICAgICAgICAgICAgcmVzaXplOiB0cnVlLFxuICAgICAgICAgICAgYWN0aXZlQ2xhc3M6ICdhY3RpdmUnLFxuICAgICAgICAgICAgaGVhZGVyQ2xhc3M6ICdoZWFkZXInLFxuICAgICAgICAgICAgaGVhZGluZ1RhZzogJzxoMj4nLFxuICAgICAgICAgICAgYmFja0ZpcnN0OiBmYWxzZSxcbiAgICAgICAgfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgdmFyIG1lbnUgPSAkKHRoaXMpLFxuICAgICAgICAgICAgcm9vdCA9IG1lbnUuY2hpbGRyZW4oKS5maXJzdCgpO1xuXG4gICAgICAgIG1lbnUuYWRkQ2xhc3MoJ3NsaW5reS1tZW51Jyk7XG5cbiAgICAgICAgdmFyIG1vdmUgPSBmdW5jdGlvbihkZXB0aCwgY2FsbGJhY2spXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBsZWZ0ID0gTWF0aC5yb3VuZChwYXJzZUludChyb290LmdldCgwKS5zdHlsZS5sZWZ0KSkgfHwgMDtcblxuICAgICAgICAgICAgcm9vdC5jc3MoJ2xlZnQnLCBsZWZ0IC0gKGRlcHRoICogMTAwKSArICclJyk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChjYWxsYmFjaywgc2V0dGluZ3Muc3BlZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciByZXNpemUgPSBmdW5jdGlvbihjb250ZW50KVxuICAgICAgICB7XG4gICAgICAgICAgICBtZW51LmhlaWdodChjb250ZW50Lm91dGVySGVpZ2h0KCkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB0cmFuc2l0aW9uID0gZnVuY3Rpb24oc3BlZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIG1lbnUuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgc3BlZWQgKyAnbXMnKTtcbiAgICAgICAgICAgIHJvb3QuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgc3BlZWQgKyAnbXMnKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0cmFuc2l0aW9uKHNldHRpbmdzLnNwZWVkKTtcblxuICAgICAgICAkKCdhICsgdWwnLCBtZW51KS5wcmV2KCkuYWRkQ2xhc3MoJ25leHQnKTtcblxuICAgICAgICAkKCdsaSA+IHVsJywgbWVudSkucHJlcGVuZCgnPGxpIGNsYXNzPVwiJyArIHNldHRpbmdzLmhlYWRlckNsYXNzICsgJ1wiPicpO1xuXG4gICAgICAgIGlmIChzZXR0aW5ncy50aXRsZSA9PT0gdHJ1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgJCgnbGkgPiB1bCcsIG1lbnUpLmVhY2goZnVuY3Rpb24oKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciAkbGluayA9ICQodGhpcykucGFyZW50KCkuZmluZCgnYScpLmZpcnN0KCksXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsID0gJGxpbmsudGV4dCgpLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZSA9ICQoJzxhPicpLmFkZENsYXNzKCd0aXRsZScpLnRleHQobGFiZWwpLmF0dHIoJ2hyZWYnLCAkbGluay5hdHRyKCdocmVmJykpO1xuXG4gICAgICAgICAgICAgICAgJCgnPiAuJyArIHNldHRpbmdzLmhlYWRlckNsYXNzLCB0aGlzKS5hcHBlbmQodGl0bGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNldHRpbmdzLnRpdGxlICYmIHNldHRpbmdzLmxhYmVsID09PSB0cnVlKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCdsaSA+IHVsJywgbWVudSkuZWFjaChmdW5jdGlvbigpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdhJykuZmlyc3QoKS50ZXh0KCksXG4gICAgICAgICAgICAgICAgICAgIGJhY2tMaW5rID0gJCgnPGE+JykudGV4dChsYWJlbCkucHJvcCgnaHJlZicsICcjJykuYWRkQ2xhc3MoJ2JhY2snKTtcblxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5iYWNrRmlyc3QpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAkKCc+IC4nICsgc2V0dGluZ3MuaGVhZGVyQ2xhc3MsIHRoaXMpLnByZXBlbmQoYmFja0xpbmspO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAkKCc+IC4nICsgc2V0dGluZ3MuaGVhZGVyQ2xhc3MsIHRoaXMpLmFwcGVuZChiYWNrTGluayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgYmFja0xpbmsgPSAkKCc8YT4nKS50ZXh0KHNldHRpbmdzLmxhYmVsKS5wcm9wKCdocmVmJywgJyMnKS5hZGRDbGFzcygnYmFjaycpO1xuXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuYmFja0ZpcnN0KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICQoJy4nICsgc2V0dGluZ3MuaGVhZGVyQ2xhc3MsIG1lbnUpLnByZXBlbmQoYmFja0xpbmspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICQoJy4nICsgc2V0dGluZ3MuaGVhZGVyQ2xhc3MsIG1lbnUpLmFwcGVuZChiYWNrTGluayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkKCdhJywgbWVudSkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKChsYXN0Q2xpY2sgKyBzZXR0aW5ncy5zcGVlZCkgPiBEYXRlLm5vdygpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGFzdENsaWNrID0gRGF0ZS5ub3coKTtcblxuICAgICAgICAgICAgdmFyIGEgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAoYS5oYXNDbGFzcygnbmV4dCcpIHx8IGEuaGFzQ2xhc3MoJ2JhY2snKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhLmhhc0NsYXNzKCduZXh0JykpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbWVudS5maW5kKCcuJyArIHNldHRpbmdzLmFjdGl2ZUNsYXNzKS5yZW1vdmVDbGFzcyhzZXR0aW5ncy5hY3RpdmVDbGFzcyk7XG5cbiAgICAgICAgICAgICAgICBhLm5leHQoKS5zaG93KCkuYWRkQ2xhc3Moc2V0dGluZ3MuYWN0aXZlQ2xhc3MpO1xuXG4gICAgICAgICAgICAgICAgbW92ZSgxKTtcblxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5yZXNpemUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXNpemUoYS5uZXh0KCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGEuaGFzQ2xhc3MoJ2JhY2snKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtb3ZlKC0xLCBmdW5jdGlvbigpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBtZW51LmZpbmQoJy4nICsgc2V0dGluZ3MuYWN0aXZlQ2xhc3MpLnJlbW92ZUNsYXNzKHNldHRpbmdzLmFjdGl2ZUNsYXNzKTtcblxuICAgICAgICAgICAgICAgICAgICBhLnBhcmVudCgpLnBhcmVudCgpLmhpZGUoKS5wYXJlbnRzVW50aWwobWVudSwgJ3VsJykuZmlyc3QoKS5hZGRDbGFzcyhzZXR0aW5ncy5hY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MucmVzaXplKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplKGEucGFyZW50KCkucGFyZW50KCkucGFyZW50c1VudGlsKG1lbnUsICd1bCcpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuanVtcCA9IGZ1bmN0aW9uKHRvLCBhbmltYXRlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0byA9ICQodG8pO1xuXG4gICAgICAgICAgICB2YXIgYWN0aXZlID0gbWVudS5maW5kKCcuJyArIHNldHRpbmdzLmFjdGl2ZUNsYXNzKTtcblxuICAgICAgICAgICAgaWYgKGFjdGl2ZS5sZW5ndGggPiAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGFjdGl2ZSA9IGFjdGl2ZS5wYXJlbnRzVW50aWwobWVudSwgJ3VsJykubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGFjdGl2ZSA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lbnUuZmluZCgndWwnKS5yZW1vdmVDbGFzcyhzZXR0aW5ncy5hY3RpdmVDbGFzcykuaGlkZSgpO1xuXG4gICAgICAgICAgICB2YXIgbWVudXMgPSB0by5wYXJlbnRzVW50aWwobWVudSwgJ3VsJyk7XG5cbiAgICAgICAgICAgIG1lbnVzLnNob3coKTtcbiAgICAgICAgICAgIHRvLnNob3coKS5hZGRDbGFzcyhzZXR0aW5ncy5hY3RpdmVDbGFzcyk7XG5cbiAgICAgICAgICAgIGlmIChhbmltYXRlID09PSBmYWxzZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uKDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtb3ZlKG1lbnVzLmxlbmd0aCAtIGFjdGl2ZSk7XG5cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5yZXNpemUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVzaXplKHRvKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFuaW1hdGUgPT09IGZhbHNlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb24oc2V0dGluZ3Muc3BlZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuaG9tZSA9IGZ1bmN0aW9uKGFuaW1hdGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChhbmltYXRlID09PSBmYWxzZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uKDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYWN0aXZlID0gbWVudS5maW5kKCcuJyArIHNldHRpbmdzLmFjdGl2ZUNsYXNzKSxcbiAgICAgICAgICAgICAgICBjb3VudCA9IGFjdGl2ZS5wYXJlbnRzVW50aWwobWVudSwgJ2xpJykubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAoY291bnQgPiAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1vdmUoLWNvdW50LCBmdW5jdGlvbigpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmUucmVtb3ZlQ2xhc3Moc2V0dGluZ3MuYWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLnJlc2l6ZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZSgkKGFjdGl2ZS5wYXJlbnRzVW50aWwobWVudSwgJ2xpJykuZ2V0KGNvdW50IC0gMSkpLnBhcmVudCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhbmltYXRlID09PSBmYWxzZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uKHNldHRpbmdzLnNwZWVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICAgICQoJy4nICsgc2V0dGluZ3MuaGVhZGVyQ2xhc3MsIG1lbnUpLnJlbW92ZSgpO1xuICAgICAgICAgICAgJCgnYScsIG1lbnUpLnJlbW92ZUNsYXNzKCduZXh0Jykub2ZmKCdjbGljaycpO1xuXG4gICAgICAgICAgICBtZW51LnJlbW92ZUNsYXNzKCdzbGlua3ktbWVudScpLmNzcygndHJhbnNpdGlvbi1kdXJhdGlvbicsICcnKTtcbiAgICAgICAgICAgIHJvb3QuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgJycpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBhY3RpdmUgPSBtZW51LmZpbmQoJy4nICsgc2V0dGluZ3MuYWN0aXZlQ2xhc3MpO1xuXG4gICAgICAgIGlmIChhY3RpdmUubGVuZ3RoID4gMClcbiAgICAgICAge1xuICAgICAgICAgICAgYWN0aXZlLnJlbW92ZUNsYXNzKHNldHRpbmdzLmFjdGl2ZUNsYXNzKTtcblxuICAgICAgICAgICAgdGhpcy5qdW1wKGFjdGl2ZSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbn0oalF1ZXJ5KSk7XG4iLCIvLy8vIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8vLyB8IEhlYWRlclxuLy8vLyB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGhlYWRlciA9IChmdW5jdGlvbiAoJCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBwdWIgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIEluc3RhbnRpYXRlXG4gICAgICovXG4gICAgcHViLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlZ2lzdGVyQm9vdEV2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgcmVnaXN0ZXJFdmVudEhhbmRsZXJzKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGJvb3QgZXZlbnQgaGFuZGxlcnMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJCb290RXZlbnRIYW5kbGVycygpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBldmVudCBoYW5kbGVycy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZWdpc3RlckV2ZW50SGFuZGxlcnMoKSB7XG4gICAgICAgIC8vIEFkZCBzdWJtZW51IG9wZW4vY2xvc2UgYmVoYXZpb3IuXG4gICAgICAgICQoJy5oZWFkZXJ3cmFwcGVyLWlubmVyIC5uYXZiYXItbmF2ID4gbGkuZXhwYW5kZWQnKS5ob3ZlcihcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdvcGVuJykuY2hpbGRyZW4oJ2EnKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnb3BlbicpLmNoaWxkcmVuKCdhJykuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICApLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgLy8gRGlzYWJsZSBvdGhlciBldmVudCBsaXN0ZW5lcnMuXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIC8vIFJlc3RvcmUgZGVmYXVsdCBsaW5rIGJlaGF2aW91ci5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9TbW9vdGggc2Nyb2xsIHRvICNtYWluLWNvbnRlbnRcbiAgICAgICAgJChcIiNzY3JvbGwtZG93bi1saW5rXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKFwiI21haW4tY29udGVudFwiKS5vZmZzZXQoKS50b3BcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3VzdG9tIGJhY2tzdHJldGNoIGJlaGF2aW9yLlxuICAgICAqL1xuICAgIERydXBhbC5iZWhhdmlvcnMuZmljQmFja3N0cmV0Y2ggPSB7XG4gICAgICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNldHRpbmdzLmZpY0JhY2tzdHJldGNoID09PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgICAgIHx8ICQoJy5iYWNrc3RyZXRjaCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciAkaW1hZ2VzID0gW10sXG4gICAgICAgICAgICAgICAgJGJhY2tzdHJldGNoV3JhcHBlciA9ICQoJy5wYWdlLWhlYWRlci13cmFwcGVyJyk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNldHRpbmdzLmZpY0JhY2tzdHJldGNoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgJGltYWdlcy5wdXNoKHNldHRpbmdzLmZpY0JhY2tzdHJldGNoW2ldLnVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkYmFja3N0cmV0Y2hXcmFwcGVyLmJhY2tzdHJldGNoKCRpbWFnZXMsIHtcbiAgICAgICAgICAgICAgICAvLyBTbGlkZXMgc2hvdWxkIGJlIG5ldmVyIGNoYW5nZWQgYXV0b21hdGljbHkuXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDAwMDAsIGZhZGU6IDc1MCwgcGF1c2VkOiB0cnVlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gUmVzZXQgYmFja3N0cmVjaCBzbGlkZSBvbiB0aW1lb3V0IGFmdGVyIG1vdXNlbGVhdmUuXG4gICAgICAgICAgICB2YXIgcGFnZXJfbGlua3Nfc2VsZWN0b3IgPSAnLmN5Y2xlLXBhZ2VyIGEsIC53aWRnZXRfcGFnZXJfYm90dG9tIGEnLFxuICAgICAgICAgICAgICAgIHNsaWRlUmVzZXRUaW1lb3V0ID0gc2V0dGluZ3Muc2xpZGVSZXNldFRpbWVvdXQ7XG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vbih7XG4gICAgICAgICAgICAgICAgJ21vdXNlbGVhdmUnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRwYWdlciA9ICQodGhpcykucGFyZW50cygnLnZpZXdzLXNsaWRlc2hvdy1wYWdlci1maWVsZC1pdGVtOmZpcnN0LCAuZmllbGQtaXRlbTpmaXJzdCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJHBhZ2VyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkcGFnZXIuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHBhZ2VyX2xpbmtzX3NlbGVjdG9yKS5maWx0ZXIoJzpmaXJzdCcpLm1vdXNlb3ZlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSwgc2xpZGVSZXNldFRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgcGFnZXJfbGlua3Nfc2VsZWN0b3IpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNob3c6IGZ1bmN0aW9uICgkaWQpIHtcbiAgICAgICAgICAgIHZhciAkaSA9IDAsXG4gICAgICAgICAgICAgICAgJGJhY2tzdHJldGNoID0gJCgnLnBhZ2UtaGVhZGVyLXdyYXBwZXInKS5kYXRhKCdiYWNrc3RyZXRjaCcpLFxuICAgICAgICAgICAgICAgICRkZWZhdWx0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBEcnVwYWwuc2V0dGluZ3MuZmljQmFja3N0cmV0Y2ggPT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgfHwgdHlwZW9mICRiYWNrc3RyZXRjaCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBEcnVwYWwuc2V0dGluZ3MuZmljQmFja3N0cmV0Y2gubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoJGlkID09IERydXBhbC5zZXR0aW5ncy5maWNCYWNrc3RyZXRjaFtpXS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAkYmFja3N0cmV0Y2guc2hvdygkaSk7XG4gICAgICAgICAgICAgICAgICAgICRkZWZhdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkaSsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJGRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAkYmFja3N0cmV0Y2guc2hvdygwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDdXN0b20gaGVhZGVyUmVnaW9uIGJlaGF2aW9yLlxuICAgICAqL1xuICAgIERydXBhbC5iZWhhdmlvcnMuaGVhZGVyUmVnaW9uID0ge1xuICAgICAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgICAgICAgaWYgKCEkKCcudGVybS1maWMtaGVhZGVyJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgJHdIID0gJCh3aW5kb3cpLmhlaWdodCgpLFxuICAgICAgICAgICAgLy8gQWxsIHN0YXRpYyB2YWx1ZSBkZWZpZGVuIGFjY29yZGluZ2x5IHdpdGggZGVzaWduLlxuICAgICAgICAgICAgJGJyYW5kaWdIID0gMTc4ICsgMjAsXG4gICAgICAgICAgICAkbmF2aWdhdGlvbkggPSAxNTAgKyAyMCxcbiAgICAgICAgICAgICRzY3JvbGxEb3duSCA9IDE3NCxcbiAgICAgICAgICAgICRkZXNjckggPSAkd0ggLSAkYnJhbmRpZ0ggLSAkbmF2aWdhdGlvbkggLSAkc2Nyb2xsRG93bkgsXG4gICAgICAgICAgICAkbWluSCA9IDMwMCxcbiAgICAgICAgICAgICRtYXhIID0gNzAwO1xuXG4gICAgICAgICAgICAkZGVzY3JIID0gJGRlc2NySCA8ICRtaW5IID8gJG1pbkggOiAoJGRlc2NySCA+ICRtYXhIID8gJG1heEggOiAkZGVzY3JIKTtcbiAgICAgICAgICAgICQoJy50ZXJtLWZpYy1oZWFkZXIgLnZpZXdzX3NsaWRlc2hvd19jeWNsZV9tYWluLCAucGFnZS10YXhvbm9teSAudGVybS1maWMtaGVhZGVyID4gLnRheG9ub215LXRlcm0gLmN5Y2xlLXNsaWRlc2hvdy13cmFwcGVyJykuaGVpZ2h0KCRkZXNjckgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIERydXBhbC50aGVtZS5wcm90b3R5cGUuZmljX21vZGFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaHRtbCA9ICcnO1xuICAgICAgICBodG1sICs9ICc8ZGl2IGlkPVwiY3Rvb2xzLW1vZGFsXCIgY2xhc3M9XCJwb3B1cHMtYm94IG15LWZpcnN0LXBvcHVwXCI+JztcbiAgICAgICAgaHRtbCArPSAnIDxkaXYgY2xhc3M9XCJjdG9vbHMtbW9kYWwtY29udGVudCBteS1wb3B1cCBcIj4nO1xuICAgICAgICBodG1sICs9ICcgPHNwYW4gY2xhc3M9XCJwb3B1cHMtY2xvc2VcIj48YSBjbGFzcz1cImNsb3NlXCIgaHJlZj1cIiNcIj7DlzwvYT48L3NwYW4+JztcbiAgICAgICAgaHRtbCArPSAnIDxkaXYgY2xhc3M9XCJtb2RhbC1zY3JvbGxcIj48ZGl2IGlkPVwibW9kYWwtY29udGVudFwiIGNsYXNzPVwibW9kYWwtY29udGVudCBwb3B1cHMtYm9keVwiPjwvZGl2PjwvZGl2Pic7XG4gICAgICAgIGh0bWwgKz0gJyA8L2Rpdj4nO1xuICAgICAgICBodG1sICs9ICc8L2Rpdj4nO1xuICAgICAgICByZXR1cm4gaHRtbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3VzdG9tIGZpY0hlYWRlckN5Y2xlU2xpZGVzaG93IGJlaGF2aW9yLlxuICAgICAqL1xuICAgIERydXBhbC5iZWhhdmlvcnMuZmljSGVhZGVyQ3ljbGVTbGlkZXNob3cgPSB7XG4gICAgICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAgICAgICB2YXIgJHNsaWRlU2hvdyA9ICQoJy5jeWNsZS1zbGlkZXNob3cnKTtcbiAgICAgICAgICAgIGlmICghJHNsaWRlU2hvdy5vbmNlKCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkc2xpZGVTaG93LmN5Y2xlKHtcbiAgICAgICAgICAgICAgICBzcGVlZDogNzAwLFxuICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDAsXG4gICAgICAgICAgICAgICAgYWN0aXZlUGFnZXJDbGFzczogJ2FjdGl2ZScsXG4gICAgICAgICAgICAgICAgcGFnZXI6ICcjY3ljbGUtbmF2JyxcbiAgICAgICAgICAgICAgICBiZWZvcmU6IGZ1bmN0aW9uIChjdXJyU2xpZGVFbGVtZW50LCBuZXh0U2xpZGVFbGVtZW50LCBvcHRpb25zLCBmb3J3YXJkRmxhZykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJHRlcm1JZCA9ICQobmV4dFNsaWRlRWxlbWVudCkuZGF0YSgnaWQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBEcnVwYWwuYmVoYXZpb3JzLmZpY0JhY2tzdHJldGNoICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBEcnVwYWwuYmVoYXZpb3JzLmZpY0JhY2tzdHJldGNoLnNob3coJHRlcm1JZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBhZ2VyQW5jaG9yQnVpbGRlcjogZnVuY3Rpb24gKGlkeCwgc2xpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRzbGlkZSA9ICQoc2xpZGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgJHRhcmdldCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mICRzbGlkZS5kYXRhKCd0YXJnZXQnKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0YXJnZXQgPSAnIHRhcmdldD1cIicgKyAkc2xpZGUuZGF0YSgndGFyZ2V0JykgKyAnXCInO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cImZpZWxkLWl0ZW1cIj48YSBocmVmPVwiJyArICRzbGlkZS5kYXRhKCd1cmwnKSArICdcIicgKyAkdGFyZ2V0ICsgJz48c3Bhbj4nICsgJHNsaWRlLmRhdGEoJ25hbWUnKSArICc8L3NwYW4+PC9hPjwvZGl2Pic7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwYWdlckV2ZW50OiAnbW91c2VvdmVyJyxcbiAgICAgICAgICAgICAgICBwYXVzZU9uUGFnZXJIb3ZlcjogdHJ1ZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQoJy5jeWNsZS1wYWdlciBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHB1YjtcblxufSkoalF1ZXJ5KTtcbiIsIi8vIERvY3VtZW50IHJlYWR5XG4oZnVuY3Rpb24gKCQpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBSZXNvbHZlcyAkLmJyb3dzZXIgaXNzdWUgKHNlZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTQ3OTg0MDMvdHlwZWVycm9yLWJyb3dzZXItaXMtdW5kZWZpbmVkKVxuICAgIHZhciBtYXRjaGVkLCBicm93c2VyO1xuXG4gICAgalF1ZXJ5LnVhTWF0Y2ggPSBmdW5jdGlvbiggdWEgKSB7XG4gICAgICAgIHVhID0gdWEudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICB2YXIgbWF0Y2ggPSAvKGNocm9tZSlbIFxcL10oW1xcdy5dKykvLmV4ZWMoIHVhICkgfHxcbiAgICAgICAgICAgIC8od2Via2l0KVsgXFwvXShbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgICAgICAgICAgLyhvcGVyYSkoPzouKnZlcnNpb258KVsgXFwvXShbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgICAgICAgICAgLyhtc2llKSAoW1xcdy5dKykvLmV4ZWMoIHVhICkgfHxcbiAgICAgICAgICAgIHVhLmluZGV4T2YoXCJjb21wYXRpYmxlXCIpIDwgMCAmJiAvKG1vemlsbGEpKD86Lio/IHJ2OihbXFx3Ll0rKXwpLy5leGVjKCB1YSApIHx8XG4gICAgICAgICAgICBbXTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYnJvd3NlcjogbWF0Y2hbIDEgXSB8fCBcIlwiLFxuICAgICAgICAgICAgdmVyc2lvbjogbWF0Y2hbIDIgXSB8fCBcIjBcIlxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBtYXRjaGVkID0galF1ZXJ5LnVhTWF0Y2goIG5hdmlnYXRvci51c2VyQWdlbnQgKTtcbiAgICBicm93c2VyID0ge307XG5cbiAgICBpZiAoIG1hdGNoZWQuYnJvd3NlciApIHtcbiAgICAgICAgYnJvd3NlclsgbWF0Y2hlZC5icm93c2VyIF0gPSB0cnVlO1xuICAgICAgICBicm93c2VyLnZlcnNpb24gPSBtYXRjaGVkLnZlcnNpb247XG4gICAgfVxuXG4gICAgLy8gQ2hyb21lIGlzIFdlYmtpdCwgYnV0IFdlYmtpdCBpcyBhbHNvIFNhZmFyaS5cbiAgICBpZiAoIGJyb3dzZXIuY2hyb21lICkge1xuICAgICAgICBicm93c2VyLndlYmtpdCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICggYnJvd3Nlci53ZWJraXQgKSB7XG4gICAgICAgIGJyb3dzZXIuc2FmYXJpID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBqUXVlcnkuYnJvd3NlciA9IGJyb3dzZXI7XG5cbiAgICAvLyBFbmFibGUgaGVhZGVyXG4gICAgaGVhZGVyLmluaXQoKTtcblxuICAgIC8vIFJlbW92ZSAubm9saW5rIGFuZCAuc2VwYXJhdG9yXG4gICAgJCgnLnNsaW5reS1tZW51LCAubmF2aWdhdGlvbi1iYXJfX2Ryb3B1cCcpXG4gICAgICAgIC5maW5kKCcubm9saW5rLCAuc2VwYXJhdG9yJylcbiAgICAgICAgLnBhcmVudCgpXG4gICAgICAgIC5yZW1vdmUoKTtcblxuICAgIC8vIFNpZHJcbiAgICAkKCcuc2xpbmt5LW1lbnUnKVxuICAgICAgICAuZmluZCgndWwsIGxpLCBhJylcbiAgICAgICAgLnJlbW92ZUNsYXNzKCk7XG5cbiAgICAkKCcuc2lkcl9fdG9nZ2xlJykuc2lkcih7XG4gICAgICAgIG5hbWU6ICdzaWRyLW1haW4nLFxuICAgICAgICBzaWRlOiAnbGVmdCcsXG4gICAgICAgIGRpc3BsYWNlOiBmYWxzZSxcbiAgICAgICAgcmVuYW1pbmc6IGZhbHNlLFxuICAgICAgICBzb3VyY2U6ICcuc2lkci1zb3VyY2UtcHJvdmlkZXInXG4gICAgfSk7XG5cbiAgICAvLyBTbGlua3lcbiAgICAkKCcuc2lkciAuc2xpbmt5LW1lbnUnKS5zbGlua3koe1xuICAgICAgICB0aXRsZTogdHJ1ZSxcbiAgICAgICAgbGFiZWw6ICcnXG4gICAgfSk7XG5cbiAgICAkKCdzZWxlY3QnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIGlmICgkdGhpcy52YWwoKSA9PSAnJykge1xuICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ2VtcHR5Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcygnZW1wdHknKTtcbiAgICAgICAgfVxuICAgIH0pLmNoYW5nZSgpO1xuXG4gICAgLy8gQ2xvc2UgQ1Rvb2xzIG1vZGFsIG9uIGJhY2tkcm9wIGNsaWNrXG4gICAgRHJ1cGFsLmJlaGF2aW9ycy5jdG9vbHNfYmFja2Ryb3BfY2xvc2UgPSB7XG4gICAgICAgIGF0dGFjaDogZnVuY3Rpb24oY29udGV4dCwgc2V0dGluZ3Mpe1xuICAgICAgICAgICAgJCgnI21vZGFsQmFja2Ryb3AsICNtb2RhbENvbnRlbnQnKS5vbmNlKCdjdG9vbHNfYmFja2Ryb3BfY2xvc2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKCcucG9wdXBzLWJvZHknKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICQodGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgRHJ1cGFsLkNUb29scy5Nb2RhbC5kaXNtaXNzKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBfc2V0X2hlaWdodF9vbl9wYWdlX3dyYXBwZXIoKSB7XG4gICAgICAgIHZhciAkaGVhZGVyID0gJCgnLnBhZ2UtaGVhZGVyLXdyYXBwZXInKSxcbiAgICAgICAgICAgICRiYWNrc3RyZXRjaCA9ICQoJy5iYWNrc3RyZXRjaCcpLFxuICAgICAgICAgICAgaGVpZ2h0ID0gJGJhY2tzdHJldGNoLm91dGVySGVpZ2h0KHRydWUpO1xuXG4gICAgICAgICRoZWFkZXIuY3NzKCdoZWlnaHQnLCBoZWlnaHQpO1xuICAgIH1cbiAgICBfc2V0X2hlaWdodF9vbl9wYWdlX3dyYXBwZXIoKTsgLy8gTG9hZCB1cG9uIGJvb3RcblxuICAgIC8vIEluaXQgc3RhY2thYmxlIHJlc3BvbnNpdmUgdGFibGUgcGx1Z2luLlxuICAgIERydXBhbC5iZWhhdmlvcnMuc3RhY2thYmxlID0ge1xuICAgICAgICBhdHRhY2g6IGZ1bmN0aW9uKGNvbnRleHQsIHNldHRpbmdzKXtcbiAgICAgICAgICAgICQoJ3RhYmxlJykub25jZSgnc3RhY2thYmxlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zdGFja3RhYmxlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBMaXR5XG4gICAgJCgnYVtyZWw9XCJtb2RhbGJveFwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyICRlbGVtZW50ID0gJCh0aGlzKSxcbiAgICAgICAgICAgIGhyZWYgPSAkZWxlbWVudC5hdHRyKCdocmVmJyk7XG5cbiAgICAgICAgbGl0eShocmVmKTtcbiAgICB9KTtcblxuICAgIC8vIE5hdmlnYXRpb24gYmFyXG4gICAgJCgnLm5hdmlnYXRpb24tYmFyX190b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciAkZWxlbWVudCA9ICQodGhpcyksXG4gICAgICAgICAgICAkcGFyZW50ID0gJGVsZW1lbnQucGFyZW50cygnLm5hdmlnYXRpb24tYmFyJyk7XG5cbiAgICAgICAgJHBhcmVudC50b2dnbGVDbGFzcygndmlzaWJsZScpO1xuICAgIH0pXG5cbiAgICAvLyBBbGwgbGlua3MgdG8gUERGcyBzaG91bGQgb3BlbiBpbiBhIG5ldyB3aW5kb3cuXG4gICAgJCgnYVtocmVmJD1cIi5wZGZcIl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJGVsZW1lbnQgPSAkKHRoaXMpO1xuXG4gICAgICAgICRlbGVtZW50LmF0dHIoJ3RhcmdldCcsICdfYmxhbmsnKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcbiJdfQ==
