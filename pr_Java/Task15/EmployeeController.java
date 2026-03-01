package Task15;
public class EmployeeController {
    private Employee model;
    private EmployeeView view;
    public EmployeeController(Employee model, EmployeeView view) {
        this.model = model;
        this.view = view;
    }
    public void setEmployeeName(String name){
        model.setName(name);
    }
    public String getEmployeeName(){
        return model.getName();
    }
    public void setEmployeeSalary(double salary){
        model.setSalary(salary);
    }
    public double getEmployeeSalary(){
        return model.getSalary();
    }
    public void updateView(){
        view.printEmployeeDetails(model.getName(), model.getSalary());
    }
    public void nds(){
        model.setSalary(model.getSalary() - (model.getSalary()*0.13));
    }
    public void theend(String e){
        view.printEnd(e);
    }
}
