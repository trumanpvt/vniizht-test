import React, {useState} from 'react';
import './TrainsTable.css';
import {Train, TrainCharacteristics} from "./TrainsTable";
import {useAppDispatch} from "../../app/hooks";
import {changeTrainData} from "./tableSlice";

export interface TrainInfo {
    train: Train;
    index: number;
}

const TrainInfo: React.FC<TrainInfo> = ({train, index}) => {
    const [isNotValid, setIsNotValid] = useState(false);

    const dispatch = useAppDispatch();

    const showSpeeds = () => {
        let sorted = [...train.characteristics];

        sorted = sorted.sort((a, b) => {
            if (a.speed > b.speed) return 1
            if (a.speed < b.speed) return -1
            return 0
        });

        sorted.forEach(item => {
            console.log(item.speed);
        });
    }

    const validateValues = (name: string, value: string) => {
        const testValue = Number(value);

        if (name === "engineAmperage") return Math.sign(testValue) >= 0;

        if (name === "force") return parseFloat(value) > 0

        if (name === "speed") return Math.sign(testValue) > 0;
    }

    const onChange = (value: string, name: string, indexOfChar: number) => {

        if (!validateValues(name, value)) return setIsNotValid(true);

        setIsNotValid(false);

        let newTrain = {...train};

        const testCharArr = newTrain.characteristics.map((item, index) => {
            if (indexOfChar === index) {
                return {
                    ...item,
                    [name]: value
                }
            }

            return item;
        })

        newTrain["characteristics"] = testCharArr;

        dispatch(changeTrainData({train: newTrain, index}))
    }

    const renderTrainCharacteristics = (characteristics: TrainCharacteristics, indexOfInside: number) => {
        return (
            <tr key={train.name + indexOfInside} className={"TableRow"}>
                <td className={"TableData"}>
                    <input
                        className={`TableInput`}
                        type="number"
                        required
                        pattern="^[0-9]"
                        onChange={(e) => onChange(e.target.value, "engineAmperage", indexOfInside)}
                        defaultValue={characteristics.engineAmperage}/>
                </td>
                <td className={"TableData"}>
                    <input
                        className={`TableInput`}
                        type="number"
                        required
                        pattern="/(\d+)?\.\d+(,?)/"
                        step={"0.000001"}
                        onChange={(e) => onChange(e.target.value, "force", indexOfInside)}
                        defaultValue={characteristics.force}/>
                </td>
                <td className={"TableData"}>
                    <input
                        className={`TableInput`}
                        type="number"
                        required
                        pattern="/^\d*[1-9]\d*$/"
                        onChange={(e) => onChange(e.target.value, "speed", indexOfInside)}
                        defaultValue={characteristics.speed}/>
                </td>
            </tr>
        );
    }

    return (
        <div className={"TrainsTableContainer"}>
            <div className={"TrainsTableHeader"}>Характеристики Поезда</div>
            <div className={"TrainsTableHeader"}>{train.name}</div>
            <table className={"TrainsLeftTable"}>
                <tbody>
                <tr className={"TableHead"}>
                    <th className={"TableHeader"}>Ток двигателя</th>
                    <th className={"TableHeader"}>Сила тяги</th>
                    <th className={"TableHeader"}>Скорость</th>
                </tr>
                {train && train.characteristics.map(renderTrainCharacteristics)}
                </tbody>
            </table>
            <button className={"TableButton"} disabled={isNotValid} onClick={showSpeeds}>Отправить данные</button>
        </div>
    );
}

export default TrainInfo;
