import React, {useState} from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useWindowSize } from "../../hooks/useWindowSize";
import { AutoComplete, Input } from 'antd';
import { Notepad } from '../../interfaces';
import styled from "styled-components";

const AutoCompleteWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    
    h3 {
        color: #fff;
        margin: 0;
    }
    
    input {
        background: #424242;
        color: #fff;
    }
    
    .ant-select-selection-search-input,
    .ant-input-affix-wrapper-lg .ant-input-search-icon::before {
        border-color: #747474;
    }
    
    .anticon-search {
        opacity: 0.5;
        
        &:hover {
            opacity: 1;
            color: #fff;
        }
    }
`;

const createOption = (notepad : Notepad) => {
    return {
        label: `#${notepad.name}`,
        value: notepad.ID
    };
};

const NotepadSearch : React.FC<RouteComponentProps> = ({ history }) => {
    const [options, setOptions] = useState<{label : string, value : number | string}[]>([]);
    const [value, setValue] = useState<string>('');
    const [width] = useWindowSize();
    const searchStyle = width <= 576 ? {
        width: '250px'
    } : {
        width: '400px'
    };

    const onSearch = (searchText: string) => {
        fetch(`/api/notepads/search/${searchText.toLowerCase()}`)
            .then(res => res.json())
            .then(res => {
                if (res.length) {
                    return res.map((notepad : Notepad) => createOption(notepad));
                } else {
                    return [{ label: 'None found', value: ''}];
                }
            })
            .then(options => setOptions(options))
            .catch(() => setOptions([{ label: 'None found', value: ''}]))
    };

    const onSelect = (value : number | string, option : any) => {
        if (value === '') {
            return;
        } else {
            history.push(`/Notepads/${value}`);
            setValue(option.label.slice(1));
        }
    }

    return (
        <AutoCompleteWrapper>
            <AutoComplete style={searchStyle} options={options}
                          value={value}
                          onChange={(data : string) => setValue(data)}
                          onSearch={onSearch}
                          onSelect={onSelect}>
                <Input.Search size="large" placeholder="Notepad Search" />
            </AutoComplete>
        </AutoCompleteWrapper>
    )
};

export default withRouter(NotepadSearch);