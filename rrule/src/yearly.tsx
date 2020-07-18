import React, { useState, useEffect } from "react";
import {
    Dropdown,
    SpinButton,
    Label,
    IDropdownOption,
    DatePicker,
    ChoiceGroup,
} from "@fluentui/react";
import { useId } from "@uifabric/react-hooks";
import RRule from "rrule";

export default (props: any) => {
    const { repeatValue, setRepeatValue, repeatOptions, setOutput } = props;
    const everyId = useId("everyId");
    const [end, setEnd] = useState<IDropdownOption>({
        key: "Never",
        text: "Never",
    });
    const [count, setCount] = useState("1");
    const [date, setDate] = useState(new Date());
    const [interval, setInterval] = useState("1");
    const [days, setDays] = useState("1");
    const [choice, setChoice] = useState("Day");
    const [day, setDay] = useState<IDropdownOption>({
        key: "Monday",
        text: "Monday",
        data: RRule.MO,
    });
    const [pos, setPos] = useState<IDropdownOption>({
        key: "First",
        text: "First",
        data: 1,
    });
    const [month, setMonth] = useState<IDropdownOption>({
        key: "January",
        text: "January",
        data: 1,
    });
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
    const incrementDays = (value: string) => {
        if (Number(value) + 1 > 31) return "31";
        else {
            setDays(`${Number(value) + 1}`);
            return `${Number(value) + 1}`;
        }
    };
    const decrementDays = (value: string) => {
        if (Number(value) - 1 < 1) return "1";
        else {
            setDays(`${Number(value) - 1}`);
            return `${Number(value) - 1}`;
        }
    };

    let component = <div />;

    useEffect(() => {
        setChoice("Pos");
    }, [pos, day]);

    useEffect(() => {
        setChoice("Day");
    }, [days]);

    useEffect(() => {
        if (choice === "Day") {
            if (end.key === "Never") {
                setOutput(
                    new RRule({
                        freq: RRule.YEARLY,
                        interval: Number(interval),
                        bymonthday: Number(days),
                        bymonth:month.data
                    }).toString()
                );
            } else if (end.key === "Count") {
                setOutput(
                    new RRule({
                        freq: RRule.YEARLY,
                        interval: Number(interval),
                        count: Number(count),
                        bymonthday: Number(days),
                        bymonth:month.data
                    }).toString()
                );
            } else {
                setOutput(
                    new RRule({
                        freq: RRule.YEARLY,
                        interval: Number(interval),
                        until: date,
                        bymonthday: Number(days),
                        bymonth:month.data
                    }).toString()
                );
            }
        } else {
            if (end.key === "Never") {
                setOutput(
                    new RRule({
                        freq: RRule.YEARLY,
                        interval: Number(interval),
                        bysetpos: pos.data,
                        byweekday: day.data,
                        bymonth:month.data
                    }).toString()
                );
            } else if (end.key === "Count") {
                setOutput(
                    new RRule({
                        freq: RRule.YEARLY,
                        interval: Number(interval),
                        count: Number(count),
                        bysetpos: pos.data,
                        byweekday: day.data,
                        bymonth:month.data
                    }).toString()
                );
            } else {
                setOutput(
                    new RRule({
                        freq: RRule.YEARLY,
                        interval: Number(interval),
                        until: date,
                        bysetpos: pos.data,
                        byweekday: day.data,
                        bymonth:month.data
                    }).toString()
                );
            }
        }
    }, [end, date, count, interval, days, pos, day, choice,month]);

    if (end.key === "Count")
        component = (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "29px",
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
                    marginTop: "29px",
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
                        onIncrement={incrementInterval}
                        onDecrement={decrementInterval}
                        style={{ width: "300px" }}
                    />
                </div>
                <div style={{ marginTop: "35px", marginLeft: "5px" }}>
                    Day(s)
                </div>
            </div>
            <div style={{ display: "flex" }}>
                <div
                    style={{
                        width: "300px",
                        marginRight: "20px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Label>Repeat On</Label>
                    <Dropdown
                        selectedKey={month.key}
                        onChange={(_, option) =>
                            setMonth(option as IDropdownOption)
                        }
                        options={[
                            { key: "January", text: "January", data: 1 },
                            { key: "February", text: "February", data: 2 },
                            { key: "March", text: "March", data: 3 },
                            { key: "April", text: "April", data: 4 },
                            { key: "May", text: "May", data: 5 },
                            { key: "June", text: "June", data: 6 },
                            { key: "July", text: "July", data: 7 },
                            { key: "August", text: "August", data: 8 },
                            { key: "September", text: "September", data: 9 },
                            { key: "October", text: "October", data: 10 },
                            { key: "November", text: "November", data: 11 },
                            { key: "December", text: "December", data: 12 },
                        ]}
                        style={{
                            width: "300px",
                            marginRight: "20px",
                            marginBottom: "10px",
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        <ChoiceGroup
                            selectedKey={choice}
                            options={[
                                { key: "Day", text: "Day" },
                                { key: "Pos", text: "Pos" },
                            ]}
                            onChange={(_, option) =>
                                setChoice(option?.key as string)
                            }
                            style={{ marginRight: "20px" }}
                        />
                        <div
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <SpinButton
                                id={everyId}
                                defaultValue={days + ""}
                                onIncrement={incrementDays}
                                onDecrement={decrementDays}
                                min={1}
                                max={31}
                                step={1}
                                style={{ width: "230px" }}
                            />
                            <div style={{ display: "flex", marginTop: "10px" }}>
                                <Dropdown
                                    selectedKey={pos.key}
                                    onChange={(_, option) =>
                                        setPos(option as IDropdownOption)
                                    }
                                    options={[
                                        {
                                            key: "First",
                                            text: "First",
                                            data: 1,
                                        },
                                        {
                                            key: "Second",
                                            text: "Second",
                                            data: 2,
                                        },
                                        {
                                            key: "Third",
                                            text: "Third",
                                            data: 3,
                                        },
                                        {
                                            key: "Fourth",
                                            text: "Fourth",
                                            data: 4,
                                        },
                                        { key: "Last", text: "Last", data: -1 },
                                    ]}
                                    style={{
                                        width: "110px",
                                        marginRight: "10px",
                                    }}
                                />
                                <Dropdown
                                    selectedKey={day.key}
                                    onChange={(_, option) =>
                                        setDay(option as IDropdownOption)
                                    }
                                    options={[
                                        {
                                            key: "Monday",
                                            text: "Monday",
                                            data: RRule.MO,
                                        },
                                        {
                                            key: "Tuesday",
                                            text: "Tuesday",
                                            data: RRule.TU,
                                        },
                                        {
                                            key: "Wednesday",
                                            text: "Wednesday",
                                            data: RRule.WE,
                                        },
                                        {
                                            key: "Thursday",
                                            text: "Thursday",
                                            data: RRule.TH,
                                        },
                                        {
                                            key: "Friday",
                                            text: "Friday",
                                            data: RRule.FR,
                                        },
                                        {
                                            key: "Saturday",
                                            text: "Saturday",
                                            data: RRule.SA,
                                        },
                                        {
                                            key: "Sunday",
                                            text: "Sunday",
                                            data: RRule.SU,
                                        },
                                    ]}
                                    style={{ width: "110px" }}
                                />
                            </div>
                        </div>
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
