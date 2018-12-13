// Circular buffer storage. Externally-apparent 'length' increases indefinitely
// while any items with indexes below length-n will be forgotten (undefined
// will be returned if you try to get them, trying to set is an exception).
// n represents the initial length of the array, not a maximum
function ringBuffer(n) {
    this._array= new Array(n);
    this.length= 0;
}
ringBuffer.prototype.toString= function() {
    return '[object ringBuffer('+this._array.length+') length '+this.length+']';
};
ringBuffer.prototype.get= function(i) {
    if (i<0 || i<this.length-this._array.length)
        return undefined;
    return this._array[i%this._array.length];
};
ringBuffer.prototype.set= function(i, v) {
    if (i<0 || i<this.length-this._array.length)
        throw ringBuffer.IndexError;
    while (i>this.length) {
        this._array[this.length%this._array.length]= undefined;
        this.length++;
    }
    this._array[i%this._array.length]= v;
    if (i==this.length)
        this.length++;
};
ringBuffer.IndexError= {};
