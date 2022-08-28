import * as React from "react";
import { useState } from "react";
import { Slider } from "ittai/components";
import { findByProps } from "ittai/webpack";
import * as settings from "ittai/settings"

const classes = findByProps("title", "titleDefault", "dividerDefault");

export default function FartSettings(): JSX.Element {
    const [sliderValue, setSliderValue] = useState(settings.get("volume", 0.5))
    return (<>
        <label className={classes.title}>fart loudness</label>
        <Slider initialValue={(sliderValue || 0.5) * 100} onValueChange={(val) => {
            settings.set("volume", (val / 100));
            setSliderValue(val / 100);
        }} minValue={0} maxValue={100} />
    </>)
}