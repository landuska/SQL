describe("connect to test db", () => {
  it("can connect to test db", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
    );
  });

  it("Input entries", () => {
    cy.task(
      "queryDb",
      `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
      (1, "Ivan", "01-2023", "Barcelona"),
      (2, "Maria", "03-2023", "Tokio"),
      (3, "Andrey", "01-2024", "Milan"),
      (4, "Anna", "03-2023", "London"),
      (5, "Maksim", "03-2023", "Paris")`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(5);
    });
  });

  it("select City", () => {
    cy.task(
      "queryDb",
      `SELECT FirstName FROM Students WHERE City="Milan"`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result[0].FirstName).to.equal("Andrey");
    });
  });

  it("select Group", () => {
    cy.task(
      "queryDb",
      `SELECT FirstName FROM Students WHERE StudentGroup="03-2023"`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result[0].FirstName).to.equal("Maria");
    });
  });

  it("can delete the db", () => {
    cy.task("queryDb", "DROP TABLE Students");
  });
});
