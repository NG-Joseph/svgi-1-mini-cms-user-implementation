/** Table header. We are separating this from UserList just in case it has to carry out
 * some specific tasks like firing sort event based on the header column clicked.
*/
import React from 'react';


const UserListHeader: React.FC = () => {

  return (
    <thead>
      <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Date Of Birth</th>

      </tr>
    </thead>
  );
}

export default UserListHeader;
