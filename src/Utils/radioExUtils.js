import React from 'react'
// import TableAlias from "src/config/config.radio/Components/Tables/TableAlias";
import SearchIcon from '@mui/icons-material/Search';
import DragHandleIcon from '@mui/icons-material/DragHandle';
// You may need to find or create a custom icon for 'NotEqual'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ClearIcon from '@mui/icons-material/Clear';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import BlockIcon from '@mui/icons-material/Block';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
const operators = [
  {
    key: 'BEGIN WITH',
    value: 'BEGIN WITH'
  },
  {//NEW
    key: 'NOT BEGIN WITH',
    value: 'NOT BEGIN WITH'
  },
  {
    key: 'CONTAINS',
    value: 'CONTAINS'
  },
  { //NEW
    key: 'NOT CONTAINS',
    value: 'NOT CONTAINS'
  },
  {
    key: 'END WITH',
    value: 'END WITH'
  },
  {
    key: 'NOT END WITH',
    value: 'NOT END WITH'
  },
  {
    key: 'EQUAL',
    value: '='
  },
  {
    key: 'NOT EQUAL',
    value: '<>'
  },
  {
    key: 'GREATER THAN',
    value: '>'
  },
  {//NEW
    key: 'GREATER THAN EQUAL',
    value: '>='
  },
  {
    key: 'LESS THEN',
    value: '<'
  },
  {//NEW
    key: 'LESS THEN EQUAL',
    value: '<='
  },
  {
    key: 'LIKE',
    value: 'LIKE'
  },
  {   //NEW
    key: 'NOT LIKE',
    value: 'NOT LIKE'
  },
  // {
  //   key: 'IS NULL',
  //   value: 'IS NULL'
  // },
  // {
  //   key: 'IS NOT NULL',
  //   value: 'IS NOT NULL'
  // },      
];

export { operators };

const joinTypes = [
  {
    key: 'INNER',
    value: 'INNER JOIN'
  },
  {
    key: 'LEFT',
    value: 'LEFT JOIN'
  },
  {
    key: 'RIGHT',
    value: 'RIGHT JOIN'
  }
  // ,
  // {
  //   key: 'CROSS',
  //   value: 'CROSS JOIN'
  // }
];

export { joinTypes };

const FunctionList = [
  {
    key: 'COUNT',
    value: 'COUNT(',
    extension: 'Cnt',
    type: 'AGGR'
  },
  {
    key: 'COUNT DISTINCT',
    value: 'COUNT(DISTINCT',
    extension: 'Cnt_Dis',
    type: 'AGGR'
  },
  {
    key: 'MIN',
    value: 'MIN(',
    extension: 'Min',
    type: 'AGGR'
  },
  {
    key: 'MAX',
    value: 'MAX(',
    extension: 'Max',
    type: 'AGGR'
  },
  {
    key: 'AVG',
    value: 'AVG(',
    extension: 'Avg',
    type: 'AGGR'
  },
  {
    key: 'LISTAGG',
    value: 'LISTAGG(',
    extension: 'ListAgg',
    type: 'AGGR',
    template: 'LISTAGG({column_field},{sign}) WITHIN GROUP (ORDER BY {group_field})',
  },
  {
    key: 'LISTAGG DISTINCT',
    value: 'LISTAGG(DISTINCT',
    extension: 'ListAgg_Dis',
    type: 'AGGR',
    template: 'LISTAGG(DISTINCT {column_field},{sign}) WITHIN GROUP (ORDER BY {group_field})',
  }
  //LISTAGG(ex_criteria_field,',') WITHIN GROUP (ORDER BY ex_criteria_id)
];
export { FunctionList };

const columnOrders = { 'hdate': -40, 'key': -30, 'field': -20, 'customField': -15, 'functionField': -10 };
export { columnOrders }
// const intFilterOperators = [
//   {
//     key: 'Contains',
//     value: 'CONTAINS'
//   },
//   {
//     key: 'Equal',
//     value: 'EQUAL'
//   },
//   {
//     key: 'Not Equal',
//     value: 'NOT EQUAL'
//   },
//   {
//     key: 'Greater Than',
//     value: 'GREATER THAN'
//   },
//   {
//     key: 'Greater Than Equal',
//     value: 'GREATER THAN EQUAL'
//   },
//   {
//     key: 'Less Than',
//     value: 'LESS THAN'
//   },
//   {
//     key: 'Less Than Equal',
//     value: 'LESS THAN EQUAL'
//   },
//   {
//     key: 'Start With',
//     value: 'START WITH'
//   },
//   {
//     key: 'End With',
//     value: 'END WITH'
//   },
//   {
//     key: 'Empty',
//     value: 'EMPTY'
//   }
// ];

