import React, { useState, useRef, useEffect } from 'react'
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

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isOpen) return
        const close = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
        }
        document.addEventListener("click", close)
        return () => document.removeEventListener("click", close)
    }, [isOpen])


    let filterValue = options.find((option: OptionType) => option.id.toString() === value?.toString())?.value

    if (!value) {
        if (hasAll) filterValue = "All"
        else if (defaultValue) filterValue = defaultValue
    }

    const onSelect = (id: string | number | undefined) => {
        updateParam(title, id)
        setIsOpen(false)
    }

    return (
        <div 
            ref={ref}
            className={classNames("filter-dropdown", {"narrow": title === "season"})}
            >
            <div className="filter-title">{title}</div>
            <div onClick={() => setIsOpen(!isOpen)} className="filter-dropdown-box">
                <div className="filter-dropdown-header">
                    <div className="filter-dropdown-value">{filterValue}</div>
                    <IoMdArrowDropdown className="filter-dropdown-icon"/>
                </div>
                <div className={classNames("filter-dropdown-options", {"open": isOpen})}>
                    {hasAll && (
                        <div 
                            onClick={() => onSelect(undefined)} 
                            className={classNames("filter-dropdown-option no-border", {"selected": !value})}
                            >
                            <div className="filter-dropdown-option-value">All</div>
                        </div>
                    )}
                    {options.map((option: OptionType) => (
                        <div 
                            key={option.id} 
                            onClick={() => onSelect(option.id)}
                            className={classNames("filter-dropdown-option", {"selected": option.id.toString() === value?.toString()})}
                            >
                            <div className="filter-dropdown-option-value">{option.value}</div>
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
    disabled?: string | undefined
    isLoading?: boolean
}

export function PlayerFilterDropdown({
    title, 
    options, 
    value, 
    hasAll, 
    disabled,
    isLoading,
}: PlayerFilterDropdownProps) {

    const updateParam = useUpdateSearchParam();

    const [isOpen, setIsOpen] = useState(false)

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isOpen) return
        const close = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
        }
        document.addEventListener("click", close)
        return () => document.removeEventListener("click", close)
    }, [isOpen])
    
    let filterValue: React.ReactNode = hasAll ? "All" : undefined

    if (disabled) {
        filterValue = disabled
    }

    if (isLoading) {
        filterValue = "Loading..."
    }

    if (value) {
        const selectedPlayerId = Number(value)
        const selectedPlayerValue = options.find((option: PlayerOptionType) => option.id === selectedPlayerId)?.value
        filterValue = (
            <div className="filter-dropdown-value player">
                <div className="filter-dropdown-player-number">{selectedPlayerValue?.shirt_number}</div>
                <div className="filter-dropdown-player-name">{selectedPlayerValue?.name}</div>
            </div>
        )
    }

    const onOpenList = () => {
        if (disabled) return
        setIsOpen(!isOpen)
    }

    const onSelect = (id: number | undefined) => {
        updateParam(title, id)
        setIsOpen(false)
    }                                
    return (
        <div ref={ref} className={classNames("filter-dropdown wide", {"disabled": disabled})}>
            <div className="filter-title">{title}</div>
            <div onClick={onOpenList} className="filter-dropdown-box">
                <div className="filter-dropdown-header">
                    <div className="filter-dropdown-value">{filterValue}</div>
                    <IoMdArrowDropdown className="filter-dropdown-icon"/>
                </div>
                <div className={classNames("filter-dropdown-options", {"open": isOpen})}>
                    {hasAll && (
                        <div onClick={() => onSelect(undefined)} className="filter-dropdown-option no-border">
                            <div className="filter-dropdown-option-value">All</div>
                        </div>
                    )}
                    {options.map((option: PlayerOptionType) => (
                        <div 
                            key={option.id} 
                            onClick={() => onSelect(option.id)}
                            className={classNames("filter-dropdown-option", {"selected": option.id.toString() === value?.toString()})}
                            >
                            <div className="filter-dropdown-option-value">
                                <div className="filter-dropdown-player-number">{option.value.shirt_number}</div>
                                <div className="filter-dropdown-player-name">{option.value.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}       