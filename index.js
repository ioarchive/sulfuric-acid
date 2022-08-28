(function () {
    'use strict';

    // Made with Ittai - https://git.catvibers.me/ittai/ittai
    let IttaiInternals = {};
    let ittaiPluginExport=(()=>{

    var manifest$1 = {
    	name: "Example Plugin",
    	version: "1.0.0",
    	license: "MIT",
    	source: "https://bruh/moment",
    	updateUrl: "https://bruh/moment",
    	main: "index.js",
    	author: "AA",
    	description: "bruh"
    };
    var ittaiconfig = {
    	manifest: manifest$1
    };

    var config = /*#__PURE__*/Object.freeze({
        __proto__: null,
        manifest: manifest$1,
        'default': ittaiconfig
    });

    let clientWebpack = (() => {
        return require("powercord/webpack");
    })();
    function find(filter) {
        {
            let isDefault = false;
            const mod = clientWebpack.getModule(x => x?.default && filter(x.default) && (isDefault = true), false) || clientWebpack.getModule(filter, false);
            return isDefault ? mod.default : mod;
        }
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

    let Plugin$1;
    {
        Plugin$1 = class Plugin extends require("powercord").entities.Plugin {
            constructor() {
                super(...arguments);
                this.__ittaiInternals = {
                    getAllSettings: () => {
                        let obj = {};
                        const keys = this.settings.getKeys();
                        keys.forEach(k => {
                            obj[k] = this.settings.get(k);
                        });
                        return obj;
                    },
                    getSetting: (key, defaultValue) => {
                        return this.settings.get(key, defaultValue);
                    },
                    setSettings: (newSettings) => {
                        if (typeof newSettings !== "object")
                            return;
                        Object.keys(newSettings).forEach(k => this.settings.set(k, newSettings[k]));
                    },
                    setSetting: (key, value) => {
                        this.settings.set(key, value);
                    },
                    removeSetting: (key) => {
                        this.settings.delete(key);
                    },
                    resetSettings: () => {
                        const keys = this.settings.getKeys();
                        keys.forEach(k => {
                            this.settings.delete(k);
                        });
                    },
                    setSettingsPanel: (component) => {
                        // if (typeof component === "function")
                        // component = React.createElement(component);
                        powercord.api.settings.registerSettings(this.entityID, {
                            category: this.entityID,
                            label: this.friendlyName,
                            render: component
                        });
                    },
                    removeSettingsPanel: () => {
                        powercord.api.settings.unregisterSettings(this.entityID);
                    }
                };
            }
            startPlugin() {
                return this.start();
            }
            pluginWillUnload() {
                return this.stop();
            }
        };
    }
    var PCv2Plugin = Plugin$1;

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

    var react = IttaiInternals.React;

    const Changelog = /*#__PURE__*/ findByProps("lead", "socialLink");
    const ChangelogModal = /*#__PURE__*/ findByProps("maxModalWidth", "content"); // i assume its related to the changelog modal

    /**
     * @module components
     */
    // Wrapper for Switch component to fix the switch box not being updatable. Check https://github.com/BetterDiscordBuilder/bdbuilder/blob/master/common/hooks/createUpdateWrapper.js
    const makeUpdateWrapper = (Component, checkPropName = "value", type = "switch") => {
        const typeSwitch = (v) => {
            switch (type) {
                case "switch": {
                    return v;
                }
                case "radio": {
                    return v.value;
                }
                default: {
                    return v;
                }
            }
        };
        return (props) => {
            const [value, setValue] = React.useState(props[checkPropName]);
            return React.createElement(Component, { ...{
                    ...props,
                    [checkPropName]: value,
                    onChange: (...args) => {
                        const value = args[0];
                        if (typeof props.onChange === "function")
                            props.onChange(value);
                        setValue(typeSwitch(value));
                    }
                } });
        };
    };
    const Spinner = /*#__PURE__*/ findByDisplayName("Spinner");
    const Text = /*#__PURE__*/ findByDisplayName("LegacyText");
    const Flex = /*#__PURE__*/ findByDisplayName("Flex");
    const Modal = /*#__PURE__*/ findByProps("ModalRoot");
    const Heading = /*#__PURE__*/ (() => findByProps("Heading").Heading)();
    const OriginalSwitch = /*#__PURE__*/ findByDisplayName("Switch");
    const Switch = makeUpdateWrapper(OriginalSwitch, "checked");
    const Markdown = /*#__PURE__*/ (() => find(m => m?.default?.displayName == "Markdown" && m?.default?.rules)?.default)();
    const ContextMenu =  findByProps("MenuItem").default;
    Object.entries(findByProps("MenuItem")).forEach(([key, contents]) => {
        if (!ContextMenu[key]) {
            ContextMenu[key] = contents;
        }
    });

    function ExampleSettingsPage() {
      const [switchValue, setSwitchValue] = react.useState(get("funnySetting", false));
      return /* @__PURE__ */ react.createElement(react.Fragment, null, "Hello!", /* @__PURE__ */ react.createElement(Spinner, null), /* @__PURE__ */ react.createElement(Switch, {
        checked: switchValue,
        onChange: (val) => {
          set("funnySetting", val);
          setSwitchValue(val);
          console.log("funnySetting is now", val);
        }
      }));
    }

    class ExamplePlugin extends Plugin {
      start() {
        this.setSettingsPanel(() => react.createElement(ExampleSettingsPage));
        console.log("hello from plugin!");
        console.log(this);
      }
      stop() {
        console.log("goodbye from plugin!");
      }
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

    var joinClasses = (...classes) => classes.filter(s => typeof s === 'string').join(" ");

    /**
     * @module patcher
     */
    /**
     * A list of the currently patched components.
     */
    let patches = [];

    let IttaiPlugin = class IttaiPlugin extends (() => {
        // switch ("powercordv2") {
        //     case "powercordv2":
        //         return PCv2Plugin
        //     case "betterdiscord":
        //         return BDPlugin
        //     case "goosemod":
        //         return GMPlugin
        //     default:
        //         return class Plugin {};
        // }
        return PCv2Plugin;
    })() {
        constructor(...args) {
            super(...args);
            this.hasSettingsPanel = false;
            this.cachedCss = [];
            setInstance(this.__ittaiInternals);
            this.instance = new ExamplePlugin();
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
                if ("false" == "true" && Boolean(undefined)) ;
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
