import React, { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMap, useMapEvents } from "react-leaflet";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import {
  TimePicker,
  LocalizationProvider,
  TimeValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { observer } from "mobx-react";
import axios from "axios";
import { CalCodes, CalCoords } from "../../utils/CalCode";
import store, { fetchBoxes } from "../../store/store";

interface AddDialogProps {}

const AddDialog: React.FC<AddDialogProps> = () => {
  const [type, setType] = useState<"blue" | "purple">("blue");
  const [builder, setBuilder] = useState<"air" | "land" | "naval">("air");
  const [starttime, setStarttime] = useState<string | null>(null);
  const [endtime, setEndtime] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<FormDataType>();

  const onSubmit: SubmitHandler<any> = async () => {
    // @ts-ignore
    const data: FormDataType = {};
    data.type = type;
    data.builder = builder;
    console.log(data, starttime, endtime);
    data.starttime = starttime;
    data.endtime = endtime;
    data.level = store.level;
    data.coorlat = store.currentLat;
    data.coorlon = store.currentLng;
    // @ts-ignores
    data.code = CalCodes(store.currentLat, store.currentLng)[store.level];
    console.log("data:", data);
    const res = await axios.post("http://localhost:3000/api/insert", data);
    console.log(res);
    store.createModalOpen = false;
    fetchBoxes();
  };
  return (
    <Dialog
      open={store.createModalOpen}
      onClose={() => {
        store.createModalOpen = false;
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="alert-dialog-title">{"创建杀伤盒"}</DialogTitle>
        <DialogContent>
          <p>
            {/* @ts-ignores */}
            编码: {CalCodes(store.currentLat, store.currentLng)[store.level]}
            {/* 坐标: {store.currentLat}-----{store.currentLng} */}
            {/* 反编码: {JSON.stringify(CalCoords(1, "599HV"))} */}
          </p>
          <FormControl fullWidth {...register("type")}>
            <p>杀伤盒类型：</p>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              onChange={(e: SelectChangeEvent) => {
                setType(e.target.value as any);
              }}
            >
              <MenuItem value="blue">蓝色杀伤盒</MenuItem>
              <MenuItem value="purple">紫色杀伤盒</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth {...register("builder")}>
            <p>建立单位：</p>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={builder}
              onChange={(e: SelectChangeEvent) => {
                setBuilder(e.target.value as any);
              }}
            >
              <MenuItem value="land">陆上作战分中心</MenuItem>
              <MenuItem value="air">空中作战分中心</MenuItem>
              <MenuItem value="naval">海上作战分中心</MenuItem>
            </Select>
          </FormControl>
          <FormControl {...register("starttime")} sx={{ marginRight: 5 }}>
            <p>建立时间：</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="建立时间"
                ampm={false}
                onChange={(
                  value: Dayjs | null,
                  context: PickerChangeHandlerContext<TimeValidationError>
                ) => {
                  setStarttime((value as any).$d);
                }}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl {...register("endtime")}>
            <p>结束时间：</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="结束时间"
                ampm={false}
                onChange={(
                  value: Dayjs | null,
                  context: PickerChangeHandlerContext<TimeValidationError>
                ) => {
                  setEndtime((value as any).$d);
                }}
              />
            </LocalizationProvider>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button type="submit" autoFocus>
            提交
          </Button>
          <Button
            onClick={() => {
              store.createModalOpen = false;
            }}
          >
            取消
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default observer(AddDialog);
