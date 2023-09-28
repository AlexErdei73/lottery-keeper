import "./header.css";

const Header = ({ role }) => {
  return (
    <>
      <header>
        <h1 className="color-change">
          <output>{role ? role.name : "Lotto Keeper"}</output>
        </h1>
        {role && (
          <div className="balance color-change">
            Credit: <output>{role.balance}</output>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
