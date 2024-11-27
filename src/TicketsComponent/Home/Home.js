import React, { useState } from "react";
import { Tabs, Menu, Dropdown, Button, Modal } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons"; // Import the Plus icon
import styles from "./Home.module.css";
import logo from "../../assets/intellicare_logo_white.png";
import PersonalSearch from "../../TicketsComponent/Search/AdvanceSearch";

const { TabPane } = Tabs;
const { SubMenu } = Menu; // Import SubMenu from Menu

const Home = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [activeTicketOption, setActiveTicketOption] = useState("Open");
  const [iframeSrc, setIframeSrc] = useState(""); // To dynamically load content in iframe
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  // Move showModal and handleCancel here to ensure they are defined before use
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleClose = () => {
    setIsModalVisible(false); // Close the modal
  };

  const handleSearch = (searchQuery) => {
    // Add your search logic here
    console.log(searchQuery);
  };

  const handleSave = () => {
    // Add your save logic here
    console.log("Saved");
    setIsModalVisible(false); // Close the modal after saving
  };

  const ticketMenuItems = [
    { key: "Open", label: "Open" },
    { key: "My Tickets", label: "My Tickets" },
    { key: "Closed", label: "Closed" },
    { key: "Search", label: "Search" },
    { key: "New Ticket", label: "New Ticket" },
  ];

  const openSubMenuItems = [
    {
      key: "Open",
      label: (
        <Link
          to="/tickets/open"
          onClick={(e) => handleSubMenuClick(e, "/tickets/open")}
        >
          Open
        </Link>
      ),
    },

    {
      key: "Answered",
      label: (
        <Link
          to="/tickets/anwsered"
          onClick={(e) => handleSubMenuClick(e, "/tickets/answered")}
        >
          Answered
        </Link>
      ),
    },
    {
      key: "Overdue",
      label: (
        <Link
          to="/tickets/overdue"
          onClick={(e) => handleSubMenuClick(e, "/tickets/overdue")}
        >
          Overdue
        </Link>
      ),
    },
  ];

  const myTicketsSubMenuItems = [
    {
      key: "AssignedToMe",
      label: (
        <Link
          to="/tickets/assignedtome"
          onClick={(e) => handleSubMenuClick(e, "/tickets/assignedtome")}
        >
          Assigned To Me
        </Link>
      ),
    },
    {
      key: "AssignedToTeam",
      label: (
        <Link
          to="/tickets/assignedtoteam"
          onClick={(e) => handleSubMenuClick(e, "/tickets/assignedtoteam")}
        >
          Assigned To Team
        </Link>
      ),
    },

    {
      key: "AddPersonQueue",
      label: (
        <>
          <PlusOutlined /> Add Personal Queue
        </>
      ),
    },
  ];

  // Define the items for the "Search" dropdown menu
  const searchDropdownMenuItems = [
    {
      key: "AddPersonalSearch",
      label: (
        <>
          <PlusOutlined /> Add Personal Search
        </>
      ),
      onClick: showModal, // Show the modal when this item is clicked
    },
  ];

  // Define the items for the closed tickets dropdown menu
  const closedDropdownMenuItems = [
    {
      key: "today",
      label: (
        <Link
          to="/tickets/closed/today"
          onClick={(e) => handleSubMenuClick(e, "/tickets/closed/today")}
        >
          Today
        </Link>
      ),
    },
    {
      key: "yesterday",
      label: (
        <Link
          to="/tickets/closed/yesterday"
          onClick={(e) => handleSubMenuClick(e, "/tickets/closed/yesterday")}
        >
          Yesterday
        </Link>
      ),
    },
    {
      key: "this-week",
      label: (
        <Link
          to="/tickets/closed/this-week"
          onClick={(e) => handleSubMenuClick(e, "/tickets/closed/this-week")}
        >
          This Week
        </Link>
      ),
    },
    {
      key: "this-month",
      label: (
        <Link
          to="/tickets/closed/this-month"
          onClick={(e) => handleSubMenuClick(e, "/tickets/closed/this-month")}
        >
          This Month
        </Link>
      ),
    },
    {
      key: "this-quarter",
      label: (
        <Link
          to="/tickets/closed/this-quarter"
          onClick={(e) => handleSubMenuClick(e, "/tickets/closed/this-quarter")}
        >
          This Quarter
        </Link>
      ),
    },
    {
      key: "this-year",
      label: (
        <Link
          to="/tickets/closed/this-year"
          onClick={(e) => handleSubMenuClick(e, "/tickets/closed/this-year")}
        >
          This Year
        </Link>
      ),
    },
  ];

  const handleTicketOptionClick = (key) => {
    if (key && key !== "Closed") {
      setActiveTicketOption(key);
      setIframeSrc(`/tickets/${key.toLowerCase()}`);
    }
  };

  const handleSubMenuClick = (event, path) => {
    event.preventDefault(); // Prevent the default behavior of <Link>
    setIframeSrc(path); // Set the iframe src to the selected path
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </header>

      <Tabs
        defaultActiveKey="1"
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        tabBarStyle={{ marginBottom: 20 }}
        className={styles.tabs}
      >
        <TabPane tab="Dashboard" key="1" />
        <TabPane tab="Users" key="2" />
        <TabPane tab="Tasks" key="3" />
        <TabPane tab="Tickets" key="4">
          {/* Horizontal Ticket Options */}
          <Menu
            mode="horizontal"
            selectedKeys={[activeTicketOption]}
            onClick={({ key }) => handleTicketOptionClick(key)}
            className={styles.ticketMenu}
          >
            {ticketMenuItems.map((item) =>
              item.key === "Open" ? (
                <SubMenu key={item.key} title={item.label}>
                  {openSubMenuItems.map((subItem) => (
                    <Menu.Item
                      key={subItem.key}
                      onClick={() => handleTicketOptionClick(subItem.key)}
                    >
                      {subItem.label}
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : item.key === "My Tickets" ? (
                <SubMenu key={item.key} title={item.label}>
                  {myTicketsSubMenuItems.map((subItem) => (
                    <Menu.Item
                      key={subItem.key}
                      onClick={() => handleTicketOptionClick(subItem.key)}
                    >
                      {subItem.label}
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : item.key === "Search" ? (
                <Menu.Item key={item.key}>
                  <Dropdown
                    overlay={<Menu items={searchDropdownMenuItems} />}
                    trigger={["click"]}
                  >
                    <Button type="link" onClick={(e) => e.preventDefault()}>
                      Search
                    </Button>
                  </Dropdown>
                </Menu.Item>
              ) : item.key === "Closed" ? (
                <Menu.Item key={item.key}>
                  <Dropdown
                    overlay={<Menu items={closedDropdownMenuItems} />}
                    trigger={["click"]}
                  >
                    <Button type="link" onClick={(e) => e.preventDefault()}>
                      Closed
                    </Button>
                  </Dropdown>
                </Menu.Item>
              ) : item.key === "New Ticket" ? (
                <SubMenu key={item.key} title={item.label}>
                  <Menu.Item key="new-ticket">
                    <Link
                      to="/tickets/new"
                      onClick={(e) => handleSubMenuClick(e, "/tickets/new")}
                    >
                      Open a New Ticket
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ) : (
                <Menu.Item key={item.key}>{item.label}</Menu.Item>
              )
            )}
          </Menu>

          {/* Modal */}

          <Modal
            title="Advanced Ticket Search"
            visible={isModalVisible}
            onCancel={handleClose}
            footer={null}
            width={800}
            className={styles.modal}
          >
            {/* Force re-render based on the visibility of the modal */}
            <PersonalSearch
              key={isModalVisible ? "visible" : "hidden"} // Forces re-render when the modal visibility changes
              show={isModalVisible}
              onClose={handleClose}
              onSearch={handleSearch}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </Modal>

          {/* Display iframe based on selected content */}
          {iframeSrc && (
            <iframe
              src={iframeSrc}
              title="Ticket Content"
              className={styles.iframe}
            />
          )}
        </TabPane>
        <TabPane tab="Knowledgebase" key="5" />
      </Tabs>
    </div>
  );
};

export default Home;
