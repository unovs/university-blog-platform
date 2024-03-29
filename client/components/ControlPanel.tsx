import React, { useEffect, useState } from 'react';
import styles from '../styles/Common.module.scss';
import { observer } from 'mobx-react-lite';
import rootStore from '../store/rootStore';
import Router from 'next/router';
import { Tabs, Tab, Grid } from '@material-ui/core';
import { TabPanel } from './TabPanel';
import { ControlPanelUsers } from './ControlPanelUsers';
import { ControlPanelToolbar } from './ControlPanelToolbar';
import { getAllUniversityFacultySpecialtyGroups } from '../requests/control_panel/getAllUniversityFacultySpecialtyGroups';
import { getUsersWithTables } from '../requests/user/get-users-with-tables';
import { getPositions } from '../requests/control_panel/getPositions';
import { ControlPanelRoles } from './ControlPanelRoles';
import { getAllRoles } from '../requests/role/get-all-roles';
import { ControlPanelGuestRequests } from './ControlPanelGuestRequests';
import { ControlPanelReports } from './ControlPanelReports';

interface ControlPanelProps {
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export const ControlPanel: React.FC<ControlPanelProps> = observer(({ }) => {
    const { roles } = rootStore.myProfile;
    const [value, setValue] = useState(0);

    const {universityStore, controlPanelStore} = rootStore;

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (roles.length < 3) {
            Router.push("/");
            return;
        }

        getAllUniversityFacultySpecialtyGroups().then((res) => {
            universityStore.setFaculties(res.faculties);
            universityStore.setUniversities(res.universities);
            universityStore.setSpecialties(res.specialties);
            universityStore.setGroups(res.groups);
        });
        
        getPositions().then((positions) => {
            controlPanelStore.setPositions(positions);
        });
    }, []);

    useEffect(() => {
        getUsersWithTables(controlPanelStore.currentCount, controlPanelStore.offset).then((res) => {
            controlPanelStore.setAllCount(res.allCount);
            controlPanelStore.setOffset(res.offset);
            controlPanelStore.setUsers(res.users);
            controlPanelStore.dropSelected();
        });
        getAllRoles().then(allRoles => {
            controlPanelStore.setAllRoles(allRoles);
        });
    }, [controlPanelStore.isUpdate, controlPanelStore.currentCount, controlPanelStore.offset]);

    return (
        <Grid container>
            <Grid item xs={2} marginTop="30px">
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"

                >
                    <Tab label="Пользователи" {...a11yProps(0)} />
                    <Tab label="Заявки" {...a11yProps(1)} />
                    <Tab label="Жалобы" {...a11yProps(2)} />
                    <Tab label="О ролях" {...a11yProps(3)} />
                    {/* <Tab label="Item Five" {...a11yProps(4)} />
                    <Tab label="Заявки" {...a11yProps(5)} />
                    <Tab label="Жалобы" {...a11yProps(6)} /> */}
                </Tabs>
            </Grid>
            <Grid item xs={10}>
                <TabPanel value={value} index={0} >
                    <ControlPanelUsers />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ControlPanelGuestRequests />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ControlPanelReports />
                    </TabPanel>
                <TabPanel value={value} index={3}>
                    <ControlPanelRoles />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    Item Five
                 </TabPanel>
                <TabPanel value={value} index={5}>
                    Item Six
                </TabPanel>
                <TabPanel value={value} index={6}>
                    Item Seven
        </TabPanel>
            </Grid>
        </Grid>
    )
});
