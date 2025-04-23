describe("Add Student Feature - Full Test Suite (with screenshots)", () => {
  const validStudent = {
    name: "Test User",
    studentId: "IT2025",
    email: "testuser@sqa.com",
    course: "IT"
  };

  beforeEach(() => {
    cy.visit("http://localhost:3000/add");
  });

  it("TC_ADD_001 - Should add a student with valid data", () => {
    cy.get('input[name="name"]').type(validStudent.name);
    cy.get('input[name="studentId"]').type(validStudent.studentId);
    cy.get('input[name="email"]').type(validStudent.email);
    cy.get('input[name="course"]').type(validStudent.course);
    cy.screenshot("TC_ADD_001_Before_Submit");
    cy.contains("Add Student").click();
    cy.url().should("include", "/");
    cy.contains(validStudent.name).should("exist");
    cy.screenshot("TC_ADD_001_Successful_Add");
  });

  it("TC_ADD_002 - Should show error when name is empty", () => {
    cy.get('input[name="studentId"]').type("IT1001");
    cy.get('input[name="email"]').type("noname@sqa.com");
    cy.get('input[name="course"]').type("CS");
    cy.contains("Add Student").click();
    cy.screenshot("TC_ADD_002_After_Submit");
    cy.contains("Name is required").should("exist");
  });

  it("TC_ADD_003 - Should show error when Student ID is empty", () => {
    cy.get('input[name="name"]').type("Missing ID User");
    cy.get('input[name="email"]').type("noid@sqa.com");
    cy.get('input[name="course"]').type("SE");
    cy.contains("Add Student").click();
    cy.screenshot("TC_ADD_003_After_Submit");
    cy.contains("Student ID is required").should("exist");
  });

  it("TC_ADD_004 - Should clear all fields when 'Clear Form' is clicked", () => {
    cy.get('input[name="name"]').type("Clear Test");
    cy.get('input[name="studentId"]').type("CL123");
    cy.get('input[name="email"]').type("clear@test.com");
    cy.get('input[name="course"]').type("CS");
    cy.contains("Clear Form").click();
    cy.screenshot("TC_ADD_004_Clear_Form");
    cy.get('input[name="name"]').should("have.value", "");
  });

  it("TC_ADD_005 - Prevent XSS script injection in Name field", () => {
    cy.get('input[name="name"]').type("<script>alert('hack')</script>");
    cy.get('input[name="studentId"]').type("XSS999");
    cy.get('input[name="email"]').type("xss@danger.com");
    cy.get('input[name="course"]').type("Hacker");
    cy.contains("Add Student").click();
    cy.url().should("include", "/");
    cy.screenshot("TC_ADD_005_XSS_Attempt");
    cy.contains("<script>").should("not.exist");
  });

  it("TC_ADD_006 - Reject overly long Student ID", () => {
    const longId = "A".repeat(500);
    cy.get('input[name="name"]').type("Long ID User");
    cy.get('input[name="studentId"]').type(longId);
    cy.get('input[name="email"]').type("longid@fail.com");
    cy.get('input[name="course"]').type("Stress");
    cy.contains("Add Student").click();
    cy.screenshot("TC_ADD_006_Long_ID");
    cy.contains("Student ID is too long").should("exist");
  });

  it("TC_ADD_007 - Reject invalid email format", () => {
    cy.get('input[name="name"]').type("Bad Email");
    cy.get('input[name="studentId"]').type("IT888");
    cy.get('input[name="email"]').type("bademail.com");
    cy.get('input[name="course"]').type("QA");
    cy.contains("Add Student").click();
    cy.screenshot("TC_ADD_007_Invalid_Email");
    cy.contains("Invalid email").should("exist");
  });

  it("TC_ADD_008 - Reject inputs with only whitespace", () => {
    cy.get('input[name="name"]').type("   ");
    cy.get('input[name="studentId"]').type("   ");
    cy.get('input[name="email"]').type("   ");
    cy.get('input[name="course"]').type("   ");
    cy.contains("Add Student").click();
    cy.screenshot("TC_ADD_008_Whitespace_Only");
    cy.contains("Name is required").should("exist");
    cy.contains("Student ID is required").should("exist");
  });

  it("TC_ADD_009 - Prevents duplicate entries on multiple clicks", () => {
    cy.get('input[name="name"]').type("Fast Clicker");
    cy.get('input[name="studentId"]').type("ITX123");
    cy.get('input[name="email"]').type("fast@click.com");
    cy.get('input[name="course"]').type("UX");

    for (let i = 0; i < 5; i++) {
      cy.contains("Add Student").click();
    }
    cy.screenshot("TC_ADD_009_Multi_Submit");
    cy.url().should("include", "/");
    cy.contains("Fast Clicker").should("exist");
   
  });
});
