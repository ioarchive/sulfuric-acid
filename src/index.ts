import { Plugin } from "ittai/entities";
import * as React from "react";
import ExampleSettingsPage from "./components/Settings";
export default class ExamplePlugin extends Plugin {
    start() {
        this.setSettingsPanel(() => React.createElement(ExampleSettingsPage));
        console.log("hello from plugin!");
        console.log(this);
    }

    stop() {
        console.log("goodbye from plugin!");
    }
}