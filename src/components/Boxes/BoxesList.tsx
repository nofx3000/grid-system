import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Drawer,
  Button,
} from "@mui/material";
import store from "../../store/store";
import { observer } from "mobx-react";
const BoxesList = () => {
  const renderList = (level: 1 | 2 | 3) => {
    return store.boxes
      .filter((box: FormDataType) => {
        return box.level === level;
      })
      .map((box: FormDataType) => {
        return (
          <ListItem>
            <ListItemText primary={`编码:${box.code}`} />
            <Button variant="outlined" sx={{ marginRight: "5px" }}>
              编辑
            </Button>
            <Button variant="outlined" color="error">
              删除
            </Button>
          </ListItem>
        );
      });
  };
  return (
    <Drawer
      anchor="left"
      open={store.boxesDrawerOpen}
      onClose={() => {
        store.boxesDrawerOpen = false;
      }}
    >
      <List
        dense={true}
        // sx={{
        //   position: "absolute",
        //   right: 0,
        //   top: 0,
        //   zIndex: 999,
        //   backgroundColor: "white",
        // }}
      >
        <Typography sx={{ marginLeft: "15px" }}>一级网格:</Typography>
        {renderList(1)}
        <Typography sx={{ marginLeft: "15px" }}>二级网格:</Typography>
        {renderList(2)}
        <Typography sx={{ marginLeft: "15px" }}>三级网格:</Typography>
        {renderList(3)}
      </List>
    </Drawer>
  );
};

export default observer(BoxesList);
