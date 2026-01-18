import { Tabs as BaseTabs } from "@base-ui-components/react"
import styles from './Tabs.module.scss'
import type { CSSProperties } from "react";
import type { ClassNames } from "../../types/baseui";
import clsx from "clsx";

type SlotProps = {
    classes?: ClassNames<typeof BaseTabs>
}

type TabsProps = {
    tabs: {
        value: number;
        label: string;
        color: string;
    }[];
    slotProps?: SlotProps;
    activeTab: number;
    setActiveTab: (tab: number) => void;
}

export const Tabs = ({ tabs, activeTab, setActiveTab, slotProps }: TabsProps) => {
    return (
        <BaseTabs.Root onValueChange={setActiveTab} value={activeTab} className={clsx(styles.Tabs, slotProps?.classes?.Root)} defaultValue="overview">
            <BaseTabs.List className={clsx(styles.List, slotProps?.classes?.List)}>
                {tabs.map(tab =>
                    <BaseTabs.Tab key={tab.value} className={clsx(styles.Tab, slotProps?.classes?.Tab)} value={tab.value}
                        style={{
                            '--tab-color': tab.color
                        } as CSSProperties}>
                        {tab.label}
                    </BaseTabs.Tab>
                )}
                <BaseTabs.Indicator className={clsx(styles.Indicator, slotProps?.classes?.Indicator)} />
            </BaseTabs.List>
        </BaseTabs.Root>
    )
}
