import { useState } from 'react';

function FilterRadio(props) {
    //const [selectedValue, setSelectedValue] = useState(props.default);

    const handleChange = (event) => {
        // setSelectedValue(event.target.value);
        if (props.onChange) {
            props.onChange(event.target.value);
        }
    };
    //rewrite this section using data.map to save space and time
    const data = [
        { value: 'weight', label: 'Weight(kg)' }, //does value need to have the exact syntax of the csv?
        { value: 'height', label: 'Height(m)' },
        { value: 'Max_BPM', label: 'Max BPM' },
        { value: 'Avg_BPM', label: 'Average BPM' },
        { value: 'Resting_BPM', label: 'Resting BPM' },
        { value: 'Session_Duration', label: 'Session Duration(hours)' },
        { value: 'Calories_Burned', label: 'Calories Burned' },
        { value: 'Fat_Percentage', label: 'Fat Percentage' },
        { value: 'BMI', label: 'BMI' },
    ];
    return (
        <form >
            {data.map((item) => (
                <label key={item.value}>
                    <input
                        type="radio"
                        name={props.name} //I need to pick a unique name for each group of radio buttons so that they are grouped together correctly.
                        value={item.value}
                        checked={props.default === item.value}
                        onChange={handleChange}
                    /> {item.label}
                </label>
            ))}
        </form>
    );
}
export default FilterRadio;