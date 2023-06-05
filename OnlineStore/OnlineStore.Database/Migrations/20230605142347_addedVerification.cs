using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineStore.Database.Migrations
{
    /// <inheritdoc />
    public partial class addedVerification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "verificationStatus",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "verificationStatus",
                table: "Users");
        }
    }
}
