import { Paper, Typography } from "@mui/material";

interface IProps {
  message: string;
}

const InformationBox = (props: IProps) => {
  return (
    <Paper elevation={3}>
      <Typography variant="h5" textAlign={"center"} mt={12} py={8} maxWidth={'md'}>
        {props.message}
      </Typography>
    </Paper>
  );
};

export default InformationBox;
