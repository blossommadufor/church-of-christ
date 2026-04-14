import React, { useRef } from "react";
import AsyncSelect from "react-select/async";
import { adminServices } from "../../services/adminServices";

const MemberSearchSelect = ({ onChange, value, placeholder = "Search member..." }) => {
  const timeoutRef = useRef(null);

  const loadOptions = (inputValue, callback) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (!inputValue) {
      callback([]);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      const qs = `?searchByName=${encodeURIComponent(inputValue)}&pageNumber=1&limit=20`;
      adminServices.getAllMembers(qs)
        .then((res) => {
          const users = res?.data?.users || [];
          const options = users.map((u) => {
            const m = u.member || {};
            const prefix = m.prefix || (m.gender?.toLowerCase() === "female" ? "SIS." : "BRO.");
            return {
              value: u._id,
              label: `${prefix} ${m.firstName || u.name || ''} ${m.lastName || ''}`.trim() || 'Unknown',
              user: u
            };
          });
          callback(options);
        })
        .catch((err) => {
          console.error(err);
          callback([]);
        });
    }, 1000); // 1s Debounce
  };

  return (
    <AsyncSelect
      value={value}
      loadOptions={loadOptions}
      defaultOptions={false}
      onChange={onChange}
      placeholder={placeholder}
      className="text-sm"
      noOptionsMessage={({ inputValue }) => !inputValue ? "Type to start searching" : "No members found"}
    />
  );
};

export default MemberSearchSelect;
