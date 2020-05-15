'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Bootstrap v3.4.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 Twitter, Inc.
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
 * Bootstrap: transition.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: https://modernizr.com/)
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

  // https://blog.alexmaccaw.com/css-transitions
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
 * Bootstrap: alert.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
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

  Alert.VERSION = '3.4.1';

  Alert.TRANSITION_DURATION = 150;

  Alert.prototype.close = function (e) {
    var $this = $(this);
    var selector = $this.attr('data-target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    selector = selector === '#' ? [] : selector;
    var $parent = $(document).find(selector);

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
 * Bootstrap: button.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
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

  Button.VERSION = '3.4.1';

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
 * Bootstrap: carousel.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
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

  Carousel.VERSION = '3.4.1';

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
      if ((typeof $next === 'undefined' ? 'undefined' : _typeof($next)) === 'object' && $next.length) {
        $next[0].offsetWidth; // force reflow
      }
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
    var $this = $(this);
    var href = $this.attr('href');
    if (href) {
      href = href.replace(/.*(?=#[^\s]+$)/, ''); // strip for ie7
    }

    var target = $this.attr('data-target') || href;
    var $target = $(document).find(target);

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
 * Bootstrap: collapse.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
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

  Collapse.VERSION = '3.4.1';

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
    return $(document).find(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function (i, element) {
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

    return $(document).find(target);
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
 * Bootstrap: dropdown.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
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

  Dropdown.VERSION = '3.4.1';

  function getParent($this) {
    var selector = $this.attr('data-target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    var $parent = selector !== '#' ? $(document).find(selector) : null;

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
 * Bootstrap: modal.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#modals
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
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
    this.fixedContent = '.navbar-fixed-top, .navbar-fixed-bottom';

    if (this.options.remote) {
      this.$element.find('.modal-content').load(this.options.remote, $.proxy(function () {
        this.$element.trigger('loaded.bs.modal');
      }, this));
    }
  };

  Modal.VERSION = '3.4.1';

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
    var scrollbarWidth = this.scrollbarWidth;
    if (this.bodyIsOverflowing) {
      this.$body.css('padding-right', bodyPad + scrollbarWidth);
      $(this.fixedContent).each(function (index, element) {
        var actualPadding = element.style.paddingRight;
        var calculatedPadding = $(element).css('padding-right');
        $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + scrollbarWidth + 'px');
      });
    }
  };

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad);
    $(this.fixedContent).each(function (index, element) {
      var padding = $(element).data('padding-right');
      $(element).removeData('padding-right');
      element.style.paddingRight = padding ? padding : '';
    });
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
    var target = $this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, ''); // strip for ie7

    var $target = $(document).find(target);
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
 * Bootstrap: tooltip.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];

  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];

  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;

  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []

    /**
     * A pattern that recognizes a commonly useful subset of URLs that are safe.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */
  };var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;

  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */
  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if ($.inArray(attrName, allowedAttributeList) !== -1) {
      if ($.inArray(attrName, uriAttrs) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = $(allowedAttributeList).filter(function (index, value) {
      return value instanceof RegExp;
    });

    // Check if a regular expression validates the attribute.
    for (var i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    // IE 8 and below don't support createHTMLDocument
    if (!document.implementation || !document.implementation.createHTMLDocument) {
      return unsafeHtml;
    }

    var createdDocument = document.implementation.createHTMLDocument('sanitization');
    createdDocument.body.innerHTML = unsafeHtml;

    var whitelistKeys = $.map(whiteList, function (el, i) {
      return i;
    });
    var elements = $(createdDocument.body).find('*');

    for (var i = 0, len = elements.length; i < len; i++) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if ($.inArray(elName, whitelistKeys) === -1) {
        el.parentNode.removeChild(el);

        continue;
      }

      var attributeList = $.map(el.attributes, function (el) {
        return el;
      });
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);

      for (var j = 0, len2 = attributeList.length; j < len2; j++) {
        if (!allowedAttribute(attributeList[j], whitelistedAttributes)) {
          el.removeAttribute(attributeList[j].nodeName);
        }
      }
    }

    return createdDocument.body.innerHTML;
  }

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

  Tooltip.VERSION = '3.4.1';

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
    },
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist
  };

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled = true;
    this.type = type;
    this.$element = $(element);
    this.options = this.getOptions(options);
    this.$viewport = this.options.viewport && $(document).find($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport);
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
    var dataAttributes = this.$element.data();

    for (var dataAttr in dataAttributes) {
      if (dataAttributes.hasOwnProperty(dataAttr) && $.inArray(dataAttr, DISALLOWED_ATTRIBUTES) !== -1) {
        delete dataAttributes[dataAttr];
      }
    }

    options = $.extend({}, this.getDefaults(), dataAttributes, options);

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      };
    }

    if (options.sanitize) {
      options.template = sanitizeHtml(options.template, options.whiteList, options.sanitizeFn);
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

      this.options.container ? $tip.appendTo($(document).find(this.options.container)) : $tip.insertAfter(this.$element);
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

    if (this.options.html) {
      if (this.options.sanitize) {
        title = sanitizeHtml(title, this.options.whiteList, this.options.sanitizeFn);
      }

      $tip.find('.tooltip-inner').html(title);
    } else {
      $tip.find('.tooltip-inner').text(title);
    }

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

  Tooltip.prototype.sanitizeHtml = function (unsafeHtml) {
    return sanitizeHtml(unsafeHtml, this.options.whiteList, this.options.sanitizeFn);
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
 * Bootstrap: popover.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
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

  Popover.VERSION = '3.4.1';

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

    if (this.options.html) {
      var typeContent = typeof content === 'undefined' ? 'undefined' : _typeof(content);

      if (this.options.sanitize) {
        title = this.sanitizeHtml(title);

        if (typeContent === 'string') {
          content = this.sanitizeHtml(content);
        }
      }

      $tip.find('.popover-title').html(title);
      $tip.find('.popover-content').children().detach().end()[typeContent === 'string' ? 'html' : 'append'](content);
    } else {
      $tip.find('.popover-title').text(title);
      $tip.find('.popover-content').children().detach().end().text(content);
    }

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
 * Bootstrap: scrollspy.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
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

  ScrollSpy.VERSION = '3.4.1';

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
 * Bootstrap: tab.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
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

  Tab.VERSION = '3.4.1';

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

    var $target = $(document).find(selector);

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
 * Bootstrap: affix.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#affix
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function Affix(element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options);

    var target = this.options.target === Affix.DEFAULTS.target ? $(this.options.target) : $(document).find(this.options.target);

    this.$target = target.on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this));

    this.$element = $(element);
    this.affixed = null;
    this.unpin = null;
    this.pinnedOffset = null;

    this.checkPosition();
  };

  Affix.VERSION = '3.4.1';

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

/*! Lity - v2.4.1 - 2020-04-26
* http://sorgalla.com/lity/
* Copyright (c) 2015-2020 Jan Sorgalla; Licensed MIT */
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
        return $('<span class="lity-error"></span>').append(msg);
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

        placeholder = $('<i style="display:none !important"></i>');
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
        return '<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen allow="autoplay; fullscreen" src="' + target + '"/></div>';
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

    lity.version = '2.4.1';
    lity.options = $.proxy(settings, lity, _defaultOptions);
    lity.handlers = $.proxy(settings, lity, _defaultOptions.handlers);
    lity.current = currentInstance;

    $(document).on('click.lity', '[data-lity]', lity);

    return lity;
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
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

	function decode(s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init(converter) {
		function api() {}

		function set(key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ? converter.write(value, key) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return document.cookie = key + '=' + value + stringifiedAttributes;
		}

		function get(key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) || decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

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
    $('.slinky-menu').find('ul, a').removeClass();

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb3RzdHJhcC5qcyIsImpxdWVyeS5zdGlja3kuanMiLCJqcXVlcnkuc2lkci5qcyIsInN0YWNrdGFibGUuanMiLCJsaXR5LmpzIiwianMuY29va2llLmpzIiwiY3VzdG9tLXNsaW5reS5qcyIsImhlYWRlci5qcyIsImFwcC5qcyJdLCJuYW1lcyI6WyJqUXVlcnkiLCJFcnJvciIsIiQiLCJ2ZXJzaW9uIiwiZm4iLCJqcXVlcnkiLCJzcGxpdCIsInRyYW5zaXRpb25FbmQiLCJlbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInRyYW5zRW5kRXZlbnROYW1lcyIsIldlYmtpdFRyYW5zaXRpb24iLCJNb3pUcmFuc2l0aW9uIiwiT1RyYW5zaXRpb24iLCJ0cmFuc2l0aW9uIiwibmFtZSIsInN0eWxlIiwidW5kZWZpbmVkIiwiZW5kIiwiZW11bGF0ZVRyYW5zaXRpb25FbmQiLCJkdXJhdGlvbiIsImNhbGxlZCIsIiRlbCIsIm9uZSIsImNhbGxiYWNrIiwidHJpZ2dlciIsInN1cHBvcnQiLCJzZXRUaW1lb3V0IiwiZXZlbnQiLCJzcGVjaWFsIiwiYnNUcmFuc2l0aW9uRW5kIiwiYmluZFR5cGUiLCJkZWxlZ2F0ZVR5cGUiLCJoYW5kbGUiLCJlIiwidGFyZ2V0IiwiaXMiLCJoYW5kbGVPYmoiLCJoYW5kbGVyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJkaXNtaXNzIiwiQWxlcnQiLCJvbiIsImNsb3NlIiwiVkVSU0lPTiIsIlRSQU5TSVRJT05fRFVSQVRJT04iLCJwcm90b3R5cGUiLCIkdGhpcyIsInNlbGVjdG9yIiwiYXR0ciIsInJlcGxhY2UiLCIkcGFyZW50IiwiZmluZCIsInByZXZlbnREZWZhdWx0IiwibGVuZ3RoIiwiY2xvc2VzdCIsIkV2ZW50IiwiaXNEZWZhdWx0UHJldmVudGVkIiwicmVtb3ZlQ2xhc3MiLCJyZW1vdmVFbGVtZW50IiwiZGV0YWNoIiwicmVtb3ZlIiwiaGFzQ2xhc3MiLCJQbHVnaW4iLCJvcHRpb24iLCJlYWNoIiwiZGF0YSIsImNhbGwiLCJvbGQiLCJhbGVydCIsIkNvbnN0cnVjdG9yIiwibm9Db25mbGljdCIsIkJ1dHRvbiIsImVsZW1lbnQiLCJvcHRpb25zIiwiJGVsZW1lbnQiLCJleHRlbmQiLCJERUZBVUxUUyIsImlzTG9hZGluZyIsImxvYWRpbmdUZXh0Iiwic2V0U3RhdGUiLCJzdGF0ZSIsImQiLCJ2YWwiLCJyZXNldFRleHQiLCJwcm94eSIsImFkZENsYXNzIiwicHJvcCIsInJlbW92ZUF0dHIiLCJ0b2dnbGUiLCJjaGFuZ2VkIiwiJGlucHV0IiwidG9nZ2xlQ2xhc3MiLCJidXR0b24iLCIkYnRuIiwiZmlyc3QiLCJ0ZXN0IiwidHlwZSIsIkNhcm91c2VsIiwiJGluZGljYXRvcnMiLCJwYXVzZWQiLCJzbGlkaW5nIiwiaW50ZXJ2YWwiLCIkYWN0aXZlIiwiJGl0ZW1zIiwia2V5Ym9hcmQiLCJrZXlkb3duIiwicGF1c2UiLCJkb2N1bWVudEVsZW1lbnQiLCJjeWNsZSIsIndyYXAiLCJ0YWdOYW1lIiwid2hpY2giLCJwcmV2IiwibmV4dCIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImdldEl0ZW1JbmRleCIsIml0ZW0iLCJwYXJlbnQiLCJjaGlsZHJlbiIsImluZGV4IiwiZ2V0SXRlbUZvckRpcmVjdGlvbiIsImRpcmVjdGlvbiIsImFjdGl2ZSIsImFjdGl2ZUluZGV4Iiwid2lsbFdyYXAiLCJkZWx0YSIsIml0ZW1JbmRleCIsImVxIiwidG8iLCJwb3MiLCJ0aGF0Iiwic2xpZGUiLCIkbmV4dCIsImlzQ3ljbGluZyIsInJlbGF0ZWRUYXJnZXQiLCJzbGlkZUV2ZW50IiwiJG5leHRJbmRpY2F0b3IiLCJzbGlkRXZlbnQiLCJvZmZzZXRXaWR0aCIsImpvaW4iLCJhY3Rpb24iLCJjYXJvdXNlbCIsImNsaWNrSGFuZGxlciIsImhyZWYiLCIkdGFyZ2V0Iiwic2xpZGVJbmRleCIsIndpbmRvdyIsIiRjYXJvdXNlbCIsIkNvbGxhcHNlIiwiJHRyaWdnZXIiLCJpZCIsInRyYW5zaXRpb25pbmciLCJnZXRQYXJlbnQiLCJhZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MiLCJkaW1lbnNpb24iLCJoYXNXaWR0aCIsInNob3ciLCJhY3RpdmVzRGF0YSIsImFjdGl2ZXMiLCJzdGFydEV2ZW50IiwiY29tcGxldGUiLCJzY3JvbGxTaXplIiwiY2FtZWxDYXNlIiwiaGlkZSIsIm9mZnNldEhlaWdodCIsImkiLCJnZXRUYXJnZXRGcm9tVHJpZ2dlciIsImlzT3BlbiIsImNvbGxhcHNlIiwiYmFja2Ryb3AiLCJEcm9wZG93biIsImNsZWFyTWVudXMiLCJjb250YWlucyIsImlzQWN0aXZlIiwiaW5zZXJ0QWZ0ZXIiLCJzdG9wUHJvcGFnYXRpb24iLCJkZXNjIiwiZHJvcGRvd24iLCJNb2RhbCIsIiRib2R5IiwiYm9keSIsIiRkaWFsb2ciLCIkYmFja2Ryb3AiLCJpc1Nob3duIiwib3JpZ2luYWxCb2R5UGFkIiwic2Nyb2xsYmFyV2lkdGgiLCJpZ25vcmVCYWNrZHJvcENsaWNrIiwiZml4ZWRDb250ZW50IiwicmVtb3RlIiwibG9hZCIsIkJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04iLCJfcmVsYXRlZFRhcmdldCIsImNoZWNrU2Nyb2xsYmFyIiwic2V0U2Nyb2xsYmFyIiwiZXNjYXBlIiwicmVzaXplIiwiYXBwZW5kVG8iLCJzY3JvbGxUb3AiLCJhZGp1c3REaWFsb2ciLCJlbmZvcmNlRm9jdXMiLCJvZmYiLCJoaWRlTW9kYWwiLCJoYXMiLCJoYW5kbGVVcGRhdGUiLCJyZXNldEFkanVzdG1lbnRzIiwicmVzZXRTY3JvbGxiYXIiLCJyZW1vdmVCYWNrZHJvcCIsImFuaW1hdGUiLCJkb0FuaW1hdGUiLCJjdXJyZW50VGFyZ2V0IiwiZm9jdXMiLCJjYWxsYmFja1JlbW92ZSIsIm1vZGFsSXNPdmVyZmxvd2luZyIsInNjcm9sbEhlaWdodCIsImNsaWVudEhlaWdodCIsImNzcyIsInBhZGRpbmdMZWZ0IiwiYm9keUlzT3ZlcmZsb3dpbmciLCJwYWRkaW5nUmlnaHQiLCJmdWxsV2luZG93V2lkdGgiLCJpbm5lcldpZHRoIiwiZG9jdW1lbnRFbGVtZW50UmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInJpZ2h0IiwiTWF0aCIsImFicyIsImxlZnQiLCJjbGllbnRXaWR0aCIsIm1lYXN1cmVTY3JvbGxiYXIiLCJib2R5UGFkIiwicGFyc2VJbnQiLCJhY3R1YWxQYWRkaW5nIiwiY2FsY3VsYXRlZFBhZGRpbmciLCJwYXJzZUZsb2F0IiwicGFkZGluZyIsInJlbW92ZURhdGEiLCJzY3JvbGxEaXYiLCJjbGFzc05hbWUiLCJhcHBlbmQiLCJyZW1vdmVDaGlsZCIsIm1vZGFsIiwic2hvd0V2ZW50IiwiRElTQUxMT1dFRF9BVFRSSUJVVEVTIiwidXJpQXR0cnMiLCJBUklBX0FUVFJJQlVURV9QQVRURVJOIiwiRGVmYXVsdFdoaXRlbGlzdCIsImEiLCJhcmVhIiwiYiIsImJyIiwiY29sIiwiY29kZSIsImRpdiIsImVtIiwiaHIiLCJoMSIsImgyIiwiaDMiLCJoNCIsImg1IiwiaDYiLCJpbWciLCJsaSIsIm9sIiwicCIsInByZSIsInMiLCJzbWFsbCIsInNwYW4iLCJzdWIiLCJzdXAiLCJzdHJvbmciLCJ1IiwidWwiLCJTQUZFX1VSTF9QQVRURVJOIiwiREFUQV9VUkxfUEFUVEVSTiIsImFsbG93ZWRBdHRyaWJ1dGUiLCJhbGxvd2VkQXR0cmlidXRlTGlzdCIsImF0dHJOYW1lIiwibm9kZU5hbWUiLCJ0b0xvd2VyQ2FzZSIsImluQXJyYXkiLCJCb29sZWFuIiwibm9kZVZhbHVlIiwibWF0Y2giLCJyZWdFeHAiLCJmaWx0ZXIiLCJ2YWx1ZSIsIlJlZ0V4cCIsImwiLCJzYW5pdGl6ZUh0bWwiLCJ1bnNhZmVIdG1sIiwid2hpdGVMaXN0Iiwic2FuaXRpemVGbiIsImltcGxlbWVudGF0aW9uIiwiY3JlYXRlSFRNTERvY3VtZW50IiwiY3JlYXRlZERvY3VtZW50IiwiaW5uZXJIVE1MIiwid2hpdGVsaXN0S2V5cyIsIm1hcCIsImVsZW1lbnRzIiwibGVuIiwiZWxOYW1lIiwicGFyZW50Tm9kZSIsImF0dHJpYnV0ZUxpc3QiLCJhdHRyaWJ1dGVzIiwid2hpdGVsaXN0ZWRBdHRyaWJ1dGVzIiwiY29uY2F0IiwiaiIsImxlbjIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJUb29sdGlwIiwiZW5hYmxlZCIsInRpbWVvdXQiLCJob3ZlclN0YXRlIiwiaW5TdGF0ZSIsImluaXQiLCJhbmltYXRpb24iLCJwbGFjZW1lbnQiLCJ0ZW1wbGF0ZSIsInRpdGxlIiwiZGVsYXkiLCJodG1sIiwiY29udGFpbmVyIiwidmlld3BvcnQiLCJzYW5pdGl6ZSIsImdldE9wdGlvbnMiLCIkdmlld3BvcnQiLCJpc0Z1bmN0aW9uIiwiY2xpY2siLCJob3ZlciIsImNvbnN0cnVjdG9yIiwidHJpZ2dlcnMiLCJldmVudEluIiwiZXZlbnRPdXQiLCJlbnRlciIsImxlYXZlIiwiX29wdGlvbnMiLCJmaXhUaXRsZSIsImdldERlZmF1bHRzIiwiZGF0YUF0dHJpYnV0ZXMiLCJkYXRhQXR0ciIsImhhc093blByb3BlcnR5IiwiZ2V0RGVsZWdhdGVPcHRpb25zIiwiZGVmYXVsdHMiLCJrZXkiLCJvYmoiLCJzZWxmIiwidGlwIiwiY2xlYXJUaW1lb3V0IiwiaXNJblN0YXRlVHJ1ZSIsImhhc0NvbnRlbnQiLCJpbkRvbSIsIm93bmVyRG9jdW1lbnQiLCIkdGlwIiwidGlwSWQiLCJnZXRVSUQiLCJzZXRDb250ZW50IiwiYXV0b1Rva2VuIiwiYXV0b1BsYWNlIiwidG9wIiwiZGlzcGxheSIsImdldFBvc2l0aW9uIiwiYWN0dWFsV2lkdGgiLCJhY3R1YWxIZWlnaHQiLCJvcmdQbGFjZW1lbnQiLCJ2aWV3cG9ydERpbSIsImJvdHRvbSIsIndpZHRoIiwiY2FsY3VsYXRlZE9mZnNldCIsImdldENhbGN1bGF0ZWRPZmZzZXQiLCJhcHBseVBsYWNlbWVudCIsInByZXZIb3ZlclN0YXRlIiwib2Zmc2V0IiwiaGVpZ2h0IiwibWFyZ2luVG9wIiwibWFyZ2luTGVmdCIsImlzTmFOIiwic2V0T2Zmc2V0IiwidXNpbmciLCJwcm9wcyIsInJvdW5kIiwiZ2V0Vmlld3BvcnRBZGp1c3RlZERlbHRhIiwiaXNWZXJ0aWNhbCIsImFycm93RGVsdGEiLCJhcnJvd09mZnNldFBvc2l0aW9uIiwicmVwbGFjZUFycm93IiwiYXJyb3ciLCJnZXRUaXRsZSIsInRleHQiLCIkZSIsImlzQm9keSIsImVsUmVjdCIsImlzU3ZnIiwiU1ZHRWxlbWVudCIsImVsT2Zmc2V0Iiwic2Nyb2xsIiwib3V0ZXJEaW1zIiwidmlld3BvcnRQYWRkaW5nIiwidmlld3BvcnREaW1lbnNpb25zIiwidG9wRWRnZU9mZnNldCIsImJvdHRvbUVkZ2VPZmZzZXQiLCJsZWZ0RWRnZU9mZnNldCIsInJpZ2h0RWRnZU9mZnNldCIsIm8iLCJwcmVmaXgiLCJyYW5kb20iLCJnZXRFbGVtZW50QnlJZCIsIiRhcnJvdyIsImVuYWJsZSIsImRpc2FibGUiLCJ0b2dnbGVFbmFibGVkIiwiZGVzdHJveSIsInRvb2x0aXAiLCJQb3BvdmVyIiwiY29udGVudCIsImdldENvbnRlbnQiLCJ0eXBlQ29udGVudCIsInBvcG92ZXIiLCJTY3JvbGxTcHkiLCIkc2Nyb2xsRWxlbWVudCIsIm9mZnNldHMiLCJ0YXJnZXRzIiwiYWN0aXZlVGFyZ2V0IiwicHJvY2VzcyIsInJlZnJlc2giLCJnZXRTY3JvbGxIZWlnaHQiLCJtYXgiLCJvZmZzZXRNZXRob2QiLCJvZmZzZXRCYXNlIiwiaXNXaW5kb3ciLCIkaHJlZiIsInNvcnQiLCJwdXNoIiwibWF4U2Nyb2xsIiwiYWN0aXZhdGUiLCJjbGVhciIsInBhcmVudHMiLCJwYXJlbnRzVW50aWwiLCJzY3JvbGxzcHkiLCIkc3B5IiwiVGFiIiwiJHVsIiwiJHByZXZpb3VzIiwiaGlkZUV2ZW50IiwidGFiIiwiQWZmaXgiLCJjaGVja1Bvc2l0aW9uIiwiY2hlY2tQb3NpdGlvbldpdGhFdmVudExvb3AiLCJhZmZpeGVkIiwidW5waW4iLCJwaW5uZWRPZmZzZXQiLCJSRVNFVCIsImdldFN0YXRlIiwib2Zmc2V0VG9wIiwib2Zmc2V0Qm90dG9tIiwicG9zaXRpb24iLCJ0YXJnZXRIZWlnaHQiLCJpbml0aWFsaXppbmciLCJjb2xsaWRlclRvcCIsImNvbGxpZGVySGVpZ2h0IiwiZ2V0UGlubmVkT2Zmc2V0IiwiYWZmaXgiLCJhZmZpeFR5cGUiLCJmYWN0b3J5IiwiZGVmaW5lIiwiYW1kIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJzbGljZSIsIkFycmF5Iiwic3BsaWNlIiwidG9wU3BhY2luZyIsImJvdHRvbVNwYWNpbmciLCJ3cmFwcGVyQ2xhc3NOYW1lIiwiY2VudGVyIiwiZ2V0V2lkdGhGcm9tIiwid2lkdGhGcm9tV3JhcHBlciIsInJlc3BvbnNpdmVXaWR0aCIsInpJbmRleCIsIiR3aW5kb3ciLCIkZG9jdW1lbnQiLCJzdGlja2VkIiwid2luZG93SGVpZ2h0Iiwic2Nyb2xsZXIiLCJkb2N1bWVudEhlaWdodCIsImR3aCIsImV4dHJhIiwiZWxlbWVudFRvcCIsInN0aWNreVdyYXBwZXIiLCJldHNlIiwic3RpY2t5RWxlbWVudCIsIm91dGVySGVpZ2h0IiwiY3VycmVudFRvcCIsIm5ld1RvcCIsIm5ld1dpZHRoIiwic3RpY2t5V3JhcHBlckNvbnRhaW5lciIsInVuc3RpY2siLCJyZXNpemVyIiwibWV0aG9kcyIsInN0aWNreUlkIiwid3JhcHBlcklkIiwid3JhcHBlciIsIndyYXBBbGwiLCJvdXRlcldpZHRoIiwibWFyZ2luUmlnaHQiLCJzZXRXcmFwcGVySGVpZ2h0Iiwic2V0dXBDaGFuZ2VMaXN0ZW5lcnMiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9ucyIsImFkZGVkTm9kZXMiLCJyZW1vdmVkTm9kZXMiLCJvYnNlcnZlIiwic3VidHJlZSIsImNoaWxkTGlzdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1cGRhdGUiLCJ1bnN0aWNreUVsZW1lbnQiLCJyZW1vdmVJZHgiLCJnZXQiLCJ1bndyYXAiLCJhdHRhY2hFdmVudCIsInN0aWNreSIsIm1ldGhvZCIsImVycm9yIiwiYmFiZWxIZWxwZXJzIiwiY2xhc3NDYWxsQ2hlY2siLCJpbnN0YW5jZSIsIlR5cGVFcnJvciIsImNyZWF0ZUNsYXNzIiwiZGVmaW5lUHJvcGVydGllcyIsImRlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsInNpZHJTdGF0dXMiLCJtb3ZpbmciLCJvcGVuZWQiLCJoZWxwZXIiLCJpc1VybCIsInN0ciIsInBhdHRlcm4iLCJhZGRQcmVmaXhlcyIsImFkZFByZWZpeCIsImF0dHJpYnV0ZSIsInRvUmVwbGFjZSIsInRyYW5zaXRpb25zIiwic3VwcG9ydGVkIiwicHJvcGVydHkiLCJwcmVmaXhlcyIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic3Vic3RyIiwiJCQyIiwiYm9keUFuaW1hdGlvbkNsYXNzIiwib3BlbkFjdGlvbiIsImNsb3NlQWN0aW9uIiwidHJhbnNpdGlvbkVuZEV2ZW50IiwiTWVudSIsIm9wZW5DbGFzcyIsIm1lbnVXaWR0aCIsInNwZWVkIiwic2lkZSIsImRpc3BsYWNlIiwidGltaW5nIiwib25PcGVuQ2FsbGJhY2siLCJvbkNsb3NlQ2FsbGJhY2siLCJvbk9wZW5FbmRDYWxsYmFjayIsIm9uQ2xvc2VFbmRDYWxsYmFjayIsImdldEFuaW1hdGlvbiIsInByZXBhcmVCb2R5IiwiJGh0bWwiLCJvcGVuQm9keSIsImJvZHlBbmltYXRpb24iLCJxdWV1ZSIsIm9uQ2xvc2VCb2R5IiwicmVzZXRTdHlsZXMiLCJ1bmJpbmQiLCJjbG9zZUJvZHkiLCJfdGhpcyIsIm1vdmVCb2R5Iiwib25PcGVuTWVudSIsIm9wZW5NZW51IiwiX3RoaXMyIiwiJGl0ZW0iLCJtZW51QW5pbWF0aW9uIiwib25DbG9zZU1lbnUiLCJjbG9zZU1lbnUiLCJfdGhpczMiLCJtb3ZlTWVudSIsIm1vdmUiLCJvcGVuIiwiX3RoaXM0IiwiYWxyZWFkeU9wZW5lZE1lbnUiLCIkJDEiLCJleGVjdXRlIiwic2lkciIsInB1YmxpY01ldGhvZHMiLCJtZXRob2ROYW1lIiwiZ2V0TWV0aG9kIiwiJCQzIiwiZmlsbENvbnRlbnQiLCIkc2lkZU1lbnUiLCJzZXR0aW5ncyIsInNvdXJjZSIsIm5ld0NvbnRlbnQiLCJodG1sQ29udGVudCIsInNlbGVjdG9ycyIsInJlbmFtaW5nIiwiJGh0bWxDb250ZW50IiwiZm5TaWRyIiwiYmluZCIsIm9uT3BlbiIsIm9uQ2xvc2UiLCJvbk9wZW5FbmQiLCJvbkNsb3NlRW5kIiwiZmxhZyIsImNhcmR0YWJsZSIsIiR0YWJsZXMiLCJoZWFkSW5kZXgiLCIkdGFibGUiLCJ0YWJsZV9jc3MiLCIkc3RhY2t0YWJsZSIsIm15Q2xhc3MiLCJtYXJrdXAiLCIkY2FwdGlvbiIsIiR0b3BSb3ciLCJoZWFkTWFya3VwIiwiYm9keU1hcmt1cCIsInRyX2NsYXNzIiwiY2xvbmUiLCJzaWJsaW5ncyIsImNlbGxJbmRleCIsInJvd0luZGV4IiwidHJpbSIsInByZXBlbmQiLCJiZWZvcmUiLCJzdGFja3RhYmxlIiwiZGlzcGxheUhlYWRlciIsInN0YWNrY29sdW1ucyIsIm51bV9jb2xzIiwiJHN0YWNrY29sdW1ucyIsInRiIiwiY29sX2kiLCJ0ZW0iLCJjcyIsInNlY29uZCIsImxpdHkiLCJaZXB0byIsIl93aW4iLCJfZGVmZXJyZWQiLCJEZWZlcnJlZCIsIl9odG1sIiwiX2luc3RhbmNlcyIsIl9hdHRyQXJpYUhpZGRlbiIsIl9kYXRhQXJpYUhpZGRlbiIsIl9mb2N1c2FibGVFbGVtZW50c1NlbGVjdG9yIiwiX2RlZmF1bHRPcHRpb25zIiwiZXNjIiwiaGFuZGxlcnMiLCJpbWFnZSIsImltYWdlSGFuZGxlciIsImlubGluZSIsImlubGluZUhhbmRsZXIiLCJ5b3V0dWJlIiwieW91dHViZUhhbmRsZXIiLCJ2aW1lbyIsInZpbWVvSGFuZGxlciIsImdvb2dsZW1hcHMiLCJnb29nbGVtYXBzSGFuZGxlciIsImZhY2Vib29rdmlkZW8iLCJmYWNlYm9va3ZpZGVvSGFuZGxlciIsImlmcmFtZSIsImlmcmFtZUhhbmRsZXIiLCJfaW1hZ2VSZWdleHAiLCJfeW91dHViZVJlZ2V4IiwiX3ZpbWVvUmVnZXgiLCJfZ29vZ2xlbWFwc1JlZ2V4IiwiX2ZhY2Vib29rdmlkZW9SZWdleCIsIl90cmFuc2l0aW9uRW5kRXZlbnQiLCJkZWZlcnJlZCIsInJlc29sdmUiLCJwcm9taXNlIiwiY3VyclNldHRpbmdzIiwicGFyc2VRdWVyeVBhcmFtcyIsInBhcmFtcyIsInBhaXJzIiwiZGVjb2RlVVJJIiwibiIsImFwcGVuZFF1ZXJ5UGFyYW1zIiwidXJsIiwiaW5kZXhPZiIsInBhcmFtIiwidHJhbnNmZXJIYXNoIiwib3JpZ2luYWxVcmwiLCJuZXdVcmwiLCJtc2ciLCJvcGVuZXIiLCJmYWlsZWQiLCJyZWplY3QiLCJuYXR1cmFsV2lkdGgiLCJwbGFjZWhvbGRlciIsImhhc0hpZGVDbGFzcyIsImFmdGVyIiwibWF0Y2hlcyIsImV4ZWMiLCJhdXRvcGxheSIsIm91dHB1dCIsIndpbkhlaWdodCIsImN1cnJlbnQiLCJjdXJyZW50SW5zdGFuY2UiLCJrZXlDb2RlIiwiaGFuZGxlVGFiS2V5IiwiZm9jdXNhYmxlRWxlbWVudHMiLCJmb2N1c2VkSW5kZXgiLCJhY3RpdmVFbGVtZW50Iiwic2hpZnRLZXkiLCJyZWdpc3Rlckluc3RhbmNlIiwiaW5zdGFuY2VUb1JlZ2lzdGVyIiwidW5zaGlmdCIsIm5vdCIsInJlbW92ZUluc3RhbmNlIiwiaW5zdGFuY2VUb1JlbW92ZSIsImdyZXAiLCJvbGRBdHRyIiwicHJlZmVycmVkSGFuZGxlciIsImN1cnJlbnRIYW5kbGVycyIsImN1cnJlbnRIYW5kbGVyIiwiTGl0eSIsInJlc3VsdCIsImlzUmVhZHkiLCJpc0Nsb3NlZCIsImFkZCIsImFsd2F5cyIsIndoZW4iLCJyZWFkeSIsImxvYWRlciIsImVtcHR5IiwicmVnaXN0ZXJlZEluTW9kdWxlTG9hZGVyIiwiT2xkQ29va2llcyIsIkNvb2tpZXMiLCJhcGkiLCJkZWNvZGUiLCJkZWNvZGVVUklDb21wb25lbnQiLCJjb252ZXJ0ZXIiLCJzZXQiLCJwYXRoIiwiZXhwaXJlcyIsIkRhdGUiLCJ0b1VUQ1N0cmluZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJ3cml0ZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIlN0cmluZyIsInN0cmluZ2lmaWVkQXR0cmlidXRlcyIsImF0dHJpYnV0ZU5hbWUiLCJjb29raWUiLCJqc29uIiwiamFyIiwiY29va2llcyIsInBhcnRzIiwicmVhZCIsInBhcnNlIiwiZ2V0SlNPTiIsIndpdGhDb252ZXJ0ZXIiLCJsYXN0Q2xpY2siLCJzbGlua3kiLCJsYWJlbCIsImFjdGl2ZUNsYXNzIiwiaGVhZGVyQ2xhc3MiLCJoZWFkaW5nVGFnIiwiYmFja0ZpcnN0IiwibWVudSIsInJvb3QiLCJkZXB0aCIsIiRsaW5rIiwiYmFja0xpbmsiLCJub3ciLCJqdW1wIiwibWVudXMiLCJob21lIiwiY291bnQiLCJoZWFkZXIiLCJwdWIiLCJyZWdpc3RlckJvb3RFdmVudEhhbmRsZXJzIiwicmVnaXN0ZXJFdmVudEhhbmRsZXJzIiwiRHJ1cGFsIiwiYmVoYXZpb3JzIiwiZmljQmFja3N0cmV0Y2giLCJhdHRhY2giLCJjb250ZXh0IiwiJGltYWdlcyIsIiRiYWNrc3RyZXRjaFdyYXBwZXIiLCJiYWNrc3RyZXRjaCIsImZhZGUiLCJwYWdlcl9saW5rc19zZWxlY3RvciIsInNsaWRlUmVzZXRUaW1lb3V0IiwiJHBhZ2VyIiwibW91c2VvdmVyIiwiJGlkIiwiJGkiLCIkYmFja3N0cmV0Y2giLCIkZGVmYXVsdCIsImhlYWRlclJlZ2lvbiIsIiR3SCIsIiRicmFuZGlnSCIsIiRuYXZpZ2F0aW9uSCIsIiRzY3JvbGxEb3duSCIsIiRkZXNjckgiLCIkbWluSCIsIiRtYXhIIiwidGhlbWUiLCJmaWNfbW9kYWwiLCJmaWNIZWFkZXJDeWNsZVNsaWRlc2hvdyIsIiRzbGlkZVNob3ciLCJvbmNlIiwiYWN0aXZlUGFnZXJDbGFzcyIsInBhZ2VyIiwiY3VyclNsaWRlRWxlbWVudCIsIm5leHRTbGlkZUVsZW1lbnQiLCJmb3J3YXJkRmxhZyIsIiR0ZXJtSWQiLCJwYWdlckFuY2hvckJ1aWxkZXIiLCJpZHgiLCIkc2xpZGUiLCJwYWdlckV2ZW50IiwicGF1c2VPblBhZ2VySG92ZXIiLCJtYXRjaGVkIiwiYnJvd3NlciIsInVhTWF0Y2giLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImNocm9tZSIsIndlYmtpdCIsInNhZmFyaSIsImNoYW5nZSIsImN0b29sc19iYWNrZHJvcF9jbG9zZSIsIkNUb29scyIsIl9zZXRfaGVpZ2h0X29uX3BhZ2Vfd3JhcHBlciIsIiRoZWFkZXIiLCJzdGFja2FibGUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7O0FBTUEsSUFBSSxPQUFPQSxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0FBQ2pDLFFBQU0sSUFBSUMsS0FBSixDQUFVLHlDQUFWLENBQU47QUFDRDs7QUFFRCxDQUFDLFVBQVVDLENBQVYsRUFBYTtBQUNaOztBQUNBLE1BQUlDLFVBQVVELEVBQUVFLEVBQUYsQ0FBS0MsTUFBTCxDQUFZQyxLQUFaLENBQWtCLEdBQWxCLEVBQXVCLENBQXZCLEVBQTBCQSxLQUExQixDQUFnQyxHQUFoQyxDQUFkO0FBQ0EsTUFBS0gsUUFBUSxDQUFSLElBQWEsQ0FBYixJQUFrQkEsUUFBUSxDQUFSLElBQWEsQ0FBaEMsSUFBdUNBLFFBQVEsQ0FBUixLQUFjLENBQWQsSUFBbUJBLFFBQVEsQ0FBUixLQUFjLENBQWpDLElBQXNDQSxRQUFRLENBQVIsSUFBYSxDQUExRixJQUFpR0EsUUFBUSxDQUFSLElBQWEsQ0FBbEgsRUFBc0g7QUFDcEgsVUFBTSxJQUFJRixLQUFKLENBQVUsMkZBQVYsQ0FBTjtBQUNEO0FBQ0YsQ0FOQSxDQU1DRCxNQU5ELENBQUQ7O0FBUUE7Ozs7Ozs7O0FBU0EsQ0FBQyxVQUFVRSxDQUFWLEVBQWE7QUFDWjs7QUFFQTtBQUNBOztBQUVBLFdBQVNLLGFBQVQsR0FBeUI7QUFDdkIsUUFBSUMsS0FBS0MsU0FBU0MsYUFBVCxDQUF1QixXQUF2QixDQUFUOztBQUVBLFFBQUlDLHFCQUFxQjtBQUN2QkMsd0JBQW1CLHFCQURJO0FBRXZCQyxxQkFBbUIsZUFGSTtBQUd2QkMsbUJBQW1CLCtCQUhJO0FBSXZCQyxrQkFBbUI7QUFKSSxLQUF6Qjs7QUFPQSxT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Z2V0Ym9vdHN0cmFwLmNvbS8pXG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE5IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5cbmlmICh0eXBlb2YgalF1ZXJ5ID09PSAndW5kZWZpbmVkJykge1xuICB0aHJvdyBuZXcgRXJyb3IoJ0Jvb3RzdHJhcFxcJ3MgSmF2YVNjcmlwdCByZXF1aXJlcyBqUXVlcnknKVxufVxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgdmVyc2lvbiA9ICQuZm4uanF1ZXJ5LnNwbGl0KCcgJylbMF0uc3BsaXQoJy4nKVxuICBpZiAoKHZlcnNpb25bMF0gPCAyICYmIHZlcnNpb25bMV0gPCA5KSB8fCAodmVyc2lvblswXSA9PSAxICYmIHZlcnNpb25bMV0gPT0gOSAmJiB2ZXJzaW9uWzJdIDwgMSkgfHwgKHZlcnNpb25bMF0gPiAzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQm9vdHN0cmFwXFwncyBKYXZhU2NyaXB0IHJlcXVpcmVzIGpRdWVyeSB2ZXJzaW9uIDEuOS4xIG9yIGhpZ2hlciwgYnV0IGxvd2VyIHRoYW4gdmVyc2lvbiA0JylcbiAgfVxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogdHJhbnNpdGlvbi5qcyB2My40LjFcbiAqIGh0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS9kb2NzLzMuNC9qYXZhc2NyaXB0LyN0cmFuc2l0aW9uc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE5IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIENTUyBUUkFOU0lUSU9OIFNVUFBPUlQgKFNob3V0b3V0OiBodHRwczovL21vZGVybml6ci5jb20vKVxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kKCkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Jvb3RzdHJhcCcpXG5cbiAgICB2YXIgdHJhbnNFbmRFdmVudE5hbWVzID0ge1xuICAgICAgV2Via2l0VHJhbnNpdGlvbiA6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAgIE1velRyYW5zaXRpb24gICAgOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICBPVHJhbnNpdGlvbiAgICAgIDogJ29UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kJyxcbiAgICAgIHRyYW5zaXRpb24gICAgICAgOiAndHJhbnNpdGlvbmVuZCdcbiAgICB9XG5cbiAgICBmb3IgKHZhciBuYW1lIGluIHRyYW5zRW5kRXZlbnROYW1lcykge1xuICAgICAgaWYgKGVsLnN0eWxlW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHsgZW5kOiB0cmFuc0VuZEV2ZW50TmFtZXNbbmFtZV0gfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZSAvLyBleHBsaWNpdCBmb3IgaWU4ICggIC5fLilcbiAgfVxuXG4gIC8vIGh0dHBzOi8vYmxvZy5hbGV4bWFjY2F3LmNvbS9jc3MtdHJhbnNpdGlvbnNcbiAgJC5mbi5lbXVsYXRlVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uIChkdXJhdGlvbikge1xuICAgIHZhciBjYWxsZWQgPSBmYWxzZVxuICAgIHZhciAkZWwgPSB0aGlzXG4gICAgJCh0aGlzKS5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uICgpIHsgY2FsbGVkID0gdHJ1ZSB9KVxuICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHsgaWYgKCFjYWxsZWQpICQoJGVsKS50cmlnZ2VyKCQuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCkgfVxuICAgIHNldFRpbWVvdXQoY2FsbGJhY2ssIGR1cmF0aW9uKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAkKGZ1bmN0aW9uICgpIHtcbiAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25FbmQoKVxuXG4gICAgaWYgKCEkLnN1cHBvcnQudHJhbnNpdGlvbikgcmV0dXJuXG5cbiAgICAkLmV2ZW50LnNwZWNpYWwuYnNUcmFuc2l0aW9uRW5kID0ge1xuICAgICAgYmluZFR5cGU6ICQuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCxcbiAgICAgIGRlbGVnYXRlVHlwZTogJC5zdXBwb3J0LnRyYW5zaXRpb24uZW5kLFxuICAgICAgaGFuZGxlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaXModGhpcykpIHJldHVybiBlLmhhbmRsZU9iai5oYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IGFsZXJ0LmpzIHYzLjQuMVxuICogaHR0cHM6Ly9nZXRib290c3RyYXAuY29tL2RvY3MvMy40L2phdmFzY3JpcHQvI2FsZXJ0c1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE5IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIEFMRVJUIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBkaXNtaXNzID0gJ1tkYXRhLWRpc21pc3M9XCJhbGVydFwiXSdcbiAgdmFyIEFsZXJ0ICAgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAkKGVsKS5vbignY2xpY2snLCBkaXNtaXNzLCB0aGlzLmNsb3NlKVxuICB9XG5cbiAgQWxlcnQuVkVSU0lPTiA9ICczLjQuMSdcblxuICBBbGVydC5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgQWxlcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgICAgPSAkKHRoaXMpXG4gICAgdmFyIHNlbGVjdG9yID0gJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKVxuXG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgc2VsZWN0b3IgPSAkdGhpcy5hdHRyKCdocmVmJylcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgJiYgc2VsZWN0b3IucmVwbGFjZSgvLiooPz0jW15cXHNdKiQpLywgJycpIC8vIHN0cmlwIGZvciBpZTdcbiAgICB9XG5cbiAgICBzZWxlY3RvciAgICA9IHNlbGVjdG9yID09PSAnIycgPyBbXSA6IHNlbGVjdG9yXG4gICAgdmFyICRwYXJlbnQgPSAkKGRvY3VtZW50KS5maW5kKHNlbGVjdG9yKVxuXG4gICAgaWYgKGUpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgaWYgKCEkcGFyZW50Lmxlbmd0aCkge1xuICAgICAgJHBhcmVudCA9ICR0aGlzLmNsb3Nlc3QoJy5hbGVydCcpXG4gICAgfVxuXG4gICAgJHBhcmVudC50cmlnZ2VyKGUgPSAkLkV2ZW50KCdjbG9zZS5icy5hbGVydCcpKVxuXG4gICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaW4nKVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlRWxlbWVudCgpIHtcbiAgICAgIC8vIGRldGFjaCBmcm9tIHBhcmVudCwgZmlyZSBldmVudCB0aGVuIGNsZWFuIHVwIGRhdGFcbiAgICAgICRwYXJlbnQuZGV0YWNoKCkudHJpZ2dlcignY2xvc2VkLmJzLmFsZXJ0JykucmVtb3ZlKClcbiAgICB9XG5cbiAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiAkcGFyZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgJHBhcmVudFxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCByZW1vdmVFbGVtZW50KVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoQWxlcnQuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgcmVtb3ZlRWxlbWVudCgpXG4gIH1cblxuXG4gIC8vIEFMRVJUIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgID0gJHRoaXMuZGF0YSgnYnMuYWxlcnQnKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmFsZXJ0JywgKGRhdGEgPSBuZXcgQWxlcnQodGhpcykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXS5jYWxsKCR0aGlzKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5hbGVydFxuXG4gICQuZm4uYWxlcnQgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5hbGVydC5Db25zdHJ1Y3RvciA9IEFsZXJ0XG5cblxuICAvLyBBTEVSVCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uYWxlcnQubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmFsZXJ0ID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQUxFUlQgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT1cblxuICAkKGRvY3VtZW50KS5vbignY2xpY2suYnMuYWxlcnQuZGF0YS1hcGknLCBkaXNtaXNzLCBBbGVydC5wcm90b3R5cGUuY2xvc2UpXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IGJ1dHRvbi5qcyB2My40LjFcbiAqIGh0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS9kb2NzLzMuNC9qYXZhc2NyaXB0LyNidXR0b25zXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTkgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gQlVUVE9OIFBVQkxJQyBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBCdXR0b24gPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgID0gJChlbGVtZW50KVxuICAgIHRoaXMub3B0aW9ucyAgID0gJC5leHRlbmQoe30sIEJ1dHRvbi5ERUZBVUxUUywgb3B0aW9ucylcbiAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gIH1cblxuICBCdXR0b24uVkVSU0lPTiAgPSAnMy40LjEnXG5cbiAgQnV0dG9uLkRFRkFVTFRTID0ge1xuICAgIGxvYWRpbmdUZXh0OiAnbG9hZGluZy4uLidcbiAgfVxuXG4gIEJ1dHRvbi5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICB2YXIgZCAgICA9ICdkaXNhYmxlZCdcbiAgICB2YXIgJGVsICA9IHRoaXMuJGVsZW1lbnRcbiAgICB2YXIgdmFsICA9ICRlbC5pcygnaW5wdXQnKSA/ICd2YWwnIDogJ2h0bWwnXG4gICAgdmFyIGRhdGEgPSAkZWwuZGF0YSgpXG5cbiAgICBzdGF0ZSArPSAnVGV4dCdcblxuICAgIGlmIChkYXRhLnJlc2V0VGV4dCA9PSBudWxsKSAkZWwuZGF0YSgncmVzZXRUZXh0JywgJGVsW3ZhbF0oKSlcblxuICAgIC8vIHB1c2ggdG8gZXZlbnQgbG9vcCB0byBhbGxvdyBmb3JtcyB0byBzdWJtaXRcbiAgICBzZXRUaW1lb3V0KCQucHJveHkoZnVuY3Rpb24gKCkge1xuICAgICAgJGVsW3ZhbF0oZGF0YVtzdGF0ZV0gPT0gbnVsbCA/IHRoaXMub3B0aW9uc1tzdGF0ZV0gOiBkYXRhW3N0YXRlXSlcblxuICAgICAgaWYgKHN0YXRlID09ICdsb2FkaW5nVGV4dCcpIHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlXG4gICAgICAgICRlbC5hZGRDbGFzcyhkKS5hdHRyKGQsIGQpLnByb3AoZCwgdHJ1ZSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0xvYWRpbmcpIHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICAkZWwucmVtb3ZlQ2xhc3MoZCkucmVtb3ZlQXR0cihkKS5wcm9wKGQsIGZhbHNlKVxuICAgICAgfVxuICAgIH0sIHRoaXMpLCAwKVxuICB9XG5cbiAgQnV0dG9uLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNoYW5nZWQgPSB0cnVlXG4gICAgdmFyICRwYXJlbnQgPSB0aGlzLiRlbGVtZW50LmNsb3Nlc3QoJ1tkYXRhLXRvZ2dsZT1cImJ1dHRvbnNcIl0nKVxuXG4gICAgaWYgKCRwYXJlbnQubGVuZ3RoKSB7XG4gICAgICB2YXIgJGlucHV0ID0gdGhpcy4kZWxlbWVudC5maW5kKCdpbnB1dCcpXG4gICAgICBpZiAoJGlucHV0LnByb3AoJ3R5cGUnKSA9PSAncmFkaW8nKSB7XG4gICAgICAgIGlmICgkaW5wdXQucHJvcCgnY2hlY2tlZCcpKSBjaGFuZ2VkID0gZmFsc2VcbiAgICAgICAgJHBhcmVudC5maW5kKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICB9IGVsc2UgaWYgKCRpbnB1dC5wcm9wKCd0eXBlJykgPT0gJ2NoZWNrYm94Jykge1xuICAgICAgICBpZiAoKCRpbnB1dC5wcm9wKCdjaGVja2VkJykpICE9PSB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdhY3RpdmUnKSkgY2hhbmdlZCA9IGZhbHNlXG4gICAgICAgIHRoaXMuJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICB9XG4gICAgICAkaW5wdXQucHJvcCgnY2hlY2tlZCcsIHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2FjdGl2ZScpKVxuICAgICAgaWYgKGNoYW5nZWQpICRpbnB1dC50cmlnZ2VyKCdjaGFuZ2UnKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtcHJlc3NlZCcsICF0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdhY3RpdmUnKSlcbiAgICAgIHRoaXMuJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgfVxuICB9XG5cblxuICAvLyBCVVRUT04gUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLmJ1dHRvbicpXG4gICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuYnV0dG9uJywgKGRhdGEgPSBuZXcgQnV0dG9uKHRoaXMsIG9wdGlvbnMpKSlcblxuICAgICAgaWYgKG9wdGlvbiA9PSAndG9nZ2xlJykgZGF0YS50b2dnbGUoKVxuICAgICAgZWxzZSBpZiAob3B0aW9uKSBkYXRhLnNldFN0YXRlKG9wdGlvbilcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4uYnV0dG9uXG5cbiAgJC5mbi5idXR0b24gICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5idXR0b24uQ29uc3RydWN0b3IgPSBCdXR0b25cblxuXG4gIC8vIEJVVFRPTiBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT1cblxuICAkLmZuLmJ1dHRvbi5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uYnV0dG9uID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQlVUVE9OIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09PVxuXG4gICQoZG9jdW1lbnQpXG4gICAgLm9uKCdjbGljay5icy5idXR0b24uZGF0YS1hcGknLCAnW2RhdGEtdG9nZ2xlXj1cImJ1dHRvblwiXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgJGJ0biA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5idG4nKVxuICAgICAgUGx1Z2luLmNhbGwoJGJ0biwgJ3RvZ2dsZScpXG4gICAgICBpZiAoISgkKGUudGFyZ2V0KS5pcygnaW5wdXRbdHlwZT1cInJhZGlvXCJdLCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKSkpIHtcbiAgICAgICAgLy8gUHJldmVudCBkb3VibGUgY2xpY2sgb24gcmFkaW9zLCBhbmQgdGhlIGRvdWJsZSBzZWxlY3Rpb25zIChzbyBjYW5jZWxsYXRpb24pIG9uIGNoZWNrYm94ZXNcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIC8vIFRoZSB0YXJnZXQgY29tcG9uZW50IHN0aWxsIHJlY2VpdmUgdGhlIGZvY3VzXG4gICAgICAgIGlmICgkYnRuLmlzKCdpbnB1dCxidXR0b24nKSkgJGJ0bi50cmlnZ2VyKCdmb2N1cycpXG4gICAgICAgIGVsc2UgJGJ0bi5maW5kKCdpbnB1dDp2aXNpYmxlLGJ1dHRvbjp2aXNpYmxlJykuZmlyc3QoKS50cmlnZ2VyKCdmb2N1cycpXG4gICAgICB9XG4gICAgfSlcbiAgICAub24oJ2ZvY3VzLmJzLmJ1dHRvbi5kYXRhLWFwaSBibHVyLmJzLmJ1dHRvbi5kYXRhLWFwaScsICdbZGF0YS10b2dnbGVePVwiYnV0dG9uXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5idG4nKS50b2dnbGVDbGFzcygnZm9jdXMnLCAvXmZvY3VzKGluKT8kLy50ZXN0KGUudHlwZSkpXG4gICAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogY2Fyb3VzZWwuanMgdjMuNC4xXG4gKiBodHRwczovL2dldGJvb3RzdHJhcC5jb20vZG9jcy8zLjQvamF2YXNjcmlwdC8jY2Fyb3VzZWxcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxOSBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBDQVJPVVNFTCBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgQ2Fyb3VzZWwgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgICAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy4kaW5kaWNhdG9ycyA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmNhcm91c2VsLWluZGljYXRvcnMnKVxuICAgIHRoaXMub3B0aW9ucyAgICAgPSBvcHRpb25zXG4gICAgdGhpcy5wYXVzZWQgICAgICA9IG51bGxcbiAgICB0aGlzLnNsaWRpbmcgICAgID0gbnVsbFxuICAgIHRoaXMuaW50ZXJ2YWwgICAgPSBudWxsXG4gICAgdGhpcy4kYWN0aXZlICAgICA9IG51bGxcbiAgICB0aGlzLiRpdGVtcyAgICAgID0gbnVsbFxuXG4gICAgdGhpcy5vcHRpb25zLmtleWJvYXJkICYmIHRoaXMuJGVsZW1lbnQub24oJ2tleWRvd24uYnMuY2Fyb3VzZWwnLCAkLnByb3h5KHRoaXMua2V5ZG93biwgdGhpcykpXG5cbiAgICB0aGlzLm9wdGlvbnMucGF1c2UgPT0gJ2hvdmVyJyAmJiAhKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgJiYgdGhpcy4kZWxlbWVudFxuICAgICAgLm9uKCdtb3VzZWVudGVyLmJzLmNhcm91c2VsJywgJC5wcm94eSh0aGlzLnBhdXNlLCB0aGlzKSlcbiAgICAgIC5vbignbW91c2VsZWF2ZS5icy5jYXJvdXNlbCcsICQucHJveHkodGhpcy5jeWNsZSwgdGhpcykpXG4gIH1cblxuICBDYXJvdXNlbC5WRVJTSU9OICA9ICczLjQuMSdcblxuICBDYXJvdXNlbC5UUkFOU0lUSU9OX0RVUkFUSU9OID0gNjAwXG5cbiAgQ2Fyb3VzZWwuREVGQVVMVFMgPSB7XG4gICAgaW50ZXJ2YWw6IDUwMDAsXG4gICAgcGF1c2U6ICdob3ZlcicsXG4gICAgd3JhcDogdHJ1ZSxcbiAgICBrZXlib2FyZDogdHJ1ZVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLmtleWRvd24gPSBmdW5jdGlvbiAoZSkge1xuICAgIGlmICgvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGUudGFyZ2V0LnRhZ05hbWUpKSByZXR1cm5cbiAgICBzd2l0Y2ggKGUud2hpY2gpIHtcbiAgICAgIGNhc2UgMzc6IHRoaXMucHJldigpOyBicmVha1xuICAgICAgY2FzZSAzOTogdGhpcy5uZXh0KCk7IGJyZWFrXG4gICAgICBkZWZhdWx0OiByZXR1cm5cbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5jeWNsZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgZSB8fCAodGhpcy5wYXVzZWQgPSBmYWxzZSlcblxuICAgIHRoaXMuaW50ZXJ2YWwgJiYgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKVxuXG4gICAgdGhpcy5vcHRpb25zLmludGVydmFsXG4gICAgICAmJiAhdGhpcy5wYXVzZWRcbiAgICAgICYmICh0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoJC5wcm94eSh0aGlzLm5leHQsIHRoaXMpLCB0aGlzLm9wdGlvbnMuaW50ZXJ2YWwpKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5nZXRJdGVtSW5kZXggPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgIHRoaXMuJGl0ZW1zID0gaXRlbS5wYXJlbnQoKS5jaGlsZHJlbignLml0ZW0nKVxuICAgIHJldHVybiB0aGlzLiRpdGVtcy5pbmRleChpdGVtIHx8IHRoaXMuJGFjdGl2ZSlcbiAgfVxuXG4gIENhcm91c2VsLnByb3RvdHlwZS5nZXRJdGVtRm9yRGlyZWN0aW9uID0gZnVuY3Rpb24gKGRpcmVjdGlvbiwgYWN0aXZlKSB7XG4gICAgdmFyIGFjdGl2ZUluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgoYWN0aXZlKVxuICAgIHZhciB3aWxsV3JhcCA9IChkaXJlY3Rpb24gPT0gJ3ByZXYnICYmIGFjdGl2ZUluZGV4ID09PSAwKVxuICAgICAgICAgICAgICAgIHx8IChkaXJlY3Rpb24gPT0gJ25leHQnICYmIGFjdGl2ZUluZGV4ID09ICh0aGlzLiRpdGVtcy5sZW5ndGggLSAxKSlcbiAgICBpZiAod2lsbFdyYXAgJiYgIXRoaXMub3B0aW9ucy53cmFwKSByZXR1cm4gYWN0aXZlXG4gICAgdmFyIGRlbHRhID0gZGlyZWN0aW9uID09ICdwcmV2JyA/IC0xIDogMVxuICAgIHZhciBpdGVtSW5kZXggPSAoYWN0aXZlSW5kZXggKyBkZWx0YSkgJSB0aGlzLiRpdGVtcy5sZW5ndGhcbiAgICByZXR1cm4gdGhpcy4kaXRlbXMuZXEoaXRlbUluZGV4KVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLnRvID0gZnVuY3Rpb24gKHBvcykge1xuICAgIHZhciB0aGF0ICAgICAgICA9IHRoaXNcbiAgICB2YXIgYWN0aXZlSW5kZXggPSB0aGlzLmdldEl0ZW1JbmRleCh0aGlzLiRhY3RpdmUgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5pdGVtLmFjdGl2ZScpKVxuXG4gICAgaWYgKHBvcyA+ICh0aGlzLiRpdGVtcy5sZW5ndGggLSAxKSB8fCBwb3MgPCAwKSByZXR1cm5cblxuICAgIGlmICh0aGlzLnNsaWRpbmcpICAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50Lm9uZSgnc2xpZC5icy5jYXJvdXNlbCcsIGZ1bmN0aW9uICgpIHsgdGhhdC50byhwb3MpIH0pIC8vIHllcywgXCJzbGlkXCJcbiAgICBpZiAoYWN0aXZlSW5kZXggPT0gcG9zKSByZXR1cm4gdGhpcy5wYXVzZSgpLmN5Y2xlKClcblxuICAgIHJldHVybiB0aGlzLnNsaWRlKHBvcyA+IGFjdGl2ZUluZGV4ID8gJ25leHQnIDogJ3ByZXYnLCB0aGlzLiRpdGVtcy5lcShwb3MpKVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlIHx8ICh0aGlzLnBhdXNlZCA9IHRydWUpXG5cbiAgICBpZiAodGhpcy4kZWxlbWVudC5maW5kKCcubmV4dCwgLnByZXYnKS5sZW5ndGggJiYgJC5zdXBwb3J0LnRyYW5zaXRpb24pIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcigkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQpXG4gICAgICB0aGlzLmN5Y2xlKHRydWUpXG4gICAgfVxuXG4gICAgdGhpcy5pbnRlcnZhbCA9IGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zbGlkaW5nKSByZXR1cm5cbiAgICByZXR1cm4gdGhpcy5zbGlkZSgnbmV4dCcpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUucHJldiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zbGlkaW5nKSByZXR1cm5cbiAgICByZXR1cm4gdGhpcy5zbGlkZSgncHJldicpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUuc2xpZGUgPSBmdW5jdGlvbiAodHlwZSwgbmV4dCkge1xuICAgIHZhciAkYWN0aXZlICAgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5pdGVtLmFjdGl2ZScpXG4gICAgdmFyICRuZXh0ICAgICA9IG5leHQgfHwgdGhpcy5nZXRJdGVtRm9yRGlyZWN0aW9uKHR5cGUsICRhY3RpdmUpXG4gICAgdmFyIGlzQ3ljbGluZyA9IHRoaXMuaW50ZXJ2YWxcbiAgICB2YXIgZGlyZWN0aW9uID0gdHlwZSA9PSAnbmV4dCcgPyAnbGVmdCcgOiAncmlnaHQnXG4gICAgdmFyIHRoYXQgICAgICA9IHRoaXNcblxuICAgIGlmICgkbmV4dC5oYXNDbGFzcygnYWN0aXZlJykpIHJldHVybiAodGhpcy5zbGlkaW5nID0gZmFsc2UpXG5cbiAgICB2YXIgcmVsYXRlZFRhcmdldCA9ICRuZXh0WzBdXG4gICAgdmFyIHNsaWRlRXZlbnQgPSAkLkV2ZW50KCdzbGlkZS5icy5jYXJvdXNlbCcsIHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6IHJlbGF0ZWRUYXJnZXQsXG4gICAgICBkaXJlY3Rpb246IGRpcmVjdGlvblxuICAgIH0pXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKHNsaWRlRXZlbnQpXG4gICAgaWYgKHNsaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5zbGlkaW5nID0gdHJ1ZVxuXG4gICAgaXNDeWNsaW5nICYmIHRoaXMucGF1c2UoKVxuXG4gICAgaWYgKHRoaXMuJGluZGljYXRvcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLiRpbmRpY2F0b3JzLmZpbmQoJy5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgIHZhciAkbmV4dEluZGljYXRvciA9ICQodGhpcy4kaW5kaWNhdG9ycy5jaGlsZHJlbigpW3RoaXMuZ2V0SXRlbUluZGV4KCRuZXh0KV0pXG4gICAgICAkbmV4dEluZGljYXRvciAmJiAkbmV4dEluZGljYXRvci5hZGRDbGFzcygnYWN0aXZlJylcbiAgICB9XG5cbiAgICB2YXIgc2xpZEV2ZW50ID0gJC5FdmVudCgnc2xpZC5icy5jYXJvdXNlbCcsIHsgcmVsYXRlZFRhcmdldDogcmVsYXRlZFRhcmdldCwgZGlyZWN0aW9uOiBkaXJlY3Rpb24gfSkgLy8geWVzLCBcInNsaWRcIlxuICAgIGlmICgkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdzbGlkZScpKSB7XG4gICAgICAkbmV4dC5hZGRDbGFzcyh0eXBlKVxuICAgICAgaWYgKHR5cGVvZiAkbmV4dCA9PT0gJ29iamVjdCcgJiYgJG5leHQubGVuZ3RoKSB7XG4gICAgICAgICRuZXh0WzBdLm9mZnNldFdpZHRoIC8vIGZvcmNlIHJlZmxvd1xuICAgICAgfVxuICAgICAgJGFjdGl2ZS5hZGRDbGFzcyhkaXJlY3Rpb24pXG4gICAgICAkbmV4dC5hZGRDbGFzcyhkaXJlY3Rpb24pXG4gICAgICAkYWN0aXZlXG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkbmV4dC5yZW1vdmVDbGFzcyhbdHlwZSwgZGlyZWN0aW9uXS5qb2luKCcgJykpLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICRhY3RpdmUucmVtb3ZlQ2xhc3MoWydhY3RpdmUnLCBkaXJlY3Rpb25dLmpvaW4oJyAnKSlcbiAgICAgICAgICB0aGF0LnNsaWRpbmcgPSBmYWxzZVxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKHNsaWRFdmVudClcbiAgICAgICAgICB9LCAwKVxuICAgICAgICB9KVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoQ2Fyb3VzZWwuVFJBTlNJVElPTl9EVVJBVElPTilcbiAgICB9IGVsc2Uge1xuICAgICAgJGFjdGl2ZS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICRuZXh0LmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgdGhpcy5zbGlkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihzbGlkRXZlbnQpXG4gICAgfVxuXG4gICAgaXNDeWNsaW5nICYmIHRoaXMuY3ljbGUoKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQ0FST1VTRUwgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuY2Fyb3VzZWwnKVxuICAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgQ2Fyb3VzZWwuREVGQVVMVFMsICR0aGlzLmRhdGEoKSwgdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb24pXG4gICAgICB2YXIgYWN0aW9uICA9IHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycgPyBvcHRpb24gOiBvcHRpb25zLnNsaWRlXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuY2Fyb3VzZWwnLCAoZGF0YSA9IG5ldyBDYXJvdXNlbCh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnbnVtYmVyJykgZGF0YS50byhvcHRpb24pXG4gICAgICBlbHNlIGlmIChhY3Rpb24pIGRhdGFbYWN0aW9uXSgpXG4gICAgICBlbHNlIGlmIChvcHRpb25zLmludGVydmFsKSBkYXRhLnBhdXNlKCkuY3ljbGUoKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5jYXJvdXNlbFxuXG4gICQuZm4uY2Fyb3VzZWwgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5jYXJvdXNlbC5Db25zdHJ1Y3RvciA9IENhcm91c2VsXG5cblxuICAvLyBDQVJPVVNFTCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uY2Fyb3VzZWwubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmNhcm91c2VsID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQ0FST1VTRUwgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT09PT1cblxuICB2YXIgY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICB2YXIgaHJlZiAgICA9ICR0aGlzLmF0dHIoJ2hyZWYnKVxuICAgIGlmIChocmVmKSB7XG4gICAgICBocmVmID0gaHJlZi5yZXBsYWNlKC8uKig/PSNbXlxcc10rJCkvLCAnJykgLy8gc3RyaXAgZm9yIGllN1xuICAgIH1cblxuICAgIHZhciB0YXJnZXQgID0gJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKSB8fCBocmVmXG4gICAgdmFyICR0YXJnZXQgPSAkKGRvY3VtZW50KS5maW5kKHRhcmdldClcblxuICAgIGlmICghJHRhcmdldC5oYXNDbGFzcygnY2Fyb3VzZWwnKSkgcmV0dXJuXG5cbiAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCAkdGFyZ2V0LmRhdGEoKSwgJHRoaXMuZGF0YSgpKVxuICAgIHZhciBzbGlkZUluZGV4ID0gJHRoaXMuYXR0cignZGF0YS1zbGlkZS10bycpXG4gICAgaWYgKHNsaWRlSW5kZXgpIG9wdGlvbnMuaW50ZXJ2YWwgPSBmYWxzZVxuXG4gICAgUGx1Z2luLmNhbGwoJHRhcmdldCwgb3B0aW9ucylcblxuICAgIGlmIChzbGlkZUluZGV4KSB7XG4gICAgICAkdGFyZ2V0LmRhdGEoJ2JzLmNhcm91c2VsJykudG8oc2xpZGVJbmRleClcbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gICQoZG9jdW1lbnQpXG4gICAgLm9uKCdjbGljay5icy5jYXJvdXNlbC5kYXRhLWFwaScsICdbZGF0YS1zbGlkZV0nLCBjbGlja0hhbmRsZXIpXG4gICAgLm9uKCdjbGljay5icy5jYXJvdXNlbC5kYXRhLWFwaScsICdbZGF0YS1zbGlkZS10b10nLCBjbGlja0hhbmRsZXIpXG5cbiAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLXJpZGU9XCJjYXJvdXNlbFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRjYXJvdXNlbCA9ICQodGhpcylcbiAgICAgIFBsdWdpbi5jYWxsKCRjYXJvdXNlbCwgJGNhcm91c2VsLmRhdGEoKSlcbiAgICB9KVxuICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBjb2xsYXBzZS5qcyB2My40LjFcbiAqIGh0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS9kb2NzLzMuNC9qYXZhc2NyaXB0LyNjb2xsYXBzZVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE5IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoganNoaW50IGxhdGVkZWY6IGZhbHNlICovXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gQ09MTEFQU0UgUFVCTElDIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgQ29sbGFwc2UgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgICAgICA9ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgICAgICAgPSAkLmV4dGVuZCh7fSwgQ29sbGFwc2UuREVGQVVMVFMsIG9wdGlvbnMpXG4gICAgdGhpcy4kdHJpZ2dlciAgICAgID0gJCgnW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl1baHJlZj1cIiMnICsgZWxlbWVudC5pZCArICdcIl0sJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl1bZGF0YS10YXJnZXQ9XCIjJyArIGVsZW1lbnQuaWQgKyAnXCJdJylcbiAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSBudWxsXG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnBhcmVudCkge1xuICAgICAgdGhpcy4kcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyh0aGlzLiRlbGVtZW50LCB0aGlzLiR0cmlnZ2VyKVxuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMudG9nZ2xlKSB0aGlzLnRvZ2dsZSgpXG4gIH1cblxuICBDb2xsYXBzZS5WRVJTSU9OICA9ICczLjQuMSdcblxuICBDb2xsYXBzZS5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMzUwXG5cbiAgQ29sbGFwc2UuREVGQVVMVFMgPSB7XG4gICAgdG9nZ2xlOiB0cnVlXG4gIH1cblxuICBDb2xsYXBzZS5wcm90b3R5cGUuZGltZW5zaW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBoYXNXaWR0aCA9IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ3dpZHRoJylcbiAgICByZXR1cm4gaGFzV2lkdGggPyAnd2lkdGgnIDogJ2hlaWdodCdcbiAgfVxuXG4gIENvbGxhcHNlLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnRyYW5zaXRpb25pbmcgfHwgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaW4nKSkgcmV0dXJuXG5cbiAgICB2YXIgYWN0aXZlc0RhdGFcbiAgICB2YXIgYWN0aXZlcyA9IHRoaXMuJHBhcmVudCAmJiB0aGlzLiRwYXJlbnQuY2hpbGRyZW4oJy5wYW5lbCcpLmNoaWxkcmVuKCcuaW4sIC5jb2xsYXBzaW5nJylcblxuICAgIGlmIChhY3RpdmVzICYmIGFjdGl2ZXMubGVuZ3RoKSB7XG4gICAgICBhY3RpdmVzRGF0YSA9IGFjdGl2ZXMuZGF0YSgnYnMuY29sbGFwc2UnKVxuICAgICAgaWYgKGFjdGl2ZXNEYXRhICYmIGFjdGl2ZXNEYXRhLnRyYW5zaXRpb25pbmcpIHJldHVyblxuICAgIH1cblxuICAgIHZhciBzdGFydEV2ZW50ID0gJC5FdmVudCgnc2hvdy5icy5jb2xsYXBzZScpXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKHN0YXJ0RXZlbnQpXG4gICAgaWYgKHN0YXJ0RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgaWYgKGFjdGl2ZXMgJiYgYWN0aXZlcy5sZW5ndGgpIHtcbiAgICAgIFBsdWdpbi5jYWxsKGFjdGl2ZXMsICdoaWRlJylcbiAgICAgIGFjdGl2ZXNEYXRhIHx8IGFjdGl2ZXMuZGF0YSgnYnMuY29sbGFwc2UnLCBudWxsKVxuICAgIH1cblxuICAgIHZhciBkaW1lbnNpb24gPSB0aGlzLmRpbWVuc2lvbigpXG5cbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlJylcbiAgICAgIC5hZGRDbGFzcygnY29sbGFwc2luZycpW2RpbWVuc2lvbl0oMClcbiAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcblxuICAgIHRoaXMuJHRyaWdnZXJcbiAgICAgIC5yZW1vdmVDbGFzcygnY29sbGFwc2VkJylcbiAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcblxuICAgIHRoaXMudHJhbnNpdGlvbmluZyA9IDFcblxuICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdjb2xsYXBzaW5nJylcbiAgICAgICAgLmFkZENsYXNzKCdjb2xsYXBzZSBpbicpW2RpbWVuc2lvbl0oJycpXG4gICAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSAwXG4gICAgICB0aGlzLiRlbGVtZW50XG4gICAgICAgIC50cmlnZ2VyKCdzaG93bi5icy5jb2xsYXBzZScpXG4gICAgfVxuXG4gICAgaWYgKCEkLnN1cHBvcnQudHJhbnNpdGlvbikgcmV0dXJuIGNvbXBsZXRlLmNhbGwodGhpcylcblxuICAgIHZhciBzY3JvbGxTaXplID0gJC5jYW1lbENhc2UoWydzY3JvbGwnLCBkaW1lbnNpb25dLmpvaW4oJy0nKSlcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsICQucHJveHkoY29tcGxldGUsIHRoaXMpKVxuICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKENvbGxhcHNlLlRSQU5TSVRJT05fRFVSQVRJT04pW2RpbWVuc2lvbl0odGhpcy4kZWxlbWVudFswXVtzY3JvbGxTaXplXSlcbiAgfVxuXG4gIENvbGxhcHNlLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnRyYW5zaXRpb25pbmcgfHwgIXRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2luJykpIHJldHVyblxuXG4gICAgdmFyIHN0YXJ0RXZlbnQgPSAkLkV2ZW50KCdoaWRlLmJzLmNvbGxhcHNlJylcbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoc3RhcnRFdmVudClcbiAgICBpZiAoc3RhcnRFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICB2YXIgZGltZW5zaW9uID0gdGhpcy5kaW1lbnNpb24oKVxuXG4gICAgdGhpcy4kZWxlbWVudFtkaW1lbnNpb25dKHRoaXMuJGVsZW1lbnRbZGltZW5zaW9uXSgpKVswXS5vZmZzZXRIZWlnaHRcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5hZGRDbGFzcygnY29sbGFwc2luZycpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlIGluJylcbiAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpXG5cbiAgICB0aGlzLiR0cmlnZ2VyXG4gICAgICAuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpXG4gICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKVxuXG4gICAgdGhpcy50cmFuc2l0aW9uaW5nID0gMVxuXG4gICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy50cmFuc2l0aW9uaW5nID0gMFxuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNpbmcnKVxuICAgICAgICAuYWRkQ2xhc3MoJ2NvbGxhcHNlJylcbiAgICAgICAgLnRyaWdnZXIoJ2hpZGRlbi5icy5jb2xsYXBzZScpXG4gICAgfVxuXG4gICAgaWYgKCEkLnN1cHBvcnQudHJhbnNpdGlvbikgcmV0dXJuIGNvbXBsZXRlLmNhbGwodGhpcylcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIFtkaW1lbnNpb25dKDApXG4gICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCAkLnByb3h5KGNvbXBsZXRlLCB0aGlzKSlcbiAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChDb2xsYXBzZS5UUkFOU0lUSU9OX0RVUkFUSU9OKVxuICB9XG5cbiAgQ29sbGFwc2UucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzW3RoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2luJykgPyAnaGlkZScgOiAnc2hvdyddKClcbiAgfVxuXG4gIENvbGxhcHNlLnByb3RvdHlwZS5nZXRQYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICQoZG9jdW1lbnQpLmZpbmQodGhpcy5vcHRpb25zLnBhcmVudClcbiAgICAgIC5maW5kKCdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXVtkYXRhLXBhcmVudD1cIicgKyB0aGlzLm9wdGlvbnMucGFyZW50ICsgJ1wiXScpXG4gICAgICAuZWFjaCgkLnByb3h5KGZ1bmN0aW9uIChpLCBlbGVtZW50KSB7XG4gICAgICAgIHZhciAkZWxlbWVudCA9ICQoZWxlbWVudClcbiAgICAgICAgdGhpcy5hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MoZ2V0VGFyZ2V0RnJvbVRyaWdnZXIoJGVsZW1lbnQpLCAkZWxlbWVudClcbiAgICAgIH0sIHRoaXMpKVxuICAgICAgLmVuZCgpXG4gIH1cblxuICBDb2xsYXBzZS5wcm90b3R5cGUuYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzID0gZnVuY3Rpb24gKCRlbGVtZW50LCAkdHJpZ2dlcikge1xuICAgIHZhciBpc09wZW4gPSAkZWxlbWVudC5oYXNDbGFzcygnaW4nKVxuXG4gICAgJGVsZW1lbnQuYXR0cignYXJpYS1leHBhbmRlZCcsIGlzT3BlbilcbiAgICAkdHJpZ2dlclxuICAgICAgLnRvZ2dsZUNsYXNzKCdjb2xsYXBzZWQnLCAhaXNPcGVuKVxuICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBpc09wZW4pXG4gIH1cblxuICBmdW5jdGlvbiBnZXRUYXJnZXRGcm9tVHJpZ2dlcigkdHJpZ2dlcikge1xuICAgIHZhciBocmVmXG4gICAgdmFyIHRhcmdldCA9ICR0cmlnZ2VyLmF0dHIoJ2RhdGEtdGFyZ2V0JylcbiAgICAgIHx8IChocmVmID0gJHRyaWdnZXIuYXR0cignaHJlZicpKSAmJiBocmVmLnJlcGxhY2UoLy4qKD89I1teXFxzXSskKS8sICcnKSAvLyBzdHJpcCBmb3IgaWU3XG5cbiAgICByZXR1cm4gJChkb2N1bWVudCkuZmluZCh0YXJnZXQpXG4gIH1cblxuXG4gIC8vIENPTExBUFNFIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLmNvbGxhcHNlJylcbiAgICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoe30sIENvbGxhcHNlLkRFRkFVTFRTLCAkdGhpcy5kYXRhKCksIHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uKVxuXG4gICAgICBpZiAoIWRhdGEgJiYgb3B0aW9ucy50b2dnbGUgJiYgL3Nob3d8aGlkZS8udGVzdChvcHRpb24pKSBvcHRpb25zLnRvZ2dsZSA9IGZhbHNlXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmNvbGxhcHNlJywgKGRhdGEgPSBuZXcgQ29sbGFwc2UodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLmNvbGxhcHNlXG5cbiAgJC5mbi5jb2xsYXBzZSAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmNvbGxhcHNlLkNvbnN0cnVjdG9yID0gQ29sbGFwc2VcblxuXG4gIC8vIENPTExBUFNFIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5jb2xsYXBzZS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uY29sbGFwc2UgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBDT0xMQVBTRSBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5icy5jb2xsYXBzZS5kYXRhLWFwaScsICdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG5cbiAgICBpZiAoISR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JykpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgdmFyICR0YXJnZXQgPSBnZXRUYXJnZXRGcm9tVHJpZ2dlcigkdGhpcylcbiAgICB2YXIgZGF0YSAgICA9ICR0YXJnZXQuZGF0YSgnYnMuY29sbGFwc2UnKVxuICAgIHZhciBvcHRpb24gID0gZGF0YSA/ICd0b2dnbGUnIDogJHRoaXMuZGF0YSgpXG5cbiAgICBQbHVnaW4uY2FsbCgkdGFyZ2V0LCBvcHRpb24pXG4gIH0pXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IGRyb3Bkb3duLmpzIHYzLjQuMVxuICogaHR0cHM6Ly9nZXRib290c3RyYXAuY29tL2RvY3MvMy40L2phdmFzY3JpcHQvI2Ryb3Bkb3duc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE5IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIERST1BET1dOIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBiYWNrZHJvcCA9ICcuZHJvcGRvd24tYmFja2Ryb3AnXG4gIHZhciB0b2dnbGUgICA9ICdbZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXSdcbiAgdmFyIERyb3Bkb3duID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAkKGVsZW1lbnQpLm9uKCdjbGljay5icy5kcm9wZG93bicsIHRoaXMudG9nZ2xlKVxuICB9XG5cbiAgRHJvcGRvd24uVkVSU0lPTiA9ICczLjQuMSdcblxuICBmdW5jdGlvbiBnZXRQYXJlbnQoJHRoaXMpIHtcbiAgICB2YXIgc2VsZWN0b3IgPSAkdGhpcy5hdHRyKCdkYXRhLXRhcmdldCcpXG5cbiAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICBzZWxlY3RvciA9ICR0aGlzLmF0dHIoJ2hyZWYnKVxuICAgICAgc2VsZWN0b3IgPSBzZWxlY3RvciAmJiAvI1tBLVphLXpdLy50ZXN0KHNlbGVjdG9yKSAmJiBzZWxlY3Rvci5yZXBsYWNlKC8uKig/PSNbXlxcc10qJCkvLCAnJykgLy8gc3RyaXAgZm9yIGllN1xuICAgIH1cblxuICAgIHZhciAkcGFyZW50ID0gc2VsZWN0b3IgIT09ICcjJyA/ICQoZG9jdW1lbnQpLmZpbmQoc2VsZWN0b3IpIDogbnVsbFxuXG4gICAgcmV0dXJuICRwYXJlbnQgJiYgJHBhcmVudC5sZW5ndGggPyAkcGFyZW50IDogJHRoaXMucGFyZW50KClcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyTWVudXMoZSkge1xuICAgIGlmIChlICYmIGUud2hpY2ggPT09IDMpIHJldHVyblxuICAgICQoYmFja2Ryb3ApLnJlbW92ZSgpXG4gICAgJCh0b2dnbGUpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgICAgICAgPSAkKHRoaXMpXG4gICAgICB2YXIgJHBhcmVudCAgICAgICA9IGdldFBhcmVudCgkdGhpcylcbiAgICAgIHZhciByZWxhdGVkVGFyZ2V0ID0geyByZWxhdGVkVGFyZ2V0OiB0aGlzIH1cblxuICAgICAgaWYgKCEkcGFyZW50Lmhhc0NsYXNzKCdvcGVuJykpIHJldHVyblxuXG4gICAgICBpZiAoZSAmJiBlLnR5cGUgPT0gJ2NsaWNrJyAmJiAvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGUudGFyZ2V0LnRhZ05hbWUpICYmICQuY29udGFpbnMoJHBhcmVudFswXSwgZS50YXJnZXQpKSByZXR1cm5cblxuICAgICAgJHBhcmVudC50cmlnZ2VyKGUgPSAkLkV2ZW50KCdoaWRlLmJzLmRyb3Bkb3duJywgcmVsYXRlZFRhcmdldCkpXG5cbiAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgICAgJHRoaXMuYXR0cignYXJpYS1leHBhbmRlZCcsICdmYWxzZScpXG4gICAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdvcGVuJykudHJpZ2dlcigkLkV2ZW50KCdoaWRkZW4uYnMuZHJvcGRvd24nLCByZWxhdGVkVGFyZ2V0KSlcbiAgICB9KVxuICB9XG5cbiAgRHJvcGRvd24ucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyICR0aGlzID0gJCh0aGlzKVxuXG4gICAgaWYgKCR0aGlzLmlzKCcuZGlzYWJsZWQsIDpkaXNhYmxlZCcpKSByZXR1cm5cblxuICAgIHZhciAkcGFyZW50ICA9IGdldFBhcmVudCgkdGhpcylcbiAgICB2YXIgaXNBY3RpdmUgPSAkcGFyZW50Lmhhc0NsYXNzKCdvcGVuJylcblxuICAgIGNsZWFyTWVudXMoKVxuXG4gICAgaWYgKCFpc0FjdGl2ZSkge1xuICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiAhJHBhcmVudC5jbG9zZXN0KCcubmF2YmFyLW5hdicpLmxlbmd0aCkge1xuICAgICAgICAvLyBpZiBtb2JpbGUgd2UgdXNlIGEgYmFja2Ryb3AgYmVjYXVzZSBjbGljayBldmVudHMgZG9uJ3QgZGVsZWdhdGVcbiAgICAgICAgJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSlcbiAgICAgICAgICAuYWRkQ2xhc3MoJ2Ryb3Bkb3duLWJhY2tkcm9wJylcbiAgICAgICAgICAuaW5zZXJ0QWZ0ZXIoJCh0aGlzKSlcbiAgICAgICAgICAub24oJ2NsaWNrJywgY2xlYXJNZW51cylcbiAgICAgIH1cblxuICAgICAgdmFyIHJlbGF0ZWRUYXJnZXQgPSB7IHJlbGF0ZWRUYXJnZXQ6IHRoaXMgfVxuICAgICAgJHBhcmVudC50cmlnZ2VyKGUgPSAkLkV2ZW50KCdzaG93LmJzLmRyb3Bkb3duJywgcmVsYXRlZFRhcmdldCkpXG5cbiAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgICAgJHRoaXNcbiAgICAgICAgLnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpXG5cbiAgICAgICRwYXJlbnRcbiAgICAgICAgLnRvZ2dsZUNsYXNzKCdvcGVuJylcbiAgICAgICAgLnRyaWdnZXIoJC5FdmVudCgnc2hvd24uYnMuZHJvcGRvd24nLCByZWxhdGVkVGFyZ2V0KSlcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIERyb3Bkb3duLnByb3RvdHlwZS5rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoIS8oMzh8NDB8Mjd8MzIpLy50ZXN0KGUud2hpY2gpIHx8IC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZS50YXJnZXQudGFnTmFtZSkpIHJldHVyblxuXG4gICAgdmFyICR0aGlzID0gJCh0aGlzKVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgaWYgKCR0aGlzLmlzKCcuZGlzYWJsZWQsIDpkaXNhYmxlZCcpKSByZXR1cm5cblxuICAgIHZhciAkcGFyZW50ICA9IGdldFBhcmVudCgkdGhpcylcbiAgICB2YXIgaXNBY3RpdmUgPSAkcGFyZW50Lmhhc0NsYXNzKCdvcGVuJylcblxuICAgIGlmICghaXNBY3RpdmUgJiYgZS53aGljaCAhPSAyNyB8fCBpc0FjdGl2ZSAmJiBlLndoaWNoID09IDI3KSB7XG4gICAgICBpZiAoZS53aGljaCA9PSAyNykgJHBhcmVudC5maW5kKHRvZ2dsZSkudHJpZ2dlcignZm9jdXMnKVxuICAgICAgcmV0dXJuICR0aGlzLnRyaWdnZXIoJ2NsaWNrJylcbiAgICB9XG5cbiAgICB2YXIgZGVzYyA9ICcgbGk6bm90KC5kaXNhYmxlZCk6dmlzaWJsZSBhJ1xuICAgIHZhciAkaXRlbXMgPSAkcGFyZW50LmZpbmQoJy5kcm9wZG93bi1tZW51JyArIGRlc2MpXG5cbiAgICBpZiAoISRpdGVtcy5sZW5ndGgpIHJldHVyblxuXG4gICAgdmFyIGluZGV4ID0gJGl0ZW1zLmluZGV4KGUudGFyZ2V0KVxuXG4gICAgaWYgKGUud2hpY2ggPT0gMzggJiYgaW5kZXggPiAwKSAgICAgICAgICAgICAgICAgaW5kZXgtLSAgICAgICAgIC8vIHVwXG4gICAgaWYgKGUud2hpY2ggPT0gNDAgJiYgaW5kZXggPCAkaXRlbXMubGVuZ3RoIC0gMSkgaW5kZXgrKyAgICAgICAgIC8vIGRvd25cbiAgICBpZiAoIX5pbmRleCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDBcblxuICAgICRpdGVtcy5lcShpbmRleCkudHJpZ2dlcignZm9jdXMnKVxuICB9XG5cblxuICAvLyBEUk9QRE9XTiBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICA9ICR0aGlzLmRhdGEoJ2JzLmRyb3Bkb3duJylcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5kcm9wZG93bicsIChkYXRhID0gbmV3IERyb3Bkb3duKHRoaXMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0uY2FsbCgkdGhpcylcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4uZHJvcGRvd25cblxuICAkLmZuLmRyb3Bkb3duICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4uZHJvcGRvd24uQ29uc3RydWN0b3IgPSBEcm9wZG93blxuXG5cbiAgLy8gRFJPUERPV04gTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09PT1cblxuICAkLmZuLmRyb3Bkb3duLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5kcm9wZG93biA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIEFQUExZIFRPIFNUQU5EQVJEIERST1BET1dOIEVMRU1FTlRTXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudClcbiAgICAub24oJ2NsaWNrLmJzLmRyb3Bkb3duLmRhdGEtYXBpJywgY2xlYXJNZW51cylcbiAgICAub24oJ2NsaWNrLmJzLmRyb3Bkb3duLmRhdGEtYXBpJywgJy5kcm9wZG93biBmb3JtJywgZnVuY3Rpb24gKGUpIHsgZS5zdG9wUHJvcGFnYXRpb24oKSB9KVxuICAgIC5vbignY2xpY2suYnMuZHJvcGRvd24uZGF0YS1hcGknLCB0b2dnbGUsIERyb3Bkb3duLnByb3RvdHlwZS50b2dnbGUpXG4gICAgLm9uKCdrZXlkb3duLmJzLmRyb3Bkb3duLmRhdGEtYXBpJywgdG9nZ2xlLCBEcm9wZG93bi5wcm90b3R5cGUua2V5ZG93bilcbiAgICAub24oJ2tleWRvd24uYnMuZHJvcGRvd24uZGF0YS1hcGknLCAnLmRyb3Bkb3duLW1lbnUnLCBEcm9wZG93bi5wcm90b3R5cGUua2V5ZG93bilcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogbW9kYWwuanMgdjMuNC4xXG4gKiBodHRwczovL2dldGJvb3RzdHJhcC5jb20vZG9jcy8zLjQvamF2YXNjcmlwdC8jbW9kYWxzXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTkgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gTU9EQUwgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIE1vZGFsID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy4kYm9keSA9ICQoZG9jdW1lbnQuYm9keSlcbiAgICB0aGlzLiRlbGVtZW50ID0gJChlbGVtZW50KVxuICAgIHRoaXMuJGRpYWxvZyA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLm1vZGFsLWRpYWxvZycpXG4gICAgdGhpcy4kYmFja2Ryb3AgPSBudWxsXG4gICAgdGhpcy5pc1Nob3duID0gbnVsbFxuICAgIHRoaXMub3JpZ2luYWxCb2R5UGFkID0gbnVsbFxuICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGggPSAwXG4gICAgdGhpcy5pZ25vcmVCYWNrZHJvcENsaWNrID0gZmFsc2VcbiAgICB0aGlzLmZpeGVkQ29udGVudCA9ICcubmF2YmFyLWZpeGVkLXRvcCwgLm5hdmJhci1maXhlZC1ib3R0b20nXG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlbW90ZSkge1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAuZmluZCgnLm1vZGFsLWNvbnRlbnQnKVxuICAgICAgICAubG9hZCh0aGlzLm9wdGlvbnMucmVtb3RlLCAkLnByb3h5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2xvYWRlZC5icy5tb2RhbCcpXG4gICAgICAgIH0sIHRoaXMpKVxuICAgIH1cbiAgfVxuXG4gIE1vZGFsLlZFUlNJT04gPSAnMy40LjEnXG5cbiAgTW9kYWwuVFJBTlNJVElPTl9EVVJBVElPTiA9IDMwMFxuICBNb2RhbC5CQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgTW9kYWwuREVGQVVMVFMgPSB7XG4gICAgYmFja2Ryb3A6IHRydWUsXG4gICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgc2hvdzogdHJ1ZVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIChfcmVsYXRlZFRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmlzU2hvd24gPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdyhfcmVsYXRlZFRhcmdldClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKF9yZWxhdGVkVGFyZ2V0KSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdmFyIGUgPSAkLkV2ZW50KCdzaG93LmJzLm1vZGFsJywgeyByZWxhdGVkVGFyZ2V0OiBfcmVsYXRlZFRhcmdldCB9KVxuXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG5cbiAgICBpZiAodGhpcy5pc1Nob3duIHx8IGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5pc1Nob3duID0gdHJ1ZVxuXG4gICAgdGhpcy5jaGVja1Njcm9sbGJhcigpXG4gICAgdGhpcy5zZXRTY3JvbGxiYXIoKVxuICAgIHRoaXMuJGJvZHkuYWRkQ2xhc3MoJ21vZGFsLW9wZW4nKVxuXG4gICAgdGhpcy5lc2NhcGUoKVxuICAgIHRoaXMucmVzaXplKClcblxuICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrLmRpc21pc3MuYnMubW9kYWwnLCAnW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJywgJC5wcm94eSh0aGlzLmhpZGUsIHRoaXMpKVxuXG4gICAgdGhpcy4kZGlhbG9nLm9uKCdtb3VzZWRvd24uZGlzbWlzcy5icy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoYXQuJGVsZW1lbnQub25lKCdtb3VzZXVwLmRpc21pc3MuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaXModGhhdC4kZWxlbWVudCkpIHRoYXQuaWdub3JlQmFja2Ryb3BDbGljayA9IHRydWVcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHRoaXMuYmFja2Ryb3AoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRyYW5zaXRpb24gPSAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGF0LiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJylcblxuICAgICAgaWYgKCF0aGF0LiRlbGVtZW50LnBhcmVudCgpLmxlbmd0aCkge1xuICAgICAgICB0aGF0LiRlbGVtZW50LmFwcGVuZFRvKHRoYXQuJGJvZHkpIC8vIGRvbid0IG1vdmUgbW9kYWxzIGRvbSBwb3NpdGlvblxuICAgICAgfVxuXG4gICAgICB0aGF0LiRlbGVtZW50XG4gICAgICAgIC5zaG93KClcbiAgICAgICAgLnNjcm9sbFRvcCgwKVxuXG4gICAgICB0aGF0LmFkanVzdERpYWxvZygpXG5cbiAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgIHRoYXQuJGVsZW1lbnRbMF0ub2Zmc2V0V2lkdGggLy8gZm9yY2UgcmVmbG93XG4gICAgICB9XG5cbiAgICAgIHRoYXQuJGVsZW1lbnQuYWRkQ2xhc3MoJ2luJylcblxuICAgICAgdGhhdC5lbmZvcmNlRm9jdXMoKVxuXG4gICAgICB2YXIgZSA9ICQuRXZlbnQoJ3Nob3duLmJzLm1vZGFsJywgeyByZWxhdGVkVGFyZ2V0OiBfcmVsYXRlZFRhcmdldCB9KVxuXG4gICAgICB0cmFuc2l0aW9uID9cbiAgICAgICAgdGhhdC4kZGlhbG9nIC8vIHdhaXQgZm9yIG1vZGFsIHRvIHNsaWRlIGluXG4gICAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKCdmb2N1cycpLnRyaWdnZXIoZSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcignZm9jdXMnKS50cmlnZ2VyKGUpXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBlID0gJC5FdmVudCgnaGlkZS5icy5tb2RhbCcpXG5cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgIGlmICghdGhpcy5pc1Nob3duIHx8IGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5pc1Nob3duID0gZmFsc2VcblxuICAgIHRoaXMuZXNjYXBlKClcbiAgICB0aGlzLnJlc2l6ZSgpXG5cbiAgICAkKGRvY3VtZW50KS5vZmYoJ2ZvY3VzaW4uYnMubW9kYWwnKVxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLnJlbW92ZUNsYXNzKCdpbicpXG4gICAgICAub2ZmKCdjbGljay5kaXNtaXNzLmJzLm1vZGFsJylcbiAgICAgIC5vZmYoJ21vdXNldXAuZGlzbWlzcy5icy5tb2RhbCcpXG5cbiAgICB0aGlzLiRkaWFsb2cub2ZmKCdtb3VzZWRvd24uZGlzbWlzcy5icy5tb2RhbCcpXG5cbiAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCAkLnByb3h5KHRoaXMuaGlkZU1vZGFsLCB0aGlzKSlcbiAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKE1vZGFsLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgIHRoaXMuaGlkZU1vZGFsKClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5lbmZvcmNlRm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgJChkb2N1bWVudClcbiAgICAgIC5vZmYoJ2ZvY3VzaW4uYnMubW9kYWwnKSAvLyBndWFyZCBhZ2FpbnN0IGluZmluaXRlIGZvY3VzIGxvb3BcbiAgICAgIC5vbignZm9jdXNpbi5icy5tb2RhbCcsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50ICE9PSBlLnRhcmdldCAmJlxuICAgICAgICAgIHRoaXMuJGVsZW1lbnRbMF0gIT09IGUudGFyZ2V0ICYmXG4gICAgICAgICAgIXRoaXMuJGVsZW1lbnQuaGFzKGUudGFyZ2V0KS5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcykpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuZXNjYXBlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmlzU2hvd24gJiYgdGhpcy5vcHRpb25zLmtleWJvYXJkKSB7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCdrZXlkb3duLmRpc21pc3MuYnMubW9kYWwnLCAkLnByb3h5KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUud2hpY2ggPT0gMjcgJiYgdGhpcy5oaWRlKClcbiAgICAgIH0sIHRoaXMpKVxuICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNTaG93bikge1xuICAgICAgdGhpcy4kZWxlbWVudC5vZmYoJ2tleWRvd24uZGlzbWlzcy5icy5tb2RhbCcpXG4gICAgfVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pc1Nob3duKSB7XG4gICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS5icy5tb2RhbCcsICQucHJveHkodGhpcy5oYW5kbGVVcGRhdGUsIHRoaXMpKVxuICAgIH0gZWxzZSB7XG4gICAgICAkKHdpbmRvdykub2ZmKCdyZXNpemUuYnMubW9kYWwnKVxuICAgIH1cbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5oaWRlTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdGhpcy4kZWxlbWVudC5oaWRlKClcbiAgICB0aGlzLmJhY2tkcm9wKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoYXQuJGJvZHkucmVtb3ZlQ2xhc3MoJ21vZGFsLW9wZW4nKVxuICAgICAgdGhhdC5yZXNldEFkanVzdG1lbnRzKClcbiAgICAgIHRoYXQucmVzZXRTY3JvbGxiYXIoKVxuICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKCdoaWRkZW4uYnMubW9kYWwnKVxuICAgIH0pXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUucmVtb3ZlQmFja2Ryb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kYmFja2Ryb3AgJiYgdGhpcy4kYmFja2Ryb3AucmVtb3ZlKClcbiAgICB0aGlzLiRiYWNrZHJvcCA9IG51bGxcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5iYWNrZHJvcCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHZhciBhbmltYXRlID0gdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnZmFkZScpID8gJ2ZhZGUnIDogJydcblxuICAgIGlmICh0aGlzLmlzU2hvd24gJiYgdGhpcy5vcHRpb25zLmJhY2tkcm9wKSB7XG4gICAgICB2YXIgZG9BbmltYXRlID0gJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgYW5pbWF0ZVxuXG4gICAgICB0aGlzLiRiYWNrZHJvcCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpXG4gICAgICAgIC5hZGRDbGFzcygnbW9kYWwtYmFja2Ryb3AgJyArIGFuaW1hdGUpXG4gICAgICAgIC5hcHBlbmRUbyh0aGlzLiRib2R5KVxuXG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCdjbGljay5kaXNtaXNzLmJzLm1vZGFsJywgJC5wcm94eShmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAodGhpcy5pZ25vcmVCYWNrZHJvcENsaWNrKSB7XG4gICAgICAgICAgdGhpcy5pZ25vcmVCYWNrZHJvcENsaWNrID0gZmFsc2VcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAoZS50YXJnZXQgIT09IGUuY3VycmVudFRhcmdldCkgcmV0dXJuXG4gICAgICAgIHRoaXMub3B0aW9ucy5iYWNrZHJvcCA9PSAnc3RhdGljJ1xuICAgICAgICAgID8gdGhpcy4kZWxlbWVudFswXS5mb2N1cygpXG4gICAgICAgICAgOiB0aGlzLmhpZGUoKVxuICAgICAgfSwgdGhpcykpXG5cbiAgICAgIGlmIChkb0FuaW1hdGUpIHRoaXMuJGJhY2tkcm9wWzBdLm9mZnNldFdpZHRoIC8vIGZvcmNlIHJlZmxvd1xuXG4gICAgICB0aGlzLiRiYWNrZHJvcC5hZGRDbGFzcygnaW4nKVxuXG4gICAgICBpZiAoIWNhbGxiYWNrKSByZXR1cm5cblxuICAgICAgZG9BbmltYXRlID9cbiAgICAgICAgdGhpcy4kYmFja2Ryb3BcbiAgICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCBjYWxsYmFjaylcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoTW9kYWwuQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgICBjYWxsYmFjaygpXG5cbiAgICB9IGVsc2UgaWYgKCF0aGlzLmlzU2hvd24gJiYgdGhpcy4kYmFja2Ryb3ApIHtcbiAgICAgIHRoaXMuJGJhY2tkcm9wLnJlbW92ZUNsYXNzKCdpbicpXG5cbiAgICAgIHZhciBjYWxsYmFja1JlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhhdC5yZW1vdmVCYWNrZHJvcCgpXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICAgIH1cbiAgICAgICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2ZhZGUnKSA/XG4gICAgICAgIHRoaXMuJGJhY2tkcm9wXG4gICAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgY2FsbGJhY2tSZW1vdmUpXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKE1vZGFsLkJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgICAgY2FsbGJhY2tSZW1vdmUoKVxuXG4gICAgfSBlbHNlIGlmIChjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2soKVxuICAgIH1cbiAgfVxuXG4gIC8vIHRoZXNlIGZvbGxvd2luZyBtZXRob2RzIGFyZSB1c2VkIHRvIGhhbmRsZSBvdmVyZmxvd2luZyBtb2RhbHNcblxuICBNb2RhbC5wcm90b3R5cGUuaGFuZGxlVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYWRqdXN0RGlhbG9nKClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5hZGp1c3REaWFsb2cgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG1vZGFsSXNPdmVyZmxvd2luZyA9IHRoaXMuJGVsZW1lbnRbMF0uc2Nyb2xsSGVpZ2h0ID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuXG4gICAgdGhpcy4kZWxlbWVudC5jc3Moe1xuICAgICAgcGFkZGluZ0xlZnQ6ICF0aGlzLmJvZHlJc092ZXJmbG93aW5nICYmIG1vZGFsSXNPdmVyZmxvd2luZyA/IHRoaXMuc2Nyb2xsYmFyV2lkdGggOiAnJyxcbiAgICAgIHBhZGRpbmdSaWdodDogdGhpcy5ib2R5SXNPdmVyZmxvd2luZyAmJiAhbW9kYWxJc092ZXJmbG93aW5nID8gdGhpcy5zY3JvbGxiYXJXaWR0aCA6ICcnXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5yZXNldEFkanVzdG1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtcbiAgICAgIHBhZGRpbmdMZWZ0OiAnJyxcbiAgICAgIHBhZGRpbmdSaWdodDogJydcbiAgICB9KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmNoZWNrU2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBmdWxsV2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIGlmICghZnVsbFdpbmRvd1dpZHRoKSB7IC8vIHdvcmthcm91bmQgZm9yIG1pc3Npbmcgd2luZG93LmlubmVyV2lkdGggaW4gSUU4XG4gICAgICB2YXIgZG9jdW1lbnRFbGVtZW50UmVjdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgZnVsbFdpbmRvd1dpZHRoID0gZG9jdW1lbnRFbGVtZW50UmVjdC5yaWdodCAtIE1hdGguYWJzKGRvY3VtZW50RWxlbWVudFJlY3QubGVmdClcbiAgICB9XG4gICAgdGhpcy5ib2R5SXNPdmVyZmxvd2luZyA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggPCBmdWxsV2luZG93V2lkdGhcbiAgICB0aGlzLnNjcm9sbGJhcldpZHRoID0gdGhpcy5tZWFzdXJlU2Nyb2xsYmFyKClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5zZXRTY3JvbGxiYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJvZHlQYWQgPSBwYXJzZUludCgodGhpcy4kYm9keS5jc3MoJ3BhZGRpbmctcmlnaHQnKSB8fCAwKSwgMTApXG4gICAgdGhpcy5vcmlnaW5hbEJvZHlQYWQgPSBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCB8fCAnJ1xuICAgIHZhciBzY3JvbGxiYXJXaWR0aCA9IHRoaXMuc2Nyb2xsYmFyV2lkdGhcbiAgICBpZiAodGhpcy5ib2R5SXNPdmVyZmxvd2luZykge1xuICAgICAgdGhpcy4kYm9keS5jc3MoJ3BhZGRpbmctcmlnaHQnLCBib2R5UGFkICsgc2Nyb2xsYmFyV2lkdGgpXG4gICAgICAkKHRoaXMuZml4ZWRDb250ZW50KS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuICAgICAgICB2YXIgYWN0dWFsUGFkZGluZyA9IGVsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0XG4gICAgICAgIHZhciBjYWxjdWxhdGVkUGFkZGluZyA9ICQoZWxlbWVudCkuY3NzKCdwYWRkaW5nLXJpZ2h0JylcbiAgICAgICAgJChlbGVtZW50KVxuICAgICAgICAgIC5kYXRhKCdwYWRkaW5nLXJpZ2h0JywgYWN0dWFsUGFkZGluZylcbiAgICAgICAgICAuY3NzKCdwYWRkaW5nLXJpZ2h0JywgcGFyc2VGbG9hdChjYWxjdWxhdGVkUGFkZGluZykgKyBzY3JvbGxiYXJXaWR0aCArICdweCcpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5yZXNldFNjcm9sbGJhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLiRib2R5LmNzcygncGFkZGluZy1yaWdodCcsIHRoaXMub3JpZ2luYWxCb2R5UGFkKVxuICAgICQodGhpcy5maXhlZENvbnRlbnQpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICB2YXIgcGFkZGluZyA9ICQoZWxlbWVudCkuZGF0YSgncGFkZGluZy1yaWdodCcpXG4gICAgICAkKGVsZW1lbnQpLnJlbW92ZURhdGEoJ3BhZGRpbmctcmlnaHQnKVxuICAgICAgZWxlbWVudC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBwYWRkaW5nID8gcGFkZGluZyA6ICcnXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5tZWFzdXJlU2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkgeyAvLyB0aHggd2Fsc2hcbiAgICB2YXIgc2Nyb2xsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBzY3JvbGxEaXYuY2xhc3NOYW1lID0gJ21vZGFsLXNjcm9sbGJhci1tZWFzdXJlJ1xuICAgIHRoaXMuJGJvZHkuYXBwZW5kKHNjcm9sbERpdilcbiAgICB2YXIgc2Nyb2xsYmFyV2lkdGggPSBzY3JvbGxEaXYub2Zmc2V0V2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGhcbiAgICB0aGlzLiRib2R5WzBdLnJlbW92ZUNoaWxkKHNjcm9sbERpdilcbiAgICByZXR1cm4gc2Nyb2xsYmFyV2lkdGhcbiAgfVxuXG5cbiAgLy8gTU9EQUwgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uLCBfcmVsYXRlZFRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgPSAkdGhpcy5kYXRhKCdicy5tb2RhbCcpXG4gICAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBNb2RhbC5ERUZBVUxUUywgJHRoaXMuZGF0YSgpLCB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvbilcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5tb2RhbCcsIChkYXRhID0gbmV3IE1vZGFsKHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0oX3JlbGF0ZWRUYXJnZXQpXG4gICAgICBlbHNlIGlmIChvcHRpb25zLnNob3cpIGRhdGEuc2hvdyhfcmVsYXRlZFRhcmdldClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4ubW9kYWxcblxuICAkLmZuLm1vZGFsID0gUGx1Z2luXG4gICQuZm4ubW9kYWwuQ29uc3RydWN0b3IgPSBNb2RhbFxuXG5cbiAgLy8gTU9EQUwgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT1cblxuICAkLmZuLm1vZGFsLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5tb2RhbCA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIE1PREFMIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLmJzLm1vZGFsLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cIm1vZGFsXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG4gICAgdmFyIGhyZWYgPSAkdGhpcy5hdHRyKCdocmVmJylcbiAgICB2YXIgdGFyZ2V0ID0gJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKSB8fFxuICAgICAgKGhyZWYgJiYgaHJlZi5yZXBsYWNlKC8uKig/PSNbXlxcc10rJCkvLCAnJykpIC8vIHN0cmlwIGZvciBpZTdcblxuICAgIHZhciAkdGFyZ2V0ID0gJChkb2N1bWVudCkuZmluZCh0YXJnZXQpXG4gICAgdmFyIG9wdGlvbiA9ICR0YXJnZXQuZGF0YSgnYnMubW9kYWwnKSA/ICd0b2dnbGUnIDogJC5leHRlbmQoeyByZW1vdGU6ICEvIy8udGVzdChocmVmKSAmJiBocmVmIH0sICR0YXJnZXQuZGF0YSgpLCAkdGhpcy5kYXRhKCkpXG5cbiAgICBpZiAoJHRoaXMuaXMoJ2EnKSkgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAkdGFyZ2V0Lm9uZSgnc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uIChzaG93RXZlbnQpIHtcbiAgICAgIGlmIChzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVybiAvLyBvbmx5IHJlZ2lzdGVyIGZvY3VzIHJlc3RvcmVyIGlmIG1vZGFsIHdpbGwgYWN0dWFsbHkgZ2V0IHNob3duXG4gICAgICAkdGFyZ2V0Lm9uZSgnaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkdGhpcy5pcygnOnZpc2libGUnKSAmJiAkdGhpcy50cmlnZ2VyKCdmb2N1cycpXG4gICAgICB9KVxuICAgIH0pXG4gICAgUGx1Z2luLmNhbGwoJHRhcmdldCwgb3B0aW9uLCB0aGlzKVxuICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiB0b29sdGlwLmpzIHYzLjQuMVxuICogaHR0cHM6Ly9nZXRib290c3RyYXAuY29tL2RvY3MvMy40L2phdmFzY3JpcHQvI3Rvb2x0aXBcbiAqIEluc3BpcmVkIGJ5IHRoZSBvcmlnaW5hbCBqUXVlcnkudGlwc3kgYnkgSmFzb24gRnJhbWVcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxOSBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIERJU0FMTE9XRURfQVRUUklCVVRFUyA9IFsnc2FuaXRpemUnLCAnd2hpdGVMaXN0JywgJ3Nhbml0aXplRm4nXVxuXG4gIHZhciB1cmlBdHRycyA9IFtcbiAgICAnYmFja2dyb3VuZCcsXG4gICAgJ2NpdGUnLFxuICAgICdocmVmJyxcbiAgICAnaXRlbXR5cGUnLFxuICAgICdsb25nZGVzYycsXG4gICAgJ3Bvc3RlcicsXG4gICAgJ3NyYycsXG4gICAgJ3hsaW5rOmhyZWYnXG4gIF1cblxuICB2YXIgQVJJQV9BVFRSSUJVVEVfUEFUVEVSTiA9IC9eYXJpYS1bXFx3LV0qJC9pXG5cbiAgdmFyIERlZmF1bHRXaGl0ZWxpc3QgPSB7XG4gICAgLy8gR2xvYmFsIGF0dHJpYnV0ZXMgYWxsb3dlZCBvbiBhbnkgc3VwcGxpZWQgZWxlbWVudCBiZWxvdy5cbiAgICAnKic6IFsnY2xhc3MnLCAnZGlyJywgJ2lkJywgJ2xhbmcnLCAncm9sZScsIEFSSUFfQVRUUklCVVRFX1BBVFRFUk5dLFxuICAgIGE6IFsndGFyZ2V0JywgJ2hyZWYnLCAndGl0bGUnLCAncmVsJ10sXG4gICAgYXJlYTogW10sXG4gICAgYjogW10sXG4gICAgYnI6IFtdLFxuICAgIGNvbDogW10sXG4gICAgY29kZTogW10sXG4gICAgZGl2OiBbXSxcbiAgICBlbTogW10sXG4gICAgaHI6IFtdLFxuICAgIGgxOiBbXSxcbiAgICBoMjogW10sXG4gICAgaDM6IFtdLFxuICAgIGg0OiBbXSxcbiAgICBoNTogW10sXG4gICAgaDY6IFtdLFxuICAgIGk6IFtdLFxuICAgIGltZzogWydzcmMnLCAnYWx0JywgJ3RpdGxlJywgJ3dpZHRoJywgJ2hlaWdodCddLFxuICAgIGxpOiBbXSxcbiAgICBvbDogW10sXG4gICAgcDogW10sXG4gICAgcHJlOiBbXSxcbiAgICBzOiBbXSxcbiAgICBzbWFsbDogW10sXG4gICAgc3BhbjogW10sXG4gICAgc3ViOiBbXSxcbiAgICBzdXA6IFtdLFxuICAgIHN0cm9uZzogW10sXG4gICAgdTogW10sXG4gICAgdWw6IFtdXG4gIH1cblxuICAvKipcbiAgICogQSBwYXR0ZXJuIHRoYXQgcmVjb2duaXplcyBhIGNvbW1vbmx5IHVzZWZ1bCBzdWJzZXQgb2YgVVJMcyB0aGF0IGFyZSBzYWZlLlxuICAgKlxuICAgKiBTaG91dG91dCB0byBBbmd1bGFyIDcgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9ibG9iLzcuMi40L3BhY2thZ2VzL2NvcmUvc3JjL3Nhbml0aXphdGlvbi91cmxfc2FuaXRpemVyLnRzXG4gICAqL1xuICB2YXIgU0FGRV9VUkxfUEFUVEVSTiA9IC9eKD86KD86aHR0cHM/fG1haWx0b3xmdHB8dGVsfGZpbGUpOnxbXiY6Lz8jXSooPzpbLz8jXXwkKSkvZ2lcblxuICAvKipcbiAgICogQSBwYXR0ZXJuIHRoYXQgbWF0Y2hlcyBzYWZlIGRhdGEgVVJMcy4gT25seSBtYXRjaGVzIGltYWdlLCB2aWRlbyBhbmQgYXVkaW8gdHlwZXMuXG4gICAqXG4gICAqIFNob3V0b3V0IHRvIEFuZ3VsYXIgNyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2Jsb2IvNy4yLjQvcGFja2FnZXMvY29yZS9zcmMvc2FuaXRpemF0aW9uL3VybF9zYW5pdGl6ZXIudHNcbiAgICovXG4gIHZhciBEQVRBX1VSTF9QQVRURVJOID0gL15kYXRhOig/OmltYWdlXFwvKD86Ym1wfGdpZnxqcGVnfGpwZ3xwbmd8dGlmZnx3ZWJwKXx2aWRlb1xcLyg/Om1wZWd8bXA0fG9nZ3x3ZWJtKXxhdWRpb1xcLyg/Om1wM3xvZ2F8b2dnfG9wdXMpKTtiYXNlNjQsW2EtejAtOSsvXSs9KiQvaVxuXG4gIGZ1bmN0aW9uIGFsbG93ZWRBdHRyaWJ1dGUoYXR0ciwgYWxsb3dlZEF0dHJpYnV0ZUxpc3QpIHtcbiAgICB2YXIgYXR0ck5hbWUgPSBhdHRyLm5vZGVOYW1lLnRvTG93ZXJDYXNlKClcblxuICAgIGlmICgkLmluQXJyYXkoYXR0ck5hbWUsIGFsbG93ZWRBdHRyaWJ1dGVMaXN0KSAhPT0gLTEpIHtcbiAgICAgIGlmICgkLmluQXJyYXkoYXR0ck5hbWUsIHVyaUF0dHJzKSAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oYXR0ci5ub2RlVmFsdWUubWF0Y2goU0FGRV9VUkxfUEFUVEVSTikgfHwgYXR0ci5ub2RlVmFsdWUubWF0Y2goREFUQV9VUkxfUEFUVEVSTikpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgdmFyIHJlZ0V4cCA9ICQoYWxsb3dlZEF0dHJpYnV0ZUxpc3QpLmZpbHRlcihmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBSZWdFeHBcbiAgICB9KVxuXG4gICAgLy8gQ2hlY2sgaWYgYSByZWd1bGFyIGV4cHJlc3Npb24gdmFsaWRhdGVzIHRoZSBhdHRyaWJ1dGUuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSByZWdFeHAubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoYXR0ck5hbWUubWF0Y2gocmVnRXhwW2ldKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgZnVuY3Rpb24gc2FuaXRpemVIdG1sKHVuc2FmZUh0bWwsIHdoaXRlTGlzdCwgc2FuaXRpemVGbikge1xuICAgIGlmICh1bnNhZmVIdG1sLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHVuc2FmZUh0bWxcbiAgICB9XG5cbiAgICBpZiAoc2FuaXRpemVGbiAmJiB0eXBlb2Ygc2FuaXRpemVGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHNhbml0aXplRm4odW5zYWZlSHRtbClcbiAgICB9XG5cbiAgICAvLyBJRSA4IGFuZCBiZWxvdyBkb24ndCBzdXBwb3J0IGNyZWF0ZUhUTUxEb2N1bWVudFxuICAgIGlmICghZG9jdW1lbnQuaW1wbGVtZW50YXRpb24gfHwgIWRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCkge1xuICAgICAgcmV0dXJuIHVuc2FmZUh0bWxcbiAgICB9XG5cbiAgICB2YXIgY3JlYXRlZERvY3VtZW50ID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCdzYW5pdGl6YXRpb24nKVxuICAgIGNyZWF0ZWREb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IHVuc2FmZUh0bWxcblxuICAgIHZhciB3aGl0ZWxpc3RLZXlzID0gJC5tYXAod2hpdGVMaXN0LCBmdW5jdGlvbiAoZWwsIGkpIHsgcmV0dXJuIGkgfSlcbiAgICB2YXIgZWxlbWVudHMgPSAkKGNyZWF0ZWREb2N1bWVudC5ib2R5KS5maW5kKCcqJylcblxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBlbGVtZW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgdmFyIGVsID0gZWxlbWVudHNbaV1cbiAgICAgIHZhciBlbE5hbWUgPSBlbC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpXG5cbiAgICAgIGlmICgkLmluQXJyYXkoZWxOYW1lLCB3aGl0ZWxpc3RLZXlzKSA9PT0gLTEpIHtcbiAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbClcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICB2YXIgYXR0cmlidXRlTGlzdCA9ICQubWFwKGVsLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwgfSlcbiAgICAgIHZhciB3aGl0ZWxpc3RlZEF0dHJpYnV0ZXMgPSBbXS5jb25jYXQod2hpdGVMaXN0WycqJ10gfHwgW10sIHdoaXRlTGlzdFtlbE5hbWVdIHx8IFtdKVxuXG4gICAgICBmb3IgKHZhciBqID0gMCwgbGVuMiA9IGF0dHJpYnV0ZUxpc3QubGVuZ3RoOyBqIDwgbGVuMjsgaisrKSB7XG4gICAgICAgIGlmICghYWxsb3dlZEF0dHJpYnV0ZShhdHRyaWJ1dGVMaXN0W2pdLCB3aGl0ZWxpc3RlZEF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZUxpc3Rbal0ubm9kZU5hbWUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlZERvY3VtZW50LmJvZHkuaW5uZXJIVE1MXG4gIH1cblxuICAvLyBUT09MVElQIFBVQkxJQyBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgVG9vbHRpcCA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy50eXBlICAgICAgID0gbnVsbFxuICAgIHRoaXMub3B0aW9ucyAgICA9IG51bGxcbiAgICB0aGlzLmVuYWJsZWQgICAgPSBudWxsXG4gICAgdGhpcy50aW1lb3V0ICAgID0gbnVsbFxuICAgIHRoaXMuaG92ZXJTdGF0ZSA9IG51bGxcbiAgICB0aGlzLiRlbGVtZW50ICAgPSBudWxsXG4gICAgdGhpcy5pblN0YXRlICAgID0gbnVsbFxuXG4gICAgdGhpcy5pbml0KCd0b29sdGlwJywgZWxlbWVudCwgb3B0aW9ucylcbiAgfVxuXG4gIFRvb2x0aXAuVkVSU0lPTiAgPSAnMy40LjEnXG5cbiAgVG9vbHRpcC5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgVG9vbHRpcC5ERUZBVUxUUyA9IHtcbiAgICBhbmltYXRpb246IHRydWUsXG4gICAgcGxhY2VtZW50OiAndG9wJyxcbiAgICBzZWxlY3RvcjogZmFsc2UsXG4gICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwidG9vbHRpcFwiIHJvbGU9XCJ0b29sdGlwXCI+PGRpdiBjbGFzcz1cInRvb2x0aXAtYXJyb3dcIj48L2Rpdj48ZGl2IGNsYXNzPVwidG9vbHRpcC1pbm5lclwiPjwvZGl2PjwvZGl2PicsXG4gICAgdHJpZ2dlcjogJ2hvdmVyIGZvY3VzJyxcbiAgICB0aXRsZTogJycsXG4gICAgZGVsYXk6IDAsXG4gICAgaHRtbDogZmFsc2UsXG4gICAgY29udGFpbmVyOiBmYWxzZSxcbiAgICB2aWV3cG9ydDoge1xuICAgICAgc2VsZWN0b3I6ICdib2R5JyxcbiAgICAgIHBhZGRpbmc6IDBcbiAgICB9LFxuICAgIHNhbml0aXplIDogdHJ1ZSxcbiAgICBzYW5pdGl6ZUZuIDogbnVsbCxcbiAgICB3aGl0ZUxpc3QgOiBEZWZhdWx0V2hpdGVsaXN0XG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKHR5cGUsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmVuYWJsZWQgICA9IHRydWVcbiAgICB0aGlzLnR5cGUgICAgICA9IHR5cGVcbiAgICB0aGlzLiRlbGVtZW50ICA9ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgICA9IHRoaXMuZ2V0T3B0aW9ucyhvcHRpb25zKVxuICAgIHRoaXMuJHZpZXdwb3J0ID0gdGhpcy5vcHRpb25zLnZpZXdwb3J0ICYmICQoZG9jdW1lbnQpLmZpbmQoJC5pc0Z1bmN0aW9uKHRoaXMub3B0aW9ucy52aWV3cG9ydCkgPyB0aGlzLm9wdGlvbnMudmlld3BvcnQuY2FsbCh0aGlzLCB0aGlzLiRlbGVtZW50KSA6ICh0aGlzLm9wdGlvbnMudmlld3BvcnQuc2VsZWN0b3IgfHwgdGhpcy5vcHRpb25zLnZpZXdwb3J0KSlcbiAgICB0aGlzLmluU3RhdGUgICA9IHsgY2xpY2s6IGZhbHNlLCBob3ZlcjogZmFsc2UsIGZvY3VzOiBmYWxzZSB9XG5cbiAgICBpZiAodGhpcy4kZWxlbWVudFswXSBpbnN0YW5jZW9mIGRvY3VtZW50LmNvbnN0cnVjdG9yICYmICF0aGlzLm9wdGlvbnMuc2VsZWN0b3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYHNlbGVjdG9yYCBvcHRpb24gbXVzdCBiZSBzcGVjaWZpZWQgd2hlbiBpbml0aWFsaXppbmcgJyArIHRoaXMudHlwZSArICcgb24gdGhlIHdpbmRvdy5kb2N1bWVudCBvYmplY3QhJylcbiAgICB9XG5cbiAgICB2YXIgdHJpZ2dlcnMgPSB0aGlzLm9wdGlvbnMudHJpZ2dlci5zcGxpdCgnICcpXG5cbiAgICBmb3IgKHZhciBpID0gdHJpZ2dlcnMubGVuZ3RoOyBpLS07KSB7XG4gICAgICB2YXIgdHJpZ2dlciA9IHRyaWdnZXJzW2ldXG5cbiAgICAgIGlmICh0cmlnZ2VyID09ICdjbGljaycpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudC5vbignY2xpY2suJyArIHRoaXMudHlwZSwgdGhpcy5vcHRpb25zLnNlbGVjdG9yLCAkLnByb3h5KHRoaXMudG9nZ2xlLCB0aGlzKSlcbiAgICAgIH0gZWxzZSBpZiAodHJpZ2dlciAhPSAnbWFudWFsJykge1xuICAgICAgICB2YXIgZXZlbnRJbiAgPSB0cmlnZ2VyID09ICdob3ZlcicgPyAnbW91c2VlbnRlcicgOiAnZm9jdXNpbidcbiAgICAgICAgdmFyIGV2ZW50T3V0ID0gdHJpZ2dlciA9PSAnaG92ZXInID8gJ21vdXNlbGVhdmUnIDogJ2ZvY3Vzb3V0J1xuXG4gICAgICAgIHRoaXMuJGVsZW1lbnQub24oZXZlbnRJbiAgKyAnLicgKyB0aGlzLnR5cGUsIHRoaXMub3B0aW9ucy5zZWxlY3RvciwgJC5wcm94eSh0aGlzLmVudGVyLCB0aGlzKSlcbiAgICAgICAgdGhpcy4kZWxlbWVudC5vbihldmVudE91dCArICcuJyArIHRoaXMudHlwZSwgdGhpcy5vcHRpb25zLnNlbGVjdG9yLCAkLnByb3h5KHRoaXMubGVhdmUsIHRoaXMpKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucy5zZWxlY3RvciA/XG4gICAgICAodGhpcy5fb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB0aGlzLm9wdGlvbnMsIHsgdHJpZ2dlcjogJ21hbnVhbCcsIHNlbGVjdG9yOiAnJyB9KSkgOlxuICAgICAgdGhpcy5maXhUaXRsZSgpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXREZWZhdWx0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gVG9vbHRpcC5ERUZBVUxUU1xuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdmFyIGRhdGFBdHRyaWJ1dGVzID0gdGhpcy4kZWxlbWVudC5kYXRhKClcblxuICAgIGZvciAodmFyIGRhdGFBdHRyIGluIGRhdGFBdHRyaWJ1dGVzKSB7XG4gICAgICBpZiAoZGF0YUF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoZGF0YUF0dHIpICYmICQuaW5BcnJheShkYXRhQXR0ciwgRElTQUxMT1dFRF9BVFRSSUJVVEVTKSAhPT0gLTEpIHtcbiAgICAgICAgZGVsZXRlIGRhdGFBdHRyaWJ1dGVzW2RhdGFBdHRyXVxuICAgICAgfVxuICAgIH1cblxuICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5nZXREZWZhdWx0cygpLCBkYXRhQXR0cmlidXRlcywgb3B0aW9ucylcblxuICAgIGlmIChvcHRpb25zLmRlbGF5ICYmIHR5cGVvZiBvcHRpb25zLmRlbGF5ID09ICdudW1iZXInKSB7XG4gICAgICBvcHRpb25zLmRlbGF5ID0ge1xuICAgICAgICBzaG93OiBvcHRpb25zLmRlbGF5LFxuICAgICAgICBoaWRlOiBvcHRpb25zLmRlbGF5XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuc2FuaXRpemUpIHtcbiAgICAgIG9wdGlvbnMudGVtcGxhdGUgPSBzYW5pdGl6ZUh0bWwob3B0aW9ucy50ZW1wbGF0ZSwgb3B0aW9ucy53aGl0ZUxpc3QsIG9wdGlvbnMuc2FuaXRpemVGbilcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9uc1xuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0RGVsZWdhdGVPcHRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcHRpb25zICA9IHt9XG4gICAgdmFyIGRlZmF1bHRzID0gdGhpcy5nZXREZWZhdWx0cygpXG5cbiAgICB0aGlzLl9vcHRpb25zICYmICQuZWFjaCh0aGlzLl9vcHRpb25zLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKGRlZmF1bHRzW2tleV0gIT0gdmFsdWUpIG9wdGlvbnNba2V5XSA9IHZhbHVlXG4gICAgfSlcblxuICAgIHJldHVybiBvcHRpb25zXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5lbnRlciA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICB2YXIgc2VsZiA9IG9iaiBpbnN0YW5jZW9mIHRoaXMuY29uc3RydWN0b3IgP1xuICAgICAgb2JqIDogJChvYmouY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSlcblxuICAgIGlmICghc2VsZikge1xuICAgICAgc2VsZiA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG9iai5jdXJyZW50VGFyZ2V0LCB0aGlzLmdldERlbGVnYXRlT3B0aW9ucygpKVxuICAgICAgJChvYmouY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSwgc2VsZilcbiAgICB9XG5cbiAgICBpZiAob2JqIGluc3RhbmNlb2YgJC5FdmVudCkge1xuICAgICAgc2VsZi5pblN0YXRlW29iai50eXBlID09ICdmb2N1c2luJyA/ICdmb2N1cycgOiAnaG92ZXInXSA9IHRydWVcbiAgICB9XG5cbiAgICBpZiAoc2VsZi50aXAoKS5oYXNDbGFzcygnaW4nKSB8fCBzZWxmLmhvdmVyU3RhdGUgPT0gJ2luJykge1xuICAgICAgc2VsZi5ob3ZlclN0YXRlID0gJ2luJ1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY2xlYXJUaW1lb3V0KHNlbGYudGltZW91dClcblxuICAgIHNlbGYuaG92ZXJTdGF0ZSA9ICdpbidcblxuICAgIGlmICghc2VsZi5vcHRpb25zLmRlbGF5IHx8ICFzZWxmLm9wdGlvbnMuZGVsYXkuc2hvdykgcmV0dXJuIHNlbGYuc2hvdygpXG5cbiAgICBzZWxmLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzZWxmLmhvdmVyU3RhdGUgPT0gJ2luJykgc2VsZi5zaG93KClcbiAgICB9LCBzZWxmLm9wdGlvbnMuZGVsYXkuc2hvdylcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmlzSW5TdGF0ZVRydWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuaW5TdGF0ZSkge1xuICAgICAgaWYgKHRoaXMuaW5TdGF0ZVtrZXldKSByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUubGVhdmUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIHNlbGYgPSBvYmogaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yID9cbiAgICAgIG9iaiA6ICQob2JqLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUpXG5cbiAgICBpZiAoIXNlbGYpIHtcbiAgICAgIHNlbGYgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihvYmouY3VycmVudFRhcmdldCwgdGhpcy5nZXREZWxlZ2F0ZU9wdGlvbnMoKSlcbiAgICAgICQob2JqLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUsIHNlbGYpXG4gICAgfVxuXG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mICQuRXZlbnQpIHtcbiAgICAgIHNlbGYuaW5TdGF0ZVtvYmoudHlwZSA9PSAnZm9jdXNvdXQnID8gJ2ZvY3VzJyA6ICdob3ZlciddID0gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoc2VsZi5pc0luU3RhdGVUcnVlKCkpIHJldHVyblxuXG4gICAgY2xlYXJUaW1lb3V0KHNlbGYudGltZW91dClcblxuICAgIHNlbGYuaG92ZXJTdGF0ZSA9ICdvdXQnXG5cbiAgICBpZiAoIXNlbGYub3B0aW9ucy5kZWxheSB8fCAhc2VsZi5vcHRpb25zLmRlbGF5LmhpZGUpIHJldHVybiBzZWxmLmhpZGUoKVxuXG4gICAgc2VsZi50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2VsZi5ob3ZlclN0YXRlID09ICdvdXQnKSBzZWxmLmhpZGUoKVxuICAgIH0sIHNlbGYub3B0aW9ucy5kZWxheS5oaWRlKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZSA9ICQuRXZlbnQoJ3Nob3cuYnMuJyArIHRoaXMudHlwZSlcblxuICAgIGlmICh0aGlzLmhhc0NvbnRlbnQoKSAmJiB0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihlKVxuXG4gICAgICB2YXIgaW5Eb20gPSAkLmNvbnRhaW5zKHRoaXMuJGVsZW1lbnRbMF0ub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHRoaXMuJGVsZW1lbnRbMF0pXG4gICAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSB8fCAhaW5Eb20pIHJldHVyblxuICAgICAgdmFyIHRoYXQgPSB0aGlzXG5cbiAgICAgIHZhciAkdGlwID0gdGhpcy50aXAoKVxuXG4gICAgICB2YXIgdGlwSWQgPSB0aGlzLmdldFVJRCh0aGlzLnR5cGUpXG5cbiAgICAgIHRoaXMuc2V0Q29udGVudCgpXG4gICAgICAkdGlwLmF0dHIoJ2lkJywgdGlwSWQpXG4gICAgICB0aGlzLiRlbGVtZW50LmF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknLCB0aXBJZClcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5hbmltYXRpb24pICR0aXAuYWRkQ2xhc3MoJ2ZhZGUnKVxuXG4gICAgICB2YXIgcGxhY2VtZW50ID0gdHlwZW9mIHRoaXMub3B0aW9ucy5wbGFjZW1lbnQgPT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgIHRoaXMub3B0aW9ucy5wbGFjZW1lbnQuY2FsbCh0aGlzLCAkdGlwWzBdLCB0aGlzLiRlbGVtZW50WzBdKSA6XG4gICAgICAgIHRoaXMub3B0aW9ucy5wbGFjZW1lbnRcblxuICAgICAgdmFyIGF1dG9Ub2tlbiA9IC9cXHM/YXV0bz9cXHM/L2lcbiAgICAgIHZhciBhdXRvUGxhY2UgPSBhdXRvVG9rZW4udGVzdChwbGFjZW1lbnQpXG4gICAgICBpZiAoYXV0b1BsYWNlKSBwbGFjZW1lbnQgPSBwbGFjZW1lbnQucmVwbGFjZShhdXRvVG9rZW4sICcnKSB8fCAndG9wJ1xuXG4gICAgICAkdGlwXG4gICAgICAgIC5kZXRhY2goKVxuICAgICAgICAuY3NzKHsgdG9wOiAwLCBsZWZ0OiAwLCBkaXNwbGF5OiAnYmxvY2snIH0pXG4gICAgICAgIC5hZGRDbGFzcyhwbGFjZW1lbnQpXG4gICAgICAgIC5kYXRhKCdicy4nICsgdGhpcy50eXBlLCB0aGlzKVxuXG4gICAgICB0aGlzLm9wdGlvbnMuY29udGFpbmVyID8gJHRpcC5hcHBlbmRUbygkKGRvY3VtZW50KS5maW5kKHRoaXMub3B0aW9ucy5jb250YWluZXIpKSA6ICR0aXAuaW5zZXJ0QWZ0ZXIodGhpcy4kZWxlbWVudClcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignaW5zZXJ0ZWQuYnMuJyArIHRoaXMudHlwZSlcblxuICAgICAgdmFyIHBvcyAgICAgICAgICA9IHRoaXMuZ2V0UG9zaXRpb24oKVxuICAgICAgdmFyIGFjdHVhbFdpZHRoICA9ICR0aXBbMF0ub2Zmc2V0V2lkdGhcbiAgICAgIHZhciBhY3R1YWxIZWlnaHQgPSAkdGlwWzBdLm9mZnNldEhlaWdodFxuXG4gICAgICBpZiAoYXV0b1BsYWNlKSB7XG4gICAgICAgIHZhciBvcmdQbGFjZW1lbnQgPSBwbGFjZW1lbnRcbiAgICAgICAgdmFyIHZpZXdwb3J0RGltID0gdGhpcy5nZXRQb3NpdGlvbih0aGlzLiR2aWV3cG9ydClcblxuICAgICAgICBwbGFjZW1lbnQgPSBwbGFjZW1lbnQgPT0gJ2JvdHRvbScgJiYgcG9zLmJvdHRvbSArIGFjdHVhbEhlaWdodCA+IHZpZXdwb3J0RGltLmJvdHRvbSA/ICd0b3AnICAgIDpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50ID09ICd0b3AnICAgICYmIHBvcy50b3AgICAgLSBhY3R1YWxIZWlnaHQgPCB2aWV3cG9ydERpbS50b3AgICAgPyAnYm90dG9tJyA6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9PSAncmlnaHQnICAmJiBwb3MucmlnaHQgICsgYWN0dWFsV2lkdGggID4gdmlld3BvcnREaW0ud2lkdGggID8gJ2xlZnQnICAgOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPT0gJ2xlZnQnICAgJiYgcG9zLmxlZnQgICAtIGFjdHVhbFdpZHRoICA8IHZpZXdwb3J0RGltLmxlZnQgICA/ICdyaWdodCcgIDpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50XG5cbiAgICAgICAgJHRpcFxuICAgICAgICAgIC5yZW1vdmVDbGFzcyhvcmdQbGFjZW1lbnQpXG4gICAgICAgICAgLmFkZENsYXNzKHBsYWNlbWVudClcbiAgICAgIH1cblxuICAgICAgdmFyIGNhbGN1bGF0ZWRPZmZzZXQgPSB0aGlzLmdldENhbGN1bGF0ZWRPZmZzZXQocGxhY2VtZW50LCBwb3MsIGFjdHVhbFdpZHRoLCBhY3R1YWxIZWlnaHQpXG5cbiAgICAgIHRoaXMuYXBwbHlQbGFjZW1lbnQoY2FsY3VsYXRlZE9mZnNldCwgcGxhY2VtZW50KVxuXG4gICAgICB2YXIgY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwcmV2SG92ZXJTdGF0ZSA9IHRoYXQuaG92ZXJTdGF0ZVxuICAgICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoJ3Nob3duLmJzLicgKyB0aGF0LnR5cGUpXG4gICAgICAgIHRoYXQuaG92ZXJTdGF0ZSA9IG51bGxcblxuICAgICAgICBpZiAocHJldkhvdmVyU3RhdGUgPT0gJ291dCcpIHRoYXQubGVhdmUodGhhdClcbiAgICAgIH1cblxuICAgICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kdGlwLmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgICAkdGlwXG4gICAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgY29tcGxldGUpXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKFRvb2x0aXAuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgICBjb21wbGV0ZSgpXG4gICAgfVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuYXBwbHlQbGFjZW1lbnQgPSBmdW5jdGlvbiAob2Zmc2V0LCBwbGFjZW1lbnQpIHtcbiAgICB2YXIgJHRpcCAgID0gdGhpcy50aXAoKVxuICAgIHZhciB3aWR0aCAgPSAkdGlwWzBdLm9mZnNldFdpZHRoXG4gICAgdmFyIGhlaWdodCA9ICR0aXBbMF0ub2Zmc2V0SGVpZ2h0XG5cbiAgICAvLyBtYW51YWxseSByZWFkIG1hcmdpbnMgYmVjYXVzZSBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaW5jbHVkZXMgZGlmZmVyZW5jZVxuICAgIHZhciBtYXJnaW5Ub3AgPSBwYXJzZUludCgkdGlwLmNzcygnbWFyZ2luLXRvcCcpLCAxMClcbiAgICB2YXIgbWFyZ2luTGVmdCA9IHBhcnNlSW50KCR0aXAuY3NzKCdtYXJnaW4tbGVmdCcpLCAxMClcblxuICAgIC8vIHdlIG11c3QgY2hlY2sgZm9yIE5hTiBmb3IgaWUgOC85XG4gICAgaWYgKGlzTmFOKG1hcmdpblRvcCkpICBtYXJnaW5Ub3AgID0gMFxuICAgIGlmIChpc05hTihtYXJnaW5MZWZ0KSkgbWFyZ2luTGVmdCA9IDBcblxuICAgIG9mZnNldC50b3AgICs9IG1hcmdpblRvcFxuICAgIG9mZnNldC5sZWZ0ICs9IG1hcmdpbkxlZnRcblxuICAgIC8vICQuZm4ub2Zmc2V0IGRvZXNuJ3Qgcm91bmQgcGl4ZWwgdmFsdWVzXG4gICAgLy8gc28gd2UgdXNlIHNldE9mZnNldCBkaXJlY3RseSB3aXRoIG91ciBvd24gZnVuY3Rpb24gQi0wXG4gICAgJC5vZmZzZXQuc2V0T2Zmc2V0KCR0aXBbMF0sICQuZXh0ZW5kKHtcbiAgICAgIHVzaW5nOiBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgJHRpcC5jc3Moe1xuICAgICAgICAgIHRvcDogTWF0aC5yb3VuZChwcm9wcy50b3ApLFxuICAgICAgICAgIGxlZnQ6IE1hdGgucm91bmQocHJvcHMubGVmdClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LCBvZmZzZXQpLCAwKVxuXG4gICAgJHRpcC5hZGRDbGFzcygnaW4nKVxuXG4gICAgLy8gY2hlY2sgdG8gc2VlIGlmIHBsYWNpbmcgdGlwIGluIG5ldyBvZmZzZXQgY2F1c2VkIHRoZSB0aXAgdG8gcmVzaXplIGl0c2VsZlxuICAgIHZhciBhY3R1YWxXaWR0aCAgPSAkdGlwWzBdLm9mZnNldFdpZHRoXG4gICAgdmFyIGFjdHVhbEhlaWdodCA9ICR0aXBbMF0ub2Zmc2V0SGVpZ2h0XG5cbiAgICBpZiAocGxhY2VtZW50ID09ICd0b3AnICYmIGFjdHVhbEhlaWdodCAhPSBoZWlnaHQpIHtcbiAgICAgIG9mZnNldC50b3AgPSBvZmZzZXQudG9wICsgaGVpZ2h0IC0gYWN0dWFsSGVpZ2h0XG4gICAgfVxuXG4gICAgdmFyIGRlbHRhID0gdGhpcy5nZXRWaWV3cG9ydEFkanVzdGVkRGVsdGEocGxhY2VtZW50LCBvZmZzZXQsIGFjdHVhbFdpZHRoLCBhY3R1YWxIZWlnaHQpXG5cbiAgICBpZiAoZGVsdGEubGVmdCkgb2Zmc2V0LmxlZnQgKz0gZGVsdGEubGVmdFxuICAgIGVsc2Ugb2Zmc2V0LnRvcCArPSBkZWx0YS50b3BcblxuICAgIHZhciBpc1ZlcnRpY2FsICAgICAgICAgID0gL3RvcHxib3R0b20vLnRlc3QocGxhY2VtZW50KVxuICAgIHZhciBhcnJvd0RlbHRhICAgICAgICAgID0gaXNWZXJ0aWNhbCA/IGRlbHRhLmxlZnQgKiAyIC0gd2lkdGggKyBhY3R1YWxXaWR0aCA6IGRlbHRhLnRvcCAqIDIgLSBoZWlnaHQgKyBhY3R1YWxIZWlnaHRcbiAgICB2YXIgYXJyb3dPZmZzZXRQb3NpdGlvbiA9IGlzVmVydGljYWwgPyAnb2Zmc2V0V2lkdGgnIDogJ29mZnNldEhlaWdodCdcblxuICAgICR0aXAub2Zmc2V0KG9mZnNldClcbiAgICB0aGlzLnJlcGxhY2VBcnJvdyhhcnJvd0RlbHRhLCAkdGlwWzBdW2Fycm93T2Zmc2V0UG9zaXRpb25dLCBpc1ZlcnRpY2FsKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUucmVwbGFjZUFycm93ID0gZnVuY3Rpb24gKGRlbHRhLCBkaW1lbnNpb24sIGlzVmVydGljYWwpIHtcbiAgICB0aGlzLmFycm93KClcbiAgICAgIC5jc3MoaXNWZXJ0aWNhbCA/ICdsZWZ0JyA6ICd0b3AnLCA1MCAqICgxIC0gZGVsdGEgLyBkaW1lbnNpb24pICsgJyUnKVxuICAgICAgLmNzcyhpc1ZlcnRpY2FsID8gJ3RvcCcgOiAnbGVmdCcsICcnKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHRpcCAgPSB0aGlzLnRpcCgpXG4gICAgdmFyIHRpdGxlID0gdGhpcy5nZXRUaXRsZSgpXG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmh0bWwpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2FuaXRpemUpIHtcbiAgICAgICAgdGl0bGUgPSBzYW5pdGl6ZUh0bWwodGl0bGUsIHRoaXMub3B0aW9ucy53aGl0ZUxpc3QsIHRoaXMub3B0aW9ucy5zYW5pdGl6ZUZuKVxuICAgICAgfVxuXG4gICAgICAkdGlwLmZpbmQoJy50b29sdGlwLWlubmVyJykuaHRtbCh0aXRsZSlcbiAgICB9IGVsc2Uge1xuICAgICAgJHRpcC5maW5kKCcudG9vbHRpcC1pbm5lcicpLnRleHQodGl0bGUpXG4gICAgfVxuXG4gICAgJHRpcC5yZW1vdmVDbGFzcygnZmFkZSBpbiB0b3AgYm90dG9tIGxlZnQgcmlnaHQnKVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHZhciAkdGlwID0gJCh0aGlzLiR0aXApXG4gICAgdmFyIGUgICAgPSAkLkV2ZW50KCdoaWRlLmJzLicgKyB0aGlzLnR5cGUpXG5cbiAgICBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgIGlmICh0aGF0LmhvdmVyU3RhdGUgIT0gJ2luJykgJHRpcC5kZXRhY2goKVxuICAgICAgaWYgKHRoYXQuJGVsZW1lbnQpIHsgLy8gVE9ETzogQ2hlY2sgd2hldGhlciBndWFyZGluZyB0aGlzIGNvZGUgd2l0aCB0aGlzIGBpZmAgaXMgcmVhbGx5IG5lY2Vzc2FyeS5cbiAgICAgICAgdGhhdC4kZWxlbWVudFxuICAgICAgICAgIC5yZW1vdmVBdHRyKCdhcmlhLWRlc2NyaWJlZGJ5JylcbiAgICAgICAgICAudHJpZ2dlcignaGlkZGVuLmJzLicgKyB0aGF0LnR5cGUpXG4gICAgICB9XG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgfVxuXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG5cbiAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICAkdGlwLnJlbW92ZUNsYXNzKCdpbicpXG5cbiAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiAkdGlwLmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgJHRpcFxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCBjb21wbGV0ZSlcbiAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKFRvb2x0aXAuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgY29tcGxldGUoKVxuXG4gICAgdGhpcy5ob3ZlclN0YXRlID0gbnVsbFxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmZpeFRpdGxlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkZSA9IHRoaXMuJGVsZW1lbnRcbiAgICBpZiAoJGUuYXR0cigndGl0bGUnKSB8fCB0eXBlb2YgJGUuYXR0cignZGF0YS1vcmlnaW5hbC10aXRsZScpICE9ICdzdHJpbmcnKSB7XG4gICAgICAkZS5hdHRyKCdkYXRhLW9yaWdpbmFsLXRpdGxlJywgJGUuYXR0cigndGl0bGUnKSB8fCAnJykuYXR0cigndGl0bGUnLCAnJylcbiAgICB9XG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5oYXNDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmdldFRpdGxlKClcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldFBvc2l0aW9uID0gZnVuY3Rpb24gKCRlbGVtZW50KSB7XG4gICAgJGVsZW1lbnQgICA9ICRlbGVtZW50IHx8IHRoaXMuJGVsZW1lbnRcblxuICAgIHZhciBlbCAgICAgPSAkZWxlbWVudFswXVxuICAgIHZhciBpc0JvZHkgPSBlbC50YWdOYW1lID09ICdCT0RZJ1xuXG4gICAgdmFyIGVsUmVjdCAgICA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgaWYgKGVsUmVjdC53aWR0aCA9PSBudWxsKSB7XG4gICAgICAvLyB3aWR0aCBhbmQgaGVpZ2h0IGFyZSBtaXNzaW5nIGluIElFOCwgc28gY29tcHV0ZSB0aGVtIG1hbnVhbGx5OyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2lzc3Vlcy8xNDA5M1xuICAgICAgZWxSZWN0ID0gJC5leHRlbmQoe30sIGVsUmVjdCwgeyB3aWR0aDogZWxSZWN0LnJpZ2h0IC0gZWxSZWN0LmxlZnQsIGhlaWdodDogZWxSZWN0LmJvdHRvbSAtIGVsUmVjdC50b3AgfSlcbiAgICB9XG4gICAgdmFyIGlzU3ZnID0gd2luZG93LlNWR0VsZW1lbnQgJiYgZWwgaW5zdGFuY2VvZiB3aW5kb3cuU1ZHRWxlbWVudFxuICAgIC8vIEF2b2lkIHVzaW5nICQub2Zmc2V0KCkgb24gU1ZHcyBzaW5jZSBpdCBnaXZlcyBpbmNvcnJlY3QgcmVzdWx0cyBpbiBqUXVlcnkgMy5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2lzc3Vlcy8yMDI4MFxuICAgIHZhciBlbE9mZnNldCAgPSBpc0JvZHkgPyB7IHRvcDogMCwgbGVmdDogMCB9IDogKGlzU3ZnID8gbnVsbCA6ICRlbGVtZW50Lm9mZnNldCgpKVxuICAgIHZhciBzY3JvbGwgICAgPSB7IHNjcm9sbDogaXNCb2R5ID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA6ICRlbGVtZW50LnNjcm9sbFRvcCgpIH1cbiAgICB2YXIgb3V0ZXJEaW1zID0gaXNCb2R5ID8geyB3aWR0aDogJCh3aW5kb3cpLndpZHRoKCksIGhlaWdodDogJCh3aW5kb3cpLmhlaWdodCgpIH0gOiBudWxsXG5cbiAgICByZXR1cm4gJC5leHRlbmQoe30sIGVsUmVjdCwgc2Nyb2xsLCBvdXRlckRpbXMsIGVsT2Zmc2V0KVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0Q2FsY3VsYXRlZE9mZnNldCA9IGZ1bmN0aW9uIChwbGFjZW1lbnQsIHBvcywgYWN0dWFsV2lkdGgsIGFjdHVhbEhlaWdodCkge1xuICAgIHJldHVybiBwbGFjZW1lbnQgPT0gJ2JvdHRvbScgPyB7IHRvcDogcG9zLnRvcCArIHBvcy5oZWlnaHQsICAgbGVmdDogcG9zLmxlZnQgKyBwb3Mud2lkdGggLyAyIC0gYWN0dWFsV2lkdGggLyAyIH0gOlxuICAgICAgICAgICBwbGFjZW1lbnQgPT0gJ3RvcCcgICAgPyB7IHRvcDogcG9zLnRvcCAtIGFjdHVhbEhlaWdodCwgbGVmdDogcG9zLmxlZnQgKyBwb3Mud2lkdGggLyAyIC0gYWN0dWFsV2lkdGggLyAyIH0gOlxuICAgICAgICAgICBwbGFjZW1lbnQgPT0gJ2xlZnQnICAgPyB7IHRvcDogcG9zLnRvcCArIHBvcy5oZWlnaHQgLyAyIC0gYWN0dWFsSGVpZ2h0IC8gMiwgbGVmdDogcG9zLmxlZnQgLSBhY3R1YWxXaWR0aCB9IDpcbiAgICAgICAgLyogcGxhY2VtZW50ID09ICdyaWdodCcgKi8geyB0b3A6IHBvcy50b3AgKyBwb3MuaGVpZ2h0IC8gMiAtIGFjdHVhbEhlaWdodCAvIDIsIGxlZnQ6IHBvcy5sZWZ0ICsgcG9zLndpZHRoIH1cblxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0Vmlld3BvcnRBZGp1c3RlZERlbHRhID0gZnVuY3Rpb24gKHBsYWNlbWVudCwgcG9zLCBhY3R1YWxXaWR0aCwgYWN0dWFsSGVpZ2h0KSB7XG4gICAgdmFyIGRlbHRhID0geyB0b3A6IDAsIGxlZnQ6IDAgfVxuICAgIGlmICghdGhpcy4kdmlld3BvcnQpIHJldHVybiBkZWx0YVxuXG4gICAgdmFyIHZpZXdwb3J0UGFkZGluZyA9IHRoaXMub3B0aW9ucy52aWV3cG9ydCAmJiB0aGlzLm9wdGlvbnMudmlld3BvcnQucGFkZGluZyB8fCAwXG4gICAgdmFyIHZpZXdwb3J0RGltZW5zaW9ucyA9IHRoaXMuZ2V0UG9zaXRpb24odGhpcy4kdmlld3BvcnQpXG5cbiAgICBpZiAoL3JpZ2h0fGxlZnQvLnRlc3QocGxhY2VtZW50KSkge1xuICAgICAgdmFyIHRvcEVkZ2VPZmZzZXQgICAgPSBwb3MudG9wIC0gdmlld3BvcnRQYWRkaW5nIC0gdmlld3BvcnREaW1lbnNpb25zLnNjcm9sbFxuICAgICAgdmFyIGJvdHRvbUVkZ2VPZmZzZXQgPSBwb3MudG9wICsgdmlld3BvcnRQYWRkaW5nIC0gdmlld3BvcnREaW1lbnNpb25zLnNjcm9sbCArIGFjdHVhbEhlaWdodFxuICAgICAgaWYgKHRvcEVkZ2VPZmZzZXQgPCB2aWV3cG9ydERpbWVuc2lvbnMudG9wKSB7IC8vIHRvcCBvdmVyZmxvd1xuICAgICAgICBkZWx0YS50b3AgPSB2aWV3cG9ydERpbWVuc2lvbnMudG9wIC0gdG9wRWRnZU9mZnNldFxuICAgICAgfSBlbHNlIGlmIChib3R0b21FZGdlT2Zmc2V0ID4gdmlld3BvcnREaW1lbnNpb25zLnRvcCArIHZpZXdwb3J0RGltZW5zaW9ucy5oZWlnaHQpIHsgLy8gYm90dG9tIG92ZXJmbG93XG4gICAgICAgIGRlbHRhLnRvcCA9IHZpZXdwb3J0RGltZW5zaW9ucy50b3AgKyB2aWV3cG9ydERpbWVuc2lvbnMuaGVpZ2h0IC0gYm90dG9tRWRnZU9mZnNldFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbGVmdEVkZ2VPZmZzZXQgID0gcG9zLmxlZnQgLSB2aWV3cG9ydFBhZGRpbmdcbiAgICAgIHZhciByaWdodEVkZ2VPZmZzZXQgPSBwb3MubGVmdCArIHZpZXdwb3J0UGFkZGluZyArIGFjdHVhbFdpZHRoXG4gICAgICBpZiAobGVmdEVkZ2VPZmZzZXQgPCB2aWV3cG9ydERpbWVuc2lvbnMubGVmdCkgeyAvLyBsZWZ0IG92ZXJmbG93XG4gICAgICAgIGRlbHRhLmxlZnQgPSB2aWV3cG9ydERpbWVuc2lvbnMubGVmdCAtIGxlZnRFZGdlT2Zmc2V0XG4gICAgICB9IGVsc2UgaWYgKHJpZ2h0RWRnZU9mZnNldCA+IHZpZXdwb3J0RGltZW5zaW9ucy5yaWdodCkgeyAvLyByaWdodCBvdmVyZmxvd1xuICAgICAgICBkZWx0YS5sZWZ0ID0gdmlld3BvcnREaW1lbnNpb25zLmxlZnQgKyB2aWV3cG9ydERpbWVuc2lvbnMud2lkdGggLSByaWdodEVkZ2VPZmZzZXRcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVsdGFcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldFRpdGxlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aXRsZVxuICAgIHZhciAkZSA9IHRoaXMuJGVsZW1lbnRcbiAgICB2YXIgbyAgPSB0aGlzLm9wdGlvbnNcblxuICAgIHRpdGxlID0gJGUuYXR0cignZGF0YS1vcmlnaW5hbC10aXRsZScpXG4gICAgICB8fCAodHlwZW9mIG8udGl0bGUgPT0gJ2Z1bmN0aW9uJyA/IG8udGl0bGUuY2FsbCgkZVswXSkgOiAgby50aXRsZSlcblxuICAgIHJldHVybiB0aXRsZVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0VUlEID0gZnVuY3Rpb24gKHByZWZpeCkge1xuICAgIGRvIHByZWZpeCArPSB+fihNYXRoLnJhbmRvbSgpICogMTAwMDAwMClcbiAgICB3aGlsZSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJlZml4KSlcbiAgICByZXR1cm4gcHJlZml4XG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS50aXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLiR0aXApIHtcbiAgICAgIHRoaXMuJHRpcCA9ICQodGhpcy5vcHRpb25zLnRlbXBsYXRlKVxuICAgICAgaWYgKHRoaXMuJHRpcC5sZW5ndGggIT0gMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy50eXBlICsgJyBgdGVtcGxhdGVgIG9wdGlvbiBtdXN0IGNvbnNpc3Qgb2YgZXhhY3RseSAxIHRvcC1sZXZlbCBlbGVtZW50IScpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLiR0aXBcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmFycm93ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAodGhpcy4kYXJyb3cgPSB0aGlzLiRhcnJvdyB8fCB0aGlzLnRpcCgpLmZpbmQoJy50b29sdGlwLWFycm93JykpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUudG9nZ2xlRW5hYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSAhdGhpcy5lbmFibGVkXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgIGlmIChlKSB7XG4gICAgICBzZWxmID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUpXG4gICAgICBpZiAoIXNlbGYpIHtcbiAgICAgICAgc2VsZiA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKGUuY3VycmVudFRhcmdldCwgdGhpcy5nZXREZWxlZ2F0ZU9wdGlvbnMoKSlcbiAgICAgICAgJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUsIHNlbGYpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGUpIHtcbiAgICAgIHNlbGYuaW5TdGF0ZS5jbGljayA9ICFzZWxmLmluU3RhdGUuY2xpY2tcbiAgICAgIGlmIChzZWxmLmlzSW5TdGF0ZVRydWUoKSkgc2VsZi5lbnRlcihzZWxmKVxuICAgICAgZWxzZSBzZWxmLmxlYXZlKHNlbGYpXG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYudGlwKCkuaGFzQ2xhc3MoJ2luJykgPyBzZWxmLmxlYXZlKHNlbGYpIDogc2VsZi5lbnRlcihzZWxmKVxuICAgIH1cbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dClcbiAgICB0aGlzLmhpZGUoZnVuY3Rpb24gKCkge1xuICAgICAgdGhhdC4kZWxlbWVudC5vZmYoJy4nICsgdGhhdC50eXBlKS5yZW1vdmVEYXRhKCdicy4nICsgdGhhdC50eXBlKVxuICAgICAgaWYgKHRoYXQuJHRpcCkge1xuICAgICAgICB0aGF0LiR0aXAuZGV0YWNoKClcbiAgICAgIH1cbiAgICAgIHRoYXQuJHRpcCA9IG51bGxcbiAgICAgIHRoYXQuJGFycm93ID0gbnVsbFxuICAgICAgdGhhdC4kdmlld3BvcnQgPSBudWxsXG4gICAgICB0aGF0LiRlbGVtZW50ID0gbnVsbFxuICAgIH0pXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5zYW5pdGl6ZUh0bWwgPSBmdW5jdGlvbiAodW5zYWZlSHRtbCkge1xuICAgIHJldHVybiBzYW5pdGl6ZUh0bWwodW5zYWZlSHRtbCwgdGhpcy5vcHRpb25zLndoaXRlTGlzdCwgdGhpcy5vcHRpb25zLnNhbml0aXplRm4pXG4gIH1cblxuICAvLyBUT09MVElQIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMudG9vbHRpcCcpXG4gICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uXG5cbiAgICAgIGlmICghZGF0YSAmJiAvZGVzdHJveXxoaWRlLy50ZXN0KG9wdGlvbikpIHJldHVyblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy50b29sdGlwJywgKGRhdGEgPSBuZXcgVG9vbHRpcCh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4udG9vbHRpcFxuXG4gICQuZm4udG9vbHRpcCAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLnRvb2x0aXAuQ29uc3RydWN0b3IgPSBUb29sdGlwXG5cblxuICAvLyBUT09MVElQIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT1cblxuICAkLmZuLnRvb2x0aXAubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLnRvb2x0aXAgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IHBvcG92ZXIuanMgdjMuNC4xXG4gKiBodHRwczovL2dldGJvb3RzdHJhcC5jb20vZG9jcy8zLjQvamF2YXNjcmlwdC8jcG9wb3ZlcnNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxOSBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBQT1BPVkVSIFBVQkxJQyBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgUG9wb3ZlciA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5pbml0KCdwb3BvdmVyJywgZWxlbWVudCwgb3B0aW9ucylcbiAgfVxuXG4gIGlmICghJC5mbi50b29sdGlwKSB0aHJvdyBuZXcgRXJyb3IoJ1BvcG92ZXIgcmVxdWlyZXMgdG9vbHRpcC5qcycpXG5cbiAgUG9wb3Zlci5WRVJTSU9OICA9ICczLjQuMSdcblxuICBQb3BvdmVyLkRFRkFVTFRTID0gJC5leHRlbmQoe30sICQuZm4udG9vbHRpcC5Db25zdHJ1Y3Rvci5ERUZBVUxUUywge1xuICAgIHBsYWNlbWVudDogJ3JpZ2h0JyxcbiAgICB0cmlnZ2VyOiAnY2xpY2snLFxuICAgIGNvbnRlbnQ6ICcnLFxuICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInBvcG92ZXJcIiByb2xlPVwidG9vbHRpcFwiPjxkaXYgY2xhc3M9XCJhcnJvd1wiPjwvZGl2PjxoMyBjbGFzcz1cInBvcG92ZXItdGl0bGVcIj48L2gzPjxkaXYgY2xhc3M9XCJwb3BvdmVyLWNvbnRlbnRcIj48L2Rpdj48L2Rpdj4nXG4gIH0pXG5cblxuICAvLyBOT1RFOiBQT1BPVkVSIEVYVEVORFMgdG9vbHRpcC5qc1xuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIFBvcG92ZXIucHJvdG90eXBlID0gJC5leHRlbmQoe30sICQuZm4udG9vbHRpcC5Db25zdHJ1Y3Rvci5wcm90b3R5cGUpXG5cbiAgUG9wb3Zlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBQb3BvdmVyXG5cbiAgUG9wb3Zlci5wcm90b3R5cGUuZ2V0RGVmYXVsdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFBvcG92ZXIuREVGQVVMVFNcbiAgfVxuXG4gIFBvcG92ZXIucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICR0aXAgICAgPSB0aGlzLnRpcCgpXG4gICAgdmFyIHRpdGxlICAgPSB0aGlzLmdldFRpdGxlKClcbiAgICB2YXIgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpXG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmh0bWwpIHtcbiAgICAgIHZhciB0eXBlQ29udGVudCA9IHR5cGVvZiBjb250ZW50XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2FuaXRpemUpIHtcbiAgICAgICAgdGl0bGUgPSB0aGlzLnNhbml0aXplSHRtbCh0aXRsZSlcblxuICAgICAgICBpZiAodHlwZUNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGVudCA9IHRoaXMuc2FuaXRpemVIdG1sKGNvbnRlbnQpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJHRpcC5maW5kKCcucG9wb3Zlci10aXRsZScpLmh0bWwodGl0bGUpXG4gICAgICAkdGlwLmZpbmQoJy5wb3BvdmVyLWNvbnRlbnQnKS5jaGlsZHJlbigpLmRldGFjaCgpLmVuZCgpW1xuICAgICAgICB0eXBlQ29udGVudCA9PT0gJ3N0cmluZycgPyAnaHRtbCcgOiAnYXBwZW5kJ1xuICAgICAgXShjb250ZW50KVxuICAgIH0gZWxzZSB7XG4gICAgICAkdGlwLmZpbmQoJy5wb3BvdmVyLXRpdGxlJykudGV4dCh0aXRsZSlcbiAgICAgICR0aXAuZmluZCgnLnBvcG92ZXItY29udGVudCcpLmNoaWxkcmVuKCkuZGV0YWNoKCkuZW5kKCkudGV4dChjb250ZW50KVxuICAgIH1cblxuICAgICR0aXAucmVtb3ZlQ2xhc3MoJ2ZhZGUgdG9wIGJvdHRvbSBsZWZ0IHJpZ2h0IGluJylcblxuICAgIC8vIElFOCBkb2Vzbid0IGFjY2VwdCBoaWRpbmcgdmlhIHRoZSBgOmVtcHR5YCBwc2V1ZG8gc2VsZWN0b3IsIHdlIGhhdmUgdG8gZG9cbiAgICAvLyB0aGlzIG1hbnVhbGx5IGJ5IGNoZWNraW5nIHRoZSBjb250ZW50cy5cbiAgICBpZiAoISR0aXAuZmluZCgnLnBvcG92ZXItdGl0bGUnKS5odG1sKCkpICR0aXAuZmluZCgnLnBvcG92ZXItdGl0bGUnKS5oaWRlKClcbiAgfVxuXG4gIFBvcG92ZXIucHJvdG90eXBlLmhhc0NvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGl0bGUoKSB8fCB0aGlzLmdldENvbnRlbnQoKVxuICB9XG5cbiAgUG9wb3Zlci5wcm90b3R5cGUuZ2V0Q29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJGUgPSB0aGlzLiRlbGVtZW50XG4gICAgdmFyIG8gID0gdGhpcy5vcHRpb25zXG5cbiAgICByZXR1cm4gJGUuYXR0cignZGF0YS1jb250ZW50JylcbiAgICAgIHx8ICh0eXBlb2Ygby5jb250ZW50ID09ICdmdW5jdGlvbicgP1xuICAgICAgICBvLmNvbnRlbnQuY2FsbCgkZVswXSkgOlxuICAgICAgICBvLmNvbnRlbnQpXG4gIH1cblxuICBQb3BvdmVyLnByb3RvdHlwZS5hcnJvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKHRoaXMuJGFycm93ID0gdGhpcy4kYXJyb3cgfHwgdGhpcy50aXAoKS5maW5kKCcuYXJyb3cnKSlcbiAgfVxuXG5cbiAgLy8gUE9QT1ZFUiBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLnBvcG92ZXInKVxuICAgICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvblxuXG4gICAgICBpZiAoIWRhdGEgJiYgL2Rlc3Ryb3l8aGlkZS8udGVzdChvcHRpb24pKSByZXR1cm5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMucG9wb3ZlcicsIChkYXRhID0gbmV3IFBvcG92ZXIodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLnBvcG92ZXJcblxuICAkLmZuLnBvcG92ZXIgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5wb3BvdmVyLkNvbnN0cnVjdG9yID0gUG9wb3ZlclxuXG5cbiAgLy8gUE9QT1ZFUiBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5wb3BvdmVyLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5wb3BvdmVyID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBzY3JvbGxzcHkuanMgdjMuNC4xXG4gKiBodHRwczovL2dldGJvb3RzdHJhcC5jb20vZG9jcy8zLjQvamF2YXNjcmlwdC8jc2Nyb2xsc3B5XG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTkgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gU0NST0xMU1BZIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBTY3JvbGxTcHkoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGJvZHkgICAgICAgICAgPSAkKGRvY3VtZW50LmJvZHkpXG4gICAgdGhpcy4kc2Nyb2xsRWxlbWVudCA9ICQoZWxlbWVudCkuaXMoZG9jdW1lbnQuYm9keSkgPyAkKHdpbmRvdykgOiAkKGVsZW1lbnQpXG4gICAgdGhpcy5vcHRpb25zICAgICAgICA9ICQuZXh0ZW5kKHt9LCBTY3JvbGxTcHkuREVGQVVMVFMsIG9wdGlvbnMpXG4gICAgdGhpcy5zZWxlY3RvciAgICAgICA9ICh0aGlzLm9wdGlvbnMudGFyZ2V0IHx8ICcnKSArICcgLm5hdiBsaSA+IGEnXG4gICAgdGhpcy5vZmZzZXRzICAgICAgICA9IFtdXG4gICAgdGhpcy50YXJnZXRzICAgICAgICA9IFtdXG4gICAgdGhpcy5hY3RpdmVUYXJnZXQgICA9IG51bGxcbiAgICB0aGlzLnNjcm9sbEhlaWdodCAgID0gMFxuXG4gICAgdGhpcy4kc2Nyb2xsRWxlbWVudC5vbignc2Nyb2xsLmJzLnNjcm9sbHNweScsICQucHJveHkodGhpcy5wcm9jZXNzLCB0aGlzKSlcbiAgICB0aGlzLnJlZnJlc2goKVxuICAgIHRoaXMucHJvY2VzcygpXG4gIH1cblxuICBTY3JvbGxTcHkuVkVSU0lPTiAgPSAnMy40LjEnXG5cbiAgU2Nyb2xsU3B5LkRFRkFVTFRTID0ge1xuICAgIG9mZnNldDogMTBcbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUuZ2V0U2Nyb2xsSGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLiRzY3JvbGxFbGVtZW50WzBdLnNjcm9sbEhlaWdodCB8fCBNYXRoLm1heCh0aGlzLiRib2R5WzBdLnNjcm9sbEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodClcbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGhhdCAgICAgICAgICA9IHRoaXNcbiAgICB2YXIgb2Zmc2V0TWV0aG9kICA9ICdvZmZzZXQnXG4gICAgdmFyIG9mZnNldEJhc2UgICAgPSAwXG5cbiAgICB0aGlzLm9mZnNldHMgICAgICA9IFtdXG4gICAgdGhpcy50YXJnZXRzICAgICAgPSBbXVxuICAgIHRoaXMuc2Nyb2xsSGVpZ2h0ID0gdGhpcy5nZXRTY3JvbGxIZWlnaHQoKVxuXG4gICAgaWYgKCEkLmlzV2luZG93KHRoaXMuJHNjcm9sbEVsZW1lbnRbMF0pKSB7XG4gICAgICBvZmZzZXRNZXRob2QgPSAncG9zaXRpb24nXG4gICAgICBvZmZzZXRCYXNlICAgPSB0aGlzLiRzY3JvbGxFbGVtZW50LnNjcm9sbFRvcCgpXG4gICAgfVxuXG4gICAgdGhpcy4kYm9keVxuICAgICAgLmZpbmQodGhpcy5zZWxlY3RvcilcbiAgICAgIC5tYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJGVsICAgPSAkKHRoaXMpXG4gICAgICAgIHZhciBocmVmICA9ICRlbC5kYXRhKCd0YXJnZXQnKSB8fCAkZWwuYXR0cignaHJlZicpXG4gICAgICAgIHZhciAkaHJlZiA9IC9eIy4vLnRlc3QoaHJlZikgJiYgJChocmVmKVxuXG4gICAgICAgIHJldHVybiAoJGhyZWZcbiAgICAgICAgICAmJiAkaHJlZi5sZW5ndGhcbiAgICAgICAgICAmJiAkaHJlZi5pcygnOnZpc2libGUnKVxuICAgICAgICAgICYmIFtbJGhyZWZbb2Zmc2V0TWV0aG9kXSgpLnRvcCArIG9mZnNldEJhc2UsIGhyZWZdXSkgfHwgbnVsbFxuICAgICAgfSlcbiAgICAgIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhWzBdIC0gYlswXSB9KVxuICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGF0Lm9mZnNldHMucHVzaCh0aGlzWzBdKVxuICAgICAgICB0aGF0LnRhcmdldHMucHVzaCh0aGlzWzFdKVxuICAgICAgfSlcbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2Nyb2xsVG9wICAgID0gdGhpcy4kc2Nyb2xsRWxlbWVudC5zY3JvbGxUb3AoKSArIHRoaXMub3B0aW9ucy5vZmZzZXRcbiAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gdGhpcy5nZXRTY3JvbGxIZWlnaHQoKVxuICAgIHZhciBtYXhTY3JvbGwgICAgPSB0aGlzLm9wdGlvbnMub2Zmc2V0ICsgc2Nyb2xsSGVpZ2h0IC0gdGhpcy4kc2Nyb2xsRWxlbWVudC5oZWlnaHQoKVxuICAgIHZhciBvZmZzZXRzICAgICAgPSB0aGlzLm9mZnNldHNcbiAgICB2YXIgdGFyZ2V0cyAgICAgID0gdGhpcy50YXJnZXRzXG4gICAgdmFyIGFjdGl2ZVRhcmdldCA9IHRoaXMuYWN0aXZlVGFyZ2V0XG4gICAgdmFyIGlcblxuICAgIGlmICh0aGlzLnNjcm9sbEhlaWdodCAhPSBzY3JvbGxIZWlnaHQpIHtcbiAgICAgIHRoaXMucmVmcmVzaCgpXG4gICAgfVxuXG4gICAgaWYgKHNjcm9sbFRvcCA+PSBtYXhTY3JvbGwpIHtcbiAgICAgIHJldHVybiBhY3RpdmVUYXJnZXQgIT0gKGkgPSB0YXJnZXRzW3RhcmdldHMubGVuZ3RoIC0gMV0pICYmIHRoaXMuYWN0aXZhdGUoaSlcbiAgICB9XG5cbiAgICBpZiAoYWN0aXZlVGFyZ2V0ICYmIHNjcm9sbFRvcCA8IG9mZnNldHNbMF0pIHtcbiAgICAgIHRoaXMuYWN0aXZlVGFyZ2V0ID0gbnVsbFxuICAgICAgcmV0dXJuIHRoaXMuY2xlYXIoKVxuICAgIH1cblxuICAgIGZvciAoaSA9IG9mZnNldHMubGVuZ3RoOyBpLS07KSB7XG4gICAgICBhY3RpdmVUYXJnZXQgIT0gdGFyZ2V0c1tpXVxuICAgICAgICAmJiBzY3JvbGxUb3AgPj0gb2Zmc2V0c1tpXVxuICAgICAgICAmJiAob2Zmc2V0c1tpICsgMV0gPT09IHVuZGVmaW5lZCB8fCBzY3JvbGxUb3AgPCBvZmZzZXRzW2kgKyAxXSlcbiAgICAgICAgJiYgdGhpcy5hY3RpdmF0ZSh0YXJnZXRzW2ldKVxuICAgIH1cbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgdGhpcy5hY3RpdmVUYXJnZXQgPSB0YXJnZXRcblxuICAgIHRoaXMuY2xlYXIoKVxuXG4gICAgdmFyIHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvciArXG4gICAgICAnW2RhdGEtdGFyZ2V0PVwiJyArIHRhcmdldCArICdcIl0sJyArXG4gICAgICB0aGlzLnNlbGVjdG9yICsgJ1tocmVmPVwiJyArIHRhcmdldCArICdcIl0nXG5cbiAgICB2YXIgYWN0aXZlID0gJChzZWxlY3RvcilcbiAgICAgIC5wYXJlbnRzKCdsaScpXG4gICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXG5cbiAgICBpZiAoYWN0aXZlLnBhcmVudCgnLmRyb3Bkb3duLW1lbnUnKS5sZW5ndGgpIHtcbiAgICAgIGFjdGl2ZSA9IGFjdGl2ZVxuICAgICAgICAuY2xvc2VzdCgnbGkuZHJvcGRvd24nKVxuICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgfVxuXG4gICAgYWN0aXZlLnRyaWdnZXIoJ2FjdGl2YXRlLmJzLnNjcm9sbHNweScpXG4gIH1cblxuICBTY3JvbGxTcHkucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICQodGhpcy5zZWxlY3RvcilcbiAgICAgIC5wYXJlbnRzVW50aWwodGhpcy5vcHRpb25zLnRhcmdldCwgJy5hY3RpdmUnKVxuICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICB9XG5cblxuICAvLyBTQ1JPTExTUFkgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLnNjcm9sbHNweScpXG4gICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuc2Nyb2xsc3B5JywgKGRhdGEgPSBuZXcgU2Nyb2xsU3B5KHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0oKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5zY3JvbGxzcHlcblxuICAkLmZuLnNjcm9sbHNweSAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLnNjcm9sbHNweS5Db25zdHJ1Y3RvciA9IFNjcm9sbFNweVxuXG5cbiAgLy8gU0NST0xMU1BZIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uc2Nyb2xsc3B5Lm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5zY3JvbGxzcHkgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBTQ1JPTExTUFkgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT09PT09XG5cbiAgJCh3aW5kb3cpLm9uKCdsb2FkLmJzLnNjcm9sbHNweS5kYXRhLWFwaScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKCdbZGF0YS1zcHk9XCJzY3JvbGxcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkc3B5ID0gJCh0aGlzKVxuICAgICAgUGx1Z2luLmNhbGwoJHNweSwgJHNweS5kYXRhKCkpXG4gICAgfSlcbiAgfSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogdGFiLmpzIHYzLjQuMVxuICogaHR0cHM6Ly9nZXRib290c3RyYXAuY29tL2RvY3MvMy40L2phdmFzY3JpcHQvI3RhYnNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxOSBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBUQUIgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBUYWIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIC8vIGpzY3M6ZGlzYWJsZSByZXF1aXJlRG9sbGFyQmVmb3JlalF1ZXJ5QXNzaWdubWVudFxuICAgIHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudClcbiAgICAvLyBqc2NzOmVuYWJsZSByZXF1aXJlRG9sbGFyQmVmb3JlalF1ZXJ5QXNzaWdubWVudFxuICB9XG5cbiAgVGFiLlZFUlNJT04gPSAnMy40LjEnXG5cbiAgVGFiLlRSQU5TSVRJT05fRFVSQVRJT04gPSAxNTBcblxuICBUYWIucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICR0aGlzICAgID0gdGhpcy5lbGVtZW50XG4gICAgdmFyICR1bCAgICAgID0gJHRoaXMuY2xvc2VzdCgndWw6bm90KC5kcm9wZG93bi1tZW51KScpXG4gICAgdmFyIHNlbGVjdG9yID0gJHRoaXMuZGF0YSgndGFyZ2V0JylcblxuICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgIHNlbGVjdG9yID0gJHRoaXMuYXR0cignaHJlZicpXG4gICAgICBzZWxlY3RvciA9IHNlbGVjdG9yICYmIHNlbGVjdG9yLnJlcGxhY2UoLy4qKD89I1teXFxzXSokKS8sICcnKSAvLyBzdHJpcCBmb3IgaWU3XG4gICAgfVxuXG4gICAgaWYgKCR0aGlzLnBhcmVudCgnbGknKS5oYXNDbGFzcygnYWN0aXZlJykpIHJldHVyblxuXG4gICAgdmFyICRwcmV2aW91cyA9ICR1bC5maW5kKCcuYWN0aXZlOmxhc3QgYScpXG4gICAgdmFyIGhpZGVFdmVudCA9ICQuRXZlbnQoJ2hpZGUuYnMudGFiJywge1xuICAgICAgcmVsYXRlZFRhcmdldDogJHRoaXNbMF1cbiAgICB9KVxuICAgIHZhciBzaG93RXZlbnQgPSAkLkV2ZW50KCdzaG93LmJzLnRhYicsIHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6ICRwcmV2aW91c1swXVxuICAgIH0pXG5cbiAgICAkcHJldmlvdXMudHJpZ2dlcihoaWRlRXZlbnQpXG4gICAgJHRoaXMudHJpZ2dlcihzaG93RXZlbnQpXG5cbiAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpIHx8IGhpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICB2YXIgJHRhcmdldCA9ICQoZG9jdW1lbnQpLmZpbmQoc2VsZWN0b3IpXG5cbiAgICB0aGlzLmFjdGl2YXRlKCR0aGlzLmNsb3Nlc3QoJ2xpJyksICR1bClcbiAgICB0aGlzLmFjdGl2YXRlKCR0YXJnZXQsICR0YXJnZXQucGFyZW50KCksIGZ1bmN0aW9uICgpIHtcbiAgICAgICRwcmV2aW91cy50cmlnZ2VyKHtcbiAgICAgICAgdHlwZTogJ2hpZGRlbi5icy50YWInLFxuICAgICAgICByZWxhdGVkVGFyZ2V0OiAkdGhpc1swXVxuICAgICAgfSlcbiAgICAgICR0aGlzLnRyaWdnZXIoe1xuICAgICAgICB0eXBlOiAnc2hvd24uYnMudGFiJyxcbiAgICAgICAgcmVsYXRlZFRhcmdldDogJHByZXZpb3VzWzBdXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBUYWIucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24gKGVsZW1lbnQsIGNvbnRhaW5lciwgY2FsbGJhY2spIHtcbiAgICB2YXIgJGFjdGl2ZSAgICA9IGNvbnRhaW5lci5maW5kKCc+IC5hY3RpdmUnKVxuICAgIHZhciB0cmFuc2l0aW9uID0gY2FsbGJhY2tcbiAgICAgICYmICQuc3VwcG9ydC50cmFuc2l0aW9uXG4gICAgICAmJiAoJGFjdGl2ZS5sZW5ndGggJiYgJGFjdGl2ZS5oYXNDbGFzcygnZmFkZScpIHx8ICEhY29udGFpbmVyLmZpbmQoJz4gLmZhZGUnKS5sZW5ndGgpXG5cbiAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgJGFjdGl2ZVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgIC5maW5kKCc+IC5kcm9wZG93bi1tZW51ID4gLmFjdGl2ZScpXG4gICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgLmVuZCgpXG4gICAgICAgIC5maW5kKCdbZGF0YS10b2dnbGU9XCJ0YWJcIl0nKVxuICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIGZhbHNlKVxuXG4gICAgICBlbGVtZW50XG4gICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgLmZpbmQoJ1tkYXRhLXRvZ2dsZT1cInRhYlwiXScpXG4gICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcblxuICAgICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgICAgZWxlbWVudFswXS5vZmZzZXRXaWR0aCAvLyByZWZsb3cgZm9yIHRyYW5zaXRpb25cbiAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnaW4nKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygnZmFkZScpXG4gICAgICB9XG5cbiAgICAgIGlmIChlbGVtZW50LnBhcmVudCgnLmRyb3Bkb3duLW1lbnUnKS5sZW5ndGgpIHtcbiAgICAgICAgZWxlbWVudFxuICAgICAgICAgIC5jbG9zZXN0KCdsaS5kcm9wZG93bicpXG4gICAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgIC5maW5kKCdbZGF0YS10b2dnbGU9XCJ0YWJcIl0nKVxuICAgICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgIH1cblxuICAgICRhY3RpdmUubGVuZ3RoICYmIHRyYW5zaXRpb24gP1xuICAgICAgJGFjdGl2ZVxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCBuZXh0KVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoVGFiLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgIG5leHQoKVxuXG4gICAgJGFjdGl2ZS5yZW1vdmVDbGFzcygnaW4nKVxuICB9XG5cblxuICAvLyBUQUIgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgID0gJHRoaXMuZGF0YSgnYnMudGFiJylcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy50YWInLCAoZGF0YSA9IG5ldyBUYWIodGhpcykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLnRhYlxuXG4gICQuZm4udGFiICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4udGFiLkNvbnN0cnVjdG9yID0gVGFiXG5cblxuICAvLyBUQUIgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09XG5cbiAgJC5mbi50YWIubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLnRhYiA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIFRBQiBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT1cblxuICB2YXIgY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBQbHVnaW4uY2FsbCgkKHRoaXMpLCAnc2hvdycpXG4gIH1cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbignY2xpY2suYnMudGFiLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cInRhYlwiXScsIGNsaWNrSGFuZGxlcilcbiAgICAub24oJ2NsaWNrLmJzLnRhYi5kYXRhLWFwaScsICdbZGF0YS10b2dnbGU9XCJwaWxsXCJdJywgY2xpY2tIYW5kbGVyKVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBhZmZpeC5qcyB2My40LjFcbiAqIGh0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS9kb2NzLzMuNC9qYXZhc2NyaXB0LyNhZmZpeFxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE5IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIEFGRklYIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBBZmZpeCA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIEFmZml4LkRFRkFVTFRTLCBvcHRpb25zKVxuXG4gICAgdmFyIHRhcmdldCA9IHRoaXMub3B0aW9ucy50YXJnZXQgPT09IEFmZml4LkRFRkFVTFRTLnRhcmdldCA/ICQodGhpcy5vcHRpb25zLnRhcmdldCkgOiAkKGRvY3VtZW50KS5maW5kKHRoaXMub3B0aW9ucy50YXJnZXQpXG5cbiAgICB0aGlzLiR0YXJnZXQgPSB0YXJnZXRcbiAgICAgIC5vbignc2Nyb2xsLmJzLmFmZml4LmRhdGEtYXBpJywgJC5wcm94eSh0aGlzLmNoZWNrUG9zaXRpb24sIHRoaXMpKVxuICAgICAgLm9uKCdjbGljay5icy5hZmZpeC5kYXRhLWFwaScsICAkLnByb3h5KHRoaXMuY2hlY2tQb3NpdGlvbldpdGhFdmVudExvb3AsIHRoaXMpKVxuXG4gICAgdGhpcy4kZWxlbWVudCAgICAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy5hZmZpeGVkICAgICAgPSBudWxsXG4gICAgdGhpcy51bnBpbiAgICAgICAgPSBudWxsXG4gICAgdGhpcy5waW5uZWRPZmZzZXQgPSBudWxsXG5cbiAgICB0aGlzLmNoZWNrUG9zaXRpb24oKVxuICB9XG5cbiAgQWZmaXguVkVSU0lPTiAgPSAnMy40LjEnXG5cbiAgQWZmaXguUkVTRVQgICAgPSAnYWZmaXggYWZmaXgtdG9wIGFmZml4LWJvdHRvbSdcblxuICBBZmZpeC5ERUZBVUxUUyA9IHtcbiAgICBvZmZzZXQ6IDAsXG4gICAgdGFyZ2V0OiB3aW5kb3dcbiAgfVxuXG4gIEFmZml4LnByb3RvdHlwZS5nZXRTdGF0ZSA9IGZ1bmN0aW9uIChzY3JvbGxIZWlnaHQsIGhlaWdodCwgb2Zmc2V0VG9wLCBvZmZzZXRCb3R0b20pIHtcbiAgICB2YXIgc2Nyb2xsVG9wICAgID0gdGhpcy4kdGFyZ2V0LnNjcm9sbFRvcCgpXG4gICAgdmFyIHBvc2l0aW9uICAgICA9IHRoaXMuJGVsZW1lbnQub2Zmc2V0KClcbiAgICB2YXIgdGFyZ2V0SGVpZ2h0ID0gdGhpcy4kdGFyZ2V0LmhlaWdodCgpXG5cbiAgICBpZiAob2Zmc2V0VG9wICE9IG51bGwgJiYgdGhpcy5hZmZpeGVkID09ICd0b3AnKSByZXR1cm4gc2Nyb2xsVG9wIDwgb2Zmc2V0VG9wID8gJ3RvcCcgOiBmYWxzZVxuXG4gICAgaWYgKHRoaXMuYWZmaXhlZCA9PSAnYm90dG9tJykge1xuICAgICAgaWYgKG9mZnNldFRvcCAhPSBudWxsKSByZXR1cm4gKHNjcm9sbFRvcCArIHRoaXMudW5waW4gPD0gcG9zaXRpb24udG9wKSA/IGZhbHNlIDogJ2JvdHRvbSdcbiAgICAgIHJldHVybiAoc2Nyb2xsVG9wICsgdGFyZ2V0SGVpZ2h0IDw9IHNjcm9sbEhlaWdodCAtIG9mZnNldEJvdHRvbSkgPyBmYWxzZSA6ICdib3R0b20nXG4gICAgfVxuXG4gICAgdmFyIGluaXRpYWxpemluZyAgID0gdGhpcy5hZmZpeGVkID09IG51bGxcbiAgICB2YXIgY29sbGlkZXJUb3AgICAgPSBpbml0aWFsaXppbmcgPyBzY3JvbGxUb3AgOiBwb3NpdGlvbi50b3BcbiAgICB2YXIgY29sbGlkZXJIZWlnaHQgPSBpbml0aWFsaXppbmcgPyB0YXJnZXRIZWlnaHQgOiBoZWlnaHRcblxuICAgIGlmIChvZmZzZXRUb3AgIT0gbnVsbCAmJiBzY3JvbGxUb3AgPD0gb2Zmc2V0VG9wKSByZXR1cm4gJ3RvcCdcbiAgICBpZiAob2Zmc2V0Qm90dG9tICE9IG51bGwgJiYgKGNvbGxpZGVyVG9wICsgY29sbGlkZXJIZWlnaHQgPj0gc2Nyb2xsSGVpZ2h0IC0gb2Zmc2V0Qm90dG9tKSkgcmV0dXJuICdib3R0b20nXG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIEFmZml4LnByb3RvdHlwZS5nZXRQaW5uZWRPZmZzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMucGlubmVkT2Zmc2V0KSByZXR1cm4gdGhpcy5waW5uZWRPZmZzZXRcbiAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKEFmZml4LlJFU0VUKS5hZGRDbGFzcygnYWZmaXgnKVxuICAgIHZhciBzY3JvbGxUb3AgPSB0aGlzLiR0YXJnZXQuc2Nyb2xsVG9wKClcbiAgICB2YXIgcG9zaXRpb24gID0gdGhpcy4kZWxlbWVudC5vZmZzZXQoKVxuICAgIHJldHVybiAodGhpcy5waW5uZWRPZmZzZXQgPSBwb3NpdGlvbi50b3AgLSBzY3JvbGxUb3ApXG4gIH1cblxuICBBZmZpeC5wcm90b3R5cGUuY2hlY2tQb3NpdGlvbldpdGhFdmVudExvb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2V0VGltZW91dCgkLnByb3h5KHRoaXMuY2hlY2tQb3NpdGlvbiwgdGhpcyksIDEpXG4gIH1cblxuICBBZmZpeC5wcm90b3R5cGUuY2hlY2tQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuJGVsZW1lbnQuaXMoJzp2aXNpYmxlJykpIHJldHVyblxuXG4gICAgdmFyIGhlaWdodCAgICAgICA9IHRoaXMuJGVsZW1lbnQuaGVpZ2h0KClcbiAgICB2YXIgb2Zmc2V0ICAgICAgID0gdGhpcy5vcHRpb25zLm9mZnNldFxuICAgIHZhciBvZmZzZXRUb3AgICAgPSBvZmZzZXQudG9wXG4gICAgdmFyIG9mZnNldEJvdHRvbSA9IG9mZnNldC5ib3R0b21cbiAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gTWF0aC5tYXgoJChkb2N1bWVudCkuaGVpZ2h0KCksICQoZG9jdW1lbnQuYm9keSkuaGVpZ2h0KCkpXG5cbiAgICBpZiAodHlwZW9mIG9mZnNldCAhPSAnb2JqZWN0JykgICAgICAgICBvZmZzZXRCb3R0b20gPSBvZmZzZXRUb3AgPSBvZmZzZXRcbiAgICBpZiAodHlwZW9mIG9mZnNldFRvcCA9PSAnZnVuY3Rpb24nKSAgICBvZmZzZXRUb3AgICAgPSBvZmZzZXQudG9wKHRoaXMuJGVsZW1lbnQpXG4gICAgaWYgKHR5cGVvZiBvZmZzZXRCb3R0b20gPT0gJ2Z1bmN0aW9uJykgb2Zmc2V0Qm90dG9tID0gb2Zmc2V0LmJvdHRvbSh0aGlzLiRlbGVtZW50KVxuXG4gICAgdmFyIGFmZml4ID0gdGhpcy5nZXRTdGF0ZShzY3JvbGxIZWlnaHQsIGhlaWdodCwgb2Zmc2V0VG9wLCBvZmZzZXRCb3R0b20pXG5cbiAgICBpZiAodGhpcy5hZmZpeGVkICE9IGFmZml4KSB7XG4gICAgICBpZiAodGhpcy51bnBpbiAhPSBudWxsKSB0aGlzLiRlbGVtZW50LmNzcygndG9wJywgJycpXG5cbiAgICAgIHZhciBhZmZpeFR5cGUgPSAnYWZmaXgnICsgKGFmZml4ID8gJy0nICsgYWZmaXggOiAnJylcbiAgICAgIHZhciBlICAgICAgICAgPSAkLkV2ZW50KGFmZml4VHlwZSArICcuYnMuYWZmaXgnKVxuXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgICB0aGlzLmFmZml4ZWQgPSBhZmZpeFxuICAgICAgdGhpcy51bnBpbiA9IGFmZml4ID09ICdib3R0b20nID8gdGhpcy5nZXRQaW5uZWRPZmZzZXQoKSA6IG51bGxcblxuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAucmVtb3ZlQ2xhc3MoQWZmaXguUkVTRVQpXG4gICAgICAgIC5hZGRDbGFzcyhhZmZpeFR5cGUpXG4gICAgICAgIC50cmlnZ2VyKGFmZml4VHlwZS5yZXBsYWNlKCdhZmZpeCcsICdhZmZpeGVkJykgKyAnLmJzLmFmZml4JylcbiAgICB9XG5cbiAgICBpZiAoYWZmaXggPT0gJ2JvdHRvbScpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2Zmc2V0KHtcbiAgICAgICAgdG9wOiBzY3JvbGxIZWlnaHQgLSBoZWlnaHQgLSBvZmZzZXRCb3R0b21cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cblxuICAvLyBBRkZJWCBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5hZmZpeCcpXG4gICAgICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuYWZmaXgnLCAoZGF0YSA9IG5ldyBBZmZpeCh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4uYWZmaXhcblxuICAkLmZuLmFmZml4ICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4uYWZmaXguQ29uc3RydWN0b3IgPSBBZmZpeFxuXG5cbiAgLy8gQUZGSVggTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT1cblxuICAkLmZuLmFmZml4Lm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5hZmZpeCA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIEFGRklYIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09XG5cbiAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLXNweT1cImFmZml4XCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHNweSA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhID0gJHNweS5kYXRhKClcblxuICAgICAgZGF0YS5vZmZzZXQgPSBkYXRhLm9mZnNldCB8fCB7fVxuXG4gICAgICBpZiAoZGF0YS5vZmZzZXRCb3R0b20gIT0gbnVsbCkgZGF0YS5vZmZzZXQuYm90dG9tID0gZGF0YS5vZmZzZXRCb3R0b21cbiAgICAgIGlmIChkYXRhLm9mZnNldFRvcCAgICAhPSBudWxsKSBkYXRhLm9mZnNldC50b3AgICAgPSBkYXRhLm9mZnNldFRvcFxuXG4gICAgICBQbHVnaW4uY2FsbCgkc3B5LCBkYXRhKVxuICAgIH0pXG4gIH0pXG5cbn0oalF1ZXJ5KTtcbiIsIi8vIFN0aWNreSBQbHVnaW4gdjEuMC40IGZvciBqUXVlcnlcbi8vID09PT09PT09PT09PT1cbi8vIEF1dGhvcjogQW50aG9ueSBHYXJhbmRcbi8vIEltcHJvdmVtZW50cyBieSBHZXJtYW4gTS4gQnJhdm8gKEtyb251eikgYW5kIFJ1dWQgS2FtcGh1aXMgKHJ1dWRrKVxuLy8gSW1wcm92ZW1lbnRzIGJ5IExlb25hcmRvIEMuIERhcm9uY28gKGRhcm9uY28pXG4vLyBDcmVhdGVkOiAwMi8xNC8yMDExXG4vLyBEYXRlOiAwNy8yMC8yMDE1XG4vLyBXZWJzaXRlOiBodHRwOi8vc3RpY2t5anMuY29tL1xuLy8gRGVzY3JpcHRpb246IE1ha2VzIGFuIGVsZW1lbnQgb24gdGhlIHBhZ2Ugc3RpY2sgb24gdGhlIHNjcmVlbiBhcyB5b3Ugc2Nyb2xsXG4vLyAgICAgICAgICAgICAgSXQgd2lsbCBvbmx5IHNldCB0aGUgJ3RvcCcgYW5kICdwb3NpdGlvbicgb2YgeW91ciBlbGVtZW50LCB5b3Vcbi8vICAgICAgICAgICAgICBtaWdodCBuZWVkIHRvIGFkanVzdCB0aGUgd2lkdGggaW4gc29tZSBjYXNlcy5cblxuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIC8vIE5vZGUvQ29tbW9uSlNcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICAgICAgZmFjdG9yeShqUXVlcnkpO1xuICAgIH1cbn0oZnVuY3Rpb24gKCQpIHtcbiAgICB2YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7IC8vIHNhdmUgcmVmIHRvIG9yaWdpbmFsIHNsaWNlKClcbiAgICB2YXIgc3BsaWNlID0gQXJyYXkucHJvdG90eXBlLnNwbGljZTsgLy8gc2F2ZSByZWYgdG8gb3JpZ2luYWwgc2xpY2UoKVxuXG4gIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgIHRvcFNwYWNpbmc6IDAsXG4gICAgICBib3R0b21TcGFjaW5nOiAwLFxuICAgICAgY2xhc3NOYW1lOiAnaXMtc3RpY2t5JyxcbiAgICAgIHdyYXBwZXJDbGFzc05hbWU6ICdzdGlja3ktd3JhcHBlcicsXG4gICAgICBjZW50ZXI6IGZhbHNlLFxuICAgICAgZ2V0V2lkdGhGcm9tOiAnJyxcbiAgICAgIHdpZHRoRnJvbVdyYXBwZXI6IHRydWUsIC8vIHdvcmtzIG9ubHkgd2hlbiAuZ2V0V2lkdGhGcm9tIGlzIGVtcHR5XG4gICAgICByZXNwb25zaXZlV2lkdGg6IGZhbHNlLFxuICAgICAgekluZGV4OiAnYXV0bydcbiAgICB9LFxuICAgICR3aW5kb3cgPSAkKHdpbmRvdyksXG4gICAgJGRvY3VtZW50ID0gJChkb2N1bWVudCksXG4gICAgc3RpY2tlZCA9IFtdLFxuICAgIHdpbmRvd0hlaWdodCA9ICR3aW5kb3cuaGVpZ2h0KCksXG4gICAgc2Nyb2xsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSAkd2luZG93LnNjcm9sbFRvcCgpLFxuICAgICAgICBkb2N1bWVudEhlaWdodCA9ICRkb2N1bWVudC5oZWlnaHQoKSxcbiAgICAgICAgZHdoID0gZG9jdW1lbnRIZWlnaHQgLSB3aW5kb3dIZWlnaHQsXG4gICAgICAgIGV4dHJhID0gKHNjcm9sbFRvcCA+IGR3aCkgPyBkd2ggLSBzY3JvbGxUb3AgOiAwO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHN0aWNrZWQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBzID0gc3RpY2tlZFtpXSxcbiAgICAgICAgICBlbGVtZW50VG9wID0gcy5zdGlja3lXcmFwcGVyLm9mZnNldCgpLnRvcCxcbiAgICAgICAgICBldHNlID0gZWxlbWVudFRvcCAtIHMudG9wU3BhY2luZyAtIGV4dHJhO1xuXG4gICAgICAgIC8vdXBkYXRlIGhlaWdodCBpbiBjYXNlIG9mIGR5bmFtaWMgY29udGVudFxuICAgICAgICBzLnN0aWNreVdyYXBwZXIuY3NzKCdoZWlnaHQnLCBzLnN0aWNreUVsZW1lbnQub3V0ZXJIZWlnaHQoKSk7XG5cbiAgICAgICAgaWYgKHNjcm9sbFRvcCA8PSBldHNlKSB7XG4gICAgICAgICAgaWYgKHMuY3VycmVudFRvcCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcy5zdGlja3lFbGVtZW50XG4gICAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgICd3aWR0aCc6ICcnLFxuICAgICAgICAgICAgICAgICdwb3NpdGlvbic6ICcnLFxuICAgICAgICAgICAgICAgICd0b3AnOiAnJyxcbiAgICAgICAgICAgICAgICAnei1pbmRleCc6ICcnXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcy5zdGlja3lFbGVtZW50LnBhcmVudCgpLnJlbW92ZUNsYXNzKHMuY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIHMuc3RpY2t5RWxlbWVudC50cmlnZ2VyKCdzdGlja3ktZW5kJywgW3NdKTtcbiAgICAgICAgICAgIHMuY3VycmVudFRvcCA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhciBuZXdUb3AgPSBkb2N1bWVudEhlaWdodCAtIHMuc3RpY2t5RWxlbWVudC5vdXRlckhlaWdodCgpXG4gICAgICAgICAgICAtIHMudG9wU3BhY2luZyAtIHMuYm90dG9tU3BhY2luZyAtIHNjcm9sbFRvcCAtIGV4dHJhO1xuICAgICAgICAgIGlmIChuZXdUb3AgPCAwKSB7XG4gICAgICAgICAgICBuZXdUb3AgPSBuZXdUb3AgKyBzLnRvcFNwYWNpbmc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1RvcCA9IHMudG9wU3BhY2luZztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHMuY3VycmVudFRvcCAhPT0gbmV3VG9wKSB7XG4gICAgICAgICAgICB2YXIgbmV3V2lkdGg7XG4gICAgICAgICAgICBpZiAocy5nZXRXaWR0aEZyb20pIHtcbiAgICAgICAgICAgICAgICBuZXdXaWR0aCA9ICQocy5nZXRXaWR0aEZyb20pLndpZHRoKCkgfHwgbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocy53aWR0aEZyb21XcmFwcGVyKSB7XG4gICAgICAgICAgICAgICAgbmV3V2lkdGggPSBzLnN0aWNreVdyYXBwZXIud2lkdGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXdXaWR0aCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmV3V2lkdGggPSBzLnN0aWNreUVsZW1lbnQud2lkdGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMuc3RpY2t5RWxlbWVudFxuICAgICAgICAgICAgICAuY3NzKCd3aWR0aCcsIG5ld1dpZHRoKVxuICAgICAgICAgICAgICAuY3NzKCdwb3NpdGlvbicsICdmaXhlZCcpXG4gICAgICAgICAgICAgIC5jc3MoJ3RvcCcsIG5ld1RvcClcbiAgICAgICAgICAgICAgLmNzcygnei1pbmRleCcsIHMuekluZGV4KTtcblxuICAgICAgICAgICAgcy5zdGlja3lFbGVtZW50LnBhcmVudCgpLmFkZENsYXNzKHMuY2xhc3NOYW1lKTtcblxuICAgICAgICAgICAgaWYgKHMuY3VycmVudFRvcCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICBzLnN0aWNreUVsZW1lbnQudHJpZ2dlcignc3RpY2t5LXN0YXJ0JywgW3NdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIHN0aWNreSBpcyBzdGFydGVkIGJ1dCBpdCBoYXZlIHRvIGJlIHJlcG9zaXRpb25lZFxuICAgICAgICAgICAgICBzLnN0aWNreUVsZW1lbnQudHJpZ2dlcignc3RpY2t5LXVwZGF0ZScsIFtzXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzLmN1cnJlbnRUb3AgPT09IHMudG9wU3BhY2luZyAmJiBzLmN1cnJlbnRUb3AgPiBuZXdUb3AgfHwgcy5jdXJyZW50VG9wID09PSBudWxsICYmIG5ld1RvcCA8IHMudG9wU3BhY2luZykge1xuICAgICAgICAgICAgICAvLyBqdXN0IHJlYWNoZWQgYm90dG9tIHx8IGp1c3Qgc3RhcnRlZCB0byBzdGljayBidXQgYm90dG9tIGlzIGFscmVhZHkgcmVhY2hlZFxuICAgICAgICAgICAgICBzLnN0aWNreUVsZW1lbnQudHJpZ2dlcignc3RpY2t5LWJvdHRvbS1yZWFjaGVkJywgW3NdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihzLmN1cnJlbnRUb3AgIT09IG51bGwgJiYgbmV3VG9wID09PSBzLnRvcFNwYWNpbmcgJiYgcy5jdXJyZW50VG9wIDwgbmV3VG9wKSB7XG4gICAgICAgICAgICAgIC8vIHN0aWNreSBpcyBzdGFydGVkICYmIHN0aWNrZWQgYXQgdG9wU3BhY2luZyAmJiBvdmVyZmxvd2luZyBmcm9tIHRvcCBqdXN0IGZpbmlzaGVkXG4gICAgICAgICAgICAgIHMuc3RpY2t5RWxlbWVudC50cmlnZ2VyKCdzdGlja3ktYm90dG9tLXVucmVhY2hlZCcsIFtzXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHMuY3VycmVudFRvcCA9IG5ld1RvcDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBDaGVjayBpZiBzdGlja3kgaGFzIHJlYWNoZWQgZW5kIG9mIGNvbnRhaW5lciBhbmQgc3RvcCBzdGlja2luZ1xuICAgICAgICAgIHZhciBzdGlja3lXcmFwcGVyQ29udGFpbmVyID0gcy5zdGlja3lXcmFwcGVyLnBhcmVudCgpO1xuICAgICAgICAgIHZhciB1bnN0aWNrID0gKHMuc3RpY2t5RWxlbWVudC5vZmZzZXQoKS50b3AgKyBzLnN0aWNreUVsZW1lbnQub3V0ZXJIZWlnaHQoKSA+PSBzdGlja3lXcmFwcGVyQ29udGFpbmVyLm9mZnNldCgpLnRvcCArIHN0aWNreVdyYXBwZXJDb250YWluZXIub3V0ZXJIZWlnaHQoKSkgJiYgKHMuc3RpY2t5RWxlbWVudC5vZmZzZXQoKS50b3AgPD0gcy50b3BTcGFjaW5nKTtcblxuICAgICAgICAgIGlmKCB1bnN0aWNrICkge1xuICAgICAgICAgICAgcy5zdGlja3lFbGVtZW50XG4gICAgICAgICAgICAgIC5jc3MoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJylcbiAgICAgICAgICAgICAgLmNzcygndG9wJywgJycpXG4gICAgICAgICAgICAgIC5jc3MoJ2JvdHRvbScsIDApXG4gICAgICAgICAgICAgIC5jc3MoJ3otaW5kZXgnLCAnJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHMuc3RpY2t5RWxlbWVudFxuICAgICAgICAgICAgICAuY3NzKCdwb3NpdGlvbicsICdmaXhlZCcpXG4gICAgICAgICAgICAgIC5jc3MoJ3RvcCcsIG5ld1RvcClcbiAgICAgICAgICAgICAgLmNzcygnYm90dG9tJywgJycpXG4gICAgICAgICAgICAgIC5jc3MoJ3otaW5kZXgnLCBzLnpJbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICByZXNpemVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB3aW5kb3dIZWlnaHQgPSAkd2luZG93LmhlaWdodCgpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHN0aWNrZWQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBzID0gc3RpY2tlZFtpXTtcbiAgICAgICAgdmFyIG5ld1dpZHRoID0gbnVsbDtcbiAgICAgICAgaWYgKHMuZ2V0V2lkdGhGcm9tKSB7XG4gICAgICAgICAgICBpZiAocy5yZXNwb25zaXZlV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBuZXdXaWR0aCA9ICQocy5nZXRXaWR0aEZyb20pLndpZHRoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZihzLndpZHRoRnJvbVdyYXBwZXIpIHtcbiAgICAgICAgICAgIG5ld1dpZHRoID0gcy5zdGlja3lXcmFwcGVyLndpZHRoKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld1dpZHRoICE9IG51bGwpIHtcbiAgICAgICAgICAgIHMuc3RpY2t5RWxlbWVudC5jc3MoJ3dpZHRoJywgbmV3V2lkdGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzID0ge1xuICAgICAgaW5pdDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB2YXIgbyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHN0aWNreUVsZW1lbnQgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgdmFyIHN0aWNreUlkID0gc3RpY2t5RWxlbWVudC5hdHRyKCdpZCcpO1xuICAgICAgICAgIHZhciB3cmFwcGVySWQgPSBzdGlja3lJZCA/IHN0aWNreUlkICsgJy0nICsgZGVmYXVsdHMud3JhcHBlckNsYXNzTmFtZSA6IGRlZmF1bHRzLndyYXBwZXJDbGFzc05hbWU7XG4gICAgICAgICAgdmFyIHdyYXBwZXIgPSAkKCc8ZGl2PjwvZGl2PicpXG4gICAgICAgICAgICAuYXR0cignaWQnLCB3cmFwcGVySWQpXG4gICAgICAgICAgICAuYWRkQ2xhc3Moby53cmFwcGVyQ2xhc3NOYW1lKTtcblxuICAgICAgICAgIHN0aWNreUVsZW1lbnQud3JhcEFsbCh3cmFwcGVyKTtcblxuICAgICAgICAgIHZhciBzdGlja3lXcmFwcGVyID0gc3RpY2t5RWxlbWVudC5wYXJlbnQoKTtcblxuICAgICAgICAgIGlmIChvLmNlbnRlcikge1xuICAgICAgICAgICAgc3RpY2t5V3JhcHBlci5jc3Moe3dpZHRoOnN0aWNreUVsZW1lbnQub3V0ZXJXaWR0aCgpLG1hcmdpbkxlZnQ6XCJhdXRvXCIsbWFyZ2luUmlnaHQ6XCJhdXRvXCJ9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3RpY2t5RWxlbWVudC5jc3MoXCJmbG9hdFwiKSA9PT0gXCJyaWdodFwiKSB7XG4gICAgICAgICAgICBzdGlja3lFbGVtZW50LmNzcyh7XCJmbG9hdFwiOlwibm9uZVwifSkucGFyZW50KCkuY3NzKHtcImZsb2F0XCI6XCJyaWdodFwifSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgby5zdGlja3lFbGVtZW50ID0gc3RpY2t5RWxlbWVudDtcbiAgICAgICAgICBvLnN0aWNreVdyYXBwZXIgPSBzdGlja3lXcmFwcGVyO1xuICAgICAgICAgIG8uY3VycmVudFRvcCAgICA9IG51bGw7XG5cbiAgICAgICAgICBzdGlja2VkLnB1c2gobyk7XG5cbiAgICAgICAgICBtZXRob2RzLnNldFdyYXBwZXJIZWlnaHQodGhpcyk7XG4gICAgICAgICAgbWV0aG9kcy5zZXR1cENoYW5nZUxpc3RlbmVycyh0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuXG4gICAgICBzZXRXcmFwcGVySGVpZ2h0OiBmdW5jdGlvbihzdGlja3lFbGVtZW50KSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gJChzdGlja3lFbGVtZW50KTtcbiAgICAgICAgdmFyIHN0aWNreVdyYXBwZXIgPSBlbGVtZW50LnBhcmVudCgpO1xuICAgICAgICBpZiAoc3RpY2t5V3JhcHBlcikge1xuICAgICAgICAgIHN0aWNreVdyYXBwZXIuY3NzKCdoZWlnaHQnLCBlbGVtZW50Lm91dGVySGVpZ2h0KCkpO1xuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBzZXR1cENoYW5nZUxpc3RlbmVyczogZnVuY3Rpb24oc3RpY2t5RWxlbWVudCkge1xuICAgICAgICBpZiAod2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgICAgICAgICB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyB3aW5kb3cuTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChtdXRhdGlvbnNbMF0uYWRkZWROb2Rlcy5sZW5ndGggfHwgbXV0YXRpb25zWzBdLnJlbW92ZWROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgbWV0aG9kcy5zZXRXcmFwcGVySGVpZ2h0KHN0aWNreUVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShzdGlja3lFbGVtZW50LCB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RpY2t5RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Ob2RlSW5zZXJ0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1ldGhvZHMuc2V0V3JhcHBlckhlaWdodChzdGlja3lFbGVtZW50KTtcbiAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgICAgc3RpY2t5RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Ob2RlUmVtb3ZlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbWV0aG9kcy5zZXRXcmFwcGVySGVpZ2h0KHN0aWNreUVsZW1lbnQpO1xuICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVwZGF0ZTogc2Nyb2xsZXIsXG4gICAgICB1bnN0aWNrOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgIHZhciB1bnN0aWNreUVsZW1lbnQgPSAkKHRoYXQpO1xuXG4gICAgICAgICAgdmFyIHJlbW92ZUlkeCA9IC0xO1xuICAgICAgICAgIHZhciBpID0gc3RpY2tlZC5sZW5ndGg7XG4gICAgICAgICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgICAgICAgIGlmIChzdGlja2VkW2ldLnN0aWNreUVsZW1lbnQuZ2V0KDApID09PSB0aGF0KSB7XG4gICAgICAgICAgICAgICAgc3BsaWNlLmNhbGwoc3RpY2tlZCxpLDEpO1xuICAgICAgICAgICAgICAgIHJlbW92ZUlkeCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKHJlbW92ZUlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHVuc3RpY2t5RWxlbWVudC51bndyYXAoKTtcbiAgICAgICAgICAgIHVuc3RpY2t5RWxlbWVudFxuICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAnd2lkdGgnOiAnJyxcbiAgICAgICAgICAgICAgICAncG9zaXRpb24nOiAnJyxcbiAgICAgICAgICAgICAgICAndG9wJzogJycsXG4gICAgICAgICAgICAgICAgJ2Zsb2F0JzogJycsXG4gICAgICAgICAgICAgICAgJ3otaW5kZXgnOiAnJ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAvLyBzaG91bGQgYmUgbW9yZSBlZmZpY2llbnQgdGhhbiB1c2luZyAkd2luZG93LnNjcm9sbChzY3JvbGxlcikgYW5kICR3aW5kb3cucmVzaXplKHJlc2l6ZXIpOlxuICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc2Nyb2xsZXIsIGZhbHNlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplciwgZmFsc2UpO1xuICB9IGVsc2UgaWYgKHdpbmRvdy5hdHRhY2hFdmVudCkge1xuICAgIHdpbmRvdy5hdHRhY2hFdmVudCgnb25zY3JvbGwnLCBzY3JvbGxlcik7XG4gICAgd2luZG93LmF0dGFjaEV2ZW50KCdvbnJlc2l6ZScsIHJlc2l6ZXIpO1xuICB9XG5cbiAgJC5mbi5zdGlja3kgPSBmdW5jdGlvbihtZXRob2QpIHtcbiAgICBpZiAobWV0aG9kc1ttZXRob2RdKSB7XG4gICAgICByZXR1cm4gbWV0aG9kc1ttZXRob2RdLmFwcGx5KHRoaXMsIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kICkge1xuICAgICAgcmV0dXJuIG1ldGhvZHMuaW5pdC5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQuZXJyb3IoJ01ldGhvZCAnICsgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkuc3RpY2t5Jyk7XG4gICAgfVxuICB9O1xuXG4gICQuZm4udW5zdGljayA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIGlmIChtZXRob2RzW21ldGhvZF0pIHtcbiAgICAgIHJldHVybiBtZXRob2RzW21ldGhvZF0uYXBwbHkodGhpcywgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdvYmplY3QnIHx8ICFtZXRob2QgKSB7XG4gICAgICByZXR1cm4gbWV0aG9kcy51bnN0aWNrLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJC5lcnJvcignTWV0aG9kICcgKyBtZXRob2QgKyAnIGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS5zdGlja3knKTtcbiAgICB9XG4gIH07XG4gICQoZnVuY3Rpb24oKSB7XG4gICAgc2V0VGltZW91dChzY3JvbGxlciwgMCk7XG4gIH0pO1xufSkpO1xuIiwiLyohIHNpZHIgLSB2Mi4yLjEgLSAyMDE2LTAyLTE3XG4gKiBodHRwOi8vd3d3LmJlcnJpYXJ0LmNvbS9zaWRyL1xuICogQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQWxiZXJ0byBWYXJlbGE7IExpY2Vuc2VkIE1JVCAqL1xuXG4oZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGJhYmVsSGVscGVycyA9IHt9O1xuXG4gIGJhYmVsSGVscGVycy5jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgICB9XG4gIH07XG5cbiAgYmFiZWxIZWxwZXJzLmNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gICAgfTtcbiAgfSgpO1xuXG4gIGJhYmVsSGVscGVycztcblxuICB2YXIgc2lkclN0YXR1cyA9IHtcbiAgICBtb3Zpbmc6IGZhbHNlLFxuICAgIG9wZW5lZDogZmFsc2VcbiAgfTtcblxuICB2YXIgaGVscGVyID0ge1xuICAgIC8vIENoZWNrIGZvciB2YWxpZHMgdXJsc1xuICAgIC8vIEZyb20gOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU3MTcwOTMvY2hlY2staWYtYS1qYXZhc2NyaXB0LXN0cmluZy1pcy1hbi11cmxcblxuICAgIGlzVXJsOiBmdW5jdGlvbiBpc1VybChzdHIpIHtcbiAgICAgIHZhciBwYXR0ZXJuID0gbmV3IFJlZ0V4cCgnXihodHRwcz86XFxcXC9cXFxcLyk/JyArIC8vIHByb3RvY29sXG4gICAgICAnKCgoW2EtelxcXFxkXShbYS16XFxcXGQtXSpbYS16XFxcXGRdKSopXFxcXC4/KStbYS16XXsyLH18JyArIC8vIGRvbWFpbiBuYW1lXG4gICAgICAnKChcXFxcZHsxLDN9XFxcXC4pezN9XFxcXGR7MSwzfSkpJyArIC8vIE9SIGlwICh2NCkgYWRkcmVzc1xuICAgICAgJyhcXFxcOlxcXFxkKyk/KFxcXFwvWy1hLXpcXFxcZCVfLn4rXSopKicgKyAvLyBwb3J0IGFuZCBwYXRoXG4gICAgICAnKFxcXFw/WzsmYS16XFxcXGQlXy5+Kz0tXSopPycgKyAvLyBxdWVyeSBzdHJpbmdcbiAgICAgICcoXFxcXCNbLWEtelxcXFxkX10qKT8kJywgJ2knKTsgLy8gZnJhZ21lbnQgbG9jYXRvclxuXG4gICAgICBpZiAocGF0dGVybi50ZXN0KHN0cikpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLy8gQWRkIHNpZHIgcHJlZml4ZXNcbiAgICBhZGRQcmVmaXhlczogZnVuY3Rpb24gYWRkUHJlZml4ZXMoJGVsZW1lbnQpIHtcbiAgICAgIHRoaXMuYWRkUHJlZml4KCRlbGVtZW50LCAnaWQnKTtcbiAgICAgIHRoaXMuYWRkUHJlZml4KCRlbGVtZW50LCAnY2xhc3MnKTtcbiAgICAgICRlbGVtZW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgfSxcbiAgICBhZGRQcmVmaXg6IGZ1bmN0aW9uIGFkZFByZWZpeCgkZWxlbWVudCwgYXR0cmlidXRlKSB7XG4gICAgICB2YXIgdG9SZXBsYWNlID0gJGVsZW1lbnQuYXR0cihhdHRyaWJ1dGUpO1xuXG4gICAgICBpZiAodHlwZW9mIHRvUmVwbGFjZSA9PT0gJ3N0cmluZycgJiYgdG9SZXBsYWNlICE9PSAnJyAmJiB0b1JlcGxhY2UgIT09ICdzaWRyLWlubmVyJykge1xuICAgICAgICAkZWxlbWVudC5hdHRyKGF0dHJpYnV0ZSwgdG9SZXBsYWNlLnJlcGxhY2UoLyhbQS1aYS16MC05Xy5cXC1dKykvZywgJ3NpZHItJyArIGF0dHJpYnV0ZSArICctJDEnKSk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgLy8gQ2hlY2sgaWYgdHJhbnNpdGlvbnMgaXMgc3VwcG9ydGVkXG4gICAgdHJhbnNpdGlvbnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgICAgc3R5bGUgPSBib2R5LnN0eWxlLFxuICAgICAgICAgIHN1cHBvcnRlZCA9IGZhbHNlLFxuICAgICAgICAgIHByb3BlcnR5ID0gJ3RyYW5zaXRpb24nO1xuXG4gICAgICBpZiAocHJvcGVydHkgaW4gc3R5bGUpIHtcbiAgICAgICAgc3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIHByZWZpeGVzID0gWydtb3onLCAnd2Via2l0JywgJ28nLCAnbXMnXSxcbiAgICAgICAgICAgICAgcHJlZml4ID0gdW5kZWZpbmVkLFxuICAgICAgICAgICAgICBpID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgcHJvcGVydHkgPSBwcm9wZXJ0eS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3BlcnR5LnN1YnN0cigxKTtcbiAgICAgICAgICBzdXBwb3J0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgcHJlZml4ID0gcHJlZml4ZXNbaV07XG4gICAgICAgICAgICAgIGlmIChwcmVmaXggKyBwcm9wZXJ0eSBpbiBzdHlsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KCk7XG4gICAgICAgICAgcHJvcGVydHkgPSBzdXBwb3J0ZWQgPyAnLScgKyBwcmVmaXgudG9Mb3dlckNhc2UoKSArICctJyArIHByb3BlcnR5LnRvTG93ZXJDYXNlKCkgOiBudWxsO1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdXBwb3J0ZWQ6IHN1cHBvcnRlZCxcbiAgICAgICAgcHJvcGVydHk6IHByb3BlcnR5XG4gICAgICB9O1xuICAgIH0oKVxuICB9O1xuXG4gIHZhciAkJDIgPSBqUXVlcnk7XG5cbiAgdmFyIGJvZHlBbmltYXRpb25DbGFzcyA9ICdzaWRyLWFuaW1hdGluZyc7XG4gIHZhciBvcGVuQWN0aW9uID0gJ29wZW4nO1xuICB2YXIgY2xvc2VBY3Rpb24gPSAnY2xvc2UnO1xuICB2YXIgdHJhbnNpdGlvbkVuZEV2ZW50ID0gJ3dlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnO1xuICB2YXIgTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZW51KG5hbWUpIHtcbiAgICAgIGJhYmVsSGVscGVycy5jbGFzc0NhbGxDaGVjayh0aGlzLCBNZW51KTtcblxuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgIHRoaXMuaXRlbSA9ICQkMignIycgKyBuYW1lKTtcbiAgICAgIHRoaXMub3BlbkNsYXNzID0gbmFtZSA9PT0gJ3NpZHInID8gJ3NpZHItb3BlbicgOiAnc2lkci1vcGVuICcgKyBuYW1lICsgJy1vcGVuJztcbiAgICAgIHRoaXMubWVudVdpZHRoID0gdGhpcy5pdGVtLm91dGVyV2lkdGgodHJ1ZSk7XG4gICAgICB0aGlzLnNwZWVkID0gdGhpcy5pdGVtLmRhdGEoJ3NwZWVkJyk7XG4gICAgICB0aGlzLnNpZGUgPSB0aGlzLml0ZW0uZGF0YSgnc2lkZScpO1xuICAgICAgdGhpcy5kaXNwbGFjZSA9IHRoaXMuaXRlbS5kYXRhKCdkaXNwbGFjZScpO1xuICAgICAgdGhpcy50aW1pbmcgPSB0aGlzLml0ZW0uZGF0YSgndGltaW5nJyk7XG4gICAgICB0aGlzLm1ldGhvZCA9IHRoaXMuaXRlbS5kYXRhKCdtZXRob2QnKTtcbiAgICAgIHRoaXMub25PcGVuQ2FsbGJhY2sgPSB0aGlzLml0ZW0uZGF0YSgnb25PcGVuJyk7XG4gICAgICB0aGlzLm9uQ2xvc2VDYWxsYmFjayA9IHRoaXMuaXRlbS5kYXRhKCdvbkNsb3NlJyk7XG4gICAgICB0aGlzLm9uT3BlbkVuZENhbGxiYWNrID0gdGhpcy5pdGVtLmRhdGEoJ29uT3BlbkVuZCcpO1xuICAgICAgdGhpcy5vbkNsb3NlRW5kQ2FsbGJhY2sgPSB0aGlzLml0ZW0uZGF0YSgnb25DbG9zZUVuZCcpO1xuICAgICAgdGhpcy5ib2R5ID0gJCQyKHRoaXMuaXRlbS5kYXRhKCdib2R5JykpO1xuICAgIH1cblxuICAgIGJhYmVsSGVscGVycy5jcmVhdGVDbGFzcyhNZW51LCBbe1xuICAgICAga2V5OiAnZ2V0QW5pbWF0aW9uJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBbmltYXRpb24oYWN0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgIHZhciBhbmltYXRpb24gPSB7fSxcbiAgICAgICAgICAgIHByb3AgPSB0aGlzLnNpZGU7XG5cbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ29wZW4nICYmIGVsZW1lbnQgPT09ICdib2R5Jykge1xuICAgICAgICAgIGFuaW1hdGlvbltwcm9wXSA9IHRoaXMubWVudVdpZHRoICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09ICdjbG9zZScgJiYgZWxlbWVudCA9PT0gJ21lbnUnKSB7XG4gICAgICAgICAgYW5pbWF0aW9uW3Byb3BdID0gJy0nICsgdGhpcy5tZW51V2lkdGggKyAncHgnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFuaW1hdGlvbltwcm9wXSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYW5pbWF0aW9uO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ3ByZXBhcmVCb2R5JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBwcmVwYXJlQm9keShhY3Rpb24pIHtcbiAgICAgICAgdmFyIHByb3AgPSBhY3Rpb24gPT09ICdvcGVuJyA/ICdoaWRkZW4nIDogJyc7XG5cbiAgICAgICAgLy8gUHJlcGFyZSBwYWdlIGlmIGNvbnRhaW5lciBpcyBib2R5XG4gICAgICAgIGlmICh0aGlzLmJvZHkuaXMoJ2JvZHknKSkge1xuICAgICAgICAgIHZhciAkaHRtbCA9ICQkMignaHRtbCcpLFxuICAgICAgICAgICAgICBzY3JvbGxUb3AgPSAkaHRtbC5zY3JvbGxUb3AoKTtcblxuICAgICAgICAgICRodG1sLmNzcygnb3ZlcmZsb3cteCcsIHByb3ApLnNjcm9sbFRvcChzY3JvbGxUb3ApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnb3BlbkJvZHknLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9wZW5Cb2R5KCkge1xuICAgICAgICBpZiAodGhpcy5kaXNwbGFjZSkge1xuICAgICAgICAgIHZhciB0cmFuc2l0aW9ucyA9IGhlbHBlci50cmFuc2l0aW9ucyxcbiAgICAgICAgICAgICAgJGJvZHkgPSB0aGlzLmJvZHk7XG5cbiAgICAgICAgICBpZiAodHJhbnNpdGlvbnMuc3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAkYm9keS5jc3ModHJhbnNpdGlvbnMucHJvcGVydHksIHRoaXMuc2lkZSArICcgJyArIHRoaXMuc3BlZWQgLyAxMDAwICsgJ3MgJyArIHRoaXMudGltaW5nKS5jc3ModGhpcy5zaWRlLCAwKS5jc3Moe1xuICAgICAgICAgICAgICB3aWR0aDogJGJvZHkud2lkdGgoKSxcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGJvZHkuY3NzKHRoaXMuc2lkZSwgdGhpcy5tZW51V2lkdGggKyAncHgnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGJvZHlBbmltYXRpb24gPSB0aGlzLmdldEFuaW1hdGlvbihvcGVuQWN0aW9uLCAnYm9keScpO1xuXG4gICAgICAgICAgICAkYm9keS5jc3Moe1xuICAgICAgICAgICAgICB3aWR0aDogJGJvZHkud2lkdGgoKSxcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgICAgICAgIH0pLmFuaW1hdGUoYm9keUFuaW1hdGlvbiwge1xuICAgICAgICAgICAgICBxdWV1ZTogZmFsc2UsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLnNwZWVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdvbkNsb3NlQm9keScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gb25DbG9zZUJvZHkoKSB7XG4gICAgICAgIHZhciB0cmFuc2l0aW9ucyA9IGhlbHBlci50cmFuc2l0aW9ucyxcbiAgICAgICAgICAgIHJlc2V0U3R5bGVzID0ge1xuICAgICAgICAgIHdpZHRoOiAnJyxcbiAgICAgICAgICBwb3NpdGlvbjogJycsXG4gICAgICAgICAgcmlnaHQ6ICcnLFxuICAgICAgICAgIGxlZnQ6ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRyYW5zaXRpb25zLnN1cHBvcnRlZCkge1xuICAgICAgICAgIHJlc2V0U3R5bGVzW3RyYW5zaXRpb25zLnByb3BlcnR5XSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ib2R5LmNzcyhyZXNldFN0eWxlcykudW5iaW5kKHRyYW5zaXRpb25FbmRFdmVudCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnY2xvc2VCb2R5JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjbG9zZUJvZHkoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzcGxhY2UpIHtcbiAgICAgICAgICBpZiAoaGVscGVyLnRyYW5zaXRpb25zLnN1cHBvcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNzcyh0aGlzLnNpZGUsIDApLm9uZSh0cmFuc2l0aW9uRW5kRXZlbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgX3RoaXMub25DbG9zZUJvZHkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgYm9keUFuaW1hdGlvbiA9IHRoaXMuZ2V0QW5pbWF0aW9uKGNsb3NlQWN0aW9uLCAnYm9keScpO1xuXG4gICAgICAgICAgICB0aGlzLmJvZHkuYW5pbWF0ZShib2R5QW5pbWF0aW9uLCB7XG4gICAgICAgICAgICAgIHF1ZXVlOiBmYWxzZSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuc3BlZWQsXG4gICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vbkNsb3NlQm9keSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICdtb3ZlQm9keScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gbW92ZUJvZHkoYWN0aW9uKSB7XG4gICAgICAgIGlmIChhY3Rpb24gPT09IG9wZW5BY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLm9wZW5Cb2R5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jbG9zZUJvZHkoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ29uT3Blbk1lbnUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uT3Blbk1lbnUoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLm5hbWU7XG5cbiAgICAgICAgc2lkclN0YXR1cy5tb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgc2lkclN0YXR1cy5vcGVuZWQgPSBuYW1lO1xuXG4gICAgICAgIHRoaXMuaXRlbS51bmJpbmQodHJhbnNpdGlvbkVuZEV2ZW50KTtcblxuICAgICAgICB0aGlzLmJvZHkucmVtb3ZlQ2xhc3MoYm9keUFuaW1hdGlvbkNsYXNzKS5hZGRDbGFzcyh0aGlzLm9wZW5DbGFzcyk7XG5cbiAgICAgICAgdGhpcy5vbk9wZW5FbmRDYWxsYmFjaygpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjYWxsYmFjayhuYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ29wZW5NZW51JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBvcGVuTWVudShjYWxsYmFjaykge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICB2YXIgJGl0ZW0gPSB0aGlzLml0ZW07XG5cbiAgICAgICAgaWYgKGhlbHBlci50cmFuc2l0aW9ucy5zdXBwb3J0ZWQpIHtcbiAgICAgICAgICAkaXRlbS5jc3ModGhpcy5zaWRlLCAwKS5vbmUodHJhbnNpdGlvbkVuZEV2ZW50LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpczIub25PcGVuTWVudShjYWxsYmFjayk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG1lbnVBbmltYXRpb24gPSB0aGlzLmdldEFuaW1hdGlvbihvcGVuQWN0aW9uLCAnbWVudScpO1xuXG4gICAgICAgICAgJGl0ZW0uY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJykuYW5pbWF0ZShtZW51QW5pbWF0aW9uLCB7XG4gICAgICAgICAgICBxdWV1ZTogZmFsc2UsXG4gICAgICAgICAgICBkdXJhdGlvbjogdGhpcy5zcGVlZCxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgICAgICAgICAgX3RoaXMyLm9uT3Blbk1lbnUoY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnb25DbG9zZU1lbnUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2xvc2VNZW51KGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuaXRlbS5jc3Moe1xuICAgICAgICAgIGxlZnQ6ICcnLFxuICAgICAgICAgIHJpZ2h0OiAnJ1xuICAgICAgICB9KS51bmJpbmQodHJhbnNpdGlvbkVuZEV2ZW50KTtcbiAgICAgICAgJCQyKCdodG1sJykuY3NzKCdvdmVyZmxvdy14JywgJycpO1xuXG4gICAgICAgIHNpZHJTdGF0dXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHNpZHJTdGF0dXMub3BlbmVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5ib2R5LnJlbW92ZUNsYXNzKGJvZHlBbmltYXRpb25DbGFzcykucmVtb3ZlQ2xhc3ModGhpcy5vcGVuQ2xhc3MpO1xuXG4gICAgICAgIHRoaXMub25DbG9zZUVuZENhbGxiYWNrKCk7XG5cbiAgICAgICAgLy8gQ2FsbGJhY2tcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNhbGxiYWNrKG5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnY2xvc2VNZW51JyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjbG9zZU1lbnUoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLml0ZW07XG5cbiAgICAgICAgaWYgKGhlbHBlci50cmFuc2l0aW9ucy5zdXBwb3J0ZWQpIHtcbiAgICAgICAgICBpdGVtLmNzcyh0aGlzLnNpZGUsICcnKS5vbmUodHJhbnNpdGlvbkVuZEV2ZW50LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpczMub25DbG9zZU1lbnUoY2FsbGJhY2spO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBtZW51QW5pbWF0aW9uID0gdGhpcy5nZXRBbmltYXRpb24oY2xvc2VBY3Rpb24sICdtZW51Jyk7XG5cbiAgICAgICAgICBpdGVtLmFuaW1hdGUobWVudUFuaW1hdGlvbiwge1xuICAgICAgICAgICAgcXVldWU6IGZhbHNlLFxuICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuc3BlZWQsXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgICAgICAgIF90aGlzMy5vbkNsb3NlTWVudSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnbW92ZU1lbnUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG1vdmVNZW51KGFjdGlvbiwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5ib2R5LmFkZENsYXNzKGJvZHlBbmltYXRpb25DbGFzcyk7XG5cbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gb3BlbkFjdGlvbikge1xuICAgICAgICAgIHRoaXMub3Blbk1lbnUoY2FsbGJhY2spO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2xvc2VNZW51KGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ21vdmUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG1vdmUoYWN0aW9uLCBjYWxsYmFjaykge1xuICAgICAgICAvLyBMb2NrIHNpZHJcbiAgICAgICAgc2lkclN0YXR1cy5tb3ZpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMucHJlcGFyZUJvZHkoYWN0aW9uKTtcbiAgICAgICAgdGhpcy5tb3ZlQm9keShhY3Rpb24pO1xuICAgICAgICB0aGlzLm1vdmVNZW51KGFjdGlvbiwgY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ29wZW4nLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9wZW4oY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgaXMgYWxyZWFkeSBvcGVuZWQgb3IgbW92aW5nXG4gICAgICAgIGlmIChzaWRyU3RhdHVzLm9wZW5lZCA9PT0gdGhpcy5uYW1lIHx8IHNpZHJTdGF0dXMubW92aW5nKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgYW5vdGhlciBtZW51IG9wZW5lZCBjbG9zZSBmaXJzdFxuICAgICAgICBpZiAoc2lkclN0YXR1cy5vcGVuZWQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgdmFyIGFscmVhZHlPcGVuZWRNZW51ID0gbmV3IE1lbnUoc2lkclN0YXR1cy5vcGVuZWQpO1xuXG4gICAgICAgICAgYWxyZWFkeU9wZW5lZE1lbnUuY2xvc2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXM0Lm9wZW4oY2FsbGJhY2spO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb3ZlKCdvcGVuJywgY2FsbGJhY2spO1xuXG4gICAgICAgIC8vIG9uT3BlbiBjYWxsYmFja1xuICAgICAgICB0aGlzLm9uT3BlbkNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAga2V5OiAnY2xvc2UnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNsb3NlKGNhbGxiYWNrKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIGlzIGFscmVhZHkgY2xvc2VkIG9yIG1vdmluZ1xuICAgICAgICBpZiAoc2lkclN0YXR1cy5vcGVuZWQgIT09IHRoaXMubmFtZSB8fCBzaWRyU3RhdHVzLm1vdmluZykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW92ZSgnY2xvc2UnLCBjYWxsYmFjayk7XG5cbiAgICAgICAgLy8gb25DbG9zZSBjYWxsYmFja1xuICAgICAgICB0aGlzLm9uQ2xvc2VDYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGtleTogJ3RvZ2dsZScsXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gdG9nZ2xlKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChzaWRyU3RhdHVzLm9wZW5lZCA9PT0gdGhpcy5uYW1lKSB7XG4gICAgICAgICAgdGhpcy5jbG9zZShjYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vcGVuKGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1dKTtcbiAgICByZXR1cm4gTWVudTtcbiAgfSgpO1xuXG4gIHZhciAkJDEgPSBqUXVlcnk7XG5cbiAgZnVuY3Rpb24gZXhlY3V0ZShhY3Rpb24sIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHNpZHIgPSBuZXcgTWVudShuYW1lKTtcblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlICdvcGVuJzpcbiAgICAgICAgc2lkci5vcGVuKGNhbGxiYWNrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjbG9zZSc6XG4gICAgICAgIHNpZHIuY2xvc2UoY2FsbGJhY2spO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvZ2dsZSc6XG4gICAgICAgIHNpZHIudG9nZ2xlKGNhbGxiYWNrKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAkJDEuZXJyb3IoJ01ldGhvZCAnICsgYWN0aW9uICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkuc2lkcicpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB2YXIgaTtcbiAgdmFyICQgPSBqUXVlcnk7XG4gIHZhciBwdWJsaWNNZXRob2RzID0gWydvcGVuJywgJ2Nsb3NlJywgJ3RvZ2dsZSddO1xuICB2YXIgbWV0aG9kTmFtZTtcbiAgdmFyIG1ldGhvZHMgPSB7fTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uIGdldE1ldGhvZChtZXRob2ROYW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgICAgLy8gQ2hlY2sgYXJndW1lbnRzXG4gICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBuYW1lO1xuICAgICAgICBuYW1lID0gJ3NpZHInO1xuICAgICAgfSBlbHNlIGlmICghbmFtZSkge1xuICAgICAgICBuYW1lID0gJ3NpZHInO1xuICAgICAgfVxuXG4gICAgICBleGVjdXRlKG1ldGhvZE5hbWUsIG5hbWUsIGNhbGxiYWNrKTtcbiAgICB9O1xuICB9O1xuICBmb3IgKGkgPSAwOyBpIDwgcHVibGljTWV0aG9kcy5sZW5ndGg7IGkrKykge1xuICAgIG1ldGhvZE5hbWUgPSBwdWJsaWNNZXRob2RzW2ldO1xuICAgIG1ldGhvZHNbbWV0aG9kTmFtZV0gPSBnZXRNZXRob2QobWV0aG9kTmFtZSk7XG4gIH1cblxuICBmdW5jdGlvbiBzaWRyKG1ldGhvZCkge1xuICAgIGlmIChtZXRob2QgPT09ICdzdGF0dXMnKSB7XG4gICAgICByZXR1cm4gc2lkclN0YXR1cztcbiAgICB9IGVsc2UgaWYgKG1ldGhvZHNbbWV0aG9kXSkge1xuICAgICAgcmV0dXJuIG1ldGhvZHNbbWV0aG9kXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIG1ldGhvZCA9PT0gJ3N0cmluZycgfHwgIW1ldGhvZCkge1xuICAgICAgcmV0dXJuIG1ldGhvZHMudG9nZ2xlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQuZXJyb3IoJ01ldGhvZCAnICsgbWV0aG9kICsgJyBkb2VzIG5vdCBleGlzdCBvbiBqUXVlcnkuc2lkcicpO1xuICAgIH1cbiAgfVxuXG4gIHZhciAkJDMgPSBqUXVlcnk7XG5cbiAgZnVuY3Rpb24gZmlsbENvbnRlbnQoJHNpZGVNZW51LCBzZXR0aW5ncykge1xuICAgIC8vIFRoZSBtZW51IGNvbnRlbnRcbiAgICBpZiAodHlwZW9mIHNldHRpbmdzLnNvdXJjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIG5ld0NvbnRlbnQgPSBzZXR0aW5ncy5zb3VyY2UobmFtZSk7XG5cbiAgICAgICRzaWRlTWVudS5odG1sKG5ld0NvbnRlbnQpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNldHRpbmdzLnNvdXJjZSA9PT0gJ3N0cmluZycgJiYgaGVscGVyLmlzVXJsKHNldHRpbmdzLnNvdXJjZSkpIHtcbiAgICAgICQkMy5nZXQoc2V0dGluZ3Muc291cmNlLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAkc2lkZU1lbnUuaHRtbChkYXRhKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNldHRpbmdzLnNvdXJjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhciBodG1sQ29udGVudCA9ICcnLFxuICAgICAgICAgIHNlbGVjdG9ycyA9IHNldHRpbmdzLnNvdXJjZS5zcGxpdCgnLCcpO1xuXG4gICAgICAkJDMuZWFjaChzZWxlY3RvcnMsIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuICAgICAgICBodG1sQ29udGVudCArPSAnPGRpdiBjbGFzcz1cInNpZHItaW5uZXJcIj4nICsgJCQzKGVsZW1lbnQpLmh0bWwoKSArICc8L2Rpdj4nO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFJlbmFtaW5nIGlkcyBhbmQgY2xhc3Nlc1xuICAgICAgaWYgKHNldHRpbmdzLnJlbmFtaW5nKSB7XG4gICAgICAgIHZhciAkaHRtbENvbnRlbnQgPSAkJDMoJzxkaXYgLz4nKS5odG1sKGh0bWxDb250ZW50KTtcblxuICAgICAgICAkaHRtbENvbnRlbnQuZmluZCgnKicpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgdmFyICRlbGVtZW50ID0gJCQzKGVsZW1lbnQpO1xuXG4gICAgICAgICAgaGVscGVyLmFkZFByZWZpeGVzKCRlbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGh0bWxDb250ZW50ID0gJGh0bWxDb250ZW50Lmh0bWwoKTtcbiAgICAgIH1cblxuICAgICAgJHNpZGVNZW51Lmh0bWwoaHRtbENvbnRlbnQpO1xuICAgIH0gZWxzZSBpZiAoc2V0dGluZ3Muc291cmNlICE9PSBudWxsKSB7XG4gICAgICAkJDMuZXJyb3IoJ0ludmFsaWQgU2lkciBTb3VyY2UnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJHNpZGVNZW51O1xuICB9XG5cbiAgZnVuY3Rpb24gZm5TaWRyKG9wdGlvbnMpIHtcbiAgICB2YXIgdHJhbnNpdGlvbnMgPSBoZWxwZXIudHJhbnNpdGlvbnMsXG4gICAgICAgIHNldHRpbmdzID0gJCQzLmV4dGVuZCh7XG4gICAgICBuYW1lOiAnc2lkcicsIC8vIE5hbWUgZm9yIHRoZSAnc2lkcidcbiAgICAgIHNwZWVkOiAyMDAsIC8vIEFjY2VwdHMgc3RhbmRhcmQgalF1ZXJ5IGVmZmVjdHMgc3BlZWRzIChpLmUuIGZhc3QsIG5vcm1hbCBvciBtaWxsaXNlY29uZHMpXG4gICAgICBzaWRlOiAnbGVmdCcsIC8vIEFjY2VwdHMgJ2xlZnQnIG9yICdyaWdodCdcbiAgICAgIHNvdXJjZTogbnVsbCwgLy8gT3ZlcnJpZGUgdGhlIHNvdXJjZSBvZiB0aGUgY29udGVudC5cbiAgICAgIHJlbmFtaW5nOiB0cnVlLCAvLyBUaGUgaWRzIGFuZCBjbGFzc2VzIHdpbGwgYmUgcHJlcGVuZGVkIHdpdGggYSBwcmVmaXggd2hlbiBsb2FkaW5nIGV4aXN0ZW50IGNvbnRlbnRcbiAgICAgIGJvZHk6ICdib2R5JywgLy8gUGFnZSBjb250YWluZXIgc2VsZWN0b3IsXG4gICAgICBkaXNwbGFjZTogdHJ1ZSwgLy8gRGlzcGxhY2UgdGhlIGJvZHkgY29udGVudCBvciBub3RcbiAgICAgIHRpbWluZzogJ2Vhc2UnLCAvLyBUaW1pbmcgZnVuY3Rpb24gZm9yIENTUyB0cmFuc2l0aW9uc1xuICAgICAgbWV0aG9kOiAndG9nZ2xlJywgLy8gVGhlIG1ldGhvZCB0byBjYWxsIHdoZW4gZWxlbWVudCBpcyBjbGlja2VkXG4gICAgICBiaW5kOiAndG91Y2hzdGFydCBjbGljaycsIC8vIFRoZSBldmVudChzKSB0byB0cmlnZ2VyIHRoZSBtZW51XG4gICAgICBvbk9wZW46IGZ1bmN0aW9uIG9uT3BlbigpIHt9LFxuICAgICAgLy8gQ2FsbGJhY2sgd2hlbiBzaWRyIHN0YXJ0IG9wZW5pbmdcbiAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uIG9uQ2xvc2UoKSB7fSxcbiAgICAgIC8vIENhbGxiYWNrIHdoZW4gc2lkciBzdGFydCBjbG9zaW5nXG4gICAgICBvbk9wZW5FbmQ6IGZ1bmN0aW9uIG9uT3BlbkVuZCgpIHt9LFxuICAgICAgLy8gQ2FsbGJhY2sgd2hlbiBzaWRyIGVuZCBvcGVuaW5nXG4gICAgICBvbkNsb3NlRW5kOiBmdW5jdGlvbiBvbkNsb3NlRW5kKCkge30gLy8gQ2FsbGJhY2sgd2hlbiBzaWRyIGVuZCBjbG9zaW5nXG5cbiAgICB9LCBvcHRpb25zKSxcbiAgICAgICAgbmFtZSA9IHNldHRpbmdzLm5hbWUsXG4gICAgICAgICRzaWRlTWVudSA9ICQkMygnIycgKyBuYW1lKTtcblxuICAgIC8vIElmIHRoZSBzaWRlIG1lbnUgZG8gbm90IGV4aXN0IGNyZWF0ZSBpdFxuICAgIGlmICgkc2lkZU1lbnUubGVuZ3RoID09PSAwKSB7XG4gICAgICAkc2lkZU1lbnUgPSAkJDMoJzxkaXYgLz4nKS5hdHRyKCdpZCcsIG5hbWUpLmFwcGVuZFRvKCQkMygnYm9keScpKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgdHJhbnNpdGlvbiB0byBtZW51IGlmIGFyZSBzdXBwb3J0ZWRcbiAgICBpZiAodHJhbnNpdGlvbnMuc3VwcG9ydGVkKSB7XG4gICAgICAkc2lkZU1lbnUuY3NzKHRyYW5zaXRpb25zLnByb3BlcnR5LCBzZXR0aW5ncy5zaWRlICsgJyAnICsgc2V0dGluZ3Muc3BlZWQgLyAxMDAwICsgJ3MgJyArIHNldHRpbmdzLnRpbWluZyk7XG4gICAgfVxuXG4gICAgLy8gQWRkaW5nIHN0eWxlcyBhbmQgb3B0aW9uc1xuICAgICRzaWRlTWVudS5hZGRDbGFzcygnc2lkcicpLmFkZENsYXNzKHNldHRpbmdzLnNpZGUpLmRhdGEoe1xuICAgICAgc3BlZWQ6IHNldHRpbmdzLnNwZWVkLFxuICAgICAgc2lkZTogc2V0dGluZ3Muc2lkZSxcbiAgICAgIGJvZHk6IHNldHRpbmdzLmJvZHksXG4gICAgICBkaXNwbGFjZTogc2V0dGluZ3MuZGlzcGxhY2UsXG4gICAgICB0aW1pbmc6IHNldHRpbmdzLnRpbWluZyxcbiAgICAgIG1ldGhvZDogc2V0dGluZ3MubWV0aG9kLFxuICAgICAgb25PcGVuOiBzZXR0aW5ncy5vbk9wZW4sXG4gICAgICBvbkNsb3NlOiBzZXR0aW5ncy5vbkNsb3NlLFxuICAgICAgb25PcGVuRW5kOiBzZXR0aW5ncy5vbk9wZW5FbmQsXG4gICAgICBvbkNsb3NlRW5kOiBzZXR0aW5ncy5vbkNsb3NlRW5kXG4gICAgfSk7XG5cbiAgICAkc2lkZU1lbnUgPSBmaWxsQ29udGVudCgkc2lkZU1lbnUsIHNldHRpbmdzKTtcblxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCQzKHRoaXMpLFxuICAgICAgICAgIGRhdGEgPSAkdGhpcy5kYXRhKCdzaWRyJyksXG4gICAgICAgICAgZmxhZyA9IGZhbHNlO1xuXG4gICAgICAvLyBJZiB0aGUgcGx1Z2luIGhhc24ndCBiZWVuIGluaXRpYWxpemVkIHlldFxuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIHNpZHJTdGF0dXMubW92aW5nID0gZmFsc2U7XG4gICAgICAgIHNpZHJTdGF0dXMub3BlbmVkID0gZmFsc2U7XG5cbiAgICAgICAgJHRoaXMuZGF0YSgnc2lkcicsIG5hbWUpO1xuXG4gICAgICAgICR0aGlzLmJpbmQoc2V0dGluZ3MuYmluZCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIGlmICghZmxhZykge1xuICAgICAgICAgICAgZmxhZyA9IHRydWU7XG4gICAgICAgICAgICBzaWRyKHNldHRpbmdzLm1ldGhvZCwgbmFtZSk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBmbGFnID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBqUXVlcnkuc2lkciA9IHNpZHI7XG4gIGpRdWVyeS5mbi5zaWRyID0gZm5TaWRyO1xuXG59KCkpOyIsIi8qKlxuICogc3RhY2t0YWJsZS5qc1xuICogQXV0aG9yICYgY29weXJpZ2h0IChjKSAyMDEyOiBKb2huIFBvbGFjZWtcbiAqIENhcmRUYWJsZSBieTogSnVzdGluIE1jTmFsbHkgKDIwMTUpXG4gKiBEdWFsIE1JVCAmIEdQTCBsaWNlbnNlXG4gKlxuICogUGFnZTogaHR0cDovL2pvaG5wb2xhY2VrLmdpdGh1Yi5jb20vc3RhY2t0YWJsZS5qc1xuICogUmVwbzogaHR0cHM6Ly9naXRodWIuY29tL2pvaG5wb2xhY2VrL3N0YWNrdGFibGUuanMvXG4gKlxuICogalF1ZXJ5IHBsdWdpbiBmb3Igc3RhY2tpbmcgdGFibGVzIG9uIHNtYWxsIHNjcmVlbnNcbiAqIFJlcXVpcmVzIGpRdWVyeSB2ZXJzaW9uIDEuNyBvciBhYm92ZVxuICpcbiAqL1xuOyhmdW5jdGlvbigkKSB7XG4gICQuZm4uY2FyZHRhYmxlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciAkdGFibGVzID0gdGhpcyxcbiAgICAgICAgZGVmYXVsdHMgPSB7aGVhZEluZGV4OjB9LFxuICAgICAgICBzZXR0aW5ncyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyksXG4gICAgICAgIGhlYWRJbmRleDtcblxuICAgIC8vIGNoZWNraW5nIHRoZSBcImhlYWRJbmRleFwiIG9wdGlvbiBwcmVzZW5jZS4uLiBvciBkZWZhdWx0cyBpdCB0byAwXG4gICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmhlYWRJbmRleClcbiAgICAgIGhlYWRJbmRleCA9IG9wdGlvbnMuaGVhZEluZGV4O1xuICAgIGVsc2VcbiAgICAgIGhlYWRJbmRleCA9IDA7XG5cbiAgICByZXR1cm4gJHRhYmxlcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyICR0YWJsZSA9ICQodGhpcyk7XG4gICAgICBpZiAoJHRhYmxlLmhhc0NsYXNzKCdzdGFja3RhYmxlJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIHRhYmxlX2NzcyA9ICQodGhpcykucHJvcCgnY2xhc3MnKTtcbiAgICAgIHZhciAkc3RhY2t0YWJsZSA9ICQoJzxkaXY+PC9kaXY+Jyk7XG4gICAgICBpZiAodHlwZW9mIHNldHRpbmdzLm15Q2xhc3MgIT09ICd1bmRlZmluZWQnKSAkc3RhY2t0YWJsZS5hZGRDbGFzcyhzZXR0aW5ncy5teUNsYXNzKTtcbiAgICAgIHZhciBtYXJrdXAgPSAnJztcbiAgICAgIHZhciAkY2FwdGlvbiwgJHRvcFJvdywgaGVhZE1hcmt1cCwgYm9keU1hcmt1cCwgdHJfY2xhc3M7XG5cbiAgICAgICR0YWJsZS5hZGRDbGFzcygnc3RhY2t0YWJsZSBsYXJnZS1vbmx5Jyk7XG5cbiAgICAgICRjYXB0aW9uID0gJHRhYmxlLmZpbmQoXCI+Y2FwdGlvblwiKS5jbG9uZSgpO1xuICAgICAgJHRvcFJvdyA9ICR0YWJsZS5maW5kKCc+dGhlYWQ+dHIsPnRib2R5PnRyLD50Zm9vdD50ciw+dHInKS5lcSgwKTtcblxuICAgICAgLy8gYXZvaWQgZHVwbGljYXRpb24gd2hlbiBwYWdpbmF0aW5nXG4gICAgICAkdGFibGUuc2libGluZ3MoKS5maWx0ZXIoJy5zbWFsbC1vbmx5JykucmVtb3ZlKCk7XG5cbiAgICAgIC8vIHVzaW5nIHJvd0luZGV4IGFuZCBjZWxsSW5kZXggaW4gb3JkZXIgdG8gcmVkdWNlIGFtYmlndWl0eVxuICAgICAgJHRhYmxlLmZpbmQoJz50Ym9keT50cicpLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgLy8gZGVjbGFyaW5nIGhlYWRNYXJrdXAgYW5kIGJvZHlNYXJrdXAsIHRvIGJlIHVzZWQgZm9yIHNlcGFyYXRlbHkgaGVhZCBhbmQgYm9keSBvZiBzaW5nbGUgcmVjb3Jkc1xuICAgICAgICBoZWFkTWFya3VwID0gJyc7XG4gICAgICAgIGJvZHlNYXJrdXAgPSAnJztcbiAgICAgICAgdHJfY2xhc3MgPSAkKHRoaXMpLnByb3AoJ2NsYXNzJyk7XG4gICAgICAgIC8vIGZvciB0aGUgZmlyc3Qgcm93LCBcImhlYWRJbmRleFwiIGNlbGwgaXMgdGhlIGhlYWQgb2YgdGhlIHRhYmxlXG4gICAgICAgIC8vIGZvciB0aGUgb3RoZXIgcm93cywgcHV0IHRoZSBcImhlYWRJbmRleFwiIGNlbGwgYXMgdGhlIGhlYWQgZm9yIHRoYXQgcm93XG4gICAgICAgIC8vIHRoZW4gaXRlcmF0ZSB0aHJvdWdoIHRoZSBrZXkvdmFsdWVzXG4gICAgICAgICQodGhpcykuZmluZCgnPnRkLD50aCcpLmVhY2goZnVuY3Rpb24oY2VsbEluZGV4KSB7XG4gICAgICAgICAgaWYgKCQodGhpcykuaHRtbCgpICE9PSAnJyl7XG4gICAgICAgICAgICBib2R5TWFya3VwICs9ICc8dHIgY2xhc3M9XCInICsgdHJfY2xhc3MgKydcIj4nO1xuICAgICAgICAgICAgaWYgKCR0b3BSb3cuZmluZCgnPnRkLD50aCcpLmVxKGNlbGxJbmRleCkuaHRtbCgpKXtcbiAgICAgICAgICAgICAgYm9keU1hcmt1cCArPSAnPHRkIGNsYXNzPVwic3Qta2V5XCI+JyskdG9wUm93LmZpbmQoJz50ZCw+dGgnKS5lcShjZWxsSW5kZXgpLmh0bWwoKSsnPC90ZD4nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYm9keU1hcmt1cCArPSAnPHRkIGNsYXNzPVwic3Qta2V5XCI+PC90ZD4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9keU1hcmt1cCArPSAnPHRkIGNsYXNzPVwic3QtdmFsICcrJCh0aGlzKS5wcm9wKCdjbGFzcycpICArJ1wiPicrJCh0aGlzKS5odG1sKCkrJzwvdGQ+JztcbiAgICAgICAgICAgIGJvZHlNYXJrdXAgKz0gJzwvdHI+JztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1hcmt1cCArPSAnPHRhYmxlIGNsYXNzPVwiICcrIHRhYmxlX2NzcyArJyBzdGFja3RhYmxlIHNtYWxsLW9ubHlcIj48dGJvZHk+JyArIGhlYWRNYXJrdXAgKyBib2R5TWFya3VwICsgJzwvdGJvZHk+PC90YWJsZT4nO1xuICAgICAgfSk7XG5cbiAgICAgICR0YWJsZS5maW5kKCc+dGZvb3Q+dHI+dGQnKS5lYWNoKGZ1bmN0aW9uKHJvd0luZGV4LHZhbHVlKSB7XG4gICAgICAgIGlmICgkLnRyaW0oJCh2YWx1ZSkudGV4dCgpKSAhPT0gJycpIHtcbiAgICAgICAgICBtYXJrdXAgKz0gJzx0YWJsZSBjbGFzcz1cIicrIHRhYmxlX2NzcyArICcgc3RhY2t0YWJsZSBzbWFsbC1vbmx5XCI+PHRib2R5Pjx0cj48dGQ+JyArICQodmFsdWUpLmh0bWwoKSArICc8L3RkPjwvdHI+PC90Ym9keT48L3RhYmxlPic7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAkc3RhY2t0YWJsZS5wcmVwZW5kKCRjYXB0aW9uKTtcbiAgICAgICRzdGFja3RhYmxlLmFwcGVuZCgkKG1hcmt1cCkpO1xuICAgICAgJHRhYmxlLmJlZm9yZSgkc3RhY2t0YWJsZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgJC5mbi5zdGFja3RhYmxlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciAkdGFibGVzID0gdGhpcyxcbiAgICAgICAgZGVmYXVsdHMgPSB7aGVhZEluZGV4OjAsZGlzcGxheUhlYWRlcjp0cnVlfSxcbiAgICAgICAgc2V0dGluZ3MgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpLFxuICAgICAgICBoZWFkSW5kZXg7XG5cbiAgICAvLyBjaGVja2luZyB0aGUgXCJoZWFkSW5kZXhcIiBvcHRpb24gcHJlc2VuY2UuLi4gb3IgZGVmYXVsdHMgaXQgdG8gMFxuICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5oZWFkSW5kZXgpXG4gICAgICBoZWFkSW5kZXggPSBvcHRpb25zLmhlYWRJbmRleDtcbiAgICBlbHNlXG4gICAgICBoZWFkSW5kZXggPSAwO1xuXG4gICAgcmV0dXJuICR0YWJsZXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0YWJsZV9jc3MgPSAkKHRoaXMpLnByb3AoJ2NsYXNzJyk7XG4gICAgICB2YXIgJHN0YWNrdGFibGUgPSAkKCc8dGFibGUgY2xhc3M9XCInKyB0YWJsZV9jc3MgKycgc3RhY2t0YWJsZSBzbWFsbC1vbmx5XCI+PHRib2R5PjwvdGJvZHk+PC90YWJsZT4nKTtcbiAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3MubXlDbGFzcyAhPT0gJ3VuZGVmaW5lZCcpICRzdGFja3RhYmxlLmFkZENsYXNzKHNldHRpbmdzLm15Q2xhc3MpO1xuICAgICAgdmFyIG1hcmt1cCA9ICcnO1xuICAgICAgdmFyICR0YWJsZSwgJGNhcHRpb24sICR0b3BSb3csIGhlYWRNYXJrdXAsIGJvZHlNYXJrdXAsIHRyX2NsYXNzLCBkaXNwbGF5SGVhZGVyO1xuXG4gICAgICAkdGFibGUgPSAkKHRoaXMpO1xuICAgICAgJHRhYmxlLmFkZENsYXNzKCdzdGFja3RhYmxlIGxhcmdlLW9ubHknKTtcbiAgICAgICRjYXB0aW9uID0gJHRhYmxlLmZpbmQoXCI+Y2FwdGlvblwiKS5jbG9uZSgpO1xuICAgICAgJHRvcFJvdyA9ICR0YWJsZS5maW5kKCc+dGhlYWQ+dHIsPnRib2R5PnRyLD50Zm9vdD50cicpLmVxKDApO1xuXG4gICAgICBkaXNwbGF5SGVhZGVyID0gJHRhYmxlLmRhdGEoJ2Rpc3BsYXktaGVhZGVyJykgPT09IHVuZGVmaW5lZCA/IHNldHRpbmdzLmRpc3BsYXlIZWFkZXIgOiAkdGFibGUuZGF0YSgnZGlzcGxheS1oZWFkZXInKTtcblxuICAgICAgLy8gdXNpbmcgcm93SW5kZXggYW5kIGNlbGxJbmRleCBpbiBvcmRlciB0byByZWR1Y2UgYW1iaWd1aXR5XG4gICAgICAkdGFibGUuZmluZCgnPnRib2R5PnRyLCA+dGhlYWQ+dHInKS5lYWNoKGZ1bmN0aW9uKHJvd0luZGV4KSB7XG5cbiAgICAgICAgLy8gZGVjbGFyaW5nIGhlYWRNYXJrdXAgYW5kIGJvZHlNYXJrdXAsIHRvIGJlIHVzZWQgZm9yIHNlcGFyYXRlbHkgaGVhZCBhbmQgYm9keSBvZiBzaW5nbGUgcmVjb3Jkc1xuICAgICAgICBoZWFkTWFya3VwID0gJyc7XG4gICAgICAgIGJvZHlNYXJrdXAgPSAnJztcbiAgICAgICAgdHJfY2xhc3MgPSAkKHRoaXMpLnByb3AoJ2NsYXNzJyk7XG5cbiAgICAgICAgLy8gZm9yIHRoZSBmaXJzdCByb3csIFwiaGVhZEluZGV4XCIgY2VsbCBpcyB0aGUgaGVhZCBvZiB0aGUgdGFibGVcbiAgICAgICAgaWYgKHJvd0luZGV4ID09PSAwKSB7XG4gICAgICAgICAgLy8gdGhlIG1haW4gaGVhZGluZyBnb2VzIGludG8gdGhlIG1hcmt1cCB2YXJpYWJsZVxuICAgICAgICAgIGlmIChkaXNwbGF5SGVhZGVyKSB7XG4gICAgICAgICAgICBtYXJrdXAgKz0gJzx0ciBjbGFzcz1cIiAnK3RyX2NsYXNzICsnIFwiPjx0aCBjbGFzcz1cInN0LWhlYWQtcm93IHN0LWhlYWQtcm93LW1haW5cIiBjb2xzcGFuPVwiMlwiPicrJCh0aGlzKS5maW5kKCc+dGgsPnRkJykuZXEoaGVhZEluZGV4KS5odG1sKCkrJzwvdGg+PC90cj4nO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBmb3IgdGhlIG90aGVyIHJvd3MsIHB1dCB0aGUgXCJoZWFkSW5kZXhcIiBjZWxsIGFzIHRoZSBoZWFkIGZvciB0aGF0IHJvd1xuICAgICAgICAgIC8vIHRoZW4gaXRlcmF0ZSB0aHJvdWdoIHRoZSBrZXkvdmFsdWVzXG4gICAgICAgICAgJCh0aGlzKS5maW5kKCc+dGQsPnRoJykuZWFjaChmdW5jdGlvbihjZWxsSW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChjZWxsSW5kZXggPT09IGhlYWRJbmRleCkge1xuICAgICAgICAgICAgICBoZWFkTWFya3VwID0gJzx0ciBjbGFzcz1cIicrIHRyX2NsYXNzKydcIj48dGggY2xhc3M9XCJzdC1oZWFkLXJvd1wiIGNvbHNwYW49XCIyXCI+JyskKHRoaXMpLmh0bWwoKSsnPC90aD48L3RyPic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5odG1sKCkgIT09ICcnKXtcbiAgICAgICAgICAgICAgICBib2R5TWFya3VwICs9ICc8dHIgY2xhc3M9XCInICsgdHJfY2xhc3MgKydcIj4nO1xuICAgICAgICAgICAgICAgIGlmICgkdG9wUm93LmZpbmQoJz50ZCw+dGgnKS5lcShjZWxsSW5kZXgpLmh0bWwoKSl7XG4gICAgICAgICAgICAgICAgICBib2R5TWFya3VwICs9ICc8dGQgY2xhc3M9XCJzdC1rZXlcIj4nKyR0b3BSb3cuZmluZCgnPnRkLD50aCcpLmVxKGNlbGxJbmRleCkuaHRtbCgpKyc8L3RkPic7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGJvZHlNYXJrdXAgKz0gJzx0ZCBjbGFzcz1cInN0LWtleVwiPjwvdGQ+JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYm9keU1hcmt1cCArPSAnPHRkIGNsYXNzPVwic3QtdmFsICcrJCh0aGlzKS5wcm9wKCdjbGFzcycpICArJ1wiPicrJCh0aGlzKS5odG1sKCkrJzwvdGQ+JztcbiAgICAgICAgICAgICAgICBib2R5TWFya3VwICs9ICc8L3RyPic7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIG1hcmt1cCArPSBoZWFkTWFya3VwICsgYm9keU1hcmt1cDtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICRzdGFja3RhYmxlLnByZXBlbmQoJGNhcHRpb24pO1xuICAgICAgJHN0YWNrdGFibGUuYXBwZW5kKCQobWFya3VwKSk7XG4gICAgICAkdGFibGUuYmVmb3JlKCRzdGFja3RhYmxlKTtcbiAgICB9KTtcbiAgfTtcblxuICQuZm4uc3RhY2tjb2x1bW5zID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciAkdGFibGVzID0gdGhpcyxcbiAgICAgICAgZGVmYXVsdHMgPSB7fSxcbiAgICAgICAgc2V0dGluZ3MgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuICR0YWJsZXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciAkdGFibGUgPSAkKHRoaXMpO1xuICAgICAgdmFyICRjYXB0aW9uID0gJHRhYmxlLmZpbmQoXCI+Y2FwdGlvblwiKS5jbG9uZSgpO1xuICAgICAgdmFyIG51bV9jb2xzID0gJHRhYmxlLmZpbmQoJz50aGVhZD50ciw+dGJvZHk+dHIsPnRmb290PnRyJykuZXEoMCkuZmluZCgnPnRkLD50aCcpLmxlbmd0aDsgLy9maXJzdCB0YWJsZSA8dHI+IG11c3Qgbm90IGNvbnRhaW4gY29sc3BhbnMsIG9yIGFkZCBzdW0oY29sc3Bhbi0xKSBoZXJlLlxuICAgICAgaWYobnVtX2NvbHM8MykgLy9zdGFja2NvbHVtbnMgaGFzIG5vIGVmZmVjdCBvbiB0YWJsZXMgd2l0aCBsZXNzIHRoYW4gMyBjb2x1bW5zXG4gICAgICAgIHJldHVybjtcblxuICAgICAgdmFyICRzdGFja2NvbHVtbnMgPSAkKCc8dGFibGUgY2xhc3M9XCJzdGFja3RhYmxlIHNtYWxsLW9ubHlcIj48L3RhYmxlPicpO1xuICAgICAgaWYgKHR5cGVvZiBzZXR0aW5ncy5teUNsYXNzICE9PSAndW5kZWZpbmVkJykgJHN0YWNrY29sdW1ucy5hZGRDbGFzcyhzZXR0aW5ncy5teUNsYXNzKTtcbiAgICAgICR0YWJsZS5hZGRDbGFzcygnc3RhY2t0YWJsZSBsYXJnZS1vbmx5Jyk7XG4gICAgICB2YXIgdGIgPSAkKCc8dGJvZHk+PC90Ym9keT4nKTtcbiAgICAgIHZhciBjb2xfaSA9IDE7IC8vY29sIGluZGV4IHN0YXJ0cyBhdCAwIC0+IHN0YXJ0IGNvcHkgYXQgc2Vjb25kIGNvbHVtbi5cblxuICAgICAgd2hpbGUgKGNvbF9pIDwgbnVtX2NvbHMpIHtcbiAgICAgICAgJHRhYmxlLmZpbmQoJz50aGVhZD50ciw+dGJvZHk+dHIsPnRmb290PnRyJykuZWFjaChmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgIHZhciB0ZW0gPSAkKCc8dHI+PC90cj4nKTsgLy8gdG9kbyBvcHQuIGNvcHkgc3R5bGVzIG9mICR0aGlzOyB0b2RvIGNoZWNrIGlmIHBhcmVudCBpcyB0aGVhZCBvciB0Zm9vdCB0byBoYW5kbGUgYWNjb3JkaW5nbHlcbiAgICAgICAgICBpZihpbmRleCA9PT0gMCkgdGVtLmFkZENsYXNzKFwic3QtaGVhZC1yb3cgc3QtaGVhZC1yb3ctbWFpblwiKTtcbiAgICAgICAgICB2YXIgZmlyc3QgPSAkKHRoaXMpLmZpbmQoJz50ZCw+dGgnKS5lcSgwKS5jbG9uZSgpLmFkZENsYXNzKFwic3Qta2V5XCIpO1xuICAgICAgICAgIHZhciB0YXJnZXQgPSBjb2xfaTtcbiAgICAgICAgICAvLyBpZiBjb2xzcGFuIGFwcGx5LCByZWNvbXB1dGUgdGFyZ2V0IGZvciBzZWNvbmQgY2VsbC5cbiAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKFwiKltjb2xzcGFuXVwiKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBpID0wO1xuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCc+dGQsPnRoJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgY3MgPSAkKHRoaXMpLmF0dHIoXCJjb2xzcGFuXCIpO1xuICAgICAgICAgICAgICAgIGlmIChjcykge1xuICAgICAgICAgICAgICAgICAgY3MgPSBwYXJzZUludChjcywgMTApO1xuICAgICAgICAgICAgICAgICAgdGFyZ2V0IC09IGNzLTE7XG4gICAgICAgICAgICAgICAgICBpZiAoKGkrY3MpID4gKGNvbF9pKSkgLy9vdXQgb2YgY3VycmVudCBib3VuZHNcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ICs9IGkgKyBjcyAtIGNvbF9pIC0xO1xuICAgICAgICAgICAgICAgICAgaSArPSBjcztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpID4gY29sX2kpXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vdGFyZ2V0IGlzIHNldDsgYnJlYWsuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHNlY29uZCA9ICQodGhpcykuZmluZCgnPnRkLD50aCcpLmVxKHRhcmdldCkuY2xvbmUoKS5hZGRDbGFzcyhcInN0LXZhbFwiKS5yZW1vdmVBdHRyKFwiY29sc3BhblwiKTtcbiAgICAgICAgICB0ZW0uYXBwZW5kKGZpcnN0LCBzZWNvbmQpO1xuICAgICAgICAgIHRiLmFwcGVuZCh0ZW0pO1xuICAgICAgICB9KTtcbiAgICAgICAgKytjb2xfaTtcbiAgICAgIH1cblxuICAgICAgJHN0YWNrY29sdW1ucy5hcHBlbmQoJCh0YikpO1xuICAgICAgJHN0YWNrY29sdW1ucy5wcmVwZW5kKCRjYXB0aW9uKTtcbiAgICAgICR0YWJsZS5iZWZvcmUoJHN0YWNrY29sdW1ucyk7XG4gICAgfSk7XG4gIH07XG5cbn0oalF1ZXJ5KSk7XG4iLCIvKiEgTGl0eSAtIHYyLjQuMSAtIDIwMjAtMDQtMjZcbiogaHR0cDovL3NvcmdhbGxhLmNvbS9saXR5L1xuKiBDb3B5cmlnaHQgKGMpIDIwMTUtMjAyMCBKYW4gU29yZ2FsbGE7IExpY2Vuc2VkIE1JVCAqL1xuKGZ1bmN0aW9uKHdpbmRvdywgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZ1bmN0aW9uKCQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWN0b3J5KHdpbmRvdywgJCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnkod2luZG93LCByZXF1aXJlKCdqcXVlcnknKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmxpdHkgPSBmYWN0b3J5KHdpbmRvdywgd2luZG93LmpRdWVyeSB8fCB3aW5kb3cuWmVwdG8pO1xuICAgIH1cbn0odHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHRoaXMsIGZ1bmN0aW9uKHdpbmRvdywgJCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcblxuICAgIHZhciBfd2luID0gJCh3aW5kb3cpO1xuICAgIHZhciBfZGVmZXJyZWQgPSAkLkRlZmVycmVkO1xuICAgIHZhciBfaHRtbCA9ICQoJ2h0bWwnKTtcbiAgICB2YXIgX2luc3RhbmNlcyA9IFtdO1xuXG4gICAgdmFyIF9hdHRyQXJpYUhpZGRlbiA9ICdhcmlhLWhpZGRlbic7XG4gICAgdmFyIF9kYXRhQXJpYUhpZGRlbiA9ICdsaXR5LScgKyBfYXR0ckFyaWFIaWRkZW47XG5cbiAgICB2YXIgX2ZvY3VzYWJsZUVsZW1lbnRzU2VsZWN0b3IgPSAnYVtocmVmXSxhcmVhW2hyZWZdLGlucHV0Om5vdChbZGlzYWJsZWRdKSxzZWxlY3Q6bm90KFtkaXNhYmxlZF0pLHRleHRhcmVhOm5vdChbZGlzYWJsZWRdKSxidXR0b246bm90KFtkaXNhYmxlZF0pLGlmcmFtZSxvYmplY3QsZW1iZWQsW2NvbnRlbnRlZGl0YWJsZV0sW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pJztcblxuICAgIHZhciBfZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgIGVzYzogdHJ1ZSxcbiAgICAgICAgaGFuZGxlcjogbnVsbCxcbiAgICAgICAgaGFuZGxlcnM6IHtcbiAgICAgICAgICAgIGltYWdlOiBpbWFnZUhhbmRsZXIsXG4gICAgICAgICAgICBpbmxpbmU6IGlubGluZUhhbmRsZXIsXG4gICAgICAgICAgICB5b3V0dWJlOiB5b3V0dWJlSGFuZGxlcixcbiAgICAgICAgICAgIHZpbWVvOiB2aW1lb0hhbmRsZXIsXG4gICAgICAgICAgICBnb29nbGVtYXBzOiBnb29nbGVtYXBzSGFuZGxlcixcbiAgICAgICAgICAgIGZhY2Vib29rdmlkZW86IGZhY2Vib29rdmlkZW9IYW5kbGVyLFxuICAgICAgICAgICAgaWZyYW1lOiBpZnJhbWVIYW5kbGVyXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cImxpdHlcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbD1cIkRpYWxvZyBXaW5kb3cgKFByZXNzIGVzY2FwZSB0byBjbG9zZSlcIiB0YWJpbmRleD1cIi0xXCI+PGRpdiBjbGFzcz1cImxpdHktd3JhcFwiIGRhdGEtbGl0eS1jbG9zZSByb2xlPVwiZG9jdW1lbnRcIj48ZGl2IGNsYXNzPVwibGl0eS1sb2FkZXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5Mb2FkaW5nLi4uPC9kaXY+PGRpdiBjbGFzcz1cImxpdHktY29udGFpbmVyXCI+PGRpdiBjbGFzcz1cImxpdHktY29udGVudFwiPjwvZGl2PjxidXR0b24gY2xhc3M9XCJsaXR5LWNsb3NlXCIgdHlwZT1cImJ1dHRvblwiIGFyaWEtbGFiZWw9XCJDbG9zZSAoUHJlc3MgZXNjYXBlIHRvIGNsb3NlKVwiIGRhdGEtbGl0eS1jbG9zZT4mdGltZXM7PC9idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+J1xuICAgIH07XG5cbiAgICB2YXIgX2ltYWdlUmVnZXhwID0gLyheZGF0YTppbWFnZVxcLyl8KFxcLihwbmd8anBlP2d8Z2lmfHN2Z3x3ZWJwfGJtcHxpY298dGlmZj8pKFxcP1xcUyopPyQpL2k7XG4gICAgdmFyIF95b3V0dWJlUmVnZXggPSAvKHlvdXR1YmUoLW5vY29va2llKT9cXC5jb218eW91dHVcXC5iZSlcXC8od2F0Y2hcXD92PXx2XFwvfHVcXC98ZW1iZWRcXC8/KT8oW1xcdy1dezExfSkoLiopPy9pO1xuICAgIHZhciBfdmltZW9SZWdleCA9ICAvKHZpbWVvKHBybyk/LmNvbSlcXC8oPzpbXlxcZF0rKT8oXFxkKylcXD8/KC4qKT8kLztcbiAgICB2YXIgX2dvb2dsZW1hcHNSZWdleCA9IC8oKG1hcHN8d3d3KVxcLik/Z29vZ2xlXFwuKFteXFwvXFw/XSspXFwvPygobWFwc1xcLz8pP1xcPykoLiopL2k7XG4gICAgdmFyIF9mYWNlYm9va3ZpZGVvUmVnZXggPSAvKGZhY2Vib29rXFwuY29tKVxcLyhbYS16MC05Xy1dKilcXC92aWRlb3NcXC8oWzAtOV0qKSguKik/JC9pO1xuXG4gICAgdmFyIF90cmFuc2l0aW9uRW5kRXZlbnQgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHZhciB0cmFuc0VuZEV2ZW50TmFtZXMgPSB7XG4gICAgICAgICAgICBXZWJraXRUcmFuc2l0aW9uOiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gICAgICAgICAgICBNb3pUcmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICAgICAgICBPVHJhbnNpdGlvbjogJ29UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdHJhbnNFbmRFdmVudE5hbWVzKSB7XG4gICAgICAgICAgICBpZiAoZWwuc3R5bGVbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc0VuZEV2ZW50TmFtZXNbbmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSkoKTtcblxuICAgIGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQoZWxlbWVudCkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBfZGVmZXJyZWQoKTtcblxuICAgICAgICBpZiAoIV90cmFuc2l0aW9uRW5kRXZlbnQgfHwgIWVsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50Lm9uZShfdHJhbnNpdGlvbkVuZEV2ZW50LCBkZWZlcnJlZC5yZXNvbHZlKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZGVmZXJyZWQucmVzb2x2ZSwgNTAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0dGluZ3MoY3VyclNldHRpbmdzLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gJC5leHRlbmQoe30sIGN1cnJTZXR0aW5ncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBjdXJyU2V0dGluZ3Nba2V5XSA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICAgICAgICAgIDogY3VyclNldHRpbmdzW2tleV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnJTZXR0aW5nc1trZXldID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkLmV4dGVuZChjdXJyU2V0dGluZ3MsIGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXJzZVF1ZXJ5UGFyYW1zKHBhcmFtcykge1xuICAgICAgICB2YXIgcGFpcnMgPSBkZWNvZGVVUkkocGFyYW1zLnNwbGl0KCcjJylbMF0pLnNwbGl0KCcmJyk7XG4gICAgICAgIHZhciBvYmogPSB7fSwgcDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbiA9IHBhaXJzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgaWYgKCFwYWlyc1tpXSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwID0gcGFpcnNbaV0uc3BsaXQoJz0nKTtcbiAgICAgICAgICAgIG9ialtwWzBdXSA9IHBbMV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZFF1ZXJ5UGFyYW1zKHVybCwgcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB1cmwgKyAodXJsLmluZGV4T2YoJz8nKSA+IC0xID8gJyYnIDogJz8nKSArICQucGFyYW0ocGFyYW1zKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2Zlckhhc2gob3JpZ2luYWxVcmwsIG5ld1VybCkge1xuICAgICAgICB2YXIgcG9zID0gb3JpZ2luYWxVcmwuaW5kZXhPZignIycpO1xuXG4gICAgICAgIGlmICgtMSA9PT0gcG9zKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3VXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvcyA+IDApIHtcbiAgICAgICAgICAgIG9yaWdpbmFsVXJsID0gb3JpZ2luYWxVcmwuc3Vic3RyKHBvcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3VXJsICsgb3JpZ2luYWxVcmw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXJyb3IobXNnKSB7XG4gICAgICAgIHJldHVybiAkKCc8c3BhbiBjbGFzcz1cImxpdHktZXJyb3JcIj48L3NwYW4+JykuYXBwZW5kKG1zZyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW1hZ2VIYW5kbGVyKHRhcmdldCwgaW5zdGFuY2UpIHtcbiAgICAgICAgdmFyIGRlc2MgPSAoaW5zdGFuY2Uub3BlbmVyKCkgJiYgaW5zdGFuY2Uub3BlbmVyKCkuZGF0YSgnbGl0eS1kZXNjJykpIHx8ICdJbWFnZSB3aXRoIG5vIGRlc2NyaXB0aW9uJztcbiAgICAgICAgdmFyIGltZyA9ICQoJzxpbWcgc3JjPVwiJyArIHRhcmdldCArICdcIiBhbHQ9XCInICsgZGVzYyArICdcIi8+Jyk7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IF9kZWZlcnJlZCgpO1xuICAgICAgICB2YXIgZmFpbGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXJyb3IoJ0ZhaWxlZCBsb2FkaW5nIGltYWdlJykpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGltZ1xuICAgICAgICAgICAgLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmF0dXJhbFdpZHRoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWlsZWQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGltZyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdlcnJvcicsIGZhaWxlZClcbiAgICAgICAgO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfVxuXG4gICAgaW1hZ2VIYW5kbGVyLnRlc3QgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIF9pbWFnZVJlZ2V4cC50ZXN0KHRhcmdldCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGlubGluZUhhbmRsZXIodGFyZ2V0LCBpbnN0YW5jZSkge1xuICAgICAgICB2YXIgZWwsIHBsYWNlaG9sZGVyLCBoYXNIaWRlQ2xhc3M7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGVsID0gJCh0YXJnZXQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWVsLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcGxhY2Vob2xkZXIgPSAkKCc8aSBzdHlsZT1cImRpc3BsYXk6bm9uZSAhaW1wb3J0YW50XCI+PC9pPicpO1xuICAgICAgICBoYXNIaWRlQ2xhc3MgPSBlbC5oYXNDbGFzcygnbGl0eS1oaWRlJyk7XG5cbiAgICAgICAgaW5zdGFuY2VcbiAgICAgICAgICAgIC5lbGVtZW50KClcbiAgICAgICAgICAgIC5vbmUoJ2xpdHk6cmVtb3ZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgICAgICAgLmJlZm9yZShlbClcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhhc0hpZGVDbGFzcyAmJiAhZWwuY2xvc2VzdCgnLmxpdHktY29udGVudCcpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBlbC5hZGRDbGFzcygnbGl0eS1oaWRlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgO1xuXG4gICAgICAgIHJldHVybiBlbFxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdsaXR5LWhpZGUnKVxuICAgICAgICAgICAgLmFmdGVyKHBsYWNlaG9sZGVyKVxuICAgICAgICA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24geW91dHViZUhhbmRsZXIodGFyZ2V0KSB7XG4gICAgICAgIHZhciBtYXRjaGVzID0gX3lvdXR1YmVSZWdleC5leGVjKHRhcmdldCk7XG5cbiAgICAgICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaWZyYW1lSGFuZGxlcihcbiAgICAgICAgICAgIHRyYW5zZmVySGFzaChcbiAgICAgICAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgICAgICAgYXBwZW5kUXVlcnlQYXJhbXMoXG4gICAgICAgICAgICAgICAgICAgICdodHRwczovL3d3dy55b3V0dWJlJyArIChtYXRjaGVzWzJdIHx8ICcnKSArICcuY29tL2VtYmVkLycgKyBtYXRjaGVzWzRdLFxuICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZChcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogMVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlUXVlcnlQYXJhbXMobWF0Y2hlc1s1XSB8fCAnJylcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2aW1lb0hhbmRsZXIodGFyZ2V0KSB7XG4gICAgICAgIHZhciBtYXRjaGVzID0gX3ZpbWVvUmVnZXguZXhlYyh0YXJnZXQpO1xuXG4gICAgICAgIGlmICghbWF0Y2hlcykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlmcmFtZUhhbmRsZXIoXG4gICAgICAgICAgICB0cmFuc2Zlckhhc2goXG4gICAgICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgICAgIGFwcGVuZFF1ZXJ5UGFyYW1zKFxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9wbGF5ZXIudmltZW8uY29tL3ZpZGVvLycgKyBtYXRjaGVzWzNdLFxuICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZChcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogMVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlUXVlcnlQYXJhbXMobWF0Y2hlc1s0XSB8fCAnJylcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmYWNlYm9va3ZpZGVvSGFuZGxlcih0YXJnZXQpIHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBfZmFjZWJvb2t2aWRlb1JlZ2V4LmV4ZWModGFyZ2V0KTtcblxuICAgICAgICBpZiAoIW1hdGNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgwICE9PSB0YXJnZXQuaW5kZXhPZignaHR0cCcpKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSAnaHR0cHM6JyArIHRhcmdldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpZnJhbWVIYW5kbGVyKFxuICAgICAgICAgICAgdHJhbnNmZXJIYXNoKFxuICAgICAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgICAgICBhcHBlbmRRdWVyeVBhcmFtcyhcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9wbHVnaW5zL3ZpZGVvLnBocD9ocmVmPScgKyB0YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VRdWVyeVBhcmFtcyhtYXRjaGVzWzRdIHx8ICcnKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdvb2dsZW1hcHNIYW5kbGVyKHRhcmdldCkge1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IF9nb29nbGVtYXBzUmVnZXguZXhlYyh0YXJnZXQpO1xuXG4gICAgICAgIGlmICghbWF0Y2hlcykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlmcmFtZUhhbmRsZXIoXG4gICAgICAgICAgICB0cmFuc2Zlckhhc2goXG4gICAgICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgICAgIGFwcGVuZFF1ZXJ5UGFyYW1zKFxuICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly93d3cuZ29vZ2xlLicgKyBtYXRjaGVzWzNdICsgJy9tYXBzPycgKyBtYXRjaGVzWzZdLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQ6IG1hdGNoZXNbNl0uaW5kZXhPZignbGF5ZXI9YycpID4gMCA/ICdzdmVtYmVkJyA6ICdlbWJlZCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpZnJhbWVIYW5kbGVyKHRhcmdldCkge1xuICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJsaXR5LWlmcmFtZS1jb250YWluZXJcIj48aWZyYW1lIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93ZnVsbHNjcmVlbiBhbGxvdz1cImF1dG9wbGF5OyBmdWxsc2NyZWVuXCIgc3JjPVwiJyArIHRhcmdldCArICdcIi8+PC9kaXY+JztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3aW5IZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgICAgICAgICA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICAgICAgICAgIDogTWF0aC5yb3VuZChfd2luLmhlaWdodCgpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBrZXlkb3duKGUpIHtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBjdXJyZW50SW5zdGFuY2UoKTtcblxuICAgICAgICBpZiAoIWN1cnJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVTQyBrZXlcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcgJiYgISFjdXJyZW50Lm9wdGlvbnMoJ2VzYycpKSB7XG4gICAgICAgICAgICBjdXJyZW50LmNsb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUQUIga2V5XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDkpIHtcbiAgICAgICAgICAgIGhhbmRsZVRhYktleShlLCBjdXJyZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVRhYktleShlLCBpbnN0YW5jZSkge1xuICAgICAgICB2YXIgZm9jdXNhYmxlRWxlbWVudHMgPSBpbnN0YW5jZS5lbGVtZW50KCkuZmluZChfZm9jdXNhYmxlRWxlbWVudHNTZWxlY3Rvcik7XG4gICAgICAgIHZhciBmb2N1c2VkSW5kZXggPSBmb2N1c2FibGVFbGVtZW50cy5pbmRleChkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcblxuICAgICAgICBpZiAoZS5zaGlmdEtleSAmJiBmb2N1c2VkSW5kZXggPD0gMCkge1xuICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHMuZ2V0KGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDEpLmZvY3VzKCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWUuc2hpZnRLZXkgJiYgZm9jdXNlZEluZGV4ID09PSBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50cy5nZXQoMCkuZm9jdXMoKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2l6ZSgpIHtcbiAgICAgICAgJC5lYWNoKF9pbnN0YW5jZXMsIGZ1bmN0aW9uKGksIGluc3RhbmNlKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS5yZXNpemUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJJbnN0YW5jZShpbnN0YW5jZVRvUmVnaXN0ZXIpIHtcbiAgICAgICAgaWYgKDEgPT09IF9pbnN0YW5jZXMudW5zaGlmdChpbnN0YW5jZVRvUmVnaXN0ZXIpKSB7XG4gICAgICAgICAgICBfaHRtbC5hZGRDbGFzcygnbGl0eS1hY3RpdmUnKTtcblxuICAgICAgICAgICAgX3dpblxuICAgICAgICAgICAgICAgIC5vbih7XG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZTogcmVzaXplLFxuICAgICAgICAgICAgICAgICAgICBrZXlkb3duOiBrZXlkb3duXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJ2JvZHkgPiAqJykubm90KGluc3RhbmNlVG9SZWdpc3Rlci5lbGVtZW50KCkpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2xpdHktaGlkZGVuJylcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBlbCA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICBpZiAodW5kZWZpbmVkICE9PSBlbC5kYXRhKF9kYXRhQXJpYUhpZGRlbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsLmRhdGEoX2RhdGFBcmlhSGlkZGVuLCBlbC5hdHRyKF9hdHRyQXJpYUhpZGRlbikgfHwgbnVsbCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoX2F0dHJBcmlhSGlkZGVuLCAndHJ1ZScpXG4gICAgICAgIDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVJbnN0YW5jZShpbnN0YW5jZVRvUmVtb3ZlKSB7XG4gICAgICAgIHZhciBzaG93O1xuXG4gICAgICAgIGluc3RhbmNlVG9SZW1vdmVcbiAgICAgICAgICAgIC5lbGVtZW50KClcbiAgICAgICAgICAgIC5hdHRyKF9hdHRyQXJpYUhpZGRlbiwgJ3RydWUnKVxuICAgICAgICA7XG5cbiAgICAgICAgaWYgKDEgPT09IF9pbnN0YW5jZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBfaHRtbC5yZW1vdmVDbGFzcygnbGl0eS1hY3RpdmUnKTtcblxuICAgICAgICAgICAgX3dpblxuICAgICAgICAgICAgICAgIC5vZmYoe1xuICAgICAgICAgICAgICAgICAgICByZXNpemU6IHJlc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAga2V5ZG93bjoga2V5ZG93blxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA7XG4gICAgICAgIH1cblxuICAgICAgICBfaW5zdGFuY2VzID0gJC5ncmVwKF9pbnN0YW5jZXMsIGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5zdGFuY2VUb1JlbW92ZSAhPT0gaW5zdGFuY2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghIV9pbnN0YW5jZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzaG93ID0gX2luc3RhbmNlc1swXS5lbGVtZW50KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93ID0gJCgnLmxpdHktaGlkZGVuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBzaG93XG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xpdHktaGlkZGVuJylcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBlbCA9ICQodGhpcyksIG9sZEF0dHIgPSBlbC5kYXRhKF9kYXRhQXJpYUhpZGRlbik7XG5cbiAgICAgICAgICAgICAgICBpZiAoIW9sZEF0dHIpIHtcbiAgICAgICAgICAgICAgICAgICAgZWwucmVtb3ZlQXR0cihfYXR0ckFyaWFIaWRkZW4pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmF0dHIoX2F0dHJBcmlhSGlkZGVuLCBvbGRBdHRyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbC5yZW1vdmVEYXRhKF9kYXRhQXJpYUhpZGRlbik7XG4gICAgICAgICAgICB9KVxuICAgICAgICA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3VycmVudEluc3RhbmNlKCkge1xuICAgICAgICBpZiAoMCA9PT0gX2luc3RhbmNlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIF9pbnN0YW5jZXNbMF07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmFjdG9yeSh0YXJnZXQsIGluc3RhbmNlLCBoYW5kbGVycywgcHJlZmVycmVkSGFuZGxlcikge1xuICAgICAgICB2YXIgaGFuZGxlciA9ICdpbmxpbmUnLCBjb250ZW50O1xuXG4gICAgICAgIHZhciBjdXJyZW50SGFuZGxlcnMgPSAkLmV4dGVuZCh7fSwgaGFuZGxlcnMpO1xuXG4gICAgICAgIGlmIChwcmVmZXJyZWRIYW5kbGVyICYmIGN1cnJlbnRIYW5kbGVyc1twcmVmZXJyZWRIYW5kbGVyXSkge1xuICAgICAgICAgICAgY29udGVudCA9IGN1cnJlbnRIYW5kbGVyc1twcmVmZXJyZWRIYW5kbGVyXSh0YXJnZXQsIGluc3RhbmNlKTtcbiAgICAgICAgICAgIGhhbmRsZXIgPSBwcmVmZXJyZWRIYW5kbGVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUnVuIGlubGluZSBhbmQgaWZyYW1lIGhhbmRsZXJzIGFmdGVyIGFsbCBvdGhlciBoYW5kbGVyc1xuICAgICAgICAgICAgJC5lYWNoKFsnaW5saW5lJywgJ2lmcmFtZSddLCBmdW5jdGlvbihpLCBuYW1lKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGN1cnJlbnRIYW5kbGVyc1tuYW1lXTtcblxuICAgICAgICAgICAgICAgIGN1cnJlbnRIYW5kbGVyc1tuYW1lXSA9IGhhbmRsZXJzW25hbWVdO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQuZWFjaChjdXJyZW50SGFuZGxlcnMsIGZ1bmN0aW9uKG5hbWUsIGN1cnJlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlciBtaWdodCBiZSBcInJlbW92ZWRcIiBieSBzZXR0aW5nIGNhbGxiYWNrIHRvIG51bGxcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEhhbmRsZXIudGVzdCAmJlxuICAgICAgICAgICAgICAgICAgICAhY3VycmVudEhhbmRsZXIudGVzdCh0YXJnZXQsIGluc3RhbmNlKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb250ZW50ID0gY3VycmVudEhhbmRsZXIodGFyZ2V0LCBpbnN0YW5jZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmFsc2UgIT09IGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciA9IG5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7aGFuZGxlcjogaGFuZGxlciwgY29udGVudDogY29udGVudCB8fCAnJ307XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gTGl0eSh0YXJnZXQsIG9wdGlvbnMsIG9wZW5lciwgYWN0aXZlRWxlbWVudCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIHZhciBpc1JlYWR5ID0gZmFsc2U7XG4gICAgICAgIHZhciBpc0Nsb3NlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgZWxlbWVudDtcbiAgICAgICAgdmFyIGNvbnRlbnQ7XG5cbiAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKFxuICAgICAgICAgICAge30sXG4gICAgICAgICAgICBfZGVmYXVsdE9wdGlvbnMsXG4gICAgICAgICAgICBvcHRpb25zXG4gICAgICAgICk7XG5cbiAgICAgICAgZWxlbWVudCA9ICQob3B0aW9ucy50ZW1wbGF0ZSk7XG5cbiAgICAgICAgLy8gLS0gQVBJIC0tXG5cbiAgICAgICAgc2VsZi5lbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLm9wZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIG9wZW5lcjtcbiAgICAgICAgfTtcblxuICAgICAgICBzZWxmLm9wdGlvbnMgID0gJC5wcm94eShzZXR0aW5ncywgc2VsZiwgb3B0aW9ucyk7XG4gICAgICAgIHNlbGYuaGFuZGxlcnMgPSAkLnByb3h5KHNldHRpbmdzLCBzZWxmLCBvcHRpb25zLmhhbmRsZXJzKTtcblxuICAgICAgICBzZWxmLnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFpc1JlYWR5IHx8IGlzQ2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250ZW50XG4gICAgICAgICAgICAgICAgLmNzcygnbWF4LWhlaWdodCcsIHdpbkhlaWdodCgpICsgJ3B4JylcbiAgICAgICAgICAgICAgICAudHJpZ2dlcignbGl0eTpyZXNpemUnLCBbc2VsZl0pXG4gICAgICAgICAgICA7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2VsZi5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFpc1JlYWR5IHx8IGlzQ2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpc0Nsb3NlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHJlbW92ZUluc3RhbmNlKHNlbGYpO1xuXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBfZGVmZXJyZWQoKTtcblxuICAgICAgICAgICAgLy8gV2UgcmV0dXJuIGZvY3VzIG9ubHkgaWYgdGhlIGN1cnJlbnQgZm9jdXMgaXMgaW5zaWRlIHRoaXMgaW5zdGFuY2VcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBhY3RpdmVFbGVtZW50ICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBlbGVtZW50WzBdIHx8XG4gICAgICAgICAgICAgICAgICAgICQuY29udGFpbnMoZWxlbWVudFswXSwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgZXhjZXB0aW9ucywgZWcuIGZvciBTVkcgZWxlbWVudHMgd2hpY2ggY2FuJ3QgYmVcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9jdXNlZCBpbiBJRTExXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250ZW50LnRyaWdnZXIoJ2xpdHk6Y2xvc2UnLCBbc2VsZl0pO1xuXG4gICAgICAgICAgICBlbGVtZW50XG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdsaXR5LW9wZW5lZCcpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdsaXR5LWNsb3NlZCcpXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIHRyYW5zaXRpb25FbmQoY29udGVudC5hZGQoZWxlbWVudCkpXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC50cmlnZ2VyKCdsaXR5OnJlbW92ZScsIFtzZWxmXSk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIC0tIEluaXRpYWxpemF0aW9uIC0tXG5cbiAgICAgICAgcmVzdWx0ID0gZmFjdG9yeSh0YXJnZXQsIHNlbGYsIG9wdGlvbnMuaGFuZGxlcnMsIG9wdGlvbnMuaGFuZGxlcik7XG5cbiAgICAgICAgZWxlbWVudFxuICAgICAgICAgICAgLmF0dHIoX2F0dHJBcmlhSGlkZGVuLCAnZmFsc2UnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdsaXR5LWxvYWRpbmcgbGl0eS1vcGVuZWQgbGl0eS0nICsgcmVzdWx0LmhhbmRsZXIpXG4gICAgICAgICAgICAuYXBwZW5kVG8oJ2JvZHknKVxuICAgICAgICAgICAgLmZvY3VzKClcbiAgICAgICAgICAgIC5vbignY2xpY2snLCAnW2RhdGEtbGl0eS1jbG9zZV0nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmlzKCdbZGF0YS1saXR5LWNsb3NlXScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRyaWdnZXIoJ2xpdHk6b3BlbicsIFtzZWxmXSlcbiAgICAgICAgO1xuXG4gICAgICAgIHJlZ2lzdGVySW5zdGFuY2Uoc2VsZik7XG5cbiAgICAgICAgJC53aGVuKHJlc3VsdC5jb250ZW50KVxuICAgICAgICAgICAgLmFsd2F5cyhyZWFkeSlcbiAgICAgICAgO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlYWR5KHJlc3VsdCkge1xuICAgICAgICAgICAgY29udGVudCA9ICQocmVzdWx0KVxuICAgICAgICAgICAgICAgIC5jc3MoJ21heC1oZWlnaHQnLCB3aW5IZWlnaHQoKSArICdweCcpXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgICAgIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAuZmluZCgnLmxpdHktbG9hZGVyJylcbiAgICAgICAgICAgICAgICAuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvYWRlciA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbkVuZChsb2FkZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlci5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgO1xuXG4gICAgICAgICAgICBlbGVtZW50XG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdsaXR5LWxvYWRpbmcnKVxuICAgICAgICAgICAgICAgIC5maW5kKCcubGl0eS1jb250ZW50JylcbiAgICAgICAgICAgICAgICAuZW1wdHkoKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoY29udGVudClcbiAgICAgICAgICAgIDtcblxuICAgICAgICAgICAgaXNSZWFkeSA9IHRydWU7XG5cbiAgICAgICAgICAgIGNvbnRlbnRcbiAgICAgICAgICAgICAgICAudHJpZ2dlcignbGl0eTpyZWFkeScsIFtzZWxmXSlcbiAgICAgICAgICAgIDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpdHkodGFyZ2V0LCBvcHRpb25zLCBvcGVuZXIpIHtcbiAgICAgICAgaWYgKCF0YXJnZXQucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgIG9wZW5lciA9ICQob3BlbmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgb3BlbmVyID0gJCh0aGlzKTtcbiAgICAgICAgICAgIHRhcmdldCA9IG9wZW5lci5kYXRhKCdsaXR5LXRhcmdldCcpIHx8IG9wZW5lci5hdHRyKCdocmVmJykgfHwgb3BlbmVyLmF0dHIoJ3NyYycpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGluc3RhbmNlID0gbmV3IExpdHkoXG4gICAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgICAkLmV4dGVuZChcbiAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICBvcGVuZXIuZGF0YSgnbGl0eS1vcHRpb25zJykgfHwgb3BlbmVyLmRhdGEoJ2xpdHknKSxcbiAgICAgICAgICAgICAgICBvcHRpb25zXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgb3BlbmVyLFxuICAgICAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghdGFyZ2V0LnByZXZlbnREZWZhdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsaXR5LnZlcnNpb24gID0gJzIuNC4xJztcbiAgICBsaXR5Lm9wdGlvbnMgID0gJC5wcm94eShzZXR0aW5ncywgbGl0eSwgX2RlZmF1bHRPcHRpb25zKTtcbiAgICBsaXR5LmhhbmRsZXJzID0gJC5wcm94eShzZXR0aW5ncywgbGl0eSwgX2RlZmF1bHRPcHRpb25zLmhhbmRsZXJzKTtcbiAgICBsaXR5LmN1cnJlbnQgID0gY3VycmVudEluc3RhbmNlO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrLmxpdHknLCAnW2RhdGEtbGl0eV0nLCBsaXR5KTtcblxuICAgIHJldHVybiBsaXR5O1xufSkpO1xuIiwiLyohXG4gKiBKYXZhU2NyaXB0IENvb2tpZSB2Mi4yLjFcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9qcy1jb29raWUvanMtY29va2llXG4gKlxuICogQ29weXJpZ2h0IDIwMDYsIDIwMTUgS2xhdXMgSGFydGwgJiBGYWduZXIgQnJhY2tcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG47KGZ1bmN0aW9uIChmYWN0b3J5KSB7XG5cdHZhciByZWdpc3RlcmVkSW5Nb2R1bGVMb2FkZXI7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoZmFjdG9yeSk7XG5cdFx0cmVnaXN0ZXJlZEluTW9kdWxlTG9hZGVyID0gdHJ1ZTtcblx0fVxuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdFx0cmVnaXN0ZXJlZEluTW9kdWxlTG9hZGVyID0gdHJ1ZTtcblx0fVxuXHRpZiAoIXJlZ2lzdGVyZWRJbk1vZHVsZUxvYWRlcikge1xuXHRcdHZhciBPbGRDb29raWVzID0gd2luZG93LkNvb2tpZXM7XG5cdFx0dmFyIGFwaSA9IHdpbmRvdy5Db29raWVzID0gZmFjdG9yeSgpO1xuXHRcdGFwaS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0d2luZG93LkNvb2tpZXMgPSBPbGRDb29raWVzO1xuXHRcdFx0cmV0dXJuIGFwaTtcblx0XHR9O1xuXHR9XG59KGZ1bmN0aW9uICgpIHtcblx0ZnVuY3Rpb24gZXh0ZW5kICgpIHtcblx0XHR2YXIgaSA9IDA7XG5cdFx0dmFyIHJlc3VsdCA9IHt9O1xuXHRcdGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXR0cmlidXRlcyA9IGFyZ3VtZW50c1sgaSBdO1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIGF0dHJpYnV0ZXMpIHtcblx0XHRcdFx0cmVzdWx0W2tleV0gPSBhdHRyaWJ1dGVzW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRmdW5jdGlvbiBkZWNvZGUgKHMpIHtcblx0XHRyZXR1cm4gcy5yZXBsYWNlKC8oJVswLTlBLVpdezJ9KSsvZywgZGVjb2RlVVJJQ29tcG9uZW50KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGluaXQgKGNvbnZlcnRlcikge1xuXHRcdGZ1bmN0aW9uIGFwaSgpIHt9XG5cblx0XHRmdW5jdGlvbiBzZXQgKGtleSwgdmFsdWUsIGF0dHJpYnV0ZXMpIHtcblx0XHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0YXR0cmlidXRlcyA9IGV4dGVuZCh7XG5cdFx0XHRcdHBhdGg6ICcvJ1xuXHRcdFx0fSwgYXBpLmRlZmF1bHRzLCBhdHRyaWJ1dGVzKTtcblxuXHRcdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzLmV4cGlyZXMgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGF0dHJpYnV0ZXMuZXhwaXJlcyA9IG5ldyBEYXRlKG5ldyBEYXRlKCkgKiAxICsgYXR0cmlidXRlcy5leHBpcmVzICogODY0ZSs1KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gV2UncmUgdXNpbmcgXCJleHBpcmVzXCIgYmVjYXVzZSBcIm1heC1hZ2VcIiBpcyBub3Qgc3VwcG9ydGVkIGJ5IElFXG5cdFx0XHRhdHRyaWJ1dGVzLmV4cGlyZXMgPSBhdHRyaWJ1dGVzLmV4cGlyZXMgPyBhdHRyaWJ1dGVzLmV4cGlyZXMudG9VVENTdHJpbmcoKSA6ICcnO1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuXHRcdFx0XHRpZiAoL15bXFx7XFxbXS8udGVzdChyZXN1bHQpKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSByZXN1bHQ7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cblx0XHRcdHZhbHVlID0gY29udmVydGVyLndyaXRlID9cblx0XHRcdFx0Y29udmVydGVyLndyaXRlKHZhbHVlLCBrZXkpIDpcblx0XHRcdFx0ZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyh2YWx1ZSkpXG5cdFx0XHRcdFx0LnJlcGxhY2UoLyUoMjN8MjR8MjZ8MkJ8M0F8M0N8M0V8M0R8MkZ8M0Z8NDB8NUJ8NUR8NUV8NjB8N0J8N0R8N0MpL2csIGRlY29kZVVSSUNvbXBvbmVudCk7XG5cblx0XHRcdGtleSA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoa2V5KSlcblx0XHRcdFx0LnJlcGxhY2UoLyUoMjN8MjR8MjZ8MkJ8NUV8NjB8N0MpL2csIGRlY29kZVVSSUNvbXBvbmVudClcblx0XHRcdFx0LnJlcGxhY2UoL1tcXChcXCldL2csIGVzY2FwZSk7XG5cblx0XHRcdHZhciBzdHJpbmdpZmllZEF0dHJpYnV0ZXMgPSAnJztcblx0XHRcdGZvciAodmFyIGF0dHJpYnV0ZU5hbWUgaW4gYXR0cmlidXRlcykge1xuXHRcdFx0XHRpZiAoIWF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0pIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzdHJpbmdpZmllZEF0dHJpYnV0ZXMgKz0gJzsgJyArIGF0dHJpYnV0ZU5hbWU7XG5cdFx0XHRcdGlmIChhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBDb25zaWRlcnMgUkZDIDYyNjUgc2VjdGlvbiA1LjI6XG5cdFx0XHRcdC8vIC4uLlxuXHRcdFx0XHQvLyAzLiAgSWYgdGhlIHJlbWFpbmluZyB1bnBhcnNlZC1hdHRyaWJ1dGVzIGNvbnRhaW5zIGEgJXgzQiAoXCI7XCIpXG5cdFx0XHRcdC8vICAgICBjaGFyYWN0ZXI6XG5cdFx0XHRcdC8vIENvbnN1bWUgdGhlIGNoYXJhY3RlcnMgb2YgdGhlIHVucGFyc2VkLWF0dHJpYnV0ZXMgdXAgdG8sXG5cdFx0XHRcdC8vIG5vdCBpbmNsdWRpbmcsIHRoZSBmaXJzdCAleDNCIChcIjtcIikgY2hhcmFjdGVyLlxuXHRcdFx0XHQvLyAuLi5cblx0XHRcdFx0c3RyaW5naWZpZWRBdHRyaWJ1dGVzICs9ICc9JyArIGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0uc3BsaXQoJzsnKVswXTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIChkb2N1bWVudC5jb29raWUgPSBrZXkgKyAnPScgKyB2YWx1ZSArIHN0cmluZ2lmaWVkQXR0cmlidXRlcyk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0IChrZXksIGpzb24pIHtcblx0XHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGphciA9IHt9O1xuXHRcdFx0Ly8gVG8gcHJldmVudCB0aGUgZm9yIGxvb3AgaW4gdGhlIGZpcnN0IHBsYWNlIGFzc2lnbiBhbiBlbXB0eSBhcnJheVxuXHRcdFx0Ly8gaW4gY2FzZSB0aGVyZSBhcmUgbm8gY29va2llcyBhdCBhbGwuXG5cdFx0XHR2YXIgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZSA/IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKSA6IFtdO1xuXHRcdFx0dmFyIGkgPSAwO1xuXG5cdFx0XHRmb3IgKDsgaSA8IGNvb2tpZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIHBhcnRzID0gY29va2llc1tpXS5zcGxpdCgnPScpO1xuXHRcdFx0XHR2YXIgY29va2llID0gcGFydHMuc2xpY2UoMSkuam9pbignPScpO1xuXG5cdFx0XHRcdGlmICghanNvbiAmJiBjb29raWUuY2hhckF0KDApID09PSAnXCInKSB7XG5cdFx0XHRcdFx0Y29va2llID0gY29va2llLnNsaWNlKDEsIC0xKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dmFyIG5hbWUgPSBkZWNvZGUocGFydHNbMF0pO1xuXHRcdFx0XHRcdGNvb2tpZSA9IChjb252ZXJ0ZXIucmVhZCB8fCBjb252ZXJ0ZXIpKGNvb2tpZSwgbmFtZSkgfHxcblx0XHRcdFx0XHRcdGRlY29kZShjb29raWUpO1xuXG5cdFx0XHRcdFx0aWYgKGpzb24pIHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdGNvb2tpZSA9IEpTT04ucGFyc2UoY29va2llKTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0amFyW25hbWVdID0gY29va2llO1xuXG5cdFx0XHRcdFx0aWYgKGtleSA9PT0gbmFtZSkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4ga2V5ID8gamFyW2tleV0gOiBqYXI7XG5cdFx0fVxuXG5cdFx0YXBpLnNldCA9IHNldDtcblx0XHRhcGkuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0cmV0dXJuIGdldChrZXksIGZhbHNlIC8qIHJlYWQgYXMgcmF3ICovKTtcblx0XHR9O1xuXHRcdGFwaS5nZXRKU09OID0gZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0cmV0dXJuIGdldChrZXksIHRydWUgLyogcmVhZCBhcyBqc29uICovKTtcblx0XHR9O1xuXHRcdGFwaS5yZW1vdmUgPSBmdW5jdGlvbiAoa2V5LCBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRzZXQoa2V5LCAnJywgZXh0ZW5kKGF0dHJpYnV0ZXMsIHtcblx0XHRcdFx0ZXhwaXJlczogLTFcblx0XHRcdH0pKTtcblx0XHR9O1xuXG5cdFx0YXBpLmRlZmF1bHRzID0ge307XG5cblx0XHRhcGkud2l0aENvbnZlcnRlciA9IGluaXQ7XG5cblx0XHRyZXR1cm4gYXBpO1xuXHR9XG5cblx0cmV0dXJuIGluaXQoZnVuY3Rpb24gKCkge30pO1xufSkpO1xuIiwiLypcbiAqIFNsaW5reVxuICogQSBsaWdodC13ZWlnaHQsIHJlc3BvbnNpdmUsIG1vYmlsZS1saWtlIG5hdmlnYXRpb24gbWVudSBwbHVnaW4gZm9yIGpRdWVyeVxuICogQnVpbHQgYnkgQWxpIFphaGlkIDxhbGkuemFoaWRAbGl2ZS5jb20+XG4gKiBQdWJsaXNoZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cblxuOyhmdW5jdGlvbigkKVxue1xuICAgIHZhciBsYXN0Q2xpY2s7XG5cbiAgICAkLmZuLnNsaW5reSA9IGZ1bmN0aW9uKG9wdGlvbnMpXG4gICAge1xuICAgICAgICB2YXIgc2V0dGluZ3MgPSAkLmV4dGVuZFxuICAgICAgICAoe1xuICAgICAgICAgICAgbGFiZWw6ICdCYWNrJyxcbiAgICAgICAgICAgIHRpdGxlOiBmYWxzZSxcbiAgICAgICAgICAgIHNwZWVkOiAzMDAsXG4gICAgICAgICAgICByZXNpemU6IHRydWUsXG4gICAgICAgICAgICBhY3RpdmVDbGFzczogJ2FjdGl2ZScsXG4gICAgICAgICAgICBoZWFkZXJDbGFzczogJ2hlYWRlcicsXG4gICAgICAgICAgICBoZWFkaW5nVGFnOiAnPGgyPicsXG4gICAgICAgICAgICBiYWNrRmlyc3Q6IGZhbHNlLFxuICAgICAgICB9LCBvcHRpb25zKTtcblxuICAgICAgICB2YXIgbWVudSA9ICQodGhpcyksXG4gICAgICAgICAgICByb290ID0gbWVudS5jaGlsZHJlbigpLmZpcnN0KCk7XG5cbiAgICAgICAgbWVudS5hZGRDbGFzcygnc2xpbmt5LW1lbnUnKTtcblxuICAgICAgICB2YXIgbW92ZSA9IGZ1bmN0aW9uKGRlcHRoLCBjYWxsYmFjaylcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGxlZnQgPSBNYXRoLnJvdW5kKHBhcnNlSW50KHJvb3QuZ2V0KDApLnN0eWxlLmxlZnQpKSB8fCAwO1xuXG4gICAgICAgICAgICByb290LmNzcygnbGVmdCcsIGxlZnQgLSAoZGVwdGggKiAxMDApICsgJyUnKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCBzZXR0aW5ncy5zcGVlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHJlc2l6ZSA9IGZ1bmN0aW9uKGNvbnRlbnQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIG1lbnUuaGVpZ2h0KGNvbnRlbnQub3V0ZXJIZWlnaHQoKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHRyYW5zaXRpb24gPSBmdW5jdGlvbihzcGVlZClcbiAgICAgICAge1xuICAgICAgICAgICAgbWVudS5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCBzcGVlZCArICdtcycpO1xuICAgICAgICAgICAgcm9vdC5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCBzcGVlZCArICdtcycpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRyYW5zaXRpb24oc2V0dGluZ3Muc3BlZWQpO1xuXG4gICAgICAgICQoJ2EgKyB1bCcsIG1lbnUpLnByZXYoKS5hZGRDbGFzcygnbmV4dCcpO1xuXG4gICAgICAgICQoJ2xpID4gdWwnLCBtZW51KS5wcmVwZW5kKCc8bGkgY2xhc3M9XCInICsgc2V0dGluZ3MuaGVhZGVyQ2xhc3MgKyAnXCI+Jyk7XG5cbiAgICAgICAgaWYgKHNldHRpbmdzLnRpdGxlID09PSB0cnVlKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCdsaSA+IHVsJywgbWVudSkuZWFjaChmdW5jdGlvbigpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFyICRsaW5rID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdhJykuZmlyc3QoKSxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSAkbGluay50ZXh0KCksXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlID0gJCgnPGE+JykuYWRkQ2xhc3MoJ3RpdGxlJykudGV4dChsYWJlbCkuYXR0cignaHJlZicsICRsaW5rLmF0dHIoJ2hyZWYnKSk7XG5cbiAgICAgICAgICAgICAgICAkKCc+IC4nICsgc2V0dGluZ3MuaGVhZGVyQ2xhc3MsIHRoaXMpLmFwcGVuZCh0aXRsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc2V0dGluZ3MudGl0bGUgJiYgc2V0dGluZ3MubGFiZWwgPT09IHRydWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgICQoJ2xpID4gdWwnLCBtZW51KS5lYWNoKGZ1bmN0aW9uKClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgbGFiZWwgPSAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2EnKS5maXJzdCgpLnRleHQoKSxcbiAgICAgICAgICAgICAgICAgICAgYmFja0xpbmsgPSAkKCc8YT4nKS50ZXh0KGxhYmVsKS5wcm9wKCdocmVmJywgJyMnKS5hZGRDbGFzcygnYmFjaycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmJhY2tGaXJzdClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICQoJz4gLicgKyBzZXR0aW5ncy5oZWFkZXJDbGFzcywgdGhpcykucHJlcGVuZChiYWNrTGluayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICQoJz4gLicgKyBzZXR0aW5ncy5oZWFkZXJDbGFzcywgdGhpcykuYXBwZW5kKGJhY2tMaW5rKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBiYWNrTGluayA9ICQoJzxhPicpLnRleHQoc2V0dGluZ3MubGFiZWwpLnByb3AoJ2hyZWYnLCAnIycpLmFkZENsYXNzKCdiYWNrJyk7XG5cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5iYWNrRmlyc3QpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJCgnLicgKyBzZXR0aW5ncy5oZWFkZXJDbGFzcywgbWVudSkucHJlcGVuZChiYWNrTGluayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJCgnLicgKyBzZXR0aW5ncy5oZWFkZXJDbGFzcywgbWVudSkuYXBwZW5kKGJhY2tMaW5rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQoJ2EnLCBtZW51KS5vbignY2xpY2snLCBmdW5jdGlvbihlKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoKGxhc3RDbGljayArIHNldHRpbmdzLnNwZWVkKSA+IERhdGUubm93KCkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsYXN0Q2xpY2sgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgICAgICB2YXIgYSA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIGlmIChhLmhhc0NsYXNzKCduZXh0JykgfHwgYS5oYXNDbGFzcygnYmFjaycpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGEuaGFzQ2xhc3MoJ25leHQnKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtZW51LmZpbmQoJy4nICsgc2V0dGluZ3MuYWN0aXZlQ2xhc3MpLnJlbW92ZUNsYXNzKHNldHRpbmdzLmFjdGl2ZUNsYXNzKTtcblxuICAgICAgICAgICAgICAgIGEubmV4dCgpLnNob3coKS5hZGRDbGFzcyhzZXR0aW5ncy5hY3RpdmVDbGFzcyk7XG5cbiAgICAgICAgICAgICAgICBtb3ZlKDEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLnJlc2l6ZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlc2l6ZShhLm5leHQoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYS5oYXNDbGFzcygnYmFjaycpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1vdmUoLTEsIGZ1bmN0aW9uKClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG1lbnUuZmluZCgnLicgKyBzZXR0aW5ncy5hY3RpdmVDbGFzcykucmVtb3ZlQ2xhc3Moc2V0dGluZ3MuYWN0aXZlQ2xhc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgIGEucGFyZW50KCkucGFyZW50KCkuaGlkZSgpLnBhcmVudHNVbnRpbChtZW51LCAndWwnKS5maXJzdCgpLmFkZENsYXNzKHNldHRpbmdzLmFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5yZXNpemUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXNpemUoYS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnRzVW50aWwobWVudSwgJ3VsJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5qdW1wID0gZnVuY3Rpb24odG8sIGFuaW1hdGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRvID0gJCh0byk7XG5cbiAgICAgICAgICAgIHZhciBhY3RpdmUgPSBtZW51LmZpbmQoJy4nICsgc2V0dGluZ3MuYWN0aXZlQ2xhc3MpO1xuXG4gICAgICAgICAgICBpZiAoYWN0aXZlLmxlbmd0aCA+IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYWN0aXZlID0gYWN0aXZlLnBhcmVudHNVbnRpbChtZW51LCAndWwnKS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYWN0aXZlID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWVudS5maW5kKCd1bCcpLnJlbW92ZUNsYXNzKHNldHRpbmdzLmFjdGl2ZUNsYXNzKS5oaWRlKCk7XG5cbiAgICAgICAgICAgIHZhciBtZW51cyA9IHRvLnBhcmVudHNVbnRpbChtZW51LCAndWwnKTtcblxuICAgICAgICAgICAgbWVudXMuc2hvdygpO1xuICAgICAgICAgICAgdG8uc2hvdygpLmFkZENsYXNzKHNldHRpbmdzLmFjdGl2ZUNsYXNzKTtcblxuICAgICAgICAgICAgaWYgKGFuaW1hdGUgPT09IGZhbHNlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb24oMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1vdmUobWVudXMubGVuZ3RoIC0gYWN0aXZlKTtcblxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLnJlc2l6ZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXNpemUodG8pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYW5pbWF0ZSA9PT0gZmFsc2UpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbihzZXR0aW5ncy5zcGVlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5ob21lID0gZnVuY3Rpb24oYW5pbWF0ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGFuaW1hdGUgPT09IGZhbHNlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb24oMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBhY3RpdmUgPSBtZW51LmZpbmQoJy4nICsgc2V0dGluZ3MuYWN0aXZlQ2xhc3MpLFxuICAgICAgICAgICAgICAgIGNvdW50ID0gYWN0aXZlLnBhcmVudHNVbnRpbChtZW51LCAnbGknKS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChjb3VudCA+IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbW92ZSgtY291bnQsIGZ1bmN0aW9uKClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZS5yZW1vdmVDbGFzcyhzZXR0aW5ncy5hY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MucmVzaXplKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzaXplKCQoYWN0aXZlLnBhcmVudHNVbnRpbChtZW51LCAnbGknKS5nZXQoY291bnQgLSAxKSkucGFyZW50KCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFuaW1hdGUgPT09IGZhbHNlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb24oc2V0dGluZ3Muc3BlZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgJCgnLicgKyBzZXR0aW5ncy5oZWFkZXJDbGFzcywgbWVudSkucmVtb3ZlKCk7XG4gICAgICAgICAgICAkKCdhJywgbWVudSkucmVtb3ZlQ2xhc3MoJ25leHQnKS5vZmYoJ2NsaWNrJyk7XG5cbiAgICAgICAgICAgIG1lbnUucmVtb3ZlQ2xhc3MoJ3NsaW5reS1tZW51JykuY3NzKCd0cmFuc2l0aW9uLWR1cmF0aW9uJywgJycpO1xuICAgICAgICAgICAgcm9vdC5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nLCAnJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGFjdGl2ZSA9IG1lbnUuZmluZCgnLicgKyBzZXR0aW5ncy5hY3RpdmVDbGFzcyk7XG5cbiAgICAgICAgaWYgKGFjdGl2ZS5sZW5ndGggPiAwKVxuICAgICAgICB7XG4gICAgICAgICAgICBhY3RpdmUucmVtb3ZlQ2xhc3Moc2V0dGluZ3MuYWN0aXZlQ2xhc3MpO1xuXG4gICAgICAgICAgICB0aGlzLmp1bXAoYWN0aXZlLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xufShqUXVlcnkpKTtcbiIsIi8vLy8gfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLy8vIHwgSGVhZGVyXG4vLy8vIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgaGVhZGVyID0gKGZ1bmN0aW9uICgkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIHB1YiA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogSW5zdGFudGlhdGVcbiAgICAgKi9cbiAgICBwdWIuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVnaXN0ZXJCb290RXZlbnRIYW5kbGVycygpO1xuICAgICAgICByZWdpc3RlckV2ZW50SGFuZGxlcnMoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgYm9vdCBldmVudCBoYW5kbGVycy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZWdpc3RlckJvb3RFdmVudEhhbmRsZXJzKCkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGV2ZW50IGhhbmRsZXJzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnRIYW5kbGVycygpIHtcbiAgICAgICAgLy8gQWRkIHN1Ym1lbnUgb3Blbi9jbG9zZSBiZWhhdmlvci5cbiAgICAgICAgJCgnLmhlYWRlcndyYXBwZXItaW5uZXIgLm5hdmJhci1uYXYgPiBsaS5leHBhbmRlZCcpLmhvdmVyKFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ29wZW4nKS5jaGlsZHJlbignYScpLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdvcGVuJykuY2hpbGRyZW4oJ2EnKS5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICkuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAvLyBEaXNhYmxlIG90aGVyIGV2ZW50IGxpc3RlbmVycy5cbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgLy8gUmVzdG9yZSBkZWZhdWx0IGxpbmsgYmVoYXZpb3VyLlxuICAgICAgICB9KTtcblxuICAgICAgICAvL1Ntb290aCBzY3JvbGwgdG8gI21haW4tY29udGVudFxuICAgICAgICAkKFwiI3Njcm9sbC1kb3duLWxpbmtcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQoXCIjbWFpbi1jb250ZW50XCIpLm9mZnNldCgpLnRvcFxuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDdXN0b20gYmFja3N0cmV0Y2ggYmVoYXZpb3IuXG4gICAgICovXG4gICAgRHJ1cGFsLmJlaGF2aW9ycy5maWNCYWNrc3RyZXRjaCA9IHtcbiAgICAgICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3MuZmljQmFja3N0cmV0Y2ggPT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgfHwgJCgnLmJhY2tzdHJldGNoJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyICRpbWFnZXMgPSBbXSxcbiAgICAgICAgICAgICAgICAkYmFja3N0cmV0Y2hXcmFwcGVyID0gJCgnLnBhZ2UtaGVhZGVyLXdyYXBwZXInKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0dGluZ3MuZmljQmFja3N0cmV0Y2gubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAkaW1hZ2VzLnB1c2goc2V0dGluZ3MuZmljQmFja3N0cmV0Y2hbaV0udXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRiYWNrc3RyZXRjaFdyYXBwZXIuYmFja3N0cmV0Y2goJGltYWdlcywge1xuICAgICAgICAgICAgICAgIC8vIFNsaWRlcyBzaG91bGQgYmUgbmV2ZXIgY2hhbmdlZCBhdXRvbWF0aWNseS5cbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMDAwMCwgZmFkZTogNzUwLCBwYXVzZWQ6IHRydWVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBSZXNldCBiYWNrc3RyZWNoIHNsaWRlIG9uIHRpbWVvdXQgYWZ0ZXIgbW91c2VsZWF2ZS5cbiAgICAgICAgICAgIHZhciBwYWdlcl9saW5rc19zZWxlY3RvciA9ICcuY3ljbGUtcGFnZXIgYSwgLndpZGdldF9wYWdlcl9ib3R0b20gYScsXG4gICAgICAgICAgICAgICAgc2xpZGVSZXNldFRpbWVvdXQgPSBzZXR0aW5ncy5zbGlkZVJlc2V0VGltZW91dDtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKHtcbiAgICAgICAgICAgICAgICAnbW91c2VsZWF2ZSc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJHBhZ2VyID0gJCh0aGlzKS5wYXJlbnRzKCcudmlld3Mtc2xpZGVzaG93LXBhZ2VyLWZpZWxkLWl0ZW06Zmlyc3QsIC5maWVsZC1pdGVtOmZpcnN0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkcGFnZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRwYWdlci5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQocGFnZXJfbGlua3Nfc2VsZWN0b3IpLmZpbHRlcignOmZpcnN0JykubW91c2VvdmVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LCBzbGlkZVJlc2V0VGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBwYWdlcl9saW5rc19zZWxlY3Rvcik7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvdzogZnVuY3Rpb24gKCRpZCkge1xuICAgICAgICAgICAgdmFyICRpID0gMCxcbiAgICAgICAgICAgICAgICAkYmFja3N0cmV0Y2ggPSAkKCcucGFnZS1oZWFkZXItd3JhcHBlcicpLmRhdGEoJ2JhY2tzdHJldGNoJyksXG4gICAgICAgICAgICAgICAgJGRlZmF1bHQgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIERydXBhbC5zZXR0aW5ncy5maWNCYWNrc3RyZXRjaCA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgICAgICB8fCB0eXBlb2YgJGJhY2tzdHJldGNoID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IERydXBhbC5zZXR0aW5ncy5maWNCYWNrc3RyZXRjaC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICgkaWQgPT0gRHJ1cGFsLnNldHRpbmdzLmZpY0JhY2tzdHJldGNoW2ldLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICRiYWNrc3RyZXRjaC5zaG93KCRpKTtcbiAgICAgICAgICAgICAgICAgICAgJGRlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRpKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICRiYWNrc3RyZXRjaC5zaG93KDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEN1c3RvbSBoZWFkZXJSZWdpb24gYmVoYXZpb3IuXG4gICAgICovXG4gICAgRHJ1cGFsLmJlaGF2aW9ycy5oZWFkZXJSZWdpb24gPSB7XG4gICAgICAgIGF0dGFjaDogZnVuY3Rpb24gKGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAgICAgICBpZiAoISQoJy50ZXJtLWZpYy1oZWFkZXInKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciAkd0ggPSAkKHdpbmRvdykuaGVpZ2h0KCksXG4gICAgICAgICAgICAvLyBBbGwgc3RhdGljIHZhbHVlIGRlZmlkZW4gYWNjb3JkaW5nbHkgd2l0aCBkZXNpZ24uXG4gICAgICAgICAgICAkYnJhbmRpZ0ggPSAxNzggKyAyMCxcbiAgICAgICAgICAgICRuYXZpZ2F0aW9uSCA9IDE1MCArIDIwLFxuICAgICAgICAgICAgJHNjcm9sbERvd25IID0gMTc0LFxuICAgICAgICAgICAgJGRlc2NySCA9ICR3SCAtICRicmFuZGlnSCAtICRuYXZpZ2F0aW9uSCAtICRzY3JvbGxEb3duSCxcbiAgICAgICAgICAgICRtaW5IID0gMzAwLFxuICAgICAgICAgICAgJG1heEggPSA3MDA7XG5cbiAgICAgICAgICAgICRkZXNjckggPSAkZGVzY3JIIDwgJG1pbkggPyAkbWluSCA6ICgkZGVzY3JIID4gJG1heEggPyAkbWF4SCA6ICRkZXNjckgpO1xuICAgICAgICAgICAgJCgnLnRlcm0tZmljLWhlYWRlciAudmlld3Nfc2xpZGVzaG93X2N5Y2xlX21haW4sIC5wYWdlLXRheG9ub215IC50ZXJtLWZpYy1oZWFkZXIgPiAudGF4b25vbXktdGVybSAuY3ljbGUtc2xpZGVzaG93LXdyYXBwZXInKS5oZWlnaHQoJGRlc2NySCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRHJ1cGFsLnRoZW1lLnByb3RvdHlwZS5maWNfbW9kYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBodG1sID0gJyc7XG4gICAgICAgIGh0bWwgKz0gJzxkaXYgaWQ9XCJjdG9vbHMtbW9kYWxcIiBjbGFzcz1cInBvcHVwcy1ib3ggbXktZmlyc3QtcG9wdXBcIj4nO1xuICAgICAgICBodG1sICs9ICcgPGRpdiBjbGFzcz1cImN0b29scy1tb2RhbC1jb250ZW50IG15LXBvcHVwIFwiPic7XG4gICAgICAgIGh0bWwgKz0gJyA8c3BhbiBjbGFzcz1cInBvcHVwcy1jbG9zZVwiPjxhIGNsYXNzPVwiY2xvc2VcIiBocmVmPVwiI1wiPsOXPC9hPjwvc3Bhbj4nO1xuICAgICAgICBodG1sICs9ICcgPGRpdiBjbGFzcz1cIm1vZGFsLXNjcm9sbFwiPjxkaXYgaWQ9XCJtb2RhbC1jb250ZW50XCIgY2xhc3M9XCJtb2RhbC1jb250ZW50IHBvcHVwcy1ib2R5XCI+PC9kaXY+PC9kaXY+JztcbiAgICAgICAgaHRtbCArPSAnIDwvZGl2Pic7XG4gICAgICAgIGh0bWwgKz0gJzwvZGl2Pic7XG4gICAgICAgIHJldHVybiBodG1sO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDdXN0b20gZmljSGVhZGVyQ3ljbGVTbGlkZXNob3cgYmVoYXZpb3IuXG4gICAgICovXG4gICAgRHJ1cGFsLmJlaGF2aW9ycy5maWNIZWFkZXJDeWNsZVNsaWRlc2hvdyA9IHtcbiAgICAgICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHZhciAkc2xpZGVTaG93ID0gJCgnLmN5Y2xlLXNsaWRlc2hvdycpO1xuICAgICAgICAgICAgaWYgKCEkc2xpZGVTaG93Lm9uY2UoKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRzbGlkZVNob3cuY3ljbGUoe1xuICAgICAgICAgICAgICAgIHNwZWVkOiA3MDAsXG4gICAgICAgICAgICAgICAgdGltZW91dDogMCxcbiAgICAgICAgICAgICAgICBhY3RpdmVQYWdlckNsYXNzOiAnYWN0aXZlJyxcbiAgICAgICAgICAgICAgICBwYWdlcjogJyNjeWNsZS1uYXYnLFxuICAgICAgICAgICAgICAgIGJlZm9yZTogZnVuY3Rpb24gKGN1cnJTbGlkZUVsZW1lbnQsIG5leHRTbGlkZUVsZW1lbnQsIG9wdGlvbnMsIGZvcndhcmRGbGFnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkdGVybUlkID0gJChuZXh0U2xpZGVFbGVtZW50KS5kYXRhKCdpZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIERydXBhbC5iZWhhdmlvcnMuZmljQmFja3N0cmV0Y2ggIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIERydXBhbC5iZWhhdmlvcnMuZmljQmFja3N0cmV0Y2guc2hvdygkdGVybUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcGFnZXJBbmNob3JCdWlsZGVyOiBmdW5jdGlvbiAoaWR4LCBzbGlkZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJHNsaWRlID0gJChzbGlkZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAkdGFyZ2V0ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgJHNsaWRlLmRhdGEoJ3RhcmdldCcpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHRhcmdldCA9ICcgdGFyZ2V0PVwiJyArICRzbGlkZS5kYXRhKCd0YXJnZXQnKSArICdcIic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiZmllbGQtaXRlbVwiPjxhIGhyZWY9XCInICsgJHNsaWRlLmRhdGEoJ3VybCcpICsgJ1wiJyArICR0YXJnZXQgKyAnPjxzcGFuPicgKyAkc2xpZGUuZGF0YSgnbmFtZScpICsgJzwvc3Bhbj48L2E+PC9kaXY+JztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBhZ2VyRXZlbnQ6ICdtb3VzZW92ZXInLFxuICAgICAgICAgICAgICAgIHBhdXNlT25QYWdlckhvdmVyOiB0cnVlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJCgnLmN5Y2xlLXBhZ2VyIGEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gcHViO1xuXG59KShqUXVlcnkpO1xuIiwiLy8gRG9jdW1lbnQgcmVhZHlcbihmdW5jdGlvbiAoJCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8vIFJlc29sdmVzICQuYnJvd3NlciBpc3N1ZSAoc2VlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNDc5ODQwMy90eXBlZXJyb3ItYnJvd3Nlci1pcy11bmRlZmluZWQpXG4gICAgdmFyIG1hdGNoZWQsIGJyb3dzZXI7XG5cbiAgICBqUXVlcnkudWFNYXRjaCA9IGZ1bmN0aW9uKCB1YSApIHtcbiAgICAgICAgdWEgPSB1YS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHZhciBtYXRjaCA9IC8oY2hyb21lKVsgXFwvXShbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgICAgICAgICAgLyh3ZWJraXQpWyBcXC9dKFtcXHcuXSspLy5leGVjKCB1YSApIHx8XG4gICAgICAgICAgICAvKG9wZXJhKSg/Oi4qdmVyc2lvbnwpWyBcXC9dKFtcXHcuXSspLy5leGVjKCB1YSApIHx8XG4gICAgICAgICAgICAvKG1zaWUpIChbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgICAgICAgICAgdWEuaW5kZXhPZihcImNvbXBhdGlibGVcIikgPCAwICYmIC8obW96aWxsYSkoPzouKj8gcnY6KFtcXHcuXSspfCkvLmV4ZWMoIHVhICkgfHxcbiAgICAgICAgICAgIFtdO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBicm93c2VyOiBtYXRjaFsgMSBdIHx8IFwiXCIsXG4gICAgICAgICAgICB2ZXJzaW9uOiBtYXRjaFsgMiBdIHx8IFwiMFwiXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIG1hdGNoZWQgPSBqUXVlcnkudWFNYXRjaCggbmF2aWdhdG9yLnVzZXJBZ2VudCApO1xuICAgIGJyb3dzZXIgPSB7fTtcblxuICAgIGlmICggbWF0Y2hlZC5icm93c2VyICkge1xuICAgICAgICBicm93c2VyWyBtYXRjaGVkLmJyb3dzZXIgXSA9IHRydWU7XG4gICAgICAgIGJyb3dzZXIudmVyc2lvbiA9IG1hdGNoZWQudmVyc2lvbjtcbiAgICB9XG5cbiAgICAvLyBDaHJvbWUgaXMgV2Via2l0LCBidXQgV2Via2l0IGlzIGFsc28gU2FmYXJpLlxuICAgIGlmICggYnJvd3Nlci5jaHJvbWUgKSB7XG4gICAgICAgIGJyb3dzZXIud2Via2l0ID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKCBicm93c2VyLndlYmtpdCApIHtcbiAgICAgICAgYnJvd3Nlci5zYWZhcmkgPSB0cnVlO1xuICAgIH1cblxuICAgIGpRdWVyeS5icm93c2VyID0gYnJvd3NlcjtcblxuICAgIC8vIEVuYWJsZSBoZWFkZXJcbiAgICBoZWFkZXIuaW5pdCgpO1xuXG4gICAgLy8gUmVtb3ZlIC5ub2xpbmsgYW5kIC5zZXBhcmF0b3JcbiAgICAkKCcuc2xpbmt5LW1lbnUsIC5uYXZpZ2F0aW9uLWJhcl9fZHJvcHVwJylcbiAgICAgICAgLmZpbmQoJy5ub2xpbmssIC5zZXBhcmF0b3InKVxuICAgICAgICAucGFyZW50KClcbiAgICAgICAgLnJlbW92ZSgpO1xuXG4gICAgLy8gU2lkclxuICAgICQoJy5zbGlua3ktbWVudScpXG4gICAgICAgIC5maW5kKCd1bCwgYScpXG4gICAgICAgIC5yZW1vdmVDbGFzcygpO1xuXG4gICAgJCgnLnNpZHJfX3RvZ2dsZScpLnNpZHIoe1xuICAgICAgICBuYW1lOiAnc2lkci1tYWluJyxcbiAgICAgICAgc2lkZTogJ2xlZnQnLFxuICAgICAgICBkaXNwbGFjZTogZmFsc2UsXG4gICAgICAgIHJlbmFtaW5nOiBmYWxzZSxcbiAgICAgICAgc291cmNlOiAnLnNpZHItc291cmNlLXByb3ZpZGVyJ1xuICAgIH0pO1xuXG4gICAgLy8gU2xpbmt5XG4gICAgJCgnLnNpZHIgLnNsaW5reS1tZW51Jykuc2xpbmt5KHtcbiAgICAgICAgdGl0bGU6IHRydWUsXG4gICAgICAgIGxhYmVsOiAnJ1xuICAgIH0pO1xuXG4gICAgJCgnc2VsZWN0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICBpZiAoJHRoaXMudmFsKCkgPT0gJycpIHtcbiAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKCdlbXB0eScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ2VtcHR5Jyk7XG4gICAgICAgIH1cbiAgICB9KS5jaGFuZ2UoKTtcblxuICAgIC8vIENsb3NlIENUb29scyBtb2RhbCBvbiBiYWNrZHJvcCBjbGlja1xuICAgIERydXBhbC5iZWhhdmlvcnMuY3Rvb2xzX2JhY2tkcm9wX2Nsb3NlID0ge1xuICAgICAgICBhdHRhY2g6IGZ1bmN0aW9uKGNvbnRleHQsIHNldHRpbmdzKXtcbiAgICAgICAgICAgICQoJyNtb2RhbEJhY2tkcm9wLCAjbW9kYWxDb250ZW50Jykub25jZSgnY3Rvb2xzX2JhY2tkcm9wX2Nsb3NlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCgnLnBvcHVwcy1ib2R5JykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIERydXBhbC5DVG9vbHMuTW9kYWwuZGlzbWlzcygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gX3NldF9oZWlnaHRfb25fcGFnZV93cmFwcGVyKCkge1xuICAgICAgICB2YXIgJGhlYWRlciA9ICQoJy5wYWdlLWhlYWRlci13cmFwcGVyJyksXG4gICAgICAgICAgICAkYmFja3N0cmV0Y2ggPSAkKCcuYmFja3N0cmV0Y2gnKSxcbiAgICAgICAgICAgIGhlaWdodCA9ICRiYWNrc3RyZXRjaC5vdXRlckhlaWdodCh0cnVlKTtcblxuICAgICAgICAkaGVhZGVyLmNzcygnaGVpZ2h0JywgaGVpZ2h0KTtcbiAgICB9XG4gICAgX3NldF9oZWlnaHRfb25fcGFnZV93cmFwcGVyKCk7IC8vIExvYWQgdXBvbiBib290XG5cbiAgICAvLyBJbml0IHN0YWNrYWJsZSByZXNwb25zaXZlIHRhYmxlIHBsdWdpbi5cbiAgICBEcnVwYWwuYmVoYXZpb3JzLnN0YWNrYWJsZSA9IHtcbiAgICAgICAgYXR0YWNoOiBmdW5jdGlvbihjb250ZXh0LCBzZXR0aW5ncyl7XG4gICAgICAgICAgICAkKCd0YWJsZScpLm9uY2UoJ3N0YWNrYWJsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuc3RhY2t0YWJsZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gTGl0eVxuICAgICQoJ2FbcmVsPVwibW9kYWxib3hcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciAkZWxlbWVudCA9ICQodGhpcyksXG4gICAgICAgICAgICBocmVmID0gJGVsZW1lbnQuYXR0cignaHJlZicpO1xuXG4gICAgICAgIGxpdHkoaHJlZik7XG4gICAgfSk7XG5cbiAgICAvLyBOYXZpZ2F0aW9uIGJhclxuICAgICQoJy5uYXZpZ2F0aW9uLWJhcl9fdG9nZ2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgJGVsZW1lbnQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgJHBhcmVudCA9ICRlbGVtZW50LnBhcmVudHMoJy5uYXZpZ2F0aW9uLWJhcicpO1xuXG4gICAgICAgICRwYXJlbnQudG9nZ2xlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgICB9KVxuXG4gICAgLy8gQWxsIGxpbmtzIHRvIFBERnMgc2hvdWxkIG9wZW4gaW4gYSBuZXcgd2luZG93LlxuICAgICQoJ2FbaHJlZiQ9XCIucGRmXCJdJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRlbGVtZW50ID0gJCh0aGlzKTtcblxuICAgICAgICAkZWxlbWVudC5hdHRyKCd0YXJnZXQnLCAnX2JsYW5rJyk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7XG4iXX0=
