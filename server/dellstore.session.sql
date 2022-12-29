select O.orderid, O.netamount, O.tax, O.totalamount, sum(P.price * Ol.quantity) "total value" 
from orders as O
inner join orderlines OL
	on O.orderid = OL.orderid
inner join products P
	on P.prod_id = Ol.prod_id
group by O.orderid, O.netamount, O.tax, O.totalamountselect * from categories