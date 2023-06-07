using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineStore.Database.Migrations
{
    /// <inheritdoc />
    public partial class test : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "verificationStatus",
                table: "Users",
                newName: "VerificationStatus");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "VerificationStatus",
                table: "Users",
                newName: "verificationStatus");
        }
    }
}
