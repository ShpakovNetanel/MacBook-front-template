import { Menu } from "lucide-react";
import { useState } from "react";
import { ZDrawer } from "../../../../components/ZDrawer/ZDrawer";
import styles from './UnitHierarchy.module.scss';

export const UnitHierarchy = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <ZDrawer
            setIsOpen={setIsDrawerOpen}
            open={isDrawerOpen}
            trigger={<Menu />}
            slotProps={{
                classes: {
                    trigger: styles.Button
                }
            }}>

        </ZDrawer>
    )
}