import EditInfoPage from "../../../../components/features/EditablePages/EditInfoPage"
import PrivateRoute from "components/routes/PrivateRoute"

const SubnameEditPage = () => {
  return <PrivateRoute component={EditInfoPage} />
}

export default SubnameEditPage
