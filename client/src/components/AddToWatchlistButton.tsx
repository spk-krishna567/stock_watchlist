import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";

interface AddToMultipleWatchlistsButtonProps {
  children: string;
  symbol: string;
  onAddToWatchlists: (
    stockName: string,
    watchlistIndex: number,
    symbol: string
  ) => void;
  stockName: string;
}

const AddToMultipleWatchlistsButton: React.FC<
  AddToMultipleWatchlistsButtonProps
> = ({ children, onAddToWatchlists, stockName, symbol }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleWatchlistClick = (watchlistIndex: number) => {
    onAddToWatchlists(stockName, watchlistIndex, symbol);
    handleClose();
  };

  return (
    <>
      <Button id="addToWatchlistsButton" onClick={handleClick}>
        {children}
      </Button>
      <Menu
        id="watchlistsMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {[0, 1, 2].map((watchlistIndex) => (
          <MenuItem
            key={watchlistIndex}
            onClick={() => handleWatchlistClick(watchlistIndex)}
          >
            Watchlist {watchlistIndex + 1}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AddToMultipleWatchlistsButton;
