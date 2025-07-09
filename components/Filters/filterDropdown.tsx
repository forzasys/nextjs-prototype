import React, { useState } from 'react'
import { useUpdateSearchParam } from '@/utilities/ClientSideUtils';
import classNames from 'classnames';
import { IoMdArrowDropdown } from "react-icons/io";
import './filters.css';

type OptionType = {
    id: number | string
    value: string
}

interface FilterDropdownProps {
    title: string
    options: OptionType[]
    value?: string | null
    defaultValue?: string | null
    hasAll?: boolean
}

export function FilterDropdown({title, options, value, defaultValue, hasAll}: FilterDropdownProps) {

    const updateParam = useUpdateSearchParam();

    const [isOpen, setIsOpen] = useState(false)

    let filterValue = value 

    if (!value) {
        if (hasAll) filterValue = "All"
        else if (defaultValue) filterValue = defaultValue
    }

    const onSelect = (id: string | number | undefined) => {
        updateParam(title, id)
        setIsOpen(false)
    }

    return (
        <div className="filter-dropdown narrow">
            <div className="filter-title">{title}</div>
            <div className="filter-dropdown-box">
                <div onClick={() => setIsOpen(!isOpen)} className="filter-dropdown-header">
                    <div>{filterValue}</div>
                    <IoMdArrowDropdown className="filter-dropdown-icon"/>
                </div>
                <div className={classNames("filter-dropdown-options", {"open": isOpen})}>
                    {hasAll && (
                        <div onClick={() => onSelect(undefined)} className="filter-dropdown-option no-border">All</div>
                    )}
                    {options.map((option: OptionType) => (
                        <div 
                            key={option.id} 
                            onClick={() => onSelect(option.id)}
                            className="filter-dropdown-option"
                            >
                            {option.value}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

type PlayerOptionType = {
    id: number
    value: {
        name: string
        shirt_number: number
    }
}

interface PlayerFilterDropdownProps {
    title: string
    options: PlayerOptionType[]
    value: React.ReactNode | string | null
    hasAll?: boolean
}

export function PlayerFilterDropdown({title, options, value, hasAll}: PlayerFilterDropdownProps) {

    const updateParam = useUpdateSearchParam();

    const [isOpen, setIsOpen] = useState(false)
    
    let filterValue: React.ReactNode = hasAll ? "All" : undefined

    if (value) {
        const selectedPlayerId = Number(value)
        const selectedPlayerValue = options.find((option: PlayerOptionType) => option.id === selectedPlayerId)?.value
        filterValue = (
            <div>
                {selectedPlayerValue?.shirt_number} {selectedPlayerValue?.name}
            </div>
        )
    }

    const onSelect = (id: number | undefined) => {
        updateParam(title, id)
        setIsOpen(false)
    }

    return (
        <div className="filter-dropdown wide">
            <div className="filter-title">{title}</div>
            <div className="filter-dropdown-box">
                <div onClick={() => setIsOpen(!isOpen)} className="filter-dropdown-header">
                    <div>{filterValue}</div>
                    <IoMdArrowDropdown className="filter-dropdown-icon"/>
                </div>
                <div className={classNames("filter-dropdown-options", {"open": isOpen})}>
                    {hasAll && (
                        <div onClick={() => onSelect(undefined)} className="filter-dropdown-option no-border">All</div>
                    )}
                    {options.map((option: PlayerOptionType) => (
                        <div 
                            key={option.id} 
                            onClick={() => onSelect(option.id)}
                            className="filter-dropdown-option"
                            >
                            {option.value.shirt_number} {option.value.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}       