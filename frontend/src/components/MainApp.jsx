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
  const [ curPath, setCurPath ] = useState('.')
  const [ logs ] = useState([])

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
    axios.get(store.api + '/api/list?path=' + curPath, store.authHeader)
      .then(res => {
        transformItems(res.data.Data)
      })
      .catch(err => {
      })
  }

  const handleCLick = (item) => {
    if (item.Type === 1) {
      setCurPath(curPath + '/' + item.Name)
    }
    if (item.Type === 2) {
      let c = curPath.split('/')
      c.splice(c.length-1, 1)
      c = c.join('/')
      setCurPath(c)
    }
  }

  const handleOption = (action, item) => {
    console.log(action);
    console.log(item);
  }

  useEffect(() => {
    fetchList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPath])

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
          <DirList items={items} handleClick={handleCLick} handleOption={handleOption} curPath={curPath} />
        </Box>
        <Box sx={{
          height: '18vh',
          background: '#d2d2f2',
          overflowY: 'auto'
        }}>
          <Logs logs={logs} />
        </Box>
      </Box>
    </div>
  )
}
