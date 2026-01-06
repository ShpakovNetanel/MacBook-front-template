import { Tabs } from "@base-ui-components/react"
import styles from './ZTabs.module.scss'
import type { CSSProperties } from "react";
import type { ClassNames } from "../../types/baseui";
import clsx from "clsx";

type SlotProps = {
    classes?: ClassNames<typeof Tabs>
}

type ZTabsProps = {
    tabs: {
        value: number;
        label: string;
        color: string;
    }[];
    slotProps?: SlotProps;
    activeTab: number;
    setActiveTab: (tab: number) => void;
}

export const ZTabs = ({ tabs, activeTab, setActiveTab, slotProps }: ZTabsProps) => {
    return (
        <Tabs.Root onValueChange={setActiveTab} value={activeTab} className={clsx(styles.Tabs, slotProps?.classes?.Root)} defaultValue="overview">
            <Tabs.List className={clsx(styles.List, slotProps?.classes?.List)}>
                {tabs.map(tab =>
                    <Tabs.Tab className={clsx(styles.Tab, slotProps?.classes?.Tab)} value={tab.value}
                        style={{
                            '--tab-color': tab.color
                        } as CSSProperties}>
                        {tab.label}
                    </Tabs.Tab>
                )}
                <Tabs.Indicator className={clsx(styles.Indicator, slotProps?.classes?.Indicator)} />
            </Tabs.List>
        </Tabs.Root>
    )
}