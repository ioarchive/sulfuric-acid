/**
 * @name Fart
 * @version 1.1.0
 * @main index.js
 * @description it returns
 * @license MIT
 * @source https://github.com/aniiiiiimal/sulfuric-acid
 * @updateUrl https://github.com/aniiiiiimal/sulfuric-acid/blob/builds/Fart.plugin.js
 * @author Animal
 */
(function () {
    'use strict';

    // Made with Ittai - https://git.catvibers.me/ittai/ittai
    let IttaiInternals = {};
    let ittaiPluginExport=(()=>{

    var manifest$1 = {
    	name: "Fart",
    	version: "1.1.0",
    	license: "MIT",
    	source: "https://github.com/aniiiiiimal/sulfuric-acid",
    	updateUrl: "https://github.com/aniiiiiimal/sulfuric-acid/blob/builds/Fart.plugin.js",
    	main: "index.js",
    	author: "Animal",
    	description: "it returns"
    };
    var changelog = "";
    var ittaiconfig = {
    	manifest: manifest$1,
    	changelog: changelog
    };

    var config = /*#__PURE__*/Object.freeze({
        __proto__: null,
        manifest: manifest$1,
        changelog: changelog,
        'default': ittaiconfig
    });

    let clientWebpack = (() => {
        return globalThis.BdApi ?? (() => { try {
                return BdApi;
            }
            catch (e) { } })();
    })();
    function find(filter) {
        return clientWebpack.findModule(filter);
    }
    function findByProps(...props) {
        return find(m => props.every(p => m?.[p] !== undefined));
    }
    function findByDisplayName(name, returnDefault = true) {
        let ret = find(m => m?.default?.displayName === name);
        if (returnDefault)
            return ret.default;
        return ret;
    }

    /**
     * {@link https://discord.com/acknowledgements/|Full list of libraries that Discord uses.}
     * @module webpack/common
     */
    const React = /*#__PURE__*/ findByProps("useState");
    const ReactDOM = /*#__PURE__*/ findByProps("render", "unmountComponentAtNode");
    const ReactSpring = /*#__PURE__*/ findByProps("useSpring", "useTransition");
    const Lodash = globalThis._;
    const ModalActions = /*#__PURE__*/ findByProps("openModal", "updateModal");

    IttaiInternals.React = React;
    IttaiInternals.ReactDOM = ReactDOM;
    IttaiInternals.ReactSpring = ReactSpring;
    IttaiInternals.Lodash = Lodash;

    const BdAPIInstance = globalThis.BdApi ?? /*#__PURE__*/ (() => { try {
        return BdApi;
    }
    catch (e) { } })(); //topaz and other compat mods stuff
    class BDPlugin {
        constructor() {
            this.__ittaiInternals = {
                getAllSettings: () => {
                    return BdAPIInstance.loadData(manifest$1.name, "settings") ?? {};
                },
                getSetting: (key, defaultValue) => {
                    return (BdAPIInstance.loadData(manifest$1.name, "settings") ?? {})[key] ?? defaultValue;
                },
                setSettings: (newSettings) => {
                    if (typeof newSettings !== "object")
                        return;
                    BdAPIInstance.saveData(manifest$1.name, "settings", Object.assign(this.__ittaiInternals.getAllSettings(), newSettings));
                },
                setSetting: (key, value) => {
                    BdAPIInstance.saveData(manifest$1.name, "settings", Object.assign(this.__ittaiInternals.getAllSettings(), { [key]: value }));
                },
                removeSetting: (key) => {
                    let outputSetting = this.__ittaiInternals.getAllSettings();
                    delete outputSetting?.[key];
                    BdAPIInstance.saveData(manifest$1.name, "settings", outputSetting);
                },
                resetSettings: () => {
                    BdAPIInstance.saveData(manifest$1.name, "settings", {});
                },
                setSettingsPanel: (component) => {
                    this.getSettingsPanel = () => {
                        try {
                            if (typeof component === "function")
                                component = React.createElement(component);
                            return component;
                        }
                        catch (e) {
                            this.error("Failed to load settings panel.", e);
                        }
                        return null;
                    };
                },
                removeSettingsPanel: () => {
                    delete this.getSettingsPanel;
                }
            };
        }
        // smol test for topaz
        // getSettingsPanel = () => {
        // 	return null;
        // };
        log() {
            logger.log(...arguments);
        }
        debug() {
            logger.debug(...arguments);
        }
        warn() {
            logger.warn(...arguments);
        }
        error() {
            logger.error(...arguments);
        }
    }

    const get = (key, defaultValue) => {
        return settingsInstance.getSetting(key, defaultValue);
    };
    const set = (key, value) => {
        return settingsInstance.setSetting(key, value);
    };
    // HACK
    let settingsInstance;
    const setInstance = (i) => {
        settingsInstance = i;
    };
    // export default class SettingsAPI {
    //     constructor(pluginInstance: Plugin) {
    //         this.__pluginInstance = pluginInstance;
    //     }
    //     private __pluginInstance: Plugin
    //     get (key: string, defaultValue: any) : any {
    //         return this.__pluginInstance.__ittaiInternalPlugin.__ittaiInternals.getSetting(key, defaultValue); // Yes this is excessive. Too bad.
    //     }
    //     getAll () : Object {
    //         return this.__pluginInstance.__ittaiInternalPlugin.__ittaiInternals.getAllSettings();
    //     }
    //     set (key: string, value: any) : void {
    //         return this.__pluginInstance.__ittaiInternalPlugin.__ittaiInternals.setSetting(key, value);
    //     }
    //     setAll (settings: Object) : void {
    //         return this.__pluginInstance.__ittaiInternalPlugin.__ittaiInternals.setSettings(settings);
    //     }
    // }

    function createArguments(...args) {
        return [
            "%cIttai",
            "color: #000; background-color: #42ffa7; font-family: default; padding-left: 3px; padding-right: 3px; border-radius: 2px; font-weight: bold;",
            ...args,
        ];
    }

    /**
     * @memberof module:logger
     * @param  {...any} args
     */ function log(...args) {
        consoleCopy.log(...createArguments(...args));
    }

    /**
     * @memberof module:logger
     * @param  {...any} args
     */ function debug(...args) {
        consoleCopy.debug(...createArguments(...args));
    }

    /**
     * @memberof module:logger
     * @param  {...any} args
     */ function warn(...args) {
        consoleCopy.warn(...createArguments(...args));
    }

    /**
     * @memberof module:logger
     * @param  {...any} args
     */ function error(...args) {
        consoleCopy.error(...createArguments(...args));
    }

    /**
     * @module logger
     */
    const consoleCopy = { ...console };

    /**
     * The plugin class for the running client mod.
     * @name Plugin
     * @memberof module:entities
     */ class Plugin {
        constructor() {
            this.friendlyName = manifest$1.name;
        }
        start() { }
        stop() { }
        setSettingsPanel(component) {
            this.__ittaiInternalPlugin.setSettingsPanel(component);
        }
        removeSettingsPanel() {
            this.__ittaiInternalPlugin.removeSettingsPanel();
        }
        log(...args) {
            log(...args);
        }
        debug(...args) {
            debug(...args);
        }
        warn(...args) {
            warn(...args);
        }
        error(...args) {
            error(...args);
        }
    }

    /**
     * @param {string} name The name of the patch. For debugging.
     * @param {any} object The object that the function is in.
     * @param {string} functionName The name of the function to patch.
     * @param {function} patchFunction The code to patch into the function.
     * @returns {object} {@link module:patcher.patch~patchData}
     * @memberof module:patcher
     * @tutorial patchingAfter
     */ function after(name, object, functionName, patchFunction) {
        return patch(name, object, functionName, "after", patchFunction);
    }

    /**
     * Unpatches all of the patches specified, or all of them if none are specified.
     * @memberof module:patcher
     * @param {string[]} [unpatches={@link module:patcher.patches}] An array patch names.
     */ function unpatchAll(unpatches) {
        if (!Array.isArray(unpatches))
            unpatches = patches;
        for (const object of Object.values(unpatches)) {
            for (const funct of Object.values(object)) {
                for (const patch of funct.patches) {
                    patch.unpatch();
                }
            }
        }
    }

    /**
     * Finds an object in a tree.
     * @param {object} tree The tree to search.
     * @param {function} filter A filter function that should return true when it checks what you want to find.
     * @param {object} options
     * @param {string[]} [options.walkable=[]] Which node names are walkable.
     * @param {string[]} [options.exclude=[]] Which node names to not walk.
     * @param {boolean|string} [options.whileLoop=false] Whether or not to use a while loop instead of recursion. This is slower, but not prone to stack overflow.
     * @param {boolean|string} [options.maxDepth=100] The maximum amount of layers deep to search the tree. `options.whileLoop=false` only.
     * @memberof module:utilities
     * @returns {object|null}
     */ function findInTree(tree, filter, { walkable = [], exclude = [], whileLoop = false, maxDepth = 100, depth = 0, } = {}) {
        if (depth === maxDepth)
            return null;
        if (tree === null || tree === undefined)
            return null;
        if (typeof tree !== "object")
            return null;
        if (typeof filter === "string")
            return tree[filter];
        if (whileLoop) {
            const stack = [tree];
            while (stack.length) {
                const node = stack[whileLoop === "reverse" ? "pop" : "shift"]();
                try {
                    if (filter(node))
                        return node;
                }
                catch { }
                if (stack.length >= maxStack)
                    continue;
                if (Array.isArray(node)) {
                    stack.push(...node);
                }
                else if (typeof node === "object" && node !== null) {
                    if (walkable.length > 0) {
                        stack.push(...Object.entries(node)
                            .filter(([key, value]) => walkable.indexOf(key) !== -1 && exclude.indexOf(key) === -1)
                            .map(([key, value]) => value));
                    }
                    else {
                        stack.push(...Object.values(node).filter((key) => exclude.indexOf(key) === -1 && node));
                    }
                }
                depth++;
            }
            return null;
        }
        else {
            let returnValue;
            try {
                if (filter(tree))
                    return tree;
            }
            catch { }
            if (Array.isArray(tree)) {
                for (const value of tree) {
                    returnValue = findInTree(value, filter, {
                        walkable,
                        exclude,
                        whileLoop,
                        maxDepth,
                        depth: depth + 1,
                    });
                    if (returnValue)
                        return returnValue;
                }
            }
            let keys = walkable.length > 0 ? walkable : Object.keys(tree);
            for (const key of keys) {
                if (!tree.hasOwnProperty(key) || exclude.includes(key))
                    continue;
                returnValue = findInTree(tree[key], filter, {
                    walkable,
                    exclude,
                    whileLoop,
                    maxDepth,
                    depth: depth + 1,
                });
                if (returnValue)
                    return returnValue;
            }
            return null;
        }
    }

    /**
     * Finds an object in a React tree.
     * @memberof module:utilities
     * @param {object} tree The tree to search.
     * @param {function} filter A filter function that should return true when it checks what you want to find.
     * @param {object} [whileLoop=false] Whether or not to use a while loop instead of recursion. This is slower, but not prone to stack overflow.
     */ function findInReactTree(tree, filter, { whileLoop = false, maxDepth = 100, depth = 0 } = {}) {
        return findInTree(tree, filter, {
            walkable: ["props", "children", "child", "sibling"],
            exclude: ["__reactFiber$", "__reactFiber", "__reactInternalInstance$", "__reactInternalInstance"],
            whileLoop,
            maxDepth,
            depth,
        });
    }

    /**
     * @param {number} min The minimum value of the returned number.
     * @param {number} mix The maximum value of the returned number.
     * @memberof module:utilities
     * @returns {number} A random number.
     */ function randomNumber(min, max) {
        return Math.random() * max - min;
    }

    /**
     * @param {number} length The length of the string.
     * @param {string|array} dontMatch A string or an array of strings that will cause a regeneration if any are matched.
     * @param {string|array} charset A list of the characters to use when generating the string.
     * @memberof module:utilities
     * @returns {string} A string of random characters.
     */ function randomString(length, dontMatch = "", charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") {
        if (typeof length !== "number" && length <= 0)
            return;
        if (typeof dontMatch !== "string" && !Array.isArray(dontMatch))
            return;
        if (typeof charset !== "string" && !Array.isArray(charset))
            return;
        let string = "";
        do {
            while (string.length < length) {
                string += charset[Math.round(randomNumber(0, charset.length - 1))];
            }
            string = string.slice(0, length);
        } while (dontMatch &&
            (string === dontMatch || dontMatch.some((m) => m === string)));
        return string;
    }

    var joinClasses = (...classes) => classes.filter(s => typeof s === 'string').join(" ");

    const Changelog = /*#__PURE__*/ findByProps("lead", "socialLink");
    const ChangelogModal = /*#__PURE__*/ findByProps("maxModalWidth", "content"); // i assume its related to the changelog modal

    /**
     * @module components
     */
    const Text = /*#__PURE__*/ findByDisplayName("LegacyText");
    const Flex = /*#__PURE__*/ findByDisplayName("Flex");
    const Modal = /*#__PURE__*/ findByProps("ModalRoot");
    const Heading = /*#__PURE__*/ (() => findByProps("Heading").Heading)();
    const Markdown = /*#__PURE__*/ (() => find(m => m?.default?.displayName == "Markdown" && m?.default?.rules)?.default)();
    const ContextMenu =  findByProps("MenuItem").default;
    Object.entries(findByProps("MenuItem")).forEach(([key, contents]) => {
        if (!ContextMenu[key]) {
            ContextMenu[key] = contents;
        }
    });


    const Slider = /*#__PURE__*/ (() => findByProps("MarkerPositions").default)();

    /**
     * @param {string} name The name of the patch. For debugging.
     * @param {any} object The object that the function is in.
     * @param {string} functionName The name of the function to patch.
     * @param {string} type The type of patch to apply. `before`, `instead`, `after`.
     * @param {function} patchFunction The code to patch into the function.
     * @returns {object} {@link module:utils/patcher.patch~patchData}
     * @memberof module:patcher
     * @tutorial patching
     */ function patch(name, object, functionName, type, patchFunction) {
        const id = object.__ittai__ ?? randomString(25, Object.keys(patches));
        object.__ittai__ = object.__ittai__ ?? id;
        if (!patches[id])
            patches[id] = {};
        /**
         * @memberof module:patcher
         * @prop {string} name The name of the function being patched.
         * @prop {string} type The type of the patch.
         * @prop {function} patchFunction The original function.
         * @prop {function} unpatch The function to call to unpatch.
         */
        const patchData = {
            name,
            type,
            patchFunction,
            unpatch: function () {
                try {
                    const patchIndex = patches[id][functionName].patches.indexOf(this);
                    if (patchIndex === -1)
                        throw "Couldn't find the patch. This probably happened because the object was tampered with. Don't do that.";
                    // Delete patch.
                    patches[id][functionName].patches.splice(patchIndex, 1);
                    // Clean up the object if there are no patches left.
                    if (patches[id][functionName].patches.length === 0) {
                        // Restore original function.
                        object[functionName] = patches[id][functionName].original;
                        delete patches[id][functionName];
                    }
                    if (!Object.keys(patches[id]).length) {
                        delete patches[id];
                    }
                }
                catch (e) {
                    error(`Failed to unpatch ${name}.`, e);
                }
            },
        };
        if (!patches[id][functionName]) {
            patches[id][functionName] = {
                original: object[functionName],
                patches: [],
            };
            const props = { ...object[functionName] };
            object[functionName] = function (...args) {
                const functionData = patches[id][functionName];
                const befores = functionData.patches.filter((p) => p.type === "before");
                const insteads = functionData.patches.filter((p) => p.type === "instead");
                const afters = functionData.patches.filter((p) => p.type === "after");
                // Before patches.
                for (const before of befores) {
                    try {
                        const callback = before.patchFunction(args, this);
                        if (callback)
                            args = callback;
                    }
                    catch (e) {
                        error(`Error running before patch ${name}.`, e);
                    }
                }
                // Instead patches.
                let res = {};
                let ranOnce = false;
                if (insteads.length === 0) {
                    (res = functionData.original.call(this, ...args)), (ranOnce = true);
                }
                else {
                    // Bad, fix later.
                    for (const instead of insteads) {
                        // Do trash merge with Lodash.
                        try {
                            (res = globalThis._.merge(res, instead.patchFunction(args, this, functionData.original) ?? {})),
                                (ranOnce = true);
                        }
                        catch (e) {
                            error(`Error running instead patch ${name}.`, e);
                        }
                    }
                }
                if (!ranOnce) {
                    res = functionData.original.call(this, ...args);
                }
                // After patches.
                for (const after of afters) {
                    try {
                        const callback = after.patchFunction(args, res, this);
                        if (callback)
                            res = callback;
                    }
                    catch (e) {
                        error(`Error running after patch ${name}.`, e);
                    }
                }
                return res;
            };
            Object.assign(object[functionName], props);
            object[functionName].toString = () => patches[id][functionName].original.toString();
        }
        patches[id][functionName].patches.push(patchData);
        return patchData;
    }

    /**
     * @module patcher
     */
    /**
     * A list of the currently patched components.
     */
    let patches = [];

    findByProps("createBotMessage");
    findByProps("receiveMessage");
    const AvatarDefaults = findByProps("BOT_AVATARS");
    ({
        state: "SENT",
        author: addBotAuthor({
            avatar: { avatarId: "ittai", imageUrl: "https://cdn.discordapp.com/avatars/264062457448759296/1f9b1743cf625ca2d51ee517b5efd8a7.webp" },
            author: { username: "Ittai" }
        }),
        content: "Hello! By the way, you forgot to add a `\"content\"` attribute to the message!"
    });
    function addBotAuthor({ avatar, author }) {
        const avatarId = avatar?.avatarId ?? randomString(10);
        if (AvatarDefaults?.BOT_AVATARS && !AvatarDefaults.BOT_AVATARS[avatarId]) {
            AvatarDefaults.BOT_AVATARS[avatarId] = avatar.imageUrl;
        }
        return {
            avatar: avatarId,
            id: author?.authorId ?? randomString(10),
            bot: true,
            discriminator: author?.discriminator ?? "0000",
            username: author?.username ?? "BotUser"
        };
    }

    const CommandTypes = /*#__PURE__*/ Object.assign({}, findByProps("ApplicationCommandType"), findByProps("ApplicationCommandPermissionType"));
    const CommandsModule = /*#__PURE__*/ findByProps("BUILT_IN_COMMANDS");
    const ApplicationCommandDiscoveryApplicationIcon = /*#__PURE__*/ findByDisplayName("ApplicationCommandDiscoveryApplicationIcon");
    let iconPatch;
    function patchIcons() {
        if (!iconPatch) {
            iconPatch = after("IttaiIconCommandPatch", ApplicationCommandDiscoveryApplicationIcon, "default", (args, res, _this) => {
                const props = findInReactTree(res, (n) => n.src);
                const section = findInTree(args, (n) => n.icon);
                if (!props || !section || props.src.indexOf(section.icon) > 0)
                    return res;
                res.props.onClick = () => { };
                props.src = section.icon;
                return res;
            });
        }
    }
    let registeredCommands = [];
    /**
     *
     * @param {object} id
     */
    function registerCommand(command) {
        patchIcons();
        const currentIDs = CommandsModule.BUILT_IN_COMMANDS.map(({ id }) => id);
        if (!command.id ?? false)
            command.id = randomString(10, currentIDs);
        if (currentIDs.indexOf(command.id) > -1)
            command.id += randomString(10, currentIDs);
        command.applicationId ??= "-1";
        command.execute ??= (() => { });
        command.displayName ??= command.name;
        command.displayDescription ??= command.description;
        command.options.map((opts) => {
            opts.displayName ??= opts.name;
            opts.displayDescription ??= opts.description;
            return opts;
        });
        CommandsModule.BUILT_IN_COMMANDS.push(command);
        registeredCommands.push(command.id);
        return command.id;
    }
    function unregisterCommand(id) {
        CommandsModule.BUILT_IN_COMMANDS.splice(CommandsModule.BUILT_IN_COMMANDS.findIndex((command) => command.id === id), 1);
    }
    function unregisterAllCommands() {
        for (const command of registeredCommands) {
            unregisterCommand(command);
        }
    }

    var react = IttaiInternals.React;

    const classes = findByProps("title", "titleDefault", "dividerDefault");
    function FartSettings() {
      const [sliderValue, setSliderValue] = react.useState(get("volume", 0.5));
      return /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("label", {
        className: classes.title
      }, "fart loudness"), /* @__PURE__ */ react.createElement(Slider, {
        initialValue: (sliderValue || 0.5) * 100,
        onValueChange: (val) => {
          set("volume", val / 100);
          setSliderValue(val / 100);
        },
        minValue: 0,
        maxValue: 100
      }));
    }

    const THE_FART = "https://raw.githubusercontent.com/ItzOnlyAnimal/AliuPlugins/main/fart.mp3";
    const sound = { fart: new Audio(THE_FART) };
    const msgs = findByProps("sendMessage", "editMessage");
    const fartCmd = {
      name: "fart",
      description: "do the farting desktop edition",
      type: CommandTypes.ApplicationCommandType.CHAT,
      options: [
        {
          type: CommandTypes.ApplicationCommandOptionType.USER,
          name: "user",
          description: "the user",
          required: false
        }
      ],
      execute(opts, ctx) {
        sound.fart.volume = get("volume", 0.5) || 0.5;
        sound.fart.play();
        msgs.sendMessage(ctx.channel.id, {
          content: opts[0] ? `<@${opts[0].value}> fart` : "fart"
        });
      }
    };
    class Fart extends Plugin {
      start() {
        this.setSettingsPanel(FartSettings);
        registerCommand(fartCmd);
      }
      stop() {
        unregisterAllCommands();
      }
    }

    let IttaiPlugin = class IttaiPlugin extends (() => {
        // switch ("betterdiscord") {
        //     case "powercordv2":
        //         return PCv2Plugin
        //     case "betterdiscord":
        //         return BDPlugin
        //     case "goosemod":
        //         return GMPlugin
        //     default:
        //         return class Plugin {};
        // }
        return BDPlugin;
    })() {
        constructor(...args) {
            super(...args);
            this.hasSettingsPanel = false;
            this.cachedCss = [];
            setInstance(this.__ittaiInternals);
            this.instance = new Fart();
            this.friendlyName = this.instance.friendlyName;
            this.instance.__ittaiInternalPlugin = this;
            // globalThis["ittai" + this.friendlyName.toLowerCase().replace(/ /g, "")] = ittai;
            // document.querySelectorAll(`style[ittai][plugin="${manifest.name.replace(/ /g, "")}"]`)?.forEach((e: HTMLStyleElement) => {
            //     this.cachedCss.push(e.innerText);
            //     e.remove();
            // });
        }
        start() {
            try {
                // this.cachedCss.forEach((e, k) => {
                //     const elem = Object.assign(document.createElement("style"), {
                //         innerText: e
                //     })
                //     elem.setAttribute("ittai", "true");
                //     elem.setAttribute("plugin", manifest.name.replace(/ /g, ""));
                //     document.head.appendChild(elem);
                //     delete this.cachedCss[k];
                // })
                if ("false" == "true" && Boolean(changelog)) ;
                return this.instance.start();
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        }
        stop() {
            try {
                const res = this.instance.stop();
                unpatchAll();
                if (this.hasSettingsPanel)
                    this.removeSettingsPanel();
                // document.querySelectorAll(`style[ittai][plugin="${manifest.name.replace(/ /g, "")}"]`)?.forEach(e => {
                //     this.cachedCss.push(e.innerText);
                //     e.remove();
                // });
                return res;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        }
        setSettingsPanel(component) {
            this.hasSettingsPanel = true;
            this.__ittaiInternals.setSettingsPanel(component);
        }
        removeSettingsPanel() {
            if (this.hasSettingsPanel) {
                this.hasSettingsPanel = false;
                this.__ittaiInternals.removeSettingsPanel();
            }
        }
    };

    const renderChangelogContent = (content) => {
        return React.createElement(React.Fragment, null, Object.entries(content).map(([title, { type, items }]) => React.createElement("div", { className: ChangelogModal.content },
            React.createElement("h1", { className: joinClasses(Changelog[type], Changelog.marginTop) }, title),
            React.createElement("ul", null, items.map(item => React.createElement("li", null,
                React.createElement(Markdown, null, item)))))));
    };
    const openChangelogModal = (changelog = settingsChangelog) => {
        const { changelog: settingsChangelog, manifest } = config;
        ModalActions.openModal((props) => React.createElement(Modal.ModalRoot, { ...props, size: Modal.ModalSize.SMALL, className: ChangelogModal.modal },
            React.createElement(Modal.ModalHeader, { separator: false },
                React.createElement(Flex, null,
                    React.createElement(Flex.Child, { grow: 1, shrink: 1 },
                        React.createElement(Heading, { variant: "heading-lg/medium" },
                            manifest.name,
                            " - ",
                            manifest.version),
                        changelog.date && React.createElement(Text, { className: Changelog.date, size: Text.Sizes.SIZE_12 }, changelog.date)),
                    React.createElement(Modal.ModalCloseButton, { onClick: props.onClose }))),
            React.createElement(Modal.ModalContent, null,
                changelog.image && React.createElement("img", { className: Changelog.video, src: changelog.image, width: "451" }),
                renderChangelogContent(changelog.contents))));
    };
    const hasSeenChangelog = () => get(`__ittai_changelog_${manifest.version}`);
    const setSeenChangelog = (set$1) => set(`__ittai_changelog_${manifest.version}`, set$1);

    var index = /*#__PURE__*/Object.freeze({
        __proto__: null,
        renderChangelogContent: renderChangelogContent,
        openChangelogModal: openChangelogModal,
        hasSeenChangelog: hasSeenChangelog,
        setSeenChangelog: setSeenChangelog
    });

    return IttaiPlugin;

    })();
    if (typeof module !== "undefined") module.exports = ittaiPluginExport;
    return ittaiPluginExport;

})();
