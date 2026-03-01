package Task15;

public class MVCPatternDemoEmployee {
    public static void main(String[] args){
        Employee model = retriveEmployeeFromDa();
        EmployeeView view = new EmployeeView();
        EmployeeController controller = new EmployeeController(model, view);
        controller.updateView();
        controller.nds();
        //controller.setEmployeeSalary(30000);
        System.out.println("С вычитом подоходового налога");
        controller.updateView();
        controller.theend("Завершение работы");
    }

    private static Employee retriveEmployeeFromDa() {
        Employee model = new Employee();
        model.setName("Артем");
        model.setSalary(30000);
        return model;
    }
}
