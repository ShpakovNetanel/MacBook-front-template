import { Check } from "lucide-react";
import { ZStep } from "../../../../components/ZStepper/ZStep/ZStep";
import { ZStepConnector } from "../../../../components/ZStepper/ZStepConnector/ZStepConnector";
import { ZStepIndicator } from "../../../../components/ZStepper/ZStepIndicator/ZStepIndicator";
import { ZStepLabel } from "../../../../components/ZStepper/ZStepLabel/ZStepLabel";
import { ZStepper } from "../../../../components/ZStepper/ZStepper";
import styles from './ReportTypes.module.scss';

type Step = {
    value: number;
    label: string;
}

const steps: Step[] = [{ label: 'שצ״ל', value: 2 },
{ label: 'מלאי', value: 1 },
{ label: 'דרישות', value: 0 },
{ label: 'הקצאות', value: 4 }];

export const ReportTypes = () => {
    return (
        <ZStepper defaultActive={0} orientation="horizontal">
            {steps.map((step, index) => (
                <ZStep key={index} index={index} >
                    <ZStepIndicator
                        slotProps={{
                            completedIcon: <Check className={styles.Indicator} />,
                            classes: {
                                Indicator: styles.Indicator
                            }
                        }} />
                    <ZStepLabel
                        slotProps={{
                            classes: {
                                Label: styles.Label
                            }
                        }}>
                        {step.label}
                    </ZStepLabel>
                    {index !== steps.length - 1 &&
                        <ZStepConnector slotProps={{
                            classes: {
                                Connector: styles.Connector
                            }
                        }} />
                    }
                </ZStep>
            ))}
        </ZStepper>
    );
}