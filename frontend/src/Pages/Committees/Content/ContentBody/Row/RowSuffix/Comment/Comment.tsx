import { Dialog as BaseDialog } from "@base-ui-components/react";
import { MessageCircleMore, Save, Trash, X } from "lucide-react";
import { useState } from "react";
import { Typhography } from "../../../../../../../components/Typography/Typography";
import type { Report } from "../../../../../../../types/types";
import styles from './Comment.module.scss';

type CommentProps = {
    report: Report;
    screenUnitStatus: number;
}

export const Comment = ({ report, screenUnitStatus }: CommentProps) => {
    const [message, setMessage] = useState(report?.comment);

    const saveComment = () => {
    }

    const removeComment = () => {

    }

    return (
        <BaseDialog.Root>
            <BaseDialog.Trigger className={styles.Button}>
                <MessageCircleMore className={styles.Icon} />
            </BaseDialog.Trigger>
            <BaseDialog.Portal>
                <BaseDialog.Backdrop className={styles.Backdrop} />
                <BaseDialog.Popup className={styles.Popup}>
                    <div className={styles.Title}>
                        <div className={styles.Text}>
                            <Typhography slotProps={{
                                classes: {
                                    Label: styles.Id
                                }
                            }}>{`הערה עבור מק״ט: ${report.material.id}`}</Typhography>
                            <Typhography slotProps={{
                                classes: {
                                    Label: styles.Description
                                }
                            }}>{report.material.description}</Typhography>
                        </div>
                        <BaseDialog.Close className={styles.Close}>
                            <X />
                        </BaseDialog.Close>
                    </div>
                    <div className={styles.Content}>
                        <textarea
                            disabled={screenUnitStatus !== 0}
                            className={styles.Message}
                            placeholder={'כתוב כאן...'}
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                    </div>
                    <div className={styles.Footer}>
                        <Typhography slotProps={{
                            classes: {
                                Label: styles.Length
                            }
                        }}>{`אורך ${message.length}/120`}</Typhography>
                        <div className={styles.Actions}>
                            <BaseDialog.Close className={styles.Button} onClick={removeComment}>
                                <Trash />
                            </BaseDialog.Close>
                            <BaseDialog.Close className={styles.Button} onClick={saveComment}>
                                <Save />
                            </BaseDialog.Close>
                        </div>
                    </div>
                </BaseDialog.Popup>
            </BaseDialog.Portal>
        </BaseDialog.Root>
    );
}
