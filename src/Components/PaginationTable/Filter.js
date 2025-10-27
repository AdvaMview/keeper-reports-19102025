import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  TextField,
  Autocomplete,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { useTheme,  styled} from "@mui/material/styles";
import SimplePopover from "../UI/SimplePopover";
import { intFilterOperators, stringFilterOperators } from "../../Utils/radioExUtils";

const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: 0,
  margin: 0,
  background: theme.palette.background.paper,
}));

const Filter = (props) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterType, setFilterType] = useState(props.filterTypeValue);
  const [filterValue, setFilterValue] = useState(props.filterValue);
  const [openAuto, setOpenAuto] = useState(false);

  const filterList =
    props.columnType === "System.String"
      ? stringFilterOperators
      : intFilterOperators;

  const currentFilterType = filterList.find(
    (f) => props.filterTypeValue === f.value
  );

  const filterOptionsList = props.filterOptions
    ? Object.entries(props.filterOptions)
        .filter(([columnName]) => columnName === props.columnName)
        .map(([_, options]) =>
          options?.map((item) => ({ key: item, value: item }))
        )
        .flat()
    : [];

  const open = Boolean(anchorEl);

  const handlePopoverToggle = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const handleFilterTypeSelect = (ft) => {
    handlePopoverClose();
    setFilterType(ft);
    props.onChange(filterValue, ft, props.columnName);
  };

  const onFilterChange = (event, value, filterType, columnName, reason) => {
    if (reason === "clear") {
      props.clearFilter(event, columnName);
    } else if (value !== "undefined") {
      props.onChange(value, filterType, columnName);
    }
  };

  useEffect(() => {
    setFilterType(props.filterTypeValue);
  }, [props.filterTypeValue]);

  useEffect(() => {
    setFilterValue(props.filterValue);
  }, [props.filterValue]);

  return (
    <>
      <Box display="flex" alignItems="center">
        <Autocomplete
          fullWidth
          size="small"
          open={openAuto}
          onOpen={() => setOpenAuto(true)}
          onClose={() => setOpenAuto(false)}
          options={filterOptionsList || []}
          value={filterValue || ""}
          getOptionLabel={(option) =>
            typeof option === "object" ? option.value : option
          }
          renderOption={(props, option) => (
            <li {...props}>
              <Typography fontSize={12} fontWeight="light">
                {typeof option === "object" ? option.value : option}
              </Typography>
            </li>
          )}
          PaperComponent={(props) => <CustomPaper {...props} />}
          onChange={(event, newValue, reason) =>
            onFilterChange(
              event,
              newValue?.value,
              filterType,
              props.columnName,
              reason
            )
          }
          onInputChange={(event, newInputValue) =>
            onFilterChange(
              event,
              newInputValue,
              filterType,
              props.columnName,
              "inputChange"
            )
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              InputProps={{
                ...params.InputProps,
                sx: { fontSize: 12, fontWeight: "light" },
              }}
              InputLabelProps={{
                sx: { fontSize: 12, fontWeight: "light", minWidth: 50 },
              }}
              label=""
            />
          )}
        />

        <Tooltip
          title={
            <Typography fontSize={12} fontWeight="light">
              {currentFilterType?.key || "Filter"}
            </Typography>
          }
        >
          <IconButton onClick={handlePopoverToggle} size="small">
            {currentFilterType?.icon(theme.palette.primary.main) || (
              <FilterList />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <SimplePopover open={open} anchorEl={anchorEl} handleClose={handlePopoverClose}>
        <List>
          {filterList.map((item, index) => (
            <ListItem
              button
              key={index}
              selected={props.filterTypeValue === item.value}
              onClick={() => handleFilterTypeSelect(item.value)}
              sx={{
                px: 1,
                color:
                  props.filterTypeValue === item.value
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 12,
                  fontWeight: "light",
                }}
                primary={item.key}
              />
              <ListItemIcon
                sx={{
                  minWidth: 28,
                  color:
                    props.filterTypeValue === item.value
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                }}
              >
                {item.icon && item.icon()}
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </SimplePopover>
    </>
  );
};

export default Filter;
