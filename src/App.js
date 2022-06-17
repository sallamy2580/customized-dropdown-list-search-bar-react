import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, InputBase, Menu, Divider } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles((theme) => ({
  DropDownButton: {
    margin: "50px 50px",
    fontSize: "1.125rem",
    width: "320px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "2px solid #007bff",
    borderRadius: "10px",
    backgroundColor: "white",
    cursor: "pointer",
    padding: "0px 20px"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: "20px",
    marginLeft: 0,
    width: "100%",
    border: "1px solid grey"
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%"
  },
  searchBarContainer: {
    minWidth: "inherit",
    display: "flex",
    justifyContent: "space-evenly",
    cursor: "default",
    "&.MuiListItem-button": {
      "&:hover": {
        backgroundColor: "white"
      }
    }
  },
  menuDivider: {
    margin: "0 20px"
  },
  dashboardSelectMenu: {
    "& .MuiPopover-paper": {
      minWidth: "380px",
      maxWidth: "fit-content"
    }
  },
  externalLinkIcon: {
    borderLeft: "1px solid var(--color-gray-eighty-five)",
    padding: "10px 0px 10px 10px",
    color: "var(--color-primary)",
    cursor: "pointer"
  },
  checkedItem: {
    color: "indigo"
  }
}));

const options = [
  {
    value: "Susan",
    label: "Susan"
  },
  {
    value: "Rahul",
    label: "Rahul"
  },
  {
    value: "Kamla",
    label: "Kamla"
  }
];

function App() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selection, setSelection] = useState("");

  useEffect(() => {
    setSelection(options[0].label);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    if (e.target.innerText !== selection && e.target.innerText !== "") {
      setSelection(e.target.innerText);
    }
    setSearchText("");
    setAnchorEl(null);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <Button
        type="button"
        className={classes.DropDownButton}
        onClick={handleMenuOpen}
      >
        {selection}
        <KeyboardArrowDownIcon />
      </Button>
      {renderDashboardMenu()}
    </div>
  );

  function renderDashboardMenu() {
    const displayOptions = options
      .map((item) => {
        if (item.label.toLowerCase().includes(searchText.toLowerCase())) {
          return item;
        }
        return undefined;
      })
      .filter((item) => item !== undefined);

    function renderOption(value) {
      if (selection === value) {
        return (
          <div className={classes.checkedItem}>
            <CheckIcon />
            {value}
          </div>
        );
      }
      return value;
    }

    return (
      <Menu
        anchorEl={anchorEl}
        keepMounted={true}
        open={!!anchorEl}
        onClose={handleClose}
        className={classes.dashboardSelectMenu}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 110, left: 240 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <MenuItem
          className={classes.searchBarContainer}
          disableTouchRipple={true}
        >
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="SEARCH..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              onChange={handleSearchChange}
              value={searchText}
            />
          </div>
        </MenuItem>
        <Divider />
        {displayOptions.map((item, index) => {
          return (
            <div key={index}>
              <MenuItem onClick={(e) => handleClose(e)}>
                {renderOption(item.label)}
              </MenuItem>
              <Divider className={classes.menuDivider} />
            </div>
          );
        })}
      </Menu>
    );
  }
}

export default App;
