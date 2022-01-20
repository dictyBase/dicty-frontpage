import AddPage from "../components/features/EditablePages/AddPage"
import PrivateRoute from "components/routes/PrivateRoute"

const AddPagePath = () => {
  return <PrivateRoute component={AddPage} />
}

export default AddPagePath
