import React, { useState } from 'react'
import { useUpdateSearchParam } from '@/utilities/ClientSideUtils';
import classNames from 'classnames';
import './filters.css';
import { IoMdArrowDropdown } from "react-icons/io";

type OptionType = {
    id: number | string
    value: string
}

interface FilterDropdownProps {
    title: string
    options: OptionType[]
    value?: string | null
    hasAll?: boolean
}

export function FilterDropdown({title, options, value, hasAll}: FilterDropdownProps) {

    const updateParam = useUpdateSearchParam();

    const [isOpen, setIsOpen] = useState(false)

    let filterValue = value 

    if (!value) {
        filterValue = hasAll ? "All" : undefined
    }

    const onSelect = (id: string | number | undefined) => {
        updateParam(title, id)
        setIsOpen(false)
    }

    return (
        <div className="filter-dropdown">
            <div onClick={() => setIsOpen(!isOpen)} className="filter-dropdown-header">
                <div className="filter-title">{title} :</div>
                <div>{filterValue}</div>
                <IoMdArrowDropdown className="filter-dropdown-icon"/>
            </div>
            <div className={classNames("filter-dropdown-options", {"open": isOpen})}>
                {hasAll && <div onClick={() => onSelect(undefined)}>All</div>}
                {options.map((option: OptionType) => (
                    <div key={option.id} onClick={() => onSelect(option.id)}>{option.value}</div>
                ))}
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
        <div className="filter-dropdown">
            <div onClick={() => setIsOpen(!isOpen)} className="filter-dropdown-header">
                <div className="filter-title">{title} :</div>
                <div>{filterValue}</div>
                <IoMdArrowDropdown className="filter-dropdown-icon"/>
            </div>
            <div className={classNames("filter-dropdown-options", {"open": isOpen})}>
                {hasAll && <div onClick={() => onSelect(undefined)}>All</div>}
                {options.map((option: PlayerOptionType) => (
                    <div key={option.id} onClick={() => onSelect(option.id)}>
                        {option.value.shirt_number} {option.value.name}
                    </div>
                ))}
            </div>
        </div>
    )
}       