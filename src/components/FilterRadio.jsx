import { useState } from 'react';

function FilterRadio(props) {
    const [selectedValue, setSelectedValue] = useState(props.default);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    //rewrite this section using data.map to save space and time
    return (
        <form >
            <label>
                <input
                    type="radio"
                    name={props.name} //I need to pick a unique name for each group of radio buttons so that they are grouped together correctly.
                    value="weight"
                    checked={selectedValue === 'weight'}
                    onChange={handleChange}
                /> Weight(kg)
            </label>
            <br />
            <label>
                <input
                    type="radio"
                    name={props.name}
                    value="height"
                    checked={selectedValue === 'height'}
                    onChange={handleChange}
                /> Height(m)
            </label>
            <br />
            <label>
                <input
                    type="radio"
                    name={props.name}
                    value="Max_BPM"
                    checked={selectedValue === 'Max_BPM'}
                    onChange={handleChange}
                /> Max BPM
            </label>
            <br />
        </form>
    );
}
export default FilterRadio;