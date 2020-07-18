import React, { useState, useEffect } from "react";
import {
    Dropdown,
    SpinButton,
    Label,
    IDropdownOption,
    DatePicker,
    Checkbox,
} from "@fluentui/react";
import { useId } from "@uifabric/react-hooks";
import RRule from "rrule";

export default (props: any) => {
    const dayObj = {mon:RRule.MO,tue:RRule.TU,wed:RRule.WE,thu:RRule.TH,fri:RRule.FR,sat:RRule.SA,sun:RRule.SU}
    const { repeatValue, setRepeatValue, repeatOptions,setOutput } = props;
    const everyId = useId("everyId");
    const [end, setEnd] = useState<IDropdownOption>({
        key: "Never",
        text: "Never",
    });
    const [count, setCount] = useState("1");
    const [date, setDate] = useState(new Date());
    const [interval, setInterval] = useState("1");
    const [dayMap, setDayMap] = useState({
        mon: true,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
    });
    const [days,setDays] = useState([RRule.MO]);
    const incrementCount = (value: string) => {
        if (Number(value) + 1 > 999) return "999";
        else {
            setCount(`${Number(value) + 1}`);
            return `${Number(value) + 1}`;
        }
    };
    const decrementCount = (value: string) => {
        if (Number(value) - 1 < 1) return "1";
        else {
            setCount(`${Number(value) - 1}`);
            return `${Number(value) - 1}`;
        }
    };
    const incrementInterval = (value: string) => {
        if (Number(value) + 1 > 999) return "999";
        else {
            setInterval(`${Number(value) + 1}`);
            return `${Number(value) + 1}`;
        }
    };
    const decrementInterval = (value: string) => {
        if (Number(value) - 1 < 1) return "1";
        else {
            setInterval(`${Number(value) - 1}`);
            return `${Number(value) - 1}`;
        }
    };

    useEffect(()=>{
        const days = [];
        for(const day in dayMap){
            //@ts-ignore
            if(dayMap[day])
            //@ts-ignore
                days.push(dayObj[day])
        }
        setDays([...days]);
    },[dayMap])

    useEffect(()=>{
        if(end.key === "Never"){
            setOutput(new RRule({
                freq:RRule.WEEKLY,
                interval:Number(interval),
                byweekday:days
            }).toString())
        }else if(end.key === "Count"){
            setOutput(new RRule({
                freq:RRule.WEEKLY,
                interval:Number(interval),
                count:Number(count),
                byweekday:days
            }).toString())
        }else{
            setOutput(new RRule({
                freq:RRule.WEEKLY,
                interval:Number(interval),
                until:date,
                byweekday:days
            }).toString())
        }
    },[end,date,count,interval,days])

    let component = <div />;

    if (end.key === "Count")
        component = (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                }}
            >
                <SpinButton
                    id={everyId}
                    defaultValue={count + ""}
                    onIncrement={incrementCount}
                    onDecrement={decrementCount}
                    min={1}
                    max={999}
                    step={1}
                    style={{ width: "150px" }}
                />
            </div>
        );
    else if (end.key === "Until")
        component = (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                }}
            >
                <DatePicker
                    value={date}
                    onSelectDate={(date) => setDate(date as Date)}
                    style={{ width: "150px" }}
                />
            </div>
        );

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
                <Dropdown
                    label="Repeat"
                    selectedKey={repeatValue.key}
                    onChange={(_, option) => setRepeatValue(option)}
                    options={repeatOptions}
                    style={{ width: "300px", marginRight: "20px" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label htmlFor={everyId}>Repeat Every</Label>
                    <SpinButton
                        id={everyId}
                        defaultValue={interval + ""}
                        min={1}
                        max={999}
                        step={1}
                        style={{ width: "300px" }}
                        onIncrement={incrementInterval}
                        onDecrement={decrementInterval}
                    />
                </div>
                <div style={{ marginTop: "35px", marginLeft: "5px" }}>
                    Week(s)
                </div>
            </div>
            <div style={{ display: "flex" }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                    }}
                >
                    <Label>Repeat On</Label>
                    <div
                        style={{
                            display: "flex",
                            width: "300px",
                            justifyContent: "space-evenly",
                            marginRight: "20px",
                        }}
                    >
                        <Checkbox
                            label="S"
                            checked={dayMap.sun}
                            onChange={(_, checked) =>
                                setDayMap((map) => ({
                                    ...map,
                                    sun: checked as boolean,
                                }))
                            }
                        />
                        <Checkbox
                            label="M"
                            checked={dayMap.mon}
                            onChange={(_, checked) =>
                                setDayMap((map) => ({
                                    ...map,
                                    mon: checked as boolean,
                                }))
                            }
                        />
                        <Checkbox
                            label="T"
                            checked={dayMap.tue}
                            onChange={(_, checked) =>
                                setDayMap((map) => ({
                                    ...map,
                                    tue: checked as boolean,
                                }))
                            }
                        />
                        <Checkbox
                            label="W"
                            checked={dayMap.wed}
                            onChange={(_, checked) =>
                                setDayMap((map) => ({
                                    ...map,
                                    wed: checked as boolean,
                                }))
                            }
                        />
                        <Checkbox
                            label="T"
                            checked={dayMap.thu}
                            onChange={(_, checked) =>
                                setDayMap((map) => ({
                                    ...map,
                                    thu: checked as boolean,
                                }))
                            }
                        />
                        <Checkbox
                            label="F"
                            checked={dayMap.fri}
                            onChange={(_, checked) =>
                                setDayMap((map) => ({
                                    ...map,
                                    fri: checked as boolean,
                                }))
                            }
                        />
                        <Checkbox
                            label="S"
                            checked={dayMap.sat}
                            onChange={(_, checked) =>
                                setDayMap((map) => ({
                                    ...map,
                                    sat: checked as boolean,
                                }))
                            }
                        />
                    </div>
                </div>
                <Dropdown
                    label="End"
                    selectedKey={end.key}
                    onChange={(_, option) => setEnd(option as IDropdownOption)}
                    options={[
                        { key: "Never", text: "Never" },
                        { key: "Until", text: "Until" },
                        { key: "Count", text: "Count" },
                    ]}
                    style={{ width: "130px", marginRight: "20px" }}
                />
                {component}
            </div>
        </div>
    );
};
