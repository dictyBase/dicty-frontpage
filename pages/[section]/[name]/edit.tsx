import EditInfoPage from "../../../components/features/EditablePages/EditInfoPage"
import PrivateRoute from "components/routes/PrivateRoute"

const EditPage = () => {
  return <PrivateRoute component={EditInfoPage} />
}

export default EditPage
