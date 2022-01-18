import { List } from "@mui/material"
import DirItem from "./DirItem"
import FileItem from "./FileItem"


export default function DirList({ items }) {
  
  return (
    <List>
      {items.map(v => {
        return v.Type === 1 ? <DirItem item={v}  key={v.Name}/> : <FileItem item={v} key={v.Name} />
      })}
    </List>
  )
}