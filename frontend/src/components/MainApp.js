import { Box } from "@mui/material";
import axios from 'axios'
import lodash from 'lodash'
import moment from 'moment'
import prettyByte from 'pretty-bytes'
import { useContext, useEffect, useState } from "react";
import { RootContext } from "../context/rootContext";
import DirList from "./DirList";
import Logs from "./Logs";

export default function MainApp() {
  const { store } = useContext(RootContext)
  const [ items, setItems ] = useState([])

  const transformItems = (input) => {
    input = lodash.orderBy(input, ['Type', 'Name'], ['desc', 'asc'])
    input.forEach(v => {
      v.PrettySize = prettyByte(v.Size)
      v.PrettyTime = moment(v.Time).format('YY/MM/DD HH:mm')
    })
    setItems(input)
  }

  const fetchList = () => {
    console.log('loadddd');
    axios.get(store.api + '/api/list', store.authHeader)
      .then(res => {
        transformItems(res.data.Data)
      })
      .catch(err => {
      })
  }

  useEffect(() => {
    fetchList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <Box sx={{
          flexDirection: 'column',
          alignItems: 'center',
      }}>
        <Box sx={{
          height: '70vh',
          background: '#fff',
          overflowY: 'auto'
        }}>
          <DirList items={items}/>
        </Box>
        <Box sx={{
          height: '18vh',
          background: '#d2d2f2',
          overflowY: 'auto'
        }}>
          <Logs />
        </Box>
      </Box>
    </div>
  )
} 