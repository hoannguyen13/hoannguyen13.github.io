if (!window.location.hostname.match('cloudflare.works') || "//static.zotabox.com/8/4/8493e52b24fa1e2bc0c9da58420a6ae6".match('a641227e8963155fcc57d87f55ee1cb0')) {
    window.Zotabox_Init = function() {
        !(function(bootstrap) {
            (function() {
                (function() {
                    var Admin = function() {
                        this.status = 'ok';
                        this.time_stamp = null;
                        this.attrPre = '_ZB_STATIC_';
                    };
                    Admin.prototype = {
                        isOK: function() {
                            if (window.location.hash == "#zbstop") {
                                console.log('Stop loading Zotabox!');
                                return false;
                            }
                            if (navigator.userAgent.match(/Opera Mini/i)) {
                                console.log('Zotabox do not support on Opera Mini Browser!');
                                return false;
                            }
                            if (this.status !== 'ok') return false;
                            return true;
                        },
                        process: function() {
                            if (!this.isOK()) return false;
                            if (window.location.hash == "#zbrefresh") {
                                this.setCookie('_ZB_ADMIN_TIME_STAMP_', Date.now());
                                this.refreshCookies(false);
                            }
                            var _super = this;
                            if (window.location.hash == "#zbrc") {
                                var timeinterval = setInterval(function() {
                                    if (window.Zotabox && window.__ZBDT__) {
                                        clearInterval(timeinterval);
                                        _super.setCookie('_ZB_ADMIN_TIME_STAMP_', Date.now());
                                        _super.refreshCookies(false);
                                        _super.refreshCache();
                                    }
                                }, 500);
                            }
                            window.addEventListener('hashchange', function zbxEventHandler() {
                                if (window.location.hash == "#zbrefresh") {
                                    _super.setCookie('_ZB_ADMIN_TIME_STAMP_', Date.now());
                                    _super.refreshCookies(true);
                                }
                                if (window.location.hash == "#zbrc") {
                                    _super.setCookie('_ZB_ADMIN_TIME_STAMP_', Date.now());
                                    _super.refreshCookies(false);
                                    _super.refreshCache();
                                }
                            }, false);
                            var time_stamp = this.getCookie('_ZB_ADMIN_TIME_STAMP_');
                            if (time_stamp != null && Date.now() - time_stamp > 3600000) {
                                time_stamp = null;
                                this.deleteCookie('_ZB_ADMIN_TIME_STAMP_');
                            } else {
                                var last_url = this.getCookie('_ZB_ADMIN_LAST_URL_');
                                if (last_url == window.location.href && this.time_stamp == null) {
                                    time_stamp = Date.now();
                                    this.setCookie('_ZB_ADMIN_TIME_STAMP_', time_stamp);
                                }
                            }
                            if (time_stamp == null && window.CloudFlare && document.querySelector('script[type="text/rocketscript"]')) {
                                time_stamp = Date.now();
                                this.setCookie('_ZB_ADMIN_TIME_STAMP_', time_stamp);
                            }
                            if (time_stamp != null && this.time_stamp != time_stamp) {
                                this.status = 'refreshing';
                                this.time_stamp = time_stamp;
                                var script_name = typeof zb_script_name != "undefined" ? zb_script_name : "widgets.js";
                                (function(d, s, id) {
                                    var z = d.createElement(s);
                                    z.type = "text/javascript";
                                    z.id = id;
                                    z.onload = function() {
                                        window.zb_admin.status = 'ok';
                                        window.Zotabox_Init();
                                    };
                                    z.setAttribute('data-cfasync', false);
                                    z.src = bootstrap.root + "/" + script_name + "?" + time_stamp;
                                    var sz = d.getElementsByTagName(s)[0];
                                    sz.parentNode.insertBefore(z, sz)
                                }(document, "script", "zb-embed-code"));
                                return false;
                            }
                            this.setCookie('_ZB_ADMIN_LAST_URL_', window.location.href);
                            return true;
                        },
                        onHashChange: function() {
                            var _super = this;
                            Zotabox.addEvent('hashchange', window, function(e) {
                                if (window.location.hash == "#zbrefresh") {
                                    _super.refreshCookies();
                                }
                                if (window.location.hash == "#zbrc") {
                                    _super.refreshCache();
                                }
                            })
                        },
                        refreshCache: function() {
                            if (typeof window.Zotabox == 'undefined') return;
                            var domainSecureId = __ZBDT__.domain.secure_id;
                            var refreshDomainUrl = __ZBDU__.static + "/refresh/" + domainSecureId;
                            var originUrl = window.location.origin + window.location.pathname;
                            var xhttp = new XMLHttpRequest();
                            xhttp.onreadystatechange = function() {
                                if (xhttp.readyState == 4 && xhttp.status == 200) {
                                    location.reload(true);
                                }
                            };
                            xhttp.open("GET", refreshDomainUrl, true);
                            xhttp.send();
                            window.location.hash = 'ok';
                        },
                        refreshCookies: function(reload) {
                            var pairs = document.cookie.split(";");
                            for (var i = 0; i < pairs.length; i++) {
                                var pair = pairs[i].split("=");
                                var cookieName = pair[0];
                                if (cookieName.indexOf(this.attrPre) >= 0) {
                                    this.deleteCookie(cookieName);
                                }
                            }
                            window.location.hash = 'ok';
                            if (reload) location.reload(true);
                        },
                        setCookie: function(name, value, days) {
                            if (days) {
                                var date = new Date();
                                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                                var expires = "; expires=" + date.toGMTString();
                            } else
                                var expires = "";
                            document.cookie = name + "=" + value + expires + "; path=/";
                        },
                        getCookie: function(name) {
                            var nameEQ = name + "=";
                            var ca = document.cookie.split(';');
                            for (var i = 0; i < ca.length; i++) {
                                var c = ca[i];
                                while (c.charAt(0) == ' ')
                                    c = c.substring(1, c.length);
                                if (c.indexOf(nameEQ) == 0)
                                    return c.substring(nameEQ.length, c.length);
                            }
                            return null;
                        },
                        deleteCookie: function(name) {
                            this.setCookie(name, "", -1);
                        }
                    };
                    if (typeof window.zb_admin == 'undefined') {
                        window.zb_admin = new Admin();
                    }
                }.call(this));
                window.__ZOTABOX__ = {
                    clickEventExist: false,
                    adWidgetID: null,
                    onReady: function(error, widgets) {
                        var _this = this;
                    },
                    clickEvent: function(event) {
                        var _this = this;
                        if (window.__ZOTABOX__.adWidgetID != null) {
                            var targetElement = event.target || event.srcElement;
                            event.preventDefault();
                            var xmlHttp = new XMLHttpRequest();
                            var _params = "advanced_discount_widget_id=" + window.__ZOTABOX__.adWidgetID + "&zbad=" + encodeURIComponent(JSON.stringify(window.zbad));
                            xmlHttp.onreadystatechange = function() {
                                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                                        var checkout = JSON.parse(xmlHttp.responseText);
                                        if (typeof(checkout) == "string") {
                                            checkout = JSON.parse(checkout);
                                            location.href = checkout.draft_order.invoice_url;
                                        } else if (typeof(checkout) == "object" && checkout.offers == false) {
                                            document.getElementsByTagName("input").checkout.removeEventListener("click", window.__ZOTABOX__.clickEvent);
                                            location.href = "/checkout";
                                        }
                                    }
                            }
                            xmlHttp.timeout = 20000;
                            xmlHttp.open("POST", window.__ZBDU__.actions + "/advanceddiscount/createcheckout", true);
                            xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            xmlHttp.send(_params);
                        }
                    }
                };
            }.call(this));
            if (true && true && !zb_admin.process()) return false;
            var require, define;
            var _isInitialized = false;
            var __userConfig = window.__ZOTABOX__ || {};
            var proto = (function() {
                var requirejs = {
                    skipDataMain: true
                }
                var requirejs, require, define;
                (function(global) {
                    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = '2.1.16',
                        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
                        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
                        jsSuffixRegExp = /\.js$/,
                        currDirRegExp = /^\.\//,
                        op = Object.prototype,
                        ostring = op.toString,
                        hasOwn = op.hasOwnProperty,
                        ap = Array.prototype,
                        apsp = ap.splice,
                        isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
                        isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
                        readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ? /^complete$/ : /^(complete|loaded)$/,
                        defContextName = '_',
                        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
                        contexts = {},
                        cfg = {},
                        globalDefQueue = [],
                        useInteractive = false;

                    function isFunction(it) {
                        return ostring.call(it) === '[object Function]';
                    }

                    function isArray(it) {
                        return ostring.call(it) === '[object Array]';
                    }

                    function each(ary, func) {
                        if (ary) {
                            var i;
                            for (i = 0; i < ary.length; i += 1) {
                                if (ary[i] && func(ary[i], i, ary)) {
                                    break;
                                }
                            }
                        }
                    }

                    function eachReverse(ary, func) {
                        if (ary) {
                            var i;
                            for (i = ary.length - 1; i > -1; i -= 1) {
                                if (ary[i] && func(ary[i], i, ary)) {
                                    break;
                                }
                            }
                        }
                    }

                    function hasProp(obj, prop) {
                        return hasOwn.call(obj, prop);
                    }

                    function getOwn(obj, prop) {
                        return hasProp(obj, prop) && obj[prop];
                    }

                    function eachProp(obj, func) {
                        var prop;
                        for (prop in obj) {
                            if (hasProp(obj, prop)) {
                                if (func(obj[prop], prop)) {
                                    break;
                                }
                            }
                        }
                    }

                    function mixin(target, source, force, deepStringMixin) {
                        if (source) {
                            eachProp(source, function(value, prop) {
                                if (force || !hasProp(target, prop)) {
                                    if (deepStringMixin && typeof value === 'object' && value && !isArray(value) && !isFunction(value) && !(value instanceof RegExp)) {
                                        if (!target[prop]) {
                                            target[prop] = {};
                                        }
                                        mixin(target[prop], value, force, deepStringMixin);
                                    } else {
                                        target[prop] = value;
                                    }
                                }
                            });
                        }
                        return target;
                    }

                    function bind(obj, fn) {
                        return function() {
                            return fn.apply(obj, arguments);
                        };
                    }

                    function scripts() {
                        return document.getElementsByTagName('script');
                    }

                    function defaultOnError(err) {
                        throw err;
                    }

                    function getGlobal(value) {
                        if (!value) {
                            return value;
                        }
                        var g = global;
                        each(value.split('.'), function(part) {
                            g = g[part];
                        });
                        return g;
                    }

                    function makeError(id, msg, err, requireModules) {
                        var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
                        e.requireType = id;
                        e.requireModules = requireModules;
                        if (err) {
                            e.originalError = err;
                        }
                        return e;
                    }
                    if (typeof define !== 'undefined') {
                        return;
                    }
                    if (typeof requirejs !== 'undefined') {
                        if (isFunction(requirejs)) {
                            return;
                        }
                        cfg = requirejs;
                        requirejs = undefined;
                    }
                    if (typeof require !== 'undefined' && !isFunction(require)) {
                        cfg = require;
                        require = undefined;
                    }

                    function newContext(contextName) {
                        var inCheckLoaded, Module, context, handlers, checkLoadedTimeoutId, config = {
                                waitSeconds: 7,
                                baseUrl: './',
                                paths: {},
                                bundles: {},
                                pkgs: {},
                                shim: {},
                                config: {}
                            },
                            registry = {},
                            enabledRegistry = {},
                            undefEvents = {},
                            defQueue = [],
                            defined = {},
                            urlFetched = {},
                            bundlesMap = {},
                            requireCounter = 1,
                            unnormalizedCounter = 1;

                        function trimDots(ary) {
                            var i, part;
                            for (i = 0; i < ary.length; i++) {
                                part = ary[i];
                                if (part === '.') {
                                    ary.splice(i, 1);
                                    i -= 1;
                                } else if (part === '..') {
                                    if (i === 0 || (i == 1 && ary[2] === '..') || ary[i - 1] === '..') {
                                        continue;
                                    } else if (i > 0) {
                                        ary.splice(i - 1, 2);
                                        i -= 2;
                                    }
                                }
                            }
                        }

                        function normalize(name, baseName, applyMap) {
                            var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex, foundMap, foundI, foundStarMap, starI, normalizedBaseParts, baseParts = (baseName && baseName.split('/')),
                                map = config.map,
                                starMap = map && map['*'];
                            if (name) {
                                name = name.split('/');
                                lastIndex = name.length - 1;
                                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                                }
                                if (name[0].charAt(0) === '.' && baseParts) {
                                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                                    name = normalizedBaseParts.concat(name);
                                }
                                trimDots(name);
                                name = name.join('/');
                            }
                            if (applyMap && map && (baseParts || starMap)) {
                                nameParts = name.split('/');
                                outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                                    nameSegment = nameParts.slice(0, i).join('/');
                                    if (baseParts) {
                                        for (j = baseParts.length; j > 0; j -= 1) {
                                            mapValue = getOwn(map, baseParts.slice(0, j).join('/'));
                                            if (mapValue) {
                                                mapValue = getOwn(mapValue, nameSegment);
                                                if (mapValue) {
                                                    foundMap = mapValue;
                                                    foundI = i;
                                                    break outerLoop;
                                                }
                                            }
                                        }
                                    }
                                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                                        foundStarMap = getOwn(starMap, nameSegment);
                                        starI = i;
                                    }
                                }
                                if (!foundMap && foundStarMap) {
                                    foundMap = foundStarMap;
                                    foundI = starI;
                                }
                                if (foundMap) {
                                    nameParts.splice(0, foundI, foundMap);
                                    name = nameParts.join('/');
                                }
                            }
                            pkgMain = getOwn(config.pkgs, name);
                            return pkgMain ? pkgMain : name;
                        }

                        function removeScript(name) {
                            if (isBrowser) {
                                each(scripts(), function(scriptNode) {
                                    if (scriptNode.getAttribute('data-requiremodule') === name && scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                                        scriptNode.parentNode.removeChild(scriptNode);
                                        return true;
                                    }
                                });
                            }
                        }

                        function hasPathFallback(id) {
                            var pathConfig = getOwn(config.paths, id);
                            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                                pathConfig.shift();
                                context.require.undef(id);
                                context.makeRequire(null, {
                                    skipMap: true
                                })([id]);
                                return true;
                            }
                        }

                        function splitPrefix(name) {
                            var prefix, index = name ? name.indexOf('!') : -1;
                            if (index > -1) {
                                prefix = name.substring(0, index);
                                name = name.substring(index + 1, name.length);
                            }
                            return [prefix, name];
                        }

                        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
                            var url, pluginModule, suffix, nameParts, prefix = null,
                                parentName = parentModuleMap ? parentModuleMap.name : null,
                                originalName = name,
                                isDefine = true,
                                normalizedName = '';
                            if (!name) {
                                isDefine = false;
                                name = '_@r' + (requireCounter += 1);
                            }
                            nameParts = splitPrefix(name);
                            prefix = nameParts[0];
                            name = nameParts[1];
                            if (prefix) {
                                prefix = normalize(prefix, parentName, applyMap);
                                pluginModule = getOwn(defined, prefix);
                            }
                            if (name) {
                                if (prefix) {
                                    if (pluginModule && pluginModule.normalize) {
                                        normalizedName = pluginModule.normalize(name, function(name) {
                                            return normalize(name, parentName, applyMap);
                                        });
                                    } else {
                                        normalizedName = name.indexOf('!') === -1 ? normalize(name, parentName, applyMap) : name;
                                    }
                                } else {
                                    normalizedName = normalize(name, parentName, applyMap);
                                    nameParts = splitPrefix(normalizedName);
                                    prefix = nameParts[0];
                                    normalizedName = nameParts[1];
                                    isNormalized = true;
                                    url = context.nameToUrl(normalizedName);
                                }
                            }
                            suffix = prefix && !pluginModule && !isNormalized ? '_unnormalized' + (unnormalizedCounter += 1) : '';
                            return {
                                prefix: prefix,
                                name: normalizedName,
                                parentMap: parentModuleMap,
                                unnormalized: !!suffix,
                                url: url,
                                originalName: originalName,
                                isDefine: isDefine,
                                id: (prefix ? prefix + '!' + normalizedName : normalizedName) + suffix
                            };
                        }

                        function getModule(depMap) {
                            var id = depMap.id,
                                mod = getOwn(registry, id);
                            if (!mod) {
                                mod = registry[id] = new context.Module(depMap);
                            }
                            return mod;
                        }

                        function on(depMap, name, fn) {
                            var id = depMap.id,
                                mod = getOwn(registry, id);
                            if (hasProp(defined, id) && (!mod || mod.defineEmitComplete)) {
                                if (name === 'defined') {
                                    fn(defined[id]);
                                }
                            } else {
                                mod = getModule(depMap);
                                if (mod.error && name === 'error') {
                                    fn(mod.error);
                                } else {
                                    mod.on(name, fn);
                                }
                            }
                        }

                        function onError(err, errback) {
                            var ids = err.requireModules,
                                notified = false;
                            if (errback) {
                                errback(err);
                            } else {
                                each(ids, function(id) {
                                    var mod = getOwn(registry, id);
                                    if (mod) {
                                        mod.error = err;
                                        if (mod.events.error) {
                                            notified = true;
                                            mod.emit('error', err);
                                        }
                                    }
                                });
                                if (!notified) {
                                    req.onError(err);
                                }
                            }
                        }

                        function takeGlobalQueue() {
                            if (globalDefQueue.length) {
                                apsp.apply(defQueue, [defQueue.length, 0].concat(globalDefQueue));
                                globalDefQueue = [];
                            }
                        }
                        handlers = {
                            'require': function(mod) {
                                if (mod.require) {
                                    return mod.require;
                                } else {
                                    return (mod.require = context.makeRequire(mod.map));
                                }
                            },
                            'exports': function(mod) {
                                mod.usingExports = true;
                                if (mod.map.isDefine) {
                                    if (mod.exports) {
                                        return (defined[mod.map.id] = mod.exports);
                                    } else {
                                        return (mod.exports = defined[mod.map.id] = {});
                                    }
                                }
                            },
                            'module': function(mod) {
                                if (mod.module) {
                                    return mod.module;
                                } else {
                                    return (mod.module = {
                                        id: mod.map.id,
                                        uri: mod.map.url,
                                        config: function() {
                                            return getOwn(config.config, mod.map.id) || {};
                                        },
                                        exports: mod.exports || (mod.exports = {})
                                    });
                                }
                            }
                        };

                        function cleanRegistry(id) {
                            delete registry[id];
                            delete enabledRegistry[id];
                        }

                        function breakCycle(mod, traced, processed) {
                            var id = mod.map.id;
                            if (mod.error) {
                                mod.emit('error', mod.error);
                            } else {
                                traced[id] = true;
                                each(mod.depMaps, function(depMap, i) {
                                    var depId = depMap.id,
                                        dep = getOwn(registry, depId);
                                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                                        if (getOwn(traced, depId)) {
                                            mod.defineDep(i, defined[depId]);
                                            mod.check();
                                        } else {
                                            breakCycle(dep, traced, processed);
                                        }
                                    }
                                });
                                processed[id] = true;
                            }
                        }

                        function checkLoaded() {
                            var err, usingPathFallback, waitInterval = config.waitSeconds * 1000,
                                expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(),
                                noLoads = [],
                                reqCalls = [],
                                stillLoading = false,
                                needCycleCheck = true;
                            if (inCheckLoaded) {
                                return;
                            }
                            inCheckLoaded = true;
                            eachProp(enabledRegistry, function(mod) {
                                var map = mod.map,
                                    modId = map.id;
                                if (!mod.enabled) {
                                    return;
                                }
                                if (!map.isDefine) {
                                    reqCalls.push(mod);
                                }
                                if (!mod.error) {
                                    if (!mod.inited && expired) {
                                        if (hasPathFallback(modId)) {
                                            usingPathFallback = true;
                                            stillLoading = true;
                                        } else {
                                            noLoads.push(modId);
                                            removeScript(modId);
                                        }
                                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                                        stillLoading = true;
                                        if (!map.prefix) {
                                            return (needCycleCheck = false);
                                        }
                                    }
                                }
                            });
                            if (expired && noLoads.length) {
                                err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
                                err.contextName = context.contextName;
                                return onError(err);
                            }
                            if (needCycleCheck) {
                                each(reqCalls, function(mod) {
                                    breakCycle(mod, {}, {});
                                });
                            }
                            if ((!expired || usingPathFallback) && stillLoading) {
                                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                                    checkLoadedTimeoutId = setTimeout(function() {
                                        checkLoadedTimeoutId = 0;
                                        checkLoaded();
                                    }, 50);
                                }
                            }
                            inCheckLoaded = false;
                        }
                        Module = function(map) {
                            this.events = getOwn(undefEvents, map.id) || {};
                            this.map = map;
                            this.shim = getOwn(config.shim, map.id);
                            this.depExports = [];
                            this.depMaps = [];
                            this.depMatched = [];
                            this.pluginMaps = {};
                            this.depCount = 0;
                        };
                        Module.prototype = {
                            init: function(depMaps, factory, errback, options) {
                                options = options || {};
                                if (this.inited) {
                                    return;
                                }
                                this.factory = factory;
                                if (errback) {
                                    this.on('error', errback);
                                } else if (this.events.error) {
                                    errback = bind(this, function(err) {
                                        this.emit('error', err);
                                    });
                                }
                                this.depMaps = depMaps && depMaps.slice(0);
                                this.errback = errback;
                                this.inited = true;
                                this.ignore = options.ignore;
                                if (options.enabled || this.enabled) {
                                    this.enable();
                                } else {
                                    this.check();
                                }
                            },
                            defineDep: function(i, depExports) {
                                if (!this.depMatched[i]) {
                                    this.depMatched[i] = true;
                                    this.depCount -= 1;
                                    this.depExports[i] = depExports;
                                }
                            },
                            fetch: function() {
                                if (this.fetched) {
                                    return;
                                }
                                this.fetched = true;
                                context.startTime = (new Date()).getTime();
                                var map = this.map;
                                if (this.shim) {
                                    context.makeRequire(this.map, {
                                        enableBuildCallback: true
                                    })(this.shim.deps || [], bind(this, function() {
                                        return map.prefix ? this.callPlugin() : this.load();
                                    }));
                                } else {
                                    return map.prefix ? this.callPlugin() : this.load();
                                }
                            },
                            load: function() {
                                var url = this.map.url;
                                if (!urlFetched[url]) {
                                    urlFetched[url] = true;
                                    context.load(this.map.id, url);
                                }
                            },
                            check: function() {
                                if (!this.enabled || this.enabling) {
                                    return;
                                }
                                var err, cjsModule, id = this.map.id,
                                    depExports = this.depExports,
                                    exports = this.exports,
                                    factory = this.factory;
                                if (!this.inited) {
                                    this.fetch();
                                } else if (this.error) {
                                    this.emit('error', this.error);
                                } else if (!this.defining) {
                                    this.defining = true;
                                    if (this.depCount < 1 && !this.defined) {
                                        if (isFunction(factory)) {
                                            if ((this.events.error && this.map.isDefine) || req.onError !== defaultOnError) {
                                                try {
                                                    exports = context.execCb(id, factory, depExports, exports);
                                                } catch (e) {
                                                    err = e;
                                                }
                                            } else {
                                                exports = context.execCb(id, factory, depExports, exports);
                                            }
                                            if (this.map.isDefine && exports === undefined) {
                                                cjsModule = this.module;
                                                if (cjsModule) {
                                                    exports = cjsModule.exports;
                                                } else if (this.usingExports) {
                                                    exports = this.exports;
                                                }
                                            }
                                            if (err) {
                                                err.requireMap = this.map;
                                                err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                                err.requireType = this.map.isDefine ? 'define' : 'require';
                                                return onError((this.error = err));
                                            }
                                        } else {
                                            exports = factory;
                                        }
                                        this.exports = exports;
                                        if (this.map.isDefine && !this.ignore) {
                                            defined[id] = exports;
                                            if (req.onResourceLoad) {
                                                req.onResourceLoad(context, this.map, this.depMaps);
                                            }
                                        }
                                        cleanRegistry(id);
                                        this.defined = true;
                                    }
                                    this.defining = false;
                                    if (this.defined && !this.defineEmitted) {
                                        this.defineEmitted = true;
                                        this.emit('defined', this.exports);
                                        this.defineEmitComplete = true;
                                    }
                                }
                            },
                            callPlugin: function() {
                                var map = this.map,
                                    id = map.id,
                                    pluginMap = makeModuleMap(map.prefix);
                                this.depMaps.push(pluginMap);
                                on(pluginMap, 'defined', bind(this, function(plugin) {
                                    var load, normalizedMap, normalizedMod, bundleId = getOwn(bundlesMap, this.map.id),
                                        name = this.map.name,
                                        parentName = this.map.parentMap ? this.map.parentMap.name : null,
                                        localRequire = context.makeRequire(map.parentMap, {
                                            enableBuildCallback: true
                                        });
                                    if (this.map.unnormalized) {
                                        if (plugin.normalize) {
                                            name = plugin.normalize(name, function(name) {
                                                return normalize(name, parentName, true);
                                            }) || '';
                                        }
                                        normalizedMap = makeModuleMap(map.prefix + '!' + name, this.map.parentMap);
                                        on(normalizedMap, 'defined', bind(this, function(value) {
                                            this.init([], function() {
                                                return value;
                                            }, null, {
                                                enabled: true,
                                                ignore: true
                                            });
                                        }));
                                        normalizedMod = getOwn(registry, normalizedMap.id);
                                        if (normalizedMod) {
                                            this.depMaps.push(normalizedMap);
                                            if (this.events.error) {
                                                normalizedMod.on('error', bind(this, function(err) {
                                                    this.emit('error', err);
                                                }));
                                            }
                                            normalizedMod.enable();
                                        }
                                        return;
                                    }
                                    if (bundleId) {
                                        this.map.url = context.nameToUrl(bundleId);
                                        this.load();
                                        return;
                                    }
                                    load = bind(this, function(value) {
                                        this.init([], function() {
                                            return value;
                                        }, null, {
                                            enabled: true
                                        });
                                    });
                                    load.error = bind(this, function(err) {
                                        this.inited = true;
                                        this.error = err;
                                        err.requireModules = [id];
                                        eachProp(registry, function(mod) {
                                            if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                                                cleanRegistry(mod.map.id);
                                            }
                                        });
                                        onError(err);
                                    });
                                    load.fromText = bind(this, function(text, textAlt) {
                                        var moduleName = map.name,
                                            moduleMap = makeModuleMap(moduleName),
                                            hasInteractive = useInteractive;
                                        if (textAlt) {
                                            text = textAlt;
                                        }
                                        if (hasInteractive) {
                                            useInteractive = false;
                                        }
                                        getModule(moduleMap);
                                        if (hasProp(config.config, id)) {
                                            config.config[moduleName] = config.config[id];
                                        }
                                        try {
                                            req.exec(text);
                                        } catch (e) {
                                            return onError(makeError('fromtexteval', 'fromText eval for ' + id + ' failed: ' + e, e, [id]));
                                        }
                                        if (hasInteractive) {
                                            useInteractive = true;
                                        }
                                        this.depMaps.push(moduleMap);
                                        context.completeLoad(moduleName);
                                        localRequire([moduleName], load);
                                    });
                                    plugin.load(map.name, localRequire, load, config);
                                }));
                                context.enable(pluginMap, this);
                                this.pluginMaps[pluginMap.id] = pluginMap;
                            },
                            enable: function() {
                                enabledRegistry[this.map.id] = this;
                                this.enabled = true;
                                this.enabling = true;
                                each(this.depMaps, bind(this, function(depMap, i) {
                                    var id, mod, handler;
                                    if (typeof depMap === 'string') {
                                        depMap = makeModuleMap(depMap, (this.map.isDefine ? this.map : this.map.parentMap), false, !this.skipMap);
                                        this.depMaps[i] = depMap;
                                        handler = getOwn(handlers, depMap.id);
                                        if (handler) {
                                            this.depExports[i] = handler(this);
                                            return;
                                        }
                                        this.depCount += 1;
                                        on(depMap, 'defined', bind(this, function(depExports) {
                                            this.defineDep(i, depExports);
                                            this.check();
                                        }));
                                        if (this.errback) {
                                            on(depMap, 'error', bind(this, this.errback));
                                        } else if (this.events.error) {
                                            on(depMap, 'error', bind(this, function(err) {
                                                this.emit('error', err);
                                            }));
                                        }
                                    }
                                    id = depMap.id;
                                    mod = registry[id];
                                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                                        context.enable(depMap, this);
                                    }
                                }));
                                eachProp(this.pluginMaps, bind(this, function(pluginMap) {
                                    var mod = getOwn(registry, pluginMap.id);
                                    if (mod && !mod.enabled) {
                                        context.enable(pluginMap, this);
                                    }
                                }));
                                this.enabling = false;
                                this.check();
                            },
                            on: function(name, cb) {
                                var cbs = this.events[name];
                                if (!cbs) {
                                    cbs = this.events[name] = [];
                                }
                                cbs.push(cb);
                            },
                            emit: function(name, evt) {
                                each(this.events[name], function(cb) {
                                    cb(evt);
                                });
                                if (name === 'error') {
                                    delete this.events[name];
                                }
                            }
                        };

                        function callGetModule(args) {
                            if (!hasProp(defined, args[0])) {
                                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
                            }
                        }

                        function removeListener(node, func, name, ieName) {
                            if (node.detachEvent && !isOpera) {
                                if (ieName) {
                                    node.detachEvent(ieName, func);
                                }
                            } else {
                                node.removeEventListener(name, func, false);
                            }
                        }

                        function getScriptData(evt) {
                            var node = evt.currentTarget || evt.srcElement;
                            removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
                            removeListener(node, context.onScriptError, 'error');
                            return {
                                node: node,
                                id: node && node.getAttribute('data-requiremodule')
                            };
                        }

                        function intakeDefines() {
                            var args;
                            takeGlobalQueue();
                            while (defQueue.length) {
                                args = defQueue.shift();
                                if (args[0] === null) {
                                    return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' + args[args.length - 1]));
                                } else {
                                    callGetModule(args);
                                }
                            }
                        }
                        context = {
                            config: config,
                            contextName: contextName,
                            registry: registry,
                            defined: defined,
                            urlFetched: urlFetched,
                            defQueue: defQueue,
                            Module: Module,
                            makeModuleMap: makeModuleMap,
                            nextTick: req.nextTick,
                            onError: onError,
                            configure: function(cfg) {
                                if (cfg.baseUrl) {
                                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                                        cfg.baseUrl += '/';
                                    }
                                }
                                var shim = config.shim,
                                    objs = {
                                        paths: true,
                                        bundles: true,
                                        config: true,
                                        map: true
                                    };
                                eachProp(cfg, function(value, prop) {
                                    if (objs[prop]) {
                                        if (!config[prop]) {
                                            config[prop] = {};
                                        }
                                        mixin(config[prop], value, true, true);
                                    } else {
                                        config[prop] = value;
                                    }
                                });
                                if (cfg.bundles) {
                                    eachProp(cfg.bundles, function(value, prop) {
                                        each(value, function(v) {
                                            if (v !== prop) {
                                                bundlesMap[v] = prop;
                                            }
                                        });
                                    });
                                }
                                if (cfg.shim) {
                                    eachProp(cfg.shim, function(value, id) {
                                        if (isArray(value)) {
                                            value = {
                                                deps: value
                                            };
                                        }
                                        if ((value.exports || value.init) && !value.exportsFn) {
                                            value.exportsFn = context.makeShimExports(value);
                                        }
                                        shim[id] = value;
                                    });
                                    config.shim = shim;
                                }
                                if (cfg.packages) {
                                    each(cfg.packages, function(pkgObj) {
                                        var location, name;
                                        pkgObj = typeof pkgObj === 'string' ? {
                                            name: pkgObj
                                        } : pkgObj;
                                        name = pkgObj.name;
                                        location = pkgObj.location;
                                        if (location) {
                                            config.paths[name] = pkgObj.location;
                                        }
                                        config.pkgs[name] = pkgObj.name + '/' + (pkgObj.main || 'main').replace(currDirRegExp, '').replace(jsSuffixRegExp, '');
                                    });
                                }
                                eachProp(registry, function(mod, id) {
                                    if (!mod.inited && !mod.map.unnormalized) {
                                        mod.map = makeModuleMap(id);
                                    }
                                });
                                if (cfg.deps || cfg.callback) {
                                    context.require(cfg.deps || [], cfg.callback);
                                }
                            },
                            makeShimExports: function(value) {
                                function fn() {
                                    var ret;
                                    if (value.init) {
                                        ret = value.init.apply(global, arguments);
                                    }
                                    return ret || (value.exports && getGlobal(value.exports));
                                }
                                return fn;
                            },
                            makeRequire: function(relMap, options) {
                                options = options || {};

                                function localRequire(deps, callback, errback) {
                                    var id, map, requireMod;
                                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                                        callback.__requireJsBuild = true;
                                    }
                                    if (typeof deps === 'string') {
                                        if (isFunction(callback)) {
                                            return onError(makeError('requireargs', 'Invalid require call'), errback);
                                        }
                                        if (relMap && hasProp(handlers, deps)) {
                                            return handlers[deps](registry[relMap.id]);
                                        }
                                        if (req.get) {
                                            return req.get(context, deps, relMap, localRequire);
                                        }
                                        map = makeModuleMap(deps, relMap, false, true);
                                        id = map.id;
                                        if (!hasProp(defined, id)) {
                                            return onError(makeError('notloaded', 'Module name "' +
                                                id + '" has not been loaded yet for context: ' +
                                                contextName +
                                                (relMap ? '' : '. Use require([])')));
                                        }
                                        return defined[id];
                                    }
                                    intakeDefines();
                                    context.nextTick(function() {
                                        intakeDefines();
                                        requireMod = getModule(makeModuleMap(null, relMap));
                                        requireMod.skipMap = options.skipMap;
                                        requireMod.init(deps, callback, errback, {
                                            enabled: true
                                        });
                                        checkLoaded();
                                    });
                                    return localRequire;
                                }
                                mixin(localRequire, {
                                    isBrowser: isBrowser,
                                    toUrl: function(moduleNamePlusExt) {
                                        var ext, index = moduleNamePlusExt.lastIndexOf('.'),
                                            segment = moduleNamePlusExt.split('/')[0],
                                            isRelative = segment === '.' || segment === '..';
                                        if (index !== -1 && (!isRelative || index > 1)) {
                                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                                        }
                                        return context.nameToUrl(normalize(moduleNamePlusExt, relMap && relMap.id, true), ext, true);
                                    },
                                    defined: function(id) {
                                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                                    },
                                    specified: function(id) {
                                        id = makeModuleMap(id, relMap, false, true).id;
                                        return hasProp(defined, id) || hasProp(registry, id);
                                    }
                                });
                                if (!relMap) {
                                    localRequire.undef = function(id) {
                                        takeGlobalQueue();
                                        var map = makeModuleMap(id, relMap, true),
                                            mod = getOwn(registry, id);
                                        removeScript(id);
                                        delete defined[id];
                                        delete urlFetched[map.url];
                                        delete undefEvents[id];
                                        eachReverse(defQueue, function(args, i) {
                                            if (args[0] === id) {
                                                defQueue.splice(i, 1);
                                            }
                                        });
                                        if (mod) {
                                            if (mod.events.defined) {
                                                undefEvents[id] = mod.events;
                                            }
                                            cleanRegistry(id);
                                        }
                                    };
                                }
                                return localRequire;
                            },
                            enable: function(depMap) {
                                var mod = getOwn(registry, depMap.id);
                                if (mod) {
                                    getModule(depMap).enable();
                                }
                            },
                            completeLoad: function(moduleName) {
                                var found, args, mod, shim = getOwn(config.shim, moduleName) || {},
                                    shExports = shim.exports;
                                takeGlobalQueue();
                                while (defQueue.length) {
                                    args = defQueue.shift();
                                    if (args[0] === null) {
                                        args[0] = moduleName;
                                        if (found) {
                                            break;
                                        }
                                        found = true;
                                    } else if (args[0] === moduleName) {
                                        found = true;
                                    }
                                    callGetModule(args);
                                }
                                mod = getOwn(registry, moduleName);
                                if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                                        if (hasPathFallback(moduleName)) {
                                            return;
                                        } else {
                                            return onError(makeError('nodefine', 'No define call for ' + moduleName, null, [moduleName]));
                                        }
                                    } else {
                                        callGetModule([moduleName, (shim.deps || []), shim.exportsFn]);
                                    }
                                }
                                checkLoaded();
                            },
                            nameToUrl: function(moduleName, ext, skipExt) {
                                var paths, syms, i, parentModule, url, parentPath, bundleId, pkgMain = getOwn(config.pkgs, moduleName);
                                if (pkgMain) {
                                    moduleName = pkgMain;
                                }
                                bundleId = getOwn(bundlesMap, moduleName);
                                if (bundleId) {
                                    return context.nameToUrl(bundleId, ext, skipExt);
                                }
                                if (req.jsExtRegExp.test(moduleName)) {
                                    url = moduleName + (ext || '');
                                } else {
                                    paths = config.paths;
                                    syms = moduleName.split('/');
                                    for (i = syms.length; i > 0; i -= 1) {
                                        parentModule = syms.slice(0, i).join('/');
                                        parentPath = getOwn(paths, parentModule);
                                        if (parentPath) {
                                            if (isArray(parentPath)) {
                                                parentPath = parentPath[0];
                                            }
                                            syms.splice(0, i, parentPath);
                                            break;
                                        }
                                    }
                                    url = syms.join('/');
                                    url += (ext || (/^data\:|\?/.test(url) || skipExt ? '' : '.js'));
                                    url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
                                }
                                return config.urlArgs ? url +
                                    ((url.indexOf('?') === -1 ? '?' : '&') +
                                        config.urlArgs) : url;
                            },
                            load: function(id, url) {
                                req.load(context, id, url);
                            },
                            execCb: function(name, callback, args, exports) {
                                return callback.apply(exports, args);
                            },
                            onScriptLoad: function(evt) {
                                if (evt.type === 'load' || (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                                    interactiveScript = null;
                                    var data = getScriptData(evt);
                                    context.completeLoad(data.id);
                                }
                            },
                            onScriptError: function(evt) {
                                var data = getScriptData(evt);
                                if (!hasPathFallback(data.id)) {
                                    return onError(makeError('scripterror', 'Script error for: ' + data.id, evt, [data.id]));
                                }
                            }
                        };
                        context.require = context.makeRequire();
                        return context;
                    }
                    req = requirejs = function(deps, callback, errback, optional) {
                        var context, config, contextName = defContextName;
                        if (!isArray(deps) && typeof deps !== 'string') {
                            config = deps;
                            if (isArray(callback)) {
                                deps = callback;
                                callback = errback;
                                errback = optional;
                            } else {
                                deps = [];
                            }
                        }
                        if (config && config.context) {
                            contextName = config.context;
                        }
                        context = getOwn(contexts, contextName);
                        if (!context) {
                            context = contexts[contextName] = req.s.newContext(contextName);
                        }
                        if (config) {
                            context.configure(config);
                        }
                        return context.require(deps, callback, errback);
                    };
                    req.config = function(config) {
                        return req(config);
                    };
                    req.nextTick = typeof setTimeout !== 'undefined' ? function(fn) {
                        setTimeout(fn, 4);
                    } : function(fn) {
                        fn();
                    };
                    if (!require) {
                        require = req;
                    }
                    req.version = version;
                    req.jsExtRegExp = /^\/|:|\?|\.js$/;
                    req.isBrowser = isBrowser;
                    s = req.s = {
                        contexts: contexts,
                        newContext: newContext
                    };
                    req({});
                    each(['toUrl', 'undef', 'defined', 'specified'], function(prop) {
                        req[prop] = function() {
                            var ctx = contexts[defContextName];
                            return ctx.require[prop].apply(ctx, arguments);
                        };
                    });
                    if (isBrowser) {
                        head = s.head = document.getElementsByTagName('head')[0];
                        baseElement = document.getElementsByTagName('base')[0];
                        if (baseElement) {
                            head = s.head = baseElement.parentNode;
                        }
                    }
                    req.onError = defaultOnError;
                    req.createNode = function(config, moduleName, url) {
                        var node = config.xhtml ? document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') : document.createElement('script');
                        node.type = config.scriptType || 'text/javascript';
                        node.charset = 'utf-8';
                        node.async = true;
                        return node;
                    };
                    req.load = function(context, moduleName, url) {
                        var config = (context && context.config) || {},
                            node;
                        if (isBrowser) {
                            node = req.createNode(config, moduleName, url);
                            node.setAttribute('data-requirecontext', context.contextName);
                            node.setAttribute('data-requiremodule', moduleName);
                            if (node.attachEvent && !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) && !isOpera) {
                                useInteractive = true;
                                node.attachEvent('onreadystatechange', context.onScriptLoad);
                            } else {
                                node.addEventListener('load', context.onScriptLoad, false);
                                node.addEventListener('error', context.onScriptError, false);
                            }
                            node.src = url;
                            currentlyAddingScript = node;
                            if (baseElement) {
                                head.insertBefore(node, baseElement);
                            } else {
                                head.appendChild(node);
                            }
                            currentlyAddingScript = null;
                            return node;
                        } else if (isWebWorker) {
                            try {
                                importScripts(url);
                                context.completeLoad(moduleName);
                            } catch (e) {
                                context.onError(makeError('importscripts', 'importScripts failed for ' +
                                    moduleName + ' at ' + url, e, [moduleName]));
                            }
                        }
                    };

                    function getInteractiveScript() {
                        if (interactiveScript && interactiveScript.readyState === 'interactive') {
                            return interactiveScript;
                        }
                        eachReverse(scripts(), function(script) {
                            if (script.readyState === 'interactive') {
                                return (interactiveScript = script);
                            }
                        });
                        return interactiveScript;
                    }
                    if (isBrowser && !cfg.skipDataMain) {
                        eachReverse(scripts(), function(script) {
                            if (!head) {
                                head = script.parentNode;
                            }
                            dataMain = script.getAttribute('data-main');
                            if (dataMain) {
                                mainScript = dataMain;
                                if (!cfg.baseUrl) {
                                    src = mainScript.split('/');
                                    mainScript = src.pop();
                                    subPath = src.length ? src.join('/') + '/' : './';
                                    cfg.baseUrl = subPath;
                                }
                                mainScript = mainScript.replace(jsSuffixRegExp, '');
                                if (req.jsExtRegExp.test(mainScript)) {
                                    mainScript = dataMain;
                                }
                                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];
                                return true;
                            }
                        });
                    }
                    define = function(name, deps, callback) {
                        var node, context;
                        if (typeof name !== 'string') {
                            callback = deps;
                            deps = name;
                            name = null;
                        }
                        if (!isArray(deps)) {
                            callback = deps;
                            deps = null;
                        }
                        if (!deps && isFunction(callback)) {
                            deps = [];
                            if (callback.length) {
                                callback.toString().replace(commentRegExp, '').replace(cjsRequireRegExp, function(match, dep) {
                                    deps.push(dep);
                                });
                                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
                            }
                        }
                        if (useInteractive) {
                            node = currentlyAddingScript || getInteractiveScript();
                            if (node) {
                                if (!name) {
                                    name = node.getAttribute('data-requiremodule');
                                }
                                context = contexts[node.getAttribute('data-requirecontext')];
                            }
                        }
                        (context ? context.defQueue : globalDefQueue).push([name, deps, callback]);
                    };
                    define.amd = {
                        jQuery: true
                    };
                    req.exec = function(text) {
                        return eval(text);
                    };
                    req(cfg);
                }(this));
                return {
                    require: require.config({
                        waitSeconds: 3000,
                        baseUrl: bootstrap.staticURL,
                        context: this.Zotabox
                    }),
                    define: define
                }
            }.call(this));
            var Zotabox = function() {
                this.initialize();
                return this;
            }
            Zotabox.prototype.require = require = proto.require;
            Zotabox.prototype.define = define = proto.define;
            Zotabox.prototype.Widgets = {};
            Zotabox.prototype.Cookies = {};
            Zotabox.prototype.Stats = {};
            Zotabox.prototype.onInitialized = function() {};
            Zotabox.prototype.isInitialized = function() {
                return _isInitialized;
            };
            Zotabox.prototype.initialize = function() {
                var _super = this;
                var urls = [bootstrap.bundleURL, (!_super.isPreview() ? (bootstrap.dataURL) : null)].concat(bootstrap.widgetURLs);
                require(urls, function(bundleScript, rawData) {
                    return bundleScript(rawData, bootstrap, function(initialize, data) {
                        return require(['Location', 'Stats', 'Depd.MobileButton'], function(Location, Stats, MobileButton) {
                            var statUri = _super.getDomainURIs().stats + '/api/';
                            var stats = _super.Stats = new Stats(_super.getData().customer.id, _super.getData().domain.id, statUri, _super.isPreview());
                            if (!_super.Cookies.Session.cookie('_ZB_STATS_VISIT')) {
                                _super.Cookies.Session.cookie('_ZB_STATS_VISIT', true);
                                stats.addVisitor();
                            }
                            window.__ZBMBT__ = new MobileButton();
                            window.__ZBLOC__ = new Location();
                            return initialize(function() {
                                return (_isInitialized = true) & stats.init() & _super.onInitialized();
                            });
                        }, console.error);
                    });
                }, console.error);
                (function(history) {
                    var pushState = history.pushState;
                    history.pushState = function(state) {
                        pushState.apply(history, arguments);
                        if (window.Muse) {
                            window.require(['jquery'], function(jQuery) {
                                jQuery('.breakpoint').registerBreakpoint();
                            });
                        }
                        if (typeof __ZBX_INSTALL__ == "function") {
                            __ZBX_INSTALL__(true);
                        }
                    }
                })(window.history);
                if (window.Ecwid) {
                    window.Ecwid.OnPageLoaded.add(function(page) {
                        if (typeof __ZBX_INSTALL__ == "function") {
                            __ZBX_INSTALL__(true);
                        }
                    });
                }
            };
            Zotabox.prototype.getWidgets = function() {
                return window.__ZBWG__ || {};
            };
            Zotabox.prototype.getDomainRules = function() {
                return window.__ZBRL__ || null;
            };
            Zotabox.prototype.getData = function() {
                return window.__ZBDT__ || {};
            };
            Zotabox.prototype.getBaseCSS = function(name) {
                return name ? (window.__ZBCSS__ || {})[name] : window.__ZBCSS__ || {};
            };
            Zotabox.prototype.getStyles = function(name) {
                return name ? (window.__ZBSTY__ || {})[name] : window.__ZBSTY__ || {};
            };
            Zotabox.prototype.getTemplates = function(name) {
                return name ? (window.__ZBTPL__ || {})[name] : (window.__ZBTPL__ || {});
            };
            Zotabox.prototype.getDomainRoot = function() {
                return window.__ZBDR__;
            };
            Zotabox.prototype.getDomainURIs = function(name) {
                return name ? (window.__ZBDU__ || {})[name] : (window.__ZBDU__ || {});
            };
            Zotabox.prototype.getMobileButton = function() {
                return window.__ZBMBT__;
            };
            Zotabox.prototype.getConfig = function() {
                return bootstrap;
            };
            Zotabox.prototype.getWidgetById = function(widgetId) {
                return this._.findWhere(this.getWidgets(), {
                    '_id': widgetId,
                    'container': 'default'
                });
            };
            Zotabox.prototype.getWidgeDatatById = function(widgetId) {
                return this._.chain(this.getData().widgets).values().findWhere({
                    'id': widgetId
                }).value();
            };
            Zotabox.prototype.show = function(widgetId) {
                if (this.getWidgetById(widgetId)) {
                    this.getWidgetById(widgetId).show();
                    if (typeof this.getWidgetById(widgetId).doShowPopup == 'function') {
                        this.getWidgetById(widgetId).doShowPopup();
                    } else if (typeof this.getWidgetById(widgetId).showChatBox == 'function') {
                        this.getWidgetById(widgetId).showChatBox();
                    }
                    return true;
                } else {
                    return false;
                }
            };
            Zotabox.prototype.hide = function(widgetId) {
                if (this.getWidgetById(widgetId)) {
                    return this.getWidgetById(widgetId).hide();
                } else {
                    return false;
                }
            };
            Zotabox.prototype.removeAllWidgets = function() {
                var elements = this.Core.Sly('[data-wzb]').search(document.body) || [];
                return this._.each(elements, function(element) {
                    element.parentNode.removeChild(element);
                });
            };
            Zotabox.prototype.isDevelopment = function() {
                return false;
            };
            Zotabox.prototype.isPreview = function() {
                return false;
            };
            Zotabox.prototype.isPJAX = function() {
                return window.__ZB_IS_PJAX__ || false;
            };
            Zotabox.prototype.removeZotaboxEvents = function(eventType) {
                var eventHandlers = window.__ZB_EVENT_HANDLERS__;
                this._.each(eventHandlers, function(handler, evtKey) {
                    var pattern = new RegExp('^(' + (eventType ? eventType : '.+') + ')\_.+$', 'gi');
                    if (pattern.test(evtKey) && this._.isFunction(handler)) {
                        var evtName = new RegExp(pattern).exec(String(evtKey));
                        evtName = !this._.isEmpty(evtName) ? evtName[1] : null;
                        if (!evtName) return;
                        else this.removeEvent(evtName, window, handler);
                        delete window.__ZB_EVENT_HANDLERS__[evtKey];
                    }
                }, this);
            };
            window.__ZBWG__ = window.__ZBWG__ || {};
            window.__ZBSTY__ = window.__ZBSTY__ || {};
            window.__ZBDR__ = window.__ZBDR__ || bootstrap.root;
            window.__ZBDU__ = window.__ZBDU__ || bootstrap.domains;
            window.__ZBTPL__ = window.__ZBTPL__ || {};
            window.__ZB_EVENT_HANDLERS__ = window.__ZB_EVENT_HANDLERS__ || {};
            window.__ZBMBT__ = window.__ZBMBT__ || false;
            var _refreshMuse = function(timeout) {
                var running = 0;
                var t = setInterval(function() {
                    if (running >= 3000) return clearInterval(t);
                    if (document.readyState === "complete") {
                        setTimeout(function() {
                            return window.require(['jquery'], function(jQuery) {
                                if (jQuery('body > .breakpoint').hasClass('active')) return;
                                jQuery('.breakpoint').registerBreakpoint();
                            });
                        }, (timeout || 0));
                        return clearInterval(t);
                    };
                    running++;
                }, 10);
            }
            if (typeof window.Zotabox !== 'undefined') {
                if (window.Muse) {
                    _refreshMuse(100);
                }
                return false;
            }
            window.Zotabox = new Zotabox();
            if (window.Muse) {
                window.Zotabox.onInitialized = function() {
                    _refreshMuse();
                };
            }
        }).call(this, {
            root: "//static.zotabox.com/8/4/8493e52b24fa1e2bc0c9da58420a6ae6",
            domains: {
                "stats": "//stats.zotabox.com",
                "static": "//static.zotabox.com",
                "file": "//file.zotabox.com",
                "push": "https://zotabox.me",
                "setting": "https://zotabox.com",
                "actions": "https://actions.zotabox.com",
                "static2": ["//static.zbcdn.net", "//static.zbcdn2.net", "//static.zbcdn3.net"],
                "file2": ["//file.zbcdn.net", "//file.zbcdn2.net", "//file.zbcdn3.net"],
                "trial_days": 30,
                "total_servers": 3,
                "imageResize": true
            },
            staticURL: "//static.zotabox.com",
            dataURL: '//static.zotabox.com/8/4/8493e52b24fa1e2bc0c9da58420a6ae6/data.js?1538450026200',
            bundleURL: '//static.zotabox.com/__ynifhff/bundle.js',
            widgetURLs: ["//static.zotabox.com/__ynifhff/sp.default.js"],
            widgetInstallerClasses: ["Widgets.SimplePopup.Default.Installer"],
            data: {},
            version: 'ynifhff',
            timestamp: '1538450026200',
            imageResize: true
        });
    }
    window.Zotabox_Init();
}