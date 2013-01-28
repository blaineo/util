/*! mtvn-util - v0.0.1 - 2013-01-28 12:01:03
* Copyright (c) Viacom 2013 */
(function(context) {
    /*global Handlebars _ Backbone $ */
    var MTVNPlayer = context.MTVNPlayer = context.MTVNPlayer || {},
    // no noConflict method for these guys.
    previous$ = context.$,
        previousHandlebars = context.Handlebars,
        Util = {}, _;
    // BEGIN THIRD PARTY CODE
    //     Underscore.js 1.4.3
    //     http://underscorejs.org
    //     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
    //     Underscore may be freely distributed under the MIT license.
    
    (function() {
    
      // Baseline setup
      // --------------
    
      // Establish the root object, `window` in the browser, or `global` on the server.
      var root = this;
    
      // Save the previous value of the `_` variable.
      var previousUnderscore = root._;
    
      // Establish the object that gets returned to break out of a loop iteration.
      var breaker = {};
    
      // Save bytes in the minified (but not gzipped) version:
      var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
    
      // Create quick reference variables for speed access to core prototypes.
      var push             = ArrayProto.push,
          slice            = ArrayProto.slice,
          concat           = ArrayProto.concat,
          toString         = ObjProto.toString,
          hasOwnProperty   = ObjProto.hasOwnProperty;
    
      // All **ECMAScript 5** native function implementations that we hope to use
      // are declared here.
      var
        nativeForEach      = ArrayProto.forEach,
        nativeMap          = ArrayProto.map,
        nativeReduce       = ArrayProto.reduce,
        nativeReduceRight  = ArrayProto.reduceRight,
        nativeFilter       = ArrayProto.filter,
        nativeEvery        = ArrayProto.every,
        nativeSome         = ArrayProto.some,
        nativeIndexOf      = ArrayProto.indexOf,
        nativeLastIndexOf  = ArrayProto.lastIndexOf,
        nativeIsArray      = Array.isArray,
        nativeKeys         = Object.keys,
        nativeBind         = FuncProto.bind;
    
      // Create a safe reference to the Underscore object for use below.
      var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
      };
    
      // Export the Underscore object for **Node.js**, with
      // backwards-compatibility for the old `require()` API. If we're in
      // the browser, add `_` as a global object via a string identifier,
      // for Closure Compiler "advanced" mode.
      if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
          exports = module.exports = _;
        }
        exports._ = _;
      } else {
        root._ = _;
      }
    
      // Current version.
      _.VERSION = '1.4.3';
    
      // Collection Functions
      // --------------------
    
      // The cornerstone, an `each` implementation, aka `forEach`.
      // Handles objects with the built-in `forEach`, arrays, and raw objects.
      // Delegates to **ECMAScript 5**'s native `forEach` if available.
      var each = _.each = _.forEach = function(obj, iterator, context) {
        if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
          obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
          for (var i = 0, l = obj.length; i < l; i++) {
            if (iterator.call(context, obj[i], i, obj) === breaker) return;
          }
        } else {
          for (var key in obj) {
            if (_.has(obj, key)) {
              if (iterator.call(context, obj[key], key, obj) === breaker) return;
            }
          }
        }
      };
    
      // Return the results of applying the iterator to each element.
      // Delegates to **ECMAScript 5**'s native `map` if available.
      _.map = _.collect = function(obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
        each(obj, function(value, index, list) {
          results[results.length] = iterator.call(context, value, index, list);
        });
        return results;
      };
    
      var reduceError = 'Reduce of empty array with no initial value';
    
      // **Reduce** builds up a single result from a list of values, aka `inject`,
      // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
      _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (obj == null) obj = [];
        if (nativeReduce && obj.reduce === nativeReduce) {
          if (context) iterator = _.bind(iterator, context);
          return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
        }
        each(obj, function(value, index, list) {
          if (!initial) {
            memo = value;
            initial = true;
          } else {
            memo = iterator.call(context, memo, value, index, list);
          }
        });
        if (!initial) throw new TypeError(reduceError);
        return memo;
      };
    
      // The right-associative version of reduce, also known as `foldr`.
      // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
      _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (obj == null) obj = [];
        if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
          if (context) iterator = _.bind(iterator, context);
          return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
        }
        var length = obj.length;
        if (length !== +length) {
          var keys = _.keys(obj);
          length = keys.length;
        }
        each(obj, function(value, index, list) {
          index = keys ? keys[--length] : --length;
          if (!initial) {
            memo = obj[index];
            initial = true;
          } else {
            memo = iterator.call(context, memo, obj[index], index, list);
          }
        });
        if (!initial) throw new TypeError(reduceError);
        return memo;
      };
    
      // Return the first value which passes a truth test. Aliased as `detect`.
      _.find = _.detect = function(obj, iterator, context) {
        var result;
        any(obj, function(value, index, list) {
          if (iterator.call(context, value, index, list)) {
            result = value;
            return true;
          }
        });
        return result;
      };
    
      // Return all the elements that pass a truth test.
      // Delegates to **ECMAScript 5**'s native `filter` if available.
      // Aliased as `select`.
      _.filter = _.select = function(obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
        each(obj, function(value, index, list) {
          if (iterator.call(context, value, index, list)) results[results.length] = value;
        });
        return results;
      };
    
      // Return all the elements for which a truth test fails.
      _.reject = function(obj, iterator, context) {
        return _.filter(obj, function(value, index, list) {
          return !iterator.call(context, value, index, list);
        }, context);
      };
    
      // Determine whether all of the elements match a truth test.
      // Delegates to **ECMAScript 5**'s native `every` if available.
      // Aliased as `all`.
      _.every = _.all = function(obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = true;
        if (obj == null) return result;
        if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
        each(obj, function(value, index, list) {
          if (!(result = result && iterator.call(context, value, index, list))) return breaker;
        });
        return !!result;
      };
    
      // Determine if at least one element in the object matches a truth test.
      // Delegates to **ECMAScript 5**'s native `some` if available.
      // Aliased as `any`.
      var any = _.some = _.any = function(obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = false;
        if (obj == null) return result;
        if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
        each(obj, function(value, index, list) {
          if (result || (result = iterator.call(context, value, index, list))) return breaker;
        });
        return !!result;
      };
    
      // Determine if the array or object contains a given value (using `===`).
      // Aliased as `include`.
      _.contains = _.include = function(obj, target) {
        if (obj == null) return false;
        if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
        return any(obj, function(value) {
          return value === target;
        });
      };
    
      // Invoke a method (with arguments) on every item in a collection.
      _.invoke = function(obj, method) {
        var args = slice.call(arguments, 2);
        return _.map(obj, function(value) {
          return (_.isFunction(method) ? method : value[method]).apply(value, args);
        });
      };
    
      // Convenience version of a common use case of `map`: fetching a property.
      _.pluck = function(obj, key) {
        return _.map(obj, function(value){ return value[key]; });
      };
    
      // Convenience version of a common use case of `filter`: selecting only objects
      // with specific `key:value` pairs.
      _.where = function(obj, attrs) {
        if (_.isEmpty(attrs)) return [];
        return _.filter(obj, function(value) {
          for (var key in attrs) {
            if (attrs[key] !== value[key]) return false;
          }
          return true;
        });
      };
    
      // Return the maximum element or (element-based computation).
      // Can't optimize arrays of integers longer than 65,535 elements.
      // See: https://bugs.webkit.org/show_bug.cgi?id=80797
      _.max = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
          return Math.max.apply(Math, obj);
        }
        if (!iterator && _.isEmpty(obj)) return -Infinity;
        var result = {computed : -Infinity, value: -Infinity};
        each(obj, function(value, index, list) {
          var computed = iterator ? iterator.call(context, value, index, list) : value;
          computed >= result.computed && (result = {value : value, computed : computed});
        });
        return result.value;
      };
    
      // Return the minimum element (or element-based computation).
      _.min = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
          return Math.min.apply(Math, obj);
        }
        if (!iterator && _.isEmpty(obj)) return Infinity;
        var result = {computed : Infinity, value: Infinity};
        each(obj, function(value, index, list) {
          var computed = iterator ? iterator.call(context, value, index, list) : value;
          computed < result.computed && (result = {value : value, computed : computed});
        });
        return result.value;
      };
    
      // Shuffle an array.
      _.shuffle = function(obj) {
        var rand;
        var index = 0;
        var shuffled = [];
        each(obj, function(value) {
          rand = _.random(index++);
          shuffled[index - 1] = shuffled[rand];
          shuffled[rand] = value;
        });
        return shuffled;
      };
    
      // An internal function to generate lookup iterators.
      var lookupIterator = function(value) {
        return _.isFunction(value) ? value : function(obj){ return obj[value]; };
      };
    
      // Sort the object's values by a criterion produced by an iterator.
      _.sortBy = function(obj, value, context) {
        var iterator = lookupIterator(value);
        return _.pluck(_.map(obj, function(value, index, list) {
          return {
            value : value,
            index : index,
            criteria : iterator.call(context, value, index, list)
          };
        }).sort(function(left, right) {
          var a = left.criteria;
          var b = right.criteria;
          if (a !== b) {
            if (a > b || a === void 0) return 1;
            if (a < b || b === void 0) return -1;
          }
          return left.index < right.index ? -1 : 1;
        }), 'value');
      };
    
      // An internal function used for aggregate "group by" operations.
      var group = function(obj, value, context, behavior) {
        var result = {};
        var iterator = lookupIterator(value || _.identity);
        each(obj, function(value, index) {
          var key = iterator.call(context, value, index, obj);
          behavior(result, key, value);
        });
        return result;
      };
    
      // Groups the object's values by a criterion. Pass either a string attribute
      // to group by, or a function that returns the criterion.
      _.groupBy = function(obj, value, context) {
        return group(obj, value, context, function(result, key, value) {
          (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
        });
      };
    
      // Counts instances of an object that group by a certain criterion. Pass
      // either a string attribute to count by, or a function that returns the
      // criterion.
      _.countBy = function(obj, value, context) {
        return group(obj, value, context, function(result, key) {
          if (!_.has(result, key)) result[key] = 0;
          result[key]++;
        });
      };
    
      // Use a comparator function to figure out the smallest index at which
      // an object should be inserted so as to maintain order. Uses binary search.
      _.sortedIndex = function(array, obj, iterator, context) {
        iterator = iterator == null ? _.identity : lookupIterator(iterator);
        var value = iterator.call(context, obj);
        var low = 0, high = array.length;
        while (low < high) {
          var mid = (low + high) >>> 1;
          iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
        }
        return low;
      };
    
      // Safely convert anything iterable into a real, live array.
      _.toArray = function(obj) {
        if (!obj) return [];
        if (_.isArray(obj)) return slice.call(obj);
        if (obj.length === +obj.length) return _.map(obj, _.identity);
        return _.values(obj);
      };
    
      // Return the number of elements in an object.
      _.size = function(obj) {
        if (obj == null) return 0;
        return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
      };
    
      // Array Functions
      // ---------------
    
      // Get the first element of an array. Passing **n** will return the first N
      // values in the array. Aliased as `head` and `take`. The **guard** check
      // allows it to work with `_.map`.
      _.first = _.head = _.take = function(array, n, guard) {
        if (array == null) return void 0;
        return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
      };
    
      // Returns everything but the last entry of the array. Especially useful on
      // the arguments object. Passing **n** will return all the values in
      // the array, excluding the last N. The **guard** check allows it to work with
      // `_.map`.
      _.initial = function(array, n, guard) {
        return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
      };
    
      // Get the last element of an array. Passing **n** will return the last N
      // values in the array. The **guard** check allows it to work with `_.map`.
      _.last = function(array, n, guard) {
        if (array == null) return void 0;
        if ((n != null) && !guard) {
          return slice.call(array, Math.max(array.length - n, 0));
        } else {
          return array[array.length - 1];
        }
      };
    
      // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
      // Especially useful on the arguments object. Passing an **n** will return
      // the rest N values in the array. The **guard**
      // check allows it to work with `_.map`.
      _.rest = _.tail = _.drop = function(array, n, guard) {
        return slice.call(array, (n == null) || guard ? 1 : n);
      };
    
      // Trim out all falsy values from an array.
      _.compact = function(array) {
        return _.filter(array, _.identity);
      };
    
      // Internal implementation of a recursive `flatten` function.
      var flatten = function(input, shallow, output) {
        each(input, function(value) {
          if (_.isArray(value)) {
            shallow ? push.apply(output, value) : flatten(value, shallow, output);
          } else {
            output.push(value);
          }
        });
        return output;
      };
    
      // Return a completely flattened version of an array.
      _.flatten = function(array, shallow) {
        return flatten(array, shallow, []);
      };
    
      // Return a version of the array that does not contain the specified value(s).
      _.without = function(array) {
        return _.difference(array, slice.call(arguments, 1));
      };
    
      // Produce a duplicate-free version of the array. If the array has already
      // been sorted, you have the option of using a faster algorithm.
      // Aliased as `unique`.
      _.uniq = _.unique = function(array, isSorted, iterator, context) {
        if (_.isFunction(isSorted)) {
          context = iterator;
          iterator = isSorted;
          isSorted = false;
        }
        var initial = iterator ? _.map(array, iterator, context) : array;
        var results = [];
        var seen = [];
        each(initial, function(value, index) {
          if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
            seen.push(value);
            results.push(array[index]);
          }
        });
        return results;
      };
    
      // Produce an array that contains the union: each distinct element from all of
      // the passed-in arrays.
      _.union = function() {
        return _.uniq(concat.apply(ArrayProto, arguments));
      };
    
      // Produce an array that contains every item shared between all the
      // passed-in arrays.
      _.intersection = function(array) {
        var rest = slice.call(arguments, 1);
        return _.filter(_.uniq(array), function(item) {
          return _.every(rest, function(other) {
            return _.indexOf(other, item) >= 0;
          });
        });
      };
    
      // Take the difference between one array and a number of other arrays.
      // Only the elements present in just the first array will remain.
      _.difference = function(array) {
        var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
        return _.filter(array, function(value){ return !_.contains(rest, value); });
      };
    
      // Zip together multiple lists into a single array -- elements that share
      // an index go together.
      _.zip = function() {
        var args = slice.call(arguments);
        var length = _.max(_.pluck(args, 'length'));
        var results = new Array(length);
        for (var i = 0; i < length; i++) {
          results[i] = _.pluck(args, "" + i);
        }
        return results;
      };
    
      // Converts lists into objects. Pass either a single array of `[key, value]`
      // pairs, or two parallel arrays of the same length -- one of keys, and one of
      // the corresponding values.
      _.object = function(list, values) {
        if (list == null) return {};
        var result = {};
        for (var i = 0, l = list.length; i < l; i++) {
          if (values) {
            result[list[i]] = values[i];
          } else {
            result[list[i][0]] = list[i][1];
          }
        }
        return result;
      };
    
      // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
      // we need this function. Return the position of the first occurrence of an
      // item in an array, or -1 if the item is not included in the array.
      // Delegates to **ECMAScript 5**'s native `indexOf` if available.
      // If the array is large and already in sort order, pass `true`
      // for **isSorted** to use binary search.
      _.indexOf = function(array, item, isSorted) {
        if (array == null) return -1;
        var i = 0, l = array.length;
        if (isSorted) {
          if (typeof isSorted == 'number') {
            i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
          } else {
            i = _.sortedIndex(array, item);
            return array[i] === item ? i : -1;
          }
        }
        if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
        for (; i < l; i++) if (array[i] === item) return i;
        return -1;
      };
    
      // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
      _.lastIndexOf = function(array, item, from) {
        if (array == null) return -1;
        var hasIndex = from != null;
        if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
          return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
        }
        var i = (hasIndex ? from : array.length);
        while (i--) if (array[i] === item) return i;
        return -1;
      };
    
      // Generate an integer Array containing an arithmetic progression. A port of
      // the native Python `range()` function. See
      // [the Python documentation](http://docs.python.org/library/functions.html#range).
      _.range = function(start, stop, step) {
        if (arguments.length <= 1) {
          stop = start || 0;
          start = 0;
        }
        step = arguments[2] || 1;
    
        var len = Math.max(Math.ceil((stop - start) / step), 0);
        var idx = 0;
        var range = new Array(len);
    
        while(idx < len) {
          range[idx++] = start;
          start += step;
        }
    
        return range;
      };
    
      // Function (ahem) Functions
      // ------------------
    
      // Reusable constructor function for prototype setting.
      var ctor = function(){};
    
      // Create a function bound to a given object (assigning `this`, and arguments,
      // optionally). Binding with arguments is also known as `curry`.
      // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
      // We check for `func.bind` first, to fail fast when `func` is undefined.
      _.bind = function(func, context) {
        var args, bound;
        if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
        if (!_.isFunction(func)) throw new TypeError;
        args = slice.call(arguments, 2);
        return bound = function() {
          if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
          ctor.prototype = func.prototype;
          var self = new ctor;
          ctor.prototype = null;
          var result = func.apply(self, args.concat(slice.call(arguments)));
          if (Object(result) === result) return result;
          return self;
        };
      };
    
      // Bind all of an object's methods to that object. Useful for ensuring that
      // all callbacks defined on an object belong to it.
      _.bindAll = function(obj) {
        var funcs = slice.call(arguments, 1);
        if (funcs.length == 0) funcs = _.functions(obj);
        each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
        return obj;
      };
    
      // Memoize an expensive function by storing its results.
      _.memoize = function(func, hasher) {
        var memo = {};
        hasher || (hasher = _.identity);
        return function() {
          var key = hasher.apply(this, arguments);
          return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
        };
      };
    
      // Delays a function for the given number of milliseconds, and then calls
      // it with the arguments supplied.
      _.delay = function(func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function(){ return func.apply(null, args); }, wait);
      };
    
      // Defers a function, scheduling it to run after the current call stack has
      // cleared.
      _.defer = function(func) {
        return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
      };
    
      // Returns a function, that, when invoked, will only be triggered at most once
      // during a given window of time.
      _.throttle = function(func, wait) {
        var context, args, timeout, result;
        var previous = 0;
        var later = function() {
          previous = new Date;
          timeout = null;
          result = func.apply(context, args);
        };
        return function() {
          var now = new Date;
          var remaining = wait - (now - previous);
          context = this;
          args = arguments;
          if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
          } else if (!timeout) {
            timeout = setTimeout(later, remaining);
          }
          return result;
        };
      };
    
      // Returns a function, that, as long as it continues to be invoked, will not
      // be triggered. The function will be called after it stops being called for
      // N milliseconds. If `immediate` is passed, trigger the function on the
      // leading edge, instead of the trailing.
      _.debounce = function(func, wait, immediate) {
        var timeout, result;
        return function() {
          var context = this, args = arguments;
          var later = function() {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) result = func.apply(context, args);
          return result;
        };
      };
    
      // Returns a function that will be executed at most one time, no matter how
      // often you call it. Useful for lazy initialization.
      _.once = function(func) {
        var ran = false, memo;
        return function() {
          if (ran) return memo;
          ran = true;
          memo = func.apply(this, arguments);
          func = null;
          return memo;
        };
      };
    
      // Returns the first function passed as an argument to the second,
      // allowing you to adjust arguments, run code before and after, and
      // conditionally execute the original function.
      _.wrap = function(func, wrapper) {
        return function() {
          var args = [func];
          push.apply(args, arguments);
          return wrapper.apply(this, args);
        };
      };
    
      // Returns a function that is the composition of a list of functions, each
      // consuming the return value of the function that follows.
      _.compose = function() {
        var funcs = arguments;
        return function() {
          var args = arguments;
          for (var i = funcs.length - 1; i >= 0; i--) {
            args = [funcs[i].apply(this, args)];
          }
          return args[0];
        };
      };
    
      // Returns a function that will only be executed after being called N times.
      _.after = function(times, func) {
        if (times <= 0) return func();
        return function() {
          if (--times < 1) {
            return func.apply(this, arguments);
          }
        };
      };
    
      // Object Functions
      // ----------------
    
      // Retrieve the names of an object's properties.
      // Delegates to **ECMAScript 5**'s native `Object.keys`
      _.keys = nativeKeys || function(obj) {
        if (obj !== Object(obj)) throw new TypeError('Invalid object');
        var keys = [];
        for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
        return keys;
      };
    
      // Retrieve the values of an object's properties.
      _.values = function(obj) {
        var values = [];
        for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
        return values;
      };
    
      // Convert an object into a list of `[key, value]` pairs.
      _.pairs = function(obj) {
        var pairs = [];
        for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
        return pairs;
      };
    
      // Invert the keys and values of an object. The values must be serializable.
      _.invert = function(obj) {
        var result = {};
        for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
        return result;
      };
    
      // Return a sorted list of the function names available on the object.
      // Aliased as `methods`
      _.functions = _.methods = function(obj) {
        var names = [];
        for (var key in obj) {
          if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
      };
    
      // Extend a given object with all the properties in passed-in object(s).
      _.extend = function(obj) {
        each(slice.call(arguments, 1), function(source) {
          if (source) {
            for (var prop in source) {
              obj[prop] = source[prop];
            }
          }
        });
        return obj;
      };
    
      // Return a copy of the object only containing the whitelisted properties.
      _.pick = function(obj) {
        var copy = {};
        var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        each(keys, function(key) {
          if (key in obj) copy[key] = obj[key];
        });
        return copy;
      };
    
       // Return a copy of the object without the blacklisted properties.
      _.omit = function(obj) {
        var copy = {};
        var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        for (var key in obj) {
          if (!_.contains(keys, key)) copy[key] = obj[key];
        }
        return copy;
      };
    
      // Fill in a given object with default properties.
      _.defaults = function(obj) {
        each(slice.call(arguments, 1), function(source) {
          if (source) {
            for (var prop in source) {
              if (obj[prop] == null) obj[prop] = source[prop];
            }
          }
        });
        return obj;
      };
    
      // Create a (shallow-cloned) duplicate of an object.
      _.clone = function(obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
      };
    
      // Invokes interceptor with the obj, and then returns obj.
      // The primary purpose of this method is to "tap into" a method chain, in
      // order to perform operations on intermediate results within the chain.
      _.tap = function(obj, interceptor) {
        interceptor(obj);
        return obj;
      };
    
      // Internal recursive comparison function for `isEqual`.
      var eq = function(a, b, aStack, bStack) {
        // Identical objects are equal. `0 === -0`, but they aren't identical.
        // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
        if (a === b) return a !== 0 || 1 / a == 1 / b;
        // A strict comparison is necessary because `null == undefined`.
        if (a == null || b == null) return a === b;
        // Unwrap any wrapped objects.
        if (a instanceof _) a = a._wrapped;
        if (b instanceof _) b = b._wrapped;
        // Compare `[[Class]]` names.
        var className = toString.call(a);
        if (className != toString.call(b)) return false;
        switch (className) {
          // Strings, numbers, dates, and booleans are compared by value.
          case '[object String]':
            // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
            // equivalent to `new String("5")`.
            return a == String(b);
          case '[object Number]':
            // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
            // other numeric values.
            return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
          case '[object Date]':
          case '[object Boolean]':
            // Coerce dates and booleans to numeric primitive values. Dates are compared by their
            // millisecond representations. Note that invalid dates with millisecond representations
            // of `NaN` are not equivalent.
            return +a == +b;
          // RegExps are compared by their source patterns and flags.
          case '[object RegExp]':
            return a.source == b.source &&
                   a.global == b.global &&
                   a.multiline == b.multiline &&
                   a.ignoreCase == b.ignoreCase;
        }
        if (typeof a != 'object' || typeof b != 'object') return false;
        // Assume equality for cyclic structures. The algorithm for detecting cyclic
        // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
        var length = aStack.length;
        while (length--) {
          // Linear search. Performance is inversely proportional to the number of
          // unique nested structures.
          if (aStack[length] == a) return bStack[length] == b;
        }
        // Add the first object to the stack of traversed objects.
        aStack.push(a);
        bStack.push(b);
        var size = 0, result = true;
        // Recursively compare objects and arrays.
        if (className == '[object Array]') {
          // Compare array lengths to determine if a deep comparison is necessary.
          size = a.length;
          result = size == b.length;
          if (result) {
            // Deep compare the contents, ignoring non-numeric properties.
            while (size--) {
              if (!(result = eq(a[size], b[size], aStack, bStack))) break;
            }
          }
        } else {
          // Objects with different constructors are not equivalent, but `Object`s
          // from different frames are.
          var aCtor = a.constructor, bCtor = b.constructor;
          if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                                   _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
            return false;
          }
          // Deep compare objects.
          for (var key in a) {
            if (_.has(a, key)) {
              // Count the expected number of properties.
              size++;
              // Deep compare each member.
              if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
            }
          }
          // Ensure that both objects contain the same number of properties.
          if (result) {
            for (key in b) {
              if (_.has(b, key) && !(size--)) break;
            }
            result = !size;
          }
        }
        // Remove the first object from the stack of traversed objects.
        aStack.pop();
        bStack.pop();
        return result;
      };
    
      // Perform a deep comparison to check if two objects are equal.
      _.isEqual = function(a, b) {
        return eq(a, b, [], []);
      };
    
      // Is a given array, string, or object empty?
      // An "empty" object has no enumerable own-properties.
      _.isEmpty = function(obj) {
        if (obj == null) return true;
        if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
        for (var key in obj) if (_.has(obj, key)) return false;
        return true;
      };
    
      // Is a given value a DOM element?
      _.isElement = function(obj) {
        return !!(obj && obj.nodeType === 1);
      };
    
      // Is a given value an array?
      // Delegates to ECMA5's native Array.isArray
      _.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) == '[object Array]';
      };
    
      // Is a given variable an object?
      _.isObject = function(obj) {
        return obj === Object(obj);
      };
    
      // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
      each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
        _['is' + name] = function(obj) {
          return toString.call(obj) == '[object ' + name + ']';
        };
      });
    
      // Define a fallback version of the method in browsers (ahem, IE), where
      // there isn't any inspectable "Arguments" type.
      if (!_.isArguments(arguments)) {
        _.isArguments = function(obj) {
          return !!(obj && _.has(obj, 'callee'));
        };
      }
    
      // Optimize `isFunction` if appropriate.
      if (typeof (/./) !== 'function') {
        _.isFunction = function(obj) {
          return typeof obj === 'function';
        };
      }
    
      // Is a given object a finite number?
      _.isFinite = function(obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
      };
    
      // Is the given value `NaN`? (NaN is the only number which does not equal itself).
      _.isNaN = function(obj) {
        return _.isNumber(obj) && obj != +obj;
      };
    
      // Is a given value a boolean?
      _.isBoolean = function(obj) {
        return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
      };
    
      // Is a given value equal to null?
      _.isNull = function(obj) {
        return obj === null;
      };
    
      // Is a given variable undefined?
      _.isUndefined = function(obj) {
        return obj === void 0;
      };
    
      // Shortcut function for checking if an object has a given property directly
      // on itself (in other words, not on a prototype).
      _.has = function(obj, key) {
        return hasOwnProperty.call(obj, key);
      };
    
      // Utility Functions
      // -----------------
    
      // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
      // previous owner. Returns a reference to the Underscore object.
      _.noConflict = function() {
        root._ = previousUnderscore;
        return this;
      };
    
      // Keep the identity function around for default iterators.
      _.identity = function(value) {
        return value;
      };
    
      // Run a function **n** times.
      _.times = function(n, iterator, context) {
        var accum = Array(n);
        for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
        return accum;
      };
    
      // Return a random integer between min and max (inclusive).
      _.random = function(min, max) {
        if (max == null) {
          max = min;
          min = 0;
        }
        return min + (0 | Math.random() * (max - min + 1));
      };
    
      // List of HTML entities for escaping.
      var entityMap = {
        escape: {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          '/': '&#x2F;'
        }
      };
      entityMap.unescape = _.invert(entityMap.escape);
    
      // Regexes containing the keys and values listed immediately above.
      var entityRegexes = {
        escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
        unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
      };
    
      // Functions for escaping and unescaping strings to/from HTML interpolation.
      _.each(['escape', 'unescape'], function(method) {
        _[method] = function(string) {
          if (string == null) return '';
          return ('' + string).replace(entityRegexes[method], function(match) {
            return entityMap[method][match];
          });
        };
      });
    
      // If the value of the named property is a function then invoke it;
      // otherwise, return it.
      _.result = function(object, property) {
        if (object == null) return null;
        var value = object[property];
        return _.isFunction(value) ? value.call(object) : value;
      };
    
      // Add your own custom functions to the Underscore object.
      _.mixin = function(obj) {
        each(_.functions(obj), function(name){
          var func = _[name] = obj[name];
          _.prototype[name] = function() {
            var args = [this._wrapped];
            push.apply(args, arguments);
            return result.call(this, func.apply(_, args));
          };
        });
      };
    
      // Generate a unique integer id (unique within the entire client session).
      // Useful for temporary DOM ids.
      var idCounter = 0;
      _.uniqueId = function(prefix) {
        var id = '' + ++idCounter;
        return prefix ? prefix + id : id;
      };
    
      // By default, Underscore uses ERB-style template delimiters, change the
      // following template settings to use alternative delimiters.
      _.templateSettings = {
        evaluate    : /<%([\s\S]+?)%>/g,
        interpolate : /<%=([\s\S]+?)%>/g,
        escape      : /<%-([\s\S]+?)%>/g
      };
    
      // When customizing `templateSettings`, if you don't want to define an
      // interpolation, evaluation or escaping regex, we need one that is
      // guaranteed not to match.
      var noMatch = /(.)^/;
    
      // Certain characters need to be escaped so that they can be put into a
      // string literal.
      var escapes = {
        "'":      "'",
        '\\':     '\\',
        '\r':     'r',
        '\n':     'n',
        '\t':     't',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
      };
    
      var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    
      // JavaScript micro-templating, similar to John Resig's implementation.
      // Underscore templating handles arbitrary delimiters, preserves whitespace,
      // and correctly escapes quotes within interpolated code.
      _.template = function(text, data, settings) {
        settings = _.defaults({}, settings, _.templateSettings);
    
        // Combine delimiters into one regular expression via alternation.
        var matcher = new RegExp([
          (settings.escape || noMatch).source,
          (settings.interpolate || noMatch).source,
          (settings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');
    
        // Compile the template source, escaping string literals appropriately.
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
          source += text.slice(index, offset)
            .replace(escaper, function(match) { return '\\' + escapes[match]; });
    
          if (escape) {
            source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
          }
          if (interpolate) {
            source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
          }
          if (evaluate) {
            source += "';\n" + evaluate + "\n__p+='";
          }
          index = offset + match.length;
          return match;
        });
        source += "';\n";
    
        // If a variable is not specified, place data values in local scope.
        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
    
        source = "var __t,__p='',__j=Array.prototype.join," +
          "print=function(){__p+=__j.call(arguments,'');};\n" +
          source + "return __p;\n";
    
        try {
          var render = new Function(settings.variable || 'obj', '_', source);
        } catch (e) {
          e.source = source;
          throw e;
        }
    
        if (data) return render(data, _);
        var template = function(data) {
          return render.call(this, data, _);
        };
    
        // Provide the compiled function source as a convenience for precompilation.
        template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';
    
        return template;
      };
    
      // Add a "chain" function, which will delegate to the wrapper.
      _.chain = function(obj) {
        return _(obj).chain();
      };
    
      // OOP
      // ---------------
      // If Underscore is called as a function, it returns a wrapped object that
      // can be used OO-style. This wrapper holds altered versions of all the
      // underscore functions. Wrapped objects may be chained.
    
      // Helper function to continue chaining intermediate results.
      var result = function(obj) {
        return this._chain ? _(obj).chain() : obj;
      };
    
      // Add all of the Underscore functions to the wrapper object.
      _.mixin(_);
    
      // Add all mutator Array functions to the wrapper.
      each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
          var obj = this._wrapped;
          method.apply(obj, arguments);
          if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
          return result.call(this, obj);
        };
      });
    
      // Add all accessor Array functions to the wrapper.
      each(['concat', 'join', 'slice'], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
          return result.call(this, method.apply(this._wrapped, arguments));
        };
      });
    
      _.extend(_.prototype, {
    
        // Start chaining a wrapped Underscore object.
        chain: function() {
          this._chain = true;
          return this;
        },
    
        // Extracts the result from a wrapped and chained object.
        value: function() {
          return this._wrapped;
        }
    
      });
    
    }).call(this);
    
    /* Zepto v1.0rc1 - polyfill zepto event detect fx ajax form touch - zeptojs.com/license */
    ;(function(undefined){
      if (String.prototype.trim === undefined) // fix for iOS 3.2
        String.prototype.trim = function(){ return this.replace(/^\s+/, '').replace(/\s+$/, '') }
    
      // For iOS 3.x
      // from https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduce
      if (Array.prototype.reduce === undefined)
        Array.prototype.reduce = function(fun){
          if(this === void 0 || this === null) throw new TypeError()
          var t = Object(this), len = t.length >>> 0, k = 0, accumulator
          if(typeof fun != 'function') throw new TypeError()
          if(len == 0 && arguments.length == 1) throw new TypeError()
    
          if(arguments.length >= 2)
           accumulator = arguments[1]
          else
            do{
              if(k in t){
                accumulator = t[k++]
                break
              }
              if(++k >= len) throw new TypeError()
            } while (true)
    
          while (k < len){
            if(k in t) accumulator = fun.call(undefined, accumulator, t[k], k, t)
            k++
          }
          return accumulator
        }
    
    })()
    var Zepto = (function() {
      var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice,
        document = window.document,
        elementDisplay = {}, classCache = {},
        getComputedStyle = document.defaultView.getComputedStyle,
        cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
        fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    
        // Used by `$.zepto.init` to wrap elements, text/comment nodes, document,
        // and document fragment node types.
        elementTypes = [1, 3, 8, 9, 11],
    
        adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
        table = document.createElement('table'),
        tableRow = document.createElement('tr'),
        containers = {
          'tr': document.createElement('tbody'),
          'tbody': table, 'thead': table, 'tfoot': table,
          'td': tableRow, 'th': tableRow,
          '*': document.createElement('div')
        },
        readyRE = /complete|loaded|interactive/,
        classSelectorRE = /^\.([\w-]+)$/,
        idSelectorRE = /^#([\w-]+)$/,
        tagSelectorRE = /^[\w-]+$/,
        toString = ({}).toString,
        zepto = {},
        camelize, uniq,
        tempParent = document.createElement('div')
    
      zepto.matches = function(element, selector) {
        if (!element || element.nodeType !== 1) return false
        var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
                              element.oMatchesSelector || element.matchesSelector
        if (matchesSelector) return matchesSelector.call(element, selector)
        // fall back to performing a selector:
        var match, parent = element.parentNode, temp = !parent
        if (temp) (parent = tempParent).appendChild(element)
        match = ~zepto.qsa(parent, selector).indexOf(element)
        temp && tempParent.removeChild(element)
        return match
      }
    
      function isFunction(value) { return toString.call(value) == "[object Function]" }
      function isObject(value) { return value instanceof Object }
      function isPlainObject(value) {
        var key, ctor
        if (toString.call(value) !== "[object Object]") return false
        ctor = (isFunction(value.constructor) && value.constructor.prototype)
        if (!ctor || !hasOwnProperty.call(ctor, 'isPrototypeOf')) return false
        for (key in value);
        return key === undefined || hasOwnProperty.call(value, key)
      }
      function isArray(value) { return value instanceof Array }
      function likeArray(obj) { return typeof obj.length == 'number' }
    
      function compact(array) { return array.filter(function(item){ return item !== undefined && item !== null }) }
      function flatten(array) { return array.length > 0 ? [].concat.apply([], array) : array }
      camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
      function dasherize(str) {
        return str.replace(/::/g, '/')
               .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
               .replace(/([a-z\d])([A-Z])/g, '$1_$2')
               .replace(/_/g, '-')
               .toLowerCase()
      }
      uniq = function(array){ return array.filter(function(item, idx){ return array.indexOf(item) == idx }) }
    
      function classRE(name) {
        return name in classCache ?
          classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
      }
    
      function maybeAddPx(name, value) {
        return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
      }
    
      function defaultDisplay(nodeName) {
        var element, display
        if (!elementDisplay[nodeName]) {
          element = document.createElement(nodeName)
          document.body.appendChild(element)
          display = getComputedStyle(element, '').getPropertyValue("display")
          element.parentNode.removeChild(element)
          display == "none" && (display = "block")
          elementDisplay[nodeName] = display
        }
        return elementDisplay[nodeName]
      }
    
      // `$.zepto.fragment` takes a html string and an optional tag name
      // to generate DOM nodes nodes from the given html string.
      // The generated DOM nodes are returned as an array.
      // This function can be overriden in plugins for example to make
      // it compatible with browsers that don't support the DOM fully.
      zepto.fragment = function(html, name) {
        if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
        if (!(name in containers)) name = '*'
        var container = containers[name]
        container.innerHTML = '' + html
        return $.each(slice.call(container.childNodes), function(){
          container.removeChild(this)
        })
      }
    
      // `$.zepto.Z` swaps out the prototype of the given `dom` array
      // of nodes with `$.fn` and thus supplying all the Zepto functions
      // to the array. Note that `__proto__` is not supported on Internet
      // Explorer. This method can be overriden in plugins.
      zepto.Z = function(dom, selector) {
        dom = dom || []
        dom.__proto__ = arguments.callee.prototype
        dom.selector = selector || ''
        return dom
      }
    
      // `$.zepto.isZ` should return `true` if the given object is a Zepto
      // collection. This method can be overriden in plugins.
      zepto.isZ = function(object) {
        return object instanceof zepto.Z
      }
    
      // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
      // takes a CSS selector and an optional context (and handles various
      // special cases).
      // This method can be overriden in plugins.
      zepto.init = function(selector, context) {
        // If nothing given, return an empty Zepto collection
        if (!selector) return zepto.Z()
        // If a function is given, call it when the DOM is ready
        else if (isFunction(selector)) return $(document).ready(selector)
        // If a Zepto collection is given, juts return it
        else if (zepto.isZ(selector)) return selector
        else {
          var dom
          // normalize array if an array of nodes is given
          if (isArray(selector)) dom = compact(selector)
          // if a JavaScript object is given, return a copy of it
          // this is a somewhat peculiar option, but supported by
          // jQuery so we'll do it, too
          else if (isPlainObject(selector))
            dom = [$.extend({}, selector)], selector = null
          // wrap stuff like `document` or `window`
          else if (elementTypes.indexOf(selector.nodeType) >= 0 || selector === window)
            dom = [selector], selector = null
          // If it's a html fragment, create nodes from it
          else if (fragmentRE.test(selector))
            dom = zepto.fragment(selector.trim(), RegExp.$1), selector = null
          // If there's a context, create a collection on that context first, and select
          // nodes from there
          else if (context !== undefined) return $(context).find(selector)
          // And last but no least, if it's a CSS selector, use it to select nodes.
          else dom = zepto.qsa(document, selector)
          // create a new Zepto collection from the nodes found
          return zepto.Z(dom, selector)
        }
      }
    
      // `$` will be the base `Zepto` object. When calling this
      // function just call `$.zepto.init, whichs makes the implementation
      // details of selecting nodes and creating Zepto collections
      // patchable in plugins.
      $ = function(selector, context){
        return zepto.init(selector, context)
      }
    
      // Copy all but undefined properties from one or more
      // objects to the `target` object.
      $.extend = function(target){
        slice.call(arguments, 1).forEach(function(source) {
          for (key in source)
            if (source[key] !== undefined)
              target[key] = source[key]
        })
        return target
      }
    
      // `$.zepto.qsa` is Zepto's CSS selector implementation which
      // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
      // This method can be overriden in plugins.
      zepto.qsa = function(element, selector){
        var found
        return (element === document && idSelectorRE.test(selector)) ?
          ( (found = element.getElementById(RegExp.$1)) ? [found] : emptyArray ) :
          (element.nodeType !== 1 && element.nodeType !== 9) ? emptyArray :
          slice.call(
            classSelectorRE.test(selector) ? element.getElementsByClassName(RegExp.$1) :
            tagSelectorRE.test(selector) ? element.getElementsByTagName(selector) :
            element.querySelectorAll(selector)
          )
      }
    
      function filtered(nodes, selector) {
        return selector === undefined ? $(nodes) : $(nodes).filter(selector)
      }
    
      function funcArg(context, arg, idx, payload) {
       return isFunction(arg) ? arg.call(context, idx, payload) : arg
      }
    
      $.isFunction = isFunction
      $.isObject = isObject
      $.isArray = isArray
      $.isPlainObject = isPlainObject
    
      $.inArray = function(elem, array, i){
        return emptyArray.indexOf.call(array, elem, i)
      }
    
      $.trim = function(str) { return str.trim() }
    
      // plugin compatibility
      $.uuid = 0
    
      $.map = function(elements, callback){
        var value, values = [], i, key
        if (likeArray(elements))
          for (i = 0; i < elements.length; i++) {
            value = callback(elements[i], i)
            if (value != null) values.push(value)
          }
        else
          for (key in elements) {
            value = callback(elements[key], key)
            if (value != null) values.push(value)
          }
        return flatten(values)
      }
    
      $.each = function(elements, callback){
        var i, key
        if (likeArray(elements)) {
          for (i = 0; i < elements.length; i++)
            if (callback.call(elements[i], i, elements[i]) === false) return elements
        } else {
          for (key in elements)
            if (callback.call(elements[key], key, elements[key]) === false) return elements
        }
    
        return elements
      }
    
      // Define methods that will be available on all
      // Zepto collections
      $.fn = {
        // Because a collection acts like an array
        // copy over these useful array functions.
        forEach: emptyArray.forEach,
        reduce: emptyArray.reduce,
        push: emptyArray.push,
        indexOf: emptyArray.indexOf,
        concat: emptyArray.concat,
    
        // `map` and `slice` in the jQuery API work differently
        // from their array counterparts
        map: function(fn){
          return $.map(this, function(el, i){ return fn.call(el, i, el) })
        },
        slice: function(){
          return $(slice.apply(this, arguments))
        },
    
        ready: function(callback){
          if (readyRE.test(document.readyState)) callback($)
          else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
          return this
        },
        get: function(idx){
          return idx === undefined ? slice.call(this) : this[idx]
        },
        toArray: function(){ return this.get() },
        size: function(){
          return this.length
        },
        remove: function(){
          return this.each(function(){
            if (this.parentNode != null)
              this.parentNode.removeChild(this)
          })
        },
        each: function(callback){
          this.forEach(function(el, idx){ callback.call(el, idx, el) })
          return this
        },
        filter: function(selector){
          return $([].filter.call(this, function(element){
            return zepto.matches(element, selector)
          }))
        },
        add: function(selector,context){
          return $(uniq(this.concat($(selector,context))))
        },
        is: function(selector){
          return this.length > 0 && zepto.matches(this[0], selector)
        },
        not: function(selector){
          var nodes=[]
          if (isFunction(selector) && selector.call !== undefined)
            this.each(function(idx){
              if (!selector.call(this,idx)) nodes.push(this)
            })
          else {
            var excludes = typeof selector == 'string' ? this.filter(selector) :
              (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
            this.forEach(function(el){
              if (excludes.indexOf(el) < 0) nodes.push(el)
            })
          }
          return $(nodes)
        },
        eq: function(idx){
          return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
        },
        first: function(){
          var el = this[0]
          return el && !isObject(el) ? el : $(el)
        },
        last: function(){
          var el = this[this.length - 1]
          return el && !isObject(el) ? el : $(el)
        },
        find: function(selector){
          var result
          if (this.length == 1) result = zepto.qsa(this[0], selector)
          else result = this.map(function(){ return zepto.qsa(this, selector) })
          return $(result)
        },
        closest: function(selector, context){
          var node = this[0]
          while (node && !zepto.matches(node, selector))
            node = node !== context && node !== document && node.parentNode
          return $(node)
        },
        parents: function(selector){
          var ancestors = [], nodes = this
          while (nodes.length > 0)
            nodes = $.map(nodes, function(node){
              if ((node = node.parentNode) && node !== document && ancestors.indexOf(node) < 0) {
                ancestors.push(node)
                return node
              }
            })
          return filtered(ancestors, selector)
        },
        parent: function(selector){
          return filtered(uniq(this.pluck('parentNode')), selector)
        },
        children: function(selector){
          return filtered(this.map(function(){ return slice.call(this.children) }), selector)
        },
        siblings: function(selector){
          return filtered(this.map(function(i, el){
            return slice.call(el.parentNode.children).filter(function(child){ return child!==el })
          }), selector)
        },
        empty: function(){
          return this.each(function(){ this.innerHTML = '' })
        },
        // `pluck` is borrowed from Prototype.js
        pluck: function(property){
          return this.map(function(){ return this[property] })
        },
        show: function(){
          return this.each(function(){
            this.style.display == "none" && (this.style.display = null)
            if (getComputedStyle(this, '').getPropertyValue("display") == "none")
              this.style.display = defaultDisplay(this.nodeName)
          })
        },
        replaceWith: function(newContent){
          return this.before(newContent).remove()
        },
        wrap: function(newContent){
          return this.each(function(){
            $(this).wrapAll($(newContent)[0].cloneNode(false))
          })
        },
        wrapAll: function(newContent){
          if (this[0]) {
            $(this[0]).before(newContent = $(newContent))
            newContent.append(this)
          }
          return this
        },
        unwrap: function(){
          this.parent().each(function(){
            $(this).replaceWith($(this).children())
          })
          return this
        },
        clone: function(){
          return $(this.map(function(){ return this.cloneNode(true) }))
        },
        hide: function(){
          return this.css("display", "none")
        },
        toggle: function(setting){
          return (setting === undefined ? this.css("display") == "none" : setting) ? this.show() : this.hide()
        },
        prev: function(){ return $(this.pluck('previousElementSibling')) },
        next: function(){ return $(this.pluck('nextElementSibling')) },
        html: function(html){
          return html === undefined ?
            (this.length > 0 ? this[0].innerHTML : null) :
            this.each(function(idx){
              var originHtml = this.innerHTML
              $(this).empty().append( funcArg(this, html, idx, originHtml) )
            })
        },
        text: function(text){
          return text === undefined ?
            (this.length > 0 ? this[0].textContent : null) :
            this.each(function(){ this.textContent = text })
        },
        attr: function(name, value){
          var result
          return (typeof name == 'string' && value === undefined) ?
            (this.length == 0 || this[0].nodeType !== 1 ? undefined :
              (name == 'value' && this[0].nodeName == 'INPUT') ? this.val() :
              (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
            ) :
            this.each(function(idx){
              if (this.nodeType !== 1) return
              if (isObject(name)) for (key in name) this.setAttribute(key, name[key])
              else this.setAttribute(name, funcArg(this, value, idx, this.getAttribute(name)))
            })
        },
        removeAttr: function(name){
          return this.each(function(){ if (this.nodeType === 1) this.removeAttribute(name) })
        },
        prop: function(name, value){
          return (value === undefined) ?
            (this[0] ? this[0][name] : undefined) :
            this.each(function(idx){
              this[name] = funcArg(this, value, idx, this[name])
            })
        },
        data: function(name, value){
          var data = this.attr('data-' + dasherize(name), value)
          return data !== null ? data : undefined
        },
        val: function(value){
          return (value === undefined) ?
            (this.length > 0 ? this[0].value : undefined) :
            this.each(function(idx){
              this.value = funcArg(this, value, idx, this.value)
            })
        },
        offset: function(){
          if (this.length==0) return null
          var obj = this[0].getBoundingClientRect()
          return {
            left: obj.left + window.pageXOffset,
            top: obj.top + window.pageYOffset,
            width: obj.width,
            height: obj.height
          }
        },
        css: function(property, value){
          if (value === undefined && typeof property == 'string')
            return (
              this.length == 0
                ? undefined
                : this[0].style[camelize(property)] || getComputedStyle(this[0], '').getPropertyValue(property))
    
          var css = ''
          for (key in property)
            if(typeof property[key] == 'string' && property[key] == '')
              this.each(function(){ this.style.removeProperty(dasherize(key)) })
            else
              css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
    
          if (typeof property == 'string')
            if (value == '')
              this.each(function(){ this.style.removeProperty(dasherize(property)) })
            else
              css = dasherize(property) + ":" + maybeAddPx(property, value)
    
          return this.each(function(){ this.style.cssText += ';' + css })
        },
        index: function(element){
          return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function(name){
          if (this.length < 1) return false
          else return classRE(name).test(this[0].className)
        },
        addClass: function(name){
          return this.each(function(idx){
            classList = []
            var cls = this.className, newName = funcArg(this, name, idx, cls)
            newName.split(/\s+/g).forEach(function(klass){
              if (!$(this).hasClass(klass)) classList.push(klass)
            }, this)
            classList.length && (this.className += (cls ? " " : "") + classList.join(" "))
          })
        },
        removeClass: function(name){
          return this.each(function(idx){
            if (name === undefined)
              return this.className = ''
            classList = this.className
            funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
              classList = classList.replace(classRE(klass), " ")
            })
            this.className = classList.trim()
          })
        },
        toggleClass: function(name, when){
          return this.each(function(idx){
            var newName = funcArg(this, name, idx, this.className)
            ;(when === undefined ? !$(this).hasClass(newName) : when) ?
              $(this).addClass(newName) : $(this).removeClass(newName)
          })
        }
      }
    
      // Generate the `width` and `height` functions
      ;['width', 'height'].forEach(function(dimension){
        $.fn[dimension] = function(value){
          var offset, Dimension = dimension.replace(/./, function(m){ return m[0].toUpperCase() })
          if (value === undefined) return this[0] == window ? window['inner' + Dimension] :
            this[0] == document ? document.documentElement['offset' + Dimension] :
            (offset = this.offset()) && offset[dimension]
          else return this.each(function(idx){
            var el = $(this)
            el.css(dimension, funcArg(this, value, idx, el[dimension]()))
          })
        }
      })
    
      function insert(operator, target, node) {
        var parent = (operator % 2) ? target : target.parentNode
        parent ? parent.insertBefore(node,
          !operator ? target.nextSibling :      // after
          operator == 1 ? parent.firstChild :   // prepend
          operator == 2 ? target :              // before
          null) :                               // append
          $(node).remove()
      }
    
      function traverseNode(node, fun) {
        fun(node)
        for (var key in node.childNodes) traverseNode(node.childNodes[key], fun)
      }
    
      // Generate the `after`, `prepend`, `before`, `append`,
      // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
      adjacencyOperators.forEach(function(key, operator) {
        $.fn[key] = function(){
          // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
          var nodes = $.map(arguments, function(n){ return isObject(n) ? n : zepto.fragment(n) })
          if (nodes.length < 1) return this
          var size = this.length, copyByClone = size > 1, inReverse = operator < 2
    
          return this.each(function(index, target){
            for (var i = 0; i < nodes.length; i++) {
              var node = nodes[inReverse ? nodes.length-i-1 : i]
              traverseNode(node, function(node){
                if (node.nodeName != null && node.nodeName.toUpperCase() === 'SCRIPT' && (!node.type || node.type === 'text/javascript'))
                  window['eval'].call(window, node.innerHTML)
              })
              if (copyByClone && index < size - 1) node = node.cloneNode(true)
              insert(operator, target, node)
            }
          })
        }
    
        $.fn[(operator % 2) ? key+'To' : 'insert'+(operator ? 'Before' : 'After')] = function(html){
          $(html)[key](this)
          return this
        }
      })
    
      zepto.Z.prototype = $.fn
    
      // Export internal API functions in the `$.zepto` namespace
      zepto.camelize = camelize
      zepto.uniq = uniq
      $.zepto = zepto
    
      return $
    })()
    
    // If `$` is not yet defined, point it to `Zepto`
    window.Zepto = Zepto
    '$' in window || (window.$ = Zepto)
    ;(function($){
      var $$ = $.zepto.qsa, handlers = {}, _zid = 1, specialEvents={}
    
      specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'
    
      function zid(element) {
        return element._zid || (element._zid = _zid++)
      }
      function findHandlers(element, event, fn, selector) {
        event = parse(event)
        if (event.ns) var matcher = matcherFor(event.ns)
        return (handlers[zid(element)] || []).filter(function(handler) {
          return handler
            && (!event.e  || handler.e == event.e)
            && (!event.ns || matcher.test(handler.ns))
            && (!fn       || zid(handler.fn) === zid(fn))
            && (!selector || handler.sel == selector)
        })
      }
      function parse(event) {
        var parts = ('' + event).split('.')
        return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
      }
      function matcherFor(ns) {
        return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
      }
    
      function eachEvent(events, fn, iterator){
        if ($.isObject(events)) $.each(events, iterator)
        else events.split(/\s/).forEach(function(type){ iterator(type, fn) })
      }
    
      function add(element, events, fn, selector, getDelegate, capture){
        capture = !!capture
        var id = zid(element), set = (handlers[id] || (handlers[id] = []))
        eachEvent(events, fn, function(event, fn){
          var delegate = getDelegate && getDelegate(fn, event),
            callback = delegate || fn
          var proxyfn = function (event) {
            var result = callback.apply(element, [event].concat(event.data))
            if (result === false) event.preventDefault()
            return result
          }
          var handler = $.extend(parse(event), {fn: fn, proxy: proxyfn, sel: selector, del: delegate, i: set.length})
          set.push(handler)
          element.addEventListener(handler.e, proxyfn, capture)
        })
      }
      function remove(element, events, fn, selector){
        var id = zid(element)
        eachEvent(events || '', fn, function(event, fn){
          findHandlers(element, event, fn, selector).forEach(function(handler){
            delete handlers[id][handler.i]
            element.removeEventListener(handler.e, handler.proxy, false)
          })
        })
      }
    
      $.event = { add: add, remove: remove }
    
      $.proxy = function(fn, context) {
        if ($.isFunction(fn)) {
          var proxyFn = function(){ return fn.apply(context, arguments) }
          proxyFn._zid = zid(fn)
          return proxyFn
        } else if (typeof context == 'string') {
          return $.proxy(fn[context], fn)
        } else {
          throw new TypeError("expected function")
        }
      }
    
      $.fn.bind = function(event, callback){
        return this.each(function(){
          add(this, event, callback)
        })
      }
      $.fn.unbind = function(event, callback){
        return this.each(function(){
          remove(this, event, callback)
        })
      }
      $.fn.one = function(event, callback){
        return this.each(function(i, element){
          add(this, event, callback, null, function(fn, type){
            return function(){
              var result = fn.apply(element, arguments)
              remove(element, type, fn)
              return result
            }
          })
        })
      }
    
      var returnTrue = function(){return true},
          returnFalse = function(){return false},
          eventMethods = {
            preventDefault: 'isDefaultPrevented',
            stopImmediatePropagation: 'isImmediatePropagationStopped',
            stopPropagation: 'isPropagationStopped'
          }
      function createProxy(event) {
        var proxy = $.extend({originalEvent: event}, event)
        $.each(eventMethods, function(name, predicate) {
          proxy[name] = function(){
            this[predicate] = returnTrue
            return event[name].apply(event, arguments)
          }
          proxy[predicate] = returnFalse
        })
        return proxy
      }
    
      // emulates the 'defaultPrevented' property for browsers that have none
      function fix(event) {
        if (!('defaultPrevented' in event)) {
          event.defaultPrevented = false
          var prevent = event.preventDefault
          event.preventDefault = function() {
            this.defaultPrevented = true
            prevent.call(this)
          }
        }
      }
    
      $.fn.delegate = function(selector, event, callback){
        var capture = false
        if(event == 'blur' || event == 'focus'){
          if($.iswebkit)
            event = event == 'blur' ? 'focusout' : event == 'focus' ? 'focusin' : event
          else
            capture = true
        }
    
        return this.each(function(i, element){
          add(element, event, callback, selector, function(fn){
            return function(e){
              var evt, match = $(e.target).closest(selector, element).get(0)
              if (match) {
                evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
                return fn.apply(match, [evt].concat([].slice.call(arguments, 1)))
              }
            }
          }, capture)
        })
      }
      $.fn.undelegate = function(selector, event, callback){
        return this.each(function(){
          remove(this, event, callback, selector)
        })
      }
    
      $.fn.live = function(event, callback){
        $(document.body).delegate(this.selector, event, callback)
        return this
      }
      $.fn.die = function(event, callback){
        $(document.body).undelegate(this.selector, event, callback)
        return this
      }
    
      $.fn.on = function(event, selector, callback){
        return selector == undefined || $.isFunction(selector) ?
          this.bind(event, selector) : this.delegate(selector, event, callback)
      }
      $.fn.off = function(event, selector, callback){
        return selector == undefined || $.isFunction(selector) ?
          this.unbind(event, selector) : this.undelegate(selector, event, callback)
      }
    
      $.fn.trigger = function(event, data){
        if (typeof event == 'string') event = $.Event(event)
        fix(event)
        event.data = data
        return this.each(function(){
          // items in the collection might not be DOM elements
          // (todo: possibly support events on plain old objects)
          if('dispatchEvent' in this) this.dispatchEvent(event)
        })
      }
    
      // triggers event handlers on current element just as if an event occurred,
      // doesn't trigger an actual event, doesn't bubble
      $.fn.triggerHandler = function(event, data){
        var e, result
        this.each(function(i, element){
          e = createProxy(typeof event == 'string' ? $.Event(event) : event)
          e.data = data
          e.target = element
          $.each(findHandlers(element, event.type || event), function(i, handler){
            result = handler.proxy(e)
            if (e.isImmediatePropagationStopped()) return false
          })
        })
        return result
      }
    
      // shortcut methods for `.bind(event, fn)` for each event type
      ;('focusin focusout load resize scroll unload click dblclick '+
      'mousedown mouseup mousemove mouseover mouseout '+
      'change select keydown keypress keyup error').split(' ').forEach(function(event) {
        $.fn[event] = function(callback){ return this.bind(event, callback) }
      })
    
      ;['focus', 'blur'].forEach(function(name) {
        $.fn[name] = function(callback) {
          if (callback) this.bind(name, callback)
          else if (this.length) try { this.get(0)[name]() } catch(e){}
          return this
        }
      })
    
      $.Event = function(type, props) {
        var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
        if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
        event.initEvent(type, bubbles, true, null, null, null, null, null, null, null, null, null, null, null, null)
        return event
      }
    
    })(Zepto)
    ;(function($){
      function detect(ua){
        var os = this.os = {}, browser = this.browser = {},
          webkit = ua.match(/WebKit\/([\d.]+)/),
          android = ua.match(/(Android)\s+([\d.]+)/),
          ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
          iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
          webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
          touchpad = webos && ua.match(/TouchPad/),
          kindle = ua.match(/Kindle\/([\d.]+)/),
          silk = ua.match(/Silk\/([\d._]+)/),
          blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/)
    
        // todo clean this up with a better OS/browser
        // separation. we need to discern between multiple
        // browsers on android, and decide if kindle fire in
        // silk mode is android or not
    
        if (browser.webkit = !!webkit) browser.version = webkit[1]
    
        if (android) os.android = true, os.version = android[2]
        if (iphone) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
        if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
        if (webos) os.webos = true, os.version = webos[2]
        if (touchpad) os.touchpad = true
        if (blackberry) os.blackberry = true, os.version = blackberry[2]
        if (kindle) os.kindle = true, os.version = kindle[1]
        if (silk) browser.silk = true, browser.version = silk[1]
        if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
      }
    
      detect.call($, navigator.userAgent)
      // make available to unit tests
      $.__detect = detect
    
    })(Zepto)
    ;(function($, undefined){
      var prefix = '', eventPrefix, endEventName, endAnimationName,
        vendors = { Webkit: 'webkit', Moz: '', O: 'o', ms: 'MS' },
        document = window.document, testEl = document.createElement('div'),
        supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
        clearProperties = {}
    
      function downcase(str) { return str.toLowerCase() }
      function normalizeEvent(name) { return eventPrefix ? eventPrefix + name : downcase(name) }
    
      $.each(vendors, function(vendor, event){
        if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
          prefix = '-' + downcase(vendor) + '-'
          eventPrefix = event
          return false
        }
      })
    
      clearProperties[prefix + 'transition-property'] =
      clearProperties[prefix + 'transition-duration'] =
      clearProperties[prefix + 'transition-timing-function'] =
      clearProperties[prefix + 'animation-name'] =
      clearProperties[prefix + 'animation-duration'] = ''
    
      $.fx = {
        off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
        cssPrefix: prefix,
        transitionEnd: normalizeEvent('TransitionEnd'),
        animationEnd: normalizeEvent('AnimationEnd')
      }
    
      $.fn.animate = function(properties, duration, ease, callback){
        if ($.isObject(duration))
          ease = duration.easing, callback = duration.complete, duration = duration.duration
        if (duration) duration = duration / 1000
        return this.anim(properties, duration, ease, callback)
      }
    
      $.fn.anim = function(properties, duration, ease, callback){
        var transforms, cssProperties = {}, key, that = this, wrappedCallback, endEvent = $.fx.transitionEnd
        if (duration === undefined) duration = 0.4
        if ($.fx.off) duration = 0
    
        if (typeof properties == 'string') {
          // keyframe animation
          cssProperties[prefix + 'animation-name'] = properties
          cssProperties[prefix + 'animation-duration'] = duration + 's'
          endEvent = $.fx.animationEnd
        } else {
          // CSS transitions
          for (key in properties)
            if (supportedTransforms.test(key)) {
              transforms || (transforms = [])
              transforms.push(key + '(' + properties[key] + ')')
            }
            else cssProperties[key] = properties[key]
    
          if (transforms) cssProperties[prefix + 'transform'] = transforms.join(' ')
          if (!$.fx.off && typeof properties === 'object') {
            cssProperties[prefix + 'transition-property'] = Object.keys(properties).join(', ')
            cssProperties[prefix + 'transition-duration'] = duration + 's'
            cssProperties[prefix + 'transition-timing-function'] = (ease || 'linear')
          }
        }
    
        wrappedCallback = function(event){
          if (typeof event !== 'undefined') {
            if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
            $(event.target).unbind(endEvent, arguments.callee)
          }
          $(this).css(clearProperties)
          callback && callback.call(this)
        }
        if (duration > 0) this.bind(endEvent, wrappedCallback)
    
        setTimeout(function() {
          that.css(cssProperties)
          if (duration <= 0) setTimeout(function() {
            that.each(function(){ wrappedCallback.call(this) })
          }, 0)
        }, 0)
    
        return this
      }
    
      testEl = null
    })(Zepto)
    ;(function($){
      var jsonpID = 0,
          isObject = $.isObject,
          document = window.document,
          key,
          name,
          rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
          scriptTypeRE = /^(?:text|application)\/javascript/i,
          xmlTypeRE = /^(?:text|application)\/xml/i,
          jsonType = 'application/json',
          htmlType = 'text/html',
          blankRE = /^\s*$/
    
      // trigger a custom event and return false if it was cancelled
      function triggerAndReturn(context, eventName, data) {
        var event = $.Event(eventName)
        $(context).trigger(event, data)
        return !event.defaultPrevented
      }
    
      // trigger an Ajax "global" event
      function triggerGlobal(settings, context, eventName, data) {
        if (settings.global) return triggerAndReturn(context || document, eventName, data)
      }
    
      // Number of active Ajax requests
      $.active = 0
    
      function ajaxStart(settings) {
        if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
      }
      function ajaxStop(settings) {
        if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
      }
    
      // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
      function ajaxBeforeSend(xhr, settings) {
        var context = settings.context
        if (settings.beforeSend.call(context, xhr, settings) === false ||
            triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
          return false
    
        triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
      }
      function ajaxSuccess(data, xhr, settings) {
        var context = settings.context, status = 'success'
        settings.success.call(context, data, status, xhr)
        triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
        ajaxComplete(status, xhr, settings)
      }
      // type: "timeout", "error", "abort", "parsererror"
      function ajaxError(error, type, xhr, settings) {
        var context = settings.context
        settings.error.call(context, xhr, type, error)
        triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error])
        ajaxComplete(type, xhr, settings)
      }
      // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
      function ajaxComplete(status, xhr, settings) {
        var context = settings.context
        settings.complete.call(context, xhr, status)
        triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
        ajaxStop(settings)
      }
    
      // Empty function, used as default callback
      function empty() {}
    
      $.ajaxJSONP = function(options){
        var callbackName = 'jsonp' + (++jsonpID),
          script = document.createElement('script'),
          abort = function(){
            $(script).remove()
            if (callbackName in window) window[callbackName] = empty
            ajaxComplete('abort', xhr, options)
          },
          xhr = { abort: abort }, abortTimeout
    
        if (options.error) script.onerror = function() {
          xhr.abort()
          options.error()
        }
    
        window[callbackName] = function(data){
          clearTimeout(abortTimeout)
          $(script).remove()
          delete window[callbackName]
          ajaxSuccess(data, xhr, options)
        }
    
        serializeData(options)
        script.src = options.url.replace(/=\?/, '=' + callbackName)
        $('head').append(script)
    
        if (options.timeout > 0) abortTimeout = setTimeout(function(){
            xhr.abort()
            ajaxComplete('timeout', xhr, options)
          }, options.timeout)
    
        return xhr
      }
    
      $.ajaxSettings = {
        // Default type of request
        type: 'GET',
        // Callback that is executed before request
        beforeSend: empty,
        // Callback that is executed if the request succeeds
        success: empty,
        // Callback that is executed the the server drops error
        error: empty,
        // Callback that is executed on request complete (both: error and success)
        complete: empty,
        // The context for the callbacks
        context: null,
        // Whether to trigger "global" Ajax events
        global: true,
        // Transport
        xhr: function () {
          return new window.XMLHttpRequest()
        },
        // MIME types mapping
        accepts: {
          script: 'text/javascript, application/javascript',
          json:   jsonType,
          xml:    'application/xml, text/xml',
          html:   htmlType,
          text:   'text/plain'
        },
        // Whether the request is to another domain
        crossDomain: false,
        // Default timeout
        timeout: 0
      }
    
      function mimeToDataType(mime) {
        return mime && ( mime == htmlType ? 'html' :
          mime == jsonType ? 'json' :
          scriptTypeRE.test(mime) ? 'script' :
          xmlTypeRE.test(mime) && 'xml' ) || 'text'
      }
    
      function appendQuery(url, query) {
        return (url + '&' + query).replace(/[&?]{1,2}/, '?')
      }
    
      // serialize payload and append it to the URL for GET requests
      function serializeData(options) {
        if (isObject(options.data)) options.data = $.param(options.data)
        if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
          options.url = appendQuery(options.url, options.data)
      }
    
      $.ajax = function(options){
        var settings = $.extend({}, options || {})
        for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]
    
        ajaxStart(settings)
    
        if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
          RegExp.$2 != window.location.host
    
        var dataType = settings.dataType, hasPlaceholder = /=\?/.test(settings.url)
        if (dataType == 'jsonp' || hasPlaceholder) {
          if (!hasPlaceholder) settings.url = appendQuery(settings.url, 'callback=?')
          return $.ajaxJSONP(settings)
        }
    
        if (!settings.url) settings.url = window.location.toString()
        serializeData(settings)
    
        var mime = settings.accepts[dataType],
            baseHeaders = { },
            protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
            xhr = $.ajaxSettings.xhr(), abortTimeout
    
        if (!settings.crossDomain) baseHeaders['X-Requested-With'] = 'XMLHttpRequest'
        if (mime) {
          baseHeaders['Accept'] = mime
          if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
          xhr.overrideMimeType && xhr.overrideMimeType(mime)
        }
        if (settings.contentType || (settings.data && settings.type.toUpperCase() != 'GET'))
          baseHeaders['Content-Type'] = (settings.contentType || 'application/x-www-form-urlencoded')
        settings.headers = $.extend(baseHeaders, settings.headers || {})
    
        xhr.onreadystatechange = function(){
          if (xhr.readyState == 4) {
            clearTimeout(abortTimeout)
            var result, error = false
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
              dataType = dataType || mimeToDataType(xhr.getResponseHeader('content-type'))
              result = xhr.responseText
    
              try {
                if (dataType == 'script')    (1,eval)(result)
                else if (dataType == 'xml')  result = xhr.responseXML
                else if (dataType == 'json') result = blankRE.test(result) ? null : JSON.parse(result)
              } catch (e) { error = e }
    
              if (error) ajaxError(error, 'parsererror', xhr, settings)
              else ajaxSuccess(result, xhr, settings)
            } else {
              ajaxError(null, 'error', xhr, settings)
            }
          }
        }
    
        var async = 'async' in settings ? settings.async : true
        xhr.open(settings.type, settings.url, async)
    
        for (name in settings.headers) xhr.setRequestHeader(name, settings.headers[name])
    
        if (ajaxBeforeSend(xhr, settings) === false) {
          xhr.abort()
          return false
        }
    
        if (settings.timeout > 0) abortTimeout = setTimeout(function(){
            xhr.onreadystatechange = empty
            xhr.abort()
            ajaxError(null, 'timeout', xhr, settings)
          }, settings.timeout)
    
        // avoid sending empty string (#319)
        xhr.send(settings.data ? settings.data : null)
        return xhr
      }
    
      $.get = function(url, success){ return $.ajax({ url: url, success: success }) }
    
      $.post = function(url, data, success, dataType){
        if ($.isFunction(data)) dataType = dataType || success, success = data, data = null
        return $.ajax({ type: 'POST', url: url, data: data, success: success, dataType: dataType })
      }
    
      $.getJSON = function(url, success){
        return $.ajax({ url: url, success: success, dataType: 'json' })
      }
    
      $.fn.load = function(url, success){
        if (!this.length) return this
        var self = this, parts = url.split(/\s/), selector
        if (parts.length > 1) url = parts[0], selector = parts[1]
        $.get(url, function(response){
          self.html(selector ?
            $(document.createElement('div')).html(response.replace(rscript, "")).find(selector).html()
            : response)
          success && success.call(self)
        })
        return this
      }
    
      var escape = encodeURIComponent
    
      function serialize(params, obj, traditional, scope){
        var array = $.isArray(obj)
        $.each(obj, function(key, value) {
          if (scope) key = traditional ? scope : scope + '[' + (array ? '' : key) + ']'
          // handle data in serializeArray() format
          if (!scope && array) params.add(value.name, value.value)
          // recurse into nested objects
          else if (traditional ? $.isArray(value) : isObject(value))
            serialize(params, value, traditional, key)
          else params.add(key, value)
        })
      }
    
      $.param = function(obj, traditional){
        var params = []
        params.add = function(k, v){ this.push(escape(k) + '=' + escape(v)) }
        serialize(params, obj, traditional)
        return params.join('&').replace('%20', '+')
      }
    })(Zepto)
    ;(function ($) {
      $.fn.serializeArray = function () {
        var result = [], el
        $( Array.prototype.slice.call(this.get(0).elements) ).each(function () {
          el = $(this)
          var type = el.attr('type')
          if (this.nodeName.toLowerCase() != 'fieldset' &&
            !this.disabled && type != 'submit' && type != 'reset' && type != 'button' &&
            ((type != 'radio' && type != 'checkbox') || this.checked))
            result.push({
              name: el.attr('name'),
              value: el.val()
            })
        })
        return result
      }
    
      $.fn.serialize = function () {
        var result = []
        this.serializeArray().forEach(function (elm) {
          result.push( encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value) )
        })
        return result.join('&')
      }
    
      $.fn.submit = function (callback) {
        if (callback) this.bind('submit', callback)
        else if (this.length) {
          var event = $.Event('submit')
          this.eq(0).trigger(event)
          if (!event.defaultPrevented) this.get(0).submit()
        }
        return this
      }
    
    })(Zepto)
    ;(function($){
      var touch = {}, touchTimeout
    
      function parentIfText(node){
        return 'tagName' in node ? node : node.parentNode
      }
    
      function swipeDirection(x1, x2, y1, y2){
        var xDelta = Math.abs(x1 - x2), yDelta = Math.abs(y1 - y2)
        return xDelta >= yDelta ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
      }
    
      var longTapDelay = 750, longTapTimeout
    
      function longTap(){
        longTapTimeout = null
        if (touch.last) {
          touch.el.trigger('longTap')
          touch = {}
        }
      }
    
      function cancelLongTap(){
        if (longTapTimeout) clearTimeout(longTapTimeout)
        longTapTimeout = null
      }
    
      $(document).ready(function(){
        var now, delta
    
        $(document.body).bind('touchstart', function(e){
          now = Date.now()
          delta = now - (touch.last || now)
          touch.el = $(parentIfText(e.touches[0].target))
          touchTimeout && clearTimeout(touchTimeout)
          touch.x1 = e.touches[0].pageX
          touch.y1 = e.touches[0].pageY
          if (delta > 0 && delta <= 250) touch.isDoubleTap = true
          touch.last = now
          longTapTimeout = setTimeout(longTap, longTapDelay)
        }).bind('touchmove', function(e){
          cancelLongTap()
          touch.x2 = e.touches[0].pageX
          touch.y2 = e.touches[0].pageY
        }).bind('touchend', function(e){
           cancelLongTap()
    
          // double tap (tapped twice within 250ms)
          if (touch.isDoubleTap) {
            touch.el.trigger('doubleTap')
            touch = {}
    
          // swipe
          } else if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
                     (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30)) {
            touch.el.trigger('swipe') &&
              touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
            touch = {}
    
          // normal tap
          } else if ('last' in touch) {
            touch.el.trigger('tap')
    
            touchTimeout = setTimeout(function(){
              touchTimeout = null
              touch.el.trigger('singleTap')
              touch = {}
            }, 250)
          }
        }).bind('touchcancel', function(){
          if (touchTimeout) clearTimeout(touchTimeout)
          if (longTapTimeout) clearTimeout(longTapTimeout)
          longTapTimeout = touchTimeout = null
          touch = {}
        })
      })
    
      ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(m){
        $.fn[m] = function(callback){ return this.bind(m, callback) }
      })
    })(Zepto)
    
    // lib/handlebars/base.js
    
    /*jshint eqnull:true*/
    var Handlebars = {};
    
    (function(Handlebars) {
    
    Handlebars.VERSION = "1.0.rc.1";
    
    Handlebars.helpers  = {};
    Handlebars.partials = {};
    
    Handlebars.registerHelper = function(name, fn, inverse) {
      if(inverse) { fn.not = inverse; }
      this.helpers[name] = fn;
    };
    
    Handlebars.registerPartial = function(name, str) {
      this.partials[name] = str;
    };
    
    Handlebars.registerHelper('helperMissing', function(arg) {
      if(arguments.length === 2) {
        return undefined;
      } else {
        throw new Error("Could not find property '" + arg + "'");
      }
    });
    
    var toString = Object.prototype.toString, functionType = "[object Function]";
    
    Handlebars.registerHelper('blockHelperMissing', function(context, options) {
      var inverse = options.inverse || function() {}, fn = options.fn;
    
    
      var ret = "";
      var type = toString.call(context);
    
      if(type === functionType) { context = context.call(this); }
    
      if(context === true) {
        return fn(this);
      } else if(context === false || context == null) {
        return inverse(this);
      } else if(type === "[object Array]") {
        if(context.length > 0) {
          return Handlebars.helpers.each(context, options);
        } else {
          return inverse(this);
        }
      } else {
        return fn(context);
      }
    });
    
    Handlebars.K = function() {};
    
    Handlebars.createFrame = Object.create || function(object) {
      Handlebars.K.prototype = object;
      var obj = new Handlebars.K();
      Handlebars.K.prototype = null;
      return obj;
    };
    
    Handlebars.registerHelper('each', function(context, options) {
      var fn = options.fn, inverse = options.inverse;
      var ret = "", data;
    
      if (options.data) {
        data = Handlebars.createFrame(options.data);
      }
    
      if(context && context.length > 0) {
        for(var i=0, j=context.length; i<j; i++) {
          if (data) { data.index = i; }
          ret = ret + fn(context[i], { data: data });
        }
      } else {
        ret = inverse(this);
      }
      return ret;
    });
    
    Handlebars.registerHelper('if', function(context, options) {
      var type = toString.call(context);
      if(type === functionType) { context = context.call(this); }
    
      if(!context || Handlebars.Utils.isEmpty(context)) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    });
    
    Handlebars.registerHelper('unless', function(context, options) {
      var fn = options.fn, inverse = options.inverse;
      options.fn = inverse;
      options.inverse = fn;
    
      return Handlebars.helpers['if'].call(this, context, options);
    });
    
    Handlebars.registerHelper('with', function(context, options) {
      return options.fn(context);
    });
    
    Handlebars.registerHelper('log', function(context) {
      Handlebars.log(context);
    });
    
    }(Handlebars));
    ;
    // lib/handlebars/compiler/parser.js
    /* Jison generated parser */
    var handlebars = (function(){
    var parser = {trace: function trace() { },
    yy: {},
    symbols_: {"error":2,"root":3,"program":4,"EOF":5,"statements":6,"simpleInverse":7,"statement":8,"openInverse":9,"closeBlock":10,"openBlock":11,"mustache":12,"partial":13,"CONTENT":14,"COMMENT":15,"OPEN_BLOCK":16,"inMustache":17,"CLOSE":18,"OPEN_INVERSE":19,"OPEN_ENDBLOCK":20,"path":21,"OPEN":22,"OPEN_UNESCAPED":23,"OPEN_PARTIAL":24,"params":25,"hash":26,"DATA":27,"param":28,"STRING":29,"INTEGER":30,"BOOLEAN":31,"hashSegments":32,"hashSegment":33,"ID":34,"EQUALS":35,"pathSegments":36,"SEP":37,"$accept":0,"$end":1},
    terminals_: {2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"OPEN_PARTIAL",27:"DATA",29:"STRING",30:"INTEGER",31:"BOOLEAN",34:"ID",35:"EQUALS",37:"SEP"},
    productions_: [0,[3,2],[4,3],[4,1],[4,0],[6,1],[6,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,3],[13,4],[7,2],[17,3],[17,2],[17,2],[17,1],[17,1],[25,2],[25,1],[28,1],[28,1],[28,1],[28,1],[28,1],[26,1],[32,2],[32,1],[33,3],[33,3],[33,3],[33,3],[33,3],[21,1],[36,3],[36,1]],
    performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {
    
    var $0 = $$.length - 1;
    switch (yystate) {
    case 1: return $$[$0-1]; 
    break;
    case 2: this.$ = new yy.ProgramNode($$[$0-2], $$[$0]); 
    break;
    case 3: this.$ = new yy.ProgramNode($$[$0]); 
    break;
    case 4: this.$ = new yy.ProgramNode([]); 
    break;
    case 5: this.$ = [$$[$0]]; 
    break;
    case 6: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
    break;
    case 7: this.$ = new yy.BlockNode($$[$0-2], $$[$0-1].inverse, $$[$0-1], $$[$0]); 
    break;
    case 8: this.$ = new yy.BlockNode($$[$0-2], $$[$0-1], $$[$0-1].inverse, $$[$0]); 
    break;
    case 9: this.$ = $$[$0]; 
    break;
    case 10: this.$ = $$[$0]; 
    break;
    case 11: this.$ = new yy.ContentNode($$[$0]); 
    break;
    case 12: this.$ = new yy.CommentNode($$[$0]); 
    break;
    case 13: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1]); 
    break;
    case 14: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1]); 
    break;
    case 15: this.$ = $$[$0-1]; 
    break;
    case 16: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1]); 
    break;
    case 17: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1], true); 
    break;
    case 18: this.$ = new yy.PartialNode($$[$0-1]); 
    break;
    case 19: this.$ = new yy.PartialNode($$[$0-2], $$[$0-1]); 
    break;
    case 20: 
    break;
    case 21: this.$ = [[$$[$0-2]].concat($$[$0-1]), $$[$0]]; 
    break;
    case 22: this.$ = [[$$[$0-1]].concat($$[$0]), null]; 
    break;
    case 23: this.$ = [[$$[$0-1]], $$[$0]]; 
    break;
    case 24: this.$ = [[$$[$0]], null]; 
    break;
    case 25: this.$ = [[new yy.DataNode($$[$0])], null]; 
    break;
    case 26: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
    break;
    case 27: this.$ = [$$[$0]]; 
    break;
    case 28: this.$ = $$[$0]; 
    break;
    case 29: this.$ = new yy.StringNode($$[$0]); 
    break;
    case 30: this.$ = new yy.IntegerNode($$[$0]); 
    break;
    case 31: this.$ = new yy.BooleanNode($$[$0]); 
    break;
    case 32: this.$ = new yy.DataNode($$[$0]); 
    break;
    case 33: this.$ = new yy.HashNode($$[$0]); 
    break;
    case 34: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
    break;
    case 35: this.$ = [$$[$0]]; 
    break;
    case 36: this.$ = [$$[$0-2], $$[$0]]; 
    break;
    case 37: this.$ = [$$[$0-2], new yy.StringNode($$[$0])]; 
    break;
    case 38: this.$ = [$$[$0-2], new yy.IntegerNode($$[$0])]; 
    break;
    case 39: this.$ = [$$[$0-2], new yy.BooleanNode($$[$0])]; 
    break;
    case 40: this.$ = [$$[$0-2], new yy.DataNode($$[$0])]; 
    break;
    case 41: this.$ = new yy.IdNode($$[$0]); 
    break;
    case 42: $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
    break;
    case 43: this.$ = [$$[$0]]; 
    break;
    }
    },
    table: [{3:1,4:2,5:[2,4],6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],24:[1,15]},{1:[3]},{5:[1,16]},{5:[2,3],7:17,8:18,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,19],20:[2,3],22:[1,13],23:[1,14],24:[1,15]},{5:[2,5],14:[2,5],15:[2,5],16:[2,5],19:[2,5],20:[2,5],22:[2,5],23:[2,5],24:[2,5]},{4:20,6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],24:[1,15]},{4:21,6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],24:[1,15]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],24:[2,9]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],24:[2,10]},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],24:[2,11]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],24:[2,12]},{17:22,21:23,27:[1,24],34:[1,26],36:25},{17:27,21:23,27:[1,24],34:[1,26],36:25},{17:28,21:23,27:[1,24],34:[1,26],36:25},{17:29,21:23,27:[1,24],34:[1,26],36:25},{21:30,34:[1,26],36:25},{1:[2,1]},{6:31,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],24:[1,15]},{5:[2,6],14:[2,6],15:[2,6],16:[2,6],19:[2,6],20:[2,6],22:[2,6],23:[2,6],24:[2,6]},{17:22,18:[1,32],21:23,27:[1,24],34:[1,26],36:25},{10:33,20:[1,34]},{10:35,20:[1,34]},{18:[1,36]},{18:[2,24],21:41,25:37,26:38,27:[1,45],28:39,29:[1,42],30:[1,43],31:[1,44],32:40,33:46,34:[1,47],36:25},{18:[2,25]},{18:[2,41],27:[2,41],29:[2,41],30:[2,41],31:[2,41],34:[2,41],37:[1,48]},{18:[2,43],27:[2,43],29:[2,43],30:[2,43],31:[2,43],34:[2,43],37:[2,43]},{18:[1,49]},{18:[1,50]},{18:[1,51]},{18:[1,52],21:53,34:[1,26],36:25},{5:[2,2],8:18,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,2],22:[1,13],23:[1,14],24:[1,15]},{14:[2,20],15:[2,20],16:[2,20],19:[2,20],22:[2,20],23:[2,20],24:[2,20]},{5:[2,7],14:[2,7],15:[2,7],16:[2,7],19:[2,7],20:[2,7],22:[2,7],23:[2,7],24:[2,7]},{21:54,34:[1,26],36:25},{5:[2,8],14:[2,8],15:[2,8],16:[2,8],19:[2,8],20:[2,8],22:[2,8],23:[2,8],24:[2,8]},{14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],24:[2,14]},{18:[2,22],21:41,26:55,27:[1,45],28:56,29:[1,42],30:[1,43],31:[1,44],32:40,33:46,34:[1,47],36:25},{18:[2,23]},{18:[2,27],27:[2,27],29:[2,27],30:[2,27],31:[2,27],34:[2,27]},{18:[2,33],33:57,34:[1,58]},{18:[2,28],27:[2,28],29:[2,28],30:[2,28],31:[2,28],34:[2,28]},{18:[2,29],27:[2,29],29:[2,29],30:[2,29],31:[2,29],34:[2,29]},{18:[2,30],27:[2,30],29:[2,30],30:[2,30],31:[2,30],34:[2,30]},{18:[2,31],27:[2,31],29:[2,31],30:[2,31],31:[2,31],34:[2,31]},{18:[2,32],27:[2,32],29:[2,32],30:[2,32],31:[2,32],34:[2,32]},{18:[2,35],34:[2,35]},{18:[2,43],27:[2,43],29:[2,43],30:[2,43],31:[2,43],34:[2,43],35:[1,59],37:[2,43]},{34:[1,60]},{14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],24:[2,13]},{5:[2,16],14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],24:[2,16]},{5:[2,17],14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],24:[2,17]},{5:[2,18],14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],24:[2,18]},{18:[1,61]},{18:[1,62]},{18:[2,21]},{18:[2,26],27:[2,26],29:[2,26],30:[2,26],31:[2,26],34:[2,26]},{18:[2,34],34:[2,34]},{35:[1,59]},{21:63,27:[1,67],29:[1,64],30:[1,65],31:[1,66],34:[1,26],36:25},{18:[2,42],27:[2,42],29:[2,42],30:[2,42],31:[2,42],34:[2,42],37:[2,42]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],24:[2,19]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],24:[2,15]},{18:[2,36],34:[2,36]},{18:[2,37],34:[2,37]},{18:[2,38],34:[2,38]},{18:[2,39],34:[2,39]},{18:[2,40],34:[2,40]}],
    defaultActions: {16:[2,1],24:[2,25],38:[2,23],55:[2,21]},
    parseError: function parseError(str, hash) {
        throw new Error(str);
    },
    parse: function parse(input) {
        var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
        this.lexer.setInput(input);
        this.lexer.yy = this.yy;
        this.yy.lexer = this.lexer;
        this.yy.parser = this;
        if (typeof this.lexer.yylloc == "undefined")
            this.lexer.yylloc = {};
        var yyloc = this.lexer.yylloc;
        lstack.push(yyloc);
        var ranges = this.lexer.options && this.lexer.options.ranges;
        if (typeof this.yy.parseError === "function")
            this.parseError = this.yy.parseError;
        function popStack(n) {
            stack.length = stack.length - 2 * n;
            vstack.length = vstack.length - n;
            lstack.length = lstack.length - n;
        }
        function lex() {
            var token;
            token = self.lexer.lex() || 1;
            if (typeof token !== "number") {
                token = self.symbols_[token] || token;
            }
            return token;
        }
        var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
        while (true) {
            state = stack[stack.length - 1];
            if (this.defaultActions[state]) {
                action = this.defaultActions[state];
            } else {
                if (symbol === null || typeof symbol == "undefined") {
                    symbol = lex();
                }
                action = table[state] && table[state][symbol];
            }
            if (typeof action === "undefined" || !action.length || !action[0]) {
                var errStr = "";
                if (!recovering) {
                    expected = [];
                    for (p in table[state])
                        if (this.terminals_[p] && p > 2) {
                            expected.push("'" + this.terminals_[p] + "'");
                        }
                    if (this.lexer.showPosition) {
                        errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                    } else {
                        errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                    }
                    this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
                }
            }
            if (action[0] instanceof Array && action.length > 1) {
                throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
            }
            switch (action[0]) {
            case 1:
                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]);
                symbol = null;
                if (!preErrorSymbol) {
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else {
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;
            case 2:
                len = this.productions_[action[1]][1];
                yyval.$ = vstack[vstack.length - len];
                yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
                if (ranges) {
                    yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                }
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                if (typeof r !== "undefined") {
                    return r;
                }
                if (len) {
                    stack = stack.slice(0, -1 * len * 2);
                    vstack = vstack.slice(0, -1 * len);
                    lstack = lstack.slice(0, -1 * len);
                }
                stack.push(this.productions_[action[1]][0]);
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                stack.push(newState);
                break;
            case 3:
                return true;
            }
        }
        return true;
    }
    };
    /* Jison generated lexer */
    var lexer = (function(){
    var lexer = ({EOF:1,
    parseError:function parseError(str, hash) {
            if (this.yy.parser) {
                this.yy.parser.parseError(str, hash);
            } else {
                throw new Error(str);
            }
        },
    setInput:function (input) {
            this._input = input;
            this._more = this._less = this.done = false;
            this.yylineno = this.yyleng = 0;
            this.yytext = this.matched = this.match = '';
            this.conditionStack = ['INITIAL'];
            this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
            if (this.options.ranges) this.yylloc.range = [0,0];
            this.offset = 0;
            return this;
        },
    input:function () {
            var ch = this._input[0];
            this.yytext += ch;
            this.yyleng++;
            this.offset++;
            this.match += ch;
            this.matched += ch;
            var lines = ch.match(/(?:\r\n?|\n).*/g);
            if (lines) {
                this.yylineno++;
                this.yylloc.last_line++;
            } else {
                this.yylloc.last_column++;
            }
            if (this.options.ranges) this.yylloc.range[1]++;
    
            this._input = this._input.slice(1);
            return ch;
        },
    unput:function (ch) {
            var len = ch.length;
            var lines = ch.split(/(?:\r\n?|\n)/g);
    
            this._input = ch + this._input;
            this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
            //this.yyleng -= len;
            this.offset -= len;
            var oldLines = this.match.split(/(?:\r\n?|\n)/g);
            this.match = this.match.substr(0, this.match.length-1);
            this.matched = this.matched.substr(0, this.matched.length-1);
    
            if (lines.length-1) this.yylineno -= lines.length-1;
            var r = this.yylloc.range;
    
            this.yylloc = {first_line: this.yylloc.first_line,
              last_line: this.yylineno+1,
              first_column: this.yylloc.first_column,
              last_column: lines ?
                  (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
                  this.yylloc.first_column - len
              };
    
            if (this.options.ranges) {
                this.yylloc.range = [r[0], r[0] + this.yyleng - len];
            }
            return this;
        },
    more:function () {
            this._more = true;
            return this;
        },
    less:function (n) {
            this.unput(this.match.slice(n));
        },
    pastInput:function () {
            var past = this.matched.substr(0, this.matched.length - this.match.length);
            return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
        },
    upcomingInput:function () {
            var next = this.match;
            if (next.length < 20) {
                next += this._input.substr(0, 20-next.length);
            }
            return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
        },
    showPosition:function () {
            var pre = this.pastInput();
            var c = new Array(pre.length + 1).join("-");
            return pre + this.upcomingInput() + "\n" + c+"^";
        },
    next:function () {
            if (this.done) {
                return this.EOF;
            }
            if (!this._input) this.done = true;
    
            var token,
                match,
                tempMatch,
                index,
                col,
                lines;
            if (!this._more) {
                this.yytext = '';
                this.match = '';
            }
            var rules = this._currentRules();
            for (var i=0;i < rules.length; i++) {
                tempMatch = this._input.match(this.rules[rules[i]]);
                if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                    match = tempMatch;
                    index = i;
                    if (!this.options.flex) break;
                }
            }
            if (match) {
                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) this.yylineno += lines.length;
                this.yylloc = {first_line: this.yylloc.last_line,
                               last_line: this.yylineno+1,
                               first_column: this.yylloc.last_column,
                               last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
                if (this.done && this._input) this.done = false;
                if (token) return token;
                else return;
            }
            if (this._input === "") {
                return this.EOF;
            } else {
                return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                        {text: "", token: null, line: this.yylineno});
            }
        },
    lex:function lex() {
            var r = this.next();
            if (typeof r !== 'undefined') {
                return r;
            } else {
                return this.lex();
            }
        },
    begin:function begin(condition) {
            this.conditionStack.push(condition);
        },
    popState:function popState() {
            return this.conditionStack.pop();
        },
    _currentRules:function _currentRules() {
            return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
        },
    topState:function () {
            return this.conditionStack[this.conditionStack.length-2];
        },
    pushState:function begin(condition) {
            this.begin(condition);
        }});
    lexer.options = {};
    lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
    
    var YYSTATE=YY_START
    switch($avoiding_name_collisions) {
    case 0:
                                       if(yy_.yytext.slice(-1) !== "\\") this.begin("mu");
                                       if(yy_.yytext.slice(-1) === "\\") yy_.yytext = yy_.yytext.substr(0,yy_.yyleng-1), this.begin("emu");
                                       if(yy_.yytext) return 14;
                                     
    break;
    case 1: return 14; 
    break;
    case 2:
                                       if(yy_.yytext.slice(-1) !== "\\") this.popState();
                                       if(yy_.yytext.slice(-1) === "\\") yy_.yytext = yy_.yytext.substr(0,yy_.yyleng-1);
                                       return 14;
                                     
    break;
    case 3: return 24; 
    break;
    case 4: return 16; 
    break;
    case 5: return 20; 
    break;
    case 6: return 19; 
    break;
    case 7: return 19; 
    break;
    case 8: return 23; 
    break;
    case 9: return 23; 
    break;
    case 10: yy_.yytext = yy_.yytext.substr(3,yy_.yyleng-5); this.popState(); return 15; 
    break;
    case 11: return 22; 
    break;
    case 12: return 35; 
    break;
    case 13: return 34; 
    break;
    case 14: return 34; 
    break;
    case 15: return 37; 
    break;
    case 16: /*ignore whitespace*/ 
    break;
    case 17: this.popState(); return 18; 
    break;
    case 18: this.popState(); return 18; 
    break;
    case 19: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\"/g,'"'); return 29; 
    break;
    case 20: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\"/g,'"'); return 29; 
    break;
    case 21: yy_.yytext = yy_.yytext.substr(1); return 27; 
    break;
    case 22: return 31; 
    break;
    case 23: return 31; 
    break;
    case 24: return 30; 
    break;
    case 25: return 34; 
    break;
    case 26: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2); return 34; 
    break;
    case 27: return 'INVALID'; 
    break;
    case 28: return 5; 
    break;
    }
    };
    lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|$)))/,/^(?:\{\{>)/,/^(?:\{\{#)/,/^(?:\{\{\/)/,/^(?:\{\{\^)/,/^(?:\{\{\s*else\b)/,/^(?:\{\{\{)/,/^(?:\{\{&)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{)/,/^(?:=)/,/^(?:\.(?=[} ]))/,/^(?:\.\.)/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}\}\})/,/^(?:\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@[a-zA-Z]+)/,/^(?:true(?=[}\s]))/,/^(?:false(?=[}\s]))/,/^(?:[0-9]+(?=[}\s]))/,/^(?:[a-zA-Z0-9_$-]+(?=[=}\s\/.]))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/];
    lexer.conditions = {"mu":{"rules":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],"inclusive":false},"emu":{"rules":[2],"inclusive":false},"INITIAL":{"rules":[0,1,28],"inclusive":true}};
    return lexer;})()
    parser.lexer = lexer;
    function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
    return new Parser;
    })();
    if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
    exports.parser = handlebars;
    exports.Parser = handlebars.Parser;
    exports.parse = function () { return handlebars.parse.apply(handlebars, arguments); }
    exports.main = function commonjsMain(args) {
        if (!args[1])
            throw new Error('Usage: '+args[0]+' FILE');
        var source, cwd;
        if (typeof process !== 'undefined') {
            source = require('fs').readFileSync(require('path').resolve(args[1]), "utf8");
        } else {
            source = require("file").path(require("file").cwd()).join(args[1]).read({charset: "utf-8"});
        }
        return exports.parser.parse(source);
    }
    if (typeof module !== 'undefined' && require.main === module) {
      exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
    }
    };
    ;
    // lib/handlebars/compiler/base.js
    Handlebars.Parser = handlebars;
    
    Handlebars.parse = function(string) {
      Handlebars.Parser.yy = Handlebars.AST;
      return Handlebars.Parser.parse(string);
    };
    
    Handlebars.print = function(ast) {
      return new Handlebars.PrintVisitor().accept(ast);
    };
    
    Handlebars.logger = {
      DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, level: 3,
    
      // override in the host environment
      log: function(level, str) {}
    };
    
    Handlebars.log = function(level, str) { Handlebars.logger.log(level, str); };
    ;
    // lib/handlebars/compiler/ast.js
    (function() {
    
      Handlebars.AST = {};
    
      Handlebars.AST.ProgramNode = function(statements, inverse) {
        this.type = "program";
        this.statements = statements;
        if(inverse) { this.inverse = new Handlebars.AST.ProgramNode(inverse); }
      };
    
      Handlebars.AST.MustacheNode = function(rawParams, hash, unescaped) {
        this.type = "mustache";
        this.escaped = !unescaped;
        this.hash = hash;
    
        var id = this.id = rawParams[0];
        var params = this.params = rawParams.slice(1);
    
        // a mustache is an eligible helper if:
        // * its id is simple (a single part, not `this` or `..`)
        var eligibleHelper = this.eligibleHelper = id.isSimple;
    
        // a mustache is definitely a helper if:
        // * it is an eligible helper, and
        // * it has at least one parameter or hash segment
        this.isHelper = eligibleHelper && (params.length || hash);
    
        // if a mustache is an eligible helper but not a definite
        // helper, it is ambiguous, and will be resolved in a later
        // pass or at runtime.
      };
    
      Handlebars.AST.PartialNode = function(id, context) {
        this.type    = "partial";
    
        // TODO: disallow complex IDs
    
        this.id      = id;
        this.context = context;
      };
    
      var verifyMatch = function(open, close) {
        if(open.original !== close.original) {
          throw new Handlebars.Exception(open.original + " doesn't match " + close.original);
        }
      };
    
      Handlebars.AST.BlockNode = function(mustache, program, inverse, close) {
        verifyMatch(mustache.id, close);
        this.type = "block";
        this.mustache = mustache;
        this.program  = program;
        this.inverse  = inverse;
    
        if (this.inverse && !this.program) {
          this.isInverse = true;
        }
      };
    
      Handlebars.AST.ContentNode = function(string) {
        this.type = "content";
        this.string = string;
      };
    
      Handlebars.AST.HashNode = function(pairs) {
        this.type = "hash";
        this.pairs = pairs;
      };
    
      Handlebars.AST.IdNode = function(parts) {
        this.type = "ID";
        this.original = parts.join(".");
    
        var dig = [], depth = 0;
    
        for(var i=0,l=parts.length; i<l; i++) {
          var part = parts[i];
    
          if(part === "..") { depth++; }
          else if(part === "." || part === "this") { this.isScoped = true; }
          else { dig.push(part); }
        }
    
        this.parts    = dig;
        this.string   = dig.join('.');
        this.depth    = depth;
    
        // an ID is simple if it only has one part, and that part is not
        // `..` or `this`.
        this.isSimple = parts.length === 1 && !this.isScoped && depth === 0;
      };
    
      Handlebars.AST.DataNode = function(id) {
        this.type = "DATA";
        this.id = id;
      };
    
      Handlebars.AST.StringNode = function(string) {
        this.type = "STRING";
        this.string = string;
      };
    
      Handlebars.AST.IntegerNode = function(integer) {
        this.type = "INTEGER";
        this.integer = integer;
      };
    
      Handlebars.AST.BooleanNode = function(bool) {
        this.type = "BOOLEAN";
        this.bool = bool;
      };
    
      Handlebars.AST.CommentNode = function(comment) {
        this.type = "comment";
        this.comment = comment;
      };
    
    })();;
    // lib/handlebars/utils.js
    Handlebars.Exception = function(message) {
      var tmp = Error.prototype.constructor.apply(this, arguments);
    
      for (var p in tmp) {
        if (tmp.hasOwnProperty(p)) { this[p] = tmp[p]; }
      }
    
      this.message = tmp.message;
    };
    Handlebars.Exception.prototype = new Error();
    
    // Build out our basic SafeString type
    Handlebars.SafeString = function(string) {
      this.string = string;
    };
    Handlebars.SafeString.prototype.toString = function() {
      return this.string.toString();
    };
    
    (function() {
      var escape = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
      };
    
      var badChars = /[&<>"'`]/g;
      var possible = /[&<>"'`]/;
    
      var escapeChar = function(chr) {
        return escape[chr] || "&amp;";
      };
    
      Handlebars.Utils = {
        escapeExpression: function(string) {
          // don't escape SafeStrings, since they're already safe
          if (string instanceof Handlebars.SafeString) {
            return string.toString();
          } else if (string == null || string === false) {
            return "";
          }
    
          if(!possible.test(string)) { return string; }
          return string.replace(badChars, escapeChar);
        },
    
        isEmpty: function(value) {
          if (typeof value === "undefined") {
            return true;
          } else if (value === null) {
            return true;
          } else if (value === false) {
            return true;
          } else if(Object.prototype.toString.call(value) === "[object Array]" && value.length === 0) {
            return true;
          } else {
            return false;
          }
        }
      };
    })();;
    // lib/handlebars/compiler/compiler.js
    
    /*jshint eqnull:true*/
    Handlebars.Compiler = function() {};
    Handlebars.JavaScriptCompiler = function() {};
    
    (function(Compiler, JavaScriptCompiler) {
      // the foundHelper register will disambiguate helper lookup from finding a
      // function in a context. This is necessary for mustache compatibility, which
      // requires that context functions in blocks are evaluated by blockHelperMissing,
      // and then proceed as if the resulting value was provided to blockHelperMissing.
    
      Compiler.prototype = {
        compiler: Compiler,
    
        disassemble: function() {
          var opcodes = this.opcodes, opcode, out = [], params, param;
    
          for (var i=0, l=opcodes.length; i<l; i++) {
            opcode = opcodes[i];
    
            if (opcode.opcode === 'DECLARE') {
              out.push("DECLARE " + opcode.name + "=" + opcode.value);
            } else {
              params = [];
              for (var j=0; j<opcode.args.length; j++) {
                param = opcode.args[j];
                if (typeof param === "string") {
                  param = "\"" + param.replace("\n", "\\n") + "\"";
                }
                params.push(param);
              }
              out.push(opcode.opcode + " " + params.join(" "));
            }
          }
    
          return out.join("\n");
        },
    
        guid: 0,
    
        compile: function(program, options) {
          this.children = [];
          this.depths = {list: []};
          this.options = options;
    
          // These changes will propagate to the other compiler components
          var knownHelpers = this.options.knownHelpers;
          this.options.knownHelpers = {
            'helperMissing': true,
            'blockHelperMissing': true,
            'each': true,
            'if': true,
            'unless': true,
            'with': true,
            'log': true
          };
          if (knownHelpers) {
            for (var name in knownHelpers) {
              this.options.knownHelpers[name] = knownHelpers[name];
            }
          }
    
          return this.program(program);
        },
    
        accept: function(node) {
          return this[node.type](node);
        },
    
        program: function(program) {
          var statements = program.statements, statement;
          this.opcodes = [];
    
          for(var i=0, l=statements.length; i<l; i++) {
            statement = statements[i];
            this[statement.type](statement);
          }
          this.isSimple = l === 1;
    
          this.depths.list = this.depths.list.sort(function(a, b) {
            return a - b;
          });
    
          return this;
        },
    
        compileProgram: function(program) {
          var result = new this.compiler().compile(program, this.options);
          var guid = this.guid++, depth;
    
          this.usePartial = this.usePartial || result.usePartial;
    
          this.children[guid] = result;
    
          for(var i=0, l=result.depths.list.length; i<l; i++) {
            depth = result.depths.list[i];
    
            if(depth < 2) { continue; }
            else { this.addDepth(depth - 1); }
          }
    
          return guid;
        },
    
        block: function(block) {
          var mustache = block.mustache,
              program = block.program,
              inverse = block.inverse;
    
          if (program) {
            program = this.compileProgram(program);
          }
    
          if (inverse) {
            inverse = this.compileProgram(inverse);
          }
    
          var type = this.classifyMustache(mustache);
    
          if (type === "helper") {
            this.helperMustache(mustache, program, inverse);
          } else if (type === "simple") {
            this.simpleMustache(mustache);
    
            // now that the simple mustache is resolved, we need to
            // evaluate it by executing `blockHelperMissing`
            this.opcode('pushProgram', program);
            this.opcode('pushProgram', inverse);
            this.opcode('pushLiteral', '{}');
            this.opcode('blockValue');
          } else {
            this.ambiguousMustache(mustache, program, inverse);
    
            // now that the simple mustache is resolved, we need to
            // evaluate it by executing `blockHelperMissing`
            this.opcode('pushProgram', program);
            this.opcode('pushProgram', inverse);
            this.opcode('pushLiteral', '{}');
            this.opcode('ambiguousBlockValue');
          }
    
          this.opcode('append');
        },
    
        hash: function(hash) {
          var pairs = hash.pairs, pair, val;
    
          this.opcode('push', '{}');
    
          for(var i=0, l=pairs.length; i<l; i++) {
            pair = pairs[i];
            val  = pair[1];
    
            this.accept(val);
            this.opcode('assignToHash', pair[0]);
          }
        },
    
        partial: function(partial) {
          var id = partial.id;
          this.usePartial = true;
    
          if(partial.context) {
            this.ID(partial.context);
          } else {
            this.opcode('push', 'depth0');
          }
    
          this.opcode('invokePartial', id.original);
          this.opcode('append');
        },
    
        content: function(content) {
          this.opcode('appendContent', content.string);
        },
    
        mustache: function(mustache) {
          var options = this.options;
          var type = this.classifyMustache(mustache);
    
          if (type === "simple") {
            this.simpleMustache(mustache);
          } else if (type === "helper") {
            this.helperMustache(mustache);
          } else {
            this.ambiguousMustache(mustache);
          }
    
          if(mustache.escaped && !options.noEscape) {
            this.opcode('appendEscaped');
          } else {
            this.opcode('append');
          }
        },
    
        ambiguousMustache: function(mustache, program, inverse) {
          var id = mustache.id, name = id.parts[0];
    
          this.opcode('getContext', id.depth);
    
          this.opcode('pushProgram', program);
          this.opcode('pushProgram', inverse);
    
          this.opcode('invokeAmbiguous', name);
        },
    
        simpleMustache: function(mustache, program, inverse) {
          var id = mustache.id;
    
          if (id.type === 'DATA') {
            this.DATA(id);
          } else if (id.parts.length) {
            this.ID(id);
          } else {
            // Simplified ID for `this`
            this.addDepth(id.depth);
            this.opcode('getContext', id.depth);
            this.opcode('pushContext');
          }
    
          this.opcode('resolvePossibleLambda');
        },
    
        helperMustache: function(mustache, program, inverse) {
          var params = this.setupFullMustacheParams(mustache, program, inverse),
              name = mustache.id.parts[0];
    
          if (this.options.knownHelpers[name]) {
            this.opcode('invokeKnownHelper', params.length, name);
          } else if (this.knownHelpersOnly) {
            throw new Error("You specified knownHelpersOnly, but used the unknown helper " + name);
          } else {
            this.opcode('invokeHelper', params.length, name);
          }
        },
    
        ID: function(id) {
          this.addDepth(id.depth);
          this.opcode('getContext', id.depth);
    
          var name = id.parts[0];
          if (!name) {
            this.opcode('pushContext');
          } else {
            this.opcode('lookupOnContext', id.parts[0]);
          }
    
          for(var i=1, l=id.parts.length; i<l; i++) {
            this.opcode('lookup', id.parts[i]);
          }
        },
    
        DATA: function(data) {
          this.options.data = true;
          this.opcode('lookupData', data.id);
        },
    
        STRING: function(string) {
          this.opcode('pushString', string.string);
        },
    
        INTEGER: function(integer) {
          this.opcode('pushLiteral', integer.integer);
        },
    
        BOOLEAN: function(bool) {
          this.opcode('pushLiteral', bool.bool);
        },
    
        comment: function() {},
    
        // HELPERS
        opcode: function(name) {
          this.opcodes.push({ opcode: name, args: [].slice.call(arguments, 1) });
        },
    
        declare: function(name, value) {
          this.opcodes.push({ opcode: 'DECLARE', name: name, value: value });
        },
    
        addDepth: function(depth) {
          if(isNaN(depth)) { throw new Error("EWOT"); }
          if(depth === 0) { return; }
    
          if(!this.depths[depth]) {
            this.depths[depth] = true;
            this.depths.list.push(depth);
          }
        },
    
        classifyMustache: function(mustache) {
          var isHelper   = mustache.isHelper;
          var isEligible = mustache.eligibleHelper;
          var options    = this.options;
    
          // if ambiguous, we can possibly resolve the ambiguity now
          if (isEligible && !isHelper) {
            var name = mustache.id.parts[0];
    
            if (options.knownHelpers[name]) {
              isHelper = true;
            } else if (options.knownHelpersOnly) {
              isEligible = false;
            }
          }
    
          if (isHelper) { return "helper"; }
          else if (isEligible) { return "ambiguous"; }
          else { return "simple"; }
        },
    
        pushParams: function(params) {
          var i = params.length, param;
    
          while(i--) {
            param = params[i];
    
            if(this.options.stringParams) {
              if(param.depth) {
                this.addDepth(param.depth);
              }
    
              this.opcode('getContext', param.depth || 0);
              this.opcode('pushStringParam', param.string);
            } else {
              this[param.type](param);
            }
          }
        },
    
        setupMustacheParams: function(mustache) {
          var params = mustache.params;
          this.pushParams(params);
    
          if(mustache.hash) {
            this.hash(mustache.hash);
          } else {
            this.opcode('pushLiteral', '{}');
          }
    
          return params;
        },
    
        // this will replace setupMustacheParams when we're done
        setupFullMustacheParams: function(mustache, program, inverse) {
          var params = mustache.params;
          this.pushParams(params);
    
          this.opcode('pushProgram', program);
          this.opcode('pushProgram', inverse);
    
          if(mustache.hash) {
            this.hash(mustache.hash);
          } else {
            this.opcode('pushLiteral', '{}');
          }
    
          return params;
        }
      };
    
      var Literal = function(value) {
        this.value = value;
      };
    
      JavaScriptCompiler.prototype = {
        // PUBLIC API: You can override these methods in a subclass to provide
        // alternative compiled forms for name lookup and buffering semantics
        nameLookup: function(parent, name, type) {
          if (/^[0-9]+$/.test(name)) {
            return parent + "[" + name + "]";
          } else if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
            return parent + "." + name;
          }
          else {
            return parent + "['" + name + "']";
          }
        },
    
        appendToBuffer: function(string) {
          if (this.environment.isSimple) {
            return "return " + string + ";";
          } else {
            return "buffer += " + string + ";";
          }
        },
    
        initializeBuffer: function() {
          return this.quotedString("");
        },
    
        namespace: "Handlebars",
        // END PUBLIC API
    
        compile: function(environment, options, context, asObject) {
          this.environment = environment;
          this.options = options || {};
    
          Handlebars.log(Handlebars.logger.DEBUG, this.environment.disassemble() + "\n\n");
    
          this.name = this.environment.name;
          this.isChild = !!context;
          this.context = context || {
            programs: [],
            aliases: { }
          };
    
          this.preamble();
    
          this.stackSlot = 0;
          this.stackVars = [];
          this.registers = { list: [] };
          this.compileStack = [];
    
          this.compileChildren(environment, options);
    
          var opcodes = environment.opcodes, opcode;
    
          this.i = 0;
    
          for(l=opcodes.length; this.i<l; this.i++) {
            opcode = opcodes[this.i];
    
            if(opcode.opcode === 'DECLARE') {
              this[opcode.name] = opcode.value;
            } else {
              this[opcode.opcode].apply(this, opcode.args);
            }
          }
    
          return this.createFunctionContext(asObject);
        },
    
        nextOpcode: function() {
          var opcodes = this.environment.opcodes, opcode = opcodes[this.i + 1];
          return opcodes[this.i + 1];
        },
    
        eat: function(opcode) {
          this.i = this.i + 1;
        },
    
        preamble: function() {
          var out = [];
    
          if (!this.isChild) {
            var namespace = this.namespace;
            var copies = "helpers = helpers || " + namespace + ".helpers;";
            if (this.environment.usePartial) { copies = copies + " partials = partials || " + namespace + ".partials;"; }
            if (this.options.data) { copies = copies + " data = data || {};"; }
            out.push(copies);
          } else {
            out.push('');
          }
    
          if (!this.environment.isSimple) {
            out.push(", buffer = " + this.initializeBuffer());
          } else {
            out.push("");
          }
    
          // track the last context pushed into place to allow skipping the
          // getContext opcode when it would be a noop
          this.lastContext = 0;
          this.source = out;
        },
    
        createFunctionContext: function(asObject) {
          var locals = this.stackVars.concat(this.registers.list);
    
          if(locals.length > 0) {
            this.source[1] = this.source[1] + ", " + locals.join(", ");
          }
    
          // Generate minimizer alias mappings
          if (!this.isChild) {
            var aliases = [];
            for (var alias in this.context.aliases) {
              this.source[1] = this.source[1] + ', ' + alias + '=' + this.context.aliases[alias];
            }
          }
    
          if (this.source[1]) {
            this.source[1] = "var " + this.source[1].substring(2) + ";";
          }
    
          // Merge children
          if (!this.isChild) {
            this.source[1] += '\n' + this.context.programs.join('\n') + '\n';
          }
    
          if (!this.environment.isSimple) {
            this.source.push("return buffer;");
          }
    
          var params = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];
    
          for(var i=0, l=this.environment.depths.list.length; i<l; i++) {
            params.push("depth" + this.environment.depths.list[i]);
          }
    
          if (asObject) {
            params.push(this.source.join("\n  "));
    
            return Function.apply(this, params);
          } else {
            var functionSource = 'function ' + (this.name || '') + '(' + params.join(',') + ') {\n  ' + this.source.join("\n  ") + '}';
            Handlebars.log(Handlebars.logger.DEBUG, functionSource + "\n\n");
            return functionSource;
          }
        },
    
        // [blockValue]
        //
        // On stack, before: hash, inverse, program, value
        // On stack, after: return value of blockHelperMissing
        //
        // The purpose of this opcode is to take a block of the form
        // `{{#foo}}...{{/foo}}`, resolve the value of `foo`, and
        // replace it on the stack with the result of properly
        // invoking blockHelperMissing.
        blockValue: function() {
          this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';
    
          var params = ["depth0"];
          this.setupParams(0, params);
    
          this.replaceStack(function(current) {
            params.splice(1, 0, current);
            return current + " = blockHelperMissing.call(" + params.join(", ") + ")";
          });
        },
    
        // [ambiguousBlockValue]
        //
        // On stack, before: hash, inverse, program, value
        // Compiler value, before: lastHelper=value of last found helper, if any
        // On stack, after, if no lastHelper: same as [blockValue]
        // On stack, after, if lastHelper: value
        ambiguousBlockValue: function() {
          this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';
    
          var params = ["depth0"];
          this.setupParams(0, params);
    
          var current = this.topStack();
          params.splice(1, 0, current);
    
          this.source.push("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
        },
    
        // [appendContent]
        //
        // On stack, before: ...
        // On stack, after: ...
        //
        // Appends the string value of `content` to the current buffer
        appendContent: function(content) {
          this.source.push(this.appendToBuffer(this.quotedString(content)));
        },
    
        // [append]
        //
        // On stack, before: value, ...
        // On stack, after: ...
        //
        // Coerces `value` to a String and appends it to the current buffer.
        //
        // If `value` is truthy, or 0, it is coerced into a string and appended
        // Otherwise, the empty string is appended
        append: function() {
          var local = this.popStack();
          this.source.push("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
          if (this.environment.isSimple) {
            this.source.push("else { " + this.appendToBuffer("''") + " }");
          }
        },
    
        // [appendEscaped]
        //
        // On stack, before: value, ...
        // On stack, after: ...
        //
        // Escape `value` and append it to the buffer
        appendEscaped: function() {
          var opcode = this.nextOpcode(), extra = "";
          this.context.aliases.escapeExpression = 'this.escapeExpression';
    
          if(opcode && opcode.opcode === 'appendContent') {
            extra = " + " + this.quotedString(opcode.args[0]);
            this.eat(opcode);
          }
    
          this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")" + extra));
        },
    
        // [getContext]
        //
        // On stack, before: ...
        // On stack, after: ...
        // Compiler value, after: lastContext=depth
        //
        // Set the value of the `lastContext` compiler value to the depth
        getContext: function(depth) {
          if(this.lastContext !== depth) {
            this.lastContext = depth;
          }
        },
    
        // [lookupOnContext]
        //
        // On stack, before: ...
        // On stack, after: currentContext[name], ...
        //
        // Looks up the value of `name` on the current context and pushes
        // it onto the stack.
        lookupOnContext: function(name) {
          this.pushStack(this.nameLookup('depth' + this.lastContext, name, 'context'));
        },
    
        // [pushContext]
        //
        // On stack, before: ...
        // On stack, after: currentContext, ...
        //
        // Pushes the value of the current context onto the stack.
        pushContext: function() {
          this.pushStackLiteral('depth' + this.lastContext);
        },
    
        // [resolvePossibleLambda]
        //
        // On stack, before: value, ...
        // On stack, after: resolved value, ...
        //
        // If the `value` is a lambda, replace it on the stack by
        // the return value of the lambda
        resolvePossibleLambda: function() {
          this.context.aliases.functionType = '"function"';
    
          this.replaceStack(function(current) {
            return "typeof " + current + " === functionType ? " + current + "() : " + current;
          });
        },
    
        // [lookup]
        //
        // On stack, before: value, ...
        // On stack, after: value[name], ...
        //
        // Replace the value on the stack with the result of looking
        // up `name` on `value`
        lookup: function(name) {
          this.replaceStack(function(current) {
            return current + " == null || " + current + " === false ? " + current + " : " + this.nameLookup(current, name, 'context');
          });
        },
    
        // [lookupData]
        //
        // On stack, before: ...
        // On stack, after: data[id], ...
        //
        // Push the result of looking up `id` on the current data
        lookupData: function(id) {
          this.pushStack(this.nameLookup('data', id, 'data'));
        },
    
        // [pushStringParam]
        //
        // On stack, before: ...
        // On stack, after: string, currentContext, ...
        //
        // This opcode is designed for use in string mode, which
        // provides the string value of a parameter along with its
        // depth rather than resolving it immediately.
        pushStringParam: function(string) {
          this.pushStackLiteral('depth' + this.lastContext);
          this.pushString(string);
        },
    
        // [pushString]
        //
        // On stack, before: ...
        // On stack, after: quotedString(string), ...
        //
        // Push a quoted version of `string` onto the stack
        pushString: function(string) {
          this.pushStackLiteral(this.quotedString(string));
        },
    
        // [push]
        //
        // On stack, before: ...
        // On stack, after: expr, ...
        //
        // Push an expression onto the stack
        push: function(expr) {
          this.pushStack(expr);
        },
    
        // [pushLiteral]
        //
        // On stack, before: ...
        // On stack, after: value, ...
        //
        // Pushes a value onto the stack. This operation prevents
        // the compiler from creating a temporary variable to hold
        // it.
        pushLiteral: function(value) {
          this.pushStackLiteral(value);
        },
    
        // [pushProgram]
        //
        // On stack, before: ...
        // On stack, after: program(guid), ...
        //
        // Push a program expression onto the stack. This takes
        // a compile-time guid and converts it into a runtime-accessible
        // expression.
        pushProgram: function(guid) {
          if (guid != null) {
            this.pushStackLiteral(this.programExpression(guid));
          } else {
            this.pushStackLiteral(null);
          }
        },
    
        // [invokeHelper]
        //
        // On stack, before: hash, inverse, program, params..., ...
        // On stack, after: result of helper invocation
        //
        // Pops off the helper's parameters, invokes the helper,
        // and pushes the helper's return value onto the stack.
        //
        // If the helper is not found, `helperMissing` is called.
        invokeHelper: function(paramSize, name) {
          this.context.aliases.helperMissing = 'helpers.helperMissing';
    
          var helper = this.lastHelper = this.setupHelper(paramSize, name);
          this.register('foundHelper', helper.name);
    
          this.pushStack("foundHelper ? foundHelper.call(" +
            helper.callParams + ") " + ": helperMissing.call(" +
            helper.helperMissingParams + ")");
        },
    
        // [invokeKnownHelper]
        //
        // On stack, before: hash, inverse, program, params..., ...
        // On stack, after: result of helper invocation
        //
        // This operation is used when the helper is known to exist,
        // so a `helperMissing` fallback is not required.
        invokeKnownHelper: function(paramSize, name) {
          var helper = this.setupHelper(paramSize, name);
          this.pushStack(helper.name + ".call(" + helper.callParams + ")");
        },
    
        // [invokeAmbiguous]
        //
        // On stack, before: hash, inverse, program, params..., ...
        // On stack, after: result of disambiguation
        //
        // This operation is used when an expression like `{{foo}}`
        // is provided, but we don't know at compile-time whether it
        // is a helper or a path.
        //
        // This operation emits more code than the other options,
        // and can be avoided by passing the `knownHelpers` and
        // `knownHelpersOnly` flags at compile-time.
        invokeAmbiguous: function(name) {
          this.context.aliases.functionType = '"function"';
    
          this.pushStackLiteral('{}');
          var helper = this.setupHelper(0, name);
    
          var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');
          this.register('foundHelper', helperName);
    
          var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');
          var nextStack = this.nextStack();
    
          this.source.push('if (foundHelper) { ' + nextStack + ' = foundHelper.call(' + helper.callParams + '); }');
          this.source.push('else { ' + nextStack + ' = ' + nonHelper + '; ' + nextStack + ' = typeof ' + nextStack + ' === functionType ? ' + nextStack + '() : ' + nextStack + '; }');
        },
    
        // [invokePartial]
        //
        // On stack, before: context, ...
        // On stack after: result of partial invocation
        //
        // This operation pops off a context, invokes a partial with that context,
        // and pushes the result of the invocation back.
        invokePartial: function(name) {
          var params = [this.nameLookup('partials', name, 'partial'), "'" + name + "'", this.popStack(), "helpers", "partials"];
    
          if (this.options.data) {
            params.push("data");
          }
    
          this.context.aliases.self = "this";
          this.pushStack("self.invokePartial(" + params.join(", ") + ");");
        },
    
        // [assignToHash]
        //
        // On stack, before: value, hash, ...
        // On stack, after: hash, ...
        //
        // Pops a value and hash off the stack, assigns `hash[key] = value`
        // and pushes the hash back onto the stack.
        assignToHash: function(key) {
          var value = this.popStack();
          var hash = this.topStack();
    
          this.source.push(hash + "['" + key + "'] = " + value + ";");
        },
    
        // HELPERS
    
        compiler: JavaScriptCompiler,
    
        compileChildren: function(environment, options) {
          var children = environment.children, child, compiler;
    
          for(var i=0, l=children.length; i<l; i++) {
            child = children[i];
            compiler = new this.compiler();
    
            this.context.programs.push('');     // Placeholder to prevent name conflicts for nested children
            var index = this.context.programs.length;
            child.index = index;
            child.name = 'program' + index;
            this.context.programs[index] = compiler.compile(child, options, this.context);
          }
        },
    
        programExpression: function(guid) {
          this.context.aliases.self = "this";
    
          if(guid == null) {
            return "self.noop";
          }
    
          var child = this.environment.children[guid],
              depths = child.depths.list, depth;
    
          var programParams = [child.index, child.name, "data"];
    
          for(var i=0, l = depths.length; i<l; i++) {
            depth = depths[i];
    
            if(depth === 1) { programParams.push("depth0"); }
            else { programParams.push("depth" + (depth - 1)); }
          }
    
          if(depths.length === 0) {
            return "self.program(" + programParams.join(", ") + ")";
          } else {
            programParams.shift();
            return "self.programWithDepth(" + programParams.join(", ") + ")";
          }
        },
    
        register: function(name, val) {
          this.useRegister(name);
          this.source.push(name + " = " + val + ";");
        },
    
        useRegister: function(name) {
          if(!this.registers[name]) {
            this.registers[name] = true;
            this.registers.list.push(name);
          }
        },
    
        pushStackLiteral: function(item) {
          this.compileStack.push(new Literal(item));
          return item;
        },
    
        pushStack: function(item) {
          this.source.push(this.incrStack() + " = " + item + ";");
          this.compileStack.push("stack" + this.stackSlot);
          return "stack" + this.stackSlot;
        },
    
        replaceStack: function(callback) {
          var item = callback.call(this, this.topStack());
    
          this.source.push(this.topStack() + " = " + item + ";");
          return "stack" + this.stackSlot;
        },
    
        nextStack: function(skipCompileStack) {
          var name = this.incrStack();
          this.compileStack.push("stack" + this.stackSlot);
          return name;
        },
    
        incrStack: function() {
          this.stackSlot++;
          if(this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot); }
          return "stack" + this.stackSlot;
        },
    
        popStack: function() {
          var item = this.compileStack.pop();
    
          if (item instanceof Literal) {
            return item.value;
          } else {
            this.stackSlot--;
            return item;
          }
        },
    
        topStack: function() {
          var item = this.compileStack[this.compileStack.length - 1];
    
          if (item instanceof Literal) {
            return item.value;
          } else {
            return item;
          }
        },
    
        quotedString: function(str) {
          return '"' + str
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r') + '"';
        },
    
        setupHelper: function(paramSize, name) {
          var params = [];
          this.setupParams(paramSize, params);
          var foundHelper = this.nameLookup('helpers', name, 'helper');
    
          return {
            params: params,
            name: foundHelper,
            callParams: ["depth0"].concat(params).join(", "),
            helperMissingParams: ["depth0", this.quotedString(name)].concat(params).join(", ")
          };
        },
    
        // the params and contexts arguments are passed in arrays
        // to fill in
        setupParams: function(paramSize, params) {
          var options = [], contexts = [], param, inverse, program;
    
          options.push("hash:" + this.popStack());
    
          inverse = this.popStack();
          program = this.popStack();
    
          // Avoid setting fn and inverse if neither are set. This allows
          // helpers to do a check for `if (options.fn)`
          if (program || inverse) {
            if (!program) {
              this.context.aliases.self = "this";
              program = "self.noop";
            }
    
            if (!inverse) {
             this.context.aliases.self = "this";
              inverse = "self.noop";
            }
    
            options.push("inverse:" + inverse);
            options.push("fn:" + program);
          }
    
          for(var i=0; i<paramSize; i++) {
            param = this.popStack();
            params.push(param);
    
            if(this.options.stringParams) {
              contexts.push(this.popStack());
            }
          }
    
          if (this.options.stringParams) {
            options.push("contexts:[" + contexts.join(",") + "]");
          }
    
          if(this.options.data) {
            options.push("data:data");
          }
    
          params.push("{" + options.join(",") + "}");
          return params.join(", ");
        }
      };
    
      var reservedWords = (
        "break else new var" +
        " case finally return void" +
        " catch for switch while" +
        " continue function this with" +
        " default if throw" +
        " delete in try" +
        " do instanceof typeof" +
        " abstract enum int short" +
        " boolean export interface static" +
        " byte extends long super" +
        " char final native synchronized" +
        " class float package throws" +
        " const goto private transient" +
        " debugger implements protected volatile" +
        " double import public let yield"
      ).split(" ");
    
      var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};
    
      for(var i=0, l=reservedWords.length; i<l; i++) {
        compilerWords[reservedWords[i]] = true;
      }
    
      JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
        if(!JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(name)) {
          return true;
        }
        return false;
      };
    
    })(Handlebars.Compiler, Handlebars.JavaScriptCompiler);
    
    Handlebars.precompile = function(string, options) {
      options = options || {};
    
      var ast = Handlebars.parse(string);
      var environment = new Handlebars.Compiler().compile(ast, options);
      return new Handlebars.JavaScriptCompiler().compile(environment, options);
    };
    
    Handlebars.compile = function(string, options) {
      options = options || {};
    
      var compiled;
      function compile() {
        var ast = Handlebars.parse(string);
        var environment = new Handlebars.Compiler().compile(ast, options);
        var templateSpec = new Handlebars.JavaScriptCompiler().compile(environment, options, undefined, true);
        return Handlebars.template(templateSpec);
      }
    
      // Template is only compiled on first use and cached after that point.
      return function(context, options) {
        if (!compiled) {
          compiled = compile();
        }
        return compiled.call(this, context, options);
      };
    };
    ;
    // lib/handlebars/runtime.js
    Handlebars.VM = {
      template: function(templateSpec) {
        // Just add water
        var container = {
          escapeExpression: Handlebars.Utils.escapeExpression,
          invokePartial: Handlebars.VM.invokePartial,
          programs: [],
          program: function(i, fn, data) {
            var programWrapper = this.programs[i];
            if(data) {
              return Handlebars.VM.program(fn, data);
            } else if(programWrapper) {
              return programWrapper;
            } else {
              programWrapper = this.programs[i] = Handlebars.VM.program(fn);
              return programWrapper;
            }
          },
          programWithDepth: Handlebars.VM.programWithDepth,
          noop: Handlebars.VM.noop
        };
    
        return function(context, options) {
          options = options || {};
          return templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data);
        };
      },
    
      programWithDepth: function(fn, data, $depth) {
        var args = Array.prototype.slice.call(arguments, 2);
    
        return function(context, options) {
          options = options || {};
    
          return fn.apply(this, [context, options.data || data].concat(args));
        };
      },
      program: function(fn, data) {
        return function(context, options) {
          options = options || {};
    
          return fn(context, options.data || data);
        };
      },
      noop: function() { return ""; },
      invokePartial: function(partial, name, context, helpers, partials, data) {
        var options = { helpers: helpers, partials: partials, data: data };
    
        if(partial === undefined) {
          throw new Handlebars.Exception("The partial " + name + " could not be found");
        } else if(partial instanceof Function) {
          return partial(context, options);
        } else if (!Handlebars.compile) {
          throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
        } else {
          partials[name] = Handlebars.compile(partial, {data: data !== undefined});
          return partials[name](context, options);
        }
      }
    };
    
    Handlebars.template = Handlebars.VM.template;
    ;
    
    //     Backbone.js 0.9.10
    
    //     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
    //     Backbone may be freely distributed under the MIT license.
    //     For all details and documentation:
    //     http://backbonejs.org
    
    (function(){
    
      // Initial Setup
      // -------------
    
      // Save a reference to the global object (`window` in the browser, `exports`
      // on the server).
      var root = this;
    
      // Save the previous value of the `Backbone` variable, so that it can be
      // restored later on, if `noConflict` is used.
      var previousBackbone = root.Backbone;
    
      // Create a local reference to array methods.
      var array = [];
      var push = array.push;
      var slice = array.slice;
      var splice = array.splice;
    
      // The top-level namespace. All public Backbone classes and modules will
      // be attached to this. Exported for both CommonJS and the browser.
      var Backbone;
      if (typeof exports !== 'undefined') {
        Backbone = exports;
      } else {
        Backbone = root.Backbone = {};
      }
    
      // Current version of the library. Keep in sync with `package.json`.
      Backbone.VERSION = '0.9.10';
    
      // Require Underscore, if we're on the server, and it's not already present.
      var _ = root._;
      if (!_ && (typeof require !== 'undefined')) _ = require('underscore');
    
      // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.
      Backbone.$ = root.jQuery || root.Zepto || root.ender;
    
      // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
      // to its previous owner. Returns a reference to this Backbone object.
      Backbone.noConflict = function() {
        root.Backbone = previousBackbone;
        return this;
      };
    
      // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
      // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
      // set a `X-Http-Method-Override` header.
      Backbone.emulateHTTP = false;
    
      // Turn on `emulateJSON` to support legacy servers that can't deal with direct
      // `application/json` requests ... will encode the body as
      // `application/x-www-form-urlencoded` instead and will send the model in a
      // form param named `model`.
      Backbone.emulateJSON = false;
    
      // Backbone.Events
      // ---------------
    
      // Regular expression used to split event strings.
      var eventSplitter = /\s+/;
    
      // Implement fancy features of the Events API such as multiple event
      // names `"change blur"` and jQuery-style event maps `{change: action}`
      // in terms of the existing API.
      var eventsApi = function(obj, action, name, rest) {
        if (!name) return true;
        if (typeof name === 'object') {
          for (var key in name) {
            obj[action].apply(obj, [key, name[key]].concat(rest));
          }
        } else if (eventSplitter.test(name)) {
          var names = name.split(eventSplitter);
          for (var i = 0, l = names.length; i < l; i++) {
            obj[action].apply(obj, [names[i]].concat(rest));
          }
        } else {
          return true;
        }
      };
    
      // Optimized internal dispatch function for triggering events. Tries to
      // keep the usual cases speedy (most Backbone events have 3 arguments).
      var triggerEvents = function(events, args) {
        var ev, i = -1, l = events.length;
        switch (args.length) {
        case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx);
        return;
        case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0]);
        return;
        case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1]);
        return;
        case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1], args[2]);
        return;
        default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
        }
      };
    
      // A module that can be mixed in to *any object* in order to provide it with
      // custom events. You may bind with `on` or remove with `off` callback
      // functions to an event; `trigger`-ing an event fires all callbacks in
      // succession.
      //
      //     var object = {};
      //     _.extend(object, Backbone.Events);
      //     object.on('expand', function(){ alert('expanded'); });
      //     object.trigger('expand');
      //
      var Events = Backbone.Events = {
    
        // Bind one or more space separated events, or an events map,
        // to a `callback` function. Passing `"all"` will bind the callback to
        // all events fired.
        on: function(name, callback, context) {
          if (!(eventsApi(this, 'on', name, [callback, context]) && callback)) return this;
          this._events || (this._events = {});
          var list = this._events[name] || (this._events[name] = []);
          list.push({callback: callback, context: context, ctx: context || this});
          return this;
        },
    
        // Bind events to only be triggered a single time. After the first time
        // the callback is invoked, it will be removed.
        once: function(name, callback, context) {
          if (!(eventsApi(this, 'once', name, [callback, context]) && callback)) return this;
          var self = this;
          var once = _.once(function() {
            self.off(name, once);
            callback.apply(this, arguments);
          });
          once._callback = callback;
          this.on(name, once, context);
          return this;
        },
    
        // Remove one or many callbacks. If `context` is null, removes all
        // callbacks with that function. If `callback` is null, removes all
        // callbacks for the event. If `name` is null, removes all bound
        // callbacks for all events.
        off: function(name, callback, context) {
          var list, ev, events, names, i, l, j, k;
          if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
          if (!name && !callback && !context) {
            this._events = {};
            return this;
          }
    
          names = name ? [name] : _.keys(this._events);
          for (i = 0, l = names.length; i < l; i++) {
            name = names[i];
            if (list = this._events[name]) {
              events = [];
              if (callback || context) {
                for (j = 0, k = list.length; j < k; j++) {
                  ev = list[j];
                  if ((callback && callback !== ev.callback &&
                                   callback !== ev.callback._callback) ||
                      (context && context !== ev.context)) {
                    events.push(ev);
                  }
                }
              }
              this._events[name] = events;
            }
          }
    
          return this;
        },
    
        // Trigger one or many events, firing all bound callbacks. Callbacks are
        // passed the same arguments as `trigger` is, apart from the event name
        // (unless you're listening on `"all"`, which will cause your callback to
        // receive the true name of the event as the first argument).
        trigger: function(name) {
          if (!this._events) return this;
          var args = slice.call(arguments, 1);
          if (!eventsApi(this, 'trigger', name, args)) return this;
          var events = this._events[name];
          var allEvents = this._events.all;
          if (events) triggerEvents(events, args);
          if (allEvents) triggerEvents(allEvents, arguments);
          return this;
        },
    
        // An inversion-of-control version of `on`. Tell *this* object to listen to
        // an event in another object ... keeping track of what it's listening to.
        listenTo: function(obj, name, callback) {
          var listeners = this._listeners || (this._listeners = {});
          var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
          listeners[id] = obj;
          obj.on(name, typeof name === 'object' ? this : callback, this);
          return this;
        },
    
        // Tell this object to stop listening to either specific events ... or
        // to every object it's currently listening to.
        stopListening: function(obj, name, callback) {
          var listeners = this._listeners;
          if (!listeners) return;
          if (obj) {
            obj.off(name, typeof name === 'object' ? this : callback, this);
            if (!name && !callback) delete listeners[obj._listenerId];
          } else {
            if (typeof name === 'object') callback = this;
            for (var id in listeners) {
              listeners[id].off(name, callback, this);
            }
            this._listeners = {};
          }
          return this;
        }
      };
    
      // Aliases for backwards compatibility.
      Events.bind   = Events.on;
      Events.unbind = Events.off;
    
      // Allow the `Backbone` object to serve as a global event bus, for folks who
      // want global "pubsub" in a convenient place.
      _.extend(Backbone, Events);
    
      // Backbone.Model
      // --------------
    
      // Create a new model, with defined attributes. A client id (`cid`)
      // is automatically generated and assigned for you.
      var Model = Backbone.Model = function(attributes, options) {
        var defaults;
        var attrs = attributes || {};
        this.cid = _.uniqueId('c');
        this.attributes = {};
        if (options && options.collection) this.collection = options.collection;
        if (options && options.parse) attrs = this.parse(attrs, options) || {};
        if (defaults = _.result(this, 'defaults')) {
          attrs = _.defaults({}, attrs, defaults);
        }
        this.set(attrs, options);
        this.changed = {};
        this.initialize.apply(this, arguments);
      };
    
      // Attach all inheritable methods to the Model prototype.
      _.extend(Model.prototype, Events, {
    
        // A hash of attributes whose current and previous value differ.
        changed: null,
    
        // The default name for the JSON `id` attribute is `"id"`. MongoDB and
        // CouchDB users may want to set this to `"_id"`.
        idAttribute: 'id',
    
        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function(){},
    
        // Return a copy of the model's `attributes` object.
        toJSON: function(options) {
          return _.clone(this.attributes);
        },
    
        // Proxy `Backbone.sync` by default.
        sync: function() {
          return Backbone.sync.apply(this, arguments);
        },
    
        // Get the value of an attribute.
        get: function(attr) {
          return this.attributes[attr];
        },
    
        // Get the HTML-escaped value of an attribute.
        escape: function(attr) {
          return _.escape(this.get(attr));
        },
    
        // Returns `true` if the attribute contains a value that is not null
        // or undefined.
        has: function(attr) {
          return this.get(attr) != null;
        },
    
        // ----------------------------------------------------------------------
    
        // Set a hash of model attributes on the object, firing `"change"` unless
        // you choose to silence it.
        set: function(key, val, options) {
          var attr, attrs, unset, changes, silent, changing, prev, current;
          if (key == null) return this;
    
          // Handle both `"key", value` and `{key: value}` -style arguments.
          if (typeof key === 'object') {
            attrs = key;
            options = val;
          } else {
            (attrs = {})[key] = val;
          }
    
          options || (options = {});
    
          // Run validation.
          if (!this._validate(attrs, options)) return false;
    
          // Extract attributes and options.
          unset           = options.unset;
          silent          = options.silent;
          changes         = [];
          changing        = this._changing;
          this._changing  = true;
    
          if (!changing) {
            this._previousAttributes = _.clone(this.attributes);
            this.changed = {};
          }
          current = this.attributes, prev = this._previousAttributes;
    
          // Check for changes of `id`.
          if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];
    
          // For each `set` attribute, update or delete the current value.
          for (attr in attrs) {
            val = attrs[attr];
            if (!_.isEqual(current[attr], val)) changes.push(attr);
            if (!_.isEqual(prev[attr], val)) {
              this.changed[attr] = val;
            } else {
              delete this.changed[attr];
            }
            unset ? delete current[attr] : current[attr] = val;
          }
    
          // Trigger all relevant attribute changes.
          if (!silent) {
            if (changes.length) this._pending = true;
            for (var i = 0, l = changes.length; i < l; i++) {
              this.trigger('change:' + changes[i], this, current[changes[i]], options);
            }
          }
    
          if (changing) return this;
          if (!silent) {
            while (this._pending) {
              this._pending = false;
              this.trigger('change', this, options);
            }
          }
          this._pending = false;
          this._changing = false;
          return this;
        },
    
        // Remove an attribute from the model, firing `"change"` unless you choose
        // to silence it. `unset` is a noop if the attribute doesn't exist.
        unset: function(attr, options) {
          return this.set(attr, void 0, _.extend({}, options, {unset: true}));
        },
    
        // Clear all attributes on the model, firing `"change"` unless you choose
        // to silence it.
        clear: function(options) {
          var attrs = {};
          for (var key in this.attributes) attrs[key] = void 0;
          return this.set(attrs, _.extend({}, options, {unset: true}));
        },
    
        // Determine if the model has changed since the last `"change"` event.
        // If you specify an attribute name, determine if that attribute has changed.
        hasChanged: function(attr) {
          if (attr == null) return !_.isEmpty(this.changed);
          return _.has(this.changed, attr);
        },
    
        // Return an object containing all the attributes that have changed, or
        // false if there are no changed attributes. Useful for determining what
        // parts of a view need to be updated and/or what attributes need to be
        // persisted to the server. Unset attributes will be set to undefined.
        // You can also pass an attributes object to diff against the model,
        // determining if there *would be* a change.
        changedAttributes: function(diff) {
          if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
          var val, changed = false;
          var old = this._changing ? this._previousAttributes : this.attributes;
          for (var attr in diff) {
            if (_.isEqual(old[attr], (val = diff[attr]))) continue;
            (changed || (changed = {}))[attr] = val;
          }
          return changed;
        },
    
        // Get the previous value of an attribute, recorded at the time the last
        // `"change"` event was fired.
        previous: function(attr) {
          if (attr == null || !this._previousAttributes) return null;
          return this._previousAttributes[attr];
        },
    
        // Get all of the attributes of the model at the time of the previous
        // `"change"` event.
        previousAttributes: function() {
          return _.clone(this._previousAttributes);
        },
    
        // ---------------------------------------------------------------------
    
        // Fetch the model from the server. If the server's representation of the
        // model differs from its current attributes, they will be overriden,
        // triggering a `"change"` event.
        fetch: function(options) {
          options = options ? _.clone(options) : {};
          if (options.parse === void 0) options.parse = true;
          var success = options.success;
          options.success = function(model, resp, options) {
            if (!model.set(model.parse(resp, options), options)) return false;
            if (success) success(model, resp, options);
          };
          return this.sync('read', this, options);
        },
    
        // Set a hash of model attributes, and sync the model to the server.
        // If the server returns an attributes hash that differs, the model's
        // state will be `set` again.
        save: function(key, val, options) {
          var attrs, success, method, xhr, attributes = this.attributes;
    
          // Handle both `"key", value` and `{key: value}` -style arguments.
          if (key == null || typeof key === 'object') {
            attrs = key;
            options = val;
          } else {
            (attrs = {})[key] = val;
          }
    
          // If we're not waiting and attributes exist, save acts as `set(attr).save(null, opts)`.
          if (attrs && (!options || !options.wait) && !this.set(attrs, options)) return false;
    
          options = _.extend({validate: true}, options);
    
          // Do not persist invalid models.
          if (!this._validate(attrs, options)) return false;
    
          // Set temporary attributes if `{wait: true}`.
          if (attrs && options.wait) {
            this.attributes = _.extend({}, attributes, attrs);
          }
    
          // After a successful server-side save, the client is (optionally)
          // updated with the server-side state.
          if (options.parse === void 0) options.parse = true;
          success = options.success;
          options.success = function(model, resp, options) {
            // Ensure attributes are restored during synchronous saves.
            model.attributes = attributes;
            var serverAttrs = model.parse(resp, options);
            if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
            if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
              return false;
            }
            if (success) success(model, resp, options);
          };
    
          // Finish configuring and sending the Ajax request.
          method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
          if (method === 'patch') options.attrs = attrs;
          xhr = this.sync(method, this, options);
    
          // Restore attributes.
          if (attrs && options.wait) this.attributes = attributes;
    
          return xhr;
        },
    
        // Destroy this model on the server if it was already persisted.
        // Optimistically removes the model from its collection, if it has one.
        // If `wait: true` is passed, waits for the server to respond before removal.
        destroy: function(options) {
          options = options ? _.clone(options) : {};
          var model = this;
          var success = options.success;
    
          var destroy = function() {
            model.trigger('destroy', model, model.collection, options);
          };
    
          options.success = function(model, resp, options) {
            if (options.wait || model.isNew()) destroy();
            if (success) success(model, resp, options);
          };
    
          if (this.isNew()) {
            options.success(this, null, options);
            return false;
          }
    
          var xhr = this.sync('delete', this, options);
          if (!options.wait) destroy();
          return xhr;
        },
    
        // Default URL for the model's representation on the server -- if you're
        // using Backbone's restful methods, override this to change the endpoint
        // that will be called.
        url: function() {
          var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
          if (this.isNew()) return base;
          return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id);
        },
    
        // **parse** converts a response into the hash of attributes to be `set` on
        // the model. The default implementation is just to pass the response along.
        parse: function(resp, options) {
          return resp;
        },
    
        // Create a new model with identical attributes to this one.
        clone: function() {
          return new this.constructor(this.attributes);
        },
    
        // A model is new if it has never been saved to the server, and lacks an id.
        isNew: function() {
          return this.id == null;
        },
    
        // Check if the model is currently in a valid state.
        isValid: function(options) {
          return !this.validate || !this.validate(this.attributes, options);
        },
    
        // Run validation against the next complete set of model attributes,
        // returning `true` if all is well. Otherwise, fire a general
        // `"error"` event and call the error callback, if specified.
        _validate: function(attrs, options) {
          if (!options.validate || !this.validate) return true;
          attrs = _.extend({}, this.attributes, attrs);
          var error = this.validationError = this.validate(attrs, options) || null;
          if (!error) return true;
          this.trigger('invalid', this, error, options || {});
          return false;
        }
    
      });
    
      // Backbone.Collection
      // -------------------
    
      // Provides a standard collection class for our sets of models, ordered
      // or unordered. If a `comparator` is specified, the Collection will maintain
      // its models in sort order, as they're added and removed.
      var Collection = Backbone.Collection = function(models, options) {
        options || (options = {});
        if (options.model) this.model = options.model;
        if (options.comparator !== void 0) this.comparator = options.comparator;
        this.models = [];
        this._reset();
        this.initialize.apply(this, arguments);
        if (models) this.reset(models, _.extend({silent: true}, options));
      };
    
      // Define the Collection's inheritable methods.
      _.extend(Collection.prototype, Events, {
    
        // The default model for a collection is just a **Backbone.Model**.
        // This should be overridden in most cases.
        model: Model,
    
        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function(){},
    
        // The JSON representation of a Collection is an array of the
        // models' attributes.
        toJSON: function(options) {
          return this.map(function(model){ return model.toJSON(options); });
        },
    
        // Proxy `Backbone.sync` by default.
        sync: function() {
          return Backbone.sync.apply(this, arguments);
        },
    
        // Add a model, or list of models to the set.
        add: function(models, options) {
          models = _.isArray(models) ? models.slice() : [models];
          options || (options = {});
          var i, l, model, attrs, existing, doSort, add, at, sort, sortAttr;
          add = [];
          at = options.at;
          sort = this.comparator && (at == null) && options.sort != false;
          sortAttr = _.isString(this.comparator) ? this.comparator : null;
    
          // Turn bare objects into model references, and prevent invalid models
          // from being added.
          for (i = 0, l = models.length; i < l; i++) {
            if (!(model = this._prepareModel(attrs = models[i], options))) {
              this.trigger('invalid', this, attrs, options);
              continue;
            }
    
            // If a duplicate is found, prevent it from being added and
            // optionally merge it into the existing model.
            if (existing = this.get(model)) {
              if (options.merge) {
                existing.set(attrs === model ? model.attributes : attrs, options);
                if (sort && !doSort && existing.hasChanged(sortAttr)) doSort = true;
              }
              continue;
            }
    
            // This is a new model, push it to the `add` list.
            add.push(model);
    
            // Listen to added models' events, and index models for lookup by
            // `id` and by `cid`.
            model.on('all', this._onModelEvent, this);
            this._byId[model.cid] = model;
            if (model.id != null) this._byId[model.id] = model;
          }
    
          // See if sorting is needed, update `length` and splice in new models.
          if (add.length) {
            if (sort) doSort = true;
            this.length += add.length;
            if (at != null) {
              splice.apply(this.models, [at, 0].concat(add));
            } else {
              push.apply(this.models, add);
            }
          }
    
          // Silently sort the collection if appropriate.
          if (doSort) this.sort({silent: true});
    
          if (options.silent) return this;
    
          // Trigger `add` events.
          for (i = 0, l = add.length; i < l; i++) {
            (model = add[i]).trigger('add', model, this, options);
          }
    
          // Trigger `sort` if the collection was sorted.
          if (doSort) this.trigger('sort', this, options);
    
          return this;
        },
    
        // Remove a model, or a list of models from the set.
        remove: function(models, options) {
          models = _.isArray(models) ? models.slice() : [models];
          options || (options = {});
          var i, l, index, model;
          for (i = 0, l = models.length; i < l; i++) {
            model = this.get(models[i]);
            if (!model) continue;
            delete this._byId[model.id];
            delete this._byId[model.cid];
            index = this.indexOf(model);
            this.models.splice(index, 1);
            this.length--;
            if (!options.silent) {
              options.index = index;
              model.trigger('remove', model, this, options);
            }
            this._removeReference(model);
          }
          return this;
        },
    
        // Add a model to the end of the collection.
        push: function(model, options) {
          model = this._prepareModel(model, options);
          this.add(model, _.extend({at: this.length}, options));
          return model;
        },
    
        // Remove a model from the end of the collection.
        pop: function(options) {
          var model = this.at(this.length - 1);
          this.remove(model, options);
          return model;
        },
    
        // Add a model to the beginning of the collection.
        unshift: function(model, options) {
          model = this._prepareModel(model, options);
          this.add(model, _.extend({at: 0}, options));
          return model;
        },
    
        // Remove a model from the beginning of the collection.
        shift: function(options) {
          var model = this.at(0);
          this.remove(model, options);
          return model;
        },
    
        // Slice out a sub-array of models from the collection.
        slice: function(begin, end) {
          return this.models.slice(begin, end);
        },
    
        // Get a model from the set by id.
        get: function(obj) {
          if (obj == null) return void 0;
          this._idAttr || (this._idAttr = this.model.prototype.idAttribute);
          return this._byId[obj.id || obj.cid || obj[this._idAttr] || obj];
        },
    
        // Get the model at the given index.
        at: function(index) {
          return this.models[index];
        },
    
        // Return models with matching attributes. Useful for simple cases of `filter`.
        where: function(attrs) {
          if (_.isEmpty(attrs)) return [];
          return this.filter(function(model) {
            for (var key in attrs) {
              if (attrs[key] !== model.get(key)) return false;
            }
            return true;
          });
        },
    
        // Force the collection to re-sort itself. You don't need to call this under
        // normal circumstances, as the set will maintain sort order as each item
        // is added.
        sort: function(options) {
          if (!this.comparator) {
            throw new Error('Cannot sort a set without a comparator');
          }
          options || (options = {});
    
          // Run sort based on type of `comparator`.
          if (_.isString(this.comparator) || this.comparator.length === 1) {
            this.models = this.sortBy(this.comparator, this);
          } else {
            this.models.sort(_.bind(this.comparator, this));
          }
    
          if (!options.silent) this.trigger('sort', this, options);
          return this;
        },
    
        // Pluck an attribute from each model in the collection.
        pluck: function(attr) {
          return _.invoke(this.models, 'get', attr);
        },
    
        // Smartly update a collection with a change set of models, adding,
        // removing, and merging as necessary.
        update: function(models, options) {
          options = _.extend({add: true, merge: true, remove: true}, options);
          if (options.parse) models = this.parse(models, options);
          var model, i, l, existing;
          var add = [], remove = [], modelMap = {};
    
          // Allow a single model (or no argument) to be passed.
          if (!_.isArray(models)) models = models ? [models] : [];
    
          // Proxy to `add` for this case, no need to iterate...
          if (options.add && !options.remove) return this.add(models, options);
    
          // Determine which models to add and merge, and which to remove.
          for (i = 0, l = models.length; i < l; i++) {
            model = models[i];
            existing = this.get(model);
            if (options.remove && existing) modelMap[existing.cid] = true;
            if ((options.add && !existing) || (options.merge && existing)) {
              add.push(model);
            }
          }
          if (options.remove) {
            for (i = 0, l = this.models.length; i < l; i++) {
              model = this.models[i];
              if (!modelMap[model.cid]) remove.push(model);
            }
          }
    
          // Remove models (if applicable) before we add and merge the rest.
          if (remove.length) this.remove(remove, options);
          if (add.length) this.add(add, options);
          return this;
        },
    
        // When you have more items than you want to add or remove individually,
        // you can reset the entire set with a new list of models, without firing
        // any `add` or `remove` events. Fires `reset` when finished.
        reset: function(models, options) {
          options || (options = {});
          if (options.parse) models = this.parse(models, options);
          for (var i = 0, l = this.models.length; i < l; i++) {
            this._removeReference(this.models[i]);
          }
          options.previousModels = this.models.slice();
          this._reset();
          if (models) this.add(models, _.extend({silent: true}, options));
          if (!options.silent) this.trigger('reset', this, options);
          return this;
        },
    
        // Fetch the default set of models for this collection, resetting the
        // collection when they arrive. If `update: true` is passed, the response
        // data will be passed through the `update` method instead of `reset`.
        fetch: function(options) {
          options = options ? _.clone(options) : {};
          if (options.parse === void 0) options.parse = true;
          var success = options.success;
          options.success = function(collection, resp, options) {
            var method = options.update ? 'update' : 'reset';
            collection[method](resp, options);
            if (success) success(collection, resp, options);
          };
          return this.sync('read', this, options);
        },
    
        // Create a new instance of a model in this collection. Add the model to the
        // collection immediately, unless `wait: true` is passed, in which case we
        // wait for the server to agree.
        create: function(model, options) {
          options = options ? _.clone(options) : {};
          if (!(model = this._prepareModel(model, options))) return false;
          if (!options.wait) this.add(model, options);
          var collection = this;
          var success = options.success;
          options.success = function(model, resp, options) {
            if (options.wait) collection.add(model, options);
            if (success) success(model, resp, options);
          };
          model.save(null, options);
          return model;
        },
    
        // **parse** converts a response into a list of models to be added to the
        // collection. The default implementation is just to pass it through.
        parse: function(resp, options) {
          return resp;
        },
    
        // Create a new collection with an identical list of models as this one.
        clone: function() {
          return new this.constructor(this.models);
        },
    
        // Reset all internal state. Called when the collection is reset.
        _reset: function() {
          this.length = 0;
          this.models.length = 0;
          this._byId  = {};
        },
    
        // Prepare a model or hash of attributes to be added to this collection.
        _prepareModel: function(attrs, options) {
          if (attrs instanceof Model) {
            if (!attrs.collection) attrs.collection = this;
            return attrs;
          }
          options || (options = {});
          options.collection = this;
          var model = new this.model(attrs, options);
          if (!model._validate(attrs, options)) return false;
          return model;
        },
    
        // Internal method to remove a model's ties to a collection.
        _removeReference: function(model) {
          if (this === model.collection) delete model.collection;
          model.off('all', this._onModelEvent, this);
        },
    
        // Internal method called every time a model in the set fires an event.
        // Sets need to update their indexes when models change ids. All other
        // events simply proxy through. "add" and "remove" events that originate
        // in other collections are ignored.
        _onModelEvent: function(event, model, collection, options) {
          if ((event === 'add' || event === 'remove') && collection !== this) return;
          if (event === 'destroy') this.remove(model, options);
          if (model && event === 'change:' + model.idAttribute) {
            delete this._byId[model.previous(model.idAttribute)];
            if (model.id != null) this._byId[model.id] = model;
          }
          this.trigger.apply(this, arguments);
        },
    
        sortedIndex: function (model, value, context) {
          value || (value = this.comparator);
          var iterator = _.isFunction(value) ? value : function(model) {
            return model.get(value);
          };
          return _.sortedIndex(this.models, model, iterator, context);
        }
    
      });
    
      // Underscore methods that we want to implement on the Collection.
      var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
        'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
        'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
        'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
        'tail', 'drop', 'last', 'without', 'indexOf', 'shuffle', 'lastIndexOf',
        'isEmpty', 'chain'];
    
      // Mix in each Underscore method as a proxy to `Collection#models`.
      _.each(methods, function(method) {
        Collection.prototype[method] = function() {
          var args = slice.call(arguments);
          args.unshift(this.models);
          return _[method].apply(_, args);
        };
      });
    
      // Underscore methods that take a property name as an argument.
      var attributeMethods = ['groupBy', 'countBy', 'sortBy'];
    
      // Use attributes instead of properties.
      _.each(attributeMethods, function(method) {
        Collection.prototype[method] = function(value, context) {
          var iterator = _.isFunction(value) ? value : function(model) {
            return model.get(value);
          };
          return _[method](this.models, iterator, context);
        };
      });
    
      // Backbone.Router
      // ---------------
    
      // Routers map faux-URLs to actions, and fire events when routes are
      // matched. Creating a new one sets its `routes` hash, if not set statically.
      var Router = Backbone.Router = function(options) {
        options || (options = {});
        if (options.routes) this.routes = options.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments);
      };
    
      // Cached regular expressions for matching named param parts and splatted
      // parts of route strings.
      var optionalParam = /\((.*?)\)/g;
      var namedParam    = /(\(\?)?:\w+/g;
      var splatParam    = /\*\w+/g;
      var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    
      // Set up all inheritable **Backbone.Router** properties and methods.
      _.extend(Router.prototype, Events, {
    
        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function(){},
    
        // Manually bind a single named route to a callback. For example:
        //
        //     this.route('search/:query/p:num', 'search', function(query, num) {
        //       ...
        //     });
        //
        route: function(route, name, callback) {
          if (!_.isRegExp(route)) route = this._routeToRegExp(route);
          if (!callback) callback = this[name];
          Backbone.history.route(route, _.bind(function(fragment) {
            var args = this._extractParameters(route, fragment);
            callback && callback.apply(this, args);
            this.trigger.apply(this, ['route:' + name].concat(args));
            this.trigger('route', name, args);
            Backbone.history.trigger('route', this, name, args);
          }, this));
          return this;
        },
    
        // Simple proxy to `Backbone.history` to save a fragment into the history.
        navigate: function(fragment, options) {
          Backbone.history.navigate(fragment, options);
          return this;
        },
    
        // Bind all defined routes to `Backbone.history`. We have to reverse the
        // order of the routes here to support behavior where the most general
        // routes can be defined at the bottom of the route map.
        _bindRoutes: function() {
          if (!this.routes) return;
          var route, routes = _.keys(this.routes);
          while ((route = routes.pop()) != null) {
            this.route(route, this.routes[route]);
          }
        },
    
        // Convert a route string into a regular expression, suitable for matching
        // against the current location hash.
        _routeToRegExp: function(route) {
          route = route.replace(escapeRegExp, '\\$&')
                       .replace(optionalParam, '(?:$1)?')
                       .replace(namedParam, function(match, optional){
                         return optional ? match : '([^\/]+)';
                       })
                       .replace(splatParam, '(.*?)');
          return new RegExp('^' + route + '$');
        },
    
        // Given a route, and a URL fragment that it matches, return the array of
        // extracted parameters.
        _extractParameters: function(route, fragment) {
          return route.exec(fragment).slice(1);
        }
    
      });
    
      // Backbone.History
      // ----------------
    
      // Handles cross-browser history management, based on URL fragments. If the
      // browser does not support `onhashchange`, falls back to polling.
      var History = Backbone.History = function() {
        this.handlers = [];
        _.bindAll(this, 'checkUrl');
    
        // Ensure that `History` can be used outside of the browser.
        if (typeof window !== 'undefined') {
          this.location = window.location;
          this.history = window.history;
        }
      };
    
      // Cached regex for stripping a leading hash/slash and trailing space.
      var routeStripper = /^[#\/]|\s+$/g;
    
      // Cached regex for stripping leading and trailing slashes.
      var rootStripper = /^\/+|\/+$/g;
    
      // Cached regex for detecting MSIE.
      var isExplorer = /msie [\w.]+/;
    
      // Cached regex for removing a trailing slash.
      var trailingSlash = /\/$/;
    
      // Has the history handling already been started?
      History.started = false;
    
      // Set up all inheritable **Backbone.History** properties and methods.
      _.extend(History.prototype, Events, {
    
        // The default interval to poll for hash changes, if necessary, is
        // twenty times a second.
        interval: 50,
    
        // Gets the true hash value. Cannot use location.hash directly due to bug
        // in Firefox where location.hash will always be decoded.
        getHash: function(window) {
          var match = (window || this).location.href.match(/#(.*)$/);
          return match ? match[1] : '';
        },
    
        // Get the cross-browser normalized URL fragment, either from the URL,
        // the hash, or the override.
        getFragment: function(fragment, forcePushState) {
          if (fragment == null) {
            if (this._hasPushState || !this._wantsHashChange || forcePushState) {
              fragment = this.location.pathname;
              var root = this.root.replace(trailingSlash, '');
              if (!fragment.indexOf(root)) fragment = fragment.substr(root.length);
            } else {
              fragment = this.getHash();
            }
          }
          return fragment.replace(routeStripper, '');
        },
    
        // Start the hash change handling, returning `true` if the current URL matches
        // an existing route, and `false` otherwise.
        start: function(options) {
          if (History.started) throw new Error("Backbone.history has already been started");
          History.started = true;
    
          // Figure out the initial configuration. Do we need an iframe?
          // Is pushState desired ... is it available?
          this.options          = _.extend({}, {root: '/'}, this.options, options);
          this.root             = this.options.root;
          this._wantsHashChange = this.options.hashChange !== false;
          this._wantsPushState  = !!this.options.pushState;
          this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
          var fragment          = this.getFragment();
          var docMode           = document.documentMode;
          var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));
    
          // Normalize root to always include a leading and trailing slash.
          this.root = ('/' + this.root + '/').replace(rootStripper, '/');
    
          if (oldIE && this._wantsHashChange) {
            this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
            this.navigate(fragment);
          }
    
          // Depending on whether we're using pushState or hashes, and whether
          // 'onhashchange' is supported, determine how we check the URL state.
          if (this._hasPushState) {
            Backbone.$(window).on('popstate', this.checkUrl);
          } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
            Backbone.$(window).on('hashchange', this.checkUrl);
          } else if (this._wantsHashChange) {
            this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
          }
    
          // Determine if we need to change the base url, for a pushState link
          // opened by a non-pushState browser.
          this.fragment = fragment;
          var loc = this.location;
          var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;
    
          // If we've started off with a route from a `pushState`-enabled browser,
          // but we're currently in a browser that doesn't support it...
          if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
            this.fragment = this.getFragment(null, true);
            this.location.replace(this.root + this.location.search + '#' + this.fragment);
            // Return immediately as browser will do redirect to new url
            return true;
    
          // Or if we've started out with a hash-based route, but we're currently
          // in a browser where it could be `pushState`-based instead...
          } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
            this.fragment = this.getHash().replace(routeStripper, '');
            this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
          }
    
          if (!this.options.silent) return this.loadUrl();
        },
    
        // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
        // but possibly useful for unit testing Routers.
        stop: function() {
          Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
          clearInterval(this._checkUrlInterval);
          History.started = false;
        },
    
        // Add a route to be tested when the fragment changes. Routes added later
        // may override previous routes.
        route: function(route, callback) {
          this.handlers.unshift({route: route, callback: callback});
        },
    
        // Checks the current URL to see if it has changed, and if it has,
        // calls `loadUrl`, normalizing across the hidden iframe.
        checkUrl: function(e) {
          var current = this.getFragment();
          if (current === this.fragment && this.iframe) {
            current = this.getFragment(this.getHash(this.iframe));
          }
          if (current === this.fragment) return false;
          if (this.iframe) this.navigate(current);
          this.loadUrl() || this.loadUrl(this.getHash());
        },
    
        // Attempt to load the current URL fragment. If a route succeeds with a
        // match, returns `true`. If no defined routes matches the fragment,
        // returns `false`.
        loadUrl: function(fragmentOverride) {
          var fragment = this.fragment = this.getFragment(fragmentOverride);
          var matched = _.any(this.handlers, function(handler) {
            if (handler.route.test(fragment)) {
              handler.callback(fragment);
              return true;
            }
          });
          return matched;
        },
    
        // Save a fragment into the hash history, or replace the URL state if the
        // 'replace' option is passed. You are responsible for properly URL-encoding
        // the fragment in advance.
        //
        // The options object can contain `trigger: true` if you wish to have the
        // route callback be fired (not usually desirable), or `replace: true`, if
        // you wish to modify the current URL without adding an entry to the history.
        navigate: function(fragment, options) {
          if (!History.started) return false;
          if (!options || options === true) options = {trigger: options};
          fragment = this.getFragment(fragment || '');
          if (this.fragment === fragment) return;
          this.fragment = fragment;
          var url = this.root + fragment;
    
          // If pushState is available, we use it to set the fragment as a real URL.
          if (this._hasPushState) {
            this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
    
          // If hash changes haven't been explicitly disabled, update the hash
          // fragment to store history.
          } else if (this._wantsHashChange) {
            this._updateHash(this.location, fragment, options.replace);
            if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
              // Opening and closing the iframe tricks IE7 and earlier to push a
              // history entry on hash-tag change.  When replace is true, we don't
              // want this.
              if(!options.replace) this.iframe.document.open().close();
              this._updateHash(this.iframe.location, fragment, options.replace);
            }
    
          // If you've told us that you explicitly don't want fallback hashchange-
          // based history, then `navigate` becomes a page refresh.
          } else {
            return this.location.assign(url);
          }
          if (options.trigger) this.loadUrl(fragment);
        },
    
        // Update the hash location, either replacing the current entry, or adding
        // a new one to the browser history.
        _updateHash: function(location, fragment, replace) {
          if (replace) {
            var href = location.href.replace(/(javascript:|#).*$/, '');
            location.replace(href + '#' + fragment);
          } else {
            // Some browsers require that `hash` contains a leading #.
            location.hash = '#' + fragment;
          }
        }
    
      });
    
      // Create the default Backbone.history.
      Backbone.history = new History;
    
      // Backbone.View
      // -------------
    
      // Creating a Backbone.View creates its initial element outside of the DOM,
      // if an existing element is not provided...
      var View = Backbone.View = function(options) {
        this.cid = _.uniqueId('view');
        this._configure(options || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents();
      };
    
      // Cached regex to split keys for `delegate`.
      var delegateEventSplitter = /^(\S+)\s*(.*)$/;
    
      // List of view options to be merged as properties.
      var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];
    
      // Set up all inheritable **Backbone.View** properties and methods.
      _.extend(View.prototype, Events, {
    
        // The default `tagName` of a View's element is `"div"`.
        tagName: 'div',
    
        // jQuery delegate for element lookup, scoped to DOM elements within the
        // current view. This should be prefered to global lookups where possible.
        $: function(selector) {
          return this.$el.find(selector);
        },
    
        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function(){},
    
        // **render** is the core function that your view should override, in order
        // to populate its element (`this.el`), with the appropriate HTML. The
        // convention is for **render** to always return `this`.
        render: function() {
          return this;
        },
    
        // Remove this view by taking the element out of the DOM, and removing any
        // applicable Backbone.Events listeners.
        remove: function() {
          this.$el.remove();
          this.stopListening();
          return this;
        },
    
        // Change the view's element (`this.el` property), including event
        // re-delegation.
        setElement: function(element, delegate) {
          if (this.$el) this.undelegateEvents();
          this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
          this.el = this.$el[0];
          if (delegate !== false) this.delegateEvents();
          return this;
        },
    
        // Set callbacks, where `this.events` is a hash of
        //
        // *{"event selector": "callback"}*
        //
        //     {
        //       'mousedown .title':  'edit',
        //       'click .button':     'save'
        //       'click .open':       function(e) { ... }
        //     }
        //
        // pairs. Callbacks will be bound to the view, with `this` set properly.
        // Uses event delegation for efficiency.
        // Omitting the selector binds the event to `this.el`.
        // This only works for delegate-able events: not `focus`, `blur`, and
        // not `change`, `submit`, and `reset` in Internet Explorer.
        delegateEvents: function(events) {
          if (!(events || (events = _.result(this, 'events')))) return;
          this.undelegateEvents();
          for (var key in events) {
            var method = events[key];
            if (!_.isFunction(method)) method = this[events[key]];
            if (!method) throw new Error('Method "' + events[key] + '" does not exist');
            var match = key.match(delegateEventSplitter);
            var eventName = match[1], selector = match[2];
            method = _.bind(method, this);
            eventName += '.delegateEvents' + this.cid;
            if (selector === '') {
              this.$el.on(eventName, method);
            } else {
              this.$el.on(eventName, selector, method);
            }
          }
        },
    
        // Clears all callbacks previously bound to the view with `delegateEvents`.
        // You usually don't need to use this, but may wish to if you have multiple
        // Backbone views attached to the same DOM element.
        undelegateEvents: function() {
          this.$el.off('.delegateEvents' + this.cid);
        },
    
        // Performs the initial configuration of a View with a set of options.
        // Keys with special meaning *(model, collection, id, className)*, are
        // attached directly to the view.
        _configure: function(options) {
          if (this.options) options = _.extend({}, _.result(this, 'options'), options);
          _.extend(this, _.pick(options, viewOptions));
          this.options = options;
        },
    
        // Ensure that the View has a DOM element to render into.
        // If `this.el` is a string, pass it through `$()`, take the first
        // matching element, and re-assign it to `el`. Otherwise, create
        // an element from the `id`, `className` and `tagName` properties.
        _ensureElement: function() {
          if (!this.el) {
            var attrs = _.extend({}, _.result(this, 'attributes'));
            if (this.id) attrs.id = _.result(this, 'id');
            if (this.className) attrs['class'] = _.result(this, 'className');
            var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
            this.setElement($el, false);
          } else {
            this.setElement(_.result(this, 'el'), false);
          }
        }
    
      });
    
      // Backbone.sync
      // -------------
    
      // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
      var methodMap = {
        'create': 'POST',
        'update': 'PUT',
        'patch':  'PATCH',
        'delete': 'DELETE',
        'read':   'GET'
      };
    
      // Override this function to change the manner in which Backbone persists
      // models to the server. You will be passed the type of request, and the
      // model in question. By default, makes a RESTful Ajax request
      // to the model's `url()`. Some possible customizations could be:
      //
      // * Use `setTimeout` to batch rapid-fire updates into a single request.
      // * Send up the models as XML instead of JSON.
      // * Persist models via WebSockets instead of Ajax.
      //
      // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
      // as `POST`, with a `_method` parameter containing the true HTTP method,
      // as well as all requests with the body as `application/x-www-form-urlencoded`
      // instead of `application/json` with the model in a param named `model`.
      // Useful when interfacing with server-side languages like **PHP** that make
      // it difficult to read the body of `PUT` requests.
      Backbone.sync = function(method, model, options) {
        var type = methodMap[method];
    
        // Default options, unless specified.
        _.defaults(options || (options = {}), {
          emulateHTTP: Backbone.emulateHTTP,
          emulateJSON: Backbone.emulateJSON
        });
    
        // Default JSON-request options.
        var params = {type: type, dataType: 'json'};
    
        // Ensure that we have a URL.
        if (!options.url) {
          params.url = _.result(model, 'url') || urlError();
        }
    
        // Ensure that we have the appropriate request data.
        if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
          params.contentType = 'application/json';
          params.data = JSON.stringify(options.attrs || model.toJSON(options));
        }
    
        // For older servers, emulate JSON by encoding the request into an HTML-form.
        if (options.emulateJSON) {
          params.contentType = 'application/x-www-form-urlencoded';
          params.data = params.data ? {model: params.data} : {};
        }
    
        // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
        // And an `X-HTTP-Method-Override` header.
        if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
          params.type = 'POST';
          if (options.emulateJSON) params.data._method = type;
          var beforeSend = options.beforeSend;
          options.beforeSend = function(xhr) {
            xhr.setRequestHeader('X-HTTP-Method-Override', type);
            if (beforeSend) return beforeSend.apply(this, arguments);
          };
        }
    
        // Don't process data on a non-GET request.
        if (params.type !== 'GET' && !options.emulateJSON) {
          params.processData = false;
        }
    
        var success = options.success;
        options.success = function(resp) {
          if (success) success(model, resp, options);
          model.trigger('sync', model, resp, options);
        };
    
        var error = options.error;
        options.error = function(xhr) {
          if (error) error(model, xhr, options);
          model.trigger('error', model, xhr, options);
        };
    
        // Make the request, allowing the user to override any Ajax options.
        var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
        model.trigger('request', model, xhr, options);
        return xhr;
      };
    
      // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
      Backbone.ajax = function() {
        return Backbone.$.ajax.apply(Backbone.$, arguments);
      };
    
      // Helpers
      // -------
    
      // Helper function to correctly set up the prototype chain, for subclasses.
      // Similar to `goog.inherits`, but uses a hash of prototype properties and
      // class properties to be extended.
      var extend = function(protoProps, staticProps) {
        var parent = this;
        var child;
    
        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        if (protoProps && _.has(protoProps, 'constructor')) {
          child = protoProps.constructor;
        } else {
          child = function(){ return parent.apply(this, arguments); };
        }
    
        // Add static properties to the constructor function, if supplied.
        _.extend(child, parent, staticProps);
    
        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        var Surrogate = function(){ this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;
    
        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) _.extend(child.prototype, protoProps);
    
        // Set a convenience property in case the parent's prototype is needed
        // later.
        child.__super__ = parent.prototype;
    
        return child;
      };
    
      // Set up inheritance for the model, collection, router, view and history.
      Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;
    
      // Throw an error when a URL is needed, and none is supplied.
      var urlError = function() {
        throw new Error('A "url" property or function must be specified');
      };
    
    }).call(this);
    
    // END THIRD PARTY CODE
    _ = context._;
    MTVNPlayer.provide("_", context._);
    MTVNPlayer.provide("$", context.$);
    // Handlebars has some weird scoping issues in 1.0.rc.1.
    MTVNPlayer.provide("Handlebars", Handlebars);
    MTVNPlayer.provide("Backbone", context.Backbone);
    /*globals Util _ */
    Util.getFormFactorMap = function(formFactorID) {
        var ffMap = {};
        // split into individual form factors.
        _((formFactorID).split(".")).each(function(item) {
            item = item.split(":");
            // a hash of each form factor id and its value e.g. {0:1.21:0,1,2}.
            ffMap[item[0]] = item[1].split(",");
        });
        return ffMap;
    };
    /**
     * Utily function used externally.
     */
    Util.getFormFactorValuesForId = function(formFactorID, id) {
        var ffMap = Util.getFormFactorMap(formFactorID);
        return _.isArray(ffMap[id]) ? ffMap[id] : [];
    };
    Util.mapFormFactorID = function(formFactorID, inputMap, copyTo) {
        var ffMap = Util.getFormFactorMap(formFactorID);
        // create an object if we're not augmenting one.
        copyTo = copyTo || {};
        // take the input map and for each item reference the form factor object
        _(inputMap).each(function(item, key) {
            if (_(ffMap).has(key)) {
                // if there's more than one value for a form factor index, map them...
                copyTo[item.name] = ffMap[key].length > 1 ? _(ffMap[key]).map(function(value) {
                    return item.value[value];
                }) : item.value[ffMap[key]];
            } else {
                // use the default, which is the 0 value, unless defaultValue is defined.
                copyTo[item.name] = _.isUndefined(item.defaultValue) ? item.value[0] : item.defaultValue;
            }
        });
        return copyTo;
    };
    /*globals MTVNPlayer Util Handlebars _ */
    var templatePreprocess = function(text) {
        // we need to both support {uri} and {uri.id}, there is an obvious conflict there.
        return text.replace(/\{/g, "{{").replace(/\}/g, "}}").replace(/\{uri\./, "{uriParts.");
    };
    
    /**
     * text can be a single string, an object with string properites, or an array of strings.
     */
    Util.template = function(text, data, keys) {
        // parse strings like {uri}
        if (_.isString(text)) {
            return Handlebars.compile(templatePreprocess(text))(data);
        } else {
            _(text).each(function(prop, key) {
                if (!keys || _.contains(keys,key)) {
                    // do an extra check to make sure there is a template, perhaps enhancing performance.
                    if (_.isString(prop) && prop.indexOf("{") !== -1) {
                        text[key] = Handlebars.compile(templatePreprocess(prop))(data);
                    }
                }
            });
            return text;
        }
    };
    /**
     * This is equivalent to the TemplateProxy in flash.
     */
    Util.buildTemplateData = function(player, extraData) {
        var data = _.extend({}, player.config, extraData),
            splitUri = data.uri.split(":");
        // build uri
        data.uriParts = {
            namespace: splitUri[3],
            id: splitUri[4]
        };
        // metadata for legacy
        data.metadata = player.currentMetadata;
        data.playlistMetadata = player.playlistMetadata;
        // future tempales can just access properties on the embed api.
        data.player = player;
        // legacy this is in flash player, not sure if used.
        data.app = {
            width: data.width,
            height: data.height
        };
        return data;
    };
    MTVNPlayer.provide("mtvn-util", Util);
    context.$ = previous$;
    context.Handlebars = previousHandlebars;
    context._.noConflict();
    context.Backbone.noConflict();
})(this);