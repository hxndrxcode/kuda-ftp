import { Box, Breadcrumbs, Typography } from "@mui/material";
import axios from 'axios'
import lodash from 'lodash'
import moment from 'moment'
import prettyByte from 'pretty-bytes'
import { useContext, useEffect, useState } from "react";
import { RootContext } from "../context/rootContext";
import DirList from "./DirList";
import BottomBar from "./BottomBar";
import CreateFolder from "./CreateFolder";
import UploadFile from "./UploadFile";
import Rename from "./Rename";
import DeleteItem from "./DeleteItem";

export default function MainApp() {
  const { store } = useContext(RootContext)
  const [items, setItems] = useState([])
  const [curPath, setCurPath] = useState('.')
  const [dialogMkDir, setDialogMkDir] = useState(false)
  const [dialogUpload, setDialogUpload] = useState(false)
  const [dialogRename, setDialogRename] = useState({})
  const [dialogDelete, setDialogDelete] = useState({})

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

  const handleCLick = (item, item2) => {
    if (item.Type === 1) {
      setCurPath(curPath + '/' + item.Name)
    }
    if (item.Type === 2) {
      let c = curPath.split('/')
      c.splice(c.length - 1, 1)
      c = c.join('/')
      setCurPath(c)
    }
    if (item.Type === 3) {
      setDialogMkDir(true)
    }
    if (item.Type === -3) {
      setDialogMkDir(false)
    }
    if (item.Type === 33) {
      setDialogMkDir(false)
      fetchList()
    }
    if (item.Type === 4) {
      setDialogUpload(true)
    }
    if (item.Type === -4) {
      setDialogUpload(false)
    }
    if (item.Type === 44) {
      setDialogUpload(false)
      fetchList()
    }
    if (item.Type === 5) {
      setDialogRename(item2)
    }
    if (item.Type === -5) {
      setDialogRename({})
    }
    if (item.Type === 55) {
      setDialogRename({})
      fetchList()
    }
    if (item.Type === 6) {
      setDialogDelete(item2)
    }
    if (item.Type === -6) {
      setDialogDelete({})
    }
    if (item.Type === 66) {
      setDialogDelete({})
      fetchList()
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
          bgcolor: 'grey.200',
          padding: '1rem',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
          }}>
          <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary">Folder</Typography>
            {curPath.split('/').map(v => <Typography color="text.secondary" key={v}>{v}</Typography>)}
          </Breadcrumbs>
        </Box>
        <Box sx={{
          background: '#fff',
          overflowY: 'auto',
          height: 'calc(100vh - 176px)'
        }}>
          <DirList items={items} handleClick={handleCLick} handleOption={handleOption} />
        </Box>
        <BottomBar handleClick={handleCLick} curPath={curPath} />
        <CreateFolder open={dialogMkDir} hc={handleCLick} curPath={curPath}  />
        <UploadFile open={dialogUpload} hc={handleCLick} curPath={curPath}  />
        <Rename open={Boolean(dialogRename.Name)} hc={handleCLick} curPath={curPath} item={dialogRename} />
        <DeleteItem open={Boolean(dialogDelete.Name)} hc={handleCLick} curPath={curPath} item={dialogDelete} />
      </Box>
    </div>
  )
}