const intFilterOperators = [
  {
    key: 'Contains',
    value: 'CONTAINS',
    icon: (color) => <SearchIcon style={{ color: color || '' }} fontSize='small' />
  },
  {
    key: 'Equal',
    value: 'EQUAL',
    icon: (color) => <DragHandleIcon style={{ color: color || '' }} fontSize='small' />
  },
  {
    key: 'Not Equal',
    value: 'NOT EQUAL',
    icon: (color) => <RemoveCircleOutlineIcon style={{ color: color || '' }} fontSize='small' />
  },
  {
    key: 'Greater Than',
    value: 'GREATER THAN',
    icon: (color) => <ArrowUpwardIcon style={{ color: color || '' }} fontSize='small' />
  },
  {
    key: 'Greater Than Equal',
    value: 'GREATER THAN EQUAL',
    icon: (color) => <KeyboardArrowUpIcon style={{ color: color || '' }} fontSize='small' />
  },
  {
    key: 'Less Than',
    value: 'LESS THAN',
    icon: (color) => <ArrowDownwardIcon style={{ color: color || '' }} fontSize='small' />
  },
  {
    key: 'Less Than Equal',
    value: 'LESS THAN EQUAL',
    icon: (color) => <KeyboardArrowDownIcon style={{ color: color || '' }} fontSize='small' />
  },
  {
    key: 'Start With',
    value: 'START WITH',
    icon: (color) => <PlaylistAddIcon style={{ color: color || '' }} fontSize='small' />
  },
  {
    key: 'End With',
    value: 'END WITH',
    icon: (color) => <PlaylistAddCheckIcon style={{ color: color || '' }} fontSize='small' />
  },
  {
    key: 'Empty',
    value: 'EMPTY',
    icon: (color) => <ClearIcon style={{ color: color || '' }} fontSize='small' />
  }
];

// If you need to create a custom icon for 'Not Equal', replace CustomNotEqualIcon with your custom component or icon import.


export { intFilterOperators };

const stringFilterOperators = [
  {
    key: 'Contains',
    value: 'CONTAINS',
    icon: (color) => <SearchIcon style={{ color: color || '' }} fontSize='small' />
  },
  {
    key: 'Not Start With',
    value: 'NOT START WITH',
    icon: (color) => <HighlightOffIcon style={{ color: color || '' }} fontSize='small' />
  },
  {
    key: 'Not End With',
    value: 'NOT END WITH',
    icon: (color) => <CallMadeIcon style={{ color: color || '' }} fontSize='small' />
  },
  {
    key: 'Not Contains',
    value: 'NOT CONTAINS',
    icon: (color) => <CallReceivedIcon style={{ color: color || '' }} fontSize='small' />
  },
  {
    key: 'Not Match',
    value: 'NOT MATCH',
    icon: (color) => <NotInterestedIcon style={{ color: color || '' }} fontSize='small' />
  },
  {
    key: 'End With',
    value: 'END WITH',
    icon: (color) => <PlaylistAddCheckIcon style={{ color: color || '' }} fontSize='small' />
  },
  // {
  //   key: 'Is Null',
  //   value: 'IS NULL',
  //   icon: (color) => <BlockIcon style={{ color : color || '' }} fontSize='small'/>
  // },
  // {
  //   key: 'Is Not Null',
  //   value: 'IS NOT NULL',
  //   icon: (color) => <CheckCircleIcon style={{ color : color || '' }} fontSize='small'/>
  // },
  {
    key: 'Match',
    value: 'MATCH',
    icon: (color) => <FindReplaceIcon style={{ color: color || '' }} fontSize='small' />
  },
  {
    key: 'Start With',
    value: 'START WITH',
    icon: (color) => <PlaylistAddIcon style={{ color: color || '' }} fontSize='small' />
  },
  { //NEW
    key: 'Empty',
    value: 'EMPTY',
    icon: (color) => <ClearIcon style={{ color: color || '' }} fontSize='small' />
  },
  { //NEW
    key: 'Not Empty',
    value: 'NOT EMPTY',
    icon: (color) => <BlockIcon style={{ color: color || '' }} fontSize='small' /> // Icon for Not Empty
  }
];

// Use stringFilterOperators array in your application as needed



