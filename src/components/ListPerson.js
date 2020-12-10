import React, { Component } from 'react'
import '../styles/css/App.css'

import { AiOutlineUser, AiOutlineMail, AiOutlineHome, AiOutlineDelete } from "react-icons/ai"
import { List } from 'antd'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Box from '@material-ui/core/Box'

export default class ListPerson extends Component {

    render() {

        const { item, handleDelete } = this.props

        return (
            <>
                <List.Item className="ListItem">

                    <Box className="col">
                        <ListItemIcon className="IconBox">
                            <AiOutlineUser className="ListIcon" />
                        </ListItemIcon>
                        <p>{item.name}</p>
                    </Box>

                    <div className="col">
                        <ListItemIcon className="IconBox">
                            <AiOutlineMail className="ListIcon" />
                        </ListItemIcon>
                        <p>{item.email}</p>
                    </div>

                    <div className="col">
                        <ListItemIcon className="IconBox">
                            <AiOutlineHome className="ListIcon" />
                        </ListItemIcon>
                        <p>{item.address.city}, {item.address.state}</p>
                    </div>

                    <div className="RowDelete">
                        <Tooltip title="Deletar" placement="top">
                            <IconButton aria-label="delete" onClick={() => handleDelete(item.id)} >
                                <AiOutlineDelete className="Delete" />
                            </IconButton>
                        </Tooltip>
                    </div>
                </List.Item >
            </>
        )
    }
}