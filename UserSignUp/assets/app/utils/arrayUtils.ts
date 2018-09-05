export default class ArrayUtils{
    static addAfterObject(array:Object[],insertAfter,...objectsToInsert){
        var index = array.indexOf(insertAfter);
        return array.splice(index,0,...objectsToInsert);
    }
}