// const stringFilterOperators = [
//   {
//     key: 'Contains',
//     value: 'CONTAINS',
//     icon: () => <SearchIcon />
//   },
//   {
//     key: 'Not Start With',
//     value: 'NOT START WITH',
//     icon: () => <SearchIcon />
//   },
//   {
//     key: 'Not End With',
//     value: 'NOT END WITH',
//     icon: () => <SearchIcon />
//   },
//   {
//     key: 'Not Contains',
//     value: 'NOT CONTAINS',
//     icon: () => <SearchIcon />
//   },
//   {
//     key: 'Not Match',
//     value: 'NOT MATCH',
//     icon: () => <SearchIcon />
//   },
//   {
//     key: 'End With',
//     value: 'END WITH',
//     icon: () => <SearchIcon />
//   },    
//   {
//     key: 'Is Null',
//     value: 'IS NULL',
//     icon: () => <SearchIcon />
//   },
//   {
//     key: 'Is Not Null',
//     value: 'IS NOT NULL',
//     icon: () => <SearchIcon />
//   },
//   {
//     key: 'Match',
//     value: 'MATCH',
//     icon: () => <SearchIcon />
//   }, 
//   {
//     key: 'Start With',
//     value: 'START WITH',
//     icon: () => <SearchIcon />
//   },   
// ];
export { stringFilterOperators };

export const signs = [
  { key: "{COMMA}", value: "," },
  { key: "{PERIOD}", value: "." },
  { key: "{EQUAL}", value: "=" },
  { key: "{MINUS}", value: "-" },
  { key: "{ULINE}", value: "_" },
  { key: "{PLINE}", value: "|" },
  { key: "{SEMICOLON}", value: ";" }
];

const getTableAliasList = (exception, joinId) => {
  let tableAliasList = [];
  //set table Alias
  tableAliasList[0] = { key: 0, value: exception.ex_table_alias };
  //set join table Alias
  tableAliasList.push(
    ...exception.joins.filter(f => f.ex_join_id !== joinId).map((item) => {
      return { key: item.ex_join_id, value: item.ex_join_table_alias }
    })
  );
  return tableAliasList;
};

export { getTableAliasList };

const checkIsAdminPermission = (userRule) => {
  return userRule === '1'
};

export { checkIsAdminPermission };

const checkIsNotPermittedToTouch = (isAdmin, IsActive) => {
  return !isAdmin && IsActive
};

export { checkIsNotPermittedToTouch };

export const getGroupColor = (ex_group_id) => {
  // const colors = [
  //   '#87CEEB', // Sky Blue
  //   '#FFA07A', // Light Salmon
  //   '#20B2AA', // Light Sea Green
  //   '#FFB6C1', // Light Pink
  //   '#B0E0E6', // Powder Blue
  //   '#FFD700', // Gold
  //   '#ADD8E6', // Light Blue
  //   '#FFC0CB', // Pink
  //   '#98FB98', // Pale Green
  //   '#F08080', // Light Coral
  //   '#87CEFA', // Light Sky Blue
  //   '#F0E68C', // Khaki
  //   '#F5DEB3', // Wheat
  //   '#00BFFF', // Deep Sky Blue
  //   '#FFA500', // Orange
  //   '#B0C4DE', // Light Steel Blue
  //   '#FF69B4', // Hot Pink
  //   '#00FA9A', // Medium Spring Green
  //   '#FF6347', // Tomato
  //   '#DA70D6'  // Orchid
  // ];
  const colors = [
    '#4682B4', // Steel Blue (replaces Sky Blue)
    '#FF4500', // Orange Red (replaces Light Salmon)
    '#2E8B57', // Sea Green (replaces Light Sea Green)
    '#DB7093', // Pale Violet Red (replaces Light Pink)
    '#5F9EA0', // Cadet Blue (replaces Powder Blue)
    '#DAA520', // Goldenrod (replaces Gold)
    '#1E90FF', // Dodger Blue (replaces Light Blue)
    '#FF69B4', // Hot Pink (kept the same)
    '#32CD32', // Lime Green (replaces Pale Green)
    '#CD5C5C', // Indian Red (replaces Light Coral)
    '#4169E1', // Royal Blue (replaces Light Sky Blue)
    '#BDB76B', // Dark Khaki (replaces Khaki)
    '#DEB887', // Burly Wood (replaces Wheat)
    '#00BFFF', // Deep Sky Blue (kept the same)
    '#FF8C00', // Dark Orange (replaces Orange)
    '#4682B4', // Steel Blue (replaces Light Steel Blue)
    '#FF1493', // Deep Pink (replaces Hot Pink)
    '#3CB371', // Medium Sea Green (replaces Medium Spring Green)
    '#FF4500', // Orange Red (replaces Tomato)
    '#BA55D3'  // Medium Orchid (replaces Orchid)
];

  const hash = (id) => {
    let hashValue = 0;
    const idString = id.toString();
    for (let i = 0; i < idString.length; i++) {
      hashValue = (hashValue * 31 + idString.charCodeAt(i)) % colors.length;
    }
    return hashValue;
  };

  // Use the hash function to get an index within the range of the colors array
  const index = hash(ex_group_id || 0);
  console.log('index, ex_group_id', index, ex_group_id);
  return colors[index];
};
