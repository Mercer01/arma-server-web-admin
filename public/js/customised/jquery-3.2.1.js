(function (global, factory) {

  'use strict'

  if (typeof module === 'object' && typeof module.exports === 'object') {

    module.exports = global.document ?
      factory(global, true) :
      function (w) {
        if (!w.document) {
          throw new Error('jQuery requires a window with a document')
        }
        return factory(w)
      }
  } else {
    factory(global)
  }

})(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {

  'use strict'

  var arr = []

  var document = window.document

  var getProto = Object.getPrototypeOf

  var slice = arr.slice

  var concat = arr.concat

  var push = arr.push

  var indexOf = arr.indexOf

  var class2type = {}

  var toString = class2type.toString

  var hasOwn = class2type.hasOwnProperty

  var fnToString = hasOwn.toString

  var ObjectFunctionString = fnToString.call(Object)

  var support = {}

  function DOMEval (code, doc) {
    doc = doc || document

    var script = doc.createElement('script')

    script.text = code
    doc.head.appendChild(script).parentNode.removeChild(script)
  }

  var
    version = '3.2.1',

    jQuery = function (selector, context) {

      return new jQuery.fn.init(selector, context)
    },

    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

    rmsPrefix = /^-ms-/,
    rdashAlpha = /-([a-z])/g,

    fcamelCase = function (all, letter) {
      return letter.toUpperCase()
    }

  jQuery.fn = jQuery.prototype = {

    jquery: version,

    constructor: jQuery,

    length: 0,

    toArray: function () {
      return slice.call(this)
    },

    get: function (num) {

      if (num == null) {
        return slice.call(this)
      }

      return num < 0 ? this[num + this.length] : this[num]
    },

    pushStack: function (elems) {

      var ret = jQuery.merge(this.constructor(), elems)

      ret.prevObject = this

      return ret
    },

    each: function (callback) {
      return jQuery.each(this, callback)
    },

    map: function (callback) {
      return this.pushStack(jQuery.map(this, function (elem, i) {
        return callback.call(elem, i, elem)
      }))
    },

    slice: function () {
      return this.pushStack(slice.apply(this, arguments))
    },

    first: function () {
      return this.eq(0)
    },

    last: function () {
      return this.eq(-1)
    },

    eq: function (i) {
      var len = this.length,
        j = +i + (i < 0 ? len : 0)
      return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
    },

    end: function () {
      return this.prevObject || this.constructor()
    },

    push: push,
    sort: arr.sort,
    splice: arr.splice
  }

  jQuery.extend = jQuery.fn.extend = function () {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false

    if (typeof target === 'boolean') {
      deep = target

      target = arguments[i] || {}
      i++
    }

    if (typeof target !== 'object' && !jQuery.isFunction(target)) {
      target = {}
    }

    if (i === length) {
      target = this
      i--
    }

    for (; i < length; i++) {

      if ((options = arguments[i]) != null) {

        for (name in options) {
          src = target[name]
          copy = options[name]

          if (target === copy) {
            continue
          }

          if (deep && copy && (jQuery.isPlainObject(copy) ||
            (copyIsArray = Array.isArray(copy)))) {

            if (copyIsArray) {
              copyIsArray = false
              clone = src && Array.isArray(src) ? src : []

            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {}
            }

            target[name] = jQuery.extend(deep, clone, copy)

          } else if (copy !== undefined) {
            target[name] = copy
          }
        }
      }
    }

    return target
  }

  jQuery.extend({

    expando: 'jQuery' + (version + Math.random()).replace(/\D/g, ''),

    isReady: true,

    error: function (msg) {
      throw new Error(msg)
    },

    noop: function () {},

    isFunction: function (obj) {
      return jQuery.type(obj) === 'function'
    },

    isWindow: function (obj) {
      return obj != null && obj === obj.window
    },

    isNumeric: function (obj) {

      var type = jQuery.type(obj)
      return (type === 'number' || type === 'string') &&

        !isNaN(obj - parseFloat(obj))
    },

    isPlainObject: function (obj) {
      var proto, Ctor

      if (!obj || toString.call(obj) !== '[object Object]') {
        return false
      }

      proto = getProto(obj)

      if (!proto) {
        return true
      }

      Ctor = hasOwn.call(proto, 'constructor') && proto.constructor
      return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString
    },

    isEmptyObject: function (obj) {

      var name

      for (name in obj) {
        return false
      }
      return true
    },

    type: function (obj) {
      if (obj == null) {
        return obj + ''
      }

      return typeof obj === 'object' || typeof obj === 'function' ?
        class2type[toString.call(obj)] || 'object' :
        typeof obj
    },

    globalEval: function (code) {
      DOMEval(code)
    },

    camelCase: function (string) {
      return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase)
    },

    each: function (obj, callback) {
      var length, i = 0

      if (isArrayLike(obj)) {
        length = obj.length
        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break
          }
        }
      }

      return obj
    },

    trim: function (text) {
      return text == null ?
        '' :
        (text + '').replace(rtrim, '')
    },

    makeArray: function (arr, results) {
      var ret = results || []

      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret,
            typeof arr === 'string' ?
              [arr] : arr
          )
        } else {
          push.call(ret, arr)
        }
      }

      return ret
    },

    inArray: function (elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i)
    },

    merge: function (first, second) {
      var len = +second.length,
        j = 0,
        i = first.length

      for (; j < len; j++) {
        first[i++] = second[j]
      }

      first.length = i

      return first
    },

    grep: function (elems, callback, invert) {
      var callbackInverse,
        matches = [],
        i = 0,
        length = elems.length,
        callbackExpect = !invert

      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i)
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i])
        }
      }

      return matches
    },

    map: function (elems, callback, arg) {
      var length, value,
        i = 0,
        ret = []

      if (isArrayLike(elems)) {
        length = elems.length
        for (; i < length; i++) {
          value = callback(elems[i], i, arg)

          if (value != null) {
            ret.push(value)
          }
        }

      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg)

          if (value != null) {
            ret.push(value)
          }
        }
      }

      return concat.apply([], ret)
    },

    guid: 1,

    proxy: function (fn, context) {
      var tmp, args, proxy

      if (typeof context === 'string') {
        tmp = fn[context]
        context = fn
        fn = tmp
      }

      if (!jQuery.isFunction(fn)) {
        return undefined
      }

      args = slice.call(arguments, 2)
      proxy = function () {
        return fn.apply(context || this, args.concat(slice.call(arguments)))
      }

      proxy.guid = fn.guid = fn.guid || jQuery.guid++

      return proxy
    },

    now: Date.now,

    support: support
  })

  if (typeof Symbol === 'function') {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator]
  }

  jQuery.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '),
    function (i, name) {
      class2type['[object ' + name + ']'] = name.toLowerCase()
    })

  function isArrayLike (obj) {

    var length = !!obj && 'length' in obj && obj.length,
      type = jQuery.type(obj)

    if (type === 'function' || jQuery.isWindow(obj)) {
      return false
    }

    return type === 'array' || length === 0 ||
      typeof length === 'number' && length > 0 && (length - 1) in obj
  }

  var Sizzle =

    (function (window) {

      var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,

        setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,

        expando = 'sizzle' + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        sortOrder = function (a, b) {
          if (a === b) {
            hasDuplicate = true
          }
          return 0
        },

        hasOwn = ({}).hasOwnProperty,
        arr = [],
        pop = arr.pop,
        push_native = arr.push,
        push = arr.push,
        slice = arr.slice,

        indexOf = function (list, elem) {
          var i = 0,
            len = list.length
          for (; i < len; i++) {
            if (list[i] === elem) {
              return i
            }
          }
          return -1
        },

        booleans = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',

        whitespace = '[\\x20\\t\\r\\n\\f]',

        identifier = '(?:\\\\.|[\\w-]|[^\0-\\xa0])+',

        attributes = '\\[' + whitespace + '*(' + identifier + ')(?:' + whitespace +

          '*([*^$|!~]?=)' + whitespace +

          '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' + identifier + '))|)' + whitespace +
          '*\\]',

        pseudos = ':(' + identifier + ')(?:\\((' +

          '(\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|' +

          '((?:\\\\.|[^\\\\()[\\]]|' + attributes + ')*)|' +

          '.*' +
          ')\\)|)',

        rwhitespace = new RegExp(whitespace + '+', 'g'),
        rtrim = new RegExp('^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$', 'g'),

        rcomma = new RegExp('^' + whitespace + '*,' + whitespace + '*'),
        rcombinators = new RegExp('^' + whitespace + '*([>+~]|' + whitespace + ')' + whitespace + '*'),

        rattributeQuotes = new RegExp('=' + whitespace + '*([^\\]\'"]*?)' + whitespace + '*\\]', 'g'),

        rpseudo = new RegExp(pseudos),
        ridentifier = new RegExp('^' + identifier + '$'),

        matchExpr = {
          'ID': new RegExp('^#(' + identifier + ')'),
          'CLASS': new RegExp('^\\.(' + identifier + ')'),
          'TAG': new RegExp('^(' + identifier + '|[*])'),
          'ATTR': new RegExp('^' + attributes),
          'PSEUDO': new RegExp('^' + pseudos),
          'CHILD': new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + whitespace +
            '*(even|odd|(([+-]|)(\\d*)n|)' + whitespace + '*(?:([+-]|)' + whitespace +
            '*(\\d+)|))' + whitespace + '*\\)|)', 'i'),
          'bool': new RegExp('^(?:' + booleans + ')$', 'i'),

          'needsContext': new RegExp('^' + whitespace + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
            whitespace + '*((?:-\\d)?\\d*)' + whitespace + '*\\)|)(?=[^-]|$)', 'i')
        },

        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,

        rnative = /^[^{]+\{\s*\[native \w/,

        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

        rsibling = /[+~]/,

        runescape = new RegExp('\\\\([\\da-f]{1,6}' + whitespace + '?|(' + whitespace + ')|.)', 'ig'),
        funescape = function (_, escaped, escapedWhitespace) {
          var high = '0x' + escaped - 0x10000

          return high !== high || escapedWhitespace ?
            escaped :
            high < 0 ?

              String.fromCharCode(high + 0x10000) :

              String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00)
        },

        rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        fcssescape = function (ch, asCodePoint) {
          if (asCodePoint) {

            if (ch === '\0') {
              return '\uFFFD'
            }

            return ch.slice(0, -1) + '\\' + ch.charCodeAt(ch.length - 1).toString(16) + ' '
          }

          return '\\' + ch
        },

        unloadHandler = function () {
          setDocument()
        },

        disabledAncestor = addCombinator(
          function (elem) {
            return elem.disabled === true && ('form' in elem || 'label' in elem)
          },
          { dir: 'parentNode', next: 'legend' }
        )

      try {
        push.apply(
          (arr = slice.call(preferredDoc.childNodes)),
          preferredDoc.childNodes
        )

        arr[preferredDoc.childNodes.length].nodeType
      } catch (e) {
        push = {
          apply: arr.length ?

            function (target, els) {
              push_native.apply(target, slice.call(els))
            } :

            function (target, els) {
              var j = target.length,
                i = 0

              while ((target[j++] = els[i++])) {}
              target.length = j - 1
            }
        }
      }

      function Sizzle (selector, context, results, seed) {
        var m, i, elem, nid, match, groups, newSelector,
          newContext = context && context.ownerDocument,

          nodeType = context ? context.nodeType : 9

        results = results || []

        if (typeof selector !== 'string' || !selector ||
          nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

          return results
        }

        if (!seed) {

          if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
            setDocument(context)
          }
          context = context || document

          if (documentIsHTML) {

            if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

              if ((m = match[1])) {

                if (nodeType === 9) {
                  if ((elem = context.getElementById(m))) {

                    if (elem.id === m) {
                      results.push(elem)
                      return results
                    }
                  } else {
                    return results
                  }

                } else {

                  if (newContext && (elem = newContext.getElementById(m)) &&
                    contains(context, elem) &&
                    elem.id === m) {

                    results.push(elem)
                    return results
                  }
                }

              } else if (match[2]) {
                push.apply(results, context.getElementsByTagName(selector))
                return results

              } else if ((m = match[3]) && support.getElementsByClassName &&
                context.getElementsByClassName) {

                push.apply(results, context.getElementsByClassName(m))
                return results
              }
            }

            if (support.qsa &&
              !compilerCache[selector + ' '] &&
              (!rbuggyQSA || !rbuggyQSA.test(selector))) {

              if (nodeType !== 1) {
                newContext = context
                newSelector = selector

              } else if (context.nodeName.toLowerCase() !== 'object') {

                if ((nid = context.getAttribute('id'))) {
                  nid = nid.replace(rcssescape, fcssescape)
                } else {
                  context.setAttribute('id', (nid = expando))
                }

                groups = tokenize(selector)
                i = groups.length
                while (i--) {
                  groups[i] = '#' + nid + ' ' + toSelector(groups[i])
                }
                newSelector = groups.join(',')

                newContext = rsibling.test(selector) && testContext(context.parentNode) ||
                  context
              }

              if (newSelector) {
                try {
                  push.apply(results,
                    newContext.querySelectorAll(newSelector)
                  )
                  return results
                } catch (qsaError) {
                } finally {
                  if (nid === expando) {
                    context.removeAttribute('id')
                  }
                }
              }
            }
          }
        }

        return select(selector.replace(rtrim, '$1'), context, results, seed)
      }

      function createCache () {
        var keys = []

        function cache (key, value) {

          if (keys.push(key + ' ') > Expr.cacheLength) {

            delete cache[keys.shift()]
          }
          return (cache[key + ' '] = value)
        }

        return cache
      }

      function markFunction (fn) {
        fn[expando] = true
        return fn
      }

      function assert (fn) {
        var el = document.createElement('fieldset')

        try {
          return !!fn(el)
        } catch (e) {
          return false
        } finally {

          if (el.parentNode) {
            el.parentNode.removeChild(el)
          }

          el = null
        }
      }

      function addHandle (attrs, handler) {
        var arr = attrs.split('|'),
          i = arr.length

        while (i--) {
          Expr.attrHandle[arr[i]] = handler
        }
      }

      function siblingCheck (a, b) {
        var cur = b && a,
          diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
            a.sourceIndex - b.sourceIndex

        if (diff) {
          return diff
        }

        if (cur) {
          while ((cur = cur.nextSibling)) {
            if (cur === b) {
              return -1
            }
          }
        }

        return a ? 1 : -1
      }

      function createInputPseudo (type) {
        return function (elem) {
          var name = elem.nodeName.toLowerCase()
          return name === 'input' && elem.type === type
        }
      }

      function createButtonPseudo (type) {
        return function (elem) {
          var name = elem.nodeName.toLowerCase()
          return (name === 'input' || name === 'button') && elem.type === type
        }
      }

      function createDisabledPseudo (disabled) {

        return function (elem) {

          if ('form' in elem) {

            if (elem.parentNode && elem.disabled === false) {

              if ('label' in elem) {
                if ('label' in elem.parentNode) {
                  return elem.parentNode.disabled === disabled
                } else {
                  return elem.disabled === disabled
                }
              }

              return elem.isDisabled === disabled ||

                elem.isDisabled !== !disabled &&
                disabledAncestor(elem) === disabled
            }

            return elem.disabled === disabled

          } else if ('label' in elem) {
            return elem.disabled === disabled
          }

          return false
        }
      }

      function createPositionalPseudo (fn) {
        return markFunction(function (argument) {
          argument = +argument
          return markFunction(function (seed, matches) {
            var j,
              matchIndexes = fn([], seed.length, argument),
              i = matchIndexes.length

            while (i--) {
              if (seed[(j = matchIndexes[i])]) {
                seed[j] = !(matches[j] = seed[j])
              }
            }
          })
        })
      }

      function testContext (context) {
        return context && typeof context.getElementsByTagName !== 'undefined' && context
      }

      support = Sizzle.support = {}

      isXML = Sizzle.isXML = function (elem) {

        var documentElement = elem && (elem.ownerDocument || elem).documentElement
        return documentElement ? documentElement.nodeName !== 'HTML' : false
      }

      setDocument = Sizzle.setDocument = function (node) {
        var hasCompare, subWindow,
          doc = node ? node.ownerDocument || node : preferredDoc

        if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
          return document
        }

        document = doc
        docElem = document.documentElement
        documentIsHTML = !isXML(document)

        if (preferredDoc !== document &&
          (subWindow = document.defaultView) && subWindow.top !== subWindow) {

          if (subWindow.addEventListener) {
            subWindow.addEventListener('unload', unloadHandler, false)

          } else if (subWindow.attachEvent) {
            subWindow.attachEvent('onunload', unloadHandler)
          }
        }

        support.attributes = assert(function (el) {
          el.className = 'i'
          return !el.getAttribute('className')
        })

        support.getElementsByTagName = assert(function (el) {
          el.appendChild(document.createComment(''))
          return !el.getElementsByTagName('*').length
        })

        support.getElementsByClassName = rnative.test(document.getElementsByClassName)

        support.getById = assert(function (el) {
          docElem.appendChild(el).id = expando
          return !document.getElementsByName || !document.getElementsByName(expando).length
        })

        if (support.getById) {
          Expr.filter['ID'] = function (id) {
            var attrId = id.replace(runescape, funescape)
            return function (elem) {
              return elem.getAttribute('id') === attrId
            }
          }
          Expr.find['ID'] = function (id, context) {
            if (typeof context.getElementById !== 'undefined' && documentIsHTML) {
              var elem = context.getElementById(id)
              return elem ? [elem] : []
            }
          }
        } else {
          Expr.filter['ID'] = function (id) {
            var attrId = id.replace(runescape, funescape)
            return function (elem) {
              var node = typeof elem.getAttributeNode !== 'undefined' &&
                elem.getAttributeNode('id')
              return node && node.value === attrId
            }
          }

          Expr.find['ID'] = function (id, context) {
            if (typeof context.getElementById !== 'undefined' && documentIsHTML) {
              var node, i, elems,
                elem = context.getElementById(id)

              if (elem) {

                node = elem.getAttributeNode('id')
                if (node && node.value === id) {
                  return [elem]
                }

                elems = context.getElementsByName(id)
                i = 0
                while ((elem = elems[i++])) {
                  node = elem.getAttributeNode('id')
                  if (node && node.value === id) {
                    return [elem]
                  }
                }
              }

              return []
            }
          }
        }

        Expr.find['TAG'] = support.getElementsByTagName ?
          function (tag, context) {
            if (typeof context.getElementsByTagName !== 'undefined') {
              return context.getElementsByTagName(tag)

            } else if (support.qsa) {
              return context.querySelectorAll(tag)
            }
          } :

          function (tag, context) {
            var elem,
              tmp = [],
              i = 0,

              results = context.getElementsByTagName(tag)

            if (tag === '*') {
              while ((elem = results[i++])) {
                if (elem.nodeType === 1) {
                  tmp.push(elem)
                }
              }

              return tmp
            }
            return results
          }

        Expr.find['CLASS'] = support.getElementsByClassName && function (className, context) {
          if (typeof context.getElementsByClassName !== 'undefined' && documentIsHTML) {
            return context.getElementsByClassName(className)
          }
        }

        rbuggyMatches = []

        rbuggyQSA = []

        if ((support.qsa = rnative.test(document.querySelectorAll))) {

          assert(function (el) {

            docElem.appendChild(el).innerHTML = '<a id=\'' + expando + '\'></a>' +
              '<select id=\'' + expando + '-\r\\\' msallowcapture=\'\'>' +
              '<option selected=\'\'></option></select>'

            if (el.querySelectorAll('[msallowcapture^=\'\']').length) {
              rbuggyQSA.push('[*^$]=' + whitespace + '*(?:\'\'|"")')
            }

            if (!el.querySelectorAll('[selected]').length) {
              rbuggyQSA.push('\\[' + whitespace + '*(?:value|' + booleans + ')')
            }

            if (!el.querySelectorAll('[id~=' + expando + '-]').length) {
              rbuggyQSA.push('~=')
            }

            if (!el.querySelectorAll(':checked').length) {
              rbuggyQSA.push(':checked')
            }

            if (!el.querySelectorAll('a#' + expando + '+*').length) {
              rbuggyQSA.push('.#.+[+~]')
            }
          })

          assert(function (el) {
            el.innerHTML = '<a href=\'\' disabled=\'disabled\'></a>' +
              '<select disabled=\'disabled\'><option/></select>'

            var input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            el.appendChild(input).setAttribute('name', 'D')

            if (el.querySelectorAll('[name=d]').length) {
              rbuggyQSA.push('name' + whitespace + '*[*^$|!~]?=')
            }

            if (el.querySelectorAll(':enabled').length !== 2) {
              rbuggyQSA.push(':enabled', ':disabled')
            }

            docElem.appendChild(el).disabled = true
            if (el.querySelectorAll(':disabled').length !== 2) {
              rbuggyQSA.push(':enabled', ':disabled')
            }

            el.querySelectorAll('*,:x')
            rbuggyQSA.push(',.*:')
          })
        }

        if ((support.matchesSelector = rnative.test((matches = docElem.matches ||
          docElem.webkitMatchesSelector ||
          docElem.mozMatchesSelector ||
          docElem.oMatchesSelector ||
          docElem.msMatchesSelector)))) {

          assert(function (el) {

            support.disconnectedMatch = matches.call(el, '*')

            matches.call(el, '[s!=\'\']:x')
            rbuggyMatches.push('!=', pseudos)
          })
        }

        rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join('|'))
        rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join('|'))

        hasCompare = rnative.test(docElem.compareDocumentPosition)

        contains = hasCompare || rnative.test(docElem.contains) ?
          function (a, b) {
            var adown = a.nodeType === 9 ? a.documentElement : a,
              bup = b && b.parentNode
            return a === bup || !!(bup && bup.nodeType === 1 && (
              adown.contains ?
                adown.contains(bup) :
                a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
            ))
          } :
          function (a, b) {
            if (b) {
              while ((b = b.parentNode)) {
                if (b === a) {
                  return true
                }
              }
            }
            return false
          }

        return document
      }

      Sizzle.matches = function (expr, elements) {
        return Sizzle(expr, null, null, elements)
      }

      Sizzle.matchesSelector = function (elem, expr) {

        if ((elem.ownerDocument || elem) !== document) {
          setDocument(elem)
        }

        expr = expr.replace(rattributeQuotes, '=\'$1\']')

        if (support.matchesSelector && documentIsHTML &&
          !compilerCache[expr + ' '] &&
          (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
          (!rbuggyQSA || !rbuggyQSA.test(expr))) {

          try {
            var ret = matches.call(elem, expr)

            if (ret || support.disconnectedMatch ||

              elem.document && elem.document.nodeType !== 11) {
              return ret
            }
          } catch (e) {}
        }

        return Sizzle(expr, document, null, [elem]).length > 0
      }

      Sizzle.contains = function (context, elem) {

        if ((context.ownerDocument || context) !== document) {
          setDocument(context)
        }
        return contains(context, elem)
      }

      Sizzle.attr = function (elem, name) {

        if ((elem.ownerDocument || elem) !== document) {
          setDocument(elem)
        }

        var fn = Expr.attrHandle[name.toLowerCase()],

          val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
            fn(elem, name, !documentIsHTML) :
            undefined

        return val !== undefined ?
          val :
          support.attributes || !documentIsHTML ?
            elem.getAttribute(name) :
            (val = elem.getAttributeNode(name)) && val.specified ?
              val.value :
              null
      }

      Sizzle.escape = function (sel) {
        return (sel + '').replace(rcssescape, fcssescape)
      }

      Sizzle.error = function (msg) {
        throw new Error('Syntax error, unrecognized expression: ' + msg)
      }

      Expr = Sizzle.selectors = {

        cacheLength: 50,

        createPseudo: markFunction,

        match: matchExpr,

        attrHandle: {},

        find: {},

        relative: {
          '>': { dir: 'parentNode', first: true },
          ' ': { dir: 'parentNode' },
          '+': { dir: 'previousSibling', first: true },
          '~': { dir: 'previousSibling' }
        },

        preFilter: {
          'ATTR': function (match) {
            match[1] = match[1].replace(runescape, funescape)

            match[3] = (match[3] || match[4] || match[5] || '').replace(runescape, funescape)

            if (match[2] === '~=') {
              match[3] = ' ' + match[3] + ' '
            }

            return match.slice(0, 4)
          },
        },

        filter: {

          'TAG': function (nodeNameSelector) {
            var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase()
            return nodeNameSelector === '*' ?
              function () { return true } :
              function (elem) {
                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
              }
          },

          'CLASS': function (className) {
            var pattern = classCache[className + ' ']

            return pattern ||
              (pattern = new RegExp('(^|' + whitespace + ')' + className + '(' + whitespace + '|$)')) &&
              classCache(className, function (elem) {
                return pattern.test(typeof elem.className === 'string' && elem.className || typeof elem.getAttribute !== 'undefined' && elem.getAttribute('class') || '')
              })
          },

          'ATTR': function (name, operator, check) {
            return function (elem) {
              var result = Sizzle.attr(elem, name)

              if (result == null) {
                return operator === '!='
              }
              if (!operator) {
                return true
              }

              result += ''

              return operator === '=' ? result === check :
                operator === '!=' ? result !== check :
                  operator === '^=' ? check && result.indexOf(check) === 0 :
                    operator === '*=' ? check && result.indexOf(check) > -1 :
                      operator === '$=' ? check && result.slice(-check.length) === check :
                        operator === '~=' ? (' ' + result.replace(rwhitespace, ' ') + ' ').indexOf(check) > -1 :
                          operator === '|=' ? result === check || result.slice(0, check.length + 1) === check + '-' :
                            false
            }
          },
        },

        pseudos: {
          'has': markFunction(function (selector) {
            return function (elem) {
              return Sizzle(selector, elem).length > 0
            }
          }),

          'contains': markFunction(function (text) {
            text = text.replace(runescape, funescape)
            return function (elem) {
              return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
            }
          }),

          'lang': markFunction(function (lang) {

            if (!ridentifier.test(lang || '')) {
              Sizzle.error('unsupported lang: ' + lang)
            }
            lang = lang.replace(runescape, funescape).toLowerCase()
            return function (elem) {
              var elemLang
              do {
                if ((elemLang = documentIsHTML ?
                  elem.lang :
                  elem.getAttribute('xml:lang') || elem.getAttribute('lang'))) {

                  elemLang = elemLang.toLowerCase()
                  return elemLang === lang || elemLang.indexOf(lang + '-') === 0
                }
              } while ((elem = elem.parentNode) && elem.nodeType === 1)
              return false
            }
          }),

          'target': function (elem) {
            var hash = window.location && window.location.hash
            return hash && hash.slice(1) === elem.id
          },

          'root': function (elem) {
            return elem === docElem
          },

          'focus': function (elem) {
            return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex)
          },

          'enabled': createDisabledPseudo(false),
          'disabled': createDisabledPseudo(true),

          'checked': function (elem) {

            var nodeName = elem.nodeName.toLowerCase()
            return (nodeName === 'input' && !!elem.checked) || (nodeName === 'option' && !!elem.selected)
          },

          'selected': function (elem) {

            if (elem.parentNode) {
              elem.parentNode.selectedIndex
            }

            return elem.selected === true
          },

          'empty': function (elem) {

            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
              if (elem.nodeType < 6) {
                return false
              }
            }
            return true
          },

          'parent': function (elem) {
            return !Expr.pseudos['empty'](elem)
          },

          'header': function (elem) {
            return rheader.test(elem.nodeName)
          },

          'input': function (elem) {
            return rinputs.test(elem.nodeName)
          },

          'button': function (elem) {
            var name = elem.nodeName.toLowerCase()
            return name === 'input' && elem.type === 'button' || name === 'button'
          },

          'text': function (elem) {
            var attr
            return elem.nodeName.toLowerCase() === 'input' &&
              elem.type === 'text' &&

              ((attr = elem.getAttribute('type')) == null || attr.toLowerCase() === 'text')
          },

          'first': createPositionalPseudo(function () {
            return [0]
          }),

          'last': createPositionalPseudo(function (matchIndexes, length) {
            return [length - 1]
          }),

          'eq': createPositionalPseudo(function (matchIndexes, length, argument) {
            return [argument < 0 ? argument + length : argument]
          }),

          'even': createPositionalPseudo(function (matchIndexes, length) {
            var i = 0
            for (; i < length; i += 2) {
              matchIndexes.push(i)
            }
            return matchIndexes
          }),

          'odd': createPositionalPseudo(function (matchIndexes, length) {
            var i = 1
            for (; i < length; i += 2) {
              matchIndexes.push(i)
            }
            return matchIndexes
          }),

          'lt': createPositionalPseudo(function (matchIndexes, length, argument) {
            var i = argument < 0 ? argument + length : argument
            for (; --i >= 0;) {
              matchIndexes.push(i)
            }
            return matchIndexes
          }),

          'gt': createPositionalPseudo(function (matchIndexes, length, argument) {
            var i = argument < 0 ? argument + length : argument
            for (; ++i < length;) {
              matchIndexes.push(i)
            }
            return matchIndexes
          })
        }
      }

      Expr.pseudos['nth'] = Expr.pseudos['eq']

      for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
        Expr.pseudos[i] = createInputPseudo(i)
      }
      for (i in { submit: true, reset: true }) {
        Expr.pseudos[i] = createButtonPseudo(i)
      }

      function setFilters () {}

      setFilters.prototype = Expr.filters = Expr.pseudos
      Expr.setFilters = new setFilters()

      tokenize = Sizzle.tokenize = function (selector, parseOnly) {
        var matched, match, tokens, type,
          soFar, groups, preFilters,
          cached = tokenCache[selector + ' ']

        if (cached) {
          return parseOnly ? 0 : cached.slice(0)
        }

        soFar = selector
        groups = []
        preFilters = Expr.preFilter

        while (soFar) {

          if (!matched || (match = rcomma.exec(soFar))) {
            if (match) {

              soFar = soFar.slice(match[0].length) || soFar
            }
            groups.push((tokens = []))
          }

          matched = false

          if ((match = rcombinators.exec(soFar))) {
            matched = match.shift()
            tokens.push({
              value: matched,

              type: match[0].replace(rtrim, ' ')
            })
            soFar = soFar.slice(matched.length)
          }

          for (type in Expr.filter) {
            if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
              (match = preFilters[type](match)))) {
              matched = match.shift()
              tokens.push({
                value: matched,
                type: type,
                matches: match
              })
              soFar = soFar.slice(matched.length)
            }
          }

          if (!matched) {
            break
          }
        }

        return parseOnly ?
          soFar.length :
          soFar ?
            Sizzle.error(selector) :

            tokenCache(selector, groups).slice(0)
      }

      function toSelector (tokens) {
        var i = 0,
          len = tokens.length,
          selector = ''
        for (; i < len; i++) {
          selector += tokens[i].value
        }
        return selector
      }

      function addCombinator (matcher, combinator, base) {
        var dir = combinator.dir,
          skip = combinator.next,
          key = skip || dir,
          checkNonElements = base && key === 'parentNode',
          doneName = done++

        return combinator.first ?

          function (elem, context, xml) {
            while ((elem = elem[dir])) {
              if (elem.nodeType === 1 || checkNonElements) {
                return matcher(elem, context, xml)
              }
            }
            return false
          } :

          function (elem, context, xml) {
            var oldCache, uniqueCache, outerCache,
              newCache = [dirruns, doneName]

            if (xml) {
              while ((elem = elem[dir])) {
                if (elem.nodeType === 1 || checkNonElements) {
                  if (matcher(elem, context, xml)) {
                    return true
                  }
                }
              }
            } else {
              while ((elem = elem[dir])) {
                if (elem.nodeType === 1 || checkNonElements) {
                  outerCache = elem[expando] || (elem[expando] = {})

                  uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {})

                  if (skip && skip === elem.nodeName.toLowerCase()) {
                    elem = elem[dir] || elem
                  } else if ((oldCache = uniqueCache[key]) &&
                    oldCache[0] === dirruns && oldCache[1] === doneName) {

                    return (newCache[2] = oldCache[2])
                  } else {

                    uniqueCache[key] = newCache

                    if ((newCache[2] = matcher(elem, context, xml))) {
                      return true
                    }
                  }
                }
              }
            }
            return false
          }
      }

      function elementMatcher (matchers) {
        return matchers.length > 1 ?
          function (elem, context, xml) {
            var i = matchers.length
            while (i--) {
              if (!matchers[i](elem, context, xml)) {
                return false
              }
            }
            return true
          } :
          matchers[0]
      }

      function matcherFromTokens (tokens) {
        var checkContext, matcher, j,
          len = tokens.length,
          leadingRelative = Expr.relative[tokens[0].type],
          implicitRelative = leadingRelative || Expr.relative[' '],
          i = leadingRelative ? 1 : 0,

          matchContext = addCombinator(function (elem) {
            return elem === checkContext
          }, implicitRelative, true),
          matchAnyContext = addCombinator(function (elem) {
            return indexOf(checkContext, elem) > -1
          }, implicitRelative, true),
          matchers = [function (elem, context, xml) {
            var ret = (!leadingRelative && (xml || context !== outermostContext)) || (
              (checkContext = context).nodeType ?
                matchContext(elem, context, xml) :
                matchAnyContext(elem, context, xml))

            checkContext = null
            return ret
          }]

        for (; i < len; i++) {
          if ((matcher = Expr.relative[tokens[i].type])) {
            matchers = [addCombinator(elementMatcher(matchers), matcher)]
          } else {
            matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches)

            if (matcher[expando]) {

              j = ++i
              for (; j < len; j++) {
                if (Expr.relative[tokens[j].type]) {
                  break
                }
              }
              return setMatcher(
                i > 1 && elementMatcher(matchers),
                i > 1 && toSelector(
                tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === ' ' ? '*' : '' })
                ).replace(rtrim, '$1'),
                matcher,
                i < j && matcherFromTokens(tokens.slice(i, j)),
                j < len && matcherFromTokens((tokens = tokens.slice(j))),
                j < len && toSelector(tokens)
              )
            }
            matchers.push(matcher)
          }
        }

        return elementMatcher(matchers)
      }

      function matcherFromGroupMatchers (elementMatchers, setMatchers) {
        var bySet = setMatchers.length > 0,
          byElement = elementMatchers.length > 0,
          superMatcher = function (seed, context, xml, results, outermost) {
            var elem, j, matcher,
              matchedCount = 0,
              i = '0',
              unmatched = seed && [],
              setMatched = [],
              contextBackup = outermostContext,

              elems = seed || byElement && Expr.find['TAG']('*', outermost),

              dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
              len = elems.length

            if (outermost) {
              outermostContext = context === document || context || outermost
            }

            for (; i !== len && (elem = elems[i]) != null; i++) {
              if (byElement && elem) {
                j = 0
                if (!context && elem.ownerDocument !== document) {
                  setDocument(elem)
                  xml = !documentIsHTML
                }
                while ((matcher = elementMatchers[j++])) {
                  if (matcher(elem, context || document, xml)) {
                    results.push(elem)
                    break
                  }
                }
                if (outermost) {
                  dirruns = dirrunsUnique
                }
              }

              if (bySet) {

                if ((elem = !matcher && elem)) {
                  matchedCount--
                }

                if (seed) {
                  unmatched.push(elem)
                }
              }
            }

            matchedCount += i

            if (bySet && i !== matchedCount) {
              j = 0
              while ((matcher = setMatchers[j++])) {
                matcher(unmatched, setMatched, context, xml)
              }

              if (seed) {

                if (matchedCount > 0) {
                  while (i--) {
                    if (!(unmatched[i] || setMatched[i])) {
                      setMatched[i] = pop.call(results)
                    }
                  }
                }

                setMatched = condense(setMatched)
              }

              push.apply(results, setMatched)

              if (outermost && !seed && setMatched.length > 0 &&
                (matchedCount + setMatchers.length) > 1) {

                Sizzle.uniqueSort(results)
              }
            }

            if (outermost) {
              dirruns = dirrunsUnique
              outermostContext = contextBackup
            }

            return unmatched
          }

        return bySet ?
          markFunction(superMatcher) :
          superMatcher
      }

      compile = Sizzle.compile = function (selector, match) {
        var i,
          setMatchers = [],
          elementMatchers = [],
          cached = compilerCache[selector + ' ']

        if (!cached) {

          if (!match) {
            match = tokenize(selector)
          }
          i = match.length
          while (i--) {
            cached = matcherFromTokens(match[i])
            if (cached[expando]) {
              setMatchers.push(cached)
            } else {
              elementMatchers.push(cached)
            }
          }

          cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers))

          cached.selector = selector
        }
        return cached
      }

      select = Sizzle.select = function (selector, context, results, seed) {
        var i, tokens, token, type, find,
          compiled = typeof selector === 'function' && selector,
          match = !seed && tokenize((selector = compiled.selector || selector))

        results = results || []

        if (match.length === 1) {

          tokens = match[0] = match[0].slice(0)
          if (tokens.length > 2 && (token = tokens[0]).type === 'ID' &&
            context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

            context = (Expr.find['ID'](token.matches[0].replace(runescape, funescape), context) || [])[0]
            if (!context) {
              return results

            } else if (compiled) {
              context = context.parentNode
            }

            selector = selector.slice(tokens.shift().value.length)
          }

          i = matchExpr['needsContext'].test(selector) ? 0 : tokens.length
          while (i--) {
            token = tokens[i]

            if (Expr.relative[(type = token.type)]) {
              break
            }
            if ((find = Expr.find[type])) {

              if ((seed = find(
                token.matches[0].replace(runescape, funescape),
                rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
              ))) {

                tokens.splice(i, 1)
                selector = seed.length && toSelector(tokens)
                if (!selector) {
                  push.apply(results, seed)
                  return results
                }

                break
              }
            }
          }
        }

        (compiled || compile(selector, match))(
          seed,
          context,
          !documentIsHTML,
          results,
          !context || rsibling.test(selector) && testContext(context.parentNode) || context
        )
        return results
      }

      support.sortStable = expando.split('').sort(sortOrder).join('') === expando

      support.detectDuplicates = !!hasDuplicate

      setDocument()

      support.sortDetached = assert(function (el) {

        return el.compareDocumentPosition(document.createElement('fieldset')) & 1
      })

      if (!assert(function (el) {
        el.innerHTML = '<a href=\'#\'></a>'
        return el.firstChild.getAttribute('href') === '#'
      })) {
        addHandle('type|href|height|width', function (elem, name, isXML) {
          if (!isXML) {
            return elem.getAttribute(name, name.toLowerCase() === 'type' ? 1 : 2)
          }
        })
      }

      if (!support.attributes || !assert(function (el) {
        el.innerHTML = '<input/>'
        el.firstChild.setAttribute('value', '')
        return el.firstChild.getAttribute('value') === ''
      })) {
        addHandle('value', function (elem, name, isXML) {
          if (!isXML && elem.nodeName.toLowerCase() === 'input') {
            return elem.defaultValue
          }
        })
      }

      if (!assert(function (el) {
        return el.getAttribute('disabled') == null
      })) {
        addHandle(booleans, function (elem, name, isXML) {
          var val
          if (!isXML) {
            return elem[name] === true ? name.toLowerCase() :
              (val = elem.getAttributeNode(name)) && val.specified ?
                val.value :
                null
          }
        })
      }

      return Sizzle

    })(window)

  jQuery.find = Sizzle
  jQuery.expr = Sizzle.selectors

  jQuery.expr[':'] = jQuery.expr.pseudos
  jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort
  jQuery.text = Sizzle.getText
  jQuery.isXMLDoc = Sizzle.isXML
  jQuery.contains = Sizzle.contains
  jQuery.escapeSelector = Sizzle.escape

  var dir = function (elem, dir, until) {
    var matched = [],
      truncate = until !== undefined

    while ((elem = elem[dir]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery(elem).is(until)) {
          break
        }
        matched.push(elem)
      }
    }
    return matched
  }

  var siblings = function (n, elem) {
    var matched = []

    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n)
      }
    }

    return matched
  }

  var rneedsContext = jQuery.expr.match.needsContext

  function nodeName (elem, name) {

    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()

  }

  var rsingleTag = (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i)

  var risSimple = /^.[^:#\[\.,]*$/

  function winnow (elements, qualifier, not) {
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function (elem, i) {
        return !!qualifier.call(elem, i, elem) !== not
      })
    }

    if (qualifier.nodeType) {
      return jQuery.grep(elements, function (elem) {
        return (elem === qualifier) !== not
      })
    }

    if (typeof qualifier !== 'string') {
      return jQuery.grep(elements, function (elem) {
        return (indexOf.call(qualifier, elem) > -1) !== not
      })
    }

    if (risSimple.test(qualifier)) {
      return jQuery.filter(qualifier, elements, not)
    }

    qualifier = jQuery.filter(qualifier, elements)
    return jQuery.grep(elements, function (elem) {
      return (indexOf.call(qualifier, elem) > -1) !== not && elem.nodeType === 1
    })
  }

  jQuery.filter = function (expr, elems, not) {
    var elem = elems[0]

    if (not) {
      expr = ':not(' + expr + ')'
    }

    if (elems.length === 1 && elem.nodeType === 1) {
      return jQuery.find.matchesSelector(elem, expr) ? [elem] : []
    }

    return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
      return elem.nodeType === 1
    }))
  }

  jQuery.fn.extend({
    find: function (selector) {
      var i, ret,
        len = this.length,
        self = this

      if (typeof selector !== 'string') {
        return this.pushStack(jQuery(selector).filter(function () {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true
            }
          }
        }))
      }

      ret = this.pushStack([])

      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret)
      }

      return len > 1 ? jQuery.uniqueSort(ret) : ret
    },
    filter: function (selector) {
      return this.pushStack(winnow(this, selector || [], false))
    },
    not: function (selector) {
      return this.pushStack(winnow(this, selector || [], true))
    },
    is: function (selector) {
      return !!winnow(
        this,

        typeof selector === 'string' && rneedsContext.test(selector) ?
          jQuery(selector) :
          selector || [],
        false
      ).length
    }
  })

  var rootjQuery,

    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

    init = jQuery.fn.init = function (selector, context, root) {
      var match, elem

      if (!selector) {
        return this
      }

      root = root || rootjQuery

      if (typeof selector === 'string') {
        if (selector[0] === '<' &&
          selector[selector.length - 1] === '>' &&
          selector.length >= 3) {

          match = [null, selector, null]

        } else {
          match = rquickExpr.exec(selector)
        }

        if (match && (match[1] || !context)) {

          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context

            jQuery.merge(this, jQuery.parseHTML(
              match[1],
              context && context.nodeType ? context.ownerDocument || context : document,
              true
            ))

            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {

                if (jQuery.isFunction(this[match])) {
                  this[match](context[match])

                } else {
                  this.attr(match, context[match])
                }
              }
            }

            return this

          } else {
            elem = document.getElementById(match[2])

            if (elem) {

              this[0] = elem
              this.length = 1
            }
            return this
          }

        } else if (!context || context.jquery) {
          return (context || root).find(selector)

        } else {
          return this.constructor(context).find(selector)
        }

      } else if (selector.nodeType) {
        this[0] = selector
        this.length = 1
        return this

      } else if (jQuery.isFunction(selector)) {
        return root.ready !== undefined ?
          root.ready(selector) :

          selector(jQuery)
      }

      return jQuery.makeArray(selector, this)
    }

  init.prototype = jQuery.fn

  rootjQuery = jQuery(document)

  var rparentsprev = /^(?:parents|prev(?:Until|All))/,

    guaranteedUnique = {
      children: true,
      contents: true,
      next: true,
      prev: true
    }

  jQuery.fn.extend({
    has: function (target) {
      var targets = jQuery(target, this),
        l = targets.length

      return this.filter(function () {
        var i = 0
        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true
          }
        }
      })
    },

    closest: function (selectors, context) {
      var cur,
        i = 0,
        l = this.length,
        matched = [],
        targets = typeof selectors !== 'string' && jQuery(selectors)

      if (!rneedsContext.test(selectors)) {
        for (; i < l; i++) {
          for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

            if (cur.nodeType < 11 && (targets ?
              targets.index(cur) > -1 :

              cur.nodeType === 1 &&
              jQuery.find.matchesSelector(cur, selectors))) {

              matched.push(cur)
              break
            }
          }
        }
      }

      return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched)
    },

    index: function (elem) {

      if (!elem) {
        return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1
      }

      if (typeof elem === 'string') {
        return indexOf.call(jQuery(elem), this[0])
      }

      return indexOf.call(this,

        elem.jquery ? elem[0] : elem
      )
    },

    add: function (selector, context) {
      return this.pushStack(
        jQuery.uniqueSort(
          jQuery.merge(this.get(), jQuery(selector, context))
        )
      )
    },

    addBack: function (selector) {
      return this.add(selector == null ?
        this.prevObject : this.prevObject.filter(selector)
      )
    }
  })

  function sibling (cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
    return cur
  }

  jQuery.each({
    parent: function (elem) {
      var parent = elem.parentNode
      return parent && parent.nodeType !== 11 ? parent : null
    },
    parents: function (elem) {
      return dir(elem, 'parentNode')
    },
    parentsUntil: function (elem, i, until) {
      return dir(elem, 'parentNode', until)
    },
    next: function (elem) {
      return sibling(elem, 'nextSibling')
    },
    prev: function (elem) {
      return sibling(elem, 'previousSibling')
    },
    nextAll: function (elem) {
      return dir(elem, 'nextSibling')
    },
    prevAll: function (elem) {
      return dir(elem, 'previousSibling')
    },
    nextUntil: function (elem, i, until) {
      return dir(elem, 'nextSibling', until)
    },
    prevUntil: function (elem, i, until) {
      return dir(elem, 'previousSibling', until)
    },
    siblings: function (elem) {
      return siblings((elem.parentNode || {}).firstChild, elem)
    },
    children: function (elem) {
      return siblings(elem.firstChild)
    },
    contents: function (elem) {
      if (nodeName(elem, 'iframe')) {
        return elem.contentDocument
      }

      if (nodeName(elem, 'template')) {
        elem = elem.content || elem
      }

      return jQuery.merge([], elem.childNodes)
    }
  }, function (name, fn) {
    jQuery.fn[name] = function (until, selector) {
      var matched = jQuery.map(this, fn, until)

      if (name.slice(-5) !== 'Until') {
        selector = until
      }

      if (selector && typeof selector === 'string') {
        matched = jQuery.filter(selector, matched)
      }

      if (this.length > 1) {

        if (!guaranteedUnique[name]) {
          jQuery.uniqueSort(matched)
        }

        if (rparentsprev.test(name)) {
          matched.reverse()
        }
      }

      return this.pushStack(matched)
    }
  })
  var rnothtmlwhite = (/[^\x20\t\r\n\f]+/g)

  function createOptions (options) {
    var object = {}
    jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
      object[flag] = true
    })
    return object
  }

  jQuery.Callbacks = function (options) {

    options = typeof options === 'string' ?
      createOptions(options) :
      jQuery.extend({}, options)

    var
      firing,

      memory,

      fired,

      locked,

      list = [],

      queue = [],

      firingIndex = -1,

      fire = function () {

        locked = locked || options.once

        fired = firing = true
        for (; queue.length; firingIndex = -1) {
          memory = queue.shift()
          while (++firingIndex < list.length) {

            if (list[firingIndex].apply(memory[0], memory[1]) === false &&
              options.stopOnFalse) {

              firingIndex = list.length
              memory = false
            }
          }
        }

        if (!options.memory) {
          memory = false
        }

        firing = false

        if (locked) {

          if (memory) {
            list = []

          } else {
            list = ''
          }
        }
      },

      self = {

        add: function () {
          if (list) {

            if (memory && !firing) {
              firingIndex = list.length - 1
              queue.push(memory)
            }

            (function add (args) {
              jQuery.each(args, function (_, arg) {
                if (jQuery.isFunction(arg)) {
                  if (!options.unique || !self.has(arg)) {
                    list.push(arg)
                  }
                } else if (arg && arg.length && jQuery.type(arg) !== 'string') {

                  add(arg)
                }
              })
            })(arguments)

            if (memory && !firing) {
              fire()
            }
          }
          return this
        },

        has: function (fn) {
          return fn ?
            jQuery.inArray(fn, list) > -1 :
            list.length > 0
        },

        empty: function () {
          if (list) {
            list = []
          }
          return this
        },

        disable: function () {
          locked = queue = []
          list = memory = ''
          return this
        },
        disabled: function () {
          return !list
        },

        lock: function () {
          locked = queue = []
          if (!memory && !firing) {
            list = memory = ''
          }
          return this
        },
        locked: function () {
          return !!locked
        },

        fireWith: function (context, args) {
          if (!locked) {
            args = args || []
            args = [context, args.slice ? args.slice() : args]
            queue.push(args)
            if (!firing) {
              fire()
            }
          }
          return this
        },

        fire: function () {
          self.fireWith(this, arguments)
          return this
        },

        fired: function () {
          return !!fired
        }
      }

    return self
  }
  jQuery.extend({

    Deferred: function (func) {
      var tuples = [

          ['notify', 'progress', jQuery.Callbacks('memory'),
            jQuery.Callbacks('memory'), 2],
          ['resolve', 'done', jQuery.Callbacks('once memory'),
            jQuery.Callbacks('once memory'), 0, 'resolved'],
          ['reject', 'fail', jQuery.Callbacks('once memory'),
            jQuery.Callbacks('once memory'), 1, 'rejected']
        ],
        state = 'pending',
        promise = {
          state: function () {
            return state
          },
          always: function () {
            deferred.done(arguments).fail(arguments)
            return this
          },
          'catch': function (fn) {
            return promise.then(null, fn)
          },

          promise: function (obj) {
            return obj != null ? jQuery.extend(obj, promise) : promise
          }
        },
        deferred = {}

      jQuery.each(tuples, function (i, tuple) {
        var list = tuple[2],
          stateString = tuple[5]

        promise[tuple[1]] = list.add

        if (stateString) {
          list.add(
            function () {

              state = stateString
            },

            tuples[3 - i][2].disable,

            tuples[0][2].lock
          )
        }

        list.add(tuple[3].fire)

        deferred[tuple[0]] = function () {
          deferred[tuple[0] + 'With'](this === deferred ? undefined : this, arguments)
          return this
        }

        deferred[tuple[0] + 'With'] = list.fireWith
      })

      promise.promise(deferred)

      if (func) {
        func.call(deferred, deferred)
      }

      return deferred
    },

  })
  var readyList = jQuery.Deferred()

  jQuery.extend({

    isReady: false,

    readyWait: 1,

    ready: function (wait) {

      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return
      }

      jQuery.isReady = true

      if (wait !== true && --jQuery.readyWait > 0) {
        return
      }

      readyList.resolveWith(document, [jQuery])
    }
  })

  jQuery.ready.then = readyList.then

  function completed () {
    document.removeEventListener('DOMContentLoaded', completed)
    window.removeEventListener('load', completed)
    jQuery.ready()
  }

  if (document.readyState === 'complete' ||
    (document.readyState !== 'loading' && !document.documentElement.doScroll)) {

    window.setTimeout(jQuery.ready)

  } else {

    document.addEventListener('DOMContentLoaded', completed)

    window.addEventListener('load', completed)
  }

  var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
      len = elems.length,
      bulk = key == null

    if (jQuery.type(key) === 'object') {
      chainable = true
      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw)
      }

    } else if (value !== undefined) {
      chainable = true

      if (!jQuery.isFunction(value)) {
        raw = true
      }

      if (bulk) {

        if (raw) {
          fn.call(elems, value)
          fn = null

        } else {
          bulk = fn
          fn = function (elem, key, value) {
            return bulk.call(jQuery(elem), value)
          }
        }
      }

      if (fn) {
        for (; i < len; i++) {
          fn(
            elems[i], key, raw ?
              value :
              value.call(elems[i], i, fn(elems[i], key))
          )
        }
      }
    }

    if (chainable) {
      return elems
    }

    if (bulk) {
      return fn.call(elems)
    }

    return len ? fn(elems[0], key) : emptyGet
  }
  var acceptData = function (owner) {

    return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType)
  }

  function Data () {
    this.expando = jQuery.expando + Data.uid++
  }

  Data.uid = 1

  Data.prototype = {

    cache: function (owner) {

      var value = owner[this.expando]

      if (!value) {
        value = {}

        if (acceptData(owner)) {

          if (owner.nodeType) {
            owner[this.expando] = value

          } else {
            Object.defineProperty(owner, this.expando, {
              value: value,
              configurable: true
            })
          }
        }
      }

      return value
    },
    set: function (owner, data, value) {
      var prop,
        cache = this.cache(owner)

      if (typeof data === 'string') {
        cache[jQuery.camelCase(data)] = value

      } else {

        for (prop in data) {
          cache[jQuery.camelCase(prop)] = data[prop]
        }
      }
      return cache
    },
    get: function (owner, key) {
      return key === undefined ?
        this.cache(owner) :

        owner[this.expando] && owner[this.expando][jQuery.camelCase(key)]
    },
    access: function (owner, key, value) {

      if (key === undefined ||
        ((key && typeof key === 'string') && value === undefined)) {

        return this.get(owner, key)
      }

      this.set(owner, key, value)

      return value !== undefined ? value : key
    },
    remove: function (owner, key) {
      var i,
        cache = owner[this.expando]

      if (cache === undefined) {
        return
      }

      if (key !== undefined) {

        if (Array.isArray(key)) {

          key = key.map(jQuery.camelCase)
        } else {
          key = jQuery.camelCase(key)

          key = key in cache ?
            [key] :
            (key.match(rnothtmlwhite) || [])
        }

        i = key.length

        while (i--) {
          delete cache[key[i]]
        }
      }

      if (key === undefined || jQuery.isEmptyObject(cache)) {

        if (owner.nodeType) {
          owner[this.expando] = undefined
        } else {
          delete owner[this.expando]
        }
      }
    },
    hasData: function (owner) {
      var cache = owner[this.expando]
      return cache !== undefined && !jQuery.isEmptyObject(cache)
    }
  }
  var dataPriv = new Data()

  var dataUser = new Data()
  jQuery.extend({
    data: function (elem, name, data) {
      return dataUser.access(elem, name, data)
    }
  })

  jQuery.fn.extend({
    data: function (key, value) {
      var i, name, data,
        elem = this[0],
        attrs = elem && elem.attributes

      if (key === undefined) {
        if (this.length) {
          data = dataUser.get(elem)

          if (elem.nodeType === 1 && !dataPriv.get(elem, 'hasDataAttrs')) {
            i = attrs.length
            while (i--) {

              if (attrs[i]) {
                name = attrs[i].name
                if (name.indexOf('data-') === 0) {
                  name = jQuery.camelCase(name.slice(5))
                  dataAttr(elem, name, data[name])
                }
              }
            }
            dataPriv.set(elem, 'hasDataAttrs', true)
          }
        }

        return data
      }

      if (typeof key === 'object') {
        return this.each(function () {
          dataUser.set(this, key)
        })
      }

      return access(this, function (value) {
        var data

        if (elem && value === undefined) {

          data = dataUser.get(elem, key)
          if (data !== undefined) {
            return data
          }

          data = dataAttr(elem, key)
          if (data !== undefined) {
            return data
          }

          return
        }

        this.each(function () {

          dataUser.set(this, key, value)
        })
      }, null, value, arguments.length > 1, null, true)
    },

    removeData: function (key) {
      return this.each(function () {
        dataUser.remove(this, key)
      })
    }
  })

  var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source

  var rcssNum = new RegExp('^(?:([+-])=|)(' + pnum + ')([a-z%]*)$', 'i')

  var cssExpand = ['Top', 'Right', 'Bottom', 'Left']

  var wrapMap = {

    option: [1, '<select multiple=\'multiple\'>', '</select>'],

    thead: [1, '<table>', '</table>'],
    col: [2, '<table><colgroup>', '</colgroup></table>'],
    tr: [2, '<table><tbody>', '</tbody></table>'],
    td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],

    _default: [0, '', '']
  }

  wrapMap.optgroup = wrapMap.option

  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead
  wrapMap.th = wrapMap.td

  var rhtml = /<|&#?\w+;/;
  (function () {
    var fragment = document.createDocumentFragment(),
      div = fragment.appendChild(document.createElement('div')),
      input = document.createElement('input')

    input.setAttribute('type', 'radio')
    input.setAttribute('checked', 'checked')
    input.setAttribute('name', 't')

    div.appendChild(input)

    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked

    div.innerHTML = '<textarea>x</textarea>'
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue
  })()
  var documentElement = document.documentElement

  var
    rkeyEvent = /^key/,
    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    rtypenamespace = /^([^.]*)(?:\.(.+)|)/

  function returnTrue () {
    return true
  }

  function returnFalse () {
    return false
  }

  function on (elem, types, selector, data, fn, one) {
    var origFn, type

    if (typeof types === 'object') {

      if (typeof selector !== 'string') {

        data = data || selector
        selector = undefined
      }
      for (type in types) {
        on(elem, type, selector, data, types[type], one)
      }
      return elem
    }

    if (data == null && fn == null) {

      fn = selector
      data = selector = undefined
    } else if (fn == null) {
      if (typeof selector === 'string') {

        fn = data
        data = undefined
      } else {

        fn = data
        data = selector
        selector = undefined
      }
    }
    if (fn === false) {
      fn = returnFalse
    } else if (!fn) {
      return elem
    }

    if (one === 1) {
      origFn = fn
      fn = function (event) {

        jQuery().off(event)
        return origFn.apply(this, arguments)
      }

      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)
    }
    return elem.each(function () {
      jQuery.event.add(this, types, fn, data, selector)
    })
  }

  jQuery.event = {

    global: {},

    add: function (elem, types, handler, data, selector) {

      var handleObjIn, eventHandle, tmp,
        events, t, handleObj,
        special, handlers, type, namespaces, origType,
        elemData = dataPriv.get(elem)

      if (!elemData) {
        return
      }

      if (handler.handler) {
        handleObjIn = handler
        handler = handleObjIn.handler
        selector = handleObjIn.selector
      }

      if (selector) {
        jQuery.find.matchesSelector(documentElement, selector)
      }

      if (!handler.guid) {
        handler.guid = jQuery.guid++
      }

      if (!(events = elemData.events)) {
        events = elemData.events = {}
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function (e) {

          return typeof jQuery !== 'undefined' && jQuery.event.triggered !== e.type ?
            jQuery.event.dispatch.apply(elem, arguments) : undefined
        }
      }

      types = (types || '').match(rnothtmlwhite) || ['']
      t = types.length
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || []
        type = origType = tmp[1]
        namespaces = (tmp[2] || '').split('.').sort()

        if (!type) {
          continue
        }

        special = jQuery.event.special[type] || {}

        type = (selector ? special.delegateType : special.bindType) || type

        special = jQuery.event.special[type] || {}

        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join('.')
        }, handleObjIn)

        if (!(handlers = events[type])) {
          handlers = events[type] = []
          handlers.delegateCount = 0

          if (!special.setup ||
            special.setup.call(elem, data, namespaces, eventHandle) === false) {

            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle)
            }
          }
        }

        if (special.add) {
          special.add.call(elem, handleObj)

          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid
          }
        }

        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj)
        } else {
          handlers.push(handleObj)
        }

        jQuery.event.global[type] = true
      }

    },

    dispatch: function (nativeEvent) {

      var event = jQuery.event.fix(nativeEvent)

      var i, j, ret, matched, handleObj, handlerQueue,
        args = new Array(arguments.length),
        handlers = (dataPriv.get(this, 'events') || {})[event.type] || [],
        special = jQuery.event.special[event.type] || {}

      args[0] = event

      for (i = 1; i < arguments.length; i++) {
        args[i] = arguments[i]
      }

      event.delegateTarget = this

      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return
      }

      handlerQueue = jQuery.event.handlers.call(this, event, handlers)

      i = 0
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem

        j = 0
        while ((handleObj = matched.handlers[j++]) &&
        !event.isImmediatePropagationStopped()) {

          if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

            event.handleObj = handleObj
            event.data = handleObj.data

            ret = ((jQuery.event.special[handleObj.origType] || {}).handle ||
              handleObj.handler).apply(matched.elem, args)

            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault()
                event.stopPropagation()
              }
            }
          }
        }
      }

      if (special.postDispatch) {
        special.postDispatch.call(this, event)
      }

      return event.result
    },

    handlers: function (event, handlers) {
      var i, handleObj, sel, matchedHandlers, matchedSelectors,
        handlerQueue = [],
        delegateCount = handlers.delegateCount,
        cur = event.target

      if (delegateCount &&

        cur.nodeType &&

        !(event.type === 'click' && event.button >= 1)) {

        for (; cur !== this; cur = cur.parentNode || this) {

          if (cur.nodeType === 1 && !(event.type === 'click' && cur.disabled === true)) {
            matchedHandlers = []
            matchedSelectors = {}
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i]

              sel = handleObj.selector + ' '

              if (matchedSelectors[sel] === undefined) {
                matchedSelectors[sel] = handleObj.needsContext ?
                  jQuery(sel, this).index(cur) > -1 :
                  jQuery.find(sel, this, null, [cur]).length
              }
              if (matchedSelectors[sel]) {
                matchedHandlers.push(handleObj)
              }
            }
            if (matchedHandlers.length) {
              handlerQueue.push({ elem: cur, handlers: matchedHandlers })
            }
          }
        }
      }

      cur = this
      if (delegateCount < handlers.length) {
        handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) })
      }

      return handlerQueue
    },

    addProp: function (name, hook) {
      Object.defineProperty(jQuery.Event.prototype, name, {
        enumerable: true,
        configurable: true,

        get: jQuery.isFunction(hook) ?
          function () {
            if (this.originalEvent) {
              return hook(this.originalEvent)
            }
          } :
          function () {
            if (this.originalEvent) {
              return this.originalEvent[name]
            }
          },

        set: function (value) {
          Object.defineProperty(this, name, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: value
          })
        }
      })
    },

    fix: function (originalEvent) {
      return originalEvent[jQuery.expando] ?
        originalEvent :
        new jQuery.Event(originalEvent)
    },

    special: {
      load: {

        noBubble: true
      },
      focus: {

        trigger: function () {
          if (this !== safeActiveElement() && this.focus) {
            this.focus()
            return false
          }
        },
        delegateType: 'focusin'
      },
      blur: {
        trigger: function () {
          if (this === safeActiveElement() && this.blur) {
            this.blur()
            return false
          }
        },
        delegateType: 'focusout'
      },
      click: {

        trigger: function () {
          if (this.type === 'checkbox' && this.click && nodeName(this, 'input')) {
            this.click()
            return false
          }
        },

        _default: function (event) {
          return nodeName(event.target, 'a')
        }
      },

      beforeunload: {
        postDispatch: function (event) {

          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result
          }
        }
      }
    }
  }

  jQuery.removeEvent = function (elem, type, handle) {

    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle)
    }
  }

  jQuery.Event = function (src, props) {

    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props)
    }

    if (src && src.type) {
      this.originalEvent = src
      this.type = src.type

      this.isDefaultPrevented = src.defaultPrevented ||
      src.defaultPrevented === undefined &&

      src.returnValue === false ?
        returnTrue :
        returnFalse

      this.target = (src.target && src.target.nodeType === 3) ?
        src.target.parentNode :
        src.target

      this.currentTarget = src.currentTarget
      this.relatedTarget = src.relatedTarget

    } else {
      this.type = src
    }

    if (props) {
      jQuery.extend(this, props)
    }

    this.timeStamp = src && src.timeStamp || jQuery.now()

    this[jQuery.expando] = true
  }

  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    isSimulated: false,

  }

  jQuery.each({
    altKey: true,
    bubbles: true,
    cancelable: true,
    changedTouches: true,
    ctrlKey: true,
    detail: true,
    eventPhase: true,
    metaKey: true,
    pageX: true,
    pageY: true,
    shiftKey: true,
    view: true,
    'char': true,
    charCode: true,
    key: true,
    keyCode: true,
    button: true,
    buttons: true,
    clientX: true,
    clientY: true,
    offsetX: true,
    offsetY: true,
    pointerId: true,
    pointerType: true,
    screenX: true,
    screenY: true,
    targetTouches: true,
    toElement: true,
    touches: true,

    which: function (event) {
      var button = event.button

      if (event.which == null && rkeyEvent.test(event.type)) {
        return event.charCode != null ? event.charCode : event.keyCode
      }

      if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
        if (button && 1) {
          return 1
        }

        if (button && 2) {
          return 3
        }

        if (button && 4) {
          return 2
        }

        return 0
      }

      return event.which
    }
  }, jQuery.event.addProp)

  jQuery.each({
    mouseenter: 'mouseover',
    mouseleave: 'mouseout',
    pointerenter: 'pointerover',
    pointerleave: 'pointerout'
  }, function (orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,

      handle: function (event) {
        var ret,
          target = this,
          related = event.relatedTarget,
          handleObj = event.handleObj

        if (!related || (related !== target && !jQuery.contains(target, related))) {
          event.type = handleObj.origType
          ret = handleObj.handler.apply(this, arguments)
          event.type = fix
        }
        return ret
      }
    }
  })

  jQuery.fn.extend({

    on: function (types, selector, data, fn) {
      return on(this, types, selector, data, fn)
    },
    one: function (types, selector, data, fn) {
      return on(this, types, selector, data, fn, 1)
    },
  })

  var

    rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

    rnoInnerhtml = /<script|<style|<link/i,

    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    rscriptTypeMasked = /^true\/(.*)/,
    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g

  jQuery.each({
    appendTo: 'append',
    prependTo: 'prepend',
    insertBefore: 'before',
    insertAfter: 'after',
    replaceAll: 'replaceWith'
  }, function (name, original) {
    jQuery.fn[name] = function (selector) {
      var elems,
        ret = [],
        insert = jQuery(selector),
        last = insert.length - 1,
        i = 0

      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true)
        jQuery(insert[i])[original](elems)

        push.apply(ret, elems.get())
      }

      return this.pushStack(ret)
    }
  })
  var rmargin = (/^margin/)

  var rnumnonpx = new RegExp('^(' + pnum + ')(?!px)[a-z%]+$', 'i')

  var getStyles = function (elem) {

    var view = elem.ownerDocument.defaultView

    if (!view || !view.opener) {
      view = window
    }

    return view.getComputedStyle(elem)
  };

  (function () {

    function computeStyleTests () {

      if (!div) {
        return
      }

      div.style.cssText =
        'box-sizing:border-box;' +
        'position:relative;display:block;' +
        'margin:auto;border:1px;padding:1px;' +
        'top:1%;width:50%'
      div.innerHTML = ''
      documentElement.appendChild(container)

      var divStyle = window.getComputedStyle(div)
      pixelPositionVal = divStyle.top !== '1%'

      reliableMarginLeftVal = divStyle.marginLeft === '2px'
      boxSizingReliableVal = divStyle.width === '4px'

      div.style.marginRight = '50%'
      pixelMarginRightVal = divStyle.marginRight === '4px'

      documentElement.removeChild(container)

      div = null
    }

    var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
      container = document.createElement('div'),
      div = document.createElement('div')

    if (!div.style) {
      return
    }

    div.style.backgroundClip = 'content-box'
    div.cloneNode(true).style.backgroundClip = ''
    support.clearCloneStyle = div.style.backgroundClip === 'content-box'

    container.style.cssText = 'border:0;width:8px;height:0;top:0;left:-9999px;' +
      'padding:0;margin-top:1px;position:absolute'
    container.appendChild(div)

    jQuery.extend(support, {
      pixelPosition: function () {
        computeStyleTests()
        return pixelPositionVal
      },
      boxSizingReliable: function () {
        computeStyleTests()
        return boxSizingReliableVal
      },
      pixelMarginRight: function () {
        computeStyleTests()
        return pixelMarginRightVal
      },
      reliableMarginLeft: function () {
        computeStyleTests()
        return reliableMarginLeftVal
      }
    })
  })()

  function curCSS (elem, name, computed) {
    var width, minWidth, maxWidth, ret,

      style = elem.style

    computed = computed || getStyles(elem)

    if (computed) {
      ret = computed.getPropertyValue(name) || computed[name]

      if (ret === '' && !jQuery.contains(elem.ownerDocument, elem)) {
        ret = jQuery.style(elem, name)
      }

      if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {

        width = style.width
        minWidth = style.minWidth
        maxWidth = style.maxWidth

        style.minWidth = style.maxWidth = style.width = ret
        ret = computed.width

        style.width = width
        style.minWidth = minWidth
        style.maxWidth = maxWidth
      }
    }

    return ret !== undefined ?

      ret + '' :
      ret
  }

  function addGetHookIf (conditionFn, hookFn) {

    return {
      get: function () {
        if (conditionFn()) {

          delete this.get
          return
        }

        return (this.get = hookFn).apply(this, arguments)
      }
    }
  }

  var

    rdisplayswap = /^(none|table(?!-c[ea]).+)/,
    rcustomProp = /^--/,
    cssShow = { position: 'absolute', visibility: 'hidden', display: 'block' },
    cssNormalTransform = {
      letterSpacing: '0',
      fontWeight: '400'
    },

    cssPrefixes = ['Webkit', 'Moz', 'ms'],
    emptyStyle = document.createElement('div').style

  function vendorPropName (name) {

    if (name in emptyStyle) {
      return name
    }

    var capName = name[0].toUpperCase() + name.slice(1),
      i = cssPrefixes.length

    while (i--) {
      name = cssPrefixes[i] + capName
      if (name in emptyStyle) {
        return name
      }
    }
  }

  function finalPropName (name) {
    var ret = jQuery.cssProps[name]
    if (!ret) {
      ret = jQuery.cssProps[name] = vendorPropName(name) || name
    }
    return ret
  }

  function setPositiveNumber (elem, value, subtract) {

    var matches = rcssNum.exec(value)
    return matches ?

      Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || 'px') :
      value
  }

  function augmentWidthOrHeight (elem, name, extra, isBorderBox, styles) {
    var i,
      val = 0

    if (extra === (isBorderBox ? 'border' : 'content')) {
      i = 4

    } else {
      i = name === 'width' ? 1 : 0
    }

    for (; i < 4; i += 2) {

      if (extra === 'margin') {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles)
      }

      if (isBorderBox) {

        if (extra === 'content') {
          val -= jQuery.css(elem, 'padding' + cssExpand[i], true, styles)
        }

        if (extra !== 'margin') {
          val -= jQuery.css(elem, 'border' + cssExpand[i] + 'Width', true, styles)
        }
      } else {

        val += jQuery.css(elem, 'padding' + cssExpand[i], true, styles)

        if (extra !== 'padding') {
          val += jQuery.css(elem, 'border' + cssExpand[i] + 'Width', true, styles)
        }
      }
    }

    return val
  }

  function getWidthOrHeight (elem, name, extra) {

    var valueIsBorderBox,
      styles = getStyles(elem),
      val = curCSS(elem, name, styles),
      isBorderBox = jQuery.css(elem, 'boxSizing', false, styles) === 'border-box'

    if (rnumnonpx.test(val)) {
      return val
    }

    valueIsBorderBox = isBorderBox &&
      (support.boxSizingReliable() || val === elem.style[name])

    if (val === 'auto') {
      val = elem['offset' + name[0].toUpperCase() + name.slice(1)]
    }

    val = parseFloat(val) || 0

    return (val +
      augmentWidthOrHeight(
        elem,
        name,
        extra || (isBorderBox ? 'border' : 'content'),
        valueIsBorderBox,
        styles
      )
    ) + 'px'
  }

  jQuery.extend({

    cssHooks: {
      opacity: {
        get: function (elem, computed) {
          if (computed) {

            var ret = curCSS(elem, 'opacity')
            return ret === '' ? '1' : ret
          }
        }
      }
    },

    cssNumber: {
      'animationIterationCount': true,
      'columnCount': true,
      'fillOpacity': true,
      'flexGrow': true,
      'flexShrink': true,
      'fontWeight': true,
      'lineHeight': true,
      'opacity': true,
      'order': true,
      'orphans': true,
      'widows': true,
      'zIndex': true,
      'zoom': true
    },

    cssProps: {
      'float': 'cssFloat'
    },

    style: function (elem, name, value, extra) {

      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return
      }

      var ret, type, hooks,
        origName = jQuery.camelCase(name),
        isCustomProp = rcustomProp.test(name),
        style = elem.style

      if (!isCustomProp) {
        name = finalPropName(origName)
      }

      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName]

      if (value !== undefined) {
        type = typeof value

        if (type === 'string' && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret)

          type = 'number'
        }

        if (value == null || value !== value) {
          return
        }

        if (type === 'number') {
          value += ret && ret[3] || (jQuery.cssNumber[origName] ? '' : 'px')
        }

        if (!support.clearCloneStyle && value === '' && name.indexOf('background') === 0) {
          style[name] = 'inherit'
        }

        if (!hooks || !('set' in hooks) ||
          (value = hooks.set(elem, value, extra)) !== undefined) {

          if (isCustomProp) {
            style.setProperty(name, value)
          } else {
            style[name] = value
          }
        }

      } else {

        if (hooks && 'get' in hooks &&
          (ret = hooks.get(elem, false, extra)) !== undefined) {

          return ret
        }

        return style[name]
      }
    },

    css: function (elem, name, extra, styles) {
      var val, num, hooks,
        origName = jQuery.camelCase(name),
        isCustomProp = rcustomProp.test(name)

      if (!isCustomProp) {
        name = finalPropName(origName)
      }

      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName]

      if (hooks && 'get' in hooks) {
        val = hooks.get(elem, true, extra)
      }

      if (val === undefined) {
        val = curCSS(elem, name, styles)
      }

      if (val === 'normal' && name in cssNormalTransform) {
        val = cssNormalTransform[name]
      }

      if (extra === '' || extra) {
        num = parseFloat(val)
        return extra === true || isFinite(num) ? num || 0 : val
      }

      return val
    }
  })

  jQuery.each(['height', 'width'], function (i, name) {
    jQuery.cssHooks[name] = {
      get: function (elem, computed, extra) {
        if (computed) {

          return rdisplayswap.test(jQuery.css(elem, 'display')) &&

          (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ?
            swap(elem, cssShow, function () {
              return getWidthOrHeight(elem, name, extra)
            }) :
            getWidthOrHeight(elem, name, extra)
        }
      },

      set: function (elem, value, extra) {
        var matches,
          styles = extra && getStyles(elem),
          subtract = extra && augmentWidthOrHeight(
            elem,
            name,
            extra,
            jQuery.css(elem, 'boxSizing', false, styles) === 'border-box',
            styles
          )

        if (subtract && (matches = rcssNum.exec(value)) &&
          (matches[3] || 'px') !== 'px') {

          elem.style[name] = value
          value = jQuery.css(elem, name)
        }

        return setPositiveNumber(elem, value, subtract)
      }
    }
  })

  jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft,
    function (elem, computed) {
      if (computed) {
        return (parseFloat(curCSS(elem, 'marginLeft')) ||
          elem.getBoundingClientRect().left -
          swap(elem, { marginLeft: 0 }, function () {
            return elem.getBoundingClientRect().left
          })
        ) + 'px'
      }
    }
  )

  jQuery.each({
    margin: '',
    padding: '',
    border: 'Width'
  }, function (prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand: function (value) {
        var i = 0,
          expanded = {},

          parts = typeof value === 'string' ? value.split(' ') : [value]

        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] =
            parts[i] || parts[i - 2] || parts[0]
        }

        return expanded
      }
    }

    if (!rmargin.test(prefix)) {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber
    }
  })

  jQuery.fn.extend({
    css: function (name, value) {
      return access(this, function (elem, name, value) {
        var styles, len,
          map = {},
          i = 0

        if (Array.isArray(name)) {
          styles = getStyles(elem)
          len = name.length

          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles)
          }

          return map
        }

        return value !== undefined ?
          jQuery.style(elem, name, value) :
          jQuery.css(elem, name)
      }, name, value, arguments.length > 1)
    }
  })

  function Tween (elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing)
  }

  jQuery.Tween = Tween

  Tween.prototype = {
    constructor: Tween,
    init: function (elem, options, prop, end, easing, unit) {
      this.elem = elem
      this.prop = prop
      this.easing = easing || jQuery.easing._default
      this.options = options
      this.start = this.now = this.cur()
      this.end = end
      this.unit = unit || (jQuery.cssNumber[prop] ? '' : 'px')
    },

  }

  jQuery.easing = {
    linear: function (p) {
      return p
    },
    swing: function (p) {
      return 0.5 - Math.cos(p * Math.PI) / 2
    },
    _default: 'swing'
  }

  jQuery.fx = Tween.prototype.init

  jQuery.fx.step = {}

  var
    fxNow, inProgress,
    rfxtypes = /^(?:toggle|show|hide)$/,
    rrun = /queueHooks$/

  function genFx (type, includeWidth) {
    var which,
      i = 0,
      attrs = { height: type }

    includeWidth = includeWidth ? 1 : 0
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i]
      attrs['margin' + which] = attrs['padding' + which] = type
    }

    if (includeWidth) {
      attrs.opacity = attrs.width = type
    }

    return attrs
  }

  function defaultPrefilter (elem, props, opts) {
    var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
      isBox = 'width' in props || 'height' in props,
      anim = this,
      orig = {},
      style = elem.style,
      hidden = elem.nodeType && isHiddenWithinTree(elem),
      dataShow = dataPriv.get(elem, 'fxshow')

    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, 'fx')
      if (hooks.unqueued == null) {
        hooks.unqueued = 0
        oldfire = hooks.empty.fire
        hooks.empty.fire = function () {
          if (!hooks.unqueued) {
            oldfire()
          }
        }
      }
      hooks.unqueued++

      anim.always(function () {

        anim.always(function () {
          hooks.unqueued--
          if (!jQuery.queue(elem, 'fx').length) {
            hooks.empty.fire()
          }
        })
      })
    }

    for (prop in props) {
      value = props[prop]
      if (rfxtypes.test(value)) {
        delete props[prop]
        toggle = toggle || value === 'toggle'
        if (value === (hidden ? 'hide' : 'show')) {

          if (value === 'show' && dataShow && dataShow[prop] !== undefined) {
            hidden = true

          } else {
            continue
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
      }
    }

    propTween = !jQuery.isEmptyObject(props)
    if (!propTween && jQuery.isEmptyObject(orig)) {
      return
    }

    if (isBox && elem.nodeType === 1) {

      opts.overflow = [style.overflow, style.overflowX, style.overflowY]

      restoreDisplay = dataShow && dataShow.display
      if (restoreDisplay == null) {
        restoreDisplay = dataPriv.get(elem, 'display')
      }
      display = jQuery.css(elem, 'display')
      if (display === 'none') {
        if (restoreDisplay) {
          display = restoreDisplay
        } else {

          showHide([elem], true)
          restoreDisplay = elem.style.display || restoreDisplay
          display = jQuery.css(elem, 'display')
          showHide([elem])
        }
      }

      if (display === 'inline' || display === 'inline-block' && restoreDisplay != null) {
        if (jQuery.css(elem, 'float') === 'none') {

          if (!propTween) {
            anim.done(function () {
              style.display = restoreDisplay
            })
            if (restoreDisplay == null) {
              display = style.display
              restoreDisplay = display === 'none' ? '' : display
            }
          }
          style.display = 'inline-block'
        }
      }
    }

    if (opts.overflow) {
      style.overflow = 'hidden'
      anim.always(function () {
        style.overflow = opts.overflow[0]
        style.overflowX = opts.overflow[1]
        style.overflowY = opts.overflow[2]
      })
    }

    propTween = false
    for (prop in orig) {

      if (!propTween) {
        if (dataShow) {
          if ('hidden' in dataShow) {
            hidden = dataShow.hidden
          }
        } else {
          dataShow = dataPriv.access(elem, 'fxshow', { display: restoreDisplay })
        }

        if (toggle) {
          dataShow.hidden = !hidden
        }

        if (hidden) {
          showHide([elem], true)
        }

        anim.done(function () {

          if (!hidden) {
            showHide([elem])
          }
          dataPriv.remove(elem, 'fxshow')
          for (prop in orig) {
            jQuery.style(elem, prop, orig[prop])
          }
        })
      }

      propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim)
      if (!(prop in dataShow)) {
        dataShow[prop] = propTween.start
        if (hidden) {
          propTween.end = propTween.start
          propTween.start = 0
        }
      }
    }
  }

  function Animation (elem, properties, options) {
    var result,
      stopped,
      index = 0,
      length = Animation.prefilters.length,
      deferred = jQuery.Deferred().always(function () {

        delete tick.elem
      }),
      tick = function () {
        if (stopped) {
          return false
        }
        var currentTime = fxNow || createFxNow(),
          remaining = Math.max(0, animation.startTime + animation.duration - currentTime),

          temp = remaining / animation.duration || 0,
          percent = 1 - temp,
          index = 0,
          length = animation.tweens.length

        for (; index < length; index++) {
          animation.tweens[index].run(percent)
        }

        deferred.notifyWith(elem, [animation, percent, remaining])

        if (percent < 1 && length) {
          return remaining
        }

        if (!length) {
          deferred.notifyWith(elem, [animation, 1, 0])
        }

        deferred.resolveWith(elem, [animation])
        return false
      },
      animation = deferred.promise({
        elem: elem,
        props: jQuery.extend({}, properties),
        opts: jQuery.extend(true, {
          specialEasing: {},
          easing: jQuery.easing._default
        }, options),
        originalProperties: properties,
        originalOptions: options,
        startTime: fxNow || createFxNow(),
        duration: options.duration,
        tweens: [],
        createTween: function (prop, end) {
          var tween = jQuery.Tween(elem, animation.opts, prop, end,
            animation.opts.specialEasing[prop] || animation.opts.easing)
          animation.tweens.push(tween)
          return tween
        },
        stop: function (gotoEnd) {
          var index = 0,

            length = gotoEnd ? animation.tweens.length : 0
          if (stopped) {
            return this
          }
          stopped = true
          for (; index < length; index++) {
            animation.tweens[index].run(1)
          }

          if (gotoEnd) {
            deferred.notifyWith(elem, [animation, 1, 0])
            deferred.resolveWith(elem, [animation, gotoEnd])
          } else {
            deferred.rejectWith(elem, [animation, gotoEnd])
          }
          return this
        }
      }),
      props = animation.props

    propFilter(props, animation.opts.specialEasing)

    for (; index < length; index++) {
      result = Animation.prefilters[index].call(animation, elem, props, animation.opts)
      if (result) {
        if (jQuery.isFunction(result.stop)) {
          jQuery._queueHooks(animation.elem, animation.opts.queue).stop =
            jQuery.proxy(result.stop, result)
        }
        return result
      }
    }

    jQuery.map(props, createTween, animation)

    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation)
    }

    animation
      .progress(animation.opts.progress)
      .done(animation.opts.done, animation.opts.complete)
      .fail(animation.opts.fail)
      .always(animation.opts.always)

    jQuery.fx.timer(
      jQuery.extend(tick, {
        elem: elem,
        anim: animation,
        queue: animation.opts.queue
      })
    )

    return animation
  }

  jQuery.Animation = jQuery.extend(Animation, {

    tweeners: {
      '*': [function (prop, value) {
        var tween = this.createTween(prop, value)
        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween)
        return tween
      }]
    },
    prefilters: [defaultPrefilter]
  })

  jQuery.each(['toggle', 'show', 'hide'], function (i, name) {
    var cssFn = jQuery.fn[name]
    jQuery.fn[name] = function (speed, easing, callback) {
      return speed == null || typeof speed === 'boolean' ?
        cssFn.apply(this, arguments) :
        this.animate(genFx(name, true), speed, easing, callback)
    }
  })

  jQuery.each({
    slideDown: genFx('show'),
    slideUp: genFx('hide'),
    slideToggle: genFx('toggle'),
    fadeIn: { opacity: 'show' },
    fadeOut: { opacity: 'hide' },
    fadeToggle: { opacity: 'toggle' }
  }, function (name, props) {
    jQuery.fn[name] = function (speed, easing, callback) {
      return this.animate(props, speed, easing, callback)
    }
  })

  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,

    _default: 400
  };

  (function () {
    var input = document.createElement('input'),
      select = document.createElement('select'),
      opt = select.appendChild(document.createElement('option'))

    input.type = 'checkbox'

    support.checkOn = input.value !== ''

    support.optSelected = opt.selected

    input = document.createElement('input')
    input.value = 't'
    input.type = 'radio'
    support.radioValue = input.value === 't'
  })()

  jQuery.extend({

    propFix: {
      'for': 'htmlFor',
      'class': 'className'
    }
  })

  jQuery.each([
    'tabIndex',
    'readOnly',
    'maxLength',
    'cellSpacing',
    'cellPadding',
    'rowSpan',
    'colSpan',
    'useMap',
    'frameBorder',
    'contentEditable'
  ], function () {
    jQuery.propFix[this.toLowerCase()] = this
  })

  jQuery.extend({
    valHooks: {
      option: {
        get: function (elem) {

          var val = jQuery.find.attr(elem, 'value')
          return val != null ?
            val :

            stripAndCollapse(jQuery.text(elem))
        }
      }
    }
  })

  jQuery.each(['radio', 'checkbox'], function () {
    jQuery.valHooks[this] = {
      set: function (elem, value) {
        if (Array.isArray(value)) {
          return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1)
        }
      }
    }
    if (!support.checkOn) {
      jQuery.valHooks[this].get = function (elem) {
        return elem.getAttribute('value') === null ? 'on' : elem.value
      }
    }
  })

  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/

  jQuery.extend(jQuery.event, {

    trigger: function (event, data, elem, onlyHandlers) {

      var i, cur, tmp, bubbleType, ontype, handle, special,
        eventPath = [elem || document],
        type = hasOwn.call(event, 'type') ? event.type : event,
        namespaces = hasOwn.call(event, 'namespace') ? event.namespace.split('.') : []

      cur = tmp = elem = elem || document

      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return
      }

      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return
      }

      if (type.indexOf('.') > -1) {

        namespaces = type.split('.')
        type = namespaces.shift()
        namespaces.sort()
      }
      ontype = type.indexOf(':') < 0 && 'on' + type

      event = event[jQuery.expando] ?
        event :
        new jQuery.Event(type, typeof event === 'object' && event)

      event.isTrigger = onlyHandlers ? 2 : 3
      event.namespace = namespaces.join('.')
      event.rnamespace = event.namespace ?
        new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)') :
        null

      event.result = undefined
      if (!event.target) {
        event.target = elem
      }

      data = data == null ?
        [event] :
        jQuery.makeArray(data, [event])

      special = jQuery.event.special[type] || {}
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return
      }

      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

        bubbleType = special.delegateType || type
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur)
          tmp = cur
        }

        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window)
        }
      }

      i = 0
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

        event.type = i > 1 ?
          bubbleType :
          special.bindType || type

        handle = (dataPriv.get(cur, 'events') || {})[event.type] &&
          dataPriv.get(cur, 'handle')
        if (handle) {
          handle.apply(cur, data)
        }

        handle = ontype && cur[ontype]
        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data)
          if (event.result === false) {
            event.preventDefault()
          }
        }
      }
      event.type = type

      if (!onlyHandlers && !event.isDefaultPrevented()) {

        if ((!special._default ||
          special._default.apply(eventPath.pop(), data) === false) &&
          acceptData(elem)) {

          if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {

            tmp = elem[ontype]

            if (tmp) {
              elem[ontype] = null
            }

            jQuery.event.triggered = type
            elem[type]()
            jQuery.event.triggered = undefined

            if (tmp) {
              elem[ontype] = tmp
            }
          }
        }
      }

      return event.result
    },

    simulate: function (type, elem, event) {
      var e = jQuery.extend(
        new jQuery.Event(),
        event,
        {
          type: type,
          isSimulated: true
        }
      )

      jQuery.event.trigger(e, null, elem)
    }

  })

  jQuery.fn.extend({

    trigger: function (type, data) {
      return this.each(function () {
        jQuery.event.trigger(type, data, this)
      })
    },
    triggerHandler: function (type, data) {
      var elem = this[0]
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true)
      }
    }
  })

  jQuery.each(('blur focus focusin focusout resize scroll click dblclick ' +
    'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' +
    'change select submit keydown keypress keyup contextmenu').split(' '),
    function (i, name) {

      jQuery.fn[name] = function (data, fn) {
        return arguments.length > 0 ?
          this.on(name, null, data, fn) :
          this.trigger(name)
      }
    })

  jQuery.fn.extend({
    hover: function (fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
    }
  })

  support.focusin = 'onfocusin' in window

  if (!support.focusin) {
    jQuery.each({ focus: 'focusin', blur: 'focusout' }, function (orig, fix) {

      var handler = function (event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event))
      }

      jQuery.event.special[fix] = {
        setup: function () {
          var doc = this.ownerDocument || this,
            attaches = dataPriv.access(doc, fix)

          if (!attaches) {
            doc.addEventListener(orig, handler, true)
          }
          dataPriv.access(doc, fix, (attaches || 0) + 1)
        },
        teardown: function () {
          var doc = this.ownerDocument || this,
            attaches = dataPriv.access(doc, fix) - 1

          if (!attaches) {
            doc.removeEventListener(orig, handler, true)
            dataPriv.remove(doc, fix)

          } else {
            dataPriv.access(doc, fix, attaches)
          }
        }
      }
    })
  }
  var location = window.location

  var nonce = jQuery.now()

  var rquery = (/\?/)

  jQuery.parseXML = function (data) {
    var xml
    if (!data || typeof data !== 'string') {
      return null
    }

    try {
      xml = (new window.DOMParser()).parseFromString(data, 'text/xml')
    } catch (e) {
      xml = undefined
    }

    if (!xml || xml.getElementsByTagName('parsererror').length) {
      jQuery.error('Invalid XML: ' + data)
    }
    return xml
  }

  var
    rbracket = /\[\]$/,
    rCRLF = /\r?\n/g,
    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
    rsubmittable = /^(?:input|select|textarea|keygen)/i
  var
    r20 = /%20/g,
    rhash = /#.*$/,
    rantiCache = /([?&])_=[^&]*/,
    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    rnoContent = /^(?:GET|HEAD)$/,
    rprotocol = /^\/\//,

    prefilters = {},

    transports = {},

    allTypes = '*/'.concat('*'),

    originAnchor = document.createElement('a')
  originAnchor.href = location.href

  function addToPrefiltersOrTransports (structure) {

    return function (dataTypeExpression, func) {

      if (typeof dataTypeExpression !== 'string') {
        func = dataTypeExpression
        dataTypeExpression = '*'
      }

      var dataType,
        i = 0,
        dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || []

      if (jQuery.isFunction(func)) {

        while ((dataType = dataTypes[i++])) {

          if (dataType[0] === '+') {
            dataType = dataType.slice(1) || '*';
            (structure[dataType] = structure[dataType] || []).unshift(func)

          } else {
            (structure[dataType] = structure[dataType] || []).push(func)
          }
        }
      }
    }
  }

  function ajaxExtend (target, src) {
    var key, deep,
      flatOptions = jQuery.ajaxSettings.flatOptions || {}

    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key]
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep)
    }

    return target
  }

  jQuery.extend({

    active: 0,

    lastModified: {},
    etag: {},

    ajaxSettings: {
      url: location.href,
      type: 'GET',
      isLocal: rlocalProtocol.test(location.protocol),
      global: true,
      processData: true,
      async: true,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',

      accepts: {
        '*': allTypes,
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript'
      },

      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },

      responseFields: {
        xml: 'responseXML',
        text: 'responseText',
        json: 'responseJSON'
      },

      converters: {

        '* text': String,

        'text html': true,

        'text json': JSON.parse,

        'text xml': jQuery.parseXML
      },

      flatOptions: {
        url: true,
        context: true
      }
    },

    ajaxSetup: function (target, settings) {
      return settings ?

        ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

        ajaxExtend(jQuery.ajaxSettings, target)
    },

    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports)
  })

  jQuery.each(['get', 'post'], function (i, method) {
    jQuery[method] = function (url, data, callback, type) {

      if (jQuery.isFunction(data)) {
        type = type || callback
        callback = data
        data = undefined
      }

      return jQuery.ajax(jQuery.extend({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      }, jQuery.isPlainObject(url) && url))
    }
  })

  jQuery.expr.pseudos.hidden = function (elem) {
    return !jQuery.expr.pseudos.visible(elem)
  }
  jQuery.expr.pseudos.visible = function (elem) {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)
  }

  jQuery.ajaxSettings.xhr = function () {
    try {
      return new window.XMLHttpRequest()
    } catch (e) {}
  }

  var xhrSuccessStatus = {

      0: 200,

      1223: 204
    },
    xhrSupported = jQuery.ajaxSettings.xhr()

  support.cors = !!xhrSupported && ('withCredentials' in xhrSupported)
  support.ajax = xhrSupported = !!xhrSupported

  jQuery.ajaxPrefilter(function (s) {
    if (s.crossDomain) {
      s.contents.script = false
    }
  })

  jQuery.ajaxSetup({
    accepts: {
      script: 'text/javascript, application/javascript, ' +
        'application/ecmascript, application/x-ecmascript'
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      'text script': function (text) {
        jQuery.globalEval(text)
        return text
      }
    }
  })

  var oldCallbacks = [],
    rjsonp = /(=)\?(?=&|$)|\?\?/

  jQuery.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function () {
      var callback = oldCallbacks.pop() || (jQuery.expando + '_' + (nonce++))
      this[callback] = true
      return callback
    }
  })

  support.createHTMLDocument = (function () {
    var body = document.implementation.createHTMLDocument('').body
    body.innerHTML = '<form></form><form></form>'
    return body.childNodes.length === 2
  })()

  jQuery.each([
    'ajaxStart',
    'ajaxStop',
    'ajaxComplete',
    'ajaxError',
    'ajaxSuccess',
    'ajaxSend'
  ], function (i, type) {
    jQuery.fn[type] = function (fn) {
      return this.on(type, fn)
    }
  })

  jQuery.expr.pseudos.animated = function (elem) {
    return jQuery.grep(jQuery.timers, function (fn) {
      return elem === fn.elem
    }).length
  }

  jQuery.fn.extend({
    offset: function (options) {

      if (arguments.length) {
        return options === undefined ?
          this :
          this.each(function (i) {
            jQuery.offset.setOffset(this, options, i)
          })
      }

      var doc, docElem, rect, win,
        elem = this[0]

      if (!elem) {
        return
      }

      if (!elem.getClientRects().length) {
        return { top: 0, left: 0 }
      }

      rect = elem.getBoundingClientRect()

      doc = elem.ownerDocument
      docElem = doc.documentElement
      win = doc.defaultView

      return {
        top: rect.top + win.pageYOffset - docElem.clientTop,
        left: rect.left + win.pageXOffset - docElem.clientLeft
      }
    }
  })

  jQuery.each(['top', 'left'], function (i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition,
      function (elem, computed) {
        if (computed) {
          computed = curCSS(elem, prop)

          return rnumnonpx.test(computed) ?
            jQuery(elem).position()[prop] + 'px' :
            computed
        }
      }
    )
  })

  jQuery.each({ Height: 'height', Width: 'width' }, function (name, type) {
    jQuery.each({ padding: 'inner' + name, content: type, '': 'outer' + name },
      function (defaultExtra, funcName) {

        jQuery.fn[funcName] = function (margin, value) {
          var chainable = arguments.length && (defaultExtra || typeof margin !== 'boolean'),
            extra = defaultExtra || (margin === true || value === true ? 'margin' : 'border')

          return access(this, function (elem, type, value) {
            var doc

            if (jQuery.isWindow(elem)) {

              return funcName.indexOf('outer') === 0 ?
                elem['inner' + name] :
                elem.document.documentElement['client' + name]
            }

            if (elem.nodeType === 9) {
              doc = elem.documentElement

              return Math.max(
                elem.body['scroll' + name], doc['scroll' + name],
                elem.body['offset' + name], doc['offset' + name],
                doc['client' + name]
              )
            }

            return value === undefined ?

              jQuery.css(elem, type, extra) :

              jQuery.style(elem, type, value, extra)
          }, type, chainable ? margin : undefined, chainable)
        }
      })
  })

  jQuery.isArray = Array.isArray
  jQuery.parseJSON = JSON.parse
  jQuery.nodeName = nodeName

  var

    _jQuery = window.jQuery,

    _$ = window.$

  if (
    !noGlobal
  ) {
    window.jQuery = window.$ = jQuery
  }

  return jQuery
})
