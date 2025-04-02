namespace YJTBackend.Models
{
    public class UserGoal
    {
        public int Id { get; set; }
        public string GoalName { get; set; } = string.Empty;
        public int Duration { get; set; } // Gün olarak hedef süresi
        public bool IsCompleted { get; set; }
    }
}
