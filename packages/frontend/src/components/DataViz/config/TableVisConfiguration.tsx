import { type VizSqlColumn } from '@lightdash/common';
import { ActionIcon, ScrollArea, TextInput } from '@mantine/core';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { type FC } from 'react';
import MantineIcon from '../../common/MantineIcon';
import { Config } from '../../VisualizationConfigs/common/Config';
import { TableFieldIcon } from '../Icons';
import { useVizDispatch, useVizSelector } from '../store';
import {
    updateColumnVisibility,
    updateFieldLabel,
} from '../store/tableVisSlice';

const TableVisConfiguration: FC<{ sqlColumns: VizSqlColumn[] }> = ({
    sqlColumns,
}) => {
    const dispatch = useVizDispatch();

    const tableVisConfig = useVizSelector(
        (state) => state.tableVisConfig.config,
    );

    if (!tableVisConfig) {
        return null;
    }

    return (
        <ScrollArea
            offsetScrollbars
            variant="primary"
            className="only-vertical"
            type="auto"
            sx={{ flex: 1 }}
            mb="md"
        >
            <Config>
                <Config.Section>
                    <Config.Heading>Column labels</Config.Heading>

                    {Object.keys(tableVisConfig.columns).map((reference) => {
                        const fieldType = sqlColumns?.find(
                            (c) => c.reference === reference,
                        )?.type;

                        return (
                            <TextInput
                                key={reference}
                                radius="md"
                                value={tableVisConfig.columns[reference].label}
                                icon={
                                    fieldType && (
                                        <TableFieldIcon fieldType={fieldType} />
                                    )
                                }
                                rightSection={
                                    <ActionIcon
                                        onClick={() =>
                                            dispatch(
                                                updateColumnVisibility({
                                                    reference,
                                                    visible:
                                                        !tableVisConfig.columns[
                                                            reference
                                                        ].visible,
                                                }),
                                            )
                                        }
                                    >
                                        <MantineIcon
                                            icon={
                                                tableVisConfig.columns[
                                                    reference
                                                ].visible
                                                    ? IconEye
                                                    : IconEyeOff
                                            }
                                        />
                                    </ActionIcon>
                                }
                                onChange={(e) => {
                                    dispatch(
                                        updateFieldLabel({
                                            reference,
                                            label: e.target.value,
                                        }),
                                    );
                                }}
                            />
                        );
                    })}
                </Config.Section>
            </Config>
        </ScrollArea>
    );
};

export default TableVisConfiguration;